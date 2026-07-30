/**
 * The one number the loader and the landing composition must agree on.
 *
 * The hero's entrance begins slightly BEFORE the loader has finished
 * fading, so the statement is already rising as the overlay clears —
 * the loader resolves into the page rather than cutting to it. Kept
 * here rather than duplicated as two literals, because the seam is
 * invisible when correct and very visible when it drifts.
 */
export const HERO_ENTRANCE_DELAY_S = 1.95;
