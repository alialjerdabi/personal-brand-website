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

interface Simulation {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  prevX: number;
  prevY: number;
  baseX: number;
  baseY: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

// "~15% farther to the right" (2026-07-22) took X from 39 → 45 — too
// small a step to read as a real change at this scale, per Ali's
// follow-up. Jumped further this time (→ 70) for a clearly visible
// gap from the list rows; vertical offset untouched.
const POINTER_OFFSET_X = 70;
const POINTER_OFFSET_Y = -146;
const ANCHOR_GAP = 20;
const EDGE_MARGIN = 16;
const HIDE_TRANSITION_MS = 300; // matches CapabilityPreviewPanel's motion-safe:duration-300

// Weighted-card simulation constants (2026-07-20 refinement). Position
// lerps toward the pointer-derived target every frame; rotation lerps
// toward a target derived partly from where the pointer sits relative
// to the panel (POSITION_TILT_WEIGHT) and partly from how fast/which
// direction the panel is currently moving (VELOCITY_TILT_WEIGHT) — "based
// partly on cursor position and partly on cursor movement direction."
const POSITION_DAMPING = 0.16; // lower = heavier/laggier, higher = snappier
const ROTATION_DAMPING = 0.14; // rotation trails position slightly, reads as weight
const MAX_ROTATE_XY = 5; // degrees — within the spec's 4–6° ceiling
const MAX_ROTATE_Z = 1.2; // degrees — "extremely small," a residual twist only
const VELOCITY_TILT_DEG_PER_PX = 0.15;
const POSITION_TILT_WEIGHT = 0.3;
const VELOCITY_TILT_WEIGHT = 0.7;
const MEDIA_PARALLAX_FACTOR = 0.12; // media moves at 12% of the panel's own displacement
const SETTLE_EPSILON_PX = 0.4;
const SETTLE_EPSILON_DEG = 0.05;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Isolated experiment (2026-07-20; refined later the same day into a
 * "weighted 3D card" per Ali's spec; sticker label removed and offset
 * increased again 2026-07-22): a restrained floating preview panel
 * that follows the cursor on hover, showing a curated snapshot
 * sequence per capability. Self-contained on purpose — this file,
 * CapabilityPreviewPanel.tsx, and data/capabilityPreviews.ts are the
 * only three files involved.
 *
 * Renders the EXACT markup/classes the list had before this experiment
 * — no layout, copy, or spacing changed. The panel is `position:fixed`,
 * never participating in document flow.
 *
 * Two distinct positioning modes:
 * - "cursor" (mouse hover, motion allowed): a continuous rAF simulation
 *   (not a CSS transition) drives position AND rotation every frame —
 *   see `tick()`. Position lerps toward pointer+offset; rotationX/Y
 *   lerps toward a target blended from the pointer's position relative
 *   to the panel and the panel's own current velocity, clamped to
 *   MAX_ROTATE_XY; rotationZ is the same idea at a much smaller
 *   ceiling. The inner media layer gets its own, smaller-magnitude
 *   translate (MEDIA_PARALLAX_FACTOR of the panel's displacement from
 *   where it first appeared), so it reads as sitting slightly behind
 *   the frame. The loop keeps running — decaying velocity, so rotation
 *   settles toward neutral — even after mousemove events stop, and
 *   stops scheduling itself once both position and rotation are
 *   within SETTLE_EPSILON of their targets (idle until the next
 *   mousemove wakes it).
 * - "anchored" (keyboard focus, touch tap, OR reduced motion even on
 *   mouse hover): a single static position from the triggering row's
 *   own bounding rect — no rotation, no parallax, no continuous loop.
 *   There's no cursor to derive tilt or velocity from, and reduced-
 *   motion users shouldn't get a panel that chases or tilts at all.
 *
 * The INITIAL reveal (position, and for cursor mode the sim's starting
 * values) is applied from a `useEffect` keyed on `active`, not from
 * `requestAnimationFrame` fired inline in the event handler —
 * `useEffect` is guaranteed to run after the panel's mount commits;
 * rAF firing after a state update is not a guaranteed ordering.
 *
 * Touch fallback: on a coarse-pointer device the first tap on a row
 * reveals its anchored panel WITHOUT navigating (`preventDefault`);
 * tapping the SAME row again (now already active) navigates normally.
 */
export default function CapabilitiesListInteractive({ capabilities }: CapabilitiesListInteractiveProps) {
  const [active, setActive] = useState<ActiveState | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pendingRevealRef = useRef<{ x: number; y: number } | null>(null);
  const simRef = useRef<Simulation>({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    prevX: 0,
    prevY: 0,
    baseX: 0,
    baseY: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
  });
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

  const clampX = (x: number) => clamp(x, EDGE_MARGIN, window.innerWidth - PANEL_WIDTH - EDGE_MARGIN);
  const clampY = (y: number) => clamp(y, EDGE_MARGIN, window.innerHeight - PANEL_HEIGHT - EDGE_MARGIN);

  // The continuous weighted-card simulation. Runs every frame while
  // cursor mode is active; self-terminates once settled (see doc
  // comment above), woken back up by requestTick() on the next
  // mousemove.
  const tick = () => {
    frameRef.current = 0;
    const panel = panelRef.current;
    if (!panel) return;
    const sim = simRef.current;

    sim.prevX = sim.currentX;
    sim.prevY = sim.currentY;
    sim.currentX += (sim.targetX - sim.currentX) * POSITION_DAMPING;
    sim.currentY += (sim.targetY - sim.currentY) * POSITION_DAMPING;

    const velocityX = sim.currentX - sim.prevX;
    const velocityY = sim.currentY - sim.prevY;

    // Position component: where the raw pointer sits relative to the
    // panel's own current center, normalized to roughly [-1, 1].
    const panelCenterX = sim.currentX + PANEL_WIDTH / 2;
    const panelCenterY = sim.currentY + PANEL_HEIGHT / 2;
    const positionBiasX = clamp((pointerRef.current.x - panelCenterX) / PANEL_WIDTH, -1, 1);
    const positionBiasY = clamp((pointerRef.current.y - panelCenterY) / PANEL_HEIGHT, -1, 1);

    // Velocity component: how fast, and which way, the panel itself is
    // currently moving — the dominant contributor to the tilt.
    const velocityTiltY = clamp(velocityX * VELOCITY_TILT_DEG_PER_PX, -MAX_ROTATE_XY, MAX_ROTATE_XY);
    const velocityTiltX = clamp(-velocityY * VELOCITY_TILT_DEG_PER_PX, -MAX_ROTATE_XY, MAX_ROTATE_XY);

    const targetRotY = clamp(
      positionBiasX * MAX_ROTATE_XY * POSITION_TILT_WEIGHT + velocityTiltY * VELOCITY_TILT_WEIGHT,
      -MAX_ROTATE_XY,
      MAX_ROTATE_XY
    );
    const targetRotX = clamp(
      -positionBiasY * MAX_ROTATE_XY * POSITION_TILT_WEIGHT + velocityTiltX * VELOCITY_TILT_WEIGHT,
      -MAX_ROTATE_XY,
      MAX_ROTATE_XY
    );
    const targetRotZ = clamp(velocityX * VELOCITY_TILT_DEG_PER_PX * 0.15, -MAX_ROTATE_Z, MAX_ROTATE_Z);

    sim.rotX += (targetRotX - sim.rotX) * ROTATION_DAMPING;
    sim.rotY += (targetRotY - sim.rotY) * ROTATION_DAMPING;
    sim.rotZ += (targetRotZ - sim.rotZ) * ROTATION_DAMPING;

    panel.style.transform = `translate3d(${sim.currentX.toFixed(2)}px, ${sim.currentY.toFixed(2)}px, 0) rotateX(${sim.rotX.toFixed(3)}deg) rotateY(${sim.rotY.toFixed(3)}deg) rotateZ(${sim.rotZ.toFixed(3)}deg)`;

    if (mediaRef.current) {
      const parallaxX = (sim.currentX - sim.baseX) * MEDIA_PARALLAX_FACTOR;
      const parallaxY = (sim.currentY - sim.baseY) * MEDIA_PARALLAX_FACTOR;
      mediaRef.current.style.transform = `translate3d(${parallaxX.toFixed(2)}px, ${parallaxY.toFixed(2)}px, 0)`;
    }

    const posDelta = Math.abs(sim.targetX - sim.currentX) + Math.abs(sim.targetY - sim.currentY);
    const rotDelta = Math.abs(targetRotX - sim.rotX) + Math.abs(targetRotY - sim.rotY) + Math.abs(targetRotZ - sim.rotZ);
    if (posDelta > SETTLE_EPSILON_PX || rotDelta > SETTLE_EPSILON_DEG) {
      frameRef.current = requestAnimationFrame(tick);
    }
  };

  const requestTick = () => {
    if (frameRef.current === 0) frameRef.current = requestAnimationFrame(tick);
  };

  // Applies the reveal position once the panel has actually mounted —
  // see the doc comment above for why this is a useEffect and not a
  // requestAnimationFrame call inline in the event handlers.
  useEffect(() => {
    if (!active || !pendingRevealRef.current) return;
    const panel = panelRef.current;
    if (!panel) return;
    const { x, y } = pendingRevealRef.current;

    if (active.mode === "cursor") {
      const sim = simRef.current;
      sim.targetX = x;
      sim.currentX = x;
      sim.prevX = x;
      sim.baseX = x;
      sim.targetY = y;
      sim.currentY = y;
      sim.prevY = y;
      sim.baseY = y;
      sim.rotX = 0;
      sim.rotY = 0;
      sim.rotZ = 0;
      panel.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      if (mediaRef.current) mediaRef.current.style.transform = "translate3d(0, 0, 0)";
    } else {
      panel.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (mediaRef.current) mediaRef.current.style.transform = "";
    }

    panel.style.opacity = "1";
    pendingRevealRef.current = null;
  }, [active]);

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
        className="mt-12 border-t border-border"
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
            <li key={capability.slug} className="border-b border-border">
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
                    x: clampX(event.clientX + POINTER_OFFSET_X),
                    y: clampY(event.clientY + POINTER_OFFSET_Y),
                  };
                  setActive({ preview, mode: "cursor" });
                }}
                onMouseMove={(event) => {
                  if (!active || active.mode !== "cursor" || active.preview.slug !== capability.slug) return;
                  pointerRef.current = { x: event.clientX, y: event.clientY };
                  simRef.current.targetX = clampX(event.clientX + POINTER_OFFSET_X);
                  simRef.current.targetY = clampY(event.clientY + POINTER_OFFSET_Y);
                  requestTick();
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
                  <span className="font-mono text-xs text-foreground-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    // Hover/focus reverted to grey→black for this list only
                    // (2026-07-22, Ali's direction) — the orange applied
                    // elsewhere (Method steps, Services sidebar nav) stays.
                    // `isActive` still lands on text-accent for the touch/
                    // keyboard-anchored path, where no real :hover applies.
                    className={`inline-block text-2xl font-medium tracking-tight underline-offset-8 motion-safe:transition-[color,transform] motion-safe:duration-200 group-hover:translate-x-1 group-hover:text-foreground group-focus-visible:translate-x-1 group-focus-visible:text-foreground group-focus-visible:underline sm:text-3xl ${
                      isActive ? "text-accent" : "text-foreground-faint"
                    }`}
                  >
                    {capability.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-accent opacity-0 motion-safe:transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {active && (
        <CapabilityPreviewPanel
          preview={active.preview}
          mode={active.mode}
          panelRef={panelRef}
          mediaRef={mediaRef}
        />
      )}
    </div>
  );
}
