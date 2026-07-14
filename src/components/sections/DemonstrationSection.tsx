import Image from "next/image";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import type { DemonstrationContent } from "@/data/demonstration";

interface DemonstrationSectionProps {
  content: DemonstrationContent;
}

/**
 * Act III — The Demonstration: the hero's One Client → Three Lenses
 * mechanic paid off in full. Dark ground marks the shift from claim to
 * proof (see docs/landing-experience.md, Act III). Chapters are a
 * chain, not a list — each handoff line is the link to the next lens.
 */
export default function DemonstrationSection({ content }: DemonstrationSectionProps) {
  return (
    <section
      id="work"
      aria-labelledby="demonstration-heading"
      className="bg-zinc-950 py-28 text-white sm:py-40"
    >
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {content.eyebrow}
        </p>
        <h2
          id="demonstration-heading"
          className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
        >
          {content.heading}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">
          {content.intro}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          {content.client} · {content.sector}
        </p>

        <div className="mt-24 sm:mt-32">
          {content.chapters.map((chapter, index) => (
            <article key={chapter.id} aria-labelledby={`chapter-${chapter.id}`}>
              <Reveal>
                <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
                  <div
                    className={`lg:col-span-7 ${
                      index % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""
                    }`}
                  >
                    <div className="border border-white/10 bg-white/[0.02] p-3 sm:p-4">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                        <Image
                          src={chapter.plate.src}
                          alt={chapter.plate.alt}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-10 lg:col-span-5 lg:mt-0 ${
                      index % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""
                    }`}
                  >
                    <p className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-zinc-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        id={`chapter-${chapter.id}`}
                        className="text-xl font-medium tracking-tight text-zinc-300"
                      >
                        {chapter.name}
                      </span>
                    </p>
                    <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
                      {chapter.outcome}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-7 text-zinc-400">
                      {chapter.detail}
                    </p>
                  </div>
                </div>
              </Reveal>

              {chapter.handoff && (
                <Reveal className="my-16 lg:my-20">
                  <div aria-hidden="true" className="ml-px h-14 w-px bg-white/20" />
                  <p className="mt-5 max-w-md text-lg leading-8 text-zinc-300">
                    {chapter.handoff}
                  </p>
                  <div aria-hidden="true" className="ml-px mt-5 h-14 w-px bg-white/20" />
                </Reveal>
              )}
            </article>
          ))}
        </div>

        <Reveal className="mt-28 sm:mt-36">
          <p className="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-4xl">
            {content.closing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
