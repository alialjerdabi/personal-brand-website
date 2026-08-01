# Master Brief — Ali Aljardabi, personal site

**Status:** locked 2026-08-01. This supersedes every earlier direction in
`docs/`. If something here conflicts with `creative-direction.md`,
`landing-experience.md`, `hero-spec.md` or `roadmap.md`, **this wins** —
those describe the abandoned "connected growth system" product.

Read this before touching anything. It exists because six rounds of this
project were spent rebuilding in circles, and every one of those rounds
had the same two causes: no locked reference, and no way to see the work.

---

## 1. What this is

A personal site for **Ali Aljardabi** — an independent designer in
Manama, Bahrain — selling three things to **small and growing
businesses**:

1. **Branding** — identity, art direction, guidelines
2. **Websites** — strategy, UX/UI, design and build
3. **Web & app products** — dashboards, interfaces, design systems

He works alone, end to end. That is the central sales argument: the
person you brief is the person who designs it and the person who builds
it. It is why a small business would choose him over an agency, and the
site must make it visible rather than merely state it.

**Not** an agency. **Not** "we". First person, always.

---

## 2. The goal — the only structure that matters

Every section must serve one of three stages. A section that serves none
gets cut.

| Stage | Job | How |
|---|---|---|
| **1. Hook** | Stop them in three seconds | Stunning visuals, hero animation, craft on display |
| **2. Trust** | Prove he can actually do it | The work, shown properly, with real results |
| **3. Convert** | Get the enquiry | Testimonials + a CTA promising to fix their actual problem |

**The promise, stated plainly:** make the brand *memorable*, and make the
website *convert* — turn visitors into leads.

When judging any decision, ask which stage it serves. If the answer is
"it looks nice", it is decoration and it goes.

---

## 3. The locked reference

**https://www.upsunday.co/#**

This is the target for **presentation, layout and animation quality**.
Locked — do not introduce another reference without an explicit decision
to replace this one. Reference churn (K95 → UpSunday, black → warm) was
the single biggest source of wasted work in this project.

### What "match closely" means

**Do match:** structural model, section order, layout system, spacing
density, type scale relationships, interaction vocabulary, animation
quality and pacing, the warm/approachable register.

**Do not reproduce:** their copy, their imagery, their brand, their name
treatment, their exact palette. Not on principle alone — a site a
prospect *recognises* as someone else's destroys the exact credibility
this site exists to build, and Ali's name is on it.

Measured facts about the reference, for calibration:
- Body ground plain white, near-black text, warm rounded typeface
  (`ui-rounded` / SF Pro Rounded)
- Section order: Hero → Awards → Testimonials → Stats → Blog → Services
  (Brand / Web / Motion) → Works → Footer
- ~4,300px document height at desktop — shorter than you would guess
- Their selling power is mostly social proof. See §7.

---

## 4. Design system — decided, do not relitigate

| | |
|---|---|
| **Display / UI typeface** | Nunito (rounded, full weight range). Headings at 700. |
| **Page ground** | Warm off-white. **Being cooled** — see below. |
| **Accent** | `#FF5A1F` orange |
| **Project palette** | orange / blue `#1B3FE0` / lime `#C6F24E` / violet `#6E3BFF` / cream — each project owns one; it marks its card and its case-study header |
| **Register** | Warm, spoken, first person. Editorial, not corporate. |

**DECIDED 2026-08-01:** the cream `#F2EEE0` fights the cold navy Petrolas
imagery. Cool the ground toward a **neutral warm-grey** — keeps the
personal, relaxed register but drops the yellow that clashes with blue.
Not plain white (loses the warmth), not warming the images (makes real
work look filtered). Verify by screenshot before committing.

### Honesty rules — non-negotiable

- No invented clients, metrics, testimonials, awards or dates.
- Sections whose data is empty **render nothing** rather than showing
  plausible placeholders. Currently true of stats and testimonials.
- Projects without cover art show a designed "in production" state,
  never a borrowed image from another client.
- Anything drawn into a `<canvas>` or 3D texture must also exist as real
  DOM text — it is invisible to search engines and screen readers.

---

## 5. Page structure — restructured around what exists

Awards and blog are **dropped**. Ali has neither, and empty sections make
a site feel thinner, not fuller. The trust stage is carried by process, a
deep Petrolas story, and an explicit promise instead.

### `/` — home

| # | Section | Stage | State |
|---|---|---|---|
| 1 | Hero — spoken sentence, inline stills, drawn arrow | Hook | Built, needs work |
| 2 | Stacked showcase — project frames on scroll | Hook | Built |
| 3 | Work grid + popup | Trust | Built |
| 4 | Stats band | Trust | Built, **empty** |
| 5 | Services — three cards | Trust | Built |
| 6 | Promise — three outcomes | Convert | **Not built** |
| 7 | Testimonials | Convert | Built, **empty** |
| 8 | Contact close | Convert | Built |

**The Promise section (DECIDED 2026-08-01):** outcomes, not deliverables.
Three plain statements of what changes for the visitor's business —
credible, findable, converting. No guarantee, no pricing, no invented
numbers. It works today with no new content from Ali, and it is the piece
that turns "nice work" into an email.

**The headline (DECIDED 2026-08-01):** rewrite around converting — lead
with the business outcome rather than the perception one, carrying both
promises (memorable brand, converting site).

> **Trap:** "brands people remember" is UpSunday's own headline. Do not
> use that phrase or a near-copy of it. Same promises, Ali's words.

### `/work/[slug]` — case study

Deep. Metadata, a titled section per discipline, assets at scale, next
project. Petrolas is the only one built.

### `/studio` — about

The "just me" argument: bio, the badge, and the four process steps.

**The process steps are UNCONFIRMED.** They describe a proposed
engagement and must not ship until Ali says they are accurate.

---

## 6. Working rules — how to not repeat this project's mistakes

1. **Look at the work.** `node scripts/shots.mjs` screenshots every route
   at 390/1024/1600 to `.shots/`. Read the PNGs. Every visual defect this
   project shipped — an arrow with no arrowhead, a headline behind the
   navbar, a card outside the camera frustum, a phone with no navigation
   — was invisible to type-checking and DOM measurement and obvious in a
   screenshot. **Never report visual work as done without looking at it.**
2. **Plan before building** anything structural. Show the plan, get a
   yes, then build once.
3. **No new dependencies** without stating the cost and getting a
   decision. This project accumulated seven, including a WASM physics
   engine, for ornaments.
4. **Components are references, not agendas.** A React Bits prompt is an
   idea to adapt, not a task to complete. Reach for native platform
   features first — `position: sticky` over a pin plugin, `<dialog>` over
   a hand-rolled modal, native scroll over a smooth-scroll library.
5. **Fix root causes.** Grep every caller before patching one path.

### Known traps in this codebase

- **Turbopack serves stale CSS.** Edits to `globals.css` can silently not
  apply through a server restart. Symptom: computed value ≠ file value.
  Fix: `rm -rf .next` and restart.
- **React Three Fiber re-enables `pointer-events`** on its container and
  canvas, overriding an inherited `none`. Set it inline or a full-page
  canvas eats every click.
- **Tailwind v4 `translate-*` / `scale-*`** compile to the CSS
  `translate` / `scale` properties, which *compose with* rather than are
  overridden by GSAP's `transform`. Use inline transforms for anything
  GSAP will animate.
- **A `gsap.to` with a scrubbed ScrollTrigger** captures its start value
  at creation. If an entrance has just set opacity 0, the tween animates
  from invisible to invisible. Use `fromTo` + `immediateRender: false`.
- **Hand-placed line breaks:** never leave one word alone on a line, and
  never break inside a noun phrase.

---

## 7. Current state — honest

### Works
Hero (big centred type, inline stills, drawn arrow, left-to-right
entrance), stacked showcase, work grid with a native `<dialog>` popup and
cycling gallery, services, notes, contact, the Petrolas case study, the
studio page's copy.

### Broken / weak — in priority order
1. **No mobile navigation at all.** Links are `hidden md:flex` with
   nothing replacing them. Work/Services/Studio/Contact are unreachable
   on a phone. **Fix: full-screen menu.**
2. **~45% of the mobile hero is empty space.**
3. **Hero stills read cold** against the cream, and the fourth one is
   orphaned at the end of a line. **Fix: fewer, bigger stills + cool the
   ground.**
4. **Bottom hero row is unbalanced** — copy hard left, buttons
   centre-right, dead space right.
5. **Studio badge card face renders blank.** Physics, rope and clip work;
   the canvas textures never reach the material. **PARKED** — see §8.
6. Stats and testimonials render nothing (correct, but the trust stage is
   hollow without them).

### Parked
The 3D lanyard badge. Physics works, the card face does not. It is a
~30MB dependency tree for one ornament on a page outside the core funnel.
`/studio` keeps the flat DOM card that already renders correctly.
**While parked, `LanyardStage` should stop importing `Lanyard`** so
`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
and `meshline` are unreferenced and can be removed.

---

## 8. What only Ali can supply

The trust stage is the middle of the funnel and it is currently empty.
This is the bottleneck, and no amount of design fixes it.

- [ ] **Headshot** — for the studio badge and the about page
- [ ] **His logo / mark** — currently drawn in code as a placeholder
- [ ] **Confirmation of the four process steps** — proposed, unverified
- [ ] **Real client quote(s)** with permission and attribution
- [ ] **Honest counts** — projects, years, industries. No invented metrics.
- [ ] **Cover art for Delivery Point, Kids Island, Qobban** — plus their
      real disciplines, sectors and years
- [ ] **New Petrolas presentation assets** — warmer mockups that sit on
      the site's ground rather than fighting it

Live reference for the Petrolas brand: https://petrolas-v2.vercel.app/

---

## 9. Immediate next steps

Work these **one at a time**, with a screenshot review and Ali's yes
before moving to the next (decided 2026-08-01 — gating is what stops
another six-round loop).

1. Full-screen mobile menu.
2. New headline, then the hero rebuild: cool the ground, two larger
   stills instead of four, fix the mobile dead space and the bottom row.
3. Build the **Promise** section.
4. Park the badge properly; drop the unreferenced 3D dependencies.

Screenshot-review every one before calling it done.

---

## 10. Repo facts

- Next.js 16.2.10 (Turbopack), React 19.2.4, Tailwind v4, TypeScript
- Prototype lives at `/lab`, `/lab/studio`, `/lab/[slug]`. The shipped
  "growth system" site is under `src/app/(site)/` and is **not** this
  product — it is the Codex-direction site and stays untouched.
- Content layer: `src/data/lab.ts`. Components: `src/components/lab/`.
- Branch: `experiment/mask-direction`
- Verify with: `npx tsc --noEmit`, `npx eslint src --max-warnings=0`,
  `node scripts/shots.mjs`
