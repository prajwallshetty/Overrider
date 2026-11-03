import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory } from "@/lib/content";
import { Visual } from "@/components/visuals/visual";
import { Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className, tone = "light", children }: { product: Product; className?: string; tone?: "light" | "dark"; children?: React.ReactNode }) {
  const cat = getCategory(product.category);
  const dark = tone === "dark";
  return (
    <article className={cn("group/pc relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 ease-out-expo hover:-translate-y-1", dark ? "border-white/10 bg-ink-2 text-white hover:border-white/25" : "border-ink/[0.08] bg-white hover:shadow-[0_30px_60px_-30px_rgba(13,17,23,0.3)]", className)}>
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name} />
      <div className="relative overflow-hidden">
        <Visual kind={product.visual} src={product.images[0]} alt={product.images[0] ? product.name : ""} tone={dark ? "dark" : "light"} className="aspect-[4/3] w-full transition-transform duration-700 ease-out-expo group-hover/pc:scale-[1.04]" sizes="(min-width: 1024px) 33vw, 100vw" />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.status === "in-development" && <Badge tone="amber">In development</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", dark ? "text-white/45" : "text-ink/45")}>{cat.name}</p>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{product.name}</h3>
        <p className={cn("mt-3 line-clamp-3 text-[15px] leading-relaxed", dark ? "text-white/60" : "text-ink/60")}>{product.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className={cn("font-mono text-[11px]", dark ? "text-white/40" : "text-ink/40")}>{product.model ?? "Model ref. TBC"}</span>
          <span className="text-sm font-semibold text-red">View details →</span>
        </div>
        {children && <div className="relative z-20 mt-5">{children}</div>}
      </div>
    </article>
  );
}
