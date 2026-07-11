import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import type { FinalCtaContent } from "@/data/homepage";

interface CTASectionProps {
  content: FinalCtaContent;
}

export default function CTASection({ content }: CTASectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="bg-gradient-to-b from-zinc-900 to-zinc-950 py-24 sm:py-32"
    >
      <Container className="text-center">
        <h2
          id="cta-heading"
          className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl"
        >
          {content.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300 sm:text-xl">
          {content.description}
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButton cta={content.cta} variant="inverted" />
        </div>
      </Container>
    </section>
  );
}
