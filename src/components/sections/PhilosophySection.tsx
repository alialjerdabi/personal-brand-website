import Container from "@/components/layout/Container";
import AssemblySpine from "@/components/sections/philosophy/AssemblySpine";
import type { PhilosophyContent } from "@/data/philosophy";

interface PhilosophySectionProps {
  content: PhilosophyContent;
}

/**
 * Act III — The Philosophy: the dark act, staged as an assembly
 * (redesigned 2026-07-17). One spine, three machined modules with
 * engraved spec lines, and the loop close — WHY connected systems win,
 * told the way premium hardware tells it: one object, benefits
 * attributed to unity itself (see docs/landing-experience.md).
 */
export default function PhilosophySection({ content }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-zinc-950 py-28 text-white sm:py-40"
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

        <div className="mt-20 sm:mt-28">
          <AssemblySpine pillars={content.pillars} loop={content.loop} />
        </div>
      </Container>
    </section>
  );
}
