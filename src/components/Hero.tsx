"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight, GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const EvidenceGraph = dynamic(() => import("@/components/three/EvidenceGraph"), { ssr: false });

const phrases = ["agent security", "migration safety", "verified reasoning", "entity resolution"];

const receipts = [
  { label: "winner · ai for bharat 2026", tier: "verified", href: "https://github.com/Harshith029/KARMA" },
  { label: "safemigrate-lint · pypi", tier: "shipped", href: "https://pypi.org/project/safemigrate-lint/" },
  { label: "sentinel · live demo", tier: "shipped", href: "https://sentinel-i63x.onrender.com" },
  { label: "nemotron · code", tier: "verified", href: "https://github.com/Harshith029/nemotron-reasoning-solvers" },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

export function Hero() {
  const [phrase, setPhrase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhrase((p) => (p + 1) % phrases.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="bg-grid-faint absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
            provenance · don&apos;t trust — verify
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-[clamp(2.6rem,6.2vw,4.6rem)] font-semibold leading-[1.04] tracking-tight"
          >
            Building AI systems
            <br />
            <span className="text-gradient">that survive production.</span>
          </motion.h1>

          {/* self-verifying stamp — the mechanic, shown once */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: EASE }}
            className="mt-6 inline-flex items-center gap-2.5 rounded-lg border border-mint/35 bg-mint/[0.06] px-3.5 py-2"
          >
            <span className="text-mint">✓</span>
            <span className="font-mono text-[11px] text-mint">verified against 6 shipped systems</span>
            <span className="font-mono text-[11px] text-muted">— pypi · github · live</span>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted md:text-base">
            AI engineer &amp; full-stack developer. I ship the whole system — model, API, infra, interface — under real
            constraints. Currently building{" "}
            <span className="inline-flex h-[1.5em] items-baseline overflow-hidden align-baseline">
              <motion.span
                key={phrase}
                initial={{ y: 13, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.34, ease: EASE }}
                className="whitespace-nowrap font-medium text-white"
              >
                {phrases[phrase]}
              </motion.span>
            </span>
            .
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-soft hover:shadow-[0_0_36px_rgba(59,130,246,0.35)]"
              >
                See the evidence
                <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-6 py-3.5 text-sm font-semibold transition hover:border-white/30 hover:bg-white/[0.07]"
              >
                Try the security demo
              </a>
            </Magnetic>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/Harshith029"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="grid size-12 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition hover:border-line-strong hover:text-white"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/krishnaharshith/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="grid size-12 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition hover:border-line-strong hover:text-white"
              >
                <LinkedinIcon className="size-4.5" />
              </a>
            </div>
          </motion.div>

          {/* receipt strip — proof for the 45-second visitor */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
            {receipts.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] transition ${
                  r.tier === "shipped"
                    ? "border-mint/30 text-mint hover:bg-mint/10"
                    : "border-accent/35 text-accent-soft hover:bg-accent/10"
                }`}
              >
                {r.label}
                <ArrowUpRight className="size-3 opacity-60" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* evidence graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1, ease: EASE }}
          className="relative hidden aspect-square w-full lg:block"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <EvidenceGraph />
          <div className="pointer-events-none absolute bottom-2 left-2 flex flex-col gap-1.5 font-mono text-[10px] text-muted">
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#3b82f6]" /> systems</span>
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#6b7280]" /> sources</span>
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#f59e0b]" /> awards</span>
          </div>
          <p className="pointer-events-none absolute right-2 top-2 font-mono text-[10px] uppercase tracking-widest text-muted/70">
            evidence graph
          </p>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted/60 transition hover:text-white"
        aria-label="Scroll to work"
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="size-5" aria-hidden>
            <path d="M12 4v16m0 0-6-6m6 6 6-6" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
