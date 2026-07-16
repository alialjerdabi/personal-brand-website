import EditorialIntro from "@/components/ui/EditorialIntro";
import HeroSection from "@/components/sections/HeroSection";
import SystemThread from "@/components/sections/hero/SystemThread";
import TensionSection from "@/components/sections/TensionSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import DemonstrationSection from "@/components/sections/DemonstrationSection";
import CTASection from "@/components/sections/CTASection";
import { heroContent } from "@/data/hero";
import { tensionContent } from "@/data/tension";
import { capabilitiesContent } from "@/data/capabilities";
import { demonstrationContent } from "@/data/demonstration";
import { finalCta } from "@/data/homepage";

/**
 * The homepage is one continuous story, not a stack of sections
 * (see docs/landing-experience.md): thesis → tension → demonstration
 * → invitation. Acts IV (method + partner) and the final Act V
 * treatment arrive in Phase 3 (docs/roadmap.md); CTASection stands in
 * for the invitation until then.
 */
export default function Home() {
  return (
    <main id="main">
      <EditorialIntro intro={heroContent.intro} />
      {/*
        Acts I–II share one wrapper: the hero's system row (SystemThread)
        is sticky within it — the L-cut. It docks at the viewport top
        while the story plays and releases when this wrapper ends.
      */}
      <div className="relative">
        <HeroSection content={heroContent} />
        <SystemThread status={heroContent.status} />
        <TensionSection content={tensionContent} />
      </div>
      <CapabilitiesSection content={capabilitiesContent} />
      <DemonstrationSection content={demonstrationContent} />
      <CTASection content={finalCta} />
    </main>
  );
}
