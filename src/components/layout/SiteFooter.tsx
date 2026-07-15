import Container from "@/components/layout/Container";
import type { FooterContent } from "@/data/footer";

interface SiteFooterProps {
  content: FooterContent;
}

/**
 * The page's close: statement and oversized email link, then the
 * full-bleed wordmark as the signature — the page ends the way a
 * letter does. The thesis is the last line, so the last thing read
 * is the first thing said (see docs/landing-experience.md, Act V).
 */
export default function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer aria-label="Site footer" className="overflow-x-clip border-t border-white/10 bg-zinc-950 pt-20 text-white sm:pt-24">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
          <p className="max-w-sm text-base leading-7 text-zinc-400">
            {content.statement}
          </p>
          <div className="sm:justify-self-end sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {content.emailLabel}
            </p>
            <a
              href={`mailto:${content.email}`}
              className="mt-3 inline-block break-all text-xl font-medium tracking-tight text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none sm:text-2xl"
            >
              {content.email}
            </a>
            <nav aria-label="Footer" className="mt-8 flex gap-6 sm:justify-end">
              {content.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </Container>

      {/*
        Sized in rem steps (not vw) so the wordmark zooms and scales with
        the rest of the type system instead of staying pinned to the
        viewport — hierarchy survives browser zoom. Steps chosen to
        near-fill each breakpoint's minimum width.
      */}
      <p
        aria-hidden="true"
        className="mt-16 select-none whitespace-nowrap px-3 text-center text-[3.4rem] font-semibold leading-[0.85] tracking-[-0.04em] text-white sm:mt-20 sm:text-[6rem] md:text-[7.5rem] lg:text-[10rem] xl:text-[12.5rem] 2xl:text-[15rem]"
      >
        {content.wordmark}
      </p>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-2 py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {content.wordmark} · {content.location}
            </p>
            <p className="text-zinc-400">{content.thesis}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
