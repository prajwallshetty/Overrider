import Link from "next/link";
import { Download } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ProductExplorer } from "@/components/products/product-explorer";
import { BasketBar } from "@/components/shop/basket-bar";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Visual } from "@/components/visuals/visual";
import { getProductCategories, getProducts, getResources } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shop — Enquiry catalogue",
  description: "Browse Override-R products, build an enquiry list and request a quotation. B2B enquiry-based catalogue.",
  path: "/shop",
});

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const [{ category, q }, products, categories, downloads] = await Promise.all([searchParams, getProducts(), getProductCategories(), getResources("download")]);
  return (
    <>
      <PageHero
        variant="light"
        eyebrow="Enquiry shop"
        title="Build your enquiry. We'll build the quotation."
        intro="A B2B catalogue for consultants, contractors and building owners. Add products to your enquiry list and request a tailored quotation — no online payment required."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        aside={
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
            {[
              ["Browse & filter", "Search the catalogue by category, application or availability."],
              ["Add to enquiry list", "Collect the products and quantities you need for your project."],
              ["Request quotation", "Send your list with project details — an engineer responds."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-5 bg-paper p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-white">{i + 1}</span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-ink/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        }
      />

      <Section tone="white" className="!py-16">
        <Container>
          <Eyebrow>Shop by category</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop?category=${c.slug}#catalogue`} className="group/cat relative overflow-hidden rounded-xl border border-ink/10">
                <Visual kind={c.visual} className="aspect-[4/3] w-full transition-transform duration-700 group-hover/cat:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold leading-snug text-white">{c.name}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="catalogue" tone="paper">
        <Container>
          <ProductExplorer key={`${category ?? "all"}-${q ?? ""}`} mode="shop" products={products} categories={categories} initialCategory={category} initialQuery={q} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Product information</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Downloads</h2>
              <p className="mt-4 text-ink/60">Brochures and catalogues will be available here. Individual product information sheets can be downloaded from any product card.</p>
            </div>
            <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
              {downloads.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-6 py-5">
                  <div>
                    <p className="font-semibold">{d.title}</p>
                    <p className="text-sm text-ink/55">{d.description}</p>
                  </div>
                  {d.file ? (
                    <a href={d.file} download className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">
                      <Download className="size-4" /> {d.format}
                    </a>
                  ) : (
                    <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1.5 text-xs text-ink/50">Coming soon</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <BasketBar />
    </>
  );
}
