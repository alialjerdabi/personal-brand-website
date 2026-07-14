# Emerging Language Ledger

Working notes during Phase 1 (see docs/roadmap.md). Every value recorded here has recurred at least twice; when it recurs again it is consciously reused or consciously varied. This file becomes the raw material for the Phase 2 extraction — it is not yet a design system.

## Typography

- Voice: Schibsted Grotesk (variable) for all reading text and display. System register: Geist Mono for meta/data only (eyebrows, numbering, status line, client tags). Rule: *if a machine could have written it, it's mono; if Ali is saying it, it's Schibsted.*
- Display tiers observed: hero h1 `text-6xl/8xl/9xl`, tracking −0.04em · act headlines (turn, Act III heading) `text-4xl → 6xl`, tracking −0.03em · chapter outcomes `text-3xl/4xl`, tracking −0.02em. Tracking tightens as scale grows.
- Eyebrow pattern (recurring 3×): mono, 11px, uppercase, tracking 0.3em, muted ink.
- Statements use `font-semibold` (600); mid-level content `font-medium` (500); body 400. No other weights.
- Reading measures: body `max-w-md/xl`, statements `max-w-3xl/4xl`.

## Spacing

- Act padding: `py-28 sm:py-40` (Acts II–III). Hero is tighter at top by design (chrome + immediate headline).
- Intra-act rhythm: eyebrow → heading `mt-6`, heading → paragraph `mt-8`, block → block `mt-16/20/24`, chapter gap `my-16 lg:my-20` (handoff), major transitions `mt-24 sm:mt-32`.
- Plate framing (recurring 2×): bordered frame with `p-3 sm:p-4` around a 4/3 media well — hero preview card and Act III plates share it. Light ground: `border-zinc-200 bg-white`; dark ground: `border-white/10 bg-white/[0.02]`.

## Motion

- Micro (hover/active states): `transition-colors/opacity`, default duration.
- Content cross-fade (lens preview): 300ms.
- Entrance reveals: 400ms ease-out, fade + 1.5rem rise, only for below-fold elements; server default is always visible.
- The signature: Act II convergence, scroll-driven, transform/opacity only, easeOutCubic, progress window 88%→42% of viewport. Only choreographed sequence on the page. (A poster-scale "story" variant — each line entering huge, then shrinking into the column — was built and REVERTED on Ali's direction 2026-07-14: it read as AI-made. Lesson: scale theatrics exceed this brand's quiet-confidence ceiling; the scatter/settle column is the approved register.)
- Hero entrance: one staggered rise on first paint (`entrance-1..5`, 400ms, 80ms steps, cubic-bezier(0.2,0.7,0.2,1)), CSS-only, establishes reading order through timing. Used once per page — the load moment belongs to the hero the way the scroll moment belongs to Act II.
- All motion `motion-safe` gated. Nothing loops, nothing autoplays.

## Hero card + navbar pattern (2026-07-14 redesign)

- Navbar: identity wordmark left ("Ali Aljardabi." — trailing period as logo device), center text links (14px, muted → ink on hover, hidden below md), dark pill CTA right (CTAButton size="sm"). No border — whitespace separates.
- Service cards: three portrait cards (rounded-2xl — first radius in the system; interactive cards are rounded, proof plates stay square-edged), flex row h-26/30rem. Resting: image + bottom gradient + mono index top-left + vertical service name ([writing-mode:vertical-rl] rotate-180). Hover/focus-within: card grows flex 1→1.9 (contained layout animation — documented exception to transform-only, 500ms ease-out), image scales 1.05, vertical label fades, panel with horizontal name + hairline + proof lines rises in (400ms).
- Mobile: cards stack full-width h-64, proof always visible, nothing hover-gated. Pure CSS states — no JS.

## Color relationships

- Light ground: surface white · ink zinc-950 · muted zinc-500 · faint zinc-400 · hairline zinc-200.
- Dark ground: surface zinc-950 · ink white · muted zinc-400 (NOT zinc-500 for small text — fails 4.5:1) · hairline white/10, connector white/20.
- The grounds are narrative chapter marks, not themes. Scatter-state text floor: opacity 0.24 (never linger below ~0.2).

## Interaction patterns

- Lens/preview: hover = preview, focus mirrors hover, click = commitment. `aria-pressed` on lens buttons.
- Numbered mono markers (01/02/03) recur in hero lens list and Act III chapters — they are the same three lenses; numbering is the continuity device.
- Every act ends with a line that hands off to the next (hero positioning → problem; turn/bridge → demonstration; closing → invitation).

## Tuned in-browser (Phase 1 verification pass)

- Turn line: deliberate line breaks are data (`turnLines[]` rendered as block spans) — never let a climax line wrap mid-phrase. Scale steps `text-3xl → 5xl → 6xl` so "Nothing works together." holds as one line at 375px.
- Scatter offsets scale with viewport: factor `min(1, vw/1024)`, halved below 640px. Off-frame clipping at scatter state is intentional on desktop (fragments enter from outside the frame); `overflow-x-clip` on the act container is required because transforms extend the scrollable overflow area.
- Act-opener pattern is now canon (4×): mono eyebrow → display heading → measured paragraph, all left-aligned. No act opens any other way.
- Same-ground act junctions (dark→dark) get a `border-white/10` hairline divider; different-ground junctions need nothing — the ground change is the divider.
- Preview cross-fade at 300ms confirmed against hover — responsive, not sluggish.

## Open questions for extraction

- Hero headline tracking at −0.04em in Schibsted: verify at 9xl in browser.
- Act II fragment offsets (−7/9/−4.5/6.5 rem): tune against real viewport.
- Whether the handoff connector (vertical hairline) should become a continuous rail through Act III.
