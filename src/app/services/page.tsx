import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import SmoothAnchorScroll from "@/components/sections/services/SmoothAnchorScroll";
import { servicesPageContent } from "@/data/services";
import type { ServiceDetail } from "@/data/services";
import type { ChapterProps } from "@/components/sections/services/chapterProps";
import Consulting from "@/components/sections/services/chapters/Consulting";
import Rebranding from "@/components/sections/services/chapters/Rebranding";
import StrategyPositioning from "@/components/sections/services/chapters/StrategyPositioning";
import WebAppDesign from "@/components/sections/services/chapters/WebAppDesign";
import AiAutomatedSystems from "@/components/sections/services/chapters/AiAutomatedSystems";
import MarketingProduction from "@/components/sections/services/chapters/MarketingProduction";
import GraphicDesign from "@/components/sections/services/chapters/GraphicDesign";

export const metadata: Metadata = {
  title: "Services — Ali Aljardabi",
  description:
    "Consulting, branding, strategy, web and app design, AI automation, marketing production, and graphic design — seven disciplines working as one growth system.",
};

/** Slug → chapter layout. Each service gets its own composition (see
 * docs/design-language-notes.md, "Services page rebuilt as editorial
 * chapters") instead of one template repeated seven times. */
const CHAPTERS: Record<string, ComponentType<ChapterProps>> = {
  consulting: Consulting,
  rebranding: Rebranding,
  "strategy-positioning": StrategyPositioning,
  "web-app-design": WebAppDesign,
  "ai-automated-systems": AiAutomatedSystems,
  "marketing-production": MarketingProduction,
  "graphic-design": GraphicDesign,
};

function renderChapter(service: ServiceDetail, index: number, scopeLabel: string, assetLabel: string) {
  const Chapter = CHAPTERS[service.slug];
  if (!Chapter) return null;
  return (
    <Chapter key={service.slug} service={service} index={index} scopeLabel={scopeLabel} assetLabel={assetLabel} />
  );
}

/**
 * The services page: every discipline as its own editorial chapter —
 * why it matters to the business, how the process runs with clients —
 * with a sticky side navigation on desktop (layout foundation adapted
 * from the approved symbolstudio.pl services reference). Rebuilt
 * 2026-07-20 (Ali's direction) so each chapter has one dominant visual
 * idea instead of a single template repeated seven times — see the
 * chapter components under components/sections/services/. Media rows
 * are still animated placeholders until real assets arrive.
 */
export default function ServicesPage() {
  const content = servicesPageContent;

  return (
    <main id="main" className="bg-white">
      <SmoothAnchorScroll />
      <Container size="wide">
        <header className="flex items-center justify-between gap-6 pt-6 sm:pt-8">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-950 focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
          >
            {content.identity}
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:text-zinc-950 focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none sm:block"
            >
              ← {content.backLabel}
            </Link>
            <CTAButton cta={content.navCta} variant="primary" size="sm" dot />
          </div>
        </header>

        <div className="mt-20 sm:mt-24">
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-6xl lg:text-7xl">
            {content.heading}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-500 sm:text-xl">
            {content.intro}
          </p>
        </div>

        <div className="mt-20 gap-12 pb-24 sm:mt-24 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav
              aria-label="Services"
              className="sticky top-10"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                {content.navLabel}
              </p>
              <ul className="mt-5 space-y-2.5">
                {content.services.map((service, index) => (
                  <li key={service.slug}>
                    <a
                      href={`#${service.slug}`}
                      className="flex items-baseline gap-3 text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:text-zinc-950 focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                    >
                      <span className="font-mono text-[10px] text-zinc-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div>
            {content.services.map((service, index) =>
              renderChapter(service, index, content.scopeLabel, content.assetLabel)
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
