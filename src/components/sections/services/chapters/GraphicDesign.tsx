import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 07 — the closing chapter reads as a portfolio wall: copy
 * stays compact up top, then a modular gallery of five varied-ratio
 * tiles carries the rest of the chapter, art-direction-spread style.
 */
export default function GraphicDesign({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 border-t border-zinc-200 py-16 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12">
        <ScopeList label={scopeLabel} items={service.scope} className="lg:col-span-4" />
        <ServiceCopy
          question={service.question}
          importance={service.importance}
          approach={service.approach}
          className="mt-8 lg:col-span-8 lg:mt-0"
        />
      </div>

      <Reveal className="mt-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <AssetTile label={assetLabel} className="aspect-[3/4]" />
          <AssetTile label={assetLabel} className="aspect-square" />
          <AssetTile label={assetLabel} className="aspect-square" />
          <AssetTile label={assetLabel} className="aspect-[3/4]" />
          <AssetTile label={assetLabel} className="col-span-2 aspect-[21/9] sm:col-span-4" />
        </div>
      </Reveal>
    </article>
  );
}
