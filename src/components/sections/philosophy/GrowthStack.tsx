"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import type { GrowthCard, PhilosophyPayoff } from "@/data/philosophy";

/** Blue means connection — arrows and connection glyphs only. */
const COBALT = "#255DFF";

/**
 * Final resting pose per sheet: drafting-table restraint (±2°), each
 * sheet stepping down-right so every giant title stays partly visible
 * under the next sheet's edge.
 *
 * Geometry (re-cut 2026-07-20): sheets take their natural content
 * height — no poster aspect — and the vertical step is sized so each
 * sheet's stage line and statement (the argument) stay fully visible
 * above the next sheet's edge; only support/ornament recede into the
 * left-strip reveal.
 */
const SHEET_POSE = [
  { rotate: -2, layout: "lg:absolute lg:left-0 lg:top-0 lg:w-[64%]", rotateClass: "lg:rotate-[-2deg]" },
  { rotate: 1.4, layout: "lg:absolute lg:left-[11%] lg:top-[6.5rem] lg:w-[64%]", rotateClass: "lg:rotate-[1.4deg]" },
  { rotate: -1, layout: "lg:absolute lg:left-[22%] lg:top-[13rem] lg:w-[64%]", rotateClass: "lg:rotate-[-1deg]" },
];

/** Per-sheet scrub window: start of settle within overall progress. */
const WINDOW_STEP = 0.22;
const WINDOW_SPAN = 0.3;

/**
 * The exit phase (2026-07-20): once the third sheet has had a moment
 * to rest fully settled, continued scroll lifts all three away
 * together (see the group transform on the <ol> itself, below) while
 * the payoff fades in underneath. EXIT_START leaves a brief pause
 * after the last sheet's own window (which ends at 0.74) before the
 * group begins moving; EXIT_SPAN completes exactly at progress 1.
 */
const EXIT_START = 0.8;
const EXIT_SPAN = 0.2;
const EXIT_LIFT_REM = 40;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

interface GrowthStackProps {
  cards: GrowthCard[];
  eyebrow: string;
  heading: string;
  payoff: PhilosophyPayoff;
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
 * Ending rebuilt 2026-07-20 (Ali's direction): there is no fourth
 * "payoff" card any more. Once the three sheets are settled, continued
 * scroll lifts all three away together (one shared transform on the
 * <ol> itself — it's already each card's own positioning container,
 * so animating it moves the whole assembled group as one unit without
 * disturbing the cards' positions relative to each other) and fades
 * them out, while a full-bleed editorial close — "One system." at
 * display scale, "Everything compounds." in cobalt beneath it — fades
 * in underneath. This is a pure function of scroll like everything
 * else in this act: scrolling up brings the cards back exactly as it
 * left them.
 *
 * The payoff breaks out of the section's reading column to be
 * genuinely full-bleed (`motion-safe:lg:absolute motion-safe:lg:inset-0`
 * — gated to motion-allowed desktop only, see below) while the cards
 * stay in their own internal Container so they align with the rest of
 * the page.
 *
 * Accessibility / reduced motion: the payoff's overlapping, JS-driven
 * position ONLY applies under `motion-safe:` — for reduced-motion
 * users (at any viewport width) it renders in plain normal document
 * flow, fully visible, straight after the cards. Overlapping it on top
 * of the cards for a reduced-motion desktop user would leave two
 * illegible layers stacked on each other, since no scroll-driven
 * crossfade would ever run to separate them.
 *
 * Server-rendered fully assembled: without JavaScript or under reduced
 * motion the three cards are complete and the payoff is fully visible
 * beneath them — nothing is gated.
 */
export default function GrowthStack({ cards, eyebrow, heading, payoff }: GrowthStackProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLOListElement>(null);
  const echoRef = useRef<HTMLDivElement>(null);
  const payoffRef = useRef<HTMLDivElement>(null);
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

      const exitProgress = desktop
        ? easeOutCubic(clamp01((runwayProgress - EXIT_START) / EXIT_SPAN))
        : 0;

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
        // Rotation is desktop-only (see SHEET_POSE.rotateClass) — the
        // drafting-table tilt reads as an intentional diagonal cascade
        // there, but at full mobile width it just collides with the
        // next card. JS must not re-add what the base CSS removes.
        const rotatePart = desktop
          ? ` rotate(${(pose.rotate + overRotate).toFixed(3)}deg)`
          : "";
        el.style.transform = `translateY(${lift.toFixed(3)}rem)${rotatePart}`;
        el.style.opacity = (clamp01(settled * 1.6) * (1 - exitProgress)).toFixed(3);
      });

      if (stackRef.current) {
        stackRef.current.style.transform = desktop
          ? `translateY(${(-exitProgress * EXIT_LIFT_REM).toFixed(3)}rem)`
          : "";
      }

      if (echoRef.current) {
        echoRef.current.style.opacity = (1 - exitProgress).toFixed(3);
      }

      if (payoffRef.current) {
        if (desktop) {
          payoffRef.current.style.opacity = exitProgress.toFixed(3);
          payoffRef.current.style.transform = `translateY(${(
            (1 - exitProgress) *
            1.5
          ).toFixed(3)}rem)`;
        } else {
          payoffRef.current.style.opacity = "";
          payoffRef.current.style.transform = "";
        }
      }
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
    <div ref={runwayRef} className="relative lg:h-[230vh]">
      <div className="lg:sticky lg:top-[max(2rem,calc(50vh-27rem))] lg:h-[54rem]">
        <Container>
          <div ref={echoRef} aria-hidden="true" className="hidden lg:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              {eyebrow}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{heading}</p>
          </div>
          <ol ref={stackRef} className="relative mt-6 lg:h-[48rem]">
            {cards.map((card, index) => {
              const pose = SHEET_POSE[index] ?? SHEET_POSE[0];

              return (
                <li
                  key={card.stage}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{ zIndex: index + 1 }}
                  className={`relative mt-6 w-full rotate-0 will-change-transform first:mt-0 lg:mt-0 ${pose.rotateClass} ${pose.layout}`}
                >
                  <article className="rounded-lg bg-zinc-100 p-6 text-zinc-950 shadow-2xl shadow-black/40 sm:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                      {card.stage}
                    </p>
                    {/*
                      The statement is the argument — it stays inside the
                      band the next sheet never covers (see SHEET_POSE),
                      and it outranks the base title, which is ornament.
                    */}
                    <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
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

                    {/*
                      Drafting slot: still reserved for real metrics, but
                      compressed to a single quiet line — an empty frame
                      must never outweigh the argument above it.
                    */}
                    <span className="mt-5 block border border-dashed border-zinc-300 px-4 py-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                        {card.placeholderLabel}
                      </span>
                    </span>

                    <p className="mt-5 text-3xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                      {card.title}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>

        {/*
          The act's closing moment: no diagram, no metrics, no fourth
          card — just the idea landing. Full-bleed and overlapping the
          cards' stage ONLY when motion is allowed on desktop; otherwise
          it's a plain block in normal flow straight after the cards.
        */}
        <div
          ref={payoffRef}
          className="mt-16 px-6 text-center sm:px-8 lg:mt-0 motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:flex motion-safe:lg:flex-col motion-safe:lg:items-center motion-safe:lg:justify-center motion-safe:lg:px-4"
        >
          <p className="text-6xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[11rem]">
            {payoff.headline}
          </p>
          <p
            className="mt-10 text-lg font-normal tracking-tight sm:mt-12 sm:text-xl"
            style={{ color: COBALT }}
          >
            {payoff.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
