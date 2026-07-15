/**
 * Capabilities block — sits between Act II (the tension) and Act III
 * (the demonstration): the service list (each linking to its section
 * of the services page), the partner strip, and a selected-work
 * preview (layout/animation foundation adapted from the approved
 * symbolstudio.pl reference, 2026-07-15).
 */

import type { HeroAsset } from "@/data/hero";

export interface CapabilityLink {
  name: string;
  /** Anchor on the /services page. */
  slug: string;
}

export interface ShowcaseProject {
  title: string;
  tag: string;
  /** Placeholder cards keep the pan animation but carry no assets yet. */
  placeholder: boolean;
  /** Taller media box on large screens, for the asymmetric grid. */
  tall: boolean;
  cover?: HeroAsset;
  reveal?: HeroAsset;
  href?: string;
}

export interface OpenSlotCard {
  label: string;
  title: string;
  href: string;
}

export interface CapabilitiesContent {
  eyebrow: string;
  heading: string;
  description: string;
  capabilities: CapabilityLink[];
  partnersLabel: string;
  /** PLACEHOLDER names — replace with real collaborations before launch. */
  partners: string[];
  projectsLabel: string;
  projects: ShowcaseProject[];
  openSlot: OpenSlotCard;
}

export const capabilitiesContent: CapabilitiesContent = {
  eyebrow: "Capabilities",
  heading: "One practice. Seven disciplines.",
  description:
    "Everything a growth system needs — from strategy to automation — designed and built in one place, so nothing is lost between vendors.",
  capabilities: [
    { name: "Consulting", slug: "consulting" },
    { name: "(Re)Branding", slug: "rebranding" },
    { name: "Strategy & positioning", slug: "strategy-positioning" },
    { name: "Web / App design", slug: "web-app-design" },
    { name: "AI automated systems", slug: "ai-automated-systems" },
    { name: "Marketing production", slug: "marketing-production" },
    { name: "Graphic design", slug: "graphic-design" },
  ],
  partnersLabel: "Selected collaborations",
  partners: ["Petrolas", "Northwind", "Meridian", "Atlas & Co", "Vela Energy", "Orbit Labs"],
  projectsLabel: "From the work",
  projects: [
    {
      title: "Petrolas",
      tag: "Branding → Websites → AI",
      placeholder: false,
      tall: false,
      cover: {
        src: "/hero/petrolas-branding.jpg",
        alt: "Petrolas-branded blue safety helmet held in a gloved hand against a dark background",
      },
      reveal: {
        src: "/hero/petrolas-digital.jpg",
        alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
      },
      href: "#work",
    },
    {
      title: "Case study 02",
      tag: "In production",
      placeholder: true,
      tall: true,
    },
    {
      title: "Case study 03",
      tag: "In production",
      placeholder: true,
      tall: false,
    },
  ],
  openSlot: {
    label: "Open slot · Q3",
    title: "The next case study could be yours.",
    href: "#contact",
  },
};
