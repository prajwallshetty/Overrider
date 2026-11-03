import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/primitives";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { TextLink } from "@/components/ui/button";
import { getProduct } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Request a Quote", description: "Request a quotation for Override-R panels, controls and engineering services.", path: "/request-quote" });

export default async function RequestQuotePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product: slug } = await searchParams;
  const product = slug ? await getProduct(slug) : null;
  return (
    <>
      <PageHero variant="light" eyebrow="Request a quote" title="Tell us about your project." intro="Quotations are prepared by our engineers for each project's zoning, equipment and requirements." crumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]} />
      <Section tone="paper" className="!pt-4">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-ink p-8 text-white lg:sticky lg:top-28">
                <p className="font-display text-xl font-semibold">What helps us quote accurately</p>
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  {["Fire strategy or cause-and-effect matrix", "Fan and damper schedule", "Number of zones and stair cores", "Interface requirements (fire alarm / BMS)", "Project location and programme"].map((x) => (
                    <li key={x} className="flex gap-3"><Check className="size-4 shrink-0 text-red-400" />{x}</li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/45">You can send documents by email after submitting the form, quoting your reference.</p>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <TextLink href="/shop" light>Build a product list first</TextLink>
                </div>
              </div>
            </aside>
            <div className="lg:col-span-8">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/5 md:p-10">
                <EnquiryForm type="quote" products={product ? [{ slug: product.slug, name: product.name, qty: 1 }] : undefined} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
