import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import LensExplorer from "@/components/sections/hero/LensExplorer";
import LocalTime from "@/components/sections/hero/LocalTime";
import type { HeroContent } from "@/data/hero";

interface HeroSectionProps {
  content: HeroContent;
}

/**
 * The hero is a single compressed statement: quiet chrome, a short
 * poster-scale headline, and the lens demonstration as centerpiece.
 * The interaction (LensExplorer) carries the philosophy; the type
 * carries the voice. See docs/hero-spec.md and the approved
 * One Client, Three Lenses direction.
 */
export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="bg-white pb-20 pt-8 sm:pt-10 lg:pb-24"
    >
      <Container>
        <header className="flex items-baseline justify-between gap-6 border-b border-zinc-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950">
            {content.identity}
          </p>
          <p className="hidden text-[11px] uppercase tracking-[0.3em] text-zinc-400 md:block">
            {content.disciplines}
          </p>
          <a
            href={content.contactCta.href}
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 underline-offset-4 hover:underline"
          >
            {content.contactCta.label} →
          </a>
        </header>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <h1
            id="hero-heading"
            className="text-6xl font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-950 sm:text-8xl lg:text-9xl"
          >
            {content.headline}
          </h1>
          <p className="mt-8 max-w-sm text-lg leading-8 text-zinc-500 sm:text-xl lg:ml-1">
            {content.positioning}
          </p>
        </div>

        <div className="mt-20 sm:mt-24 lg:mt-28">
          <LensExplorer
            workLabel={content.workLabel}
            flagship={content.flagship}
            lenses={content.lenses}
          />
        </div>

        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <CTAButton cta={content.cta} variant="primary" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            {content.status.location} · <LocalTime timeZone={content.status.timeZone} /> ·{" "}
            {content.status.availability}
          </p>
        </div>
      </Container>
    </section>
  );
}
