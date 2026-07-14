"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms, applied only to the entrance transition. */
  delay?: number;
  className?: string;
}

/**
 * Quiet entrance reveal: fade + short rise when the element enters the
 * viewport. Server-rendered visible, so without JavaScript or under
 * prefers-reduced-motion nothing is ever hidden — the effect only
 * arms itself for elements still below the fold after hydration.
 */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-[400ms] motion-safe:ease-out ${
        state === "visible" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}
