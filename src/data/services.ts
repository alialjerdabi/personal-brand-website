/**
 * Services page content (/services) — one section per discipline,
 * each explaining why it matters to the business and how the process
 * runs with clients (layout foundation adapted from the approved
 * symbolstudio.pl services reference, 2026-07-15). Copy is first-draft
 * voice; media rows are animated placeholders until assets arrive.
 */

export interface ServiceDetail {
  slug: string;
  name: string;
  scope: string[];
  /** The question the visitor is already asking themselves. */
  question: string;
  /** Why this discipline matters to the business. */
  importance: string;
  /** How the process runs with clients, in brief. */
  approach: string;
}

export interface ServicesPageContent {
  identity: string;
  navCta: { label: string; href: string };
  heading: string;
  intro: string;
  navLabel: string;
  scopeLabel: string;
  assetLabel: string;
  backLabel: string;
  services: ServiceDetail[];
}

export const servicesPageContent: ServicesPageContent = {
  identity: "Ali Aljardabi.",
  navCta: { label: "Book a Call", href: "/#contact" },
  heading: "We advise. We define. We build.",
  intro:
    "Seven disciplines, one direction. Each service exists to move a business goal — and each one strengthens the others.",
  navLabel: "Navigation",
  scopeLabel: "Scope of work",
  assetLabel: "[ asset ]",
  backLabel: "Back to home",
  services: [
    {
      slug: "consulting",
      name: "Consulting",
      scope: [
        "Current-state analysis",
        "Identifying brand and business problems",
        "Defining needs and priorities",
        "Planning the roadmap",
      ],
      question:
        "How many opportunities has your business missed for lack of a clear plan?",
      importance:
        "Consulting is the starting point for everything that follows. Before anything is designed or built, the business itself has to be understood — where growth is blocked, what the market believes, and which problems are actually worth solving. Skipping this step is how companies end up with beautiful work that changes nothing.",
      approach:
        "We listen first. A short series of working sessions maps your goals, your customers, and your current systems. You leave with a written diagnosis and a prioritized roadmap — useful on its own, and the foundation for any work that follows.",
    },
    {
      slug: "rebranding",
      name: "(Re)Branding",
      scope: [
        "Brand audit",
        "Identity design or redesign",
        "Voice & messaging",
        "Rollout guidelines",
      ],
      question: "Does your brand still say what your business has become?",
      importance:
        "Businesses outgrow their brands quietly. The offer matures, the clients get bigger — and the identity keeps telling last year's story. A brand that lags the business costs trust in exactly the rooms where trust decides: proposals, pitches, first visits.",
      approach:
        "We audit what the brand says today against what the business needs it to say, then rebuild the identity as one system — mark, voice, and guidelines — so every touchpoint a decision maker sees tells the same story. Rollout is planned with your team, not thrown over the wall.",
    },
    {
      slug: "strategy-positioning",
      name: "Strategy & positioning",
      scope: [
        "Market & competitor analysis",
        "Positioning",
        "Target segmentation",
        "Communication strategy",
      ],
      question: "When a client compares you to a competitor, what decides it?",
      importance:
        "Positioning is the argument your business makes before anyone speaks to you. Without a deliberate one, the market assigns you a default — usually 'one of several options, compare on price.' Strategy is how you choose the comparison you can win.",
      approach:
        "We define where you compete, who you serve first, and the one claim you can own — grounded in analysis, not taste. The result is a short strategy document your whole team can actually use: for the website, the sales deck, and every decision after.",
    },
    {
      slug: "web-app-design",
      name: "Web / App design",
      scope: [
        "UX architecture",
        "Interface design",
        "Design systems",
        "Build & launch",
      ],
      question: "Does your website earn enquiries, or just describe you?",
      importance:
        "A website is the one salesperson every prospect meets. Most are built as brochures — they describe the company and wait. A site designed around one journey, from first doubt to booked call, changes what the same traffic is worth.",
      approach:
        "We design the journey before the pages: what a visitor needs to believe, in what order, and what proof earns it. Then we build it — fast, accessible, and in code your business owns. The brand system carries through, so the site sounds like the company it sells.",
    },
    {
      slug: "ai-automated-systems",
      name: "AI automated systems",
      scope: [
        "Process mapping",
        "Enquiry handling & follow-up",
        "Workflow automation",
        "Internal tooling",
      ],
      question: "How many hours a week does your team spend on work a system could do?",
      importance:
        "Operations quietly absorb the time growth was supposed to get. The repetitive layer — enquiries, follow-ups, handovers, reporting — is now automatable, in your brand's own words. The businesses that do this first compound the advantage weekly.",
      approach:
        "We map your processes, find the hours with the highest return, and build automation that works inside the tools you already use. Everything speaks in the brand's voice, and everything reports back — so you can see the hours coming home.",
    },
    {
      slug: "marketing-production",
      name: "Marketing production",
      scope: [
        "Campaign assets",
        "Content systems",
        "Social kits",
        "Launch materials",
      ],
      question: "Does your marketing look like it comes from the same company every time?",
      importance:
        "Inconsistent marketing spends the brand instead of building it. When every campaign is invented from scratch, quality swings, costs climb, and recognition never compounds. Production built on a system makes every asset an instalment in the same story.",
      approach:
        "We turn the brand system into production kits — templates, rules, and reusable components — then produce the campaign and launch assets with them. Your team (or ours) can ship faster, and everything that ships looks unmistakably like you.",
    },
    {
      slug: "graphic-design",
      name: "Graphic design",
      scope: [
        "Print & collateral",
        "Presentation design",
        "Packaging",
        "Ongoing design support",
      ],
      question: "What do your proposals and presentations say before anyone reads them?",
      importance:
        "The unglamorous documents — proposals, decks, one-pagers, packaging — are where deals are actually decided. They're also where brands fall apart first. Craft at this layer signals what working with you will feel like.",
      approach:
        "We design the everyday materials with the same system and the same care as the website: presentation templates your team can maintain, collateral that survives print, and ongoing support when something new is needed fast.",
    },
  ],
};
