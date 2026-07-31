import type { Metadata } from "next";
import HeroScreen from "@/components/lab/HeroScreen";
import StackShowcase from "@/components/lab/StackShowcase";
import PixelTrail from "@/components/lab/PixelTrail";
import StatsBand from "@/components/lab/StatsBand";
import ProjectMosaic from "@/components/lab/ProjectMosaic";
import ServiceIndex from "@/components/lab/ServiceIndex";
import Testimonials from "@/components/lab/Testimonials";
import NotesSection from "@/components/lab/NotesSection";
import ContactClose from "@/components/lab/ContactClose";
import { labContent } from "@/data/lab";

export const metadata: Metadata = {
  title: "Ali Aljardabi — Brand, Web & Product Design",
  description:
    "Brand identity, websites, and digital products for small and growing businesses.",
};

/**
 * The prototype homepage.
 *
 * Sits outside the (site) route group deliberately: it composes its own
 * chrome and its own ending, and must not inherit the shipped site's
 * footer or positioning while it is being reviewed.
 *
 * Order is a selling order, not a storytelling one — say it, show it,
 * prove it, explain it, then ask. The showcase sits directly under the
 * hero so the work is on screen before any claim about it, and the
 * proof sections (stats, testimonials) sit between the work and the
 * services so the visitor is already convinced by the time they read
 * what is for sale.
 *
 * StatsBand and Testimonials render nothing while their data is empty,
 * which is the current state — see the comments in data/lab.ts.
 */
export default function LabPage() {
  return (
    <main id="main">
      <PixelTrail />
      <HeroScreen content={labContent} />
      <StackShowcase content={labContent} />
      <ProjectMosaic content={labContent} />
      <StatsBand stats={labContent.stats} />
      <Testimonials testimonials={labContent.testimonials} />
      <ServiceIndex services={labContent.services} />
      <NotesSection notes={labContent.notes} />
      <ContactClose content={labContent} />
    </main>
  );
}
