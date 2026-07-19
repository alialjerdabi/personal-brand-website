import Container from "@/components/layout/Container";
import MediaCycler from "@/components/ui/MediaCycler";
import LocalTime from "@/components/sections/hero/LocalTime";
import MethodRail from "@/components/sections/method/MethodRail";
import Reveal from "@/components/ui/Reveal";
import type { MethodContent } from "@/data/method";

interface MethodSectionProps {
  content: MethodContent;
}

/**
 * Act IV — The Method + The Partner: the light-ground exhale between
 * the demonstration and the invitation. The four steps read as one
 * editorial line on a shared rail (skimmable in fifteen seconds); the
 * partner coda puts a person behind the method before the page asks
 * for anything (see docs/landing-experience.md, Act IV).
 *
 * Seam rhythm (2026-07-20): generous top — the page's largest breath,
 * the exhale after the dark act's climax (pairs with PhilosophySection's
 * pb) — and a tighter bottom, so the momentum of the method carries
 * straight into the invitation.
 */
export default function MethodSection({ content }: MethodSectionProps) {
  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="bg-white pb-20 pt-28 sm:pb-24 sm:pt-40"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="method-heading"
          className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-4xl"
        >
          {content.heading}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-500">
          {content.intro}
        </p>

        <div className="mt-14">
          <MethodRail steps={content.steps} />
        </div>

        <Reveal className="mt-24 sm:mt-28">
          <div className="grid gap-10 border-t border-zinc-200 pt-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <span className="relative block aspect-[4/5] max-w-52 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <MediaCycler
                  frames={content.partner.portrait}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="absolute inset-0"
                  placeholderClassName="bg-zinc-50 text-zinc-300"
                />
              </span>
            </div>
            <div className="lg:col-span-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                {content.partner.eyebrow}
              </p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-3xl">
                {content.partner.heading}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
                {content.partner.statement}
              </p>
              <p className="mt-6 text-lg font-medium tracking-tight text-zinc-950">
                {content.partner.closing}
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                {content.partner.location} ·{" "}
                <LocalTime timeZone={content.partner.timeZone} /> ·{" "}
                {content.partner.availability}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
