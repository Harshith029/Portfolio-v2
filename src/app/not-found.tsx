import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-base px-6 text-center">
      <div>
        <p className="font-mono text-sm tracking-widest text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-muted">The system you&apos;re looking for was never deployed here.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
