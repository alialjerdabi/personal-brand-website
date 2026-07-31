import Image from "next/image";
import type { HeroToken, LabAsset } from "@/data/lab";

/**
 * A cluster of work stills set inline, at the scale of the words either
 * side of them. Sized in `em` rather than pixels so they stay locked to
 * the type as it scales — the whole effect collapses the moment the
 * images stop being the same height as the letters beside them.
 */
function ChipCluster({ images }: { images: LabAsset[] }) {
  return (
    <span className="inline-flex translate-y-[0.06em] gap-[0.07em] align-[-0.16em]">
      {images.map((image, index) => (
        <span
          key={image.src}
          data-hero-chip
          className="relative inline-block h-[0.86em] w-[1.02em] origin-bottom overflow-hidden rounded-[0.16em] bg-lab-haze shadow-[0_3px_14px_rgb(19_23_30/0.14)] ring-1 ring-lab-hairline"
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
            sizes="160px"
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
    <span className="inline-block h-[0.5em] w-[1.5em] align-[0.08em] text-accent">
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
 * The sentence runs as continuous inline content — words, image clusters
 * and the arrow all in one flow — so it wraps like a sentence instead of
 * being assembled from rigid lines.
 *
 * Every element is emitted as a numbered `[data-hero-unit]` in reading
 * order, which is what lets the entrance animate as one left-to-right
 * pass instead of five unrelated effects firing at once (see
 * HeroScreen.tsx). The index lives in the markup rather than being
 * derived in the effect, because only this component knows the true
 * order once text has been split into words.
 *
 * Non-text units are aria-hidden and chips carry empty alt, so assistive
 * technology reads one clean sentence.
 */
export default function HeroSentence({
  tokens,
  className = "",
}: {
  tokens: HeroToken[];
  className?: string;
}) {
  let unit = 0;

  return (
    <span className={className}>
      {tokens.map((token, tokenIndex) => {
        if (token.kind === "text") {
          return token.value.split(" ").map((word) => (
            <span key={`${tokenIndex}-${word}-${unit}`}>
              <span data-hero-unit="word" data-unit-index={unit++} className="inline-block">
                {word}
              </span>{" "}
            </span>
          ));
        }

        if (token.kind === "arrow") {
          return (
            <span key={tokenIndex} aria-hidden="true">
              <span data-hero-unit="arrow" data-unit-index={unit++} className="inline-block">
                <DrawnArrow />
              </span>{" "}
            </span>
          );
        }

        return (
          <span key={tokenIndex} aria-hidden="true">
            <span data-hero-unit="chips" data-unit-index={unit++} className="inline-block">
              <ChipCluster images={token.images} />
            </span>{" "}
          </span>
        );
      })}
    </span>
  );
}
