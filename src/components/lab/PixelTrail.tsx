"use client";

import { useEffect, useRef } from "react";

interface PixelTrailProps {
  /** Cell size in CSS pixels — the grain of the trail. */
  cell?: number;
  /** How long a lit cell takes to fade, in ms. */
  maxAge?: number;
  color?: string;
  /** Peak alpha of a freshly lit cell. */
  strength?: number;
}

/**
 * A pixel trail that follows the cursor across the whole page.
 *
 * This is the React Bits PixelTrail effect rebuilt on a 2D canvas. The
 * original renders a full-screen WebGL quad and needs three,
 * @react-three/fiber and @react-three/drei — roughly 27MB installed and
 * ~180KB gzipped shipped — to draw fading squares on a grid. That is a
 * lot of machinery for something a canvas does in a few lines, on a site
 * whose pitch includes being fast, and the brief for this project
 * explicitly reserves 3D for a moment that materially needs it.
 *
 * Behaviour matches the original's model: a grid of cells, each holding
 * an age; the pointer lights the cell under it (and interpolates across
 * fast movements so quick gestures don't leave gaps); every frame ages
 * the live cells and redraws only those.
 *
 * `mix-blend-mode: multiply` is what lets one fixed canvas sit over the
 * entire document — sections here have solid grounds, so a trail behind
 * them would be invisible. Multiply tints the pale grounds and all but
 * disappears over dark panels, which is the right behaviour in both
 * places.
 *
 * Skipped entirely for reduced motion and for anything without a fine
 * pointer: on a phone there is no cursor to trail, so the work would be
 * done for nothing.
 */
export default function PixelTrail({
  cell = 26,
  maxAge = 620,
  color = "#ffd84d",
  strength = 0.85,
}: PixelTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let ages: Float32Array = new Float32Array(0);
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      ages = new Float32Array(columns * rows);
    };

    resize();

    let frame = 0;
    let previous = 0;

    const light = (x: number, y: number) => {
      const column = Math.floor(x / cell);
      const row = Math.floor(y / cell);
      if (column < 0 || row < 0 || column >= columns || row >= rows) return;
      ages[row * columns + column] = maxAge;
    };

    /*
     * The loop only exists while something is lit. A full-page canvas
     * under `mix-blend-mode: multiply` forces the compositor to reblend
     * the viewport on every frame it changes, so leaving a permanent rAF
     * running would charge that for a still cursor — the whole time the
     * visitor is reading. Idle costs nothing; the next pointer move
     * starts it again.
     */
    const wake = () => {
      if (frame) return;
      previous = performance.now();
      frame = requestAnimationFrame(render);
    };

    let lastX: number | null = null;
    let lastY: number | null = null;

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      // Interpolate across the gap since the last event, so a fast flick
      // leaves a continuous trail rather than a dotted line.
      if (lastX !== null && lastY !== null) {
        const dx = x - lastX;
        const dy = y - lastY;
        const steps = Math.min(24, Math.floor(Math.hypot(dx, dy) / (cell * 0.5)));
        for (let step = 1; step <= steps; step += 1) {
          light(lastX + (dx * step) / steps, lastY + (dy * step) / steps);
        }
      }

      light(x, y);
      lastX = x;
      lastY = y;
      wake();
    };

    function render(now: number) {
      const delta = now - previous;
      previous = now;

      context!.clearRect(0, 0, width, height);
      context!.fillStyle = color;

      let live = 0;

      for (let index = 0; index < ages.length; index += 1) {
        const age = ages[index];
        if (age <= 0) continue;

        const next = age - delta;
        ages[index] = next > 0 ? next : 0;

        const life = next > 0 ? next / maxAge : 0;
        if (life <= 0) continue;

        live += 1;
        context!.globalAlpha = life * life * strength;
        const column = index % columns;
        const row = (index - column) / columns;
        context!.fillRect(column * cell, row * cell, cell, cell);
      }

      context!.globalAlpha = 1;

      if (live === 0) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(render);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
    };
  }, [cell, maxAge, color, strength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 mix-blend-multiply"
    />
  );
}
