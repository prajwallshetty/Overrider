"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Mode = { id: string; label: string; summary: string; sequence: string[]; operator: string };

/** Interactive operating-mode explorer (tabs + animated sequence). */
export function ModesTabs({ modes }: { modes: Mode[] }) {
  return (
    <Tabs.Root defaultValue={modes[0].id} className="grid gap-8 lg:grid-cols-12">
      <Tabs.List aria-label="Operating modes" className="no-scrollbar flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible">
        {modes.map((m, i) => (
          <Tabs.Trigger
            key={m.id}
            value={m.id}
            className={cn(
              "group/tab relative shrink-0 rounded-xl border border-ink/10 bg-paper px-5 py-4 text-left transition-all duration-300",
              "data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-white hover:border-ink/30",
            )}
          >
            <span className="font-mono text-[11px] text-red">M{i + 1}</span>
            <span className="mt-1 block text-lg font-semibold tracking-tight">{m.label}</span>
            <span className="mt-1 hidden text-xs text-ink/50 group-data-[state=active]/tab:text-white/50 lg:block">Controlled by: {m.operator}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {modes.map((m) => (
        <Tabs.Content key={m.id} value={m.id} className="lg:col-span-8 focus-visible:outline-none">
          <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-7 text-white md:p-10">
            <div className="hairline-grid absolute inset-0 text-white opacity-50" aria-hidden />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{m.label}</p>
                <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/60">
                  Authority · {m.operator}
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{m.summary}</p>
              <ol className="mt-10 grid gap-3 sm:grid-cols-2">
                {m.sequence.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red font-mono text-xs">{i + 1}</span>
                    <span className="text-[15px] text-white/85">{s}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
