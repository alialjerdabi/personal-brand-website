"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import FloatingNav from "@/components/lab/FloatingNav";
import HeroSentence from "@/components/lab/HeroSentence";
import { HERO_ENTRANCE_DELAY_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

/**
 * The opening: a pale wash, a floating nav, and one sentence said in the
 * first person with the work set into it.
 *
 * The register is the opposite of the black mosaic it replaces — warm,
 * spoken, approachable — because the visitor being persuaded is a
 * business owner deciding whether they'd enjoy working with this person,
 * not a design peer judging severity.
 *
 * Everything renders visible from the server. The entrance masks itself
 * in a pre-paint layout effect and only when motion is allowed, so no-JS
 * and reduced-motion visitors get the finished composition immediately.
 */
export default function HeroScreen({ content }: { content: LabContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-hero-chrome]", { opacity: 0, y: -12 });
        gsap.set("[data-hero-line]", { opacity: 0, y: 22 });
        gsap.set("[data-hero-tail]", { opacity: 0, y: 16 });

        const timeline = gsap.timeline({
          delay: HERO_ENTRANCE_DELAY_S,
          defaults: { ease: "power3.out" },
        });

        timeline
          .to("[data-hero-chrome]", { opacity: 1, y: 0, duration: 0.6 })
          .to("[data-hero-line]", { opacity: 1, y: 0, duration: 0.9 }, 0.1)
          .to("[data-hero-tail]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.5);
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="lab-hero-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-lab-air text-lab-ink-warm"
    >
      {/*
        The wash. Two soft fields rather than a single linear gradient, so
        the light has a source and a direction instead of reading as a
        flat ramp — the difference between a page that feels lit and one
        that feels tinted.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_15%_-10%,var(--lab-sky)_0%,transparent_60%),radial-gradient(100%_80%_at_100%_0%,#e8eef6_0%,transparent_55%),linear-gradient(180deg,#f4f8fb_0%,var(--lab-air)_45%,var(--lab-haze)_100%)]"
      />

      <FloatingNav content={content} />

      <div className="flex flex-1 flex-col justify-center px-5 py-14 sm:px-8 sm:py-20">
        <h1
          id="lab-hero-heading"
          data-hero-line
          className="mx-auto max-w-6xl text-balance font-display text-[clamp(2.25rem,6.2vw,5.75rem)] font-medium leading-[1.14] tracking-[-0.035em]"
        >
          <HeroSentence tokens={content.hero.tokens} />
        </h1>

        <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-7 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-tail
            className="max-w-md font-display text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-lab-ink-soft"
          >
            {content.hero.sub}
          </p>

          <div data-hero-tail className="flex flex-wrap items-center gap-3">
            <a
              href={content.hero.cta.href}
              className="rounded-full bg-lab-ink-warm px-7 py-3.5 font-display text-[15px] font-medium text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-ink-warm focus-visible:ring-offset-2"
            >
              {content.hero.cta.label}
            </a>
            <a
              href={content.hero.secondary.href}
              className="group flex items-center gap-2 rounded-full border border-lab-hairline bg-white/60 px-7 py-3.5 font-display text-[15px] font-medium text-lab-ink-warm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-ink-warm focus-visible:ring-offset-2"
            >
              {content.hero.secondary.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
