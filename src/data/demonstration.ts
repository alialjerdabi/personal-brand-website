/**
 * Act III — The Demonstration (see docs/landing-experience.md).
 *
 * The hero's One Client → Three Lenses mechanic paid off in full:
 * the Petrolas story told as three sequential lens chapters, each
 * ending with a handoff into the next — a chain, not a list.
 */

import type { HeroAsset } from "@/data/hero";

export interface DemonstrationChapter {
  id: string;
  name: string;
  /** The business outcome, stated plainly. */
  outcome: string;
  /** One supporting sentence — what the work was, in the client's world. */
  detail: string;
  /** The chain link: how this lens feeds the next (empty for the last). */
  handoff: string;
  plate: HeroAsset;
}

export interface DemonstrationContent {
  eyebrow: string;
  heading: string;
  intro: string;
  client: string;
  sector: string;
  chapters: DemonstrationChapter[];
  closing: string;
}

export const demonstrationContent: DemonstrationContent = {
  eyebrow: "One client · Three lenses",
  heading: "What connection looks like.",
  intro:
    "Petrolas, a clean-energy company, needed more than a rebrand, a website, or automation. It needed all three pointing the same way.",
  client: "Petrolas",
  sector: "Clean energy",
  chapters: [
    {
      id: "branding",
      name: "Branding",
      outcome: "Trust before the first meeting.",
      detail:
        "Positioning, identity, and voice built as one system — every touchpoint a decision maker sees saying the same thing about the same company.",
      handoff: "The identity became the language the website speaks.",
      plate: {
        src: "/hero/petrolas-branding.jpg",
        alt: "Petrolas-branded blue safety helmet held in a gloved hand against a dark background",
      },
    },
    {
      id: "websites",
      name: "Websites",
      outcome: "A site that qualifies, not just impresses.",
      detail:
        "The same identity carried into digital — one journey from first visit to booked call, designed to earn belief before it asks for anything.",
      handoff: "The website became the voice the automation writes in.",
      plate: {
        src: "/hero/petrolas-digital.jpg",
        alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
      },
    },
    {
      id: "ai-automation",
      name: "AI Automation",
      outcome: "Hours returned to growth.",
      detail:
        "Enquiry handling, follow-ups, and operations running in the brand's own words — automatically, and always toward the same goal.",
      handoff: "",
      plate: {
        src: "/hero/petrolas-systems.jpg",
        alt: "Petrolas construction hoarding with connected circuit-line graphics reading Smart systems, sustainable energy",
      },
    },
  ],
  closing: "Three lenses. One system. A business where everything points the same way.",
};
