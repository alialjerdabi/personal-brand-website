import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import { homepageContent } from "@/data/homepage";
import { heroContent } from "@/data/hero";

export default function Home() {
  const { problem, solutions, projects, process, testimonials, finalCta } =
    homepageContent;

  return (
    <main>
      <HeroSection content={heroContent} />
      <ProblemSection content={problem} />
      <SolutionsSection content={solutions} />
      <ProjectsSection content={projects} />
      <ProcessSection content={process} />
      <TestimonialsSection content={testimonials} />
      <CTASection content={finalCta} />
    </main>
  );
}
