import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 01 — mostly typography, no image. The opening chapter sets
 * the page's quietest register deliberately: nothing but the words,
 * generous whitespace, so every image-led chapter after it registers
 * as a real change of pace rather than more of the same.
 *
 * Fixed 2026-07-20 (Ali caught it): as the FIRST chapter, this one
 * must start flush with the sidebar's "Navigation" label — no top
 * padding — so the two align on the same line, matching his sketch.
 * Every chapter after it keeps its own top padding/hairline as normal.
 */
export default function Consulting({ service, index, scopeLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 pb-20 pt-0 sm:pb-28"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <div className="mt-14 gap-16 sm:mt-16 lg:grid lg:grid-cols-12">
        <ScopeList label={scopeLabel} items={service.scope} className="lg:col-span-4" />
        <ServiceCopy
          question={service.question}
          importance={service.importance}
          approach={service.approach}
          className="mt-10 lg:col-span-8 lg:mt-0"
        />
      </div>
    </article>
  );
}
