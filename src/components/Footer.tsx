import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <span className="size-2.5 rounded-full bg-accent" />
          harshith<span className="text-muted">.dev</span>
        </div>
        <p className="text-center text-[13px] text-muted">
          © 2026 {site.name} · Hyderabad, India ·{" "}
          <span className="text-amber-300/90">available for work</span>
        </p>
        <p className="font-mono text-[11px] text-muted/70">
          Next.js · TypeScript · Three.js · designed &amp; built solo
        </p>
      </div>
    </footer>
  );
}
