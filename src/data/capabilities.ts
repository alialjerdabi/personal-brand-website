/**
 * Capabilities block — sits between Act II (the tension) and Act III
 * (the demonstration): the service list (each linking to its section
 * of the services page), the partner strip, and a selected-work
 * preview (layout/animation foundation adapted from the approved
 * symbolstudio.pl reference, 2026-07-15).
 */

export interface CapabilityLink {
  name: string;
  /** Anchor on the /services page. */
  slug: string;
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
  openSlot: {
    label: "Open slot · Q3",
    title: "The next case study could be yours.",
    href: "#contact",
  },
};
