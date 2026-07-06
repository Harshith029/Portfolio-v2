import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { MapPinIcon } from "@/components/ui/Icons";

const facts = [
  { label: "Location", value: `Hyderabad, India · ${site.timezone}` },
  { label: "Education", value: "B.Tech · Mahindra University" },
  { label: "Focus", value: "AI systems · developer tooling" },
  { label: "Availability", value: "Open to internships & roles" },
];

export function About() {
  return (
    <Section id="about" className="bg-panel/40">
      <SectionHeading
        label="02 · About"
        title={
          <>
            An engineer with a bias toward <span className="text-gradient">production.</span>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <Reveal>
            <blockquote className="relative rounded-2xl border border-line border-l-accent bg-card p-8 md:border-l-2">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-[1.7rem]">
                &ldquo;If I can&apos;t ship it, I don&apos;t understand it.&rdquo;
              </p>
              <cite className="mt-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted not-italic">
                — how I decide what to build
              </cite>
            </blockquote>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I operate across the full stack of a modern AI product —{" "}
                <span className="text-white">model training and fine-tuning, backend APIs, cloud infrastructure, and
                frontend delivery</span>. That breadth is deliberate: the hardest problems in applied AI live at the
                hand-offs between layers, and solving them takes someone who can hold the whole system in their head.
              </p>
              <p>
                I pick problems with real constraints — safety requirements, cost caps, latency budgets, messy
                government data — then ship working versions and iterate against reality. A linter on PyPI beats a
                notebook. A live demo beats a slide.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-card p-7">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <MapPinIcon className="size-4" />
                Quick facts
              </p>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-[11px] uppercase tracking-widest text-muted/70">{f.label}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-accent/50 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-white"
            >
              Start a conversation
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
