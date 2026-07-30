import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Reveal from "@/components/ui/Reveal";
import ChapterIndex from "@/components/sections/services/ChapterIndex";
import ScopeList from "@/components/sections/services/ScopeList";
import FeaturedProjectMedia from "@/components/sections/work/FeaturedProjectMedia";
import ProjectIndexNav from "@/components/sections/work/ProjectIndexNav";
import { petrolasCaseStudy } from "@/data/work";
import { projects } from "@/data/projects";
import type { HeroAsset } from "@/data/hero";

export const metadata: Metadata = {
  title: "Petrolas — Case Study — Ali Aljardabi",
  description:
    "How Petrolas' brand, digital platform, and operations were designed and built as one connected system — branding, websites, and AI automation.",
};

/** One real-image tile — the case-study equivalent of AssetTile, without the placeholder-cycling machinery since every image here is real. */
function CaseImage({ image, className = "" }: { image: HeroAsset; className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-2xl bg-surface ${className}`.trim()}>
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </span>
  );
}

export default function PetrolasCaseStudyPage() {
  const content = petrolasCaseStudy;

  return (
    <main id="main" className="bg-background">
      <Container size="wide">
        <header className="flex items-center justify-between gap-6 pt-6 sm:pt-8">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
          >
            {content.identity}
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/work"
              className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-accent focus-visible:outline-none sm:block"
            >
              ← {content.backLabel}
            </Link>
            <ThemeToggle />
            <CTAButton cta={content.navCta} variant="primary" size="sm" dot />
          </div>
        </header>

        {/* Overview — full-bleed opener, the one section where the photo carries more weight than the copy column. */}
        <div className="mt-16 sm:mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">{content.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">{content.summary}</p>

          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {content.meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint">
                  {item.label}
                </dt>
                <dd className="mt-2 text-base font-medium tracking-tight text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal mask className="mt-14 aspect-[4/3] rounded-2xl sm:mt-16 sm:aspect-[21/9]">
          <CaseImage image={content.heroImage} className="h-full" />
        </Reveal>
      </Container>

      {/* Business challenge — dark card, typography only (same treatment as the Services page's Consulting chapter): the quietest register, no image competing with the argument. */}
      <Container size="wide" className="pb-24 pt-24 sm:pb-28 sm:pt-28">
        <article className="rounded-2xl bg-ground-inverted px-6 py-16 text-ink-on-inverted sm:px-10 sm:py-20">
          <ChapterIndex index={0} name={content.challenge.heading} id="challenge-heading" dark />
          <div className="mt-10 max-w-2xl space-y-5">
            {content.challenge.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Container>

      {/* Strategic direction — copy leads, the loop diagram sits alongside as supporting evidence, not the hero. */}
      <Container size="wide" className="border-t border-border pb-24 pt-24 sm:pb-28 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ChapterIndex index={1} name={content.strategy.heading} id="strategy-heading" />
            <div className="mt-8 max-w-xl space-y-5">
              {content.strategy.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-foreground-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <Reveal mask className="aspect-[4/5] rounded-2xl lg:col-span-5">
            <CaseImage image={content.strategy.image} className="h-full" />
          </Reveal>
        </div>
      </Container>

      {/* Brand identity system — an auto-cycling sequence (guidelines → campaign applications) stands in for "process," not a static grid; the sequence itself is the proof the system got used, not just documented. */}
      <Container size="wide" className="border-t border-border pb-24 pt-24 sm:pb-28 sm:pt-28">
        <ChapterIndex index={2} name={content.brandSystem.heading} id="brand-heading" />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="max-w-md space-y-5">
              {content.brandSystem.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-foreground-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <ScopeList label="Scope of work" items={content.brandSystem.scope} className="mt-8" />
          </div>
          <Reveal mask delay={80} className="aspect-[4/5] rounded-2xl lg:col-span-7">
            <FeaturedProjectMedia
              slides={[content.brandSystem.image, ...content.brandSystem.campaignImages]}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>

      {/* Digital experience — dark card again (same rule as Services page's Web/App Design chapter: a genuine ground change is its own divider), dashboard image dominant before any copy. */}
      <Container size="wide" className="pb-24 sm:pb-28">
        <article className="rounded-2xl bg-ground-inverted px-6 py-16 text-ink-on-inverted sm:px-10 sm:py-20">
          <ChapterIndex index={3} name={content.digitalExperience.heading} id="digital-heading" dark />
          <Reveal mask className="mt-10 aspect-[4/3] rounded-2xl sm:aspect-[16/9]">
            <CaseImage image={content.digitalExperience.image} className="h-full" />
          </Reveal>
          <div className="mt-10 gap-10 lg:grid lg:grid-cols-12">
            <ScopeList label="Scope of work" items={content.digitalExperience.scope} dark className="lg:col-span-4" />
            <div className="mt-8 max-w-xl space-y-4 lg:col-span-8 lg:mt-0">
              {content.digitalExperience.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </Container>

      {/* Connected systems — the one genuinely container-breaking moment on the page (same technique GrowthStack's payoff already uses: rendered outside <Container> for true full-bleed): the identity surviving outside a screen entirely, edge to edge. Fleet truck + copy return to the normal column underneath. */}
      <div className="border-t border-border pb-10 pt-24 sm:pt-28">
        <Container size="wide">
          <ChapterIndex index={4} name={content.connectedSystems.heading} id="systems-heading" />
        </Container>
        <Reveal mask delay={80} className="relative mt-10 aspect-[16/9] bg-surface sm:aspect-[32/9]">
          <Image
            src={content.connectedSystems.wideImage.src}
            alt={content.connectedSystems.wideImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
      <Container size="wide" className="pb-24 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal mask className="aspect-[4/3] rounded-2xl lg:col-span-5">
            <CaseImage image={content.connectedSystems.fleetImage} className="h-full" />
          </Reveal>
          <div className="max-w-xl space-y-5 lg:col-span-7">
            {content.connectedSystems.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* Key outcomes — an honest placeholder, not invented numbers. Same dashed-frame grammar the Philosophy section already uses for undelivered metrics. */}
      <Container size="wide" className="border-t border-border pb-24 pt-24 sm:pb-28 sm:pt-28">
        <ChapterIndex index={5} name={content.outcomes.heading} id="outcomes-heading" />
        <p className="mt-6 max-w-xl text-base leading-7 text-foreground-muted">{content.outcomes.intro}</p>
        <div className="mt-8 flex min-h-40 max-w-xl items-center justify-center border border-dashed border-border-strong px-6 py-10 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground-faint">
            {content.outcomes.placeholderLabel}
          </span>
        </div>
      </Container>

      {/* Final gallery — a modular grid closing the story, matching the Services page's Graphic Design chapter portfolio-wall composition. Each tile masks in independently, staggered, rather than the whole grid fading in at once. */}
      <Container size="wide" className="border-t border-border pb-24 pt-24 sm:pb-28 sm:pt-28">
        <ChapterIndex index={6} name={content.gallery.heading} id="gallery-heading" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.gallery.images.map((image, index) => (
            <Reveal key={image.src} mask delay={index * 60} className="aspect-[4/5] rounded-2xl">
              <CaseImage image={image} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Keep exploring — the reusable project index in its compact "pager" form: previous/next, no full roster (that lives on /work). */}
      <Container size="wide" className="border-t border-border py-14">
        <ProjectIndexNav projects={projects} currentSlug="petrolas" mode="navigate" showFullList={false} />
      </Container>

      {/* Closing invitation — same register as the homepage's CTASection, scoped to this project. */}
      <section aria-labelledby="case-cta-heading" className="bg-ground-inverted pb-16 pt-20 text-ink-on-inverted sm:pb-20 sm:pt-28">
        <Container size="wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">{content.closing.eyebrow}</p>
          <h2
            id="case-cta-heading"
            className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl"
          >
            {content.closing.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400 sm:text-xl">{content.closing.body}</p>
          <div className="mt-10">
            <CTAButton cta={content.closing.cta} variant="inverted" />
          </div>
        </Container>
      </section>
    </main>
  );
}
