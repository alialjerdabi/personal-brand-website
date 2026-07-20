import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import ServiceCopy from "@/components/sections/services/ServiceCopy";
import AssetTile from "@/components/sections/services/AssetTile";
import Reveal from "@/components/ui/Reveal";
import type { ChapterProps } from "@/components/sections/services/chapterProps";

/**
 * Chapter 04 — the one dark chapter on the page: a genuine change of
 * ground, not just a different image. The color change is its own
 * divider (same rule the homepage uses), so this chapter carries no
 * top hairline — nor does the one after it, which returns to light.
 * One large mockup dominates before any copy appears.
 */
export default function WebAppDesign({ service, index, scopeLabel, assetLabel }: ChapterProps) {
  return (
    <article
      id={service.slug}
      aria-labelledby={`service-${service.slug}`}
      className="scroll-mt-16 rounded-2xl bg-zinc-950 px-6 py-16 text-white sm:px-10 sm:py-20"
    >
      <ChapterIndex index={index} name={service.name} id={`service-${service.slug}`} dark />

      <Reveal className="mt-10">
        <AssetTile label={assetLabel} dark className="aspect-[16/9]" />
      </Reveal>

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-12">
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
