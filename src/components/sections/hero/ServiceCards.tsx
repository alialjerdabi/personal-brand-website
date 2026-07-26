"use client";

import MediaCycler from "@/components/ui/MediaCycler";
import { useHeroCard, useHeroCardGroupProvider } from "@/components/sections/hero/HeroCardGroupContext";
import type { HeroService } from "@/data/hero";

interface ServiceCardsProps {
  services: HeroService[];
}

interface ServiceCardProps {
  service: HeroService;
  index: number;
}

/** The site's approved "premium" easing curve (see ProjectCardSlider.tsx) — calm deceleration, no bounce or elastic overshoot. */
const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Hero cards' own crossfade pace — faster than MediaCycler's 650ms default so it reads as a deliberate handoff, not a slow drift. */
const HERO_CROSSFADE_MS = 450;

/**
 * One card: hovering or focusing it reports up to HeroCardGroupContext,
 * which resolves the single `activeId` for the whole row (see that
 * file). `isActive` is now the ONE source of truth driving both the
 * visible layout (expanded width via `data-active`, revealed proof
 * panel) and playback (`playing` gates MediaCycler) — previously the
 * width/panel still read raw CSS :hover/:focus-within while only
 * playback listened to the shared state, so the two could disagree.
 */
function ServiceCard({ service, index }: ServiceCardProps) {
  const { isActive, playing, setHovered } = useHeroCard(service.id);

  return (
    <li
      data-active={isActive}
      className="group relative min-w-0 overflow-hidden rounded-2xl bg-ground-inverted sm:flex-[1_1_0%] sm:data-[active=true]:flex-[1.9_1_0%] motion-safe:sm:transition-[flex-grow] motion-safe:sm:duration-500"
      style={{ transitionTimingFunction: PREMIUM_EASE }}
    >
      <a
        href={service.href}
        aria-label={`${service.name} — view the work`}
        className="relative block h-64 w-full sm:h-full focus-visible:outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <MediaCycler
          frames={service.media}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 100vw"
          className="absolute inset-0"
          pauseOnHover
          preloadFirst={index === 0}
          playing={playing}
          crossfadeMs={HERO_CROSSFADE_MS}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
        />

        <span
          aria-hidden="true"
          className="absolute left-4 top-4 font-mono text-xs tracking-[0.2em] text-white/70"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Resting state: quiet vertical label (desktop only). */}
        <span
          aria-hidden="true"
          data-card-label
          className="absolute bottom-5 left-4 hidden rotate-180 text-lg font-medium tracking-tight text-ink-on-inverted [writing-mode:vertical-rl] sm:block motion-safe:transition-opacity motion-safe:duration-300 sm:group-data-[active=true]:opacity-0"
        >
          {service.name}
        </span>

        {/* Expanded state: name + work proof rise in. */}
        <span
          data-card-panel
          className="absolute inset-x-0 bottom-0 block p-5 opacity-100 translate-y-0 sm:translate-y-4 sm:opacity-0 sm:group-data-[active=true]:translate-y-0 sm:group-data-[active=true]:opacity-100 motion-safe:sm:transition-[opacity,transform] motion-safe:sm:duration-400 motion-safe:sm:ease-out"
        >
          <span className="block text-lg font-medium tracking-tight text-ink-on-inverted">
            {service.name}
          </span>
          <span className="mt-3 block space-y-1.5 border-t border-white/20 pt-3">
            {service.proofs.map((proof) => (
              <span key={proof} className="block text-sm leading-6 text-white/85">
                {proof}
              </span>
            ))}
          </span>
        </span>
      </a>
    </li>
  );
}

/**
 * The hero's three service cards: one per lens, each carrying a short
 * list of work proof. `HeroCardGroupContext` is the single source of
 * truth (2026-07-26): `activeId` defaults to the first service
 * (Branding) whenever nothing is hovered/focused, and every card reads
 * `isActive`/`playing` from it — driving BOTH the sliding expand/collapse
 * (`data-active` → `flex-grow`, 500ms, the site's premium ease) and
 * which card's MediaCycler is allowed to advance (450ms crossfade).
 * Hovering/focusing Websites or AI Automation pauses Branding completely
 * (not just visually) and takes over the same transition; releasing
 * returns to Branding calmly. On touch/mobile the cards stack and the
 * proof is always visible; nothing is hover-gated.
 */
export default function ServiceCards({ services }: ServiceCardsProps) {
  const { rootRef, state, Provider } = useHeroCardGroupProvider(services[0]?.id ?? "");

  return (
    <Provider value={state}>
      <ul
        id="hero-cards"
        ref={rootRef}
        className="flex flex-col gap-4 sm:h-[26rem] sm:flex-row lg:h-[30rem]"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </ul>
    </Provider>
  );
}
