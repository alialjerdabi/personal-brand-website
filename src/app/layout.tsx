import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali — Branding, Websites & AI Automation for Business Growth",
  description:
    "Strategic partner for corporate businesses, technology companies, and luxury brands. Connecting branding, digital presence, and AI systems into one growth strategy.",
};

/**
 * Theme bootstrap (2026-07-23): sets `data-theme` on <html> synchronously,
 * before first paint — the standard no-flash pattern. Runs as a blocking
 * inline script (not a React effect, which would only run post-hydration,
 * well after paint) so there is never a light→dark or dark→light flash on
 * load. Order: explicit choice in localStorage, else the OS preference —
 * mirrors the read side of useTheme.ts exactly. `suppressHydrationWarning`
 * on <html> is expected and correct here: the server always renders no
 * attribute (it can't know the client's stored preference or OS setting),
 * and this script changes it before React hydrates.
 */
const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibstedGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
