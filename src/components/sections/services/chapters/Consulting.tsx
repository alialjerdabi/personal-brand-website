import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 01 — mostly typography, no image, framed as its own card
 * matching Web/App Design's shape and now its dark ground too
 * (2026-07-20, Ali's direction — a deliberate second dark chapter,
 * bookending the page's opening). Still the quietest register inside
 * the frame: no image, generous whitespace, the words carry it.
 */
export default function Consulting({ service, index, scopeLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 rounded-2xl bg-zinc-950 px-6 py-16 text-white sm:px-10 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} dark />

      <div className="mt-14 gap-10 sm:mt-16 lg:grid lg:grid-cols-12">
        <ScopeList label={scopeLabel} items={service.scope} dark className="lg:col-span-4" />
        <ServiceCopy
          question={service.question}
          importance={service.importance}
          approach={service.approach}
          dark
          className="mt-10 lg:col-span-8 lg:mt-0"
        />
      </div>
    </article>
  );
}
