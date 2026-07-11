import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { TestimonialsContent } from "@/data/homepage";

interface TestimonialsSectionProps {
  content: TestimonialsContent;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-zinc-50 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="testimonials-heading"
          heading={content.heading}
          description={content.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {content.items.map((testimonial, index) => (
            <figure
              key={`${testimonial.author}-${index}`}
              className="rounded-lg border border-zinc-200/80 bg-white p-8 shadow-sm shadow-zinc-900/[0.03]"
            >
              <blockquote className="text-lg leading-8 tracking-tight text-zinc-700">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-zinc-950">{testimonial.author}</p>
                <p className="text-sm text-zinc-500">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
