"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { LabContent } from "@/data/lab";

gsap.registerPlugin(ScrollTrigger);

const CYCLE_MS = 3200;

/**
 * The showcase: one poster-scale panel that fills the screen.
 *
 * Two behaviours, deliberately separated:
 *
 * 1. THE HANDOFF. The panel does not simply appear — it grows out of the
 *    hero. It starts small and low, roughly where the stills sit inside
 *    the headline, and scroll drives it up to full size, so the poster
 *    the visitor saw inside the sentence becomes the thing they are now
 *    looking at. Done as scale and translate on the panel itself rather
 *    than as a separate flying element measured against two bounding
 *    boxes: no layout maths, nothing to resynchronise on resize, and it
 *    cannot desynchronise from the element it is pretending to be.
 *
 * 2. THE CONTENT. The frames change on their own, on a timer — the work
 *    plays whether or not the visitor keeps scrolling. Cycling pauses
 *    when the panel is off screen so it is never animating unseen, and
 *    never starts at all under reduced motion.
 *
 * Transform and opacity only.
 */
export default function ProjectShowcase({ content }: { content: LabContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const { showcase } = content;

  // The handoff.
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-showcase-panel]",
          { scale: 0.34, yPercent: -14, opacity: 0.55 },
          {
            scale: 1,
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-showcase-root]",
              start: "top bottom",
              end: "top 12%",
              scrub: 0.5,
            },
          }
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  // Only cycle while the panel is actually on screen.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (showcase.frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(
      () => setActive((current) => (current + 1) % showcase.frames.length),
      CYCLE_MS
    );
    return () => clearInterval(interval);
  }, [visible, showcase.frames.length]);

  const current = showcase.frames[active];

  return (
    <section
      ref={rootRef}
      data-showcase-root
      aria-labelledby="lab-showcase-heading"
      className="bg-lab-air px-3 pb-16 pt-2 sm:px-5 sm:pb-24"
    >
      <h2 id="lab-showcase-heading" className="sr-only">
        {showcase.heading}
      </h2>

      <div
        ref={panelRef}
        data-showcase-panel
        className="relative mx-auto h-[calc(100svh-6rem)] w-full max-w-[1720px] origin-top overflow-hidden rounded-[2rem] bg-lab-haze shadow-[0_50px_120px_-60px_rgb(19_23_30/0.6)] ring-1 ring-lab-hairline sm:rounded-[2.5rem]"
      >
        {showcase.frames.map((frame, index) => (
          <div
            key={frame.image.src}
            aria-hidden={index !== active}
            className={`absolute inset-0 motion-safe:transition-[opacity,transform] motion-safe:duration-[1100ms] motion-safe:ease-out ${
              index === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
            }`}
          >
            <Image
              src={frame.image.src}
              alt={frame.image.alt}
              fill
              preload={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-black/65 to-transparent p-5 sm:p-8">
          <p
            aria-live="polite"
            className="flex flex-wrap items-baseline gap-x-3 font-display text-white"
          >
            <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-bold tracking-[-0.03em]">
              {current.project}
            </span>
            <span className="text-[15px] text-white/75">{current.caption}</span>
          </p>

          {/* Where you are in the sequence, without a control to operate. */}
          <span className="flex items-center gap-1.5">
            {showcase.frames.map((frame, index) => (
              <span
                key={frame.image.src}
                aria-hidden="true"
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === active ? "w-7 bg-white" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
