/**
 * The canonical project registry (2026-07-25) — one source of truth for
 * the homepage's "From the work" teaser, the /work archive, the
 * reusable ProjectIndexNav, and case-study prev/next navigation.
 * Previously this lived only as `ShowcaseProject` inside
 * data/capabilities.ts; consolidated here since the same project now
 * needs to be addressable by slug from several independent surfaces.
 */

import type { HeroAsset } from "@/data/hero";

export interface ProjectThumbnail {
  /** Which discipline this asset demonstrates — drives the /work page's grouped thumbnail strip. */
  discipline: string;
  image: HeroAsset;
}

export interface Project {
  slug: string;
  name: string;
  /** Real disciplines this project actually demonstrates — never padded to look broader than the work shown. */
  disciplines: string[];
  industry: string;
  /** A year for finished work, or an honest status string ("In production") for what isn't real yet. */
  status: string;
  /** Undefined until a case-study page exists for this project. */
  route?: string;
  tag: string;
  placeholder: boolean;
  /** Taller media box on large screens, for the homepage's asymmetric grid. */
  tall: boolean;
  /** Card hover/auto-cycle sequence — first slide is the resting image. Empty for placeholders. */
  slides: HeroAsset[];
  /** Discipline-tagged proof strip for the /work page. Empty for placeholders. */
  thumbnails: ProjectThumbnail[];
}

export const projects: Project[] = [
  {
    slug: "petrolas",
    name: "Petrolas",
    disciplines: ["Branding", "Websites", "AI Automation"],
    industry: "Energy & sustainability",
    status: "2026",
    route: "/work/petrolas",
    tag: "Branding → Websites → AI",
    placeholder: false,
    tall: false,
    slides: [
      {
        src: "/hero/petrolas-branding.jpg",
        alt: "Petrolas-branded blue safety helmet held in a gloved hand against a dark background",
      },
      {
        src: "/work/petrolas/booth.jpg",
        alt: "Petrolas exhibition booth staffed and busy with visitors, the full identity applied at trade-show scale",
      },
      {
        src: "/work/petrolas/dashboard.jpg",
        alt: "Petrolas operations dashboard interface showing live production and feedstock data",
      },
      {
        src: "/work/petrolas/fleet-systems.jpg",
        alt: "Petrolas-branded tanker truck with a connected-systems circuit graphic along its tank",
      },
    ],
    thumbnails: [
      {
        discipline: "Brand identity",
        image: {
          src: "/work/petrolas/brand-guidelines.jpg",
          alt: "Petrolas brand guidelines page detailing the primary, secondary, and accent color system",
        },
      },
      {
        discipline: "Campaign",
        image: {
          src: "/work/petrolas/campaign-plastic.jpg",
          alt: "Petrolas campaign visual: \"Turning plastic into possibility\"",
        },
      },
      {
        discipline: "Campaign",
        image: {
          src: "/work/petrolas/campaign-waste-fuel.jpg",
          alt: "Petrolas campaign visual: \"Waste today. Fuel tomorrow.\"",
        },
      },
      {
        discipline: "Digital experience",
        image: {
          src: "/hero/petrolas-digital.jpg",
          alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
        },
      },
      {
        discipline: "AI systems",
        image: {
          src: "/work/petrolas/dashboard.jpg",
          alt: "Petrolas operations dashboard interface showing live production and feedstock data",
        },
      },
      {
        discipline: "Environmental",
        image: {
          src: "/work/petrolas/hoarding-wide.jpg",
          alt: "Petrolas construction hoarding with a connected circuit-line graphic reading Smart systems, sustainable energy",
        },
      },
      {
        discipline: "Environmental",
        image: {
          src: "/work/petrolas/booth.jpg",
          alt: "Petrolas exhibition booth staffed and busy with visitors, the full identity applied at trade-show scale",
        },
      },
      {
        discipline: "Production",
        image: {
          src: "/work/petrolas/ev-charging.jpg",
          alt: "Petrolas-branded EV charging station with the tagline \"From waste to what moves us forward\"",
        },
      },
    ],
  },
  {
    slug: "case-study-02",
    name: "Case study 02",
    disciplines: [],
    industry: "—",
    status: "In production",
    tag: "In production",
    placeholder: true,
    tall: true,
    slides: [],
    thumbnails: [],
  },
  {
    slug: "case-study-03",
    name: "Case study 03",
    disciplines: [],
    industry: "—",
    status: "In production",
    tag: "In production",
    placeholder: true,
    tall: false,
    slides: [],
    thumbnails: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
