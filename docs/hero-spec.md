# Hero Section Specification

Status: Draft — pending review before implementation begins.

This document is the implementation blueprint for the Hero section. Its purpose is to remove ambiguity before development starts. Nothing here should be implemented until this spec is reviewed and approved.

---

# Hero Vision

The hero is not a portfolio. It is the first demonstration of how connected business systems work. In the first few seconds on the page, a visitor should sense that branding, websites, and AI automation are not three separate services being pitched at them, but one coordinated system working toward their business outcomes. Rather than presenting a wall of information, the hero should let visitors naturally discover capabilities, projects, philosophy, and proof at their own pace — an editorial opening statement, not a dashboard. The feeling should be quiet confidence: nothing shouts for attention, but everything present earns it.

---

# Business Objective

**Who this hero is designed for**

The hero must speak first to business decision makers evaluating whether Ali is a credible strategic partner — not to designers evaluating visual craft, and not to visitors browsing casually.

**Primary audience**

- Corporate businesses seeking a partner who connects branding, digital presence, and automation
- Technology companies that need credibility and polish to match their product
- Luxury brands that require restraint, precision, and premium execution

**Secondary audience**

- Growth-oriented founders who feel their current branding/systems are working against each other
- Established local businesses preparing to scale beyond ad hoc tooling

**Business goals**

- Establish Ali as a strategic partner, not a freelancer or vendor
- Communicate the "connected systems" philosophy within seconds
- Move visitors toward exploring solutions and eventually booking a discovery call

**Conversion goals**

The hero's primary conversion is attention, not a click. Its job is to earn the next scroll and set up the CTA so that clicking it feels like a natural next step rather than a sales push. A secondary, lower-friction conversion path is offered through the live project preview, which lets a visitor self-qualify by exploring proof before committing to a CTA.

**Trust goals**

- Demonstrate range (branding, websites, AI automation) without diluting focus
- Show real, specific proof of work rather than generic claims
- Signal craftsmanship through restraint — an over-decorated hero would undercut the very credibility it's trying to build

---

# Information Hierarchy

Reading order:

1. Navigation
2. Service navigation
3. Hero typography
4. Positioning paragraph
5. CTA
6. Live project preview
7. Philosophy hint

**Why this hierarchy exists**

Navigation is oriented first because it is the visitor's map — it should register before anything else asks for attention. Service navigation comes next, ahead of the headline, because it frames what follows: by the time visitors reach the typography, they already know Ali operates across branding, websites, and AI automation as one practice, so the headline reads as a synthesis rather than a surprise claim.

The hero typography then delivers the single idea the section exists to communicate. It is deliberately followed, not preceded, by the positioning paragraph — the headline earns attention, the paragraph earns belief. Belief is what makes the CTA feel like an invitation rather than a demand, which is why the CTA follows immediately after.

The live project preview comes after the CTA intentionally. It functions as supporting evidence for visitors who are not yet ready to act — proof they can explore on their own terms instead of a hard sell. It should never compete with the CTA for primary attention.

The philosophy hint sits last because it is optional depth. It rewards visitors who linger and are curious about the "why" behind the work, without interrupting the direct path from headline to CTA for visitors who already have enough.

---

# Layout

**Desktop**

The layout should read as editorial, not templated. The hero occupies a single generous viewport rather than a cramped, information-dense fold. Typography anchors the left or center of the composition depending on final art direction, with the positioning paragraph constrained to a comfortable reading measure directly beneath it — never full-width, so it reads as a considered statement rather than a paragraph of marketing copy.

The service navigation sits above the headline as a quiet, secondary layer — present and legible, but visually subordinate to the typography that follows it. It should feel like context-setting, not a menu competing for primary focus.

The live project preview is positioned to balance the composition against the typography block — likely to one side, or beneath the fold trigger — so the layout has visual weight in two places without feeling split into two competing sections. Whitespace surrounding the preview card should be generous enough that it reads as "featured proof," not a thumbnail grid.

Overall balance favors asymmetry over strict centering: editorial layouts earn their premium feel through considered imbalance, not symmetry. Alignment should be consistent with the site's existing grid so the hero doesn't feel like a bespoke exception to the rest of the page.

**Tablet**

The two-zone balance (typography vs. preview) collapses toward a single vertical flow. Service navigation may condense (e.g., fewer visible project entries per service, same expand behavior) to preserve breathing room. Typography scales down proportionally but retains hierarchy dominance over all other elements on screen.

**Mobile**

Fully vertical, single-column flow following the same reading order. The live preview becomes a single focused card rather than a balanced layout element — it should feel intentional, not squeezed in. Touch targets throughout (service rows, project rows, CTA) must be comfortably sized. Whitespace is reduced proportionally to viewport but never eliminated — the "quiet confidence" feeling must survive on small screens.

---

# Hero Typography

**Philosophy**

Typography is the primary carrier of hierarchy and confidence in this section — it should do the persuasive work that color, imagery, or iconography might do elsewhere. The headline should read as a single, clear idea stated plainly, not a clever tagline requiring interpretation.

**Size**

The headline should be large enough to dominate the viewport's visual weight without forcing the rest of the hero below the fold on common desktop sizes. Scale should step down deliberately across breakpoints rather than fluidly shrinking, preserving intentional proportions at each size rather than a purely responsive blur.

**Weight**

A single strong weight for the headline is preferable to mixing multiple weights within it — restraint reinforces confidence. Supporting text (positioning paragraph, service navigation) should use a visibly lighter weight so the contrast itself communicates hierarchy without additional decoration.

**Hierarchy**

Three clear typographic tiers: headline, positioning paragraph, and supporting micro-elements (service navigation labels, CTA, philosophy hint). Each tier should be unmistakably distinct in scale or weight — a visitor should be able to tell the hierarchy apart at a glance, without reading.

**Spacing**

Line height and letter spacing on the headline should favor legibility and elegance over density — generous but not loose. Spacing between the headline and the paragraph beneath it should be large enough to let the headline breathe as its own statement before the paragraph adds detail.

**Interaction**

The headline is not static text — see the Philosophy Interaction section for its hover behavior. Aside from that one interaction, typography itself should not be animated or interactive in ways that create noise; its power comes from clarity and restraint, not motion.

---

# Service Navigation

Three entries: Branding, Websites, AI Automation.

Each entry displays:

- The service name
- A project counter (e.g., number of projects available under that service)
- An expandable project list

**Interaction**

Hovering or focusing a service subtly indicates it is expandable (e.g., a quiet visual cue such as a counter emphasis or affordance change) without triggering the expansion itself — expansion is an intentional action, not an accident of passing the cursor. Clicking or activating a service expands its project list in place, pushing adjacent content rather than overlaying it, preserving spatial context.

**Collapse behavior**

Expanding one service should collapse any other currently-expanded service — only one service's project list is open at a time, keeping the navigation compact and preventing the hero from growing tall and losing its "single viewport" feel. Clicking an already-expanded service collapses it back to its resting state.

**Keyboard accessibility**

Each service is a focusable, actionable element reachable via Tab in document order. Enter or Space toggles expansion. When a service is expanded, focus order proceeds into its project list before reaching the next service, so keyboard users experience the same reveal sequence as the visual expansion. Escape collapses the currently expanded service and returns focus to its trigger.

---

# Project Interaction

**Hover service**

A quiet affordance change signals the service is expandable (e.g., subtle emphasis on the counter or label). No content shifts yet.

**Hover project**

Once a service is expanded and a project row is hovered, the Live Preview Card updates to reflect that project — this is the mechanism that connects service navigation to the preview card. The transition into the new preview state should be smooth, not an abrupt swap.

**Leave project**

When the cursor leaves a project row without a click, the preview card either reverts to a default/featured state or holds the last-hovered project, whichever produces less visual flicker as a visitor scans multiple rows quickly. The chosen behavior must not cause the preview card to thrash on fast mouse movement across the list.

**Click project**

Clicking a project row is the entry point into that project's case study (see Live Preview Card, "How users enter a case study"). It should feel like a deliberate transition, not an abrupt page swap.

**Keyboard focus**

Focusing a project row via keyboard mirrors the hover behavior — it updates the live preview card the same way a mouse hover would, so keyboard users get equivalent information, not a degraded experience.

**Touch devices**

Touch has no hover state, so the interaction must not depend on hover to reveal information. Tapping a service expands it (as with click). Tapping a project either updates a visible preview area directly on tap (if preview and list can coexist on screen) or navigates straight to the project, whichever preserves the two-step "preview then commit" spirit of desktop without requiring a hover step that doesn't exist on touch.

---

# Live Preview Card

**Purpose**

The card is proof, not decoration — a live, tangible glimpse of real work that makes Ali's claims concrete. It exists to let a visitor self-qualify by exploring outcomes before ever speaking to Ali.

**Layout**

A single focused card, not a gallery or grid — consistent with the hero's "one clear idea per moment" principle. It should feel considered and editorial, similar in spirit to a printed portfolio plate rather than a web thumbnail.

**Information hierarchy**

Primary visual asset (image or preview of the work) first, then a concise project identifier (name/client, service category), then minimal supporting detail (e.g., one-line outcome or descriptor). No dense text blocks — the card teases, the case study delivers depth.

**Required elements**

- Visual asset representing the project
- Project name or identifying label
- Associated service category (Branding / Websites / AI Automation)
- A clear (if implicit) path to "see more" — via click-through, not a separate button competing for attention

**How assets transition**

When the previewed project changes (via hover/focus on a project row), the asset and identifying text should cross-fade or otherwise transition smoothly rather than hard-cut, reinforcing that this is one continuous, living preview rather than a series of disconnected static cards.

**How booklet behavior works**

The card behaves like flipping through a small booklet of proof: each project row acts as a page reference, and the card is the page itself. Only one "page" is visible at a time, and moving between projects should feel like turning to the next page — directional and continuous — rather than items popping in and out.

**How users discover more work**

Discovery happens primarily through the service navigation list itself (browsing project rows), with the preview card as the payoff for that browsing. The project counter next to each service signals there is more to explore before a visitor commits to opening the list.

**How users enter a case study**

Clicking the live preview card (or the corresponding project row) is the committed action that navigates the visitor into the full case study. This should feel like the natural conclusion of the "preview, then commit" flow already established by the hover/focus interaction — not a new, separate decision.

---

# Motion Principles

Every animation listed here must justify itself against the project's motion principle: motion enhances comprehension, it never attracts attention for its own sake.

- **Section entrance** — Headline, paragraph, and CTA introduce with a restrained, staggered fade/rise on initial load. Duration: brief (sub-second per element). Easing: a gentle deceleration curve so elements settle rather than snap or bounce. Purpose: signal that the page is alive and considered, and establish reading order through timing.
- **Service list expand/collapse** — The project list beneath a service expands and collapses with a smooth height/opacity transition. Duration: short. Easing: deceleration on expand, slightly quicker on collapse. Purpose: preserve spatial continuity so visitors don't lose their place when content shifts.
- **Live preview cross-fade** — Asset and text transition when the previewed project changes. Duration: short, quick enough to feel responsive to hovering, not sluggish. Easing: smooth ease-in-out. Purpose: reinforce the "one continuous card" feeling described in the Live Preview Card section.
- **Philosophy bubble appearance** — The message bubble on headline hover fades and rises in gently. Duration: brief. Easing: soft deceleration. Purpose: feel like a quiet, optional invitation rather than a popup demanding attention.
- **Hover affordance cues** (service rows, project rows, CTA) — Minimal, immediate micro-transitions (e.g., subtle color or weight shift). Duration: near-instant. Purpose: give confirmatory feedback that an element is interactive, nothing more.

No animation in this section should delay a visitor's ability to read content or interact with an element. Nothing should loop, bounce, or repeat without user action.

---

# Philosophy Interaction

Hovering the main hero typography (the headline) reveals a small, Apple-style message bubble near the cursor or anchored to the headline. The bubble is quiet, optional, and premium in tone — never intrusive, never demanding to be noticed. It invites the visitor to discover the philosophy behind the work. Clicking the bubble smoothly scrolls/navigates the visitor to the Philosophy section of the site.

This interaction is a hint, not a headline — most visitors may never notice or engage with it, and that is acceptable. It rewards curiosity rather than instructing action.

**Suggested microcopy variations**

1. "There's a reason behind this."
2. "Curious why this works?"
3. "See the thinking behind it."
4. "This isn't random. Want to know why?"
5. "There's a philosophy here."
6. "Why this approach? Let's explain."
7. "Every choice here means something."
8. "Want the reasoning behind this?"
9. "There's a system behind the words."
10. "Discover the philosophy."

Final selection should favor whichever variant feels most understated in context — the tone should never feel like it's selling the click.

---

# Accessibility

**Keyboard navigation**

Every interactive element (navigation links, service rows, project rows, CTA, philosophy bubble trigger) must be reachable and operable via keyboard alone, in a logical order matching the visual reading order defined above.

**Reduced motion**

All entrance, expand/collapse, cross-fade, and bubble animations must respect `prefers-reduced-motion`. When reduced motion is requested, transitions should be replaced with instant or near-instant state changes — content must never be gated behind an animation that reduced-motion users can't complete.

**Screen readers**

Service navigation must expose expanded/collapsed state (e.g., via appropriate ARIA state attributes conceptually — not prescribing implementation here). The live preview card's content changes should be announced in a way that doesn't overwhelm screen reader users with every hover (i.e., preview updates should generally follow focus/activation semantics, not fire on every transient mouse movement). The philosophy bubble must be discoverable by means other than mouse hover for screen reader and keyboard users.

**Focus order**

Focus order follows the information hierarchy: navigation, service navigation (including nested project rows once expanded), hero typography (and its philosophy trigger), CTA, live preview card. Expanding a service should not trap or skip focus unpredictably.

**Hover alternatives**

Every hover-triggered behavior (project preview update, philosophy bubble, affordance cues) must have a keyboard-focus equivalent, as already specified in Project Interaction and Philosophy Interaction.

**Touch alternatives**

Every hover-dependent interaction must degrade to a tap-based equivalent, as specified in Project Interaction's "Touch devices" subsection. No functionality should be exclusively hover-gated.

---

# Performance Constraints

The hero must remain performant, since it is the first thing every visitor experiences and directly affects trust and perceived quality.

- Prefer CSS-driven transitions and animations wherever the effect can be achieved without JavaScript (entrance animation, hover affordances, expand/collapse where feasible).
- Reserve client-side JavaScript for interactions that genuinely require state coordination: which service is expanded, which project is previewed, and the philosophy bubble's visibility.
- Avoid unnecessary re-renders or layout thrash when the live preview card updates — asset swaps should be efficient, not triggering full-card remounts.
- Visual assets in the live preview card must be sized and loaded appropriately for the hero's prominence (above-the-fold priority loading), without bloating initial page weight by preloading every project's assets before they're needed.
- The hero should not depend on heavy third-party animation libraries; the motion described here is achievable with lightweight, purpose-built techniques.

---

# Future Expansion

The hero's structure must accommodate growth without requiring a redesign:

- **Additional services** — The service navigation pattern (name, counter, expandable list) should scale to a fourth or fifth service without breaking the layout balance; if service count grows significantly, the design should degrade gracefully (e.g., condensed labels) rather than requiring a new pattern.
- **Additional projects** — Project counts within a service should be able to grow substantially without changing the interaction model; the expandable list should handle scroll or overflow internally rather than pushing the hero's height indefinitely.
- **CMS** — Service names, counters, project entries, and preview card content should be treated as data, not hardcoded markup, so they can eventually be sourced from a CMS without restructuring components.
- **Case studies** — The "click project → enter case study" path should assume a real destination page exists per project, even before all case studies are written; the interaction model should not need to change once case study pages are built out.
- **AI-powered content** — Positioning copy, project descriptors, or even philosophy bubble microcopy could eventually be dynamically generated or personalized; the content/component separation should make this feasible without hero-level rework.

---

# Implementation Notes

These are recommendations for the engineer implementing this spec, not decisions made on their behalf.

**Possible technical approaches**

- The hero should likely be composed of several smaller, focused components (e.g., a service navigation component, a live preview card component, a philosophy-hint component) rather than one monolithic hero component, consistent with the project's component architecture principles.
- State that must be shared — which service is expanded, which project is currently previewed — needs to live in a common ancestor (the hero section component) so the service navigation and the live preview card can stay in sync.
- Content (service names, project lists, preview assets, positioning copy) should be defined in a dedicated data file/module and passed into components as props, per the project's data philosophy, rather than hardcoded inside components.
- Entrance and hover/focus-driven transitions are strong candidates for CSS transitions/animations; only the interactive state coordination (expand/collapse, active preview, bubble visibility) needs JavaScript, and that can likely be handled with a small client component wrapping otherwise-server-rendered content.

**Trade-offs**

- A single shared "active project" state keeps the service navigation and preview card perfectly in sync, but it does mean the component holding that state must be a client component — the boundary between server and client rendering needs to be drawn carefully so as much of the hero as possible (headline, paragraph, static structure) can remain server-rendered.
- Cross-fading preview assets smoothly on fast hover movement across a project list can introduce visual noise if not debounced or throttled; there's a trade-off between responsiveness (instant preview update) and calmness (avoiding flicker) that will need tuning during implementation, not just specification.
- Supporting a booklet-like preview transition invites the temptation to reach for an animation library; the spec's performance constraints favor resisting that unless a lightweight, purpose-built approach proves insufficient.

**Risks**

- If the service navigation and live preview card are not built with mobile/touch as a first-class case from the start, the fallback behavior described in Project Interaction risks becoming an afterthought retrofit rather than a clean parallel path.
- Overloading the hero with too much simultaneous motion (entrance + hover cues + cross-fade + bubble) risks violating the project's core motion principle if not paced and prioritized carefully during implementation.
- The philosophy bubble is easy to over-design into something that competes with the CTA for attention; implementation should err toward under-stating it, consistent with "quiet, premium and optional."
