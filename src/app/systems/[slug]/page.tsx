import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { SectionNav } from "@/components/layout/section-nav";
import { SystemBlocks, blockId } from "@/components/systems/blocks";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { getProductsByCategories, getSystem, getSystems } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

const navLabels: Record<string, string> = {
  overview: "Overview",
  principle: "Working principle",
  architecture: "Architecture",
  subsystems: "Systems",
  modes: "Modes",
  control: "Control",
  philosophy: "Control philosophy",
  applications: "Applications",
  components: "Components",
  considerations: "Considerations",
  products: "Products",
  faq: "FAQs",
  enquiry: "Enquiry",
  notice: "Status",
};

/** Hero composition varies per system for distinct visual identity. */
const heroVariant: Record<string, "split" | "immersive"> = {
  "smoke-management": "immersive",
  pressurization: "split",
  ventilation: "immersive",
  "fireman-override-systems": "split",
  "ai-automation-integration": "split",
};

export async function generateStaticParams() {
  return (await getSystems()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getSystem(slug);
  if (!s) return {};
  return pageMeta({ title: s.seo?.title ?? s.name, description: s.seo?.description ?? s.summary, path: `/systems/${s.slug}` });
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = await getSystem(slug);
  if (!system) notFound();
  const [products, all] = await Promise.all([getProductsByCategories(system.relatedCategories), getSystems()]);
  const nav = system.blocks
    .filter((b) => b.type !== "callout" && !(b.type === "related-products" && !products.length))
    .map((b) => ({ id: blockId(b), label: navLabels[blockId(b)] ?? blockId(b) }));
  const idx = all.findIndex((s) => s.slug === system.slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <PageHero
        variant={heroVariant[system.slug] ?? "split"}
        eyebrow={system.category}
        title={system.heroTitle}
        intro={system.heroIntro}
        visual={system.visual}
        image={system.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Systems", href: "/systems" }, { label: system.name }]}
        aside={
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-t-2xl border border-b-0 border-white/10 bg-white/10 sm:grid-cols-3 mt-4">
            {system.facets.map((f) => (
              <div key={f.label} className="bg-ink/80 px-6 py-5 backdrop-blur">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{f.label}</dt>
                <dd className="mt-1.5 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <ButtonLink href="#enquiry" size="lg" arrow>
          Technical enquiry
        </ButtonLink>
        {products.length > 0 && (
          <ButtonLink href="#products" size="lg" variant="outline-light">
            Related products
          </ButtonLink>
        )}
        {system.status === "in-development" && <Badge tone="amber" className="self-center">In development</Badge>}
      </PageHero>
      <SectionNav items={nav} cta={{ label: "Enquire", href: "#enquiry" }} />
      <SystemBlocks system={system} products={products} />

      <Link href={`/systems/${next.slug}`} className="group block bg-paper">
        <div className="container-x flex items-center justify-between gap-6 border-b border-ink/10 py-14 md:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/45">Next system</p>
            <p className="mt-3 font-display text-display font-semibold transition-colors group-hover:text-red">{next.name}</p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-ink/15 text-2xl transition-all duration-500 group-hover:translate-x-2 group-hover:border-red group-hover:bg-red group-hover:text-white md:size-24">
            →
          </span>
        </div>
      </Link>
    </>
  );
}
