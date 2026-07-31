import Image from "next/image";
import type { HeroToken, LabAsset } from "@/data/lab";

/**
 * A cluster of work stills set inline, at the scale of the words either
 * side of them. Sized in `em` rather than pixels so they stay locked to
 * the type as it scales — the whole effect collapses the moment the
 * images stop being the same height as the letters beside them.
 *
 * `align-[-0.14em]` rather than `align-middle`: middle aligns to the
 * x-height midpoint and leaves the cluster floating high against a line
 * this large.
 */
function ChipCluster({ images }: { images: LabAsset[] }) {
  return (
    <span className="inline-flex translate-y-[0.06em] gap-[0.08em] align-[-0.14em]">
      {images.map((image, index) => (
        <span
          key={image.src}
          data-hero-chip
          className="relative inline-block h-[0.82em] w-[0.98em] origin-bottom overflow-hidden rounded-[0.14em] bg-lab-haze shadow-[0_2px_10px_rgb(19_23_30/0.10)] ring-1 ring-lab-hairline"
          style={{
            // A hand-placed feel without any of the tilt the brief rules
            // out — a fraction of a degree, alternating, is enough.
            transform: `rotate(${index % 2 === 0 ? -1.2 : 1.4}deg)`,
          }}
        >
          <Image
            src={image.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="120px"
            className="object-cover"
          />
        </span>
      ))}
    </span>
  );
}

/**
 * The drawn arrow. Deliberately a single open curve rather than a loop:
 * it reads as a hand gesture at any size, and it is the one element on
 * the page allowed to look like it was not set by a machine.
 */
function DrawnArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[0.5em] w-[1.5em] align-[0.06em] text-accent"
    >
      {/*
        `pathLength="1"` normalises each path so the draw-on can be
        expressed as dasharray/dashoffset of 1 regardless of the real
        geometry — no measuring the path in JS, and the arrowhead stays
        in step with the stroke it belongs to.
      */}
      <svg viewBox="0 0 200 64" fill="none" className="h-full w-full overflow-visible">
        <path
          data-hero-arrow
          pathLength="1"
          d="M6 50C48 12 118 4 176 28"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          data-hero-arrow
          pathLength="1"
          d="M156 10L180 29L154 42"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * The headline, spoken rather than declared.
 *
 * The sentence runs as continuous inline content — text, image clusters
 * and the arrow all in one flow — so it wraps like a sentence instead of
 * being assembled from rigid lines. That is what makes the images read as
 * interruptions in speech rather than as a decorated layout, and it is
 * the whole personality of this direction.
 *
 * Every non-text token is aria-hidden and the chips carry empty alt, so
 * assistive technology reads one clean sentence.
 */
export default function HeroSentence({
  tokens,
  className = "",
}: {
  tokens: HeroToken[];
  className?: string;
}) {
  return (
    <span className={className}>
      {tokens.map((token, index) => {
        if (token.kind === "text") {
          return <span key={index}>{token.value} </span>;
        }
        if (token.kind === "arrow") {
          return (
            <span key={index}>
              <DrawnArrow />{" "}
            </span>
          );
        }
        return (
          <span key={index} aria-hidden="true">
            <ChipCluster images={token.images} />{" "}
          </span>
        );
      })}
    </span>
  );
}
