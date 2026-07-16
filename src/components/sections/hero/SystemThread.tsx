"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import LocalTime from "@/components/sections/hero/LocalTime";
import type { HeroStatus } from "@/data/hero";

interface SystemThreadProps {
  status: HeroStatus;
}

/**
 * The L-cut between Act I and Act II (approved concept B, 2026-07-16):
 * the hero's live system row doesn't end with the hero — it docks at
 * the viewport top and rides over the story's opening, the practice's
 * pulse still ticking while the visitor reads about systems that don't
 * work together. It releases when its wrapper (Acts I–II) ends.
 *
 * Pinning is CSS sticky; the only JavaScript is a sentinel observer
 * that adds the glass surface once docked. On mobile the row stays in
 * flow (pinned chrome is too expensive at small heights).
 */
export default function SystemThread({ status }: SystemThreadProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Always observe — the surface classes are sm:-scoped, so the
    // docked state is inert on mobile where the row stays in flow.
    const observer = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      <div
        className={`z-20 border-b sm:sticky sm:top-0 motion-safe:transition-colors motion-safe:duration-300 ${
          docked
            ? "border-transparent sm:border-zinc-200 sm:bg-white/90 sm:backdrop-blur-sm"
            : "border-transparent"
        }`}
      >
        <Container>
          <div className="entrance-5 flex items-baseline justify-between gap-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            <p>
              {status.location} · <LocalTime timeZone={status.timeZone} /> ·{" "}
              {status.availability}
            </p>
            <p aria-hidden="true" className="shrink-0">
              [ scroll ]
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
