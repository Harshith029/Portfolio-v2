"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { analyze, CONSOLE_PRESETS, type Analysis, type PipelineStage } from "@/lib/provenance";
import { EASE, scrollToId } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const toneClass: Record<PipelineStage["tone"], string> = {
  neutral: "text-muted",
  risk: "text-amber-300",
  ok: "text-mint",
  block: "text-red-400",
};

export function AdversaryConsole() {
  const [value, setValue] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [revealed, setRevealed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = (input: string) => {
    const text = input.trim();
    if (!text) return;
    clearTimers();
    const result = analyze(text);
    setAnalysis(result);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(result.pipeline.length);
      return;
    }
    setRevealed(0);
    result.pipeline.forEach((_, i) => {
      timers.current.push(setTimeout(() => setRevealed(i + 1), 240 + i * 300));
    });
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (analysis && revealed >= analysis.pipeline.length && liveRef.current) {
      liveRef.current.textContent =
        analysis.verdict === "BLOCK"
          ? `Blocked. ${analysis.reason}`
          : `Allowed. ${analysis.reason}`;
    }
  }, [analysis, revealed]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(value);
  };

  const safe = CONSOLE_PRESETS.filter((p) => p.kind === "safe");
  const adversarial = CONSOLE_PRESETS.filter((p) => p.kind === "adversarial");
  const complete = analysis && revealed >= analysis.pipeline.length;

  return (
    <Section id="demo">
      <SectionHeading
        label="05 · Live Demonstration"
        title={
          <>
            See how my AI security engine <span className="text-gradient">reasons.</span>
          </>
        }
        description="A faithful, client-side model of the authorization engine behind SENTINEL — it judges where an instruction came from, not how trustworthy the words look. Try a normal request, then an adversarial one, and watch the decision unfold. Everything you type is, by definition, untrusted input."
      />

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        {/* controls */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Safe requests — should pass</p>
            <div className="flex flex-wrap gap-2">
              {safe.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setValue(p.input);
                    run(p.input);
                  }}
                  className="rounded-full border border-mint/25 bg-mint/[0.06] px-3.5 py-2 text-left text-[13px] text-white/85 transition hover:border-mint/50 hover:bg-mint/10"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Adversarial — should block</p>
            <div className="flex flex-wrap gap-2">
              {adversarial.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setValue(p.input);
                    run(p.input);
                  }}
                  className="rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-3.5 py-2 text-left text-[13px] text-white/85 transition hover:border-amber-400/50 hover:bg-amber-400/10"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="mt-1">
            <label htmlFor="adv-input" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Or write your own
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 transition focus-within:border-accent/50">
              <span className="font-mono text-sm text-accent-soft" aria-hidden>
                ›
              </span>
              <input
                id="adv-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="type a request for the agent…"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent py-1.5 font-mono text-[13px] text-white outline-none placeholder:text-muted/60"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-accent-soft"
              >
                Run
              </button>
            </div>
          </form>
        </div>

        {/* console */}
        <div className="overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-2xl">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-muted">provenance-authorizer · client-side model</span>
          </div>

          <div className="min-h-[340px] p-5 font-mono text-[12.5px] leading-relaxed">
            {!analysis && (
              <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center text-muted">
                <p className="text-white/80">Awaiting input.</p>
                <p className="text-[11px] text-muted/70">Pick a request on the left, or write your own.</p>
              </div>
            )}

            {analysis && (
              <div>
                <p className="text-white">
                  <span className="text-accent-soft">visitor@untrusted</span>
                  <span className="text-muted/50"> ~$ </span>
                  {analysis.input}
                </p>

                <ol className="relative mt-4 space-y-2.5 border-l border-line pl-5">
                  {analysis.pipeline.map((stage, i) => {
                    const shown = i < revealed;
                    return (
                      <motion.li
                        key={stage.key}
                        initial={{ opacity: 0, x: -6 }}
                        animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="relative"
                      >
                        <span
                          className={`absolute -left-[23px] top-1.5 size-2.5 rounded-full border-2 border-panel ${
                            stage.tone === "block" ? "bg-red-400" : stage.tone === "ok" ? "bg-mint" : stage.tone === "risk" ? "bg-amber-300" : "bg-accent"
                          }`}
                          aria-hidden
                        />
                        <span className="text-muted/70">{stage.label}</span>
                        <span className="mx-2 text-muted/30">→</span>
                        <span className={toneClass[stage.tone]}>{stage.value}</span>
                      </motion.li>
                    );
                  })}
                </ol>

                {complete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`mt-5 rounded-xl border p-4 ${
                      analysis.verdict === "BLOCK"
                        ? "border-red-500/40 bg-red-500/[0.07]"
                        : "border-mint/40 bg-mint/[0.06]"
                    }`}
                  >
                    <p className={`text-[13px] font-semibold ${analysis.verdict === "BLOCK" ? "text-red-400" : "text-mint"}`}>
                      {analysis.verdict === "BLOCK" ? "✗ BLOCKED" : "✓ ALLOWED"}
                    </p>
                    <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-muted">{analysis.reason}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
                      <span className="text-[11px] text-muted/70">
                        {analysis.verdict === "BLOCK"
                          ? "the model held. so does the one in production."
                          : "read-only intent from untrusted input is safe to run."}
                      </span>
                      <button
                        type="button"
                        onClick={() => scrollToId("project-sentinel")}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-[12px] font-semibold text-accent-soft transition hover:bg-accent hover:text-white"
                      >
                        See how SENTINEL does this
                        <ArrowUpRight className="size-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p ref={liveRef} className="sr-only" role="status" aria-live="polite" />
    </Section>
  );
}
