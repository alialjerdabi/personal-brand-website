"use client";

import { useLayoutEffect, useRef } from "react";

interface ProblemRevealProps {
  lead: string;
  fragments: string[];
  turnLines: string[];
  bridge: string;
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-progress budget (fractions of one continuous 0→1 timeline).
 * Reveal does not begin until the heading crosses the "comfortable
 * reading" line — see START_AT_VIEWPORT_FRACTION — then the budget
 * plays out over a window sized to the block's OWN measured height
 * (see windowPx in the effect below), not a fixed viewport multiple.
 * SETTLE_AT_VIEWPORT_FRACTION is where the last line (bridge) should
 * sit once progress reaches 1 — comfortably read, not at the edge.
 */
const START_AT_VIEWPORT_FRACTION = 0.6;
const SETTLE_AT_VIEWPORT_FRACTION = 0.3;

const FRAG_STEP = 0.13; // gap between each fragment's start
const FRAG_SPAN = 0.1; // how much scroll each fragment's rise takes
const FRAG_RECEDE_SPAN = 0.08; // how long the fade-to-gray takes
const PAYOFF_GAP = 0.16; // the deliberately longer pause before the takeaway
const TURN_SPAN = 0.1;
const TURN_STAGGER = 0.04;
const BRIDGE_GAP = 0.05;
const BRIDGE_SPAN = 0.12;

const INK: [number, number, number] = [9, 9, 11]; // zinc-950 — the current thought
const PAST: [number, number, number] = [113, 113, 122]; // zinc-500 — receded, still legible
const COBALT = "#255DFF"; // connection color — reserved for "Nothing works together." only

function mixColor(t: number): string {
  const r = Math.round(INK[0] + (PAST[0] - INK[0]) * t);
  const g = Math.round(INK[1] + (PAST[1] - INK[1]) * t);
  const b = Math.round(INK[2] + (PAST[2] - INK[2]) * t);
  return `rgb(${r} ${g} ${b})`;
}

/**
 * Act II's reveal, scroll-scrubbed (revised 2026-07-20): a pure function
 * of scroll position, not a timer. Nothing plays until the heading
 * crosses a comfortable reading line (~60% down the viewport) — so the
 * hero and the system-thread handoff never eat into the sequence.
 * Scrolling down then progressively reveals each fragment (mask-rise,
 * no CSS transition — the eased value is computed directly from
 * continuous scroll delta every frame, so the motion can never outrun
 * the visitor); scrolling up progressively and exactly reverses it;
 * stopping freezes the exact state. A longer pause precedes the
 * takeaway, which lands as the section's conclusion.
 *
 * Bug fixed 2026-07-20 (Ali caught it: the payoff line was still rising
 * as it scrolled past the top of the viewport): the scroll window used
 * to complete the reveal was a flat 1.5×viewport-height budget, totally
 * decoupled from how tall the block actually is. On real content that
 * left only ~80px of scroll before the finished line scrolled off
 * screen — any normal scroll flick blew straight through it. The
 * window is now measured from the block's own layout height (heading
 * to bridge, via offsetTop — stable under the mask's translate, which
 * is paint-only) plus the distance from the trigger line down to
 * SETTLE_AT_VIEWPORT_FRACTION, so progress=1 lands with the bridge
 * comfortably inside the reading area, not at the edge, on any content
 * length or viewport height.
 *
 * Ref-driven, direct DOM mutation, no React re-renders during scroll.
 * The initial application runs in a layout effect (before paint) so
 * whatever the true scroll-derived state is — hidden, mid-reveal, or
 * complete for a deep link — is correct on first paint, never a flash.
 * Server-rendered fully revealed; reduced-motion skips the effect
 * entirely and the static, fully revealed markup stands.
 */
export default function ProblemReveal({ lead, fragments, turnLines, bridge }: ProblemRevealProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fragRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const turnRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bridgeRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heading = headingRef.current;
    const bridgeEl = bridgeRef.current;
    if (!heading || !bridgeEl) return;

    const fragStarts = fragments.map((_, index) => index * FRAG_STEP);
    const lastFragEnd = fragStarts[fragStarts.length - 1] + FRAG_SPAN;
    const turnStart = lastFragEnd + PAYOFF_GAP;
    const turnLineStarts = turnLines.map((_, index) => turnStart + index * TURN_STAGGER);
    const turnEnd = turnLineStarts[turnLineStarts.length - 1] + TURN_SPAN;
    const bridgeStart = turnEnd + BRIDGE_GAP;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const startLine = viewportHeight * START_AT_VIEWPORT_FRACTION;
      const settleLine = viewportHeight * SETTLE_AT_VIEWPORT_FRACTION;
      // offsetTop is a layout value, unaffected by the mask's translate
      // (a paint-only transform) — safe to read mid-reveal.
      const contentSpan = bridgeEl.offsetTop - heading.offsetTop;
      const windowPx = contentSpan + (startLine - settleLine);
      const top = heading.getBoundingClientRect().top;
      const progress = clamp01((startLine - top) / windowPx);

      fragments.forEach((_, index) => {
        const el = fragRefs.current[index];
        if (!el) return;
        const rise = easeOutCubic(clamp01((progress - fragStarts[index]) / FRAG_SPAN));
        el.style.translate = `0 ${(110 * (1 - rise)).toFixed(2)}%`;

        const recedeStart = index < fragStarts.length - 1 ? fragStarts[index + 1] : turnStart;
        const recede = easeOutCubic(clamp01((progress - recedeStart) / FRAG_RECEDE_SPAN));
        el.style.color = mixColor(recede);
      });

      turnLines.forEach((_, index) => {
        const el = turnRefs.current[index];
        if (!el) return;
        const rise = easeOutCubic(clamp01((progress - turnLineStarts[index]) / TURN_SPAN));
        el.style.translate = `0 ${(110 * (1 - rise)).toFixed(2)}%`;
      });

      if (bridgeRef.current) {
        const rise = easeOutCubic(clamp01((progress - bridgeStart) / BRIDGE_SPAN));
        bridgeRef.current.style.translate = `0 ${(110 * (1 - rise)).toFixed(2)}%`;
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
  }, [fragments, turnLines]);

  const mask = "block overflow-hidden";
  const rideItem = "block [will-change:translate]";

  return (
    <div>
      <h2
        ref={headingRef}
        id="tension-heading"
        className="text-xl font-medium tracking-tight text-zinc-500 sm:text-2xl"
      >
        {lead}
      </h2>

      <ul className="mt-16 space-y-5 sm:mt-20 sm:space-y-7">
        {fragments.map((fragment, index) => (
          <li key={fragment} className={`max-w-3xl ${mask}`}>
            <span
              ref={(el) => {
                fragRefs.current[index] = el;
              }}
              className={`${rideItem} text-3xl font-medium leading-tight tracking-tight text-zinc-950 sm:text-5xl`}
            >
              {fragment}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-28 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:mt-36 sm:text-5xl lg:text-6xl">
        {turnLines.map((line, index) => (
          <span key={line} className={mask}>
            <span
              ref={(el) => {
                turnRefs.current[index] = el;
              }}
              className={rideItem}
              // "Everything works." stays ink; "Nothing works together." —
              // the last line — turns cobalt (2026-07-20, Ali's direction).
              style={index === turnLines.length - 1 ? { color: COBALT } : undefined}
            >
              {line}
            </span>
          </span>
        ))}
      </p>

      <span className={`mt-8 max-w-md ${mask}`}>
        <span
          ref={bridgeRef}
          className={`${rideItem} text-lg leading-8 text-zinc-500 sm:text-xl`}
        >
          {bridge}
        </span>
      </span>
    </div>
  );
}
