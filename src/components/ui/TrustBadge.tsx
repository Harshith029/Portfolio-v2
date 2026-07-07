import { TRUST_COPY, type Trust } from "@/data/projects";

const styles: Record<Trust, string> = {
  shipped: "border-mint/40 bg-mint/10 text-mint",
  verified: "border-accent/45 bg-accent/10 text-accent-soft",
  claim: "border-line-strong bg-white/[0.04] text-muted",
};

const dot: Record<Trust, string> = {
  shipped: "bg-mint",
  verified: "bg-accent-soft",
  claim: "bg-muted",
};

export function TrustBadge({ trust, withNote = false }: { trust: Trust; withNote?: boolean }) {
  const copy = TRUST_COPY[trust];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${styles[trust]}`}
      title={copy.note}
    >
      <span className={`size-1.5 rounded-full ${dot[trust]}`} aria-hidden />
      {copy.label}
      {withNote && <span className="tracking-normal opacity-70">· {copy.note}</span>}
    </span>
  );
}
