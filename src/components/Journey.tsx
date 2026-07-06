import { timeline } from "@/data/timeline";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const tagStyles: Record<string, string> = {
  current: "border-mint/50 bg-mint/10 text-mint",
  win: "border-amber-400/50 bg-amber-400/10 text-amber-300",
  ship: "border-accent/50 bg-accent/10 text-accent-soft",
  research: "border-glow/50 bg-glow/10 text-glow",
  start: "border-line-strong bg-white/[0.05] text-muted",
};

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading
        label="05 · Journey"
        title={
          <>
            From fundamentals to <span className="text-gradient">funded-grade systems.</span>
          </>
        }
      />

      <ol className="relative ml-2 border-l border-line md:ml-4">
        {timeline.map((entry, i) => (
          <li key={`${entry.period}-${entry.title}`} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            <span
              className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-base ${
                i === 0 ? "bg-mint shadow-[0_0_16px_rgba(16,185,129,0.6)]" : "bg-accent"
              }`}
              aria-hidden
            />
            <Reveal delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[12px] font-medium tracking-wide text-muted">{entry.period}</span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${tagStyles[entry.tag]}`}
                >
                  {entry.tag}
                </span>
              </div>
              <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight md:text-[1.35rem]">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
