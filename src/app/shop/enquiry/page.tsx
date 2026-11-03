import { PageHero } from "@/components/layout/page-hero";
import { EnquiryBasket } from "@/components/shop/enquiry-basket";
import { Container, Section } from "@/components/ui/primitives";
import { getProducts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Enquiry list", description: "Review your product enquiry list and request a quotation.", path: "/shop/enquiry" }), robots: { index: false } };

export default async function EnquiryListPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero variant="light" eyebrow="Enquiry list" title="Review and request your quotation." crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Enquiry list" }]} />
      <Section tone="paper" className="!pt-4">
        <Container>
          <EnquiryBasket products={products.map(({ slug, name, visual, images, category, summary }) => ({ slug, name, visual, images, category, summary }))} />
        </Container>
      </Section>
    </>
  );
}
