/**
 * Site footer content (Act V close — see docs/landing-experience.md).
 * The footer ends the page the way it began: with the thesis and the
 * signature. Content lives here, separated from components, per the
 * project's data philosophy.
 */

import type { CallToAction } from "@/data/homepage";

export interface FooterContent {
  statement: string;
  emailLabel: string;
  email: string;
  links: CallToAction[];
  /** Full-bleed signature that closes the page. */
  wordmark: string;
  location: string;
  /** The thesis, restated as the page's last line. */
  thesis: string;
}

export const footerContent: FooterContent = {
  statement:
    "An independent practice connecting branding, websites, and AI automation into one system — built in Bahrain, working with businesses anywhere.",
  emailLabel: "Start the conversation",
  email: "alialjardabi@gmail.com",
  links: [
    { label: "The story", href: "/#problem" },
    { label: "Services", href: "/services" },
    { label: "The work", href: "/#work" },
    { label: "Contact", href: "/#contact" },
  ],
  wordmark: "Ali Aljardabi",
  location: "Manama, Bahrain",
  thesis: "Growth is a system.",
};
