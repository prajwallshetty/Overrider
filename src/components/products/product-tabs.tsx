"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { Product } from "@/content/types";
import { Placeholder } from "@/components/ui/primitives";

export function ProductTabs({ product }: { product: Pick<Product, "specs" | "dimensions" | "configurations"> }) {
  const tabs = [
    { id: "specs", label: "Technical specifications" },
    ...(product.dimensions.length ? [{ id: "dimensions", label: "Dimensions" }] : []),
    { id: "configs", label: "Configurations" },
  ];
  return (
    <Tabs.Root defaultValue="specs">
      <Tabs.List aria-label="Product data" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink/10">
        {tabs.map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className="relative shrink-0 px-4 py-4 text-sm font-medium text-ink/50 transition-colors hover:text-ink data-[state=active]:text-ink data-[state=active]:after:absolute data-[state=active]:after:inset-x-4 data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-red"
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="specs" className="pt-8 focus-visible:outline-none">
        <div className="grid gap-8 md:grid-cols-2">
          {product.specs.map((g) => (
            <div key={g.group}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">{g.group}</p>
              <dl className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                {g.items.map((it) => (
                  <div key={it.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
                    <dt className="text-ink/60">{it.label}</dt>
                    <dd className="font-medium">{it.value ?? <Placeholder />}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Tabs.Content>

      {product.dimensions.length > 0 && (
        <Tabs.Content value="dimensions" className="pt-8 focus-visible:outline-none">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <svg viewBox="0 0 300 220" className="w-full max-w-sm text-ink" aria-hidden>
              <rect x="70" y="30" width="150" height="160" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M220 30 L250 15 L250 175 L220 190" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
              <path d="M70 30 L100 15 L250 15" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
              <path d="M70 205 H220" stroke="#d4271d" strokeWidth="1" />
              <path d="M50 30 V190" stroke="#d4271d" strokeWidth="1" />
              <path d="M226 200 L256 185" stroke="#d4271d" strokeWidth="1" />
              <text x="145" y="218" textAnchor="middle" fontSize="10" fill="#d4271d" fontFamily="monospace">W</text>
              <text x="38" y="114" textAnchor="middle" fontSize="10" fill="#d4271d" fontFamily="monospace">H</text>
              <text x="252" y="204" fontSize="10" fill="#d4271d" fontFamily="monospace">D</text>
            </svg>
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {product.dimensions.map((d) => (
                <div key={d.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
                  <dt className="text-ink/60">{d.label}</dt>
                  <dd className="font-medium">{d.value ?? <Placeholder />}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Tabs.Content>
      )}

      <Tabs.Content value="configs" className="pt-8 focus-visible:outline-none">
        <ul className="grid gap-3 md:grid-cols-2">
          {product.configurations.map((c, i) => (
            <li key={c} className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white p-5 text-[15px]">
              <span className="font-mono text-xs text-red">C{i + 1}</span>
              {c}
            </li>
          ))}
        </ul>
      </Tabs.Content>
    </Tabs.Root>
  );
}
