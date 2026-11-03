import Link from "next/link";
import type { EnrichedArticle } from "@/lib/content";
import { Visual } from "@/components/visuals/visual";
import { formatDate, cn } from "@/lib/utils";

export function ArticleCard({ article, size = "md", className }: { article: EnrichedArticle; size?: "lg" | "md" | "row"; className?: string }) {
  if (size === "row") {
    return (
      <article className={cn("group/ac relative grid grid-cols-[120px_1fr] gap-5 border-t border-ink/10 py-6 sm:grid-cols-[180px_1fr]", className)}>
        <Link href={`/knowledge/${article.slug}`} className="absolute inset-0 z-10" aria-label={article.title} />
        <div className="overflow-hidden rounded-lg">
          <Visual kind={article.visual} src={article.image} tone="light" className="aspect-[4/3] w-full transition-transform duration-700 group-hover/ac:scale-105" />
        </div>
        <div>
          <Meta article={article} />
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight transition-colors group-hover/ac:text-red">{article.title}</h3>
        </div>
      </article>
    );
  }
  return (
    <article className={cn("group/ac relative flex flex-col", className)}>
      <Link href={`/knowledge/${article.slug}`} className="absolute inset-0 z-10" aria-label={article.title} />
      <div className="relative overflow-hidden rounded-2xl">
        <Visual kind={article.visual} src={article.image} tone={size === "lg" ? "dark" : "light"} className={cn("w-full transition-transform duration-700 ease-out-expo group-hover/ac:scale-[1.03]", size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]")} />
        {article.sample && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900">Unpublished sample</span>
        )}
      </div>
      <div className="mt-5">
        <Meta article={article} />
        <h3 className={cn("mt-3 font-display font-semibold tracking-tight transition-colors group-hover/ac:text-red", size === "lg" ? "text-headline" : "text-xl leading-snug")}>{article.title}</h3>
        <p className="mt-3 line-clamp-2 leading-relaxed text-ink/60">{article.excerpt}</p>
      </div>
    </article>
  );
}

function Meta({ article }: { article: EnrichedArticle }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/50">
      <span className="text-red">{article.categoryName}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readingTime} min read</span>
    </p>
  );
}
