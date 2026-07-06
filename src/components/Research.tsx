"use client";

import { motion } from "framer-motion";
import { nemotronBenchmarks, researchThreads } from "@/data/research";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Research() {
  return (
    <Section id="research">
      <SectionHeading
        label="03 · Research & Experiments"
        title={
          <>
            Threads I&apos;m pulling on — <span className="text-gradient">with receipts.</span>
          </>
        }
        description="Not papers on a shelf. Each thread came out of a shipped system, and each system made the next thread sharper."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {researchThreads.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08}>
            <article className="card-sheen group flex h-full flex-col rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-glow/40">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-glow">Thread {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-3 border-l-2 border-glow/40 pl-4 text-[15px] font-medium leading-snug text-white/90">
                {t.insight}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.detail}</p>
              <p className="mt-auto pt-5 font-mono text-[11px] text-muted">
                applied in <span className="text-accent-soft">{t.appliedIn}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-6">
        <div className="rounded-3xl border border-line bg-card p-7 md:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Benchmark</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                Nemotron solver coverage — labeled training set
              </h3>
            </div>
            <p className="font-mono text-[11px] text-muted">verified chain-of-thought only</p>
          </div>
          <div className="mt-7 space-y-4">
            {nemotronBenchmarks.map((b, i) => (
              <div key={b.category} className="grid items-center gap-x-5 gap-y-1 md:grid-cols-[150px_1fr_auto]">
                <p className="text-sm font-medium">{b.category}</p>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.coverage}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.1, delay: i * 0.08, ease: EASE }}
                    className={`h-full rounded-full ${
                      b.coverage >= 99 ? "bg-gradient-to-r from-accent to-glow" : b.coverage >= 70 ? "bg-accent/80" : "bg-white/25"
                    }`}
                  />
                </div>
                <p className="font-mono text-[12px] text-muted md:text-right">
                  <span className="text-white">{b.coverage >= 99 ? `${b.coverage}%` : b.coverage >= 70 ? `~${b.coverage}%` : "partial"}</span>
                  <span className="hidden lg:inline"> · {b.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
