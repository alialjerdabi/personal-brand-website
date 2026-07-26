/**
 * Shared theme utilities (2026-07-23) — the read/write side of the
 * `data-theme` switch that the inline bootstrap script in layout.tsx
 * sets before first paint. Kept framework-free (no React) so both
 * ThemeToggle.tsx (needs React state, for its own icon) and
 * tension/ProblemReveal.tsx (no React state, just reads CSS variables
 * and listens for changes) can use it without either depending on the
 * other's concerns.
 */

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Dispatched on `window` whenever the active theme changes, with the new theme as `detail`. */
export const THEME_CHANGE_EVENT = "themechange";

export function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** The user's explicit choice, if they've ever toggled — null means "follow system." */
export function getStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

/** The theme actually applied to the document right now. */
export function getCurrentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/**
 * Applies a theme to the document and notifies listeners.
 * `persist: true` for an explicit user choice (the toggle); `false` for
 * a system-preference-driven update that shouldn't override a future
 * explicit choice's absence — i.e. it must stay overridable by the OS
 * again later, so it's never written to storage.
 */
export function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}
