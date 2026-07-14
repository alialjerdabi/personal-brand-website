/**
 * Homepage content shared across acts.
 *
 * Act-specific content lives in dedicated files (hero.ts, tension.ts,
 * demonstration.ts). This file keeps cross-act primitives and the
 * closing invitation, separated from components so content can later
 * be CMS-sourced (see docs/engineering-standards.md).
 */

export interface CallToAction {
  label: string;
  href: string;
}

export interface FinalCtaContent {
  eyebrow: string;
  heading: string;
  description: string;
  cta: CallToAction;
}

export const finalCta: FinalCtaContent = {
  eyebrow: "The next step",
  heading: "Let's align your brand, website, and systems around growth.",
  description:
    "A discovery call is a conversation about your business goals — not a sales pitch. We'll identify where connected systems can create the most impact.",
  cta: { label: "Book a Discovery Call", href: "#contact" },
};
