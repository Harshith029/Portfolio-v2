export type Project = {
  id: string;
  year: string;
  category: string;
  title: string;
  oneLiner: string;
  description: string;
  architecture: string[];
  metrics: { value: string; label: string }[];
  challenge: string;
  outcome: string;
  stack: string[];
  tags: string[];
  links: { label: string; href: string; primary?: boolean }[];
  featured?: boolean;
  award?: string;
};

export const projects: Project[] = [
  {
    id: "safemigrate-lint",
    year: "2026",
    category: "Developer Tooling · Postgres",
    title: "safemigrate-lint",
    oneLiner: "The Postgres migration linter built around what actually breaks production.",
    description:
      "A GitHub Action, CLI, and pre-commit hook that lints Postgres migration SQL on every PR — lock waits, table rewrites, unsafe constraints. Built on a real Postgres parser (pglast / libpg_query), so it handles extension SQL that trips up other linters, with cross-statement context that kills the false positives single-statement linters drown in.",
    architecture: ["Migration SQL", "pglast parse", "33-rule analyzer", "PR comment + Check Run"],
    metrics: [
      { value: "33", label: "safety rules" },
      { value: "~700", label: "prod migrations studied" },
      { value: "MIT", label: "free on PyPI" },
    ],
    challenge:
      "Scanned ~700 production migrations from Cal.com, Mattermost, Supabase, Hasura, and TimescaleDB — zero ran the textbook ops popular linters warn loudest on. The real risks live one layer deeper.",
    outcome:
      "Published on PyPI. Posts severity-grouped findings with the lock each op takes and the safe rewrite, and sets a Check Run you can require in branch protection — free, where Atlas Pro charges per-seat.",
    stack: ["Python", "pglast", "GitHub Actions", "CLI", "pre-commit"],
    tags: ["tooling", "data"],
    links: [
      { label: "GitHub", href: "https://github.com/Harshith029/safemigrate-lint", primary: true },
      { label: "PyPI", href: "https://pypi.org/project/safemigrate-lint/" },
    ],
    featured: true,
  },
  {
    id: "sentinel",
    year: "2026",
    category: "AI Security · Agents",
    title: "SENTINEL",
    oneLiner: "A provenance-aware security proxy that blocks prompt injection at the action layer.",
    description:
      "An MCP proxy that every agent tool call physically traverses — interception guaranteed by network topology, not code wrapping. Each call is authorized against the provenance of everything it derived from, so an instruction that arrived inside retrieved web content can never drive a high-risk action, even when it slips past content filters.",
    architecture: ["Agent (any MCP client)", "Taint tracker", "Policy AST", "Trust scorer", "Tool servers"],
    metrics: [
      { value: "4", label: "trust tiers, set-union taint" },
      { value: "0", label: "agent-code changes needed" },
      { value: "LIVE", label: "demo on Render" },
    ],
    challenge:
      "An agent's risk lives in the causal path from instruction-origin to action, not in the text of either. Content filters miss evasion; provenance doesn't.",
    outcome:
      "Agent-agnostic — secures Foundry, Claude, GPT, or any custom MCP client identically. The live demo auto-plays a hero attack and blocks the exfiltration in seconds.",
    stack: ["Python", "MCP", "FastAPI", "OpenTelemetry"],
    tags: ["ai", "security"],
    links: [
      { label: "Live demo", href: "https://sentinel-i63x.onrender.com", primary: true },
      { label: "GitHub", href: "https://github.com/Harshith029/Sentinel" },
    ],
  },
  {
    id: "karma",
    year: "2026",
    category: "Data Systems · GovTech",
    title: "KARMA",
    oneLiner: "Probabilistic entity resolution across 40+ Karnataka government databases.",
    description:
      "Assigns one Unified Business Identifier per real business by linking records across KSPCB, BESCOM, Shop Establishment, Factories, and Labour systems — no LLMs, per-field audit trail on every match. Kannada↔Roman transliteration, KIADB shared-plot disambiguation, and honorific noise handling are baked into the normalizer, not bolted on.",
    architecture: ["40+ dept sources", "Normalizer (Kannada↔Roman)", "Blocking", "Probabilistic scorer", "UBID + audit trail"],
    metrics: [
      { value: "49,857", label: "records resolved" },
      { value: "9,253", label: "UBIDs in ~80s" },
      { value: "101/101", label: "tests passing" },
    ],
    challenge:
      "The same business exists 3–5 times across departments with no reliable join key — 63% of MSMEs are informal with no PAN/GSTIN.",
    outcome:
      "Won AI for Bharat 2026 (Government of Karnataka) with team Progsolve. End-to-end working prototype answering what the state currently can't: how many businesses actually operate, where, with what compliance status.",
    stack: ["Python", "Postgres", "Docker", "FastAPI"],
    tags: ["ai", "data"],
    links: [{ label: "GitHub", href: "https://github.com/Harshith029/KARMA", primary: true }],
    award: "Winner — AI for Bharat 2026",
  },
  {
    id: "nemotron",
    year: "2026",
    category: "AI · Fine-tuning",
    title: "Nemotron Reasoning LoRA",
    oneLiner: "Solver-verified chain-of-thought, distilled into a LoRA adapter.",
    description:
      "A from-scratch, fully-offline pipeline for the NVIDIA Nemotron Model Reasoning Challenge. Deterministic Python solvers per puzzle category infer the hidden rule and emit step-by-step traces; only solver-correct pairs enter the SFT corpus, which a rank-32 LoRA distills into Nemotron-3-Nano-30B — no solver code needed at inference.",
    architecture: ["Solve", "Generate", "Distill (LoRA r32)", "Submit (vLLM · \\boxed{})"],
    metrics: [
      { value: "100%", label: "cipher · numeral · unit-conv" },
      { value: "99.7%", label: "gravity coverage" },
      { value: "r32", label: "LoRA adapter" },
    ],
    challenge:
      "Bit manipulation (~76%) needed DSL search + GF(2) affine synthesis; equation composes a per-problem symbol substitution with a numeric rule from a handful of examples.",
    outcome:
      "Verified reasoning beats scraped reasoning: the model reproduces provably-correct traces because nothing unverified ever entered the training set.",
    stack: ["PyTorch", "LoRA", "vLLM", "HuggingFace", "Synthetic CoT"],
    tags: ["ai", "research"],
    links: [{ label: "GitHub", href: "https://github.com/Harshith029/nemotron-reasoning-solvers", primary: true }],
  },
  {
    id: "aito",
    year: "2025",
    category: "AI · Urban Tech",
    title: "AITO",
    oneLiner: "AI traffic optimization that treats congestion as an allocation problem.",
    description:
      "Distributes vehicles across viable routes before congestion forms, scoring routes on road capacity, school-timing patterns, and vehicle-type priorities. Built for Hyderabad's traffic quirks — usable by commuters, delivery platforms, and urban planners.",
    architecture: ["Real-time signals", "Route scorer (TF)", "Allocation engine", "FastAPI serve layer"],
    metrics: [
      { value: "3", label: "signal classes fused" },
      { value: "HYD", label: "built for real patterns" },
    ],
    challenge:
      "Traffic isn't a map problem — it's a prediction-and-allocation problem. Individual shortest paths create the jams they try to avoid.",
    outcome: "Routes score dynamically on time-of-day and vehicle mix; buses get priority-lane weighting, school peaks get avoided.",
    stack: ["Python", "TensorFlow", "FastAPI", "Pandas"],
    tags: ["ai"],
    links: [{ label: "GitHub", href: "https://github.com/Harshith029/AITO", primary: true }],
  },
  {
    id: "faultline",
    year: "2025",
    category: "Cloud · Observability",
    title: "FAULTLINE",
    oneLiner: "Pre-incident cascade detection, engineered under a $120 budget cap.",
    description:
      "Detects cascading failures in microservice architectures before they propagate. Deterministic drift math handles the baseline; Amazon Bedrock only fires on real anomalies — the two-stage filter that makes AI affordable in production.",
    architecture: ["Service telemetry", "Deterministic drift filter", "Bedrock RCA (gated)", "Alert + hypothesis"],
    metrics: [
      { value: "$120", label: "total cloud budget" },
      { value: "2-stage", label: "cheap math gates the LLM" },
    ],
    challenge: "LLM calls are the new cloud bill. The architecture had to earn every model invocation.",
    outcome: "Serverless end-to-end on Lambda + DynamoDB + API Gateway in ap-south-1, with Claude on Bedrock for root-cause hypotheses.",
    stack: ["AWS Lambda", "DynamoDB", "Bedrock", "API Gateway"],
    tags: ["cloud", "ai"],
    links: [{ label: "GitHub", href: "https://github.com/Harshith029/faultline", primary: true }],
  },
];

export const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "security", label: "Security" },
  { key: "data", label: "Data" },
  { key: "tooling", label: "Tooling" },
  { key: "cloud", label: "Cloud" },
] as const;
