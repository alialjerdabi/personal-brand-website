"use client";

import { useEffect } from "react";

const SCOPE_CLASS = "services-smooth-scroll";

/**
 * Scopes native smooth anchor-scrolling to just the Services page
 * (2026-07-20, Ali's direction). The homepage deliberately avoids
 * scroll-behavior: smooth (see globals.css, "No CSS smooth scrolling"
 * — verified 2026-07-15 that multi-second glides on a long document
 * are worse UX than instant jumps); this page's chapter-to-chapter
 * distances are short enough that native smooth scroll reads as calm
 * and quick instead.
 *
 * Deliberately minimal: this only ever toggles a class while mounted.
 * The actual scroll-behavior rule lives in globals.css, gated inside
 * a `prefers-reduced-motion: no-preference` media query — so reduced-
 * motion users get the browser's native instant jump with no JS
 * branching required. Nothing here intercepts anchor clicks, so the
 * existing <a href="#slug"> links, URL hash history, and native
 * focus-on-target accessibility behavior are all completely untouched.
 * scroll-padding-top / scroll-mt-16 (already in place) continue to
 * provide the top offset for both instant and smooth navigation.
 */
export default function SmoothAnchorScroll() {
  useEffect(() => {
    document.documentElement.classList.add(SCOPE_CLASS);
    return () => {
      document.documentElement.classList.remove(SCOPE_CLASS);
    };
  }, []);

  return null;
}
