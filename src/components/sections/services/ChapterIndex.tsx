interface ChapterIndexProps {
  index: number;
  name: string;
  /** Applied to the name span — the article's aria-labelledby target. */
  id: string;
  dark?: boolean;
  className?: string;
}

/**
 * The mono index + service name that opens every chapter — the one
 * element all seven layouts share verbatim, so it's the anchor that
 * keeps the page reading as one system while everything around it varies.
 */
export default function ChapterIndex({ index, name, id, dark = false, className = "" }: ChapterIndexProps) {
  return (
    <p className={`flex items-baseline gap-5 ${className}`.trim()}>
      <span className={`font-mono text-xs ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        id={id}
        className={`text-3xl font-semibold tracking-[-0.02em] sm:text-4xl ${
          dark ? "text-white" : "text-zinc-950"
        }`}
      >
        {name}
      </span>
    </p>
  );
}
