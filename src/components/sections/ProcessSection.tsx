import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProcessContent } from "@/data/homepage";

interface ProcessSectionProps {
  content: ProcessContent;
}

export default function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="process-heading"
          heading={content.heading}
          description={content.description}
        />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm font-semibold tracking-wide text-zinc-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-zinc-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
