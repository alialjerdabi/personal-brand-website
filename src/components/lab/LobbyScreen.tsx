"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import LabHeader from "@/components/lab/LabHeader";
import ProjectRail from "@/components/lab/ProjectRail";
import { HERO_ENTRANCE_DELAY_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

/**
 * The lobby: one locked screen that holds the wordmark, a single line of
 * description, and the work itself. No statement, no positioning
 * paragraph, no services — those live below the fold and on their own
 * sections, because a visitor decides whether this person can design in
 * the first second, and only reads afterwards.
 *
 * `min-h-[100svh]` with an internal flex column rather than a fixed
 * height: the screen is locked in composition, not in overflow. Scrolling
 * down leaves it and opens the rest of the page.
 *
 * Everything renders visible from the server. The entrance masks itself
 * in a pre-paint layout effect and only when motion is allowed, so no-JS
 * and reduced-motion visitors get the finished composition immediately.
 */
export default function LobbyScreen({ content }: { content: LabContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-lobby-line]", { yPercent: 110 });
        gsap.set("[data-lobby-rule]", { scaleX: 0 });
        gsap.set(".lab-rail > *", { opacity: 0, y: 24 });
        gsap.set("[data-lobby-meta], [data-hero-chrome]", { opacity: 0, y: 14 });

        const timeline = gsap.timeline({
          delay: HERO_ENTRANCE_DELAY_S,
          defaults: { ease: "power3.out" },
        });

        timeline
          .to("[data-lobby-line]", { yPercent: 0, duration: 0.85 })
          .to("[data-hero-chrome]", { opacity: 1, y: 0, duration: 0.55 }, 0.15)
          .to("[data-lobby-rule]", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.3)
          // The covers deal in one after another — the loader's fragments
          // arriving as the real thing.
          .to(".lab-rail > *", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.55)
          .to("[data-lobby-meta]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.9);
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="work"
      aria-labelledby="lab-lobby-heading"
      className="flex min-h-[100svh] flex-col bg-lab-ground text-lab-ink"
    >
      <LabHeader content={content} />

      <div className="px-6 pt-10 sm:px-10 sm:pt-14">
        <h1
          id="lab-lobby-heading"
          className="overflow-hidden pb-[0.08em] text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
        >
          <span data-lobby-line className="block">
            {content.identity}
            <span className="text-accent"> — </span>
            {content.descriptor}
          </span>
        </h1>
        <span
          data-lobby-rule
          style={{ transform: "scaleX(0)" }}
          className="mt-6 block h-px w-full origin-left bg-accent sm:mt-8"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col py-8 pb-6 sm:py-10 sm:pb-8">
        <ProjectRail projects={content.projects} lobby={content.lobby} />
      </div>
    </section>
  );
}
