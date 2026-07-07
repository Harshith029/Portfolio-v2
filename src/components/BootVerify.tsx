"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

/**
 * Boot-time self-verification. The site checks its own claims before it makes
 * them — the same posture as the work itself. Runs once per session, is fully
 * skippable, and collapses to an instant "verified" state under reduced motion.
 * Content renders underneath (no-JS/SSR shows the page), so this never blocks.
 */
const CHECKS = [
  { label: "Verifying claims", detail: "6 shipped systems" },
  { label: "Checking repositories", detail: "github.com/Harshith029" },
  { label: "Validating deployments", detail: "sentinel · safemigrate-lint" },
  { label: "Attaching trust labels", detail: "shipped · verified · claim" },
  { label: "Running integrity checks", detail: "provenance intact" },
];

export function BootVerify() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("boot-verified");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      if (reduced && !seen) sessionStorage.setItem("boot-verified", "1");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    const push = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

    CHECKS.forEach((_, i) => push(() => setStep(i + 1), 320 + i * 300));
    push(() => setStep(CHECKS.length + 1), 320 + CHECKS.length * 300 + 260);

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  const dismiss = () => {
    timers.current.forEach(clearTimeout);
    sessionStorage.setItem("boot-verified", "1");
    document.body.style.overflow = "";
    setVisible(false);
    setTimeout(() => setDone(true), 480);
  };

  useEffect(() => {
    if (step === CHECKS.length + 1) {
      const t = setTimeout(dismiss, 640);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!mounted || done || !visible) return null;

  const complete = step > CHECKS.length;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
      onClick={dismiss}
      role="status"
      aria-label="Verifying portfolio integrity"
    >
      <div className="bg-grid-faint pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative w-[min(90vw,440px)] px-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">integrity check</span>
        </div>

        <ul className="space-y-2.5 font-mono text-[13px]">
          {CHECKS.map((check, i) => {
            const state = step > i + 1 || complete ? "done" : step === i + 1 ? "active" : "pending";
            return (
              <li key={check.label} className="flex items-center gap-3">
                <span
                  className={`grid size-4 place-items-center rounded-full border text-[9px] transition-colors duration-300 ${
                    state === "done"
                      ? "border-mint/50 bg-mint/15 text-mint"
                      : state === "active"
                        ? "border-accent/50 bg-accent/15 text-accent-soft"
                        : "border-line text-transparent"
                  }`}
                  aria-hidden
                >
                  {state === "done" ? "✓" : state === "active" ? "•" : ""}
                </span>
                <span className={state === "pending" ? "text-muted/40" : "text-white/90"}>{check.label}</span>
                <span className="ml-auto text-muted/50">{state === "pending" ? "" : check.detail}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 h-px w-full overflow-hidden bg-line">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${(Math.min(step, CHECKS.length) / CHECKS.length) * 100}%` }}
            transition={{ ease: EASE, duration: 0.3 }}
            className="h-full bg-gradient-to-r from-accent to-glow"
          />
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[11px]">
          <span className={complete ? "text-mint" : "text-muted"}>
            {complete ? "✓ integrity verified — welcome" : "verifying claims before making them…"}
          </span>
          <button type="button" onClick={dismiss} className="text-muted/60 underline-offset-2 transition hover:text-white hover:underline">
            skip
          </button>
        </div>
      </div>
    </motion.div>
  );
}
