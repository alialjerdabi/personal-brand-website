/**
 * Hero section content.
 *
 * The hero demonstrates the "connected systems" philosophy through one
 * flagship client viewed through three lenses — branding, websites, and
 * AI automation (see docs/hero-spec.md and the approved creative
 * direction: One Client, Three Lenses). Content lives here, separated
 * from components, so lenses, clients, and copy can evolve — or be
 * CMS-sourced — without touching the UI.
 */

import type { CallToAction } from "@/data/homepage";

export interface HeroAsset {
  src: string;
  alt: string;
}

export interface HeroLens {
  id: string;
  name: string;
  /** One line of evidence: what this lens proves about the flagship work. */
  proof: string;
  asset: HeroAsset;
}

export interface HeroFlagship {
  client: string;
  sector: string;
  /** The storytelling bridge above the demonstration. */
  tagline: string;
}

export interface HeroStatus {
  location: string;
  /** IANA time zone used for the live studio clock. */
  timeZone: string;
  availability: string;
}

export interface HeroContent {
  identity: string;
  disciplines: string;
  contactCta: CallToAction;
  headline: string;
  positioning: string;
  cta: CallToAction;
  workLabel: string;
  flagship: HeroFlagship;
  lenses: HeroLens[];
  status: HeroStatus;
}

export const heroContent: HeroContent = {
  identity: "Ali Aljardabi",
  disciplines: "Branding · Websites · AI Automation",
  contactCta: { label: "Let's talk", href: "#contact" },
  headline: "Growth is a system.",
  positioning:
    "I partner with corporate businesses, technology companies, and luxury brands to connect branding, digital presence, and AI systems into one strategy for measurable growth.",
  cta: { label: "Book a Discovery Call", href: "#contact" },
  workLabel: "Selected Work",
  flagship: {
    client: "Petrolas",
    sector: "Clean energy",
    tagline: "One client. Three connected systems.",
  },
  lenses: [
    {
      id: "branding",
      name: "Branding",
      proof:
        "A complete identity system — one mark, one voice, and every touchpoint saying the same thing.",
      asset: {
        src: "/hero/petrolas-branding.jpg",
        alt: "Petrolas-branded blue safety helmet held in a gloved hand against a dark background",
      },
    },
    {
      id: "websites",
      name: "Websites",
      proof:
        "The same system carried into digital — web, social, and campaigns speaking one language.",
      asset: {
        src: "/hero/petrolas-digital.jpg",
        alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
      },
    },
    {
      id: "ai-automation",
      name: "AI Automation",
      proof:
        "Smart systems in the brand's own words — operations designed to work toward the same goal.",
      asset: {
        src: "/hero/petrolas-systems.jpg",
        alt: "Petrolas construction hoarding with connected circuit-line graphics reading Smart systems, sustainable energy",
      },
    },
  ],
  status: {
    location: "Manama, Bahrain",
    timeZone: "Asia/Bahrain",
    availability: "Booking Q3 engagements",
  },
};
