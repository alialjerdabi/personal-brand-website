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
- Never gate the page on JS: all choreography is CSS keyframes ending in visibility:hidden (fill forwards); the React component only handles the route-return skip and unmount.
- Replay policy (Ali, 2026-07-16): the intro is an INEVITABLE ENTRY — it plays on every full page load, and skips only client-side route returns (module-scope flag, NOT sessionStorage). The flag is set on COMPLETION, never on mount: setting it on mount made StrictMode's dev double-mount skip the intro instantly (the "0.2s glitch" Ali caught). Rule: completion flags belong in completion callbacks.
- Reduced motion: #editorial-intro { display: none } — intro simply doesn't exist.
- Image-in-headline experiment (queue item 7) lives HERE — the intro statement's chip — one placement only, per the rule. Don't add a second elsewhere.
- Verification note: sub-3s animations can't be caught by pane screenshots; verify by pausing/seeking via el.getAnimations() on an injected preview clone.

## COBALT ENTERS THE SYSTEM (2026-07-17, Ali's direction — second functional color)

- #255DFF ("cobalt"), used ONLY where it means CONNECTION between disciplines: the "Impact metrics" label, the stitch lines + dots tying proof to consequence, and the loop formula's arrows. Emerald = availability; cobalt = system connection. NOTHING else is colored — no headings, no buttons, no decoration. If a third color ever appears, something has gone wrong.

## Act III — Blueprint stack, SCROLL-SCRUBBED (2026-07-18, revision on Ali's direction)

- The deal is no longer entry-triggered beats: sheet poses are a PURE FUNCTION of scroll position — assemble scrolling down, disassemble in reverse scrolling up, freeze exactly at any point. Nothing autoplays. Desktop: stage pins via position:sticky (native scroll, never hijacked) across a lg:h-[260vh] runway; per-sheet windows: settle = easeOutCubic(clamp((p − k·0.22)/0.30)); lift 5rem→0, over-rotation +4°→pose, opacity via settled·1.6. Mobile: no pin — each sheet settles by its own viewport position (Act II grammar). rAF + ref mutation, zero re-renders.
- SSR default = assembled; JS only ever moves sheets when motion is allowed. Deep-linking mid-runway computes the correct frozen state instantly (purity property).
- Motion inventory correction: the page now has TWO scroll-scrubbed acts (II convergence, III stack) — both user-directed; entry-beat grammar remains only in Act IV's rail.

## Act III — Blueprint stack (2026-07-18, staging; superseded interaction — see scroll-scrubbed revision above)

- Namma-reference bones in our register: four light sheets (bg-zinc-100, rounded-lg — the "sheet" radius register between square plates and rounded-2xl cards; shadow-2xl black/40 for lift off the dark desk) dealt one by one, each overlapping the last down-right until one layered stack. Rotations drafting-table only: −2 / 1.4 / −1 / 0.8 deg. Undealt pose: +3deg extra rotation + 2.5rem down + transparent; settle 600ms cubic-bezier(0.22,1,0.36,1), 600ms beats, entry-triggered (IO, −20% margin), NEVER scroll-scrubbed.
- Sheet anatomy: mono stage header → statement → support → cobalt-arrow connection line ("→ Feeds Stage 0X · …") → dashed drafting frame ([ metric module ] — reserved for Ali's future metric animations) → giant base title (cropped by the next sheet, Namma's device). Payoff sheet: wider (58%), lands last on top, absorbs the loop close (cobalt formula, "It compounds.", larger [ compound metrics ] frame, full "Growth System" title visible).
- Desktop geometry: absolute within lg:h-[66rem] wrapper; lefts 0/14/28/36%, tops 0/6/12/20rem, widths 54/54/54/58%, z ascending. Mobile: flow stack, −mt-6 overlaps, same rotations, no absolute.
- Gauge/proof/metrics module system retired from this act (lives in git; ruler-tick gauge grammar remains the canonical data-viz language for the FUTURE metric modules that fill the drafting frames).
- SSR/no-JS/reduced-motion: stack fully dealt.

## Act III — Expansion staging (2026-07-17, latest; supersedes gauge-only version)

- Per Ali's animation sheet (adapted, not copied): each module runs its own entry sequence — clip-path expansion (inset 62%→0, 400ms, paint-only so text NEVER reflows mid-motion), proof plate scales in at center (400ms), impact metrics dock from right (350ms, +380ms), blue stitches draw + lock (350ms, staggered 120ms). Ease everywhere: cubic-bezier(0.22,1,0.36,1) from the sheet.
- Module anatomy (lg): narrative+gauge | proof plate (Petrolas image, mono case-file caption) | impact metrics (Output / Feeds / Inherits — the Inherits row is the cause→effect ledger). Proof imagery RETURNS to this act with a job: evidence at the instrument's center, not gallery.
- Per-module IO triggering (each expands as IT enters), spine ink fills per started module; loop close = "One growth system" + full gauge + blue-arrow formula. SSR/no-JS/reduced-motion: fully locked state.
- Lint lesson recorded: derive locked-vs-animating from an `armed` prop (effectivePhase = armed ? phase : LOCKED) instead of resetting state in effects.

## Act III restaged — The Assembly (2026-07-17, later; supersedes the staircase composition)

- Apple-silicon staging (Ali's brief: "how would Apple explain one chip vs four"): name the villain in the intro (handovers), then ONE object — a vertical spine (chassis) with three machined modules docked onto it. Benefits attributed to unity itself, cause→effect.
- Modules: square-edged hairline-framed plates (machined, non-interactive — rounded corners remain reserved for interactive cards), engraved mono header ("Module 01 · Brand Strategy"), outcome headline, support, then spec lines under a hairline: "Output · <outcome noun>" / "Feeds · <what it hands downstream>". NO invented numbers — spec slots accept real figures when they exist.
- Entry: one docking sequence (650ms beats, translate-x 12px + opacity, spine ink draws down scaleY), IO-armed below-fold only, SSR = fully assembled, reduced-motion/no-JS complete. Never scroll-scrubbed.
- Kill criterion watched during build: if modules read as "cards," revert to typographic staircase — verdict: the spine + ticks + engraving keep them reading as spec plates, not cards.
- Instrument gauge (added 2026-07-17, Ali's "visual payoff" brief): each module's plate splits narrative-left / instrument-panel-right (lg); the panel = "System strength" label + a ruler of 24 hairline ticks (every 6th taller) whose inked count grows 8→16→24 across modules + honest stage caption ("Stage 02 · Inherits Stage 01") + specs. NO invented percentages — accumulation is shown structurally; caption slots accept real figures later. On dock, ticks sweep in at 15ms/tick (needle sweep, not animation). Loop close reuses the full gauge captioned "All stages engaged". This is the site's data-viz grammar: ruler ticks + mono captions, never bars/charts/color.

## Act III redesigned — The Philosophy (2026-07-17, Ali's direction)

- The dark act no longer showcases work (that lives in Capabilities' #work grid + hero cards); it explains WHY connected systems win. Purely typographic — zero images — which is now its distinction against the image-rich acts around it.
- Three pillars (Brand Strategy / Digital Experience / Systems Engineering), each: accumulating mono formula ("Strategy" → "Strategy → Experience" → full chain) — the diagram is TYPOGRAPHIC, no SVG furniture; outcome headline in business language; one support paragraph; hairline handoff connector.
- Composition: staircase indents (lg:ml-0/12%/24%) = accumulation made visible; the loop block RETURNS to the left edge = the feedback loop performed by layout. Full-loop formula "Strategy → Experience → Systems → Strategy → …" + closing "It compounds." (does not collide with Act IV's mantra).
- No new motion — existing Reveal only. Stillness is this act's confidence.
- Anchors rehomed: #work now = Capabilities' project grid (Container gained an id prop); the dark act is #philosophy. All existing #work links (nav, hero cards, footer) land on actual work.

## Act IV — Method + Partner (2026-07-16)

- Placement: light-ground exhale between Act III (dark) and Act V (dark) — restores the light/dark act rhythm from landing-experience.md.
- Method rail: four steps on one shared border-t rail, mono index + title + one-liner, grid 1→2→4 columns. Skimmable in ~15s by design; no cards, no icons.
- Rail ignition (refined 2026-07-16, reference-inspired, vocabulary ours): on viewport entry, an ink line draws along the existing hairline (scaleX, origin-left, 450ms/beat, 550ms cadence) and each step ignites ghost→ink as the line reaches its column — time made visible, causality legible. NO nodes/circles: the hairline is the system, the mono number is the node. Below lg the line is hidden; ignition order alone organizes. SSR default = fully inked (no-JS/reduced-motion complete); ghost armed post-mount only for below-fold viewers.
- Partner closing mantra: "One person. One system. One direction." — appears exactly ONCE on the site (deliberately not echoed into Act V; one mantra, one place).
- Partner coda: portrait slot (MediaCycler, single placeholder frame — static until Ali's photo, then cycle-ready), "You'd work with me. Directly." + no-handovers statement, mono facts line with a second LocalTime instance (the live-clock grammar now appears in Act I's thread and Act IV's coda — same fact, two narrative moments).
- The homepage narrative is now structurally complete: Acts I–V all present. Remaining Phase 3 scope: persistent conversion bar (condense the SystemThread row — do NOT add a new element).

## Media cycling + resting card (2026-07-16, Ali's final hero edits)

- MediaCycler (ui/MediaCycler.tsx) is THE image-transition grammar: current frame pans up (−6%) and settles to 80% as it exits; next frame grows from that same 80% to full. 650ms transform/opacity transitions, 2000ms cadence (Ali proposed 1s; 2s adopted — faster reads as urgency next to the headline). Cycling pauses while hovered (text never sits on a moving image), never runs under reduced motion, and single-frame arrays don't cycle — data-ready for assets (frames: image | placeholder union in hero.ts).
- Hero card resting state: while #hero-cards is neither hovered nor focus-within, the FIRST card holds the expanded pose (pure CSS in globals.css via :not(:hover):not(:focus-within) + data-card-label/data-card-panel hooks) — the row is never dead, and it yields naturally to any interaction. The old hover-zoom (scale-105) was removed: zoom + cycling on one image is motion soup.
- Intro chip cycles through the three Petrolas images at 1500ms; intro→hero handoff tightened (entrance delays 1700–2020ms) so the hero is settled as the backdrop finishes.

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
