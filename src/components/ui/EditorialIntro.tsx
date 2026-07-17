"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MediaCycler from "@/components/ui/MediaCycler";
import type { HeroIntro } from "@/data/hero";

const INTRO_DURATION_MS = 2450;

/**
 * Module-scope flag: survives client-side route changes (so returning
 * from /services doesn't replay the intro) but resets on every full
 * page load — the intro is an inevitable entry, watched on every
 * arrival. Set only on completion, which also makes it immune to
 * StrictMode's double-mounted effects in development.
 */
let playedThisPageLoad = false;

interface EditorialIntroProps {
  intro: HeroIntro;
}

/**
 * The editorial loading intro (approved 2026-07-16): the visitor enters
 * a curated space rather than loading a website. A grey field carries
 * the thesis as a small centered statement; a white architectural frame
 * expands from the center and becomes the page; the hero entrance
 * settles in as the frame completes (see globals.css).
 *
 * All choreography is CSS keyframes ending in visibility:hidden, so
 * the page is never gated on JavaScript. This component only handles
 * the route-return skip and final unmount. Reduced motion skips the
 * intro entirely via CSS.
 */
export default function EditorialIntro({ intro }: EditorialIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef(false);
  const [done, setDone] = useState(false);

  // Before first paint: if this page load has already played the intro
  // (client-side route return), hide the node immediately via DOM
  // mutation so there is no flash before the unmount timer runs.
  useLayoutEffect(() => {
    if (playedThisPageLoad && rootRef.current) {
      skipRef.current = true;
      rootRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        playedThisPageLoad = true;
        setDone(true);
      },
      skipRef.current ? 0 : INTRO_DURATION_MS + 200
    );
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      id="editorial-intro"
      aria-hidden="true"
      className="fixed inset-0 z-40 bg-zinc-100 [animation:intro-backdrop_2450ms_ease_forwards]"
    >
      <p className="absolute inset-0 flex items-center justify-center gap-3 px-6 text-lg font-medium tracking-tight text-zinc-950 [animation:intro-statement_2450ms_cubic-bezier(0.2,0.7,0.2,1)_both] sm:text-xl">
        {intro.pre}
        <span className="relative inline-block h-6 w-11 shrink-0 overflow-hidden rounded-lg sm:h-7 sm:w-12">
          <MediaCycler
            frames={intro.chips}
            sizes="48px"
            intervalMs={1500}
            className="absolute inset-0"
          />
        </span>
        {intro.post}
      </p>
      <div className="absolute -inset-16 rounded-[3rem] bg-white [animation:intro-frame_2450ms_cubic-bezier(0.2,0.7,0.2,1)_both]" />
    </div>
  );
}
