"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <Section id="skills" className="bg-panel/40">
      <SectionHeading
        label="04 · Skills"
        title={
          <>
            The stack I <span className="text-gradient">actually ship with.</span>
          </>
        }
        description="Levels reflect what I've shipped with, not what I've read about."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.07}>
            <div className="card-sheen h-full rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/30">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                <span className="font-mono text-[11px] text-muted">{String(gi + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-1.5 text-[13px] text-muted">{group.blurb}</p>
              <ul className="mt-6 space-y-4">
                {group.skills.map((s, si) => (
                  <li key={s.name} className="group/skill">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-white/90 transition group-hover/skill:text-white">
                        {s.name}
                      </span>
                      <span className="font-mono text-[11px] text-muted/70">{s.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, delay: si * 0.06, ease: EASE }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-glow opacity-80 transition-opacity group-hover/skill:opacity-100"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
