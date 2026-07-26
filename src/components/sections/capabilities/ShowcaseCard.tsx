"use client";

import ProjectCardSlider from "@/components/sections/capabilities/ProjectCardSlider";
import { useWorkGridCard } from "@/components/sections/capabilities/WorkGridContext";
import type { Project } from "@/data/projects";

const MEDIA_SIZES = "(min-width: 1024px) 50vw, 100vw";

/**
 * `playing` now comes from the shared WorkGrid context (2026-07-25),
 * not local hover state — exactly one card across the whole grid plays
 * at a time, Petrolas by default, overridden by whichever card is
 * hovered or keyboard-focused for as long as that lasts (see
 * WorkGridContext.tsx). Hover/focus handlers here only report the
 * interaction up to that shared arbiter; they don't decide playback
 * themselves.
 *
 * Reverted 2026-07-20 (Ali preferred the original over the full-measure
 * feature): back to a real card that also renders "in production"
 * placeholders as honest, non-linking states — the mid-story break is
 * the asymmetric grid itself, not one enlarged image.
 */
export default function ShowcaseCard({ project }: { project: Project }) {
  const { playing, setHovered } = useWorkGridCard(project.slug);

  const media = (
    <span
      className={`relative block overflow-hidden rounded-2xl ${
        project.placeholder ? "border border-border bg-surface" : "bg-ground-inverted"
      } ${project.tall ? "aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]"}`}
    >
      {project.placeholder ? (
        <>
          {/* Pan animation is wired and waiting for real assets. */}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:-translate-x-1/4">
            [ case study ]
          </span>
          <span className="absolute inset-0 flex translate-x-full items-center justify-center bg-surface-hover font-mono text-[11px] uppercase tracking-[0.3em] text-foreground-faint motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover:translate-x-0">
            in production
          </span>
        </>
      ) : (
        project.slides.length > 0 && (
          <ProjectCardSlider slides={project.slides} playing={playing} sizes={MEDIA_SIZES} />
        )
      )}
    </span>
  );

  const caption = (
    <span className="mt-4 flex items-baseline justify-between gap-6">
      <span className="text-lg font-medium tracking-tight text-foreground">{project.name}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-faint">
        {project.tag}
      </span>
    </span>
  );

  if (project.placeholder) {
    return (
      <div
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {media}
        {caption}
      </div>
    );
  }

  return (
    <a
      href={project.route}
      className="group block focus-visible:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {media}
      {caption}
    </a>
  );
}
