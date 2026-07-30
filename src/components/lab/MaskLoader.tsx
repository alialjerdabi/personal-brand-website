"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { LabContent } from "@/data/lab";

interface MaskLoaderProps {
  loader: LabContent["loader"];
}

/**
 * Loading-to-landing sequence (~2.5s).
 *
 * 1. BRAND, WEB and PRODUCT arrive independently from behind a mask.
 * 2. A thin orange rule draws through and aligns them.
 * 3. Project fragments flash through the letterforms — the aperture
 *    mechanic previewed before the visitor ever meets it in the hero.
 * 4. The block releases upward and the composition is already there.
 *
 * Server-rendered rather than mounted in an effect, so there is no flash
 * of hero before the overlay appears. That makes clearing itself without
 * JavaScript a hard requirement, handled by the CSS failsafe animation on
 * `#mask-loader` (globals.css) which this timeline cancels on frame one.
 * Under reduced motion the same stylesheet removes the overlay outright.
 *
 * Initial transforms are inline styles, not Tailwind classes, on purpose:
 * in Tailwind v4 `translate-y-*` and `scale-x-*` compile to the CSS
 * `translate` / `scale` properties, which compose with — rather than are
 * overridden by — the `transform` matrix GSAP writes. Mixing the two
 * silently doubles the movement.
 */
export default function MaskLoader({ loader }: MaskLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Take ownership from the no-JS failsafe before it can advance.
        root.style.animation = "none";

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const fills = gsap.utils.toArray<HTMLElement>("[data-loader-fill]");
        const frames = loader.fragments.map((src) => `url(${src})`);

        const finish = () => {
          document.body.style.overflow = previousOverflow;
          root.style.visibility = "hidden";
        };

        /*
         * GSAP runs on requestAnimationFrame, which does not fire while a
         * tab is in the background — verified: a hidden tab sits at frame
         * zero indefinitely. The timeline catches up once the tab is
         * focused, but "the scroll lock releases eventually" is not a
         * guarantee worth shipping on the one screen that has to work.
         * setTimeout is throttled in background tabs but still fires.
         */
        const failsafe = window.setTimeout(finish, 4500);

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            window.clearTimeout(failsafe);
            finish();
          },
        });

        timeline
          .to("[data-loader-word]", { yPercent: 0, duration: 0.72, stagger: 0.13 })
          .to("[data-loader-rule]", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.5)
          .to(fills, { opacity: 1, duration: 0.3, stagger: 0.07 }, 0.95);

        // Each word steps through the fragments on its own offset, so the
        // three are never showing the same frame — three windows onto one
        // body of work, rather than one image repeated three times.
        frames.forEach((_, frameIndex) => {
          timeline.call(
            () => {
              fills.forEach((fill, wordIndex) => {
                fill.style.setProperty(
                  "--aperture-image",
                  frames[(frameIndex + wordIndex) % frames.length]
                );
              });
            },
            undefined,
            1.05 + frameIndex * 0.24
          );
        });

        timeline
          .to("[data-loader-block]", { yPercent: -14, duration: 0.75, ease: "power2.inOut" }, 1.9)
          .to(root, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 2.0);

        return () => {
          window.clearTimeout(failsafe);
          document.body.style.overflow = previousOverflow;
        };
      });

      return () => media.revert();
    }, rootRef);

    return () => context.revert();
  }, [loader.fragments]);

  return (
    <div
      id="mask-loader"
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-lab-ground"
    >
      {/*
        Full bleed, not a centred card. The three words fill the measure
        the way the masthead they hand over to does — same device, same
        confidence, so the loader reads as the page arriving rather than
        as a screen in front of it.
      */}
      <div data-loader-block className="w-full px-6">
        <div className="flex flex-col items-start">
          {loader.words.map((word) => (
            <span key={word} className="block overflow-hidden">
              <span
                data-loader-word
                style={{ transform: "translateY(100%)" }}
                className="relative block text-[clamp(3rem,17vw,15rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-accent"
              >
                {word}
                {/*
                  The aperture layer sits exactly on top of the ink layer,
                  so the fragment beat is a change of fill, not of position.
                  It carries no image until the timeline hands it one —
                  until then it is transparent, and the ink layer beneath
                  is what renders.
                */}
                <span
                  data-loader-fill
                  aria-hidden="true"
                  className="aperture absolute inset-0 opacity-0"
                  style={{ "--aperture-position": "50% 45%" } as React.CSSProperties}
                >
                  {word}
                </span>
              </span>
            </span>
          ))}
        </div>

        <span
          data-loader-rule
          style={{ transform: "scaleX(0)" }}
          className="mt-7 block h-1 w-full origin-left bg-accent sm:h-1.5"
        />
      </div>
    </div>
  );
}
