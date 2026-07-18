/**
 * Act III — The Philosophy (blueprint-stack staging, 2026-07-18): four
 * editorial sheets dealt onto the dark ground one by one — Strategy,
 * Experience, Systems, and the Growth System payoff — each overlapping
 * the last until they form one layered stack. Placeholder zones hold
 * space for Ali's future metric animations. Outcome language only;
 * never invented numbers.
 */

export interface GrowthCard {
  /** Mono header, e.g. "Stage 01 · Brand Strategy". */
  stage: string;
  /** The giant title at the sheet's base. */
  title: string;
  statement: string;
  support: string;
  /** Connection line — the arrow renders in cobalt (blue = connection). */
  connection?: string;
  /** Payoff card only: the full loop formula (arrows render cobalt). */
  formula?: string;
  /** Payoff card only: the act's last words. */
  closing?: string;
  placeholderLabel: string;
}

export interface PhilosophyContent {
  eyebrow: string;
  heading: string;
  intro: string;
  cards: GrowthCard[];
}

export const philosophyContent: PhilosophyContent = {
  eyebrow: "The philosophy",
  heading: "What connection looks like.",
  intro:
    "Most businesses buy branding, websites, and automation as separate services — from separate vendors, at separate times. Everything gets lost in the handovers. Built as one system, each discipline makes the next one stronger.",
  cards: [
    {
      stage: "Stage 01 · Brand Strategy",
      title: "Strategy",
      statement: "Decision makers arrive already convinced.",
      support:
        "Positioning, voice, and promise — decided once, owned everywhere. Nothing downstream has to be re-argued.",
      connection: "Feeds Stage 02 · the language",
      placeholderLabel: "[ metric module ]",
    },
    {
      stage: "Stage 02 · Digital Experience",
      title: "Experience",
      statement: "Visitors become qualified enquiries.",
      support:
        "One journey from first doubt to booked call — built inside the strategy's language, so it sells instead of introducing.",
      connection: "Feeds Stage 03 · the voice and the data",
      placeholderLabel: "[ metric module ]",
    },
    {
      stage: "Stage 03 · Systems Engineering",
      title: "Systems",
      statement: "The promise survives scale.",
      support:
        "Operations run in the brand's own words — automatically, at any volume. Hours return to growth.",
      connection: "Feeds Stage 01 · everything it learns",
      placeholderLabel: "[ metric module ]",
    },
    {
      stage: "Stage 04 · One growth system",
      title: "Growth System",
      statement:
        "What the systems learn feeds the strategy. Three services would stop there — one system doesn't:",
      support: "",
      formula: "Strategy → Experience → Systems → Strategy → …",
      closing: "It compounds.",
      placeholderLabel: "[ compound metrics — coming soon ]",
    },
  ],
};
