import Reveal from "@/components/ui/Reveal";
import type { LabContent } from "@/data/lab";

/**
 * Client quotes.
 *
 * Renders nothing when `testimonials` is empty, which is its state until
 * Ali supplies quotes he actually has permission to publish, attributed
 * to real people. There is no placeholder state on purpose: a designed
 * "quote coming soon" card is fine for a project cover and dishonest
 * here, because the only thing a testimonial does is ask to be believed.
 */
export default function Testimonials({
  testimonials,
}: {
  testimonials: LabContent["testimonials"];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="lab-testimonials-heading"
      className="bg-lab-haze px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="lab-testimonials-heading"
            className="max-w-xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.035em] text-lab-ink-warm"
          >
            What it&rsquo;s like to work with me.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <figure className="flex h-full flex-col rounded-[1.6rem] border border-lab-hairline bg-white/70 p-8 shadow-[0_14px_44px_-30px_rgb(19_23_30/0.45)] sm:p-10">
                <blockquote className="font-display text-[clamp(1.1rem,1.8vw,1.375rem)] leading-relaxed text-lab-ink-warm">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-lab-hairline pt-5 font-display text-[15px]">
                  <span className="font-bold text-lab-ink-warm">{testimonial.name}</span>
                  <span className="text-lab-ink-soft"> — {testimonial.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
