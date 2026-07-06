export type TimelineEntry = {
  period: string;
  title: string;
  description: string;
  tag: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    title: "B.Tech @ Mahindra University · open to AI/ML roles",
    description:
      "Studying in Hyderabad while shipping production systems on the side. Looking for teams that need one engineer who can own an AI feature end-to-end.",
    tag: "current",
  },
  {
    period: "Jun 2026",
    title: "Won AI for Bharat 2026 — Government of Karnataka",
    description:
      "KARMA (with team Progsolve): probabilistic entity resolution unifying 40+ state government databases. 49,857 records → 9,253 UBIDs in ~80 seconds, 101/101 tests.",
    tag: "win",
  },
  {
    period: "Jun 2026",
    title: "SENTINEL live — provenance security for AI agents",
    description:
      "Shipped an MCP proxy that blocks prompt-injection-driven actions by authorizing tool calls against instruction provenance. Live demo on Render.",
    tag: "ship",
  },
  {
    period: "2026",
    title: "safemigrate-lint published on PyPI",
    description:
      "Grew a hackathon RL environment into a real developer tool: a Postgres migration linter shipped as a GitHub Action, CLI, and pre-commit hook. MIT, free.",
    tag: "ship",
  },
  {
    period: "Early 2026",
    title: "NVIDIA Nemotron Model Reasoning Challenge",
    description:
      "Built a fully-offline solver → distillation pipeline: deterministic per-category solvers generating verified chain-of-thought, distilled into a rank-32 LoRA.",
    tag: "research",
  },
  {
    period: "2025",
    title: "Top 300 globally — AWS 10,000 AI Ideas Challenge",
    description:
      "Ranked in the top 3% of 10,000+ submissions worldwide for an applied AI product idea. Also shipped FAULTLINE under a $120 cloud budget and AITO for Hyderabad traffic.",
    tag: "win",
  },
  {
    period: "2024",
    title: "Foundations",
    description:
      "Full-stack builds and fundamentals-first projects — game engines in vanilla JS, REST backends, and the habit of shipping whole systems solo.",
    tag: "start",
  },
];
