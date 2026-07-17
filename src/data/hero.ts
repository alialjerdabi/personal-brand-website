/**
 * Hero section content.
 *
 * The hero opens the One Client → Three Lenses story with three service
 * cards — Branding, Websites, AI Automation — each carrying a short list
 * of work proof (approved hero redesign, 2026-07-14). Content lives
 * here, separated from components, so services, proof lists, and copy
 * can evolve — or be CMS-sourced — without touching the UI.
 */

import type { CallToAction } from "@/data/homepage";

export interface HeroAsset {
  src: string;
  alt: string;
}

/**
 * One frame of a cycling media slot: a real image, or a typographic
 * placeholder holding the animation ready until assets arrive.
 */
export type CycleFrame =
  | { kind: "image"; src: string; alt: string }
  | { kind: "placeholder"; label: string };

export interface HeroService {
  id: string;
  name: string;
  /** Short work-proof lines revealed inside the card. */
  proofs: string[];
  /** Cycling media frames; a single frame means no cycling yet. */
  media: CycleFrame[];
  href: string;
}

export interface HeroStatus {
  location: string;
  /** IANA time zone used for the live studio clock. */
  timeZone: string;
  availability: string;
}

export interface HeroIntro {
  /** Statement halves; the cycling image chip sits between them. */
  pre: string;
  post: string;
  chips: CycleFrame[];
}

export interface HeroContent {
  intro: HeroIntro;
  identity: string;
  navLinks: CallToAction[];
  navCta: CallToAction;
  headline: string;
  positioning: string;
  cta: CallToAction;
  services: HeroService[];
  status: HeroStatus;
}

export const heroContent: HeroContent = {
  intro: {
    pre: "Growth",
    post: "is a system.",
    chips: [
      { kind: "image", src: "/hero/petrolas-branding.jpg", alt: "" },
      { kind: "image", src: "/hero/petrolas-digital.jpg", alt: "" },
      { kind: "image", src: "/hero/petrolas-systems.jpg", alt: "" },
    ],
  },
  identity: "Ali Aljardabi.",
  navLinks: [
    { label: "The story", href: "#problem" },
    { label: "Services", href: "/services" },
    { label: "The work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  navCta: { label: "Book a Call", href: "#contact" },
  headline: "Growth is a system.",
  positioning:
    "I partner with corporate businesses, technology companies, and luxury brands to connect branding, digital presence, and AI systems into one strategy for measurable growth.",
  cta: { label: "Book a Discovery Call", href: "#contact" },
  services: [
    {
      id: "branding",
      name: "Branding",
      proofs: [
        "Petrolas — full identity system",
        "Positioning, voice & messaging",
        "Guidelines carried to every touchpoint",
      ],
      media: [
        {
          kind: "image",
          src: "/hero/petrolas-branding.jpg",
          alt: "Petrolas-branded blue safety helmet held in a gloved hand against a dark background",
        },
        { kind: "placeholder", label: "[ asset 02 ]" },
        { kind: "placeholder", label: "[ asset 03 ]" },
      ],
      href: "#work",
    },
    {
      id: "websites",
      name: "Websites",
      proofs: [
        "Petrolas — digital platform",
        "Journeys built to qualify enquiries",
        "One identity, carried into code",
      ],
      media: [
        {
          kind: "image",
          src: "/hero/petrolas-digital.jpg",
          alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
        },
      ],
      href: "#work",
    },
    {
      id: "ai-automation",
      name: "AI Automation",
      proofs: [
        "Petrolas — operations automation",
        "Enquiry handling & follow-ups",
        "Hours returned to growth",
      ],
      media: [
        {
          kind: "image",
          src: "/hero/petrolas-systems.jpg",
          alt: "Petrolas construction hoarding with connected circuit-line graphics reading Smart systems, sustainable energy",
        },
      ],
      href: "#work",
    },
  ],
  status: {
    location: "Manama, Bahrain",
    timeZone: "Asia/Bahrain",
    availability: "Booking Q3 engagements",
  },
};
