"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCardSlider from "@/components/sections/capabilities/ProjectCardSlider";
import type { HeroAsset } from "@/data/hero";

/**
 * The /work archive's large featured-project media (2026-07-25) — the
 * same filmstrip slider as the homepage cards, but self-contained
 * rather than arbitrated by WorkGridContext, since it stands alone at
 * the top of the page rather than competing with sibling cards. Plays
 * for as long as it's in the viewport, same viewport-driven rule as
 * the homepage's default project.
 */
export default function FeaturedProjectMedia({ slides, sizes }: { slides: HeroAsset[]; sizes: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full">
      <ProjectCardSlider slides={slides} playing={inView} sizes={sizes} />
    </div>
  );
}
