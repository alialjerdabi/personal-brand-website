# Implementation Roadmap

Status: Approved build order — experience-first, foundation extracted afterward.

This roadmap implements the approved landing experience (docs/landing-experience.md). The build order is deliberate: the experience is designed first, in the browser, as one continuous exercise; the design system is extracted from what proved convincing, not dictated in advance. The design system describes the product we built — it does not predict it.

---

## Phase 1 — The Experience (Acts I–III as one continuous design exercise)

Hero evolution (Act I), the Tension act with the alignment signature moment (Act II), and the Demonstration chapter (Act III) are built as a single design exercise, not three tasks. Decisions made in one act are immediately tested against the others.

**One decision is made at the start, not discovered:** the typeface pairing. Typography is this site's primary visual language; every spacing, scale, and composition judgment in Acts I–III calibrates against the face it's set in. Changing type after three acts would invalidate the very decisions we're trying to discover. The pairing is presented for sign-off as the first move of Phase 1, then the discovery happens inside it.

**The Emerging Language Ledger.** Throughout Phase 1, every recurring decision is recorded the moment it recurs — in docs/design-language-notes.md — across five categories:

- spacing rules (rhythms, section intervals, measure widths)
- typography rules (scale steps, weights, tracking, hierarchy tiers)
- motion rules (durations, easings, stagger, what animates and what never does)
- color relationships (ink/surface pairs per ground, emphasis levels)
- interaction patterns (hover/focus/touch parity, affordance language)

The ledger is curation-during-build, not documentation-after: when a value appears a second time, it is either consciously reused or consciously varied — never accidentally different. This is how experience-first avoids drifting into three acts that don't belong to one page.

**Standing guardrails (constraints, not tokens).** The rules adopted from the project skills apply from the first line of code: motion 150–300ms micro / ≤400ms transitions, exits ~60–70% of enters, transform/opacity only, zero CLS, reduced-motion parity, contrast ≥4.5:1 per ground, full keyboard/touch parity. Also folded into Phase 1 as hygiene, not foundation: skip link, scroll-margin conventions, removal of the accidental prefers-color-scheme flip.

**Exit gate:** Acts I–III are visually and interactively convincing in the browser — verified at 375px and desktop, reduced-motion checked, keyboard-walked — and approved.

## Phase 2 — The Extraction (foundation from evidence)

The ledger is codified into the design foundation: semantic tokens (two-ground color pairs, type scale, spacing rhythm, motion vocabulary) in globals.css plus a short foundation doc. Then Acts I–III are refactored onto the tokens.

**The refactor is the test:** it must be pixel-identical. If moving an act onto the system changes how it looks, either the system mis-describes the product or the act was inconsistent — both are findings to resolve before proceeding. The foundation ships only when the built experience and the described system are the same thing.

## Phase 3 — The Consumers (Acts IV–V on the extracted system)

The Method + Partner act and the Invitation + footer are built entirely from the extracted foundation — no new primitive values. They are the system's first real consumers and its proof: if Acts IV–V can be composed quickly and feel native to the page, the extraction was truthful. The persistent conversion bar lands here (it spans the whole page, so it's built when the whole page exists).

## Phase 4 — Hardening & Launch Readiness

- Full accessibility pass (the per-act gates make this a confirmation, not a discovery).
- Performance pass: image formats/sizing, above-fold priority, bundle check.
- hero-spec.md updated to record the canonical One Client → Three Lenses direction; landing-experience.md marked as implemented.
- Final art-director review of the whole scroll as one experience.

---

## Why experience-first is the stronger order for this project

1. **The value of this page lives in discovered behavior.** Its two defining moments — the lens mechanic and the alignment sequence — can only be judged in the browser, in motion, at real sizes. A token system written before those moments exist would either constrain the discovery to what was predicted, or be rewritten to match what was found. Predicting is waste; extracting is evidence.
2. **A design system's job doesn't exist here yet.** Token systems earn their cost by coordinating many builders across many surfaces. This is one page, one author, one continuous exercise — the coordination problem arrives with case-study pages and CMS content (the roadmap's future), which is exactly when the system, extracted from an approved real product, will be waiting with truthful answers.
3. **It obeys the project's own constitution.** CLAUDE.md forbids premature optimization; a speculative foundation is premature optimization applied to design. And "the design system describes the product we built" is the strongest form of documentation-wins: the docs end up unable to disagree with the product.
4. **The discipline is preserved, just relocated.** What foundation-first actually protects against is drift — and the ledger plus the standing guardrails provide that protection during the build, while the Phase 2 pixel-identical refactor proves no drift survived. We keep the rigor and lose only the speculation.
