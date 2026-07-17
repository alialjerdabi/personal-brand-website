/**
 * Act III — The Philosophy (assembly staging, 2026-07-17): the dark act
 * explains WHY connected systems win, staged the way Apple stages one
 * chip against four — one chassis, three machined modules, benefits
 * attributed to unity itself. Outcomes over deliverables throughout;
 * spec lines carry outcome nouns, never invented numbers (slots accept
 * real figures when they exist).
 */

export interface PhilosophyPillar {
  name: string;
  /** The business outcome, stated plainly. */
  outcome: string;
  support: string;
  /** Engraved spec lines: cause→effect, mono register. */
  specs: string[];
}

export interface PhilosophyContent {
  eyebrow: string;
  heading: string;
  intro: string;
  pillars: PhilosophyPillar[];
  loop: {
    formula: string;
    statement: string;
    closing: string;
  };
}

export const philosophyContent: PhilosophyContent = {
  eyebrow: "The philosophy",
  heading: "What connection looks like.",
  intro:
    "Most businesses buy branding, websites, and automation as separate services — from separate vendors, at separate times. Everything gets lost in the handovers. Built as one system, each discipline makes the next one stronger.",
  pillars: [
    {
      name: "Brand Strategy",
      outcome: "Decision makers arrive already convinced.",
      support:
        "Positioning, voice, and promise — decided once, owned everywhere. Every decision downstream inherits it, so nothing has to be re-argued: not the website's copy, not a campaign, not a proposal.",
      specs: [
        "Output · Trust before the first meeting",
        "Feeds · Its language — to the experience",
      ],
    },
    {
      name: "Digital Experience",
      outcome: "Visitors become qualified enquiries.",
      support:
        "The website and everything digital are built inside the strategy's language — one journey from first doubt to booked call. Because the experience inherits the brand, it doesn't spend its time introducing you. It qualifies, and it converts.",
      specs: [
        "Output · Qualified enquiries",
        "Feeds · Its voice and its data — to the systems",
      ],
    },
    {
      name: "Systems Engineering",
      outcome: "The promise survives scale.",
      support:
        "Enquiry handling, follow-ups, and operations run in the brand's own words — automatically, at any volume. The hours that used to disappear into admin return to growth, and everything the system learns is recorded, not lost.",
      specs: [
        "Output · Hours returned to growth",
        "Feeds · What it learns — back to the strategy",
      ],
    },
  ],
  loop: {
    formula: "Strategy → Experience → Systems → Strategy → …",
    statement:
      "What the systems learn feeds the strategy. That's the difference between buying three services and building one system:",
    closing: "It compounds.",
  },
};
