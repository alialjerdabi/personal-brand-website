import SiteFooter from "@/components/layout/SiteFooter";
import { footerContent } from "@/data/footer";

/**
 * Chrome for the shipped site (the Growth System direction). The shared
 * footer moved here from the root layout so that experimental routes
 * outside this group — currently /lab, the Mask direction prototype —
 * compose their own ending instead of inheriting this one. Route paths
 * are unchanged: a route group is a naming device, not a URL segment.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SiteFooter content={footerContent} />
    </>
  );
}
