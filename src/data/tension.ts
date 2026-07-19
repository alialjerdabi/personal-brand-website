/**
 * Act II — The Tension (see docs/landing-experience.md).
 *
 * The disconnection problem told as a paced reveal: once the section is
 * comfortably in view, the fragments land one at a time and the prior
 * thought fades back, so attention follows the newest line. The turn
 * lands last as the section's takeaway.
 */

export interface TensionContent {
  eyebrow: string;
  lead: string;
  /** Revealed one at a time, in order. */
  fragments: string[];
  /** The takeaway climax, one line per array entry — line breaks are deliberate. */
  turnLines: string[];
  bridge: string;
}

export const tensionContent: TensionContent = {
  eyebrow: "The problem",
  lead: "Effort is rarely the problem.",
  fragments: [
    "The brand says one thing.",
    "The website says another.",
    "Marketing pulls in its own direction.",
    "Operations quietly absorb the rest.",
  ],
  turnLines: ["Everything works.", "Nothing works together."],
  bridge: "The fix isn't more effort. It's connection.",
};
