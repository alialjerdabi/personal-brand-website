"use client";

import { createActiveCardGroupContext, useActiveCard, useActiveCardGroupProvider } from "@/lib/useActiveCardGroup";

const WorkGridContext = createActiveCardGroupContext();

/**
 * Shared "which one card is playing" state for the homepage's work grid
 * (2026-07-25) — a plain context, not a full component, so it can wrap
 * the EXACT existing grid markup in CapabilitiesSection.tsx without
 * changing its structure or classes (see WorkGrid.tsx, the thin
 * provider that actually renders the grid's own wrapping div).
 *
 * Rules encoded here, not in the cards themselves: exactly one project
 * plays at a time; `defaultSlug` (Petrolas) plays whenever nothing else
 * is hovered/focused and the grid is in the viewport; hovering or
 * focusing a different card takes over immediately and reverts the
 * instant that ends; leaving the viewport entirely (scrolled away)
 * pauses everything, including the default, until it's back in view.
 *
 * The state machine itself now lives in lib/useActiveCardGroup.ts
 * (generalized 2026-07-26 so the Hero's service cards can follow the
 * same rules — see hero/HeroCardGroupContext.tsx); this file only binds
 * it to this grid's own Context instance, unchanged behavior.
 */
export function useWorkGridProvider(defaultSlug: string) {
  return useActiveCardGroupProvider<HTMLDivElement>(WorkGridContext, defaultSlug);
}

export function useWorkGridCard(slug: string) {
  return useActiveCard(WorkGridContext, slug);
}
