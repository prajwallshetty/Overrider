import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Breadcrumbs, Container, Section } from "@/components/ui/primitives";
import { Visual } from "@/components/visuals/visual";
import { ArticleCard } from "@/components/knowledge/article-card";
import { ShareLinks } from "@/components/knowledge/share-links";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { CtaBand } from "@/components/sections/cta-band";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/company";
import { formatDate } from "@/lib/utils";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  const meta = pageMeta({ title: a.seo?.title ?? a.title, description: a.seo?.description ?? a.excerpt, path: `/knowledge/${a.slug}`, image: a.image });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: a.date, authors: [a.author.name] }, robots: a.sample ? { index: false, follow: true } : undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  const related = await getRelatedArticles(slug, 3);
  const url = `${site.url}/knowledge/${a.slug}`;
  const toc = a.body.filter((b) => b.type === "h2") as { type: "h2"; text: string }[];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    author: { "@type": "Organization", name: a.author.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  return (
    <>
      <article>
        <header className="bg-paper pt-28 md:pt-36">
          <Container>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: a.categoryName, href: `/knowledge/category/${a.category}` }]} />
            <div className="mx-auto mt-12 max-w-4xl text-center">
              {a.sample && (
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                  <AlertTriangle className="size-3.5" /> Unpublished sample content
                </p>
              )}
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-red">{a.categoryName}</p>
              <AnimatedHeading text={a.title} className="mt-6 text-headline font-semibold md:text-display" />
              <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/60">{a.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink/55">
                <span className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-ink font-display text-xs font-bold text-white">OR</span>
                  {a.author.name}
                </span>
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span>{a.readingTime} min read</span>
              </div>
            </div>
            <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl">
              <Visual kind={a.visual} src={a.image} priority className="aspect-[21/9] w-full" />
            </div>
          </Container>
        </header>

        <Section tone="paper" className="!pt-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <aside className="lg:col-span-3">
                <div className="space-y-10 lg:sticky lg:top-28">
                  {toc.length > 0 && (
                    <nav aria-label="Table of contents">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">In this article</p>
                      <ol className="mt-4 space-y-2 border-l border-ink/10">
                        {toc.map((h) => (
                          <li key={h.text}>
                            <a href={`#${slugify(h.text)}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-ink/60 hover:border-red hover:text-ink">{h.text}</a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}
                  <ShareLinks url={url} title={a.title} />
                </div>
              </aside>
              <div className="prose-ovr lg:col-span-7">
                {a.body.map((b, i) => {
                  switch (b.type) {
                    case "p":
                      return <p key={i} className={i === 0 ? "!text-xl !text-ink/85" : undefined}>{b.text}</p>;
                    case "h2":
                      return <h2 key={i} id={slugify(b.text)} className="scroll-mt-28">{b.text}</h2>;
                    case "h3":
                      return <h3 key={i}>{b.text}</h3>;
                    case "ul":
                      return <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
                    case "callout":
                      return (
                        <aside key={i} className="my-8 rounded-xl border-l-2 border-red bg-white p-6">
                          <p className="!mb-1 font-semibold !text-ink">{b.title}</p>
                          <p className="!mb-0 !text-[15px]">{b.text}</p>
                        </aside>
                      );
                  }
                })}
                <div className="mt-14 flex flex-wrap gap-2 border-t border-ink/10 pt-8">
                  {a.tags.map((t) => <span key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/60">{t}</span>)}
                </div>
                <div className="mt-10 flex gap-5 rounded-2xl bg-white p-6">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">OR</span>
                  <div>
                    <p className="font-semibold">{a.author.name}</p>
                    <p className="text-sm text-ink/50">{a.author.role}</p>
                    <p className="mt-2 text-sm text-ink/65">{a.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 && (
        <Section tone="white">
          <Container>
            <div className="flex items-end justify-between">
              <h2 className="text-headline font-semibold">Related articles</h2>
              <Link href="/knowledge" className="text-sm font-semibold text-red hover:underline">All articles →</Link>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
              {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
            </div>
          </Container>
        </Section>
      )}
      <CtaBand />
      <div className="h-16 bg-paper md:h-24" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
