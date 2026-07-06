export type ResearchThread = {
  title: string;
  insight: string;
  detail: string;
  appliedIn: string;
};

export const researchThreads: ResearchThread[] = [
  {
    title: "Provenance over content filtering",
    insight: "An agent's risk lives in the causal path from instruction-origin to action — not in the text of either.",
    detail:
      "Provenance as a set of trust labels unioned over a span's transitive lineage. A cycle-safe graph walk computes taint; a typed policy AST (never eval) authorizes each tool call. Taint clears only through an explicit, auditable structured extractor.",
    appliedIn: "SENTINEL",
  },
  {
    title: "Verified reasoning distillation",
    insight: "For deterministic tasks, solver-verified chain-of-thought beats scraped chain-of-thought.",
    detail:
      "Deterministic solvers generate step-by-step traces; only solver-correct pairs enter the SFT corpus. The model learns reasoning that is provably right — and needs no solver at inference.",
    appliedIn: "Nemotron LoRA",
  },
  {
    title: "Cost-aware AI architecture",
    insight: "The best LLM call is the one you didn't make.",
    detail:
      "Deterministic math handles the baseline; the model only fires on real anomalies. Two-stage filtering kept a full observability system inside a $120 budget — the pattern that makes AI shippable, not just demoable.",
    appliedIn: "FAULTLINE",
  },
];

export type Benchmark = { category: string; coverage: number; note: string };

export const nemotronBenchmarks: Benchmark[] = [
  { category: "Cipher", coverage: 100, note: "substitution + closed-vocabulary completion" },
  { category: "Numeral", coverage: 100, note: "Roman numerals, validate-then-apply" },
  { category: "Unit conversion", coverage: 100, note: "proportional / affine fit" },
  { category: "Gravity", coverage: 99.7, note: "least-squares fit of d = ½·g·t²" },
  { category: "Bit manipulation", coverage: 76, note: "DSL search + GF(2) affine synthesis" },
  { category: "Equation", coverage: 40, note: "partial — composed substitution + numeric rule" },
];
