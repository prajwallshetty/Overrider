import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";
import { Badge, Breadcrumbs, Container, Eyebrow, Section, SampleNotice } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Visual } from "@/components/visuals/visual";
import { ProductTabs } from "@/components/products/product-tabs";
import { ProductCard } from "@/components/products/product-card";
import { AddToEnquiry } from "@/components/shop/add-to-enquiry";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { getCategory, getProduct, getProducts, getRelatedProducts, getSystems } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/company";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return pageMeta({ title: p.seo?.title ?? p.name, description: p.seo?.description ?? p.summary, path: `/products/${p.slug}`, image: p.images[0] });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [related, systems] = await Promise.all([getRelatedProducts(slug, 3), getSystems()]);
  const cat = getCategory(product.category);
  const productSystems = systems.filter((s) => product.systems.includes(s.slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: cat.name,
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/products/${product.slug}`,
  };

  return (
    <>
      <section className="bg-paper pt-28 md:pt-32">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: cat.name, href: `/products?category=${cat.slug}` }, { label: product.name }]} />
          <div className="mt-8 grid gap-10 pb-16 lg:grid-cols-12 lg:gap-14 lg:pb-24">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-ink/10">
                <Visual kind={product.visual} src={product.images[0]} alt={product.images[0] ? product.name : ""} tone="light" priority className="aspect-[4/3] w-full" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {(product.images.length > 1 ? product.images.slice(1, 5) : [undefined, undefined, undefined, undefined]).map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-ink/10">
                    <Visual kind={i % 2 ? "blueprint" : product.visual} src={src} tone={i % 2 ? "light" : "dark"} className="aspect-square w-full" />
                  </div>
                ))}
              </div>
              {product.images.length === 0 && <p className="mt-3 text-xs text-ink/45">Technical illustration shown — product photography to be added.</p>}
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/products?category=${cat.slug}`}>
                    <Badge>{cat.name}</Badge>
                  </Link>
                  {product.status === "in-development" ? <Badge tone="amber">In development</Badge> : <Badge tone="red">Available on enquiry</Badge>}
                </div>
                <h1 className="mt-6 text-headline font-semibold">{product.name}</h1>
                <p className="mt-3 font-mono text-xs text-ink/45">Model reference: {product.model ?? "to be confirmed"}</p>
                <p className="mt-6 text-lg leading-relaxed text-ink/70">{product.summary}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <AddToEnquiry slug={product.slug} size="lg" className="flex-1" />
                  <ButtonLink href={`/request-quote?product=${product.slug}`} size="lg" arrow className="flex-1">
                    Request a Quote
                  </ButtonLink>
                </div>
                <div className="mt-6 grid gap-2 border-t border-ink/10 pt-6 text-sm">
                  {product.datasheet ? (
                    <a href={product.datasheet} download className="flex items-center justify-between rounded-lg px-1 py-2 hover:text-red">
                      <span className="flex items-center gap-3"><FileText className="size-4 text-red" /> Datasheet (PDF)</span>
                      <Download className="size-4" />
                    </a>
                  ) : (
                    <span className="flex items-center justify-between px-1 py-2 text-ink/45" aria-disabled>
                      <span className="flex items-center gap-3"><FileText className="size-4" /> Datasheet (PDF)</span>
                      <span className="text-xs">Coming soon</span>
                    </span>
                  )}
                  <a href={`/api/product-sheet/${product.slug}`} className="flex items-center justify-between rounded-lg px-1 py-2 hover:text-red">
                    <span className="flex items-center gap-3"><FileText className="size-4 text-red" /> Product information sheet</span>
                    <Download className="size-4" />
                  </a>
                </div>
                {productSystems.length > 0 && (
                  <div className="mt-6 border-t border-ink/10 pt-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Used in systems</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {productSystems.map((s) => (
                        <Link key={s.slug} href={`/systems/${s.slug}`} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs hover:border-red hover:text-red">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Product overview</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">What it does</h2>
            </div>
            <div className="lg:col-span-7">
              {product.overview.map((p, i) => (
                <p key={i} className="mb-5 text-lg leading-relaxed text-ink/70">{p}</p>
              ))}
              {product.status === "in-development" && (
                <SampleNotice className="mt-6">This product is in development and is not certified as a fire detection or life-safety device. It is not a substitute for code-compliant systems.</SampleNotice>
              )}
            </div>
          </div>

          <div className="mt-20 grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Applications</p>
              <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 py-4"><span className="h-px w-4 bg-red" />{a}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Features</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <li key={f} className="rounded-xl border border-ink/10 bg-paper p-5">
                    <span className="font-mono text-xs text-red">F{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2 font-medium">{f}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="specifications">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Technical data</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Specifications</h2>
            </div>
            <p className="max-w-md text-sm text-ink/55">Values marked <strong>Awaiting data</strong> will be published once verified. Do not use this page for design until values are confirmed.</p>
          </div>
          <div className="mt-10">
            <ProductTabs product={product} />
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="white">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-headline font-semibold">Related products</h2>
              <Link href="/products/compare" className="text-sm font-semibold text-red hover:underline">Compare →</Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="ink" id="enquire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow light>Product enquiry</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Ask about the {product.name}.</h2>
              <p className="mt-5 text-lg text-white/60">Tell us about your project and configuration requirements. We will respond with technical information and pricing.</p>
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm type="product" tone="dark" products={[{ slug: product.slug, name: product.name, qty: 1 }]} />
            </div>
          </div>
        </Container>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
