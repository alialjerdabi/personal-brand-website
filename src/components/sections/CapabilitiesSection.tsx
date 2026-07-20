import Image from "next/image";
import Container from "@/components/layout/Container";
import CapabilitiesListInteractive from "@/components/sections/capabilities/CapabilitiesListInteractive";
import type { CapabilitiesContent, ShowcaseProject } from "@/data/capabilities";

interface CapabilitiesSectionProps {
  content: CapabilitiesContent;
}

/**
 * Reverted 2026-07-20 (Ali preferred the original over the full-measure
 * feature): back to a real card that also renders "in production"
 * placeholders as honest, non-linking states — the mid-story break is
 * the asymmetric grid itself, not one enlarged image.
 */
function ShowcaseCard({ project }: { project: ShowcaseProject }) {
  const media = (
    <span
      className={`relative block overflow-hidden rounded-2xl ${
        project.placeholder ? "border border-zinc-200 bg-zinc-50" : "bg-zinc-900"
      } ${project.tall ? "aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]"}`}
    >
      {project.placeholder ? (
        <>
          {/* Pan animation is wired and waiting for real assets. */}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-300 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:-translate-x-1/4">
            [ case study ]
          </span>
          <span className="absolute inset-0 flex translate-x-full items-center justify-center bg-zinc-100 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:translate-x-0">
            in production
          </span>
        </>
      ) : (
        <>
          <Image
            src={project.cover!.src}
            alt={project.cover!.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:-translate-x-1/4 group-focus-visible:-translate-x-1/4"
          />
          <Image
            src={project.reveal!.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="translate-x-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
          />
        </>
      )}
    </span>
  );

  const caption = (
    <span className="mt-4 flex items-baseline justify-between gap-6">
      <span className="text-lg font-medium tracking-tight text-zinc-950">{project.title}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
        {project.tag}
      </span>
    </span>
  );

  if (project.placeholder) {
    return (
      <div className="group block">
        {media}
        {caption}
      </div>
    );
  }

  return (
    <a href={project.href} className="group block focus-visible:outline-none">
      {media}
      {caption}
    </a>
  );
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
      className="overflow-x-clip bg-white pb-16 pt-20 sm:pb-20 sm:pt-24"
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="capabilities-heading"
          className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-4xl"
        >
          {content.heading}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-500">
          {content.description}
        </p>

        <CapabilitiesListInteractive capabilities={content.capabilities} />
      </Container>

      <Container id="work" size="wide" className="mt-24 scroll-mt-20 sm:mt-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.projectsLabel}
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ShowcaseCard project={content.projects[0]} />
          </div>
          <div className="lg:col-span-5 lg:mt-14">
            <ShowcaseCard project={content.projects[1]} />
          </div>
          <div className="lg:col-span-5">
            <ShowcaseCard project={content.projects[2]} />
          </div>
          <a
            href={content.openSlot.href}
            className="flex min-h-56 flex-col items-start justify-end rounded-2xl border border-zinc-200 p-8 transition-colors hover:border-zinc-950 focus-visible:border-zinc-950 focus-visible:outline-none lg:col-span-7 lg:mt-14 lg:self-stretch"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              {content.openSlot.label}
            </span>
            <span className="mt-4 max-w-xs text-2xl font-medium leading-snug tracking-tight text-zinc-950">
              {content.openSlot.title} →
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
