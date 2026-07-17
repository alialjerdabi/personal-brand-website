import MediaCycler from "@/components/ui/MediaCycler";
import type { HeroService } from "@/data/hero";

interface ServiceCardsProps {
  services: HeroService[];
}

/**
 * The hero's three service cards: one per lens, each carrying a short
 * list of work proof. On desktop, hovering or focusing a card slides it
 * wider while its neighbors give way, and the proof list rises in —
 * pure CSS (hover/focus-within), so no JS state and full keyboard
 * parity. While the row is untouched, the FIRST card rests in the
 * expanded state (see globals.css #hero-cards rules) so the row is
 * never dead. Card media cycles via MediaCycler; single-frame cards
 * stay still until assets arrive. On touch/mobile the cards stack and
 * the proof is always visible; nothing is hover-gated.
 */
export default function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <ul id="hero-cards" className="flex flex-col gap-4 sm:h-[26rem] sm:flex-row lg:h-[30rem]">
      {services.map((service, index) => (
        <li
          key={service.id}
          className="group relative min-w-0 overflow-hidden rounded-2xl bg-zinc-900 sm:flex-[1_1_0%] sm:hover:flex-[1.9_1_0%] sm:focus-within:flex-[1.9_1_0%] motion-safe:sm:transition-[flex-grow] motion-safe:sm:duration-500 motion-safe:sm:ease-out"
        >
          <a
            href={service.href}
            aria-label={`${service.name} — view the work`}
            className="relative block h-64 w-full sm:h-full focus-visible:outline-none"
          >
            <MediaCycler
              frames={service.media}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 100vw"
              className="absolute inset-0"
              pauseOnHover
              preloadFirst={index === 0}
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
              className="absolute bottom-5 left-4 hidden rotate-180 text-lg font-medium tracking-tight text-white [writing-mode:vertical-rl] sm:block motion-safe:transition-opacity motion-safe:duration-300 sm:group-hover:opacity-0 sm:group-focus-within:opacity-0"
            >
              {service.name}
            </span>

            {/* Expanded state: name + work proof rise in. */}
            <span
              data-card-panel
              className="absolute inset-x-0 bottom-0 block p-5 opacity-100 translate-y-0 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 motion-safe:sm:transition-[opacity,transform] motion-safe:sm:duration-400 motion-safe:sm:ease-out"
            >
              <span className="block text-lg font-medium tracking-tight text-white">
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
      ))}
    </ul>
  );
}
