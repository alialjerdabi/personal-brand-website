/**
 * Homepage content.
 *
 * All homepage copy lives here, separated from components,
 * so it can later be sourced from a CMS, database, or AI tooling
 * without touching the UI (see docs/engineering-standards.md).
 */

export interface CallToAction {
  label: string;
  href: string;
}

export interface ProblemContent {
  heading: string;
  description: string;
  points: string[];
}

export interface Solution {
  title: string;
  description: string;
  outcome: string;
}

export interface SolutionsContent {
  heading: string;
  description: string;
  items: Solution[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
}

export interface ProjectsContent {
  heading: string;
  description: string;
  items: Project[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessContent {
  heading: string;
  description: string;
  steps: ProcessStep[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsContent {
  heading: string;
  description: string;
  items: Testimonial[];
}

export interface FinalCtaContent {
  heading: string;
  description: string;
  cta: CallToAction;
}

export interface HomepageContent {
  problem: ProblemContent;
  solutions: SolutionsContent;
  projects: ProjectsContent;
  process: ProcessContent;
  testimonials: TestimonialsContent;
  finalCta: FinalCtaContent;
}

export const homepageContent: HomepageContent = {
  problem: {
    heading: "Effort is rarely the problem. Disconnection is.",
    description:
      "Most businesses don't struggle because they lack effort. They struggle because branding, marketing, websites, and operations work independently instead of toward the same business goal.",
    points: [
      "A brand that says one thing while the website says another.",
      "A website that looks good but doesn't generate qualified enquiries.",
      "Operations that absorb time which should go into growth.",
      "Marketing, design, and technology decisions made in isolation.",
    ],
  },

  solutions: {
    heading: "Connected systems, not isolated services.",
    description:
      "Branding, websites, and AI automation are not separate services. Each one strengthens the others as part of a larger business growth strategy.",
    items: [
      {
        title: "Branding",
        description:
          "A brand built to earn the trust of business decision makers — positioning, identity, and messaging that communicate credibility before creativity.",
        outcome: "Increased trust and clearer positioning.",
      },
      {
        title: "Websites",
        description:
          "A digital presence designed around one journey: understand the problem, build trust, and book a discovery call. Premium through clarity, not decoration.",
        outcome: "More qualified enquiries and conversions.",
      },
      {
        title: "AI Automation",
        description:
          "Business systems that remove repetitive work and connect your tools, so your team spends time on growth instead of operations.",
        outcome: "Time saved and lower operational cost.",
      },
    ],
  },

  projects: {
    heading: "Selected work.",
    description:
      "Each project demonstrates how connected systems create better business outcomes.",
    // Placeholder entries — replace with real case studies (see docs/project-brief.md, Long-Term Vision).
    items: [
      {
        title: "Case study coming soon",
        category: "Branding & Website",
        description:
          "A detailed case study documenting the business challenge, the connected-systems approach, and the measurable outcome.",
      },
      {
        title: "Case study coming soon",
        category: "AI Automation",
        description:
          "A detailed case study documenting the business challenge, the connected-systems approach, and the measurable outcome.",
      },
      {
        title: "Case study coming soon",
        category: "Brand Strategy",
        description:
          "A detailed case study documenting the business challenge, the connected-systems approach, and the measurable outcome.",
      },
    ],
  },

  process: {
    heading: "A process built around your business, not deliverables.",
    description:
      "Every engagement starts with the business goal and works backwards to the systems that support it.",
    steps: [
      {
        title: "Discover",
        description:
          "Understand your business, your customers, and where growth is currently blocked.",
      },
      {
        title: "Define the strategy",
        description:
          "Align branding, digital presence, and operations around one clear business goal.",
      },
      {
        title: "Design & build",
        description:
          "Craft the brand, website, and automation systems that execute the strategy.",
      },
      {
        title: "Launch & improve",
        description:
          "Measure what matters — enquiries, conversions, time saved — and refine continuously.",
      },
    ],
  },

  testimonials: {
    heading: "What partners say.",
    description:
      "Long-term client relationships are the real measure of this work.",
    // Placeholder entries — replace with real client testimonials before launch.
    items: [
      {
        quote:
          "Client testimonial coming soon — a short, specific statement about the business outcome of the partnership.",
        author: "Client name",
        role: "Role, Company",
      },
      {
        quote:
          "Client testimonial coming soon — a short, specific statement about the business outcome of the partnership.",
        author: "Client name",
        role: "Role, Company",
      },
    ],
  },

  finalCta: {
    heading: "Let's align your brand, website, and systems around growth.",
    description:
      "A discovery call is a conversation about your business goals — not a sales pitch. We'll identify where connected systems can create the most impact.",
    cta: { label: "Book a Discovery Call", href: "#contact" },
  },
};
