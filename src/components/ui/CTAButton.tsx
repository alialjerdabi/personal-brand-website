import Link from "next/link";
import type { CallToAction } from "@/data/homepage";

interface CTAButtonProps {
  cta: CallToAction;
  variant?: "primary" | "secondary" | "inverted";
}

const baseClasses =
  "inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2";

const variantClasses = {
  primary:
    "bg-zinc-950 text-white shadow-sm shadow-zinc-950/10 hover:bg-zinc-800",
  secondary:
    "border border-zinc-300 text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950/[0.03]",
  inverted: "bg-white text-zinc-950 hover:bg-zinc-100",
} as const;

/**
 * Confident, non-aggressive call to action
 * (see creative-direction.md, Calls to Action).
 */
export default function CTAButton({ cta, variant = "primary" }: CTAButtonProps) {
  return (
    <Link href={cta.href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {cta.label}
    </Link>
  );
}
