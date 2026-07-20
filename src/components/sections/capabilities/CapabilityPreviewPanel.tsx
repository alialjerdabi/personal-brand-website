import type { RefObject } from "react";
import MediaCycler from "@/components/ui/MediaCycler";
import type { CapabilityPreview } from "@/data/capabilityPreviews";

interface CapabilityPreviewPanelProps {
  preview: CapabilityPreview;
  panelRef: RefObject<HTMLDivElement | null>;
}

/** Consistently sized across every capability — see CapabilitiesListInteractive.tsx. */
export const PANEL_WIDTH = 288;
export const PANEL_HEIGHT = 208;

/**
 * The floating panel itself — purely presentational. Position is
 * driven entirely by direct style mutation on `panelRef` from the
 * interactive list (see CapabilitiesListInteractive.tsx) so continuous
 * pointer tracking never triggers a React re-render.
 *
 * `aria-hidden`: this is a supplementary visual only — the row's own
 * link text and destination already carry the meaning. A panel that
 * silently appears/disappears near the cursor isn't something a screen
 * reader user needs announced.
 */
export default function CapabilityPreviewPanel({ preview, panelRef }: CapabilityPreviewPanelProps) {
  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      style={{ width: PANEL_WIDTH, height: PANEL_HEIGHT }}
      className="pointer-events-none fixed left-0 top-0 z-30 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 opacity-0 shadow-2xl shadow-black/40 motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-out"
    >
      <MediaCycler
        frames={preview.frames}
        sizes={`${PANEL_WIDTH}px`}
        className="absolute inset-0"
        placeholderClassName="bg-zinc-900 text-zinc-600"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
          {preview.label}
        </span>
      </span>
    </div>
  );
}
