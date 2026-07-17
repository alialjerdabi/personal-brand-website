"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CycleFrame } from "@/data/hero";

interface MediaCyclerProps {
  frames: CycleFrame[];
  /** Fills its nearest positioned ancestor. */
  className?: string;
  sizes: string;
  intervalMs?: number;
  /** Hold the current frame while the pointer is over the slot. */
  pauseOnHover?: boolean;
  /** Preload the first frame (above-the-fold slots). */
  preloadFirst?: boolean;
  /** Placeholder frame surface, tuned per ground. */
  placeholderClassName?: string;
}

const CYCLE_TRANSITION_MS = 650;

/**
 * The approved image-cycle choreography (2026-07-16): the current frame
 * pans up and settles back to ~80% as it leaves; the next frame grows
 * from that same 80% back to full — an exhale, then an arrival. One
 * frame means no cycling: the machinery stays ready for assets.
 *
 * Transform/opacity only. Cycling pauses while hovered (proof text must
 * never sit on a moving image) and never starts under reduced motion.
 */
export default function MediaCycler({
  frames,
  className = "",
  sizes,
  intervalMs = 2000,
  pauseOnHover = false,
  preloadFirst = false,
  placeholderClassName = "bg-zinc-900 text-white/40",
}: MediaCyclerProps) {
  const [cycle, setCycle] = useState({ active: 0, leaving: -1 });
  const [mounted, setMounted] = useState(false);
  const pausedRef = useRef(false);

  // Entry: the first frame pans up into place as the section loads.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setCycle((current) => ({
        active: (current.active + 1) % frames.length,
        leaving: current.active,
      }));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [frames.length, intervalMs]);

  // Return the departed frame to the idle pose once its exit finishes.
  useEffect(() => {
    if (cycle.leaving < 0) return;
    const timer = setTimeout(
      () => setCycle((current) => ({ ...current, leaving: -1 })),
      CYCLE_TRANSITION_MS
    );
    return () => clearTimeout(timer);
  }, [cycle]);

  const layerClass = (index: number) => {
    const base =
      "absolute inset-0 motion-safe:transition-[transform,opacity] motion-safe:duration-[650ms] motion-safe:ease-out";
    if (index === cycle.active) {
      return `${base} ${
        mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-[4%] scale-100 opacity-0"
      }`;
    }
    if (index === cycle.leaving) {
      return `${base} -translate-y-[6%] scale-[0.8] opacity-0`;
    }
    return `${base} translate-y-0 scale-[0.8] opacity-0`;
  };

  return (
    <span
      className={`block overflow-hidden ${className}`.trim()}
      onMouseEnter={pauseOnHover ? () => (pausedRef.current = true) : undefined}
      onMouseLeave={pauseOnHover ? () => (pausedRef.current = false) : undefined}
    >
      {frames.map((frame, index) => (
        <span
          key={frame.kind === "image" ? frame.src : `${frame.label}-${index}`}
          aria-hidden={index !== cycle.active}
          className={layerClass(index)}
        >
          {frame.kind === "image" ? (
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              preload={preloadFirst && index === 0}
              sizes={sizes}
              className="object-cover"
            />
          ) : (
            <span
              className={`flex h-full w-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] ${placeholderClassName}`}
            >
              {frame.label}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
