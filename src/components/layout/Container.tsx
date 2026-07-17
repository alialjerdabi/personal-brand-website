interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Shared horizontal container that keeps every section aligned
 * to the same reading width (see creative-direction.md, Layout Philosophy).
 */
export default function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div id={id} className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
