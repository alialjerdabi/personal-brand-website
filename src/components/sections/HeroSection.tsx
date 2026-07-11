import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import type { HeroContent } from "@/data/homepage";

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="bg-white bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.05),rgba(255,255,255,0))] py-28 sm:py-40 lg:py-48"
    >
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {content.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-7xl"
        >
          {content.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
          {content.subheadline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CTAButton cta={content.primaryCta} variant="primary" />
          <CTAButton cta={content.secondaryCta} variant="secondary" />
        </div>
      </Container>
    </section>
  );
}
