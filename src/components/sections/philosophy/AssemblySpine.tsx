"use client";

import { useEffect, useRef, useState } from "react";
import type { PhilosophyContent, PhilosophyPillar } from "@/data/philosophy";

interface AssemblySpineProps {
  pillars: PhilosophyPillar[];
  loop: PhilosophyContent["loop"];
}

/** Milliseconds per docking beat. */
const BEAT_MS = 650;

/**
 * The assembly staging (approved 2026-07-17): one vertical spine — the
 * chassis — with three machined modules docked onto it, then the loop
 * close as the final beat. On viewport entry each module docks in
 * sequence (a few pixels of travel toward the spine, then stillness)
 * while the spine's ink draws down. One entry-triggered sequence, never
 * scroll-scrubbed — precision, not choreography.
 *
 * Server-rendered fully assembled, so without JavaScript or under
 * reduced motion the system is complete and nothing is gated.
 */
export default function AssemblySpine({ pillars, loop }: AssemblySpineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const totalBeats = pillars.length + 1;
  const [docked, setDocked] = useState(totalBeats);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (root.getBoundingClientRect().top <= window.innerHeight) return;

    setDocked(0);
    let beats = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interval) return;
        observer.disconnect();
        interval = setInterval(() => {
          beats += 1;
          setDocked(beats);
          if (beats >= totalBeats && interval) clearInterval(interval);
        }, BEAT_MS);
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [totalBeats]);

  const dockClass = (beat: number) =>
    beat <= docked
      ? "translate-x-0 opacity-100"
      : "translate-x-3 opacity-0";

  return (
    <div ref={rootRef} className="relative">
      {/* The chassis: a faint full track, and the ink that assembles it. */}
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <span
        aria-hidden="true"
        style={{ transform: `scaleY(${docked / totalBeats})` }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-white/40 motion-safe:transition-transform motion-safe:duration-[550ms] motion-safe:ease-out"
      />

      <ol className="space-y-14 pl-7 sm:space-y-16 sm:pl-12">
        {pillars.map((pillar, index) => (
          <li
            key={pillar.name}
            className={`relative motion-safe:transition-[transform,opacity] motion-safe:duration-[550ms] motion-safe:ease-out ${dockClass(
              index + 1
            )}`}
          >
            {/* Mount point: the tick connecting module to spine. */}
            <span
              aria-hidden="true"
              className="absolute -left-7 top-9 h-px w-7 bg-white/15 sm:-left-12 sm:w-12"
            />
            <article className="max-w-2xl border border-white/10 p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                Module {String(index + 1).padStart(2, "0")} · {pillar.name}
              </p>
              <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">
                {pillar.outcome}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                {pillar.support}
              </p>
              <ul className="mt-6 space-y-1.5 border-t border-white/10 pt-4">
                {pillar.specs.map((spec) => (
                  <li
                    key={spec}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <div
        className={`mt-16 pl-7 sm:mt-20 sm:pl-12 motion-safe:transition-[transform,opacity] motion-safe:duration-[550ms] motion-safe:ease-out ${dockClass(
          totalBeats
        )}`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {loop.formula}
        </p>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug tracking-[-0.02em] text-zinc-300 sm:text-3xl">
          {loop.statement}
        </p>
        <p className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-5xl">
          {loop.closing}
        </p>
      </div>
    </div>
  );
}
