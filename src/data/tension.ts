/**
 * Act II — The Tension (see docs/landing-experience.md).
 *
 * The disconnection problem told as an escalating typographic passage.
 * Each fragment carries a horizontal offset used by the alignment
 * sequence: fragments start visually misaligned — the way a
 * disconnected business feels — and converge into one column as the
 * visitor scrolls. Offsets are data so the choreography can be tuned
 * without touching the component.
 */

export interface TensionFragment {
  text: string;
  /** Scattered-state horizontal offset in rem. Positive = right. */
  offsetRem: number;
}

export interface TensionContent {
  eyebrow: string;
  lead: string;
  fragments: TensionFragment[];
  /** The act's climax, one line per array entry — line breaks are deliberate. */
  turnLines: string[];
  bridge: string;
}

export const tensionContent: TensionContent = {
  eyebrow: "The problem",
  lead: "Effort is rarely the problem.",
  fragments: [
    { text: "The brand says one thing.", offsetRem: -7 },
    { text: "The website says another.", offsetRem: 9 },
    { text: "Marketing pulls in its own direction.", offsetRem: -4.5 },
    { text: "Operations quietly absorb the rest.", offsetRem: 6.5 },
  ],
  turnLines: ["Everything works.", "Nothing works together."],
  bridge: "The fix isn't more effort. It's connection.",
};
