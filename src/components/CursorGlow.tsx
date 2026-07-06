"use client";

import { useEffect, useRef } from "react";

/** Mouse-follow ambient glow. Writes styles directly — zero re-renders. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = -800;
    let y = -800;

    const paint = () => {
      raf = 0;
      el.style.background = `radial-gradient(560px at ${x}px ${y}px, rgba(59,130,246,0.065), transparent 70%)`;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[5]" />;
}
