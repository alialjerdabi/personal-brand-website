"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeToPointer(onChange: () => void) {
  const fine = window.matchMedia(FINE_POINTER);
  const still = window.matchMedia(REDUCED);
  fine.addEventListener("change", onChange);
  still.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    still.removeEventListener("change", onChange);
  };
}

function readPointer() {
  return window.matchMedia(FINE_POINTER).matches && !window.matchMedia(REDUCED).matches;
}

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  fieldStrength?: number;
}

/**
 * Seeded PRNG (mulberry32). The component's own source seeds particles
 * with `Math.random()` inside a memo, which is impure during render —
 * React can re-run it and get a different field, and the layout would
 * differ between server and client. A fixed seed makes the scatter
 * deterministic and the memo genuinely pure.
 */
function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Particle {
  t: number;
  speed: number;
  mx: number;
  my: number;
  mz: number;
  cx: number;
  cy: number;
  cz: number;
  randomRadiusOffset: number;
}

/**
 * React Bits' Antigravity, typed and wired to this page.
 *
 * Particles rest scattered until the pointer comes near, then gather into
 * a wavering ring around it and fall back when it leaves. The maths is
 * the component's own; what changed is types, and reading the pointer
 * from the window rather than from the canvas — the canvas sits behind
 * the page with pointer-events off, so it never receives events of its
 * own.
 */
function Field({
  count = 300,
  magnetRadius = 9,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.5,
  lerpSpeed = 0.06,
  color = "#945d00",
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0.05,
  depthFactor = 1,
  pulseSpeed = 3,
  fieldStrength = 10,
}: AntigravityProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastPointer = useRef({ x: 0, y: 0 });
  const lastMoved = useRef(0);
  const virtual = useRef({ x: 0, y: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  // The canvas is pointer-events:none, so track the window instead.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const width = viewport.width || 100;
    const height = viewport.height || 100;
    const random = makeRandom(0x5eed1234);
    return Array.from({ length: count }, () => {
      const x = (random() - 0.5) * width;
      const y = (random() - 0.5) * height;
      const z = (random() - 0.5) * 20;
      return {
        t: random() * 100,
        speed: 0.01 + random() / 200,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset: (random() - 0.5) * 2,
      };
    });
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const v = state.viewport;
    const m = pointer.current;

    const moved = Math.hypot(m.x - lastPointer.current.x, m.y - lastPointer.current.y);
    if (moved > 0.001) {
      lastMoved.current = Date.now();
      lastPointer.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMoved.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time) * (v.height / 4);
    }

    virtual.current.x += (destX - virtual.current.x) * 0.05;
    virtual.current.y += (destY - virtual.current.y) * 0.05;

    const targetX = virtual.current.x;
    const targetY = virtual.current.y;
    const spin = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, index) => {
      particle.t += particle.speed / 2;
      const { t, mx, my, mz, cz, randomRadiusOffset } = particle;

      const projection = 1 - cz / 50;
      const px = targetX * projection;
      const py = targetY * projection;

      const dx = mx - px;
      const dy = my - py;
      const distance = Math.hypot(dx, dy);

      let tx = mx;
      let ty = my;
      let tz = mz * depthFactor;

      if (distance < magnetRadius) {
        const angle = Math.atan2(dy, dx) + spin;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const radius = ringRadius + wave + deviation;

        tx = px + radius * Math.cos(angle);
        ty = py + radius * Math.sin(angle);
        tz = mz * depthFactor + Math.sin(t) * waveAmplitude * depthFactor;
      }

      particle.cx += (tx - particle.cx) * lerpSpeed;
      particle.cy += (ty - particle.cy) * lerpSpeed;
      particle.cz += (tz - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(px, py, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const toPointer = Math.hypot(particle.cx - px, particle.cy - py);
      const fromRing = Math.abs(toPointer - ringRadius);
      const nearness = Math.max(0, Math.min(1, 1 - fromRing / 10));
      const scale =
        nearness * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;

      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      {/* Transparent so the field sits under the page rather than on it —
          part of dialling the effect back per Ali's note. */}
      <meshBasicMaterial color={color} transparent opacity={0.62} />
    </instancedMesh>
  );
}

/**
 * The cursor field, fixed behind the whole page.
 *
 * Mounted only for devices with a fine pointer and only when motion is
 * allowed: the effect is entirely a response to a cursor, so on a phone
 * it would cost a WebGL context, three.js and a render loop to display
 * nothing. Deciding that after mount rather than at import keeps the
 * server and client markup identical.
 */
export default function Antigravity(props: AntigravityProps) {
  /*
   * `useSyncExternalStore` rather than reading the media queries into
   * state from an effect: this is exactly the "subscribe to something
   * outside React" case it exists for. It also keeps the server snapshot
   * explicit — false, so nothing 3D is ever server-rendered — and picks
   * up a visitor who turns reduced motion on while the page is open.
   */
  const enabled = useSyncExternalStore(subscribeToPointer, readPointer, () => false);

  if (!enabled) return null;

  return (
    /*
      Above the page, not behind it. Sections here paint solid grounds, so
      a field at z-0 would be covered everywhere. `multiply` lets the
      capsules read as ink laid onto the cream and all but vanish over the
      dark contact panel — and it keeps them under the nav, which sits at
      z-40.
    */
    <div
      data-cursor-field
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 mix-blend-multiply"
    >
      {/*
        pointer-events is set INLINE, on both the wrapper and the canvas
        element itself. It inherits, so `none` on the fixed parent ought to
        be enough — but React Three Fiber re-enables it on its own div and
        on the canvas, which turned this into a full-page click-eater at
        z-20: measured, elementFromPoint over the hero's call to action
        returned CANVAS instead of the link. Inline beats any stylesheet,
        and the field reads the pointer from `window`, so it never needed
        events of its own.
      */}
      <Canvas
        style={{ pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "none";
        }}
        camera={{ position: [0, 0, 50], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Field {...props} />
      </Canvas>
    </div>
  );
}
