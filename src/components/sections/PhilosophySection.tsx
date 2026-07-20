import Container from "@/components/layout/Container";
import GrowthStack from "@/components/sections/philosophy/GrowthStack";
import type { PhilosophyContent } from "@/data/philosophy";

interface PhilosophySectionProps {
  content: PhilosophyContent;
}

/**
 * Act III — The Philosophy: the dark act, staged as a blueprint stack
 * (redesigned 2026-07-18). Three editorial sheets dealt one by one —
 * Strategy, Experience, Systems — each overlapping the last until they
 * read as one layered system (see docs/landing-experience.md).
 *
 * Ending rebuilt 2026-07-20 (Ali's direction, from an annotated
 * screenshot): the fourth "payoff" card is gone. Once the three cards
 * settle, continued scrolling lifts all three away together and
 * reveals a full-screen editorial close underneath (GrowthStack owns
 * this — see its own doc comment). That close must break out of this
 * section's reading column to be genuinely full-bleed, so GrowthStack
 * is rendered OUTSIDE Container as a direct child of the section —
 * only the eyebrow/heading/intro and the three cards stay in-column;
 * GrowthStack re-wraps the cards in their own Container internally.
 *
 * Seam rhythm (2026-07-20): the entry is tighter than the exit — the
 * white act compresses into this climax, and the page's largest breath
 * follows it (this pb pairs with MethodSection's generous pt; per-seam
 * asymmetric spacing, same rule as the Problem→Capabilities seam).
 */
export default function PhilosophySection({ content }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="overflow-x-clip bg-zinc-950 pb-32 pt-24 text-white sm:pb-48 sm:pt-32"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="philosophy-heading"
          className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
        >
          {content.heading}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
          {content.intro}
        </p>
      </Container>

      <div className="mt-20 sm:mt-24">
        <GrowthStack
          cards={content.cards}
          eyebrow={content.eyebrow}
          heading={content.heading}
          payoff={content.payoff}
        />
      </div>
    </section>
  );
}
