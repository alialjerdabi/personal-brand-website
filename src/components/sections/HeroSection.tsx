import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import ServiceCards from "@/components/sections/hero/ServiceCards";
import LocalTime from "@/components/sections/hero/LocalTime";
import type { HeroContent } from "@/data/hero";

/**
 * Act I — The Thesis. Quiet chrome, the poster statement on the left,
 * and three service cards as the interactive proof on the right
 * (approved hero redesign, 2026-07-14). The cards open the One Client →
 * Three Lenses story that Act III pays off in full.
 */
export default function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="bg-white pb-20 pt-6 sm:pt-8 lg:pb-24"
    >
      <Container>
        <header className="entrance-1 flex items-center justify-between gap-6">
          <p className="text-base font-semibold tracking-tight text-zinc-950">
            {content.identity}
          </p>
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {content.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:text-zinc-950 focus-visible:underline focus-visible:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <CTAButton cta={content.navCta} variant="primary" size="sm" dot />
        </header>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center lg:gap-16">
          <div>
            <h1
              id="hero-heading"
              className="entrance-2 text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-zinc-950 sm:text-6xl xl:text-7xl"
            >
              {content.headline}
            </h1>
            <p className="entrance-3 mt-7 max-w-sm text-lg leading-8 text-zinc-500">
              {content.positioning}
            </p>
            <div className="entrance-4 mt-10">
              <CTAButton cta={content.cta} variant="secondary" />
            </div>
          </div>

          <div className="entrance-5">
            <ServiceCards services={content.services} />
          </div>
        </div>

        <div className="entrance-5 mt-12 flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 lg:mt-14">
          <p>
            {content.status.location} · <LocalTime timeZone={content.status.timeZone} /> ·{" "}
            {content.status.availability}
          </p>
          <p aria-hidden="true" className="shrink-0 text-zinc-400">
            [ scroll ]
          </p>
        </div>
      </Container>
    </section>
  );
}
