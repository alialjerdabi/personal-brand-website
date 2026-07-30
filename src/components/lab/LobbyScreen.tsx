"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import LabHeader from "@/components/lab/LabHeader";
import Masthead from "@/components/lab/Masthead";
import ProjectMosaic from "@/components/lab/ProjectMosaic";
import { HERO_ENTRANCE_DELAY_S } from "@/components/lab/timing";
import type { LabContent } from "@/data/lab";

/**
 * The lobby: a thin bar of chrome, a wall of colour that is entirely the
 * work, and the name set edge to edge underneath it.
 *
 * There is no headline. The visitor gets fields of colour, project names
 * and a wordmark, and decides on those. Everything that explains lives
 * below the fold, because a visitor judges whether this person can design
 * before they read a word of it.
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
        gsap.set("[data-masthead]", { yPercent: 105 });
        gsap.set("[data-lobby-rule]", { scaleX: 0 });
        gsap.set("[data-tile]", { opacity: 0 });
        gsap.set("[data-lobby-meta], [data-hero-chrome]", { opacity: 0, y: 12 });

        const timeline = gsap.timeline({
          delay: HERO_ENTRANCE_DELAY_S,
          defaults: { ease: "power3.out" },
        });

        timeline
          .to("[data-hero-chrome]", { opacity: 1, y: 0, duration: 0.55 })
          .to("[data-lobby-rule]", { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.1)
          // The fields arrive one after another rather than as a block —
          // the loader's colour beats landing as the real thing.
          .to("[data-tile]", { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.35)
          .to("[data-lobby-meta]", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.8)
          // The name lands last and hardest: the page signs itself.
          .to("[data-masthead]", { yPercent: 0, duration: 0.95, ease: "power4.out" }, 0.6);
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

      <LabHeader content={content}>
        <p
          data-lobby-meta
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent"
        >
          {String(content.projects.length).padStart(2, "0")} {content.lobby.counterLabel}
        </p>
      </LabHeader>

      <ProjectMosaic projects={content.projects} lobby={content.lobby} />

      <div className="flex items-center justify-between gap-6 px-6 pb-2 pt-3">
        <p
          data-lobby-meta
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent"
        >
          {content.lobby.location}
        </p>
        <a
          data-lobby-meta
          href="#services"
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent transition-colors hover:text-lab-ink focus-visible:text-lab-ink focus-visible:outline-none"
        >
          {content.lobby.scrollLabel}
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </a>
      </div>

      <Masthead content={content} />
    </section>
  );
}
