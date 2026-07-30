import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ApertureText from "@/components/lab/ApertureText";
import LabHeader from "@/components/lab/LabHeader";
import type { LabAsset, LabContent, LabProject, LabSpread } from "@/data/lab";

/**
 * A designed artefact — a poster, a guidelines page — presented as an
 * object on the ground rather than bled to the edge. These assets carry
 * their own typography; running them full width puts two type systems in
 * a fight the page always loses.
 */
function Plate({ asset, sizes }: { asset: LabAsset; sizes: string }) {
  return (
    <div className="border border-lab-rule bg-lab-surface p-3 sm:p-4">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image src={asset.src} alt={asset.alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

/** Photographic material, run edge to edge. */
function Bleed({ asset, ratio, sizes }: { asset: LabAsset; ratio: string; sizes: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${ratio}`}>
      <Image src={asset.src} alt={asset.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function SpreadAssets({ spread }: { spread: LabSpread }) {
  const [first, second, third] = spread.assets;

  if (spread.layout === "plates") {
    // Equal widths, unequal tops. The stagger is what keeps three
    // posters from reading as a card grid.
    const offsets = ["sm:mt-0", "sm:mt-20", "sm:mt-10"];
    return (
      <div className="grid gap-8 px-6 sm:grid-cols-3 sm:gap-10 sm:px-10">
        {spread.assets.map((asset, index) => (
          <Reveal key={asset.src} mask delay={index * 90} duration={550} className={offsets[index]}>
            <Plate asset={asset} sizes="(max-width: 640px) 88vw, 30vw" />
          </Reveal>
        ))}
      </div>
    );
  }

  if (spread.layout === "bleeds") {
    return (
      <div>
        <Reveal mask duration={600}>
          <Bleed asset={first} ratio="aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" />
        </Reveal>
        <div className="mt-8 grid gap-8 px-6 sm:px-10 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <Reveal mask delay={80} duration={550} className="lg:col-span-7">
            <Bleed asset={second} ratio="aspect-[4/3]" sizes="(max-width: 1024px) 88vw, 55vw" />
          </Reveal>
          <Reveal mask delay={170} duration={550} className="lg:col-span-4 lg:col-start-9 lg:mt-20">
            <Bleed asset={third} ratio="aspect-[4/3]" sizes="(max-width: 1024px) 88vw, 30vw" />
          </Reveal>
        </div>
      </div>
    );
  }

  // "bleed-plate" — the photograph carries the spread, the artefact sits
  // against it as evidence, pulled up into the photograph's lower margin.
  return (
    <div>
      <Reveal mask duration={600}>
        <Bleed asset={first} ratio="aspect-[16/9] lg:aspect-[2/1]" sizes="100vw" />
      </Reveal>
      <div className="px-6 sm:px-10">
        <Reveal
          mask
          delay={120}
          duration={550}
          className="mt-8 w-full sm:w-2/3 lg:-mt-28 lg:ml-auto lg:w-[26%]"
        >
          <Plate asset={second} sizes="(max-width: 640px) 88vw, 26vw" />
        </Reveal>
      </div>
    </div>
  );
}

function Spread({ spread }: { spread: LabSpread }) {
  return (
    <article className="mt-28 first:mt-0 sm:mt-40">
      <div className="px-6 sm:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {spread.label}
          </p>
        </Reveal>

        <Reveal mask duration={600} className="mt-5">
          {/*
            15vw: the spread title is the loudest element on the page and
            has to hold that job on a phone too. Measured against the
            longest title ("CAMPAIGN", which sets 5.12× its own font size)
            it fills 83–90% of the column from 320px up and cannot wrap.
          */}
          <h2 className="text-[clamp(3rem,15vw,17rem)] font-semibold leading-[0.86] tracking-[-0.05em]">
            <ApertureText aperture={spread.aperture}>{spread.title}</ApertureText>
          </h2>
        </Reveal>

        <div className="mt-8 flex border-t border-lab-rule pt-5 sm:justify-end">
          <p className="max-w-md text-base leading-7 text-lab-ink-muted">{spread.note}</p>
        </div>
      </div>

      <div className="mt-10 sm:mt-14">
        <SpreadAssets spread={spread} />
      </div>
    </article>
  );
}

interface CaseStudyProps {
  content: LabContent;
  project: LabProject;
  /** The project to hand the visitor next, if there is a built one. */
  next?: LabProject;
}

/**
 * The case study — where all the substance lives in this direction.
 *
 * The lobby says almost nothing on purpose, which only works if the page
 * behind each cover is generous: full metadata, a short titled section
 * per discipline, and the assets at scale. Each spread is composed for
 * the material it holds rather than poured into a shared grid, with the
 * discipline cut out of that spread's own imagery as its title.
 */
export default function CaseStudy({ content, project, next }: CaseStudyProps) {
  return (
    <main id="main" className="bg-lab-ground text-lab-ink">
      <LabHeader content={content} />

      <div className="px-6 pt-16 sm:px-10 sm:pt-24">
        <Reveal mask duration={600} className="pb-[0.06em]">
          <h1 className="text-[clamp(3rem,12vw,11rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            {project.name}
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-8 border-t border-lab-rule pt-8 sm:mt-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <dl className="space-y-3 font-mono text-[11px] uppercase tracking-[0.28em]">
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-lab-ink-muted">Year</dt>
                <dd className="text-lab-ink">{project.year}</dd>
              </div>
              {project.sector && (
                <div className="flex gap-4">
                  <dt className="w-20 shrink-0 text-lab-ink-muted">Sector</dt>
                  <dd className="text-lab-ink">{project.sector}</dd>
                </div>
              )}
              {project.disciplines.length > 0 && (
                <div className="flex gap-4">
                  <dt className="w-20 shrink-0 text-lab-ink-muted">Role</dt>
                  <dd className="text-accent">{project.disciplines.join(", ")}</dd>
                </div>
              )}
            </dl>
          </Reveal>

          {project.summary && (
            <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-2xl text-xl leading-9 text-lab-ink/85 sm:text-2xl sm:leading-10">
                {project.summary}
              </p>
            </Reveal>
          )}
        </div>
      </div>

      <div className="mt-24 sm:mt-32">
        {project.spreads?.map((spread) => (
          <Spread key={spread.id} spread={spread} />
        ))}
      </div>

      <div className="mt-28 px-6 pb-16 sm:mt-40 sm:px-10 sm:pb-24">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-lab-rule pt-8 sm:flex-row sm:items-baseline sm:justify-between">
            <Link
              href="/lab"
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-lab-ink-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
            >
              ← All work
            </Link>

            {next && (
              <Link
                href={`/lab/${next.slug}`}
                className="group text-right text-2xl font-semibold tracking-[-0.03em] transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none sm:text-3xl"
              >
                <span className="block font-mono text-[11px] font-normal uppercase tracking-[0.28em] text-lab-ink-muted">
                  Next project
                </span>
                <span className="mt-2 inline-flex items-baseline gap-3">
                  {next.name}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
