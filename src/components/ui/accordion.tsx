"use client";

import * as A from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items, light, className }: { items: { q: string; a: React.ReactNode }[]; light?: boolean; className?: string }) {
  return (
    <A.Root type="single" collapsible className={cn("divide-y border-y", light ? "divide-white/10 border-white/10" : "divide-ink/10 border-ink/10", className)}>
      {items.map((it, i) => (
        <A.Item key={i} value={`i${i}`} className="group">
          <A.Header>
            <A.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="text-lg font-semibold tracking-tight md:text-xl">{it.q}</span>
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo group-data-[state=open]:rotate-45 group-data-[state=open]:border-red group-data-[state=open]:bg-red group-data-[state=open]:text-white", light ? "border-white/20" : "border-ink/15")}>
                <Plus className="size-4" />
              </span>
            </A.Trigger>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-[acc-up_300ms_ease-out] data-[state=open]:animate-[acc-down_400ms_cubic-bezier(0.16,1,0.3,1)]">
            <div className={cn("max-w-3xl pb-7 leading-relaxed", light ? "text-white/65" : "text-ink/65")}>{it.a}</div>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
