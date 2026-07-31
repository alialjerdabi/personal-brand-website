"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { LabContent } from "@/data/lab";

gsap.registerPlugin(ScrollTrigger);

/**
 * The showcase panel: one large frame under the hero that steps through
 * project stills as the page is scrolled.
 *
 * Scroll-scrubbed rather than autoplaying — the visitor drives it, so it
 * can never play before they arrive or loop at them while they read. The
 * panel pins for the length of the sequence and releases; each frame
 * crossfades and drifts a few percent so the change reads as a cut in a
 * film rather than a slideshow tick.
 *
 * Opacity and transform only. Under reduced motion the pin and the scrub
 * are never created at all: the panel renders as a plain grid of stills
 * (see the fallback markup), which says the same thing without moving.
 */
export default function ProjectShowcase({ content }: { content: LabContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { showcase } = content;

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
        const captions = gsap.utils.toArray<HTMLElement>("[data-caption]");
        if (frames.length < 2) return;

        // Everything but the first frame starts hidden and slightly
        // enlarged, so each arrival settles rather than snaps.
        gsap.set(frames.slice(1), { opacity: 0, scale: 1.06 });
        gsap.set(captions.slice(1), { opacity: 0, y: 14 });

        /*
         * The stage is held by CSS `position: sticky`, not by GSAP's pin.
         * Using both fights: GSAP's pin switches the element to fixed and
         * inserts a spacer, which a sticky element is already handling.
         * Native sticky is free, survives resize without a refresh, and
         * leaves ScrollTrigger with one job — scrubbing the crossfade.
         */
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-showcase-runway]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        frames.forEach((frame, index) => {
          if (index === 0) return;
          timeline
            .to(frames[index - 1], { opacity: 0, scale: 0.98, duration: 1 }, index - 1)
            .to(frame, { opacity: 1, scale: 1, duration: 1 }, index - 1)
            .to(captions[index - 1], { opacity: 0, y: -14, duration: 0.5 }, index - 1)
            .to(captions[index], { opacity: 1, y: 0, duration: 0.5 }, index - 0.5);
        });
      });

      return () => media.revert();
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="lab-showcase-heading"
      className="bg-lab-air px-5 pb-20 pt-4 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h2
            id="lab-showcase-heading"
            className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-lab-ink-warm"
          >
            {showcase.heading}
          </h2>
          <p className="font-display text-[15px] text-lab-ink-soft">{showcase.label}</p>
        </div>
      </div>

      {/*
        The runway is the scroll distance the sequence consumes; the stage
        is what pins inside it. Separating them is what lets the panel
        hold still while the page keeps moving — a single element cannot
        be both the thing that scrolls and the thing that stays.
      */}
      <div
        data-showcase-runway
        className="mx-auto mt-8 max-w-6xl"
        style={{ height: `${showcase.frames.length * 70}vh` }}
      >
        <div data-showcase-stage className="sticky top-24">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-lab-haze shadow-[0_40px_100px_-50px_rgb(19_23_30/0.55)] ring-1 ring-lab-hairline sm:aspect-[16/9]">
            {showcase.frames.map((frame, index) => (
              <div key={frame.image.src} data-frame className="absolute inset-0">
                <Image
                  src={frame.image.src}
                  alt={frame.image.alt}
                  fill
                  preload={index === 0}
                  sizes="(max-width: 1024px) 92vw, 1100px"
                  className="object-cover"
                />
              </div>
            ))}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-8">
              <div className="relative h-12 w-full">
                {showcase.frames.map((frame) => (
                  <p
                    key={frame.caption}
                    data-caption
                    className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-3 rounded-full bg-black/45 px-5 py-2.5 font-display text-[15px] text-white backdrop-blur-md sm:w-fit"
                  >
                    <span className="font-bold">{frame.project}</span>
                    <span className="text-white/70">{frame.caption}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
