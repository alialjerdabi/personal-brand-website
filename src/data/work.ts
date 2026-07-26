/**
 * Case-study page content (/work/[slug]) — the first is Petrolas, the
 * site's one real project (2026-07-24). Written in the same honest,
 * outcome-oriented voice as the Services page chapters: it explains
 * what the engagement covered and why that discipline matters, without
 * asserting specific results, metrics, or quotes the business hasn't
 * supplied. Where real proof (numbers, testimonials) doesn't exist yet,
 * the page says so with a designed placeholder rather than inventing it
 * — same rule the homepage's work grid and Philosophy section already
 * follow for undelivered content.
 */

import type { HeroAsset } from "@/data/hero";
import type { CallToAction } from "@/data/homepage";

export interface CaseStudyMeta {
  label: string;
  value: string;
}

export interface CaseStudyContent {
  identity: string;
  backLabel: string;
  navCta: CallToAction;

  eyebrow: string;
  title: string;
  summary: string;
  meta: CaseStudyMeta[];
  heroImage: HeroAsset;

  challenge: {
    heading: string;
    body: string[];
  };

  strategy: {
    heading: string;
    body: string[];
    image: HeroAsset;
  };

  brandSystem: {
    heading: string;
    body: string[];
    scope: string[];
    image: HeroAsset;
    campaignImages: HeroAsset[];
  };

  digitalExperience: {
    heading: string;
    body: string[];
    scope: string[];
    image: HeroAsset;
  };

  connectedSystems: {
    heading: string;
    body: string[];
    wideImage: HeroAsset;
    fleetImage: HeroAsset;
  };

  outcomes: {
    heading: string;
    intro: string;
    placeholderLabel: string;
  };

  gallery: {
    heading: string;
    images: HeroAsset[];
  };

  closing: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: CallToAction;
  };
}

export const petrolasCaseStudy: CaseStudyContent = {
  identity: "Ali Aljardabi.",
  backLabel: "All work",
  navCta: { label: "Book a Call", href: "/#contact" },

  eyebrow: "Case study 01",
  title: "Petrolas",
  summary:
    "A traditional energy business repositioned as one connected clean-energy system — identity, digital platform, and operations designed together, not commissioned as three separate vendor projects.",
  meta: [
    { label: "Client", value: "Petrolas" },
    { label: "Disciplines", value: "Branding → Websites → AI" },
    { label: "Sector", value: "Energy & sustainability" },
  ],
  heroImage: {
    src: "/work/petrolas/booth.jpg",
    alt: "Petrolas exhibition booth staffed and busy with visitors, the full identity applied at trade-show scale",
  },

  challenge: {
    heading: "The business challenge",
    body: [
      "Petrolas was moving from a conventional energy business toward a clean-energy and sustainability position — but its brand, its digital presence, and its internal operations were still telling three different stories.",
      "That's the gap that costs trust in the rooms that matter: investors, partners, and prospective clients meeting an identity that didn't yet match where the business was actually headed.",
    ],
  },

  strategy: {
    heading: "Strategic direction",
    body: [
      "The starting point wasn't a logo — it was the argument: waste in, clean energy out, and every part of the business closing that same loop. Positioning, voice, and visual language were built around that one idea, so every future decision has a single reference point instead of a new debate each time.",
      "Everything downstream — the identity, the platform, the automation — exists to carry that one argument consistently, not to each make their own case.",
    ],
    image: {
      src: "/work/petrolas/loop-diagram.jpg",
      alt: "Petrolas diagram showing the closed loop from plastic waste through advanced refining to clean fuel",
    },
  },

  brandSystem: {
    heading: "Brand identity system",
    body: [
      "A full identity system: mark, color, type, and voice, built to hold up from a business card to a construction hoarding to a trade-show booth without losing coherence.",
      "Guidelines carried the system to every touchpoint the business actually uses — not a document that gets ignored the moment production starts.",
    ],
    scope: [
      "Brand mark & visual identity",
      "Color, type & voice system",
      "Guidelines for real-world application",
      "Campaign & environmental applications",
    ],
    image: {
      src: "/work/petrolas/brand-guidelines.jpg",
      alt: "Petrolas brand guidelines page detailing the primary, secondary, and accent color system",
    },
    campaignImages: [
      {
        src: "/work/petrolas/campaign-plastic.jpg",
        alt: "Petrolas campaign visual: \"Turning plastic into possibility\"",
      },
      {
        src: "/work/petrolas/campaign-waste-fuel.jpg",
        alt: "Petrolas campaign visual: \"Waste today. Fuel tomorrow.\"",
      },
    ],
  },

  digitalExperience: {
    heading: "Digital experience",
    body: [
      "A digital platform built around one journey — from first doubt to a qualified enquiry — carrying the same brand language into every screen instead of a template stretched to fit.",
      "Operations sit inside that same platform: a live view of the business, not a separate internal tool nobody opens.",
    ],
    scope: [
      "Journeys built to qualify enquiries",
      "One identity, carried into code",
      "Live operations dashboard",
    ],
    image: {
      src: "/work/petrolas/dashboard.jpg",
      alt: "Petrolas operations dashboard interface showing live production and feedstock data",
    },
  },

  connectedSystems: {
    heading: "Connected applications & systems",
    body: [
      "The identity had to survive outside a browser too — on a construction hoarding, on a fleet of vehicles, wherever the business physically shows up. The same connected-systems motif that runs through the brand appears again here, literally: one line, everything on it.",
      "Enquiry handling and follow-ups run automatically, in the brand's own voice, so the hours a manual process used to absorb come back to growth instead.",
    ],
    wideImage: {
      src: "/work/petrolas/hoarding-wide.jpg",
      alt: "Petrolas construction hoarding with a connected circuit-line graphic reading Smart systems, sustainable energy",
    },
    fleetImage: {
      src: "/work/petrolas/fleet-systems.jpg",
      alt: "Petrolas-branded tanker truck with a connected-systems circuit graphic along its tank",
    },
  },

  outcomes: {
    heading: "Key outcomes & value created",
    intro:
      "This engagement is still active. Real, verified numbers — enquiries qualified, hours returned, results measured — will replace this module once Petrolas can share them. Nothing here is invented in the meantime.",
    placeholderLabel: "[ outcomes — pending client data ]",
  },

  gallery: {
    heading: "From the project",
    images: [
      {
        src: "/hero/petrolas-digital.jpg",
        alt: "Phone on a stone plinth showing Petrolas digital brand content in the identity's visual language",
      },
      {
        src: "/work/petrolas/ev-charging.jpg",
        alt: "Petrolas-branded EV charging station with the tagline \"From waste to what moves us forward\"",
      },
      {
        src: "/work/petrolas/refinery.jpg",
        alt: "Petrolas industrial refining facility under the tagline \"Built for a cleaner future\"",
      },
    ],
  },

  closing: {
    eyebrow: "The next step",
    heading: "Considering something similar?",
    body: "A discovery call is a conversation about your business goals — not a sales pitch. We'll look at where a connected brand, digital presence, and automation system could create the most value for you.",
    cta: { label: "Book a Discovery Call", href: "/#contact" },
  },
};

/**
 * The /work archive page's own copy (2026-07-25) — distinct from any
 * one case study: an opening statement, then a closing invitation
 * scoped to "work together" generally rather than one project.
 */
export interface WorkArchiveContent {
  identity: string;
  backLabel: string;
  navCta: CallToAction;
  eyebrow: string;
  heading: string;
  intro: string;
  closing: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: CallToAction;
  };
}

export const workArchiveContent: WorkArchiveContent = {
  identity: "Ali Aljardabi.",
  backLabel: "Back to home",
  navCta: { label: "Book a Call", href: "/#contact" },
  eyebrow: "Selected work",
  heading: "Proof, not promises.",
  intro:
    "Every project here is one business, one connected system — brand, digital experience, and operations built together instead of commissioned apart. This is where that shows up.",
  closing: {
    eyebrow: "Let's work together",
    heading: "Have something in mind?",
    body: "A discovery call is a conversation about your business goals — not a sales pitch. We'll look at where a connected brand, digital presence, and automation system could create the most value for you.",
    cta: { label: "Book a Discovery Call", href: "/#contact" },
  },
};
