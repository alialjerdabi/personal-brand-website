interface ServiceCopyProps {
  question: string;
  importance: string;
  approach: string;
  dark?: boolean;
  className?: string;
}

/**
 * Question heading + the two supporting paragraphs (why it matters,
 * how it runs) — same type scale everywhere; chapters vary its column
 * width and neighbors, never its own typography.
 */
export default function ServiceCopy({
  question,
  importance,
  approach,
  dark = false,
  className = "",
}: ServiceCopyProps) {
  return (
    <div className={className}>
      <h3
        className={`max-w-lg text-xl font-medium leading-snug tracking-tight sm:text-2xl ${
          dark ? "text-white" : "text-zinc-950"
        }`}
      >
        {question}
      </h3>
      <p className={`mt-6 max-w-xl text-base leading-7 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
        {importance}
      </p>
      <p className={`mt-4 max-w-xl text-base leading-7 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
        {approach}
      </p>
    </div>
  );
}
