import Reveal from "@/components/ui/Reveal";
import type { LabContent, LabPalette } from "@/data/lab";

/** Whole class strings, not interpolated fragments, so Tailwind sees them. */
const FIELD: Record<LabPalette, string> = {
  orange: "bg-lab-orange text-black",
  blue: "bg-lab-blue text-white",
  lime: "bg-lab-lime text-black",
  violet: "bg-lab-violet text-white",
  cream: "bg-lab-cream text-black",
};

/**
 * Three services as three full-bleed colour fields, carrying the lobby's
 * mosaic down the page.
 *
 * Not a list with rules between the rows: each service is a ground of its
 * own, so the section reads at a glance from across a room and a visitor
 * knows there are exactly three things on offer before reading one word
 * of them. Each leads with the business outcome rather than the
 * deliverable, because the person reading is deciding whether they have a
 * problem worth paying to fix.
 */
export default function ServiceIndex({ services }: { services: LabContent["services"] }) {
  return (
    <section
      id="services"
      aria-labelledby="lab-services-heading"
      className="scroll-mt-2 bg-lab-ground"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-6 pb-6 pt-16 sm:pb-8 sm:pt-24">
        <h2
          id="lab-services-heading"
          className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-lab-ink"
        >
          {services.heading}
        </h2>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {services.label}
        </p>
      </div>

      <div className="flex flex-col gap-px bg-lab-ground">
        {services.items.map((service, index) => (
          <Reveal key={service.index} delay={index * 70}>
            <article className={`${FIELD[service.palette]} px-6 py-10 sm:py-14`}>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {service.index}
                </span>
                <h3 className="text-[clamp(2rem,7vw,5.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">
                  {service.name}
                </h3>
              </div>

              <p className="mt-6 max-w-2xl text-[clamp(1.125rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight">
                {service.outcome}
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[10px] uppercase tracking-[0.24em] sm:text-[11px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
