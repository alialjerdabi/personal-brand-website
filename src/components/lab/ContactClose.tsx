import Reveal from "@/components/ui/Reveal";
import Masthead from "@/components/lab/Masthead";
import type { LabContent } from "@/data/lab";

/**
 * The close. One address, set at display scale, because on a portfolio
 * the email IS the conversion — a form would add a step to the one
 * action the whole page exists to produce.
 *
 * The page ends once: contact and footer are a single composed block
 * rather than two stacked sections with a rule between them.
 */
export default function ContactClose({ content }: { content: LabContent }) {
  const { contact, lobby } = content;

  return (
    <section
      id="contact"
      aria-labelledby="lab-contact-heading"
      className="scroll-mt-8 bg-lab-ground px-6 pb-12 pt-24 text-lab-ink sm:px-10 sm:pb-16 sm:pt-32"
    >
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {contact.label}
        </p>
      </Reveal>

      <Reveal delay={70}>
        <h2
          id="lab-contact-heading"
          className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
        >
          {contact.heading}
        </h2>
      </Reveal>

      <Reveal delay={140} mask className="mt-10 sm:mt-14">
        <a
          href={`mailto:${contact.email}`}
          className="inline-block text-[clamp(1.5rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-lab-ink underline decoration-lab-rule decoration-1 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent focus-visible:outline-none"
        >
          {contact.email}
        </a>
      </Reveal>

      <Reveal delay={180}>
        <p className="mt-10 max-w-xl text-lg leading-8 text-lab-ink-muted">{contact.body}</p>
      </Reveal>

      <div className="mt-20 flex flex-col gap-6 border-t border-accent pt-6 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          {lobby.location}
        </p>
        {/* The one non-accent signal on the page, and it earns it: this is
            a live availability state, not another label. */}
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-lab-ink">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {lobby.availability}
        </p>
      </div>

      {/* The page signs itself the same way the lobby does. */}
      <div className="-mx-6 mt-16 sm:-mx-10 sm:mt-20">
        <Masthead content={content} href="/lab#work" />
      </div>
    </section>
  );
}
