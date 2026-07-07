"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { scrollToId } from "@/lib/motion";
import { ArrowUpRight, CheckIcon } from "@/components/ui/Icons";

type Item = { group: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const items = useMemo<Item[]>(
    () => [
      ...["work", "about", "research", "skills", "demo", "journey", "achievements", "contact"].map((id) => ({
        group: "Navigate",
        label: `Go to ${id[0].toUpperCase()}${id.slice(1)}`,
        hint: "Section",
        run: () => scrollToId(id),
      })),
      {
        group: "Actions",
        label: "Copy email",
        hint: site.email,
        run: () => {
          void navigator.clipboard.writeText(site.email).then(() => flash("Email copied to clipboard"));
        },
      },
      {
        group: "Actions",
        label: "Open resume",
        hint: "PDF",
        run: () => window.open(site.resume, "_blank", "noopener"),
      },
      ...site.socials.map((s) => ({
        group: "Links",
        label: `Open ${s.label}`,
        hint: s.handle,
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ],
    [flash],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("app:cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("app:cmdk", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    close();
    item.run();
  };

  return (
    <>
      {open && (
          <motion.div
            key="palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-[16vh] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((v) => Math.min(v + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((v) => Math.max(v - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    runItem(filtered[active]);
                  }
                }}
                placeholder="Type a command or search…"
                className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-muted"
                aria-label="Search commands"
              />
              <div className="max-h-[46vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-muted">No results.</p>
                )}
                {filtered.map((item, i) => {
                  const showGroup = i === 0 || filtered[i - 1].group !== item.group;
                  return (
                    <div key={`${item.group}-${item.label}`}>
                      {showGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                          {item.group}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => runItem(item)}
                        onMouseEnter={() => setActive(i)}
                        className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          i === active ? "bg-white/[0.07] text-white" : "text-muted"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="flex items-center gap-1.5 truncate font-mono text-[11px] text-muted/70">
                          {item.hint}
                          <ArrowUpRight className="size-3 opacity-50" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] text-muted/70">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </motion.div>
      )}

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-strong bg-panel px-4 py-2 text-sm shadow-xl"
        >
          <CheckIcon className="size-4 text-mint" />
          {toast}
        </motion.div>
      )}
    </>
  );
}
