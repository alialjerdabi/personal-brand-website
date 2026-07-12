"use client";

import { useState } from "react";
import Image from "next/image";
import type { HeroFlagship, HeroLens } from "@/data/hero";

interface LensExplorerProps {
  workLabel: string;
  flagship: HeroFlagship;
  lenses: HeroLens[];
}

/**
 * The hero's signature interaction: one flagship client viewed through
 * three lenses. Hovering, focusing, or tapping a lens re-renders the
 * same project in that discipline's view — demonstrating "everything
 * works toward the same goal" instead of describing it.
 *
 * All lens assets stay mounted and cross-fade via opacity so switching
 * is instant and never remounts. Transitions are motion-safe only.
 */
export default function LensExplorer({ workLabel, flagship, lenses }: LensExplorerProps) {
  const [activeId, setActiveId] = useState(lenses[0]?.id);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-end lg:gap-16">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400">
          {workLabel}
        </p>
        <p className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
          {flagship.client}
          <span className="text-zinc-400"> — {flagship.sector}</span>
        </p>
        <p className="mt-1 text-sm text-zinc-500">{flagship.tagline}</p>

        <ul className="mt-8 border-t border-zinc-200">
          {lenses.map((lens, index) => {
            const isActive = lens.id === activeId;

            return (
              <li key={lens.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveId(lens.id)}
                  onFocus={() => setActiveId(lens.id)}
                  onClick={() => setActiveId(lens.id)}
                  className="flex w-full items-baseline justify-between gap-6 border-b border-zinc-200 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className={`font-mono text-xs motion-safe:transition-colors ${
                        isActive ? "text-zinc-950" : "text-zinc-300"
                      }`}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      className={`text-2xl font-medium tracking-tight motion-safe:transition-colors ${
                        isActive ? "text-zinc-950" : "text-zinc-300"
                      }`}
                    >
                      {lens.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-950 motion-safe:transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 border border-zinc-200 bg-white p-3 sm:p-4 lg:mt-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
          {lenses.map((lens, index) => (
            <Image
              key={lens.id}
              src={lens.asset.src}
              alt={lens.asset.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              aria-hidden={lens.id !== activeId}
              className={`object-cover motion-safe:transition-opacity motion-safe:duration-500 ${
                lens.id === activeId ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="grid pt-6 sm:pt-7">
          {lenses.map((lens) => {
            const isActive = lens.id === activeId;

            return (
              <div
                key={lens.id}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 motion-safe:transition-opacity motion-safe:duration-300 ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  {lens.name} — {flagship.client}
                </p>
                <p className="mt-2 max-w-xl text-lg font-medium tracking-tight text-zinc-950 sm:text-xl">
                  {lens.proof}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
