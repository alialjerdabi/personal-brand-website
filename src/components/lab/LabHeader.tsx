import type { LabContent } from "@/data/lab";

/**
 * Deliberately quiet chrome. In a visual-first portfolio the navigation
 * is the least interesting thing on screen and should behave that way —
 * a wordmark, three destinations, no border, no pill, no shadow. The
 * composition underneath is what is doing the selling.
 */
export default function LabHeader({ content }: { content: LabContent }) {
  return (
    <header
      data-hero-chrome
      className="flex items-center justify-between gap-6 px-6 pt-6 sm:px-10 sm:pt-8"
    >
      <p className="text-sm font-semibold tracking-tight text-lab-ink">{content.identity}</p>
      <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-9">
        {content.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-lab-ink-muted transition-colors hover:text-lab-ink focus-visible:text-lab-ink focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
