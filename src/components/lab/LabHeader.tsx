import type { LabContent } from "@/data/lab";

/**
 * The thin bar at the top: what this is on the left, where to go on the
 * right, and the orange rule underneath.
 *
 * Everything here renders in the accent, not in muted grey. Committing
 * the whole interface layer to one saturated colour — and leaving
 * full-colour imagery as the only exception — is what stops restraint
 * from reading as timidity. The covers are the only thing on the page
 * allowed to be photographic.
 */
export default function LabHeader({ content }: { content: LabContent }) {
  return (
    <div className="px-6">
      <div
        data-hero-chrome
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-6 sm:pt-7"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {content.descriptor}
        </p>
        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent transition-colors hover:text-lab-ink focus-visible:text-lab-ink focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <span
        data-lobby-rule
        style={{ transform: "scaleX(0)" }}
        className="mt-4 block h-px w-full origin-left bg-accent sm:mt-5"
      />
    </div>
  );
}
