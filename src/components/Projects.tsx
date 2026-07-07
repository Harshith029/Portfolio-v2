"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { filters, projects, type Project } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { ArrowUpRight, TrophyIcon } from "@/components/ui/Icons";

function SourceRail({ sources }: { sources: Project["sources"] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">receipts</span>
      {sources.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-muted transition hover:text-accent-soft"
        >
          {s.label}
          <ArrowUpRight className="size-3 opacity-50" />
        </a>
      ))}
    </div>
  );
}

function ArchFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Architecture">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted">
            {step}
          </span>
          {i < steps.length - 1 && <span className="text-[11px] text-accent/70">→</span>}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener"
          className={
            l.primary
              ? "inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-accent-soft"
              : "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold transition hover:border-white/30"
          }
        >
          {l.label}
          <ArrowUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 5);
        rx.set(-py * 5);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MetricBlock({ metrics }: { metrics: Project["metrics"] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface px-4 py-4">
          <p className="font-display text-xl font-semibold tracking-tight text-white">{m.value}</p>
          <p className="mt-1 text-[11px] leading-snug text-muted">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <div id={`project-${project.id}`} className="card-sheen group relative scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-card transition-colors duration-300 hover:border-accent/40">
        <div className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60" aria-hidden />
        <div className="grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent">Featured</span>
              <span>{project.year}</span>
              <span className="text-muted/50">·</span>
              <span>{project.category}</span>
              <span className="ml-auto"><TrustBadge trust={project.trust} /></span>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
            <p className="mt-2 text-lg font-medium text-accent-soft">{project.oneLiner}</p>
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">Architecture</p>
                <ArchFlow steps={project.architecture} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-surface/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glow">The insight</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.challenge}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Outcome</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.outcome}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <ProjectLinks links={project.links} />
            </div>
            <div className="mt-7">
              <SourceRail sources={project.sources} />
            </div>
          </div>

          {/* stylized check-run panel */}
          <div className="hidden flex-col justify-center md:flex">
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-2xl">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[11px] text-muted">pull_request · lint-migrations</span>
              </div>
              <div className="space-y-3 p-5 font-mono text-[12px] leading-relaxed">
                <p className="text-muted">$ safemigrate-lint migrations/0042_cleanup.sql</p>
                <p>
                  <span className="text-red-400">🔴 CRITICAL</span>{" "}
                  <span className="text-white">drop-column-restricted</span>
                </p>
                <p className="pl-5 text-muted">DROP COLUMN deleteat — irreversible data loss.</p>
                <p>
                  <span className="text-amber-300">🟡 WARNING</span>{" "}
                  <span className="text-white">constraint-not-valid-required</span>
                </p>
                <p className="pl-5 text-muted">FK without NOT VALID → AccessExclusiveLock for a full scan.</p>
                <p className="text-mint">✓ safe rewrite suggested · check run: action_required</p>
                <div className="space-y-1.5 pt-2" aria-hidden>
                  {[92, 58, 34].map((w, i) => (
                    <div key={i} className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${w}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: EASE }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-glow"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-panel px-3 py-3 text-center">
                    <p className="font-display text-lg font-semibold">{m.value}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full">
      <div id={`project-${project.id}`} className="card-sheen group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent/40 md:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-accent/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>{project.year}</span>
          <span className="text-muted/50">·</span>
          <span>{project.category}</span>
          <span className="ml-auto"><TrustBadge trust={project.trust} /></span>
        </div>
        {project.award && (
          <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-300">
            <TrophyIcon className="size-3.5" />
            {project.award}
          </div>
        )}
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-1.5 font-medium text-accent-soft">{project.oneLiner}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5">
          <ArchFlow steps={project.architecture} />
        </div>

        <div className="mt-5">
          <MetricBlock metrics={project.metrics} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <ProjectLinks links={project.links} />
        </div>
        <div className="mt-6">
          <SourceRail sources={project.sources} />
        </div>
      </div>
    </TiltCard>
  );
}

export function Projects() {
  const [active, setActive] = useState<string>("all");
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);
  const visible = rest.filter((p) => active === "all" || p.tags.includes(active));
  const showFeatured = active === "all" || featured.tags.includes(active);

  return (
    <Section id="work">
      <SectionHeading
        label="01 · Selected Work"
        title={
          <>
            Systems with <span className="text-gradient">real constraints</span>, built end-to-end.
          </>
        }
        description="Every project carries a trust label and its receipts. Shipped means you can run it now; verified means a third party validated it; claim is self-reported — and labeled as such, because the honest ones make the proven ones land."
      />

      <Reveal className="mb-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-line bg-panel/40 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">trust legend</span>
          <TrustBadge trust="shipped" withNote />
          <TrustBadge trust="verified" withNote />
          <TrustBadge trust="claim" withNote />
        </div>
      </Reveal>

      <Reveal className="mb-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                active === f.key
                  ? "bg-white text-base"
                  : "border border-line bg-white/[0.03] text-muted hover:border-line-strong hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="space-y-6">
        {showFeatured && <FeaturedCard project={featured} />}
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <motion.div
              key={`${active}-${p.id}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
        {!showFeatured && visible.length === 0 && (
          <p className="py-10 text-center text-muted">Nothing in this category yet.</p>
        )}
      </div>
    </Section>
  );
}
