import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import type { CapabilitiesContent, ShowcaseProject } from "@/data/capabilities";

interface CapabilitiesSectionProps {
  content: CapabilitiesContent;
}

/**
 * How many copies of the partner list the marquee track carries. The
 * animation loops at -50%, so the first half of the track (copies / 2)
 * must be wider than any real viewport — eight copies of six tiles
 * keeps the strip seamless past 4K.
 */
const MARQUEE_COPIES = 8;

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
 * into the services page, the partner strip as a slow pausable marquee,
 * and the selected-work grid — asymmetric column spans and offsets on a
 * consistent 12-column grid and gap. All states are pure CSS.
 */
export default function CapabilitiesSection({ content }: CapabilitiesSectionProps) {
  const marqueePartners = Array.from(
    { length: MARQUEE_COPIES },
    () => content.partners
  ).flat();

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="overflow-x-clip bg-white py-28 sm:py-36"
    >
      <Container>
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

        <ul className="mt-12 border-t border-zinc-200">
          {content.capabilities.map((capability, index) => (
            <li key={capability.slug} className="border-b border-zinc-200">
              <Link
                href={`/services#${capability.slug}`}
                className="group flex items-baseline justify-between gap-6 py-4 focus-visible:outline-none"
              >
                <span className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-zinc-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-block text-2xl font-medium tracking-tight text-zinc-300 underline-offset-8 motion-safe:transition-[color,transform] motion-safe:duration-200 group-hover:translate-x-1 group-hover:text-zinc-950 group-focus-visible:translate-x-1 group-focus-visible:text-zinc-950 group-focus-visible:underline sm:text-3xl">
                    {capability.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-zinc-300 opacity-0 motion-safe:transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.partnersLabel}
        </p>
      </Container>
      <div className="relative mt-6">
        <ul className="flex w-max motion-safe:animate-[marquee_90s_linear_infinite] motion-safe:hover:[animation-play-state:paused]">
          {marqueePartners.map((partner, index) => (
            <li
              key={`${partner}-${index}`}
              aria-hidden={index >= content.partners.length}
              className="mr-4 flex h-20 w-48 shrink-0 items-center justify-center rounded-xl border border-zinc-200 px-6 text-sm font-medium uppercase tracking-[0.12em] text-zinc-500"
            >
              {partner}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"
        />
      </div>

      <Container className="mt-20">
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
