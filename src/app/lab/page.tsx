import type { Metadata } from "next";
import HeroScreen from "@/components/lab/HeroScreen";
import ProjectMosaic from "@/components/lab/ProjectMosaic";
import ServiceIndex from "@/components/lab/ServiceIndex";
import ContactClose from "@/components/lab/ContactClose";
import { labContent } from "@/data/lab";

export const metadata: Metadata = {
  title: "Ali Aljardabi — Brand, Web & Product Design",
  description:
    "Brand identity, websites, and digital products for small and growing businesses.",
};

/**
 * The lobby direction prototype.
 *
 * Sits outside the (site) route group deliberately: it composes its own
 * chrome and its own ending, and must not inherit the shipped site's
 * footer or positioning while it is being reviewed.
 *
 * Structure — a locked opening screen that is almost entirely work, then
 * the page opens: a hard cut to light for the three services, then dark
 * again to close on the contact. The change of ground is the section
 * divider; there are no rules between sections, only within them.
 */
export default function LabPage() {
  return (
    <main id="main">
      <HeroScreen content={labContent} />
      <ProjectMosaic content={labContent} />
      <ServiceIndex services={labContent.services} />
      <ContactClose content={labContent} />
    </main>
  );
}
