"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Cursor-following spotlight surface (21st.dev "spotlight card" pattern). Pure CSS variables — no re-renders. */
export function SpotlightCard({
  children,
  className,
  color = "rgba(212,39,29,0.14)",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag
      ref={ref as never}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
      className={cn("group/spot relative isolate overflow-hidden", className)}
      style={{ ["--spot" as string]: color }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), var(--spot), transparent 60%)" }}
      />
      {children}
    </Tag>
  );
}
