"use client";

import { useEffect, useRef } from "react";
import type { TensionFragment } from "@/data/tension";

interface AlignmentSequenceProps {
  fragments: TensionFragment[];
  turnLines: string[];
  bridge: string;
}

/**
 * The page's one choreographed moment (see docs/landing-experience.md,
 * Motion Philosophy): the problem fragments start horizontally scattered
 * — misaligned, the way a disconnected business feels — and converge
 * into a single aligned column as the visitor scrolls. The turn lines
 * land once alignment is complete.
 *
 * The server-rendered default is the final aligned state, so without
 * JavaScript, or under prefers-reduced-motion, the story is complete
 * and nothing is gated. Scroll progress mutates transform/opacity
 * directly via refs — no React re-renders, no layout properties.
 */
export default function AlignmentSequence({ fragments, turnLines, bridge }: AlignmentSequenceProps) {
  const fragmentRefs = useRef<(HTMLLIElement | null)[]>([]);
  const turnRef = useRef<HTMLParagraphElement>(null);
  const bridgeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    // Progress 0→1 as the element rises from 88% to 42% of the viewport.
    const progressOf = (el: HTMLElement) => {
      const viewportHeight = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, (viewportHeight * 0.88 - top) / (viewportHeight * 0.46)));
    };

    const update = () => {
      frame = 0;

      // Scale the scatter down on narrow viewports so fragments stay
      // mostly in frame while still reading as misaligned.
      const scatterScale =
        Math.min(1, window.innerWidth / 1024) * (window.innerWidth < 640 ? 0.5 : 1);

      fragmentRefs.current.forEach((el, index) => {
        if (!el) return;
        const settled = easeOutCubic(progressOf(el));
        const offset = (fragments[index]?.offsetRem ?? 0) * scatterScale;
        el.style.transform = `translateX(${(offset * (1 - settled)).toFixed(3)}rem)`;
        el.style.opacity = (0.24 + 0.76 * settled).toFixed(3);
      });

      for (const el of [turnRef.current, bridgeRef.current]) {
        if (!el) continue;
        const settled = easeOutCubic(progressOf(el));
        el.style.transform = `translateY(${((1 - settled) * 1.5).toFixed(3)}rem)`;
        el.style.opacity = settled.toFixed(3);
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
  }, [fragments]);

  return (
    <>
      <ul className="mt-16 space-y-5 sm:mt-20 sm:space-y-7">
        {fragments.map((fragment, index) => (
          <li
            key={fragment.text}
            ref={(el) => {
              fragmentRefs.current[index] = el;
            }}
            className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-zinc-950 will-change-transform sm:text-5xl"
          >
            {fragment.text}
          </li>
        ))}
      </ul>

      <p
        ref={turnRef}
        className="mt-24 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 will-change-transform sm:mt-32 sm:text-5xl lg:text-6xl"
      >
        {turnLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <p
        ref={bridgeRef}
        className="mt-8 max-w-md text-lg leading-8 text-zinc-500 will-change-transform sm:text-xl"
      >
        {bridge}
      </p>
    </>
  );
}
