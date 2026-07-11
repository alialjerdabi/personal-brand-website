import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SolutionsContent } from "@/data/homepage";

interface SolutionsSectionProps {
  content: SolutionsContent;
}

export default function SolutionsSection({ content }: SolutionsSectionProps) {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="solutions-heading"
          heading={content.heading}
          description={content.description}
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {content.items.map((solution) => (
            <article key={solution.title}>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-950">{solution.title}</h3>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                {solution.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-zinc-950">
                {solution.outcome}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
