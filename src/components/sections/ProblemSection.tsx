import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProblemContent } from "@/data/homepage";

interface ProblemSectionProps {
  content: ProblemContent;
}

export default function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="bg-zinc-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="problem-heading"
          heading={content.heading}
          description={content.description}
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {content.points.map((point) => (
            <li
              key={point}
              className="rounded-lg border border-zinc-200/80 bg-white p-6 text-base leading-7 text-zinc-700 shadow-sm shadow-zinc-900/[0.03]"
            >
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
