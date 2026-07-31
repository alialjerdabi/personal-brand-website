"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import FloatingNav from "@/components/lab/FloatingNav";
import HeroSentence from "@/components/lab/HeroSentence";
import { HERO_ENTRANCE_DELAY_S, HERO_UNIT_STEP_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

/**
 * The opening: a pale wash, a floating nav, and one sentence said in the
 * first person with the work set into it.
 *
 * THE ENTRANCE IS ONE IDEA: the sentence arrives the way it would be
 * spoken — left to right, in reading order, one unit at a time. Words
 * rise, and when the line reaches a slot where work belongs, the stills
 * drop into it at that exact moment; when it reaches the gesture, the
 * arrow draws itself. Nothing animates out of sequence, because every
 * element's timing is a function of its position in the sentence rather
 * than of which effect it happens to use.
 *
 * The previous version fired five separate tweens on hand-tuned offsets
 * after a two-second wait left over from a deleted loading screen, which
 * is exactly why it read as random.
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
        /*
         * A page opened into a background tab gets no entrance at all.
         * GSAP runs on requestAnimationFrame, which does not fire while a
         * tab is hidden — so hiding the sentence first and animating it
         * back would leave a blank hero until the tab is focused. Skipping
         * the entrance is strictly better than that: the visitor arrives
         * to the finished composition.
         */
        if (document.visibilityState === "hidden") return;

        const units = gsap.utils.toArray<HTMLElement>("[data-hero-unit]");

        gsap.set("[data-hero-chrome]", { opacity: 0, y: -14 });
        gsap.set(units, { opacity: 0, yPercent: 42 });
        gsap.set("[data-hero-chip]", { scale: 0.4, opacity: 0 });
        gsap.set("[data-hero-arrow]", { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set("[data-hero-tail]", { opacity: 0, y: 18 });

        const timeline = gsap.timeline({
          delay: HERO_ENTRANCE_DELAY_S,
          defaults: { ease: "power3.out" },
        });

        timeline.to("[data-hero-chrome]", { opacity: 1, y: 0, duration: 0.55 }, 0);

        units.forEach((element) => {
          // Position in the sentence — not position in the code — is what
          // decides when a unit moves.
          const at = 0.12 + Number(element.dataset.unitIndex ?? 0) * HERO_UNIT_STEP_S;
          const kind = element.dataset.heroUnit;

          timeline.to(element, { opacity: 1, yPercent: 0, duration: 0.62 }, at);

          if (kind === "chips") {
            timeline.to(
              element.querySelectorAll("[data-hero-chip]"),
              {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.05,
                ease: "back.out(1.7)",
              },
              at
            );
          }

          if (kind === "arrow") {
            timeline.to(
              element.querySelectorAll("[data-hero-arrow]"),
              { strokeDashoffset: 0, duration: 0.42, stagger: 0.14, ease: "power2.inOut" },
              at + 0.1
            );
          }
        });

        // The tail follows the last word rather than a fixed offset, so
        // it stays in sequence if the sentence is ever rewritten.
        const tailAt = 0.12 + units.length * HERO_UNIT_STEP_S + 0.1;
        timeline.to(
          "[data-hero-tail]",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          tailAt
        );
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

      {/*
        The statement is the page. It runs to a 1440px measure at ~8vw
        rather than sitting in a 1152px column at 6vw — the earlier
        version left a third of the screen empty above and below the
        line, which is what made it read as a small headline on a big
        page instead of a poster.
      */}
      <div className="flex flex-1 flex-col justify-center px-5 pb-10 pt-8 sm:px-8 sm:pb-14">
        <h1
          id="lab-hero-heading"
          /*
            No `text-balance` here. Balancing evens the lines by making
            every one of them shorter — measured, it held the statement to
            68% of the viewport and pushed it to four lines. Greedy
            wrapping is what fills the measure, which is the entire point
            of setting it this large.
          */
          className="mx-auto w-full max-w-[1500px] font-display text-[clamp(2.6rem,8.4vw,8rem)] font-bold leading-[1.06] tracking-[-0.042em]"
        >
          <HeroSentence tokens={content.hero.tokens} />
        </h1>

        <div className="mx-auto mt-12 flex w-full max-w-[1440px] flex-col gap-7 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-tail
            className="max-w-md font-display text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-lab-ink-soft"
          >
            {content.hero.sub}
          </p>

          <div data-hero-tail className="flex flex-wrap items-center gap-3">
            <a
              href={content.hero.cta.href}
              className="rounded-full bg-lab-ink-warm px-7 py-3.5 font-display text-[15px] font-bold text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-ink-warm focus-visible:ring-offset-2"
            >
              {content.hero.cta.label}
            </a>
            <a
              href={content.hero.secondary.href}
              className="group flex items-center gap-2 rounded-full border border-lab-hairline bg-white/60 px-7 py-3.5 font-display text-[15px] font-bold text-lab-ink-warm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-ink-warm focus-visible:ring-offset-2"
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
