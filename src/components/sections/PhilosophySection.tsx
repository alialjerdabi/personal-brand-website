import Container from "@/components/layout/Container";
import GrowthStack from "@/components/sections/philosophy/GrowthStack";
import type { PhilosophyContent } from "@/data/philosophy";

interface PhilosophySectionProps {
  content: PhilosophyContent;
}

/**
 * Act III — The Philosophy: the dark act, staged as a blueprint stack
 * (redesigned 2026-07-18). Four editorial sheets dealt one by one —
 * Strategy, Experience, Systems, and the Growth System payoff — each
 * overlapping the last until they read as one layered system
 * (see docs/landing-experience.md).
 */
export default function PhilosophySection({ content }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="overflow-x-clip bg-zinc-950 py-28 text-white sm:py-40"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="philosophy-heading"
          className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
        >
          {content.heading}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
          {content.intro}
        </p>

        <div className="mt-20 sm:mt-24">
          <GrowthStack cards={content.cards} />
        </div>
      </Container>
    </section>
  );
}
