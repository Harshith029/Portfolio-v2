"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight, CheckIcon, CopyIcon, MailIcon } from "@/components/ui/Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard.writeText(site.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-panel px-7 py-16 text-center md:px-12 md:py-24">
        <div className="bg-grid-faint absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">08 · Contact</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Have an AI problem?
              <br />
              <span className="text-gradient">Let&apos;s solve it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              Open to AI/ML internships, full-stack roles, freelance builds, and collaborations.
              I reply within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-soft hover:shadow-[0_0_36px_rgba(59,130,246,0.35)]"
                >
                  <MailIcon className="size-4.5" />
                  {site.email}
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-5 py-3.5 text-sm font-semibold transition hover:border-white/30"
                aria-live="polite"
              >
                {copied ? <CheckIcon className="size-4 text-mint" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-muted transition hover:border-line-strong hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
