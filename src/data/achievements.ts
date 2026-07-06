export type Achievement = {
  title: string;
  meta: string;
  description: string;
  icon: "trophy" | "globe" | "package" | "flask";
};

export const achievements: Achievement[] = [
  {
    title: "Winner — AI for Bharat 2026",
    meta: "Government of Karnataka · team Progsolve",
    description: "Won the state hackathon with KARMA — entity resolution across 40+ government databases.",
    icon: "trophy",
  },
  {
    title: "Top 300 of 10,000+",
    meta: "AWS AI Ideas Challenge · global",
    description: "Top 3% worldwide for an applied AI product idea judged on real engineering substance.",
    icon: "globe",
  },
  {
    title: "Published on PyPI",
    meta: "safemigrate-lint · MIT",
    description: "A real developer tool in the wild — GitHub Action, CLI, and pre-commit hook for Postgres migrations.",
    icon: "package",
  },
  {
    title: "NVIDIA Nemotron Challenge",
    meta: "Reasoning · Kaggle",
    description: "Solver-distilled LoRA pipeline with up to 100% per-category coverage on verified traces.",
    icon: "flask",
  },
];
