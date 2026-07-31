"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroSentence from "@/components/lab/HeroSentence";
import { HERO_ENTRANCE_DELAY_S, HERO_UNIT_STEP_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

gsap.registerPlugin(ScrollTrigger);

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

        });

        const settled = 0.12 + units.length * HERO_UNIT_STEP_S;

        /*
         * The arrow draws LAST, after the sentence has finished arriving
         * and a beat of silence has passed.
         *
         * Its slot opens with the rest of the line — the gap is reserved
         * in reading order — but the stroke stays undrawn until there is
         * nothing else moving. An arrow is a pointing gesture, so it only
         * reads as one when it is the only thing in motion; drawn in the
         * middle of the sequence (which is where it was) it was buried
         * under the seven words still landing behind it, and looked like
         * it appeared from nowhere.
         *
         * It then leans once toward what it points at, and stays there.
         */
        timeline
          .to(
            "[data-hero-arrow]",
            { strokeDashoffset: 0, duration: 0.62, stagger: 0.16, ease: "power2.inOut" },
            settled + 0.22
          )
          .to(
            "[data-hero-arrow-slot]",
            { x: 9, duration: 0.5, ease: "power2.out" },
            settled + 0.95
          );

        timeline.to(
          "[data-hero-tail]",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          settled + 0.35
        );

        /*
         * The handoff into the deck below: the last cluster of stills in
         * the sentence swells and dissolves as the hero leaves, so the
         * card the visitor saw inside the line becomes the card that
         * arrives. Driven by scroll, and applied to the chip rather than
         * to the deck — a transform on the deck's ancestor would make it
         * the containing block for its sticky cards and break the stack.
         */
        const clusters = gsap.utils.toArray<HTMLElement>('[data-hero-unit="chips"]');
        const last = clusters[clusters.length - 1];
        if (last) {
          /*
           * `fromTo` with `immediateRender: false`, not `to`.
           *
           * A plain `to` records its start values the moment it renders,
           * which for a scrubbed trigger is when it is created — and at
           * that point the entrance has just set every unit to opacity 0.
           * So the tween became "from invisible to invisible": nothing
           * happened scrolling down, and scrolling back up restored it to
           * invisible, leaving a hole in the sentence. Stating the start
           * explicitly and deferring the first render fixes both.
           */
          gsap.fromTo(
            last,
            { scale: 1, opacity: 1 },
            {
              scale: 3.4,
              opacity: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: rootRef.current,
                start: "bottom 92%",
                end: "bottom 38%",
                scrub: 0.4,
              },
            }
          );
        }
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_12%_-12%,var(--lab-sky)_0%,transparent_62%),radial-gradient(90%_70%_at_100%_4%,#f6f1e2_0%,transparent_58%),linear-gradient(180deg,#f6f2e6_0%,var(--lab-air)_48%,var(--lab-haze)_100%)]"
      />

      {/*
        The statement is the page.
        - 10.2vw on a 1760px measure, centred with a narrow gutter. It was
          left-aligned inside a 1560px cap, which on a wide screen left a
          quarter of the viewport empty down the right-hand side.
        - It starts just under the nav rather than sitting centred; the
          tail is pushed to the bottom edge with `mt-auto`. Centring left
          a third of the viewport empty above AND below, which is what
          made a large headline read as a small one on a big page.
        - No `text-balance`: balancing evens lines by shortening all of
          them and held the statement to 68% of the viewport. The breaks
          are hand-placed in the content instead.
        - Space above and below is deliberately unequal, and the block is
          not centred in its measure. Even margins around a centred column
          is the tell of a layout that was specified rather than composed.
      */}
      <div className="flex flex-1 flex-col px-4 pb-8 pt-[7vh] sm:px-6 sm:pt-[8vh]">
        <h1
          id="lab-hero-heading"
          className="mx-auto w-full max-w-[1760px] font-display text-[clamp(2.6rem,10.4vw,12rem)] font-bold leading-[0.98] tracking-[-0.048em]"
        >
          <HeroSentence tokens={content.hero.tokens} />
        </h1>

        <div className="mx-auto mt-auto flex w-full max-w-[1760px] flex-col gap-7 pt-12 sm:pt-16 lg:flex-row lg:items-end lg:justify-between">
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
