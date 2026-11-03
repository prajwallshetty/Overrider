"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Scroll-linked vertical timeline (21st.dev "timeline" pattern). */
export function Timeline({
  items,
  light,
  className,
}: {
  items: { label: string; title: string; body: string }[];
  light?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className={cn("relative", className)}>
      <div className={cn("absolute left-[11px] top-2 bottom-2 w-px md:left-1/2", light ? "bg-white/10" : "bg-ink/10")} aria-hidden />
      <motion.div style={{ scaleY }} className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-red md:left-1/2" aria-hidden />
      {items.map((it, i) => (
        <li key={i} className="relative grid gap-2 pb-14 pl-12 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
          <span className={cn("absolute left-0 top-1 grid size-[23px] place-items-center rounded-full border md:left-1/2 md:-translate-x-1/2", light ? "border-white/20 bg-ink" : "border-ink/15 bg-paper")}>
            <span className="size-2 rounded-full bg-red" />
          </span>
          <div className={cn("md:text-right", i % 2 === 1 && "md:order-2 md:text-left")}>
            <p className={cn("font-mono text-xs uppercase tracking-[0.2em]", light ? "text-white/50" : "text-ink/50")}>{it.label}</p>
            <h3 className="mt-2 text-title font-semibold">{it.title}</h3>
          </div>
          <p className={cn("max-w-md leading-relaxed", light ? "text-white/65" : "text-ink/65", i % 2 === 1 && "md:order-1 md:ml-auto md:text-right")}>{it.body}</p>
        </li>
      ))}
    </ol>
  );
}
