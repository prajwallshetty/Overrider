"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word masked reveal (21st.dev "text reveal" pattern).
 * Wrap a word in *asterisks* to render it in the accent colour.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  accentClassName = "text-red",
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  accentClassName?: string;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  let index = 0;
  return (
    <Tag className={cn(className)} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => {
            const accent = word.startsWith("*") && word.endsWith("*");
            const clean = accent ? word.slice(1, -1) : word;
            const i = index++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <motion.span
                  className={cn("inline-block", accent && accentClassName)}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
                >
                  {clean}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
