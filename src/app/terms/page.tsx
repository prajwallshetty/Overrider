import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms of use", description: "Terms of use for the Override-R website.", path: "/terms" });

const sections: [string, string][] = [
  ["General information", "Content on this website is provided for general information. It is not design advice and must not be relied on for the design of any life-safety system."],
  ["Product information", "Product descriptions and specifications are subject to change. Values marked as awaiting data are not confirmed. Always request current technical data before specifying."],
  ["Development technology", "Technologies described as in development are not commercially available or certified and may change."],
  ["Quotations", "Enquiries submitted through this website do not form a contract. Quotations are subject to separate terms."],
  ["Intellectual property", "Content, illustrations and branding on this website belong to Override-R unless stated otherwise."],
];

export default function Page() {
  return (
    <>
      <PageHero variant="light" eyebrow="Legal" title="Terms of use" crumbs={[{ label: "Home", href: "/" }, { label: "Terms of use" }]} />
      <Section tone="paper" className="!pt-4">
        <Container>
          <div className="max-w-3xl">
            <SampleNotice className="mb-10">Template text — to be reviewed and completed by the company&apos;s legal adviser before launch.</SampleNotice>
            <div className="prose-ovr">
              {sections.map(([h, b]) => (
                <div key={h}>
                  <h2>{h}</h2>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
