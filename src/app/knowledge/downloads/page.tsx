import { PageHero } from "@/components/layout/page-hero";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ResourceList } from "@/components/knowledge/resource-list";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { getResources } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Downloads", description: "Company profile, catalogues and product brochures.", path: "/knowledge/downloads" });

export default async function Page() {
  const items = await getResources("download");
  return (
    <>
      <PageHero variant="light" eyebrow="Knowledge centre" title="Downloads" intro="Company profile, catalogues and product brochures." crumbs={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "Downloads" }]} />
      <KnowledgeNav active="/knowledge/downloads" />
      <Section tone="paper" className="!pt-14">
        <Container>
          <SampleNotice className="mb-12">Files are being prepared and will be published here. Need something now? Contact us and we will send current information.</SampleNotice>
          <ResourceList items={items} />
        </Container>
      </Section>
    </>
  );
}
