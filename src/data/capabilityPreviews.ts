/**
 * Isolated experiment data (2026-07-20, Ali's spec — see
 * components/sections/capabilities/CapabilitiesListInteractive.tsx):
 * curated preview frames for the homepage Capabilities list's hover
 * panel. Kept in its own file, separate from data/capabilities.ts, so
 * the whole experiment (this file + the two new components) can be
 * deleted without touching the section's real content model.
 *
 * All placeholder frames — no real per-capability assets exist yet.
 * Labeled "Petrolas" throughout rather than invented client names: it's
 * the site's one real case study and already stands for every
 * discipline conceptually (see the hero's "One Client, Three Lenses").
 * Swap in real frames (or a `{ kind: "video", src }` variant, if that's
 * ever added to CycleFrame) per capability whenever real assets exist.
 */

import type { CycleFrame } from "@/data/hero";

export interface CapabilityPreview {
  slug: string;
  label: string;
  frames: CycleFrame[];
}

function placeholderFrames(count: number): CycleFrame[] {
  return Array.from({ length: count }, (_, index) => ({
    kind: "placeholder" as const,
    label: `[ asset ${String(index + 1).padStart(2, "0")} ]`,
  }));
}

export const capabilityPreviews: CapabilityPreview[] = [
  { slug: "consulting", label: "Petrolas — Consulting", frames: placeholderFrames(3) },
  { slug: "rebranding", label: "Petrolas — (Re)Branding", frames: placeholderFrames(3) },
  {
    slug: "strategy-positioning",
    label: "Petrolas — Strategy & positioning",
    frames: placeholderFrames(3),
  },
  { slug: "web-app-design", label: "Petrolas — Web / App design", frames: placeholderFrames(3) },
  {
    slug: "ai-automated-systems",
    label: "Petrolas — AI automated systems",
    frames: placeholderFrames(3),
  },
  {
    slug: "marketing-production",
    label: "Petrolas — Marketing production",
    frames: placeholderFrames(3),
  },
  { slug: "graphic-design", label: "Petrolas — Graphic design", frames: placeholderFrames(3) },
];
