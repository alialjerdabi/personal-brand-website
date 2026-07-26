"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectIndexNavProps {
  projects: Project[];
  currentSlug: string;
  /**
   * "scroll" (the /work archive): names scroll-spy against on-page
   * sections and clicking one scrolls to its preview. "navigate" (case
   * -study pages): the current project is fixed and clicking another
   * name goes to its own route (or back to the archive if it has none
   * yet).
   */
  mode: "scroll" | "navigate";
  /** Case-study pages pass false — just the prev/next pager, not the full roster. */
  showFullList?: boolean;
  className?: string;
}

/**
 * The reusable project index (2026-07-25) — one component, two contexts:
 * the /work archive's name-as-navigation list (bold names, current one
 * highlighted, scroll-spied against the page's own project sections),
 * and case-study pages' prev/next pager (same data, same ordering,
 * `showFullList={false}`). Desktop renders the name list as a vertical
 * stack; mobile becomes a horizontally-scrollable row (`overflow-x-auto`,
 * not a wrapped grid) — a simple, honest scroll browser rather than a
 * cramped multi-line list.
 */
export default function ProjectIndexNav({
  projects,
  currentSlug,
  mode,
  showFullList = true,
  className = "",
}: ProjectIndexNavProps) {
  const [scrolledSlug, setScrolledSlug] = useState(currentSlug);

  useEffect(() => {
    if (mode !== "scroll") return;
    const sections = projects
      .map((project) => document.getElementById(project.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const closestToCenter = visible.reduce((closest, entry) =>
          Math.abs(entry.boundingClientRect.top) < Math.abs(closest.boundingClientRect.top) ? entry : closest
        );
        setScrolledSlug(closestToCenter.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [mode, projects]);

  const activeSlug = mode === "scroll" ? scrolledSlug : currentSlug;
  const currentIndex = Math.max(
    0,
    projects.findIndex((project) => project.slug === currentSlug)
  );
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  const hrefFor = (project: Project) => (mode === "scroll" ? `#${project.slug}` : project.route ?? `/work#${project.slug}`);

  return (
    <nav aria-label="Projects" className={className}>
      {showFullList && (
        <ul className="flex gap-8 overflow-x-auto pb-2 lg:block lg:space-y-2.5 lg:overflow-visible lg:pb-0">
          {projects.map((project, index) => {
            const isActive = activeSlug === project.slug;
            return (
              <li key={project.slug} className="shrink-0 lg:shrink">
                <Link
                  href={hrefFor(project)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-baseline gap-3 whitespace-nowrap text-sm transition-colors focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none ${
                    isActive ? "text-accent" : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-[10px] text-foreground-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {!showFullList && (
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-faint">
          <Link href={hrefFor(previous)} className="transition-colors hover:text-foreground">
            ← {previous.name}
          </Link>
          <Link href={hrefFor(next)} className="transition-colors hover:text-foreground">
            {next.name} →
          </Link>
        </div>
      )}
    </nav>
  );
}
