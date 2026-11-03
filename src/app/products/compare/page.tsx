import { PageHero } from "@/components/layout/page-hero";
import { CompareTable } from "@/components/products/compare-table";
import { Container, Section } from "@/components/ui/primitives";
import { getProductCategories, getProducts, getSystems } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Compare products", description: "Compare Override-R panels and controllers side by side.", path: "/products/compare" });

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const [{ p }, products, categories, systems] = await Promise.all([searchParams, getProducts(), getProductCategories(), getSystems()]);
  const fromQuery = (p ?? "").split(",").filter((s) => products.some((x) => x.slug === s)).slice(0, 3);
  const initial = fromQuery.length ? fromQuery : ["fireman-override-panel-multi-zone", "automatic-smoke-control-panel", "semi-automatic-control-panel"];
  return (
    <>
      <PageHero
        variant="light"
        eyebrow="Product comparison"
        title="Compare panels side by side."
        intro="Select up to three products to compare features, systems and specifications."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Compare" }]}
      />
      <Section tone="paper" className="!pt-4">
        <Container>
          <CompareTable products={products} categories={categories} systems={systems.map(({ slug, shortName }) => ({ slug, shortName }))} initial={initial} />
        </Container>
      </Section>
    </>
  );
}
