"use client";

import type { ReactNode } from "react";
import { useWorkGridProvider } from "@/components/sections/capabilities/WorkGridContext";

interface WorkGridProps {
  defaultSlug: string;
  children: ReactNode;
}

/**
 * Renders the work grid's own wrapping div — identical classes to what
 * CapabilitiesSection.tsx rendered directly before this existed — while
 * providing the shared "who's playing" context to the cards inside.
 * Composition is otherwise untouched: this file owns none of the grid
 * cells, spans, or Reveal wrappers, only the outer div and the context.
 */
export default function WorkGrid({ defaultSlug, children }: WorkGridProps) {
  const { rootRef, state, Provider } = useWorkGridProvider(defaultSlug);

  return (
    <Provider value={state}>
      <div ref={rootRef} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
        {children}
      </div>
    </Provider>
  );
}
