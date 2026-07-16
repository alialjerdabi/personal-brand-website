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

## Reference-derived refinements (2026-07-15)

- Act III plates are detail crops, not repeats: shared imagery reframed via data-driven `plateFocus` (object-position) + scale-125 + wider 16/10 aspect on lg, with a mono case-file caption strip inside the frame (client · lens · deliverable). Interim until dedicated per-lens assets exist.
- Footer anatomy (Act V close): statement + oversized email + quiet sitemap on dark ground → full-bleed wordmark (text-[12.5vw], the signature close) → hairline bottom bar: mono copyright/location left, thesis right. The last line of the page is the first line it said.
- Availability dot: emerald-400, 6px, inside the nav pill only — the sole functional color on the site; it means "live/available" and nothing else ever uses it decoratively.
- Scroll cue: mono "[ scroll ]" in the hero status row, aria-hidden — square brackets are the system register's way of marking an instruction rather than content.

## Capabilities block (2026-07-15, Symbol-derived, user-directed)

- Placement: between Act II and Act III — capability list → partner strip → work preview.
- Capability list: mono index + line, ghost zinc-300 resting → ink + 4px translate-x on hover (200ms). Same focus grammar as the hero lens list and Act II: attention = ink, everything else recedes.
- Partner marquee: 45s linear loop of hairline-bordered tiles, two track copies at translateX(-50%), pause on hover, static under reduced motion, white gradient masks at edges. DOCUMENTED EXCEPTION to "nothing loops" — user-directed. Partner names are PLACEHOLDERS; replace before launch.
- Work preview card: cover pans left (-25%) while reveal frame slides in from right (700ms ease-out), pure CSS group-hover/focus-visible. Open-slot card: hairline border, bottom-anchored mono label + statement, border→ink on hover ("honest CTA instead of fake second project").
- Wordmark sizing rule: full-bleed display type is sized in stepped rem per breakpoint, NEVER vw — vw type ignores browser zoom and breaks hierarchy (Ali caught this). Steps: 3.4/6/7.5/10/12.5/15rem.

## Services page + revisions (2026-07-15, later)

- Marquee rule: half the track must exceed any real viewport — 8 list copies (track ~10000px), loop at -50%. Duration scales with track (90s) to keep the same visual speed.
- Capabilities are 7 links into /services#slug; rows get hover ink+nudge plus an appearing → glyph; keyboard focus adds underline (color-only focus is insufficient).
- /services page: h1 statement → sticky mono side nav (lg+) → numbered chapters (scope-of-work list · question · importance · approach) → 3-tile placeholder asset row ([ asset ] mono tiles, Reveal entrance) awaiting real media.
- Project grid asymmetry: 12-col, spans 7/5 then 5/7 with lg:mt-14 offsets on the right column — stagger via margins, never transforms (keeps flow honest). Placeholder case-study cards keep the pan animation with typographic layers until assets arrive; placeholders are NOT links (no dead clicks).
- NO css scroll-behavior:smooth — multi-second glides on a long document are worse UX than instant jumps (verified in-browser). Eased scrolling only via the future Lenis trial with controlled duration.

## Editorial loading intro (approved 2026-07-16)

- Sequence (~2.45s total): grey field (zinc-100) + small centered thesis with inline image chip (0–1.6s) → white architectural frame scales from center 0.14→1 (0.9–2.15s, cubic-bezier(0.2,0.7,0.2,1)) → backdrop fades/hides (2.1–2.45s) → hero entrance settles in (delays 1.9–2.22s via body:has(#editorial-intro) override).
- Frame trick: the frame is oversized (-inset-16) so its rounded corners exit the viewport at full scale — radius "vanishes" without animating border-radius; page bg is white, so the frame literally becomes the page.
- Never gate the page on JS: all choreography is CSS keyframes ending in visibility:hidden (fill forwards); the React component only handles once-per-session skip (sessionStorage, hidden pre-paint via layout-effect DOM mutation — NOT setState, per react-hooks/set-state-in-effect) and unmount.
- Reduced motion: #editorial-intro { display: none } — intro simply doesn't exist.
- Image-in-headline experiment (queue item 7) lives HERE — the intro statement's chip — one placement only, per the rule. Don't add a second elsewhere.
- Verification note: sub-3s animations can't be caught by pane screenshots; verify by pausing/seeking via el.getAnimations() on an injected preview clone.

## The L-cut (Act I → Act II boundary, approved concept B, 2026-07-16)

- Acts I–II share one wrapper in page.tsx; the hero's system row (SystemThread) is `sm:sticky top-0` within it — it docks at the viewport top as the story begins, rides over the fragments, and releases when the wrapper (Act II) ends. Film-editor logic: the previous scene's live element carries over the new scene.
- Docked surface: hairline + bg-white/90 + backdrop-blur-sm, toggled by a 1px sentinel + IntersectionObserver (CSS has no :stuck). Sentinel observers must attach unconditionally — never gate effects on viewport width at mount (a resize can't re-run the effect; this bug shipped and was caught in verification). Width-dependent behavior belongs in CSS (sm:-scoped classes).
- Foundation (concept A): hero pb collapsed to 8/10, Act II pt to 14/20 — the story's opener is in frame while the hero is still alive on all common viewports.
- This row is the embryo of the persistent conversion bar (queue item 5): when that lands, the row condenses into it rather than a new element appearing.
- Mobile: row stays in flow (no pinned chrome at small heights); the overlap there is composition only.

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
