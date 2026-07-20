import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 06 — cinematic and image-led: one ultra-wide frame carries
 * the chapter before any copy appears, then the usual scope/copy split
 * follows underneath, compact by comparison.
 */
export default function MarketingProduction({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 border-t border-zinc-200 py-16 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <Reveal className="mt-10">
        <AssetTile label={assetLabel} className="aspect-[21/9]" />
      </Reveal>

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12">
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
