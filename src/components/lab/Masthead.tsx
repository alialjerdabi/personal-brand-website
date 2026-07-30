import Link from "next/link";
import type { LabContent } from "@/data/lab";

/**
 * The name, set edge to edge, closing the screen.
 *
 * Ali has no logo mark, so the name at full bleed IS the mark. The font
 * size is derived from the viewport rather than picked from a scale —
 * `(100vw − padding) / RATIO` — so the wordmark fills the measure exactly
 * at every width instead of approximately at one. RATIO is the measured
 * width of this exact string at this weight and tracking, as a multiple
 * of its own font size; change the name or the tracking and it has to be
 * re-measured, which is why it is named rather than inlined.
 *
 * It sits at the bottom, not the top: the covers get the eye first and
 * the page signs itself underneath them.
 */
const MASTHEAD_RATIO = 7.16;

export default function Masthead({
  content,
  href,
}: {
  content: LabContent;
  /** Set on inner pages, where the masthead doubles as the way home. */
  href?: string;
}) {
  const wordmark = (
    <span
      data-masthead
      className="block whitespace-nowrap font-semibold uppercase leading-[0.78] tracking-[-0.045em] text-accent"
      style={{ fontSize: `calc((100vw - 48px) / ${MASTHEAD_RATIO})` }}
    >
      {content.identity}
    </span>
  );

  return (
    <div className="overflow-hidden px-6 pb-5 pt-2 sm:pb-6">
      {href ? (
        <Link
          href={href}
          aria-label="Back to work"
          className="block transition-colors hover:text-lab-ink focus-visible:text-lab-ink focus-visible:outline-none"
        >
          {wordmark}
        </Link>
      ) : (
        wordmark
      )}
    </div>
  );
}
