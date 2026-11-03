"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { Product, ProductCategory, SystemItem } from "@/content/types";
import { Visual } from "@/components/visuals/visual";
import { Placeholder } from "@/components/ui/primitives";
import { AddToEnquiry } from "@/components/shop/add-to-enquiry";

export function CompareTable({
  products,
  categories,
  systems,
  initial,
}: {
  products: Product[];
  categories: ProductCategory[];
  systems: Pick<SystemItem, "slug" | "shortName">[];
  initial: string[];
}) {
  const [sel, setSel] = useState<string[]>(initial);
  const chosen = sel.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[];
  const specLabels = Array.from(new Set(chosen.flatMap((p) => p.specs.flatMap((g) => g.items.map((i) => `${g.group}::${i.label}`)))));
  const allFeatures = Array.from(new Set(chosen.flatMap((p) => p.features)));
  const cols = `minmax(180px,1fr) repeat(${Math.max(chosen.length, 1)}, minmax(220px,1fr))`;

  const Row = ({ label, children }: { label: React.ReactNode; children: React.ReactNode }) => (
    <div role="row" className="grid border-t border-ink/10" style={{ gridTemplateColumns: cols }}>
      <div role="rowheader" className="sticky left-0 z-10 bg-paper p-4 text-sm font-medium text-ink/60">{label}</div>
      {children}
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {[0, 1, 2].map((i) => (
          <label key={i} className="flex-1 min-w-[220px]">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Product {i + 1}</span>
            <select
              value={sel[i] ?? ""}
              onChange={(e) => {
                const next = [...sel];
                if (e.target.value) next[i] = e.target.value;
                else next.splice(i, 1);
                setSel(next.filter(Boolean));
              }}
              className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm"
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <optgroup key={c.slug} label={c.name}>
                  {products.filter((p) => p.category === c.slug).map((p) => (
                    <option key={p.slug} value={p.slug} disabled={sel.includes(p.slug) && sel[i] !== p.slug}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
        ))}
      </div>

      {chosen.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-ink/20 p-12 text-center text-ink/60">Select products above to compare them.</p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10 bg-paper" role="table" aria-label="Product comparison">
          <div role="row" className="grid" style={{ gridTemplateColumns: cols }}>
            <div className="sticky left-0 z-10 bg-paper p-4" />
            {chosen.map((p) => (
              <div role="columnheader" key={p.slug} className="border-l border-ink/10 bg-white p-4">
                <div className="overflow-hidden rounded-lg">
                  <Visual kind={p.visual} src={p.images[0]} tone="light" className="aspect-[4/3] w-full" />
                </div>
                <Link href={`/products/${p.slug}`} className="mt-4 block font-display text-lg font-semibold leading-snug hover:text-red">{p.name}</Link>
                <div className="mt-4"><AddToEnquiry slug={p.slug} size="sm" full /></div>
              </div>
            ))}
          </div>
          <Row label="Category">{chosen.map((p) => <Cell key={p.slug}>{categories.find((c) => c.slug === p.category)?.name}</Cell>)}</Row>
          <Row label="Status">{chosen.map((p) => <Cell key={p.slug}>{p.status === "available" ? "Available on enquiry" : "In development"}</Cell>)}</Row>
          <Row label="Model reference">{chosen.map((p) => <Cell key={p.slug}>{p.model ?? <Placeholder>TBC</Placeholder>}</Cell>)}</Row>
          <Row label="Systems">{chosen.map((p) => <Cell key={p.slug}>{p.systems.map((s) => systems.find((x) => x.slug === s)?.shortName).join(", ")}</Cell>)}</Row>
          {allFeatures.map((f) => (
            <Row key={f} label={f}>
              {chosen.map((p) => (
                <Cell key={p.slug}>{p.features.includes(f) ? <Check className="size-4 text-red" aria-label="Yes" /> : <X className="size-4 text-ink/20" aria-label="No" />}</Cell>
              ))}
            </Row>
          ))}
          {specLabels.map((k) => {
            const [group, label] = k.split("::");
            return (
              <Row key={k} label={<><span className="block font-mono text-[10px] uppercase tracking-wider text-red">{group}</span>{label}</>}>
                {chosen.map((p) => {
                  const it = p.specs.find((g) => g.group === group)?.items.find((i) => i.label === label);
                  return <Cell key={p.slug}>{it ? it.value ?? <Placeholder /> : <span className="text-ink/30">—</span>}</Cell>;
                })}
              </Row>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <div role="cell" className="border-l border-ink/10 bg-white p-4 text-sm">{children}</div>;
}
