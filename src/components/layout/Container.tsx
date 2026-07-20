interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** "wide" is an opt-in, page-scoped exception — see the Services page. */
  size?: "default" | "wide";
}

const MAX_WIDTH: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-5xl",
  wide: "max-w-7xl",
};

/**
 * Shared horizontal container that keeps every section aligned
 * to the same reading width (see creative-direction.md, Layout Philosophy).
 * `size="wide"` (2026-07-20) is a deliberate exception for pages that
 * need more editorial room than the site's default reading column —
 * every existing caller is unaffected since it defaults to "default".
 */
export default function Container({ children, className = "", id, size = "default" }: ContainerProps) {
  return (
    <div id={id} className={`mx-auto w-full ${MAX_WIDTH[size]} px-6 sm:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
