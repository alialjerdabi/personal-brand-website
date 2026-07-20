import MediaCycler from "@/components/ui/MediaCycler";
import type { CycleFrame } from "@/data/hero";

interface AssetTileProps {
  label: string;
  dark?: boolean;
  className?: string;
}

/** How many placeholder frames each tile cycles through until real assets arrive. */
const PLACEHOLDER_FRAME_COUNT = 4;

/**
 * One honest asset slot, cycling every 2s through placeholder frames
 * until real media arrives (see docs/design-language-notes.md). Reuses
 * the site's established MediaCycler grammar (pan-up-and-settle exit,
 * grow-in entrance, pause-on-hover, static under reduced motion) rather
 * than inventing a new cycling mechanism — the same component the hero
 * and Method partner portrait already use. Swapping in real images
 * later is a drop-in: replace the placeholder frames with
 * `{ kind: "image", src, alt }` entries.
 */
export default function AssetTile({ label, dark = false, className = "" }: AssetTileProps) {
  const frames: CycleFrame[] = Array.from({ length: PLACEHOLDER_FRAME_COUNT }, (_, i) => ({
    kind: "placeholder",
    label: `${label} ${String(i + 1).padStart(2, "0")}`,
  }));

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${
        dark ? "border-white/15 bg-white/[0.03]" : "border-zinc-200 bg-zinc-50"
      } ${className}`.trim()}
    >
      <MediaCycler
        frames={frames}
        sizes="(min-width: 1024px) 50vw, 100vw"
        pauseOnHover
        className="absolute inset-0"
        placeholderClassName={`bg-transparent ${dark ? "text-zinc-500" : "text-zinc-300"}`}
      />
    </div>
  );
}
