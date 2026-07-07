"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { CommandIcon, FileIcon, MenuIcon, XIcon } from "@/components/ui/Icons";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "demo", label: "Demo" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-base/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent to-glow"
        aria-hidden
      />
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6" aria-label="Primary">
        <a href="#hero" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          harshith<span className="text-muted">.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-muted transition hover:bg-white/[0.05] hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("app:cmdk"))}
            className="hidden items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-muted transition hover:border-line-strong hover:text-white md:inline-flex"
            aria-label="Open command palette"
          >
            <CommandIcon className="size-3.5" />
            <span>K</span>
          </button>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-accent-soft sm:inline-flex"
          >
            <FileIcon className="size-4" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon className="size-4.5" /> : <MenuIcon className="size-4.5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-b border-line bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener"
                className="mt-2 block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-semibold"
              >
                Resume
              </a>
            </div>
          </motion.div>
      )}
    </header>
  );
}
