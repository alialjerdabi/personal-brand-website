import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { servicesPageContent } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Ali Aljardabi",
  description:
    "Consulting, branding, strategy, web and app design, AI automation, marketing production, and graphic design — seven disciplines working as one growth system.",
};

/**
 * The services page: every discipline as a numbered chapter — why it
 * matters to the business, how the process runs with clients — with a
 * sticky side navigation on desktop (layout foundation adapted from
 * the approved symbolstudio.pl services reference). Media rows are
 * animated placeholders until real assets arrive.
 */
export default function ServicesPage() {
  const content = servicesPageContent;

  return (
    <main id="main" className="bg-white">
      <Container>
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
            {content.services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                aria-labelledby={`service-${service.slug}`}
                className="scroll-mt-16 border-t border-zinc-200 py-16 first:border-t-0 first:pt-0 sm:py-20"
              >
                <p className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    id={`service-${service.slug}`}
                    className="text-3xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-4xl"
                  >
                    {service.name}
                  </span>
                </p>

                <div className="mt-10 gap-10 lg:grid lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                      {content.scopeLabel}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.scope.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
                          <span aria-hidden="true" className="text-zinc-300">
                            –
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 lg:col-span-8 lg:mt-0">
                    <h3 className="max-w-lg text-xl font-medium leading-snug tracking-tight text-zinc-950 sm:text-2xl">
                      {service.question}
                    </h3>
                    <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600">
                      {service.importance}
                    </p>
                    <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                      {service.approach}
                    </p>
                  </div>
                </div>

                <Reveal className="mt-12">
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-[2fr_1fr_1fr]">
                    <div className="col-span-2 flex aspect-[16/10] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 lg:col-span-1 lg:aspect-auto">
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-300">
                        {content.assetLabel}
                      </span>
                    </div>
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-300">
                        {content.assetLabel}
                      </span>
                    </div>
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-300">
                        {content.assetLabel}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
