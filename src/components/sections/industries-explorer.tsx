"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Industry, SystemItem, VisualKey } from "@/content/types";
import { Visual } from "@/components/visuals/visual";
import { cn } from "@/lib/utils";

const visualFor: Record<string, VisualKey> = {
  residential: "pressurization",
  commercial: "building",
  industrial: "smoke",
  "it-parks": "network",
  hospitals: "pressurization",
  hotels: "override",
  infrastructure: "ventilation",
};

export function IndustriesExplorer({ industries, systems }: { industries: Industry[]; systems: Pick<SystemItem, "slug" | "name">[] }) {
  const [active, setActive] = useState(0);
  const cur = industries[active];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <ul className="lg:col-span-6" role="tablist" aria-label="Industries">
        {industries.map((ind, i) => (
          <li key={ind.slug} className="border-b border-white/10 first:border-t">
            <button
              role="tab"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group/ind flex w-full items-baseline gap-6 py-5 text-left"
            >
              <span className={cn("font-mono text-xs transition-colors", i === active ? "text-red-400" : "text-white/30")}>{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("font-display text-[1.6rem] font-semibold tracking-tight transition-all duration-500 ease-out-expo md:text-4xl", i === active ? "translate-x-2 text-white" : "text-white/35 group-hover/ind:text-white/60")}>
                {ind.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div key={cur.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Visual kind={visualFor[cur.slug] ?? "building"} className="aspect-[16/11] w-full" />
              </div>
              <p className="mt-6 text-lg leading-relaxed text-white/70">{cur.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cur.systems.map((s) => {
                  const sys = systems.find((x) => x.slug === s);
                  return sys ? (
                    <Link key={s} href={`/systems/${s}`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-red hover:text-white">
                      {sys.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
