import Container from "@/components/layout/Container";
import AlignmentSequence from "@/components/sections/tension/AlignmentSequence";
import type { TensionContent } from "@/data/tension";

interface TensionSectionProps {
  content: TensionContent;
}

/**
 * Act II — The Tension. Purely typographic: no cards, no boxes.
 * The visitor should recognize their own company here before any
 * solution is offered (see docs/landing-experience.md, Act II).
 */
export default function TensionSection({ content }: TensionSectionProps) {
  return (
    <section
      id="problem"
      aria-labelledby="tension-heading"
      className="overflow-x-clip bg-white py-28 sm:py-40"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="tension-heading"
          className="mt-6 text-xl font-medium tracking-tight text-zinc-500 sm:text-2xl"
        >
          {content.lead}
        </h2>

        <AlignmentSequence
          fragments={content.fragments}
          turnLines={content.turnLines}
          bridge={content.bridge}
        />
      </Container>
    </section>
  );
}
