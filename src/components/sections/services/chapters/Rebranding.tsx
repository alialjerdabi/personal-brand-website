import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 02 — one large identity visual carries the chapter; copy
 * sits in a narrower supporting column beside it, not competing for
 * attention the way Consulting's typography-only spread does.
 */
export default function Rebranding({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 border-t border-zinc-200 py-16 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} />

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-7">
          <AssetTile label={assetLabel} className="aspect-[4/5]" />
        </Reveal>

        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <ScopeList label={scopeLabel} items={service.scope} />
          <ServiceCopy
            question={service.question}
            importance={service.importance}
            approach={service.approach}
            className="mt-8"
          />
        </div>
      </div>
    </article>
  );
}
