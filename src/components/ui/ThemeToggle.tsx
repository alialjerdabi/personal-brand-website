"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  applyTheme,
  getCurrentTheme,
  getStoredTheme,
  getSystemTheme,
  THEME_CHANGE_EVENT,
  type Theme,
} from "@/lib/theme";

interface ThemeToggleProps {
  className?: string;
}

/**
 * `useSyncExternalStore` is the correct primitive here — the "current
 * theme" genuinely lives outside React (a DOM attribute set by
 * layout.tsx's inline bootstrap script before hydration, and by
 * `applyTheme` afterward). It gives the SSR-safe "light" default on
 * the server and first client render (matching what the server had no
 * way to know), then corrects to the real value right after hydration
 * — without the "setState inside an effect" anti-pattern a plain
 * useEffect+useState version would need.
 */
function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (getStoredTheme()) return; // an explicit choice always wins
    applyTheme(getSystemTheme(), false); // dispatches THEME_CHANGE_EVENT below
  };
  media.addEventListener("change", onSystemChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => {
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getServerSnapshot(): Theme {
  return "light";
}

/**
 * Two-state, system-first toggle (2026-07-23, Ali's direction): follows
 * the OS preference until clicked once, then remembers the explicit
 * choice from then on. The actual theme is already applied before this
 * component ever mounts (see layout.tsx's inline bootstrap script) —
 * this only reads that state to render the right icon and to flip it.
 *
 * Also reacts live to OS-level scheme changes when the visitor has
 * never explicitly toggled (no stored choice) — matches "respect
 * system theme" as an ongoing state, not just a one-time default.
 */
export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getCurrentTheme, getServerSnapshot);

  const toggle = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark", true);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === "dark"}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {theme === "dark" ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4L17 17M7 7 5.6 5.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
