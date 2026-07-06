export type SkillGroup = {
  title: string;
  blurb: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML",
    blurb: "Training, fine-tuning, and shipping models that hold up outside the notebook.",
    skills: [
      { name: "Python", level: 95 },
      { name: "LoRA / PEFT", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "HuggingFace", level: 85 },
      { name: "Synthetic data & evals", level: 88 },
      { name: "vLLM", level: 75 },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs designed for cost, correctness, and the 2 AM debug session.",
    skills: [
      { name: "FastAPI · Pydantic", level: 95 },
      { name: "Postgres · SQL", level: 88 },
      { name: "Docker", level: 85 },
      { name: "Node.js · Express", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "MCP / agent protocols", level: 85 },
    ],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Serverless-first, budget-aware, automated from commit to deploy.",
    skills: [
      { name: "AWS Lambda · DynamoDB", level: 82 },
      { name: "Amazon Bedrock", level: 78 },
      { name: "GitHub Actions · CI", level: 90 },
      { name: "API Gateway", level: 80 },
      { name: "Linux · Git", level: 90 },
      { name: "HF Spaces · Render", level: 85 },
    ],
  },
  {
    title: "Frontend",
    blurb: "Interfaces that ship with the backend, not after it.",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "React · Next.js", level: 86 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 80 },
      { name: "Three.js / R3F", level: 72 },
      { name: "Vanilla JS / DOM", level: 92 },
    ],
  },
];
