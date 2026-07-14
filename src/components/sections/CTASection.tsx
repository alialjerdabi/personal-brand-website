import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import type { FinalCtaContent } from "@/data/homepage";

interface CTASectionProps {
  content: FinalCtaContent;
}

/**
 * Stand-in for Act V — The Invitation (rebuilt properly in Phase 3,
 * see docs/roadmap.md). Kept in the page's editorial voice: left-aligned,
 * flat dark ground, act-opener eyebrow, hairline act divider.
 */
export default function CTASection({ content }: CTASectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="border-t border-white/10 bg-zinc-950 py-28 text-white sm:py-36"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="cta-heading"
          className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl"
        >
          {content.heading}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
          {content.description}
        </p>
        <div className="mt-10">
          <CTAButton cta={content.cta} variant="inverted" />
        </div>
      </Container>
    </section>
  );
}
