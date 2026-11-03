import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ArticleCard } from "@/components/knowledge/article-card";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { getArticleCategories, getArticlesByCategory } from "@/lib/content";
import type { ArticleCategorySlug } from "@/content/types";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getArticleCategories()).map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = (await getArticleCategories()).find((x) => x.slug === slug);
  return c ? pageMeta({ title: c.name, description: c.description, path: `/knowledge/category/${c.slug}` }) : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = (await getArticleCategories()).find((x) => x.slug === slug);
  if (!cat) notFound();
  const articles = await getArticlesByCategory(cat.slug as ArticleCategorySlug);
  return (
    <>
      <PageHero variant="light" eyebrow="Knowledge centre" title={cat.name} intro={cat.description} crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: cat.name }]} />
      <KnowledgeNav active={`/knowledge/category/${cat.slug}`} />
      <Section tone="paper" className="!pt-14">
        <Container>
          {cat.slug === "case-studies" && <SampleNotice className="mb-10">Case studies will be published only with client approval. The entry below is a structural placeholder.</SampleNotice>}
          {articles.length ? (
            <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-ink/20 p-12 text-center text-ink/60">Articles in this category are coming soon.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
