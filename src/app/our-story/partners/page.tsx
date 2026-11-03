import { PageHero } from "@/components/layout/page-hero";
import { StoryNav } from "@/components/sections/story-nav";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Container, Eyebrow, Section, SampleNotice } from "@/components/ui/primitives";
import { Marquee } from "@/components/motion/marquee";
import { partners } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Partners", description: "Partner with Override-R — technology, manufacturing, channel, consultant and integration partnerships.", path: "/our-story/partners" });

const models = [
  { title: "Consultants", body: "Early technical input on control strategies and specifications for your projects." },
  { title: "MEP contractors", body: "Panels, controls and commissioning support delivered alongside your installation team." },
  { title: "Channel & distribution", body: "Represent Override-R products in your region. Terms discussed individually." },
  { title: "Technology partners", body: "Integration with fire alarm, BMS, CCTV and monitoring platforms." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero variant="light" eyebrow="Partners" title="Stronger together." intro="Life-safety projects succeed through collaboration. We partner with consultants, contractors, manufacturers and technology companies." crumbs={[{ label: "Home", href: "/" }, { label: "Our Story", href: "/our-story" }, { label: "Partners" }]} />
      <StoryNav active="/our-story/partners" />
      <section className="border-b border-ink/10 bg-white py-10">
        <Marquee duration={35}>
          {partners.map((p, i) => (
            <div key={i} className="flex h-16 w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-ink/20 text-center">
              <span className="text-sm font-semibold text-ink/40">{p.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/30">{p.type}</span>
            </div>
          ))}
        </Marquee>
        <p className="container-x mt-6 text-center text-xs text-ink/45">Partner logos will be displayed only with each partner&apos;s permission.</p>
      </section>
      <Section tone="paper">
        <Container>
          <Eyebrow>Partnership models</Eyebrow>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
            {models.map((m, i) => (
              <div key={m.title} className="bg-paper p-8 md:p-10">
                <span className="font-mono text-xs text-red">P{i + 1}</span>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight">{m.title}</h2>
                <p className="mt-3 text-ink/60">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Partnership enquiry</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Let&apos;s talk.</h2>
              <SampleNotice className="mt-8">Partner programme details are being finalised.</SampleNotice>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm type="partnership" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
