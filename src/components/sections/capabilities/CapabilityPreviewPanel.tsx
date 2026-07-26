import type { RefObject } from "react";
import MediaCycler from "@/components/ui/MediaCycler";
import type { CapabilityPreview } from "@/data/capabilityPreviews";

interface CapabilityPreviewPanelProps {
  preview: CapabilityPreview;
  mode: "cursor" | "anchored";
  panelRef: RefObject<HTMLDivElement | null>;
  mediaRef: RefObject<HTMLSpanElement | null>;
}

/** Consistently sized across every capability — see CapabilitiesListInteractive.tsx. */
export const PANEL_WIDTH = 288;
export const PANEL_HEIGHT = 208;

/**
 * The floating preview panel — purely presentational, two layers:
 * 1. The outer `panelRef` node: `overflow-visible`, carries the
 *    continuous translate/rotateX/rotateY/rotateZ transform (see
 *    CapabilitiesListInteractive.tsx). Nothing but positioning lives
 *    here.
 * 2. `mediaRef`: the visible card surface (rounded, bordered, dark,
 *    clipped) — gets its OWN small parallax translate, independent of
 *    the outer node's, so the media reads as sitting slightly behind
 *    the frame rather than glued flush to it.
 *
 * `aria-hidden`: this is a supplementary visual only — the row's own
 * link text and destination already carry the meaning.
 */
export default function CapabilityPreviewPanel({
  preview,
  mode,
  panelRef,
  mediaRef,
}: CapabilityPreviewPanelProps) {
  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      style={{ width: PANEL_WIDTH, height: PANEL_HEIGHT }}
      className={`pointer-events-none fixed left-0 top-0 z-30 overflow-visible opacity-0 [perspective:900px] motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out ${
        // Cursor mode drives `transform` itself every frame (continuous
        // simulation) — a CSS transition on it would fight the JS
        // updates. Anchored mode sets it once, so a transition makes
        // that single jump feel smooth instead of instant.
        mode === "anchored" ? "motion-safe:transition-[transform,opacity]" : ""
      }`}
    >
      <span
        ref={mediaRef}
        className="absolute inset-0 block overflow-hidden rounded-2xl border border-white/10 bg-ground-inverted shadow-2xl shadow-black/40"
      >
        <MediaCycler
          frames={preview.frames}
          sizes={`${PANEL_WIDTH}px`}
          className="absolute inset-0"
          placeholderClassName="bg-ground-inverted text-zinc-600"
        />
      </span>
    </div>
  );
}
