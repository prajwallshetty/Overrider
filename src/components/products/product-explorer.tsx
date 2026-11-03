"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product, ProductCategory } from "@/content/types";
import { ProductCard } from "./product-card";
import { AddToEnquiry } from "@/components/shop/add-to-enquiry";
import { cn } from "@/lib/utils";

const statusOptions = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "in-development", label: "In development" },
] as const;

export function ProductExplorer({
  products,
  categories,
  initialCategory,
  initialQuery = "",
  mode = "catalogue",
}: {
  products: Product[];
  categories: ProductCategory[];
  initialCategory?: string;
  initialQuery?: string;
  mode?: "catalogue" | "shop";
}) {
  const [cat, setCat] = useState<string>(categories.some((c) => c.slug === initialCategory) ? initialCategory! : "all");
  const [q, setQ] = useState(initialQuery);
  const [status, setStatus] = useState<(typeof statusOptions)[number]["id"]>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sync = (nextCat: string, nextQ: string) => {
    const url = new URL(window.location.href);
    nextCat === "all" ? url.searchParams.delete("category") : url.searchParams.set("category", nextCat);
    nextQ ? url.searchParams.set("q", nextQ) : url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (status !== "all" && p.status !== status) return false;
      if (!term) return true;
      const hay = [p.name, p.summary, p.category, ...p.features, ...p.applications].join(" ").toLowerCase();
      return term.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [products, cat, q, status]);

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length])), [categories, products]);

  const Filters = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Category</p>
        <ul className="space-y-0.5">
          {[{ slug: "all", name: "All products" }, ...categories].map((c) => {
            const n = c.slug === "all" ? products.length : counts[c.slug];
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  aria-pressed={cat === c.slug}
                  onClick={() => {
                    setCat(c.slug);
                    sync(c.slug, q);
                    setFiltersOpen(false);
                  }}
                  className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors", cat === c.slug ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5")}
                >
                  <span>{c.name}</span>
                  <span className={cn("font-mono text-[11px]", cat === c.slug ? "text-white/60" : "text-ink/35")}>{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Availability</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <button key={s.id} type="button" aria-pressed={status === s.id} onClick={() => setStatus(s.id)} className={cn("rounded-full border px-3 py-1.5 text-xs transition-colors", status === s.id ? "border-red bg-red text-white" : "border-ink/15 text-ink/70 hover:border-ink/40")}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">{Filters}</div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                sync(cat, e.target.value);
              }}
              placeholder="Search panels, controllers, applications…"
              className="h-12 w-full rounded-full border border-ink/15 bg-white pl-11 pr-4 text-[15px] outline-none transition-colors focus:border-ink"
            />
          </label>
          <button type="button" onClick={() => setFiltersOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-5 text-sm lg:hidden">
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-ink/55" aria-live="polite">
          <p>
            Showing <span className="font-semibold text-ink">{results.length}</span> of {products.length} products
            {cat !== "all" && <> in <span className="font-semibold text-ink">{categories.find((c) => c.slug === cat)?.name}</span></>}
          </p>
          {(cat !== "all" || q || status !== "all") && (
            <button
              type="button"
              onClick={() => {
                setCat("all");
                setQ("");
                setStatus("all");
                sync("all", "");
              }}
              className="inline-flex items-center gap-1 text-red hover:underline"
            >
              <X className="size-3.5" /> Clear
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 p-14 text-center">
            <p className="text-lg font-semibold">No products match your filters.</p>
            <p className="mt-2 text-ink/60">Try a different search term, or contact us — we may still be able to help.</p>
          </div>
        ) : (
          <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.li key={p.slug} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
                  <ProductCard product={p}>
                    {mode === "shop" && (
                      <div className="flex gap-2">
                        <AddToEnquiry slug={p.slug} size="sm" className="flex-1" />
                        <a href={`/api/product-sheet/${p.slug}`} className="inline-flex h-9 items-center rounded-full border border-ink/15 px-3 text-xs hover:border-ink" aria-label={`Download product information for ${p.name}`}>
                          Info ↓
                        </a>
                      </div>
                    )}
                  </ProductCard>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/50" onClick={() => setFiltersOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-paper p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-xl font-semibold">Filters</p>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid size-10 place-items-center rounded-full border border-ink/15">
                  <X className="size-4" />
                </button>
              </div>
              {Filters}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
