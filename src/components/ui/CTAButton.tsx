import Link from "next/link";
import type { CallToAction } from "@/data/homepage";

interface CTAButtonProps {
  cta: CallToAction;
  variant?: "primary" | "secondary" | "inverted";
  size?: "md" | "sm";
  /** Availability signal: a small live dot before the label. */
  dot?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-[color,background-color,border-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2";

const sizeClasses = {
  md: "h-12 px-6 text-base",
  sm: "h-9 px-4 text-sm",
} as const;

const variantClasses = {
  primary: "bg-foreground text-background shadow-sm shadow-foreground/10 hover:opacity-85",
  secondary:
    "border border-border-strong text-foreground hover:border-foreground hover:bg-foreground/[0.03]",
  // Deliberately theme-independent: this variant exists specifically
  // to sit on the site's always-dark "inverted" grounds (CTASection),
  // so it stays a light pill regardless of site theme, same as those
  // grounds' own --ink-on-inverted text.
  inverted: "bg-white text-zinc-950 hover:bg-zinc-100",
} as const;

/**
 * Confident, non-aggressive call to action
 * (see creative-direction.md, Calls to Action).
 */
export default function CTAButton({ cta, variant = "primary", size = "md", dot = false }: CTAButtonProps) {
  return (
    <Link
      href={cta.href}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
        />
      )}
      {cta.label}
    </Link>
  );
}
