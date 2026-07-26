"use client";

import { createContext, useContext, useEffect, useRef, useState, type Context } from "react";

export interface ActiveCardGroupState {
  activeId: string;
  /** False whenever autoplay should be paused — out of view, or (if enabled) the tab is hidden. */
  visible: boolean;
  setHoveredId: (id: string | null) => void;
}

export interface ActiveCardGroupOptions {
  /** Additionally pause while the browser tab is hidden. Off by default so existing consumers are unaffected. */
  pauseOnTabHidden?: boolean;
}

/**
 * Shared "which one card is playing" state machine (2026-07-26) —
 * generalized from WorkGridContext.tsx (built 2026-07-25 for the
 * homepage/work project grid) so the Hero's service cards can follow
 * the exact same rules instead of a second, drifting implementation:
 * exactly one card is active at a time; `defaultId` plays whenever
 * nothing else is hovered/focused and the group is in the viewport;
 * hovering or focusing a different card takes over immediately
 * (pausing the previous card completely, not just visually collapsing
 * it) and reverts the instant that ends; leaving the viewport pauses
 * everything, including the default. Each call site creates its own
 * Context via `createActiveCardGroupContext()` so unrelated groups
 * never share state.
 */
export function createActiveCardGroupContext() {
  return createContext<ActiveCardGroupState | null>(null);
}

export function useActiveCardGroupProvider<T extends HTMLElement = HTMLElement>(
  context: Context<ActiveCardGroupState | null>,
  defaultId: string,
  options: ActiveCardGroupOptions = {}
) {
  const { pauseOnTabHidden = false } = options;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [intersecting, setIntersecting] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef<T | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pauseOnTabHidden) return;
    const handleVisibilityChange = () => setTabVisible(!document.hidden);
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pauseOnTabHidden]);

  const state: ActiveCardGroupState = {
    activeId: hoveredId ?? defaultId,
    visible: intersecting && tabVisible,
    setHoveredId,
  };

  return { rootRef, state, Provider: context.Provider };
}

export function useActiveCard(context: Context<ActiveCardGroupState | null>, id: string) {
  const ctx = useContext(context);
  if (!ctx) {
    // Outside a provider (shouldn't happen in practice) — fail safe to
    // a static, non-animating card rather than throwing or risking
    // multiple cards animating at once with no shared arbiter.
    return { isActive: false, playing: false, setHovered: () => {} };
  }
  const isActive = ctx.activeId === id;
  return {
    /** Drives visible layout (expanded width, revealed proof panel) — independent of viewport/tab gating, so focus/hover state alone decides it, same as the CSS it replaces. */
    isActive,
    /** Drives autoplay specifically — `isActive` AND the group is actually visible. */
    playing: ctx.visible && isActive,
    setHovered: (isHovered: boolean) => ctx.setHoveredId(isHovered ? id : null),
  };
}
