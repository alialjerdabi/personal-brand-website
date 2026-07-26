"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HeroAsset } from "@/data/hero";

interface ProjectCardSliderProps {
  slides: HeroAsset[];
  /** True while this is the one card the grid has designated "active" — see WorkGridContext.tsx. */
  playing: boolean;
  sizes: string;
}

const STEP_MS = 1000;
const TRANSITION_MS = 600;

/**
 * A calm, controlled editorial slide-through for project cards with more
 * than one real image (2026-07-24; currently Petrolas only, see
 * docs/design-language-notes.md). Resting state always shows the first
 * slide — the card's established cover image, unchanged from before this
 * component existed. Whichever card the grid designates `playing` (see
 * WorkGridContext.tsx: Petrolas by default, or whatever's hovered/focused
 * while that lasts) advances through the rest at a steady one-per-second
 * pace; the moment it stops being the playing card it resets cleanly to
 * the first slide, never left mid-sequence.
 *
 * Pure horizontal translateX filmstrip (transform only, fixed track
 * width, no layout shift), consistent with the site's existing pan/slide
 * motion language elsewhere. Only one card plays at a time, enforced by
 * the shared context, not by this component. Bails entirely under
 * reduced motion, in which case the resting slide is the permanent,
 * fully static state (matches this codebase's MediaCycler convention).
 */
export default function ProjectCardSlider({ slides, playing, sizes }: ProjectCardSliderProps) {
  const [index, setIndex] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!playing || slides.length < 2 || reducedMotionRef.current) {
      setIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, STEP_MS);
    return () => clearInterval(interval);
  }, [playing, slides.length]);

  return (
    <span
      className="absolute left-0 top-0 flex h-full motion-safe:transition-transform"
      style={{
        width: `${slides.length * 100}%`,
        transform: `translateX(-${(index / slides.length) * 100}%)`,
        transitionDuration: `${TRANSITION_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {slides.map((slide, i) => (
        <span key={slide.src} className="relative block h-full" style={{ width: `${100 / slides.length}%` }}>
          <Image
            src={slide.src}
            alt={i === 0 ? slide.alt : ""}
            aria-hidden={i === 0 ? undefined : "true"}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </span>
      ))}
    </span>
  );
}
