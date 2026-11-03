import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ProductExplorer } from "@/components/products/product-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { CtaBand } from "@/components/sections/cta-band";
import { Visual } from "@/components/visuals/visual";
import { getProductCategories, getProducts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products",
  description: "Fireman override panels, automatic and semi-automatic panels, zone control, pressurization and ventilation controls, and AI integration products.",
  path: "/products",
});

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const [{ category, q }, products, categories] = await Promise.all([searchParams, getProducts(), getProductCategories()]);
  return (
    <>
      <PageHero
        variant="light"
        eyebrow="Product catalogue"
        title="Control panels and controllers for life-safety systems."
        intro="Browse by category, search by application, and compare panels side by side. Every product is configured to the project's zoning and equipment schedule."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      >
        <ButtonLink href="/products/compare" variant="outline" arrow>
          Compare products
        </ButtonLink>
        <ButtonLink href="/shop" variant="dark">
          Enquiry shop
        </ButtonLink>
      </PageHero>

      <div className="border-y border-ink/10 bg-white">
        <div className="container-x no-scrollbar flex gap-3 overflow-x-auto py-5">
          {categories.map((c) => (
            <Link key={c.slug} href={`/products?category=${c.slug}`} className="flex shrink-0 items-center gap-3 rounded-full border border-ink/10 py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:border-ink">
              <span className="block size-8 overflow-hidden rounded-full">
                <Visual kind={c.visual} className="size-full" />
              </span>
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <Section tone="paper" className="!pt-14">
        <Container>
          <SampleNotice className="mb-10">
            Product names, photography and specifications are being finalised. Values not yet confirmed are clearly marked <strong>Awaiting data</strong> on each product page.
          </SampleNotice>
          <ProductExplorer key={`${category ?? "all"}-${q ?? ""}`} products={products} categories={categories} initialCategory={category} initialQuery={q} />
        </Container>
      </Section>
      <CtaBand title="Need a panel configured to your building?" />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
