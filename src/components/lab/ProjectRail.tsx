"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LabContent, LabProject } from "@/data/lab";

interface ProjectRailProps {
  projects: LabProject[];
  lobby: LabContent["lobby"];
}

function ProjectCard({
  project,
  pendingLabel,
  index,
}: {
  project: LabProject;
  pendingLabel: string;
  index: number;
}) {
  const media = project.cover ? (
    <Image
      src={project.cover.src}
      alt={project.cover.alt}
      fill
      preload={index === 0}
      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 23vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  ) : (
    /*
     * A real engagement whose cover art does not exist yet. Designed as a
     * deliberate state rather than a grey box — and never filled with a
     * borrowed image, which would misrepresent one client's work as
     * another's.
     */
    <span className="flex h-full w-full flex-col justify-between border border-lab-rule p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-lab-ink/70">
        {project.name}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-lab-ink-muted">
        {pendingLabel}
      </span>
    </span>
  );

  const body = (
    <>
      <span className="relative block aspect-[368/500] w-full overflow-hidden bg-lab-surface">
        {media}
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-base font-medium tracking-tight text-lab-ink transition-colors group-hover:text-accent">
          {project.name}
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-lab-ink-muted">
          {project.year}
        </span>
      </span>
      {project.disciplines.length > 0 && (
        <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
          {project.disciplines.join(" · ")}
        </span>
      )}
    </>
  );

  /*
   * Sized against BOTH axes. A cover measured only in vw is correct on a
   * phone and far too tall on a 1280×720 laptop, where it pushed the
   * lobby 71px off its own screen — and a lobby that doesn't fit one
   * screen isn't a lobby.
   *
   * The height term subtracts the chrome (header, descriptor, rule, the
   * bottom bar, the card's own caption) and converts what's left into a
   * width through the 368:500 cover ratio — rather than a flat svh
   * percentage, which under-sizes tall screens because the chrome above
   * and below the rail does not grow with viewport height.
   */
  const shell =
    "group block w-[min(72vw,calc((100svh-400px)*0.736))] min-w-[180px] max-w-[368px] shrink-0 snap-start sm:w-[min(40vw,calc((100svh-400px)*0.736))] lg:w-[min(23vw,calc((100svh-400px)*0.736))]";

  if (!project.spreads) {
    return (
      <article className={shell} aria-label={`${project.name} — ${pendingLabel}`}>
        {body}
      </article>
    );
  }

  return (
    <Link
      href={`/lab/${project.slug}`}
      className={`${shell} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-lab-ground`}
    >
      {body}
    </Link>
  );
}

/**
 * The work rail — the whole argument of the lobby, and the only thing on
 * the first screen that moves.
 *
 * Built on native horizontal overflow with scroll snapping rather than a
 * transform-driven carousel: touch, momentum, trackpad, keyboard and
 * screen-reader behaviour all come for free and correct. Drag-to-scroll
 * is layered on top for pointer users as an enhancement.
 *
 * The vertical wheel is deliberately NOT hijacked. The lobby is a locked
 * screen that opens into the rest of the page when you scroll down, and
 * converting that gesture into horizontal movement would trap the visitor
 * on the first screen — the single most common way this pattern fails.
 */
export default function ProjectRail({ projects, lobby }: ProjectRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  /* Hidden until we know: arrows that cannot move anything are worse than
     no arrows. True on the server so no-JS visitors still get controls. */
  const [scrollable, setScrollable] = useState(true);

  const readActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + parseFloat(getComputedStyle(scroller).columnGap || "0");
    if (!stride) return;
    const index = Math.round(scroller.scrollLeft / stride);
    setActive(Math.min(projects.length, Math.max(1, index + 1)));
  }, [projects.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        readActive();
      });
    };

    const measure = () => setScrollable(scroller.scrollWidth > scroller.clientWidth + 1);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [readActive]);

  // Drag to scroll. Pointer capture keeps the gesture alive outside the
  // rail, and the 4px threshold is what stops a click on a card from
  // being swallowed by an accidental one-pixel drag.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let startX = 0;
    let startScroll = 0;
    let dragging = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return; // native touch scrolling is better
      dragging = false;
      startX = event.clientX;
      startScroll = scroller.scrollLeft;
      scroller.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!scroller.hasPointerCapture(event.pointerId)) return;
      const delta = event.clientX - startX;
      if (!dragging && Math.abs(delta) < 4) return;
      dragging = true;
      scroller.style.scrollSnapType = "none";
      scroller.scrollLeft = startScroll - delta;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }
      scroller.style.scrollSnapType = "";
      if (dragging) {
        // Suppress the click that would otherwise fire on the card the
        // drag happened to finish over.
        const suppress = (click: MouseEvent) => {
          click.preventDefault();
          click.stopPropagation();
        };
        scroller.addEventListener("click", suppress, { capture: true, once: true });
        window.setTimeout(
          () => scroller.removeEventListener("click", suppress, { capture: true }),
          0
        );
      }
      dragging = false;
    };

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const card = scroller?.firstElementChild as HTMLElement | null;
    if (!scroller || !card) return;
    const stride = card.offsetWidth + parseFloat(getComputedStyle(scroller).columnGap || "0");
    scroller.scrollBy({ left: stride * direction, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center">
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Selected work"
        className="lab-rail flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 sm:gap-6 sm:px-10 focus-visible:outline-none"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            pendingLabel={lobby.pendingLabel}
            index={index}
          />
        ))}
      </div>

      {/*
        One bottom bar, not two rows. On a 720px-tall laptop every stacked
        row of chrome is a row the covers lose, and the lobby stops being
        a single screen — which is the whole idea.
      */}
      <div
        data-lobby-meta
        className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 sm:mt-8 sm:px-10"
      >
        <div className="flex items-baseline gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {String(active).padStart(2, "0")}{" "}
            <span className="text-lab-ink-muted">
              / {String(projects.length).padStart(2, "0")} {lobby.counterLabel}
            </span>
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-lab-ink-muted sm:block">
            {lobby.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {scrollable && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous project"
                className="flex h-9 w-9 items-center justify-center border border-lab-rule text-lab-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next project"
                className="flex h-9 w-9 items-center justify-center border border-lab-rule text-lab-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}

          <a
            href="#services"
            className="group ml-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-lab-ink-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            {lobby.scrollLabel}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
