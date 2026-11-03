"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation with scroll-spy. */
export function SectionNav({ items, cta }: { items: { id: string; label: string }[]; cta?: { label: string; href: string } }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[72px] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="container-x flex items-center justify-between gap-6">
        <nav aria-label="On this page" className="no-scrollbar -mx-1 flex overflow-x-auto">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={cn(
                "relative shrink-0 px-3 py-4 text-[13px] font-medium transition-colors",
                active === it.id ? "text-ink" : "text-ink/50 hover:text-ink",
              )}
            >
              {it.label}
              {active === it.id && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-red" />}
            </a>
          ))}
        </nav>
        {cta && (
          <a href={cta.href} className="hidden shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red md:inline-block">
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
