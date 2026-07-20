import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 05 — technical, dashboard-led: a small grid of module tiles
 * (three "metric" cards over one wide "chart" strip) stands in for a
 * dashboard without fabricating any actual numbers. Returns to light
 * ground after chapter 04's dark break — no top hairline here either,
 * the color change back to light is already the divider.
 */
export default function AiAutomatedSystems({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 py-16 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <ServiceCopy question={service.question} importance={service.importance} approach={service.approach} />
          <ScopeList label={scopeLabel} items={service.scope} className="mt-8" />
        </div>

        <Reveal className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="grid grid-cols-3 gap-3">
            <AssetTile label={assetLabel} className="aspect-square" />
            <AssetTile label={assetLabel} className="aspect-square" />
            <AssetTile label={assetLabel} className="aspect-square" />
            <AssetTile label={assetLabel} className="col-span-3 aspect-[3/1]" />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
