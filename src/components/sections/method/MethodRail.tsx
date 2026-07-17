"use client";

import { useEffect, useRef, useState } from "react";
import type { MethodStep } from "@/data/method";

interface MethodRailProps {
  steps: MethodStep[];
}

/** Milliseconds per beat: one connector fill + one step ignition. */
const BEAT_MS = 550;

/**
 * The method as one connected system (approved refinement, 2026-07-16):
 * when the rail enters the viewport, an ink line draws along the
 * existing hairline in four beats, and each step ignites from ghost to
 * ink as the line reaches its column — time made visible, each step
 * enabling the next. No nodes, no new furniture: the hairline is the
 * system, the mono number is the node.
 *
 * Server-rendered fully inked, so without JavaScript or under reduced
 * motion the method is complete and nothing is gated. The ghost state
 * is armed only after mount, and only for viewers who will see the
 * sequence play. On stacked layouts (below lg) the line is hidden and
 * the ignition order alone carries the organization.
 */
export default function MethodRail({ steps }: MethodRailProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(steps.length);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (root.getBoundingClientRect().top <= window.innerHeight) return;

    setLitCount(0);
    let beats = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interval) return;
        observer.disconnect();
        interval = setInterval(() => {
          beats += 1;
          setLitCount(beats);
          if (beats >= steps.length && interval) clearInterval(interval);
        }, BEAT_MS);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [steps.length]);

  return (
    <div ref={rootRef} className="relative border-t border-zinc-200">
      <span
        aria-hidden="true"
        style={{ transform: `scaleX(${litCount / steps.length})` }}
        className="absolute -top-px left-0 hidden h-px w-full origin-left bg-zinc-950 lg:block motion-safe:transition-transform motion-safe:duration-[450ms] motion-safe:ease-out"
      />
      <ol className="grid gap-x-8 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const lit = index < litCount;
          return (
            <li key={step.title}>
              <p className="flex items-baseline gap-4">
                <span
                  className={`font-mono text-xs motion-safe:transition-colors motion-safe:duration-300 ${
                    lit ? "text-zinc-950" : "text-zinc-300"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-lg font-medium tracking-tight motion-safe:transition-colors motion-safe:duration-300 ${
                    lit ? "text-zinc-950" : "text-zinc-300"
                  }`}
                >
                  {step.title}
                </span>
              </p>
              <p
                className={`mt-3 text-sm leading-6 motion-safe:transition-colors motion-safe:duration-300 ${
                  lit ? "text-zinc-500" : "text-zinc-300"
                }`}
              >
                {step.line}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
