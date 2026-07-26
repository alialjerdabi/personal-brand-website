"use client";

import { createActiveCardGroupContext, useActiveCard, useActiveCardGroupProvider } from "@/lib/useActiveCardGroup";

const HeroCardGroupContext = createActiveCardGroupContext();

/**
 * Shared "which one card is playing" state for the Hero's three service
 * cards (2026-07-26; see hero-spec restoration in
 * docs/design-language-notes.md) — the same rules as the homepage/work
 * grid (WorkGridContext.tsx), reused via lib/useActiveCardGroup.ts:
 * Branding plays by default; hovering or keyboard-focusing Websites or
 * AI Automation takes over immediately (pausing Branding completely,
 * not just visually collapsing it) and reverts the instant that ends.
 * Also pauses while the browser tab is hidden — enabled here (and only
 * here) since the Hero is the first thing a visitor sees, unlike the
 * work grid further down the page.
 */
export function useHeroCardGroupProvider(defaultId: string) {
  return useActiveCardGroupProvider<HTMLUListElement>(HeroCardGroupContext, defaultId, {
    pauseOnTabHidden: true,
  });
}

export function useHeroCard(id: string) {
  return useActiveCard(HeroCardGroupContext, id);
}
