"use client";

import dynamic from "next/dynamic";
import type { LanyardIdentity } from "@/components/lab/Lanyard";

/*
 * The badge is a WASM physics engine plus drei — the heaviest thing on the
 * site by a wide margin. Deferring it to the client, on this route only,
 * is what keeps the homepage from paying for it.
 *
 * This wrapper exists because `ssr: false` is not allowed from a Server
 * Component, and the /studio page is a server component so it can own its
 * metadata. The boundary is one file rather than pushing the whole page
 * client-side.
 */
const Lanyard = dynamic(() => import("@/components/lab/Lanyard"), {
  ssr: false,
  loading: () => null,
});

export default function LanyardStage({
  identity,
  hint,
}: {
  identity: LanyardIdentity;
  hint: string;
}) {
  return (
    <div className="relative h-[62svh] min-h-[26rem] overflow-hidden rounded-[1.5rem] bg-lab-card/60 ring-1 ring-lab-hairline">
      <Lanyard identity={identity} />
      <p className="pointer-events-none absolute inset-x-0 bottom-5 text-center font-display text-[13px] font-bold uppercase tracking-[0.14em] text-lab-ink-soft">
        {hint}
      </p>
    </div>
  );
}
