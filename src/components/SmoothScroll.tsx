"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling + a single delegated handler for in-page anchors.
 * Other components request scrolls via the "app:scrollto" CustomEvent
 * (see scrollToId in lib/motion.ts) so there is exactly one scroll owner.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let raf = 0;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.115 });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.1 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onScrollTo = (e: Event) => scrollTo((e as CustomEvent<string>).detail);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollTo(id);
      history.replaceState(null, "", `#${id}`);
    };

    window.addEventListener("app:scrollto", onScrollTo);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("app:scrollto", onScrollTo);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
