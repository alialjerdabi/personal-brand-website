/**
 * Act IV — The Method + The Partner (see docs/landing-experience.md).
 *
 * After the single-client demonstration, the skeptic's objection is
 * "impressive — but that's one client." This act answers it: the result
 * came from a repeatable method, and here is the person who runs it.
 */

import type { CycleFrame } from "@/data/hero";

export interface MethodStep {
  title: string;
  line: string;
}

export interface PartnerContent {
  eyebrow: string;
  heading: string;
  statement: string;
  /** The act's last word — appears exactly once on the site. */
  closing: string;
  /** Portrait slot — single placeholder frame until the photo arrives. */
  portrait: CycleFrame[];
  location: string;
  timeZone: string;
  availability: string;
}

export interface MethodContent {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: MethodStep[];
  partner: PartnerContent;
}

export const methodContent: MethodContent = {
  eyebrow: "The method",
  heading: "Repeatable, on purpose.",
  intro:
    "The Petrolas result isn't luck. Every engagement runs the same way: start from the business goal, work backwards to the systems that serve it.",
  steps: [
    {
      title: "Discover",
      line: "Understand the business, the customers, and where growth is blocked.",
    },
    {
      title: "Define",
      line: "Align brand, digital presence, and operations around one goal.",
    },
    {
      title: "Design & build",
      line: "Craft the brand, website, and automation that execute the strategy.",
    },
    {
      title: "Launch & improve",
      line: "Measure enquiries, conversions, and hours saved — then refine.",
    },
  ],
  partner: {
    eyebrow: "The partner",
    heading: "You'd work with me. Directly.",
    statement:
      "No account managers, no handovers between departments. One person who owns the brand, the website, and the systems end to end — which is exactly why they end up pointing the same way.",
    closing: "One person. One system. One direction.",
    portrait: [{ kind: "placeholder", label: "[ portrait ]" }],
    location: "Manama, Bahrain",
    timeZone: "Asia/Bahrain",
    availability: "Booking Q3 engagements",
  },
};
