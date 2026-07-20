interface ScopeListProps {
  label: string;
  items: string[];
  dark?: boolean;
  className?: string;
}

/**
 * The "Scope of work" mono label + dash list — identical typography in
 * every chapter (per the brief: vary composition, not the type system).
 * Only placement/width changes chapter to chapter.
 */
export default function ScopeList({ label, items, dark = false, className = "" }: ScopeListProps) {
  return (
    <div className={className}>
      <p className={`font-mono text-[11px] uppercase tracking-[0.3em] ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
        {label}
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex gap-3 text-sm leading-6 ${dark ? "text-zinc-300" : "text-zinc-600"}`}
          >
            <span aria-hidden="true" className={dark ? "text-zinc-600" : "text-zinc-300"}>
              –
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
