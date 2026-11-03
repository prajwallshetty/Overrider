"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ArticleCategory } from "@/content/types";
import type { EnrichedArticle } from "@/lib/content";
import { ArticleCard } from "./article-card";
import { cn } from "@/lib/utils";

export function ArticleExplorer({ articles, categories, initialCategory = "all" }: { articles: EnrichedArticle[]; categories: ArticleCategory[]; initialCategory?: string }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return articles.filter((a) => (cat === "all" || a.category === cat) && (!t || [a.title, a.excerpt, ...a.tags].join(" ").toLowerCase().includes(t)));
  }, [articles, cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="group" aria-label="Filter by category">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={cat === c.slug}
              onClick={() => setCat(c.slug)}
              className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition-colors", cat === c.slug ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/40")}
            >
              {c.name}
            </button>
          ))}
        </div>
        <label className="relative lg:w-80">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="h-11 w-full rounded-full border border-ink/15 bg-white pl-11 pr-4 text-sm outline-none focus:border-ink" />
        </label>
      </div>
      <p className="mt-6 text-sm text-ink/50" aria-live="polite">{results.length} article{results.length === 1 ? "" : "s"}</p>
      {results.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-ink/20 p-12 text-center text-ink/60">No articles match your search.</p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
