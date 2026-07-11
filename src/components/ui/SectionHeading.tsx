interface SectionHeadingProps {
  id?: string;
  heading: string;
  description?: string;
}

/**
 * Standard section intro: one clear message per section,
 * typography-first hierarchy (see creative-direction.md).
 */
export default function SectionHeading({ id, heading, description }: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <h2 id={id} className="text-3xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-8 text-zinc-600 sm:text-xl">{description}</p>
      )}
    </header>
  );
}
