import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProjectsContent } from "@/data/homepage";

interface ProjectsSectionProps {
  content: ProjectsContent;
}

export default function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-zinc-50 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="projects-heading"
          heading={content.heading}
          description={content.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {content.items.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="rounded-lg border border-zinc-200/80 bg-white p-6 shadow-sm shadow-zinc-900/[0.03]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {project.category}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-950">{project.title}</h3>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
