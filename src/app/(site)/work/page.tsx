import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Reveal from "@/components/ui/Reveal";
import FeaturedProjectMedia from "@/components/sections/work/FeaturedProjectMedia";
import ProjectIndexNav from "@/components/sections/work/ProjectIndexNav";
import { projects } from "@/data/projects";
import { workArchiveContent } from "@/data/work";
import type { Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Ali Aljardabi",
  description:
    "Selected work: brand identity systems, digital experiences, and connected operations, built as one system rather than commissioned apart.",
};

const FEATURE_SIZES = "100vw";
const THUMB_SIZES = "(min-width: 1024px) 20vw, 33vw";

function FinishedProjectSection({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="scroll-mt-24 border-t border-border pb-20 pt-16 sm:pb-24 sm:pt-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
          {project.disciplines.join(" · ")} — {project.industry}
        </p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-7xl">
          {project.name}
        </h2>
      </Reveal>

      <Reveal mask delay={80} className="mt-10 aspect-[16/9] rounded-2xl sm:aspect-[21/9]">
        {project.route ? (
          <Link href={project.route} className="group relative block h-full w-full focus-visible:outline-none">
            <FeaturedProjectMedia slides={project.slides} sizes={FEATURE_SIZES} />
            <span className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground opacity-0 shadow-lg transition-opacity motion-safe:duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              View case study →
            </span>
          </Link>
        ) : (
          <div className="relative h-full w-full">
            <FeaturedProjectMedia slides={project.slides} sizes={FEATURE_SIZES} />
          </div>
        )}
      </Reveal>

      {project.route && (
        <Reveal delay={120} className="mt-6">
          <Link
            href={project.route}
            className="inline-flex items-center gap-2 text-base font-medium text-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            View the full case study →
          </Link>
        </Reveal>
      )}

      {project.thumbnails.length > 0 && (
        <Reveal delay={160} className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">From the project</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.thumbnails.map((thumb, index) => (
              <Reveal key={thumb.image.src} mask delay={index * 40}>
                <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-surface">
                  <Image src={thumb.image.src} alt={thumb.image.alt} fill sizes={THUMB_SIZES} className="object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground">
                    {thumb.discipline}
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      )}
    </article>
  );
}

function PlaceholderProjectSection({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="scroll-mt-24 border-t border-border py-14 sm:py-16"
    >
      <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">{project.status}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-foreground-faint sm:text-4xl">
            {project.name}
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
          [ case study ]
        </span>
      </Reveal>
    </article>
  );
}

export default function WorkPage() {
  const content = workArchiveContent;
  const finished = projects.filter((project) => !project.placeholder);
  const placeholders = projects.filter((project) => project.placeholder);

  return (
    <main id="main" className="bg-background">
      <Container size="wide">
        <header className="flex items-center justify-between gap-6 pt-6 sm:pt-8">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
          >
            {content.identity}
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent focus-visible:outline-none sm:block"
            >
              ← {content.backLabel}
            </Link>
            <ThemeToggle />
            <CTAButton cta={content.navCta} variant="primary" size="sm" dot />
          </div>
        </header>

        {/* Opening statement */}
        <div className="mt-16 max-w-3xl sm:mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">{content.eyebrow}</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-7xl lg:text-8xl">
            {content.heading}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-foreground-muted sm:text-xl">{content.intro}</p>
        </div>

        {/* Project index — full-width horizontal scroller on mobile (no grid applies below lg), sticky sidebar column on desktop. */}
        <div className="mt-14 gap-12 pb-8 sm:mt-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint lg:mb-5">
              All projects
            </p>
            <ProjectIndexNav projects={projects} currentSlug={projects[0].slug} mode="scroll" />
          </div>

          <div>
            {finished.map((project) => (
              <FinishedProjectSection key={project.slug} project={project} />
            ))}
            {placeholders.map((project) => (
              <PlaceholderProjectSection key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>

      {/* Closing invitation — same register as the site's other dark closes (CTASection, case-study closings). */}
      <section aria-labelledby="work-cta-heading" className="bg-ground-inverted pb-16 pt-20 text-ink-on-inverted sm:pb-20 sm:pt-28">
        <Container size="wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">{content.closing.eyebrow}</p>
          <h2
            id="work-cta-heading"
            className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl"
          >
            {content.closing.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">{content.closing.body}</p>
          <div className="mt-10">
            <CTAButton cta={content.closing.cta} variant="inverted" />
          </div>
        </Container>
      </section>
    </main>
  );
}
