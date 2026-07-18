"use client";

import { useEffect, useRef } from "react";
import type { GrowthCard } from "@/data/philosophy";

/** Blue means connection — arrows and connection glyphs only. */
const COBALT = "#255DFF";

/**
 * Final resting pose per sheet: drafting-table restraint (±2°), each
 * sheet stepping down-right so every giant title stays partly visible
 * under the next sheet's edge. The payoff sheet is wider and lands
 * last, lowest, on top.
 */
const SHEET_POSE = [
  { rotate: -2, layout: "lg:absolute lg:left-0 lg:top-0 lg:w-[54%]" },
  { rotate: 1.4, layout: "lg:absolute lg:left-[14%] lg:top-[6rem] lg:w-[54%]" },
  { rotate: -1, layout: "lg:absolute lg:left-[28%] lg:top-[12rem] lg:w-[54%]" },
  { rotate: 0.8, layout: "lg:absolute lg:left-[36%] lg:top-[20rem] lg:w-[58%]" },
];

/** Per-sheet scrub window: start of settle within overall progress. */
const WINDOW_STEP = 0.22;
const WINDOW_SPAN = 0.3;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function FormulaLine({ formula }: { formula: string }) {
  const parts = formula.split("→");
  return (
    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && (
            <span aria-hidden="true" style={{ color: COBALT }}>
              →
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

/**
 * The blueprint stack, scroll-scrubbed (revised 2026-07-18): sheet
 * poses are a pure function of scroll position. Scrolling down slides
 * each sheet into the stack in sequence; scrolling up disassembles it
 * in reverse; stopping mid-scroll freezes the exact state. Nothing
 * autoplays. On desktop the stage pins (position: sticky — native
 * scroll, never hijacked) across a tall runway; on smaller screens
 * each sheet settles by its own viewport position, Act II style.
 *
 * Server-rendered fully assembled: without JavaScript or under reduced
 * motion the stack is complete and nothing is gated.
 */
export default function GrowthStack({ cards }: { cards: GrowthCard[] }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const runway = runwayRef.current;
    if (!runway) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const desktop = window.innerWidth >= 1024;
      const rect = runway.getBoundingClientRect();
      const runwayProgress = clamp01(
        -rect.top / Math.max(1, rect.height - viewportHeight)
      );

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const pose = SHEET_POSE[index] ?? SHEET_POSE[0];

        let settled: number;
        if (desktop) {
          settled = easeOutCubic(
            clamp01((runwayProgress - index * WINDOW_STEP) / WINDOW_SPAN)
          );
        } else {
          const top = el.getBoundingClientRect().top;
          settled = easeOutCubic(
            clamp01((viewportHeight * 0.9 - top) / (viewportHeight * 0.35))
          );
        }

        const lift = (1 - settled) * 5;
        const overRotate = (1 - settled) * 4;
        el.style.transform = `translateY(${lift.toFixed(3)}rem) rotate(${(
          pose.rotate + overRotate
        ).toFixed(3)}deg)`;
        el.style.opacity = clamp01(settled * 1.6).toFixed(3);
      });
    };

    const requestUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={runwayRef} className="relative lg:h-[260vh]">
      <div className="lg:sticky lg:top-[max(2rem,calc(50vh-34rem))] lg:h-[66rem]">
        <ol className="relative lg:h-full">
          {cards.map((card, index) => {
            const pose = SHEET_POSE[index] ?? SHEET_POSE[0];
            const isPayoff = Boolean(card.closing);

            return (
              <li
                key={card.stage}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  zIndex: index + 1,
                  transform: `rotate(${pose.rotate}deg)`,
                }}
                className={`relative -mt-6 w-full will-change-transform first:mt-0 lg:mt-0 ${pose.layout}`}
              >
                <article className="flex flex-col rounded-lg bg-zinc-100 p-6 text-zinc-950 shadow-2xl shadow-black/40 sm:p-8 lg:aspect-[4/5]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                    {card.stage}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
                    {card.statement}
                  </h3>
                  {card.support && (
                    <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
                      {card.support}
                    </p>
                  )}
                  {card.connection && (
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      <span aria-hidden="true" style={{ color: COBALT }}>
                        →{" "}
                      </span>
                      {card.connection}
                    </p>
                  )}
                  {card.formula && <FormulaLine formula={card.formula} />}
                  {card.closing && (
                    <p className="mt-3 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {card.closing}
                    </p>
                  )}

                  {/* Drafting frame: reserved for future metric animations. */}
                  <span
                    className={`mt-6 flex flex-1 items-center justify-center border border-dashed border-zinc-300 ${
                      isPayoff ? "min-h-40" : "min-h-28"
                    }`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                      {card.placeholderLabel}
                    </span>
                  </span>

                  <p
                    className={`mt-6 font-semibold leading-[0.9] tracking-[-0.04em] ${
                      isPayoff
                        ? "text-4xl sm:text-5xl lg:text-6xl"
                        : "text-5xl sm:text-6xl lg:text-7xl"
                    }`}
                  >
                    {card.title}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
