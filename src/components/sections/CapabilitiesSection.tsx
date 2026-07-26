import Container from "@/components/layout/Container";
import CapabilitiesListInteractive from "@/components/sections/capabilities/CapabilitiesListInteractive";
import ShowcaseCard from "@/components/sections/capabilities/ShowcaseCard";
import WorkGrid from "@/components/sections/capabilities/WorkGrid";
import Reveal from "@/components/ui/Reveal";
import type { CapabilitiesContent } from "@/data/capabilities";
import { projects } from "@/data/projects";

interface CapabilitiesSectionProps {
  content: CapabilitiesContent;
}

/**
 * Capabilities block (between Acts II and III): the service list linking
 * into the services page, then the work proof — asymmetric 12-column
 * grid (Petrolas + two in-production placeholders + open slot). The
 * partner marquee stays dark until real names exist (2026-07-20; data
 * slot remains). All states are pure CSS.
 *
 * Seam rhythm (2026-07-20): tight bottom — this act compresses into the
 * dark climax that follows (pairs with PhilosophySection's pt).
 *
 * The capability list itself is CapabilitiesListInteractive.tsx (2026-07-20,
 * isolated hover-preview experiment — see its own doc comment) rather
 * than an inline `<ul>`; its markup/classes are unchanged from before.
 */
export default function CapabilitiesSection({ content }: CapabilitiesSectionProps) {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="overflow-x-clip bg-background pb-16 pt-20 sm:pb-20 sm:pt-24"
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
          {content.eyebrow}
        </p>
        <h2
          id="capabilities-heading"
          className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl"
        >
          {content.heading}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-foreground-muted">
          {content.description}
        </p>

        <CapabilitiesListInteractive capabilities={content.capabilities} />
      </Container>

      <Container id="work" size="wide" className="mt-24 scroll-mt-20 sm:mt-28">
        {/*
          Editorial entrance (2026-07-22, Ali's direction): the eyebrow
          settles first, then the four cards follow in reading order
          with irregular (not uniformly-spaced) delays — the asymmetry
          is what keeps it feeling composed rather than a generic
          identical stagger. The two wider lg:col-span-7 cards get a
          touch longer duration, reading as slightly heavier settling
          into place. Reveal already renders visible server-side and
          skips itself under reduced motion (see ui/Reveal.tsx), so the
          static grid and its exact spans/order are unchanged.
        */}
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
            {content.projectsLabel}
          </p>
        </Reveal>
        <WorkGrid defaultSlug="petrolas">
          <div className="lg:col-span-7">
            <Reveal delay={80} duration={450} scale>
              <ShowcaseCard project={projects[0]} />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:mt-14">
            <Reveal delay={150} duration={400} scale>
              <ShowcaseCard project={projects[1]} />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={220} duration={400} scale>
              <ShowcaseCard project={projects[2]} />
            </Reveal>
          </div>
          <Reveal delay={300} duration={450} scale className="lg:col-span-7 lg:mt-14 lg:self-stretch">
            <a
              href={content.openSlot.href}
              className="flex h-full min-h-56 flex-col items-start justify-end rounded-2xl border border-border p-8 transition-colors hover:border-foreground focus-visible:border-foreground focus-visible:outline-none"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
                {content.openSlot.label}
              </span>
              <span className="mt-4 max-w-xs text-2xl font-medium leading-snug tracking-tight text-foreground">
                {content.openSlot.title} →
              </span>
            </a>
          </Reveal>
        </WorkGrid>
      </Container>
    </section>
  );
}
