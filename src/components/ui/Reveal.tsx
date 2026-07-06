"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-14 max-w-3xl md:mb-20">
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">{label}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
