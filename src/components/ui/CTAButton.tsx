import Link from "next/link";
import type { CallToAction } from "@/data/homepage";

interface CTAButtonProps {
  cta: CallToAction;
  variant?: "primary" | "secondary" | "inverted";
  size?: "md" | "sm";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2";

const sizeClasses = {
  md: "h-12 px-6 text-base",
  sm: "h-9 px-4 text-sm",
} as const;

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
export default function CTAButton({ cta, variant = "primary", size = "md" }: CTAButtonProps) {
  return (
    <Link
      href={cta.href}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {cta.label}
    </Link>
  );
}
