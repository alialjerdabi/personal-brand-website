import Image from "next/image";
import Link from "next/link";
import type { LabContent, LabPalette, LabProject } from "@/data/lab";

/**
 * Ground and ink per palette entry. Kept as whole class strings rather
 * than interpolated fragments so Tailwind can actually see them.
 */
const FIELD: Record<LabPalette, string> = {
  orange: "bg-lab-orange text-black",
  blue: "bg-lab-blue text-white",
  lime: "bg-lab-lime text-black",
  violet: "bg-lab-violet text-white",
  cream: "bg-lab-cream text-black",
};

function Tile({
  project,
  pendingLabel,
  index,
  className,
  priority,
}: {
  project: LabProject;
  pendingLabel: string;
  index: number;
  className: string;
  priority: boolean;
}) {
  const hasCover = Boolean(project.cover);

  const inner = (
    <>
      {project.cover && (
        <>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            preload={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          {/* Type sits on the photograph, so the photograph has to give
              way for it — a single flat scrim, no blur, no gradient stack. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          />
        </>
      )}

      {/*
        Padding and name size are held down on small screens on purpose:
        they set each tile's min-content height, and on a 667px phone an
        over-padded tile forces the lower row taller than its flex share,
        which squeezes the lead cover into a letterbox crop.
      */}
      <span className="relative flex h-full w-full flex-col justify-between p-4 sm:p-6 lg:p-7">
        <span className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]">
            {hasCover ? project.year : pendingLabel}
          </span>
        </span>

        <span className="block">
          <span className="block text-[clamp(1.15rem,4.4vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">
            {project.name}
          </span>
          {project.disciplines.length > 0 && (
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]">
              {project.disciplines.join(" · ")}
            </span>
          )}
        </span>
      </span>
    </>
  );

  const shell = `group relative isolate min-h-0 overflow-hidden ${className} ${
    hasCover ? "bg-black text-white" : FIELD[project.palette]
  }`;

  if (!project.spreads) {
    return (
      <div data-tile className={shell}>
        {inner}
      </div>
    );
  }

  return (
    <Link
      data-tile
      href={`/lab/${project.slug}`}
      className={`${shell} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white`}
    >
      {inner}
    </Link>
  );
}

/**
 * The lobby's work mosaic — flat colour fields, edge to edge, no cards.
 *
 * A row of equal portrait cards is the most conventional layout a
 * portfolio has; this replaces it with an asymmetric wall where every
 * project owns a differently-sized field and its own colour. Nothing is
 * the same size as anything else, which is the whole point: the
 * composition itself says these are not interchangeable.
 *
 * The split is deterministic rather than a spans table — the lead project
 * takes a full column, and the rest divide between two narrower ones. It
 * holds its shape for any number of projects from three upward, with no
 * holes to fill, which a 2D span grid cannot promise once the count
 * changes.
 *
 * On smaller screens the same three groups stack, so the lead cover keeps
 * its scale and the colour fields become bands beneath it rather than a
 * cramped grid.
 */
export default function ProjectMosaic({
  projects,
  lobby,
}: {
  projects: LabProject[];
  lobby: LabContent["lobby"];
}) {
  const [lead, ...rest] = projects;
  const split = Math.ceil(rest.length / 2);
  const middle = rest.slice(0, split);
  const tail = rest.slice(split);

  /*
   * Uneven splits inside each column, offset between the two, so no two
   * fields in the mosaic ever come out the same size. An even split reads
   * as a grid again the moment a column holds more than one project —
   * which is the exact thing this layout exists to avoid.
   */
  const weight = (offset: number, offbeat: boolean) =>
    (offset % 2 === 0) !== offbeat ? "flex-[3]" : "flex-[2]";

  return (
    <div className="lab-mosaic flex min-h-0 flex-1 flex-col gap-px bg-lab-ground lg:flex-row">
      <Tile
        project={lead}
        pendingLabel={lobby.pendingLabel}
        index={0}
        priority
        className="flex-[6] lg:flex-[6]"
      />

      {/*
        On small screens the two columns sit beside each other under the
        lead tile, so the mosaic stays a mosaic instead of collapsing into
        four full-width letterbox bands — which crops portrait cover art
        badly and loses the composition entirely. `lg:contents` dissolves
        this wrapper on desktop so the columns become direct children of
        the row again.
      */}
      <div className="flex min-h-0 flex-[4] gap-px lg:contents">
        {middle.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col gap-px lg:flex-[4]">
            {middle.map((project, offset) => (
              <Tile
                key={project.slug}
                project={project}
                pendingLabel={lobby.pendingLabel}
                index={offset + 1}
                priority={false}
                className={weight(offset, false)}
              />
            ))}
          </div>
        )}

        {tail.length > 0 && (
          <div className="flex min-h-0 flex-1 flex-col gap-px lg:flex-[3]">
            {tail.map((project, offset) => (
              <Tile
                key={project.slug}
                project={project}
                pendingLabel={lobby.pendingLabel}
                index={split + offset + 1}
                priority={false}
                className={weight(offset, true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
