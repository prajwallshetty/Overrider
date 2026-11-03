import { PageHero } from "@/components/layout/page-hero";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { getFaqs, getSystems } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "FAQs", description: "Frequently asked questions about Override-R systems, products and services.", path: "/knowledge/faqs" });

export default async function FaqPage() {
  const [faqs, systems] = await Promise.all([getFaqs(), getSystems()]);
  const systemFaqs = systems.flatMap((s) => s.blocks.filter((b) => b.type === "faq").flatMap((b) => (b.type === "faq" ? b.items.map((i) => ({ ...i, topic: s.name })) : [])));
  const all = [...faqs, ...systemFaqs];
  const topics = Array.from(new Set(all.map((f) => f.topic)));
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <PageHero variant="light" eyebrow="Knowledge centre" title="Frequently asked questions" intro="Answers on our systems, products, services and how we work." crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "FAQs" }]} />
      <KnowledgeNav active="/knowledge/faqs" />
      <Section tone="paper" className="!pt-14">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <nav aria-label="FAQ topics" className="lg:col-span-3">
              <ul className="space-y-1 lg:sticky lg:top-28">
                {topics.map((t) => (
                  <li key={t}><a href={`#${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block rounded-lg px-3 py-2 text-sm text-ink/60 hover:bg-white hover:text-ink">{t}</a></li>
                ))}
              </ul>
            </nav>
            <div className="space-y-16 lg:col-span-9">
              {topics.map((t) => (
                <section key={t} id={t.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-28">
                  <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-red">{t}</h2>
                  <Accordion items={all.filter((f) => f.topic === t)} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand eyebrow="Still have questions?" title="Ask our engineers directly." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Request a Quote", href: "/request-quote" }} />
      <div className="h-16 bg-paper md:h-24" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
