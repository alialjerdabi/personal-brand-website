import Link from "next/link";
import type { LabContent } from "@/data/lab";

/**
 * A nav that floats as an object on the page rather than sitting as a
 * bar welded to the top edge. It is the first thing that signals this
 * page is friendly: rounded, inset from every edge, casting a soft
 * shadow onto the wash behind it.
 *
 * Sticky rather than fixed, so it travels with the page without
 * overlaying content at the end of the document.
 */
export default function FloatingNav({ content }: { content: LabContent }) {
  return (
    <div
      data-hero-chrome
      className="sticky top-3 z-40 px-3 sm:top-5 sm:px-5"
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-[1.35rem] border border-white/70 bg-white/70 py-2.5 pl-5 pr-2.5 shadow-[0_10px_40px_-16px_rgb(19_23_30/0.30)] backdrop-blur-xl sm:py-3 sm:pl-7 sm:pr-3">
        <Link
          href="/lab"
          className="flex items-center gap-2.5 focus-visible:outline-none"
          aria-label={`${content.identity} — home`}
        >
          {/* The mark: a rule and a rising arc. Drawn, not licensed. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 40 24"
            className="h-5 w-8 text-lab-ink-warm sm:h-6 sm:w-10"
            fill="none"
          >
            <path
              d="M3 21h34"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M8 21a12 12 0 0 1 24 0"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M20 3v3M31 8l2-2M9 8L7 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-[15px] font-bold tracking-[-0.01em] text-lab-ink-warm">
            {content.identity}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[15px] text-lab-ink-soft transition-colors hover:text-lab-ink-warm focus-visible:text-lab-ink-warm focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={content.navCta.href}
          className="rounded-full bg-lab-ink-warm px-5 py-2.5 font-display text-[14px] font-bold text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-ink-warm focus-visible:ring-offset-2 sm:px-6"
        >
          {content.navCta.label}
        </a>
      </header>
    </div>
  );
}
