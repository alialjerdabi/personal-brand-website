import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 03 — editorial and analytical: the copy leads (wider column,
 * scope folded into the same reading flow as the argument) while a
 * small offset tile cluster stands in for planning material — a
 * "working desk," not a hero image.
 */
export default function StrategyPositioning({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 border-t border-zinc-200 py-16 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <ServiceCopy question={service.question} importance={service.importance} approach={service.approach} />
          <ScopeList label={scopeLabel} items={service.scope} className="mt-8" />
        </div>

        <Reveal className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="grid grid-cols-2 gap-3">
            <AssetTile label={assetLabel} className="col-span-2 aspect-[3/2]" />
            <AssetTile label={assetLabel} className="aspect-square" />
            <AssetTile label={assetLabel} className="aspect-square" />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
