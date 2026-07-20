"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { CapabilityLink } from "@/data/capabilities";
import { capabilityPreviews, type CapabilityPreview } from "@/data/capabilityPreviews";
import CapabilityPreviewPanel, {
  PANEL_HEIGHT,
  PANEL_WIDTH,
} from "@/components/sections/capabilities/CapabilityPreviewPanel";

interface CapabilitiesListInteractiveProps {
  capabilities: CapabilityLink[];
}

type Mode = "cursor" | "anchored";
interface ActiveState {
  preview: CapabilityPreview;
  mode: Mode;
}

const COBALT = "#255DFF";
const POINTER_OFFSET_X = 28;
const POINTER_OFFSET_Y = -PANEL_HEIGHT / 2;
const ANCHOR_GAP = 20;
const EDGE_MARGIN = 16;
const HIDE_TRANSITION_MS = 300; // matches CapabilityPreviewPanel's motion-safe:duration-300

/**
 * Isolated experiment (2026-07-20, Ali's spec): a restrained floating
 * preview panel that follows the cursor on hover, showing a curated
 * snapshot sequence per capability. Self-contained on purpose — this
 * file, CapabilityPreviewPanel.tsx, and data/capabilityPreviews.ts are
 * the only three files involved. Reverting CapabilitiesSection.tsx to
 * render its plain `<ul>` inline again (see git history before this
 * change) and deleting these three files fully removes the experiment
 * with no trace anywhere else.
 *
 * Renders the EXACT markup/classes the list had before this experiment
 * (same border-t/border-b, same mono index, same hover ink+nudge) —
 * no layout, copy, or spacing changed. The panel is `position:fixed`,
 * so it never participates in document flow.
 *
 * Two distinct positioning modes, not one mechanism stretched to cover
 * both:
 * - "cursor" (mouse hover, motion allowed): the panel follows the
 *   pointer. Continuous tracking is driven by direct ref/style
 *   mutation (rAF-throttled), not React state — high-frequency pointer
 *   updates never trigger a re-render, the same pattern this site
 *   already uses elsewhere (GrowthStack, ProblemReveal). A CSS
 *   transition on `transform` supplies the "lag."
 * - "anchored" (keyboard focus, touch tap, OR reduced motion even on
 *   mouse hover): a static position computed once from the triggering
 *   row's own bounding rect. There is no cursor to follow for a
 *   keyboard or touch interaction, and reduced-motion users shouldn't
 *   get a panel that chases the pointer.
 *
 * The INITIAL reveal position, in both modes, is applied from a
 * `useEffect` keyed on `active` — not from `requestAnimationFrame`
 * fired inline in the event handler. `setActive` mounts the panel on
 * the NEXT render; `panelRef.current` doesn't exist until that render
 * commits, and rAF firing after a state update is a common pattern but
 * not a guaranteed ordering. `useEffect` runs after commit by
 * contract, so the reveal never races the mount. Continuous
 * mousemove-follow updates, once the panel already exists, are the
 * legitimate use of rAF-throttling here.
 *
 * Touch fallback: on a coarse-pointer device the first tap on a row
 * reveals its anchored panel WITHOUT navigating (`preventDefault`);
 * tapping the SAME row again (now already active) navigates normally.
 * Tapping a different row switches the preview the same way. Tapping
 * outside the list, or Escape, closes it — never a dead click, since
 * every row still reaches its destination on the second tap.
 */
export default function CapabilitiesListInteractive({ capabilities }: CapabilitiesListInteractiveProps) {
  const [active, setActive] = useState<ActiveState | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pendingRevealRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const hoverCapableRef = useRef(true);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hoverCapableRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const clearPendingHide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const placePanel = (x: number, y: number, revealed: boolean) => {
    const panel = panelRef.current;
    if (!panel) return;
    const clampedX = Math.min(Math.max(x, EDGE_MARGIN), window.innerWidth - PANEL_WIDTH - EDGE_MARGIN);
    const clampedY = Math.min(Math.max(y, EDGE_MARGIN), window.innerHeight - PANEL_HEIGHT - EDGE_MARGIN);
    panel.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    if (revealed) panel.style.opacity = "1";
  };

  // Applies the reveal position once the panel has actually mounted —
  // see the doc comment above for why this is a useEffect and not a
  // requestAnimationFrame call inline in the event handlers.
  useEffect(() => {
    if (!active || !pendingRevealRef.current) return;
    placePanel(pendingRevealRef.current.x, pendingRevealRef.current.y, true);
    pendingRevealRef.current = null;
  }, [active]);

  const trackPointer = () => {
    frameRef.current = 0;
    placePanel(pointerRef.current.x + POINTER_OFFSET_X, pointerRef.current.y + POINTER_OFFSET_Y, true);
  };

  const requestTrack = () => {
    if (frameRef.current === 0) frameRef.current = requestAnimationFrame(trackPointer);
  };

  const showAnchored = (preview: CapabilityPreview, row: HTMLElement) => {
    clearPendingHide();
    const rect = row.getBoundingClientRect();
    pendingRevealRef.current = { x: rect.right + ANCHOR_GAP, y: rect.top };
    setActive({ preview, mode: "anchored" });
  };

  // Fades out, THEN unmounts — unmounting immediately would cut the
  // opacity transition off before it ever gets to play. Cancelled by
  // clearPendingHide() if a new row is shown before the fade finishes,
  // so quickly hopping back into the list doesn't flash/unmount at all.
  // useCallback with no deps: every value it touches (refs, setActive)
  // is stable across renders, so a fixed identity is both correct and
  // lets the outside-click effect below declare it as a dependency
  // without re-attaching its listeners on every render.
  const hide = useCallback(() => {
    if (panelRef.current) panelRef.current.style.opacity = "0";
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setActive(null), HIDE_TRANSITION_MS);
  }, []);

  // Touch/keyboard "anchored" panels close on outside interaction or Escape.
  useEffect(() => {
    if (!active || active.mode !== "anchored") return;

    const onPointerDown = (event: PointerEvent) => {
      if (panelRef.current?.contains(event.target as Node)) return;
      const target = event.target as HTMLElement;
      if (target.closest("[data-capability-row]")) return;
      hide();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, hide]);

  return (
    <div className="relative">
      <ul
        className="mt-12 border-t border-zinc-200"
        onMouseLeave={() => {
          // List-level, not per-row: mouseleave doesn't fire when moving
          // between sibling rows (only when truly leaving the list), so
          // hopping row-to-row repositions and updates the panel's
          // content smoothly instead of hiding and re-showing it.
          if (active?.mode === "cursor") hide();
        }}
      >
        {capabilities.map((capability, index) => {
          const preview = capabilityPreviews.find((item) => item.slug === capability.slug);
          const isActive = active?.preview.slug === capability.slug;

          return (
            <li key={capability.slug} className="border-b border-zinc-200">
              <Link
                href={`/services#${capability.slug}`}
                data-capability-row
                className="group flex items-baseline justify-between gap-6 py-4 focus-visible:outline-none"
                onMouseEnter={(event) => {
                  // Touch devices fire a synthetic mouseenter right before
                  // click — without this guard a tap would also kick off
                  // cursor-tracking logic that then never receives the
                  // continuous mousemove events real cursor-follow needs.
                  if (!preview || !hoverCapableRef.current) return;
                  if (reducedMotionRef.current) {
                    showAnchored(preview, event.currentTarget);
                    return;
                  }
                  clearPendingHide();
                  pointerRef.current = { x: event.clientX, y: event.clientY };
                  pendingRevealRef.current = {
                    x: event.clientX + POINTER_OFFSET_X,
                    y: event.clientY + POINTER_OFFSET_Y,
                  };
                  setActive({ preview, mode: "cursor" });
                }}
                onMouseMove={(event) => {
                  if (!active || active.mode !== "cursor" || active.preview.slug !== capability.slug) return;
                  pointerRef.current = { x: event.clientX, y: event.clientY };
                  requestTrack();
                }}
                onFocus={(event) => {
                  if (!preview) return;
                  showAnchored(preview, event.currentTarget);
                }}
                onBlur={() => {
                  if (active?.mode === "anchored") hide();
                }}
                onClick={(event) => {
                  if (!preview || hoverCapableRef.current) return;
                  if (!isActive) {
                    event.preventDefault();
                    showAnchored(preview, event.currentTarget);
                  }
                }}
              >
                <span className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-zinc-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-block text-2xl font-medium tracking-tight text-zinc-300 underline-offset-8 motion-safe:transition-[color,transform] motion-safe:duration-200 group-hover:translate-x-1 group-hover:text-zinc-950 group-focus-visible:translate-x-1 group-focus-visible:text-zinc-950 group-focus-visible:underline sm:text-3xl"
                    style={isActive ? { color: COBALT } : undefined}
                  >
                    {capability.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-zinc-300 opacity-0 motion-safe:transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {active && <CapabilityPreviewPanel preview={active.preview} panelRef={panelRef} />}
    </div>
  );
}
