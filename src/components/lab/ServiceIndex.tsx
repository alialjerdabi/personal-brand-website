import Reveal from "@/components/ui/Reveal";
import type { LabContent } from "@/data/lab";

/**
 * The one light section on the page — a hard cut out of the dark work
 * sequence. That change of ground is the divider; there is no rule
 * between the two sections because none is needed.
 *
 * Three services, not seven. Each leads with the business outcome rather
 * than the deliverable, because the person reading is deciding whether
 * they have a problem worth paying to fix, not shopping for a discipline.
 */
export default function ServiceIndex({ services }: { services: LabContent["services"] }) {
  return (
    <section
      id="services"
      aria-labelledby="lab-services-heading"
      className="scroll-mt-8 bg-lab-paper px-6 pb-24 pt-24 text-lab-paper-ink sm:px-10 sm:pb-32 sm:pt-32"
    >
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-lab-paper-muted">
          {services.label}
        </p>
      </Reveal>
      <Reveal delay={70}>
        <h2
          id="lab-services-heading"
          className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
        >
          {services.heading}
        </h2>
      </Reveal>

      <div className="mt-16 sm:mt-24">
        {services.items.map((service, index) => (
          <Reveal key={service.index} delay={index * 80}>
            <div className="border-t border-lab-paper-rule py-10 sm:py-14">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-baseline gap-5 lg:col-span-5">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-accent">
                    {service.index}
                  </span>
                  <h3 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                    {service.name}
                  </h3>
                </div>

                <p className="text-xl leading-9 tracking-tight text-lab-paper-ink/80 lg:col-span-6 lg:col-start-7 sm:text-2xl sm:leading-10">
                  {service.outcome}
                </p>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 lg:ml-[41.666%] lg:mt-6">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] uppercase tracking-[0.24em] text-lab-paper-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
