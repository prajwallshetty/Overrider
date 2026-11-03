import { PageHero } from "@/components/layout/page-hero";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ArticleExplorer } from "@/components/knowledge/article-explorer";
import { ArticleCard } from "@/components/knowledge/article-card";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { getArticleCategories, getArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({ title: "Knowledge centre", description: "Technical articles, fire safety guides, industry insights, case studies, FAQs and resources from Override-R.", path: "/knowledge" });

export default async function KnowledgePage() {
  const [articles, categories] = await Promise.all([getArticles(), getArticleCategories()]);
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero variant="light" eyebrow="Knowledge centre" title="Technical clarity for safer buildings." intro="Articles, guides and resources on smoke control, pressurization, ventilation and fire service control — written by engineers, for project teams." crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge" }]} />
      <KnowledgeNav active="/knowledge" />
      <Section tone="paper" className="!pt-14">
        <Container>
          <SampleNotice className="mb-12">Articles shown are <strong>unpublished samples</strong> prepared to demonstrate the knowledge centre. They will be reviewed, replaced or approved before launch.</SampleNotice>
          {lead && (
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8"><ArticleCard article={lead} size="lg" /></div>
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Browse by type</p>
                <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/knowledge/category/${c.slug}`} className="group/k flex items-center justify-between py-4">
                        <span>
                          <span className="block font-semibold group-hover/k:text-red">{c.name}</span>
                          <span className="block text-sm text-ink/55">{c.description}</span>
                        </span>
                        <span className="font-mono text-xs text-ink/40">{articles.filter((a) => a.category === c.slug).length}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-24">
            <ArticleExplorer articles={rest} categories={categories} />
          </div>
        </Container>
      </Section>
      <CtaBand eyebrow="Ask an engineer" title="Have a technical question?" body="If you cannot find what you need, our engineers are happy to help." primary={{ label: "Ask a question", href: "/contact" }} secondary={{ label: "Browse FAQs", href: "/knowledge/faqs" }} />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
