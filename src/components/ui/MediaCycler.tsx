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
  /**
   * Externally controlled autoplay gate — when a parent group arbitrates
   * which one of several cyclers may run (e.g. hero/HeroCardGroupContext.tsx,
   * capabilities/WorkGridContext.tsx). Omitted entirely (undefined)
   * preserves this component's original always-on-unless-hovered
   * behavior for callers that don't participate in a group. Explicit
   * `false` resets to the first frame rather than freezing mid-cycle,
   * so a deactivated card is always found at rest.
   */
  playing?: boolean;
  /**
   * Crossfade/pan duration in ms — defaults to the original approved
   * 650ms for existing callers (Method's partner portrait, Services'
   * AssetTile). A parent driving `playing` from a faster-paced group
   * (e.g. the hero cards) may pass a shorter value; it governs both the
   * per-frame CSS transition and the bookkeeping timeout that returns a
   * departed frame to its idle pose, so the two stay in lockstep.
   */
  crossfadeMs?: number;
  /** Placeholder frame surface, tuned per ground. */
  placeholderClassName?: string;
}

const DEFAULT_CROSSFADE_MS = 650;

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
  playing,
  crossfadeMs = DEFAULT_CROSSFADE_MS,
  placeholderClassName = "bg-ground-inverted text-white/40",
}: MediaCyclerProps) {
  const [cycle, setCycle] = useState({ active: 0, leaving: -1 });
  const [mounted, setMounted] = useState(false);
  const pausedRef = useRef(false);

  // A deactivated card (playing → false) settles back to its first frame
  // through the SAME crossfade as a normal cycle tick (current frame
  // marked "leaving", frame 0 becomes active) rather than snapping —
  // the asset must never replace instantly, only ever fade. Adjusted
  // during render rather than in an effect (React's documented pattern
  // for resetting state in response to a prop change) so it takes effect
  // in the same commit the group hands playback to a different card.
  const [prevPlaying, setPrevPlaying] = useState(playing);
  if (playing !== prevPlaying) {
    setPrevPlaying(playing);
    if (playing === false) {
      setCycle((current) => (current.active === 0 ? current : { active: 0, leaving: current.active }));
    }
  }

  // Entry: the first frame pans up into place as the section loads.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (frames.length < 2) return;
    if (playing === false) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setCycle((current) => ({
        active: (current.active + 1) % frames.length,
        leaving: current.active,
      }));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [frames.length, intervalMs, playing]);

  // Return the departed frame to the idle pose once its exit finishes.
  useEffect(() => {
    if (cycle.leaving < 0) return;
    const timer = setTimeout(
      () => setCycle((current) => ({ ...current, leaving: -1 })),
      crossfadeMs
    );
    return () => clearTimeout(timer);
  }, [cycle, crossfadeMs]);

  const layerClass = (index: number) => {
    const base = "absolute inset-0 motion-safe:transition-[transform,opacity] motion-safe:ease-out";
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
          style={{ transitionDuration: `${crossfadeMs}ms` }}
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
