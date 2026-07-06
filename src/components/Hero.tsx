"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Counter } from "@/components/ui/Counter";
import { ArrowUpRight, GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const phrases = [
  "agent security layers",
  "Postgres safety tooling",
  "verified reasoning pipelines",
  "entity-resolution systems",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Hero() {
  const [phrase, setPhrase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhrase((p) => (p + 1) % phrases.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="bg-grid-faint absolute inset-0" aria-hidden />
      <HeroScene />
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 text-center"
      >
        <motion.div variants={item} className="flex justify-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-2 text-[13px] font-medium text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            Open to AI/ML internships &amp; roles
            <span className="text-muted/50">·</span>
            {site.location}
          </p>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.9rem,7.5vw,5.6rem)] font-semibold leading-[1.02] tracking-tight"
        >
          Building AI systems
          <br />
          <span className="text-gradient">that survive production.</span>
        </motion.h1>

        <motion.div variants={item} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          <p>
            AI engineer &amp; full-stack developer. I ship the whole system — model, API, infra, interface —
            under real constraints. Currently building{" "}
            <span className="inline-flex h-[1.6em] items-baseline overflow-hidden align-baseline">
              <motion.span
                key={phrase}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="whitespace-nowrap font-medium text-white"
              >
                {phrases[phrase]}
              </motion.span>
            </span>
            .
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-soft hover:shadow-[0_0_36px_rgba(59,130,246,0.35)]"
            >
              View projects
              <ArrowUpRight className="size-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-7 py-3.5 text-sm font-semibold transition hover:border-white/30 hover:bg-white/[0.07]"
            >
              Resume
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

        <motion.dl
          variants={item}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {[
            { value: <Counter to={6} />, label: "production systems shipped" },
            { value: "TOP 300", label: "global · AWS AI Ideas Challenge" },
            { value: "WINNER", label: "AI for Bharat 2026 · Govt of Karnataka" },
            { value: <Counter to={33} />, label: "safety rules live on PyPI" },
          ].map((stat, i) => (
            <div key={i} className="bg-panel/80 px-6 py-6 text-left backdrop-blur">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight">{stat.value}</dd>
              <dd className="mt-2 text-xs leading-relaxed text-muted">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted/60 transition hover:text-white"
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
