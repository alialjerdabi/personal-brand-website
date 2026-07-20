import Container from "@/components/layout/Container";
import ProblemReveal from "@/components/sections/tension/ProblemReveal";
import type { TensionContent } from "@/data/tension";

interface TensionSectionProps {
  content: TensionContent;
}

/**
 * Act II — The Tension. Purely typographic: no cards, no boxes.
 * The visitor should recognize their own company here before any
 * solution is offered (see docs/landing-experience.md, Act II).
 *
 * Bottom padding is deliberately generous (pb-32/48) relative to its
 * top: this is the section where an idea needs to be absorbed before
 * Capabilities begins — see CapabilitiesSection's tighter top padding,
 * its counterpart in the same rhythm decision (2026-07-20).
 */
export default function TensionSection({ content }: TensionSectionProps) {
  return (
    <section
      id="problem"
      aria-labelledby="tension-heading"
      className="overflow-x-clip bg-white pb-32 pt-14 sm:pb-48 sm:pt-20"
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>

        <div className="mt-6">
          <ProblemReveal
            lead={content.lead}
            fragments={content.fragments}
            turnLines={content.turnLines}
            bridge={content.bridge}
          />
        </div>
      </Container>
    </section>
  );
}
