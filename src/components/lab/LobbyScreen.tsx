"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import LabHeader from "@/components/lab/LabHeader";
import Masthead from "@/components/lab/Masthead";
import ProjectRail from "@/components/lab/ProjectRail";
import { HERO_ENTRANCE_DELAY_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

/**
 * The lobby: one locked screen holding a thin bar of orange interface,
 * the work at scale, and the name set edge to edge underneath it.
 *
 * There is no headline. The visitor gets covers and a wordmark, and
 * decides on those. Everything that explains — services, contact — is
 * below the fold, because a visitor judges whether this person can
 * design before they read a word of it.
 *
 * `min-h-[100svh]` with an internal flex column rather than a fixed
 * height: the screen is locked in composition, not in overflow.
 * Scrolling down leaves it and opens the rest of the page.
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
        gsap.set("[data-masthead]", { yPercent: 105 });
        gsap.set("[data-lobby-rule]", { scaleX: 0 });
        gsap.set(".lab-rail > *", { opacity: 0, y: 28 });
        gsap.set("[data-lobby-meta], [data-hero-chrome]", { opacity: 0, y: 12 });

        const timeline = gsap.timeline({
          delay: HERO_ENTRANCE_DELAY_S,
          defaults: { ease: "power3.out" },
        });

        timeline
          .to("[data-hero-chrome]", { opacity: 1, y: 0, duration: 0.55 })
          .to("[data-lobby-rule]", { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.1)
          // The covers deal in one after another — the loader's fragments
          // arriving as the real thing.
          .to(".lab-rail > *", { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.4)
          .to("[data-lobby-meta]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.8)
          // The name lands last and hardest: the page signs itself.
          .to("[data-masthead]", { yPercent: 0, duration: 0.95, ease: "power4.out" }, 0.65);
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
      <h1 id="lab-lobby-heading" className="sr-only">
        {content.identity} — {content.descriptor}
      </h1>

      <LabHeader content={content} />

      <div className="flex min-h-0 flex-1 flex-col py-7 sm:py-9">
        <ProjectRail projects={content.projects} lobby={content.lobby} />
      </div>

      <Masthead content={content} />
    </section>
  );
}
