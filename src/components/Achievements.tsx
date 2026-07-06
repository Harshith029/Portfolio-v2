import { achievements } from "@/data/achievements";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { FlaskIcon, GlobeIcon, PackageIcon, TrophyIcon } from "@/components/ui/Icons";

const icons = {
  trophy: TrophyIcon,
  globe: GlobeIcon,
  package: PackageIcon,
  flask: FlaskIcon,
};

export function Achievements() {
  return (
    <Section id="achievements" className="bg-panel/40">
      <SectionHeading
        label="06 · Achievements"
        title={
          <>
            Benchmarked <span className="text-gradient">outside the building.</span>
          </>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = icons[a.icon];
          return (
            <Reveal key={a.title} delay={i * 0.07}>
              <article className="card-sheen group h-full rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/40">
                <div className="grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent-soft transition-colors group-hover:border-accent/50">
                  <Icon className="size-5.5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight">{a.title}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted">{a.meta}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{a.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
