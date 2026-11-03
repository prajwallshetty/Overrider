import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SampleNotice } from "@/components/ui/primitives";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Privacy notice", description: "Privacy notice for the Override-R website.", path: "/privacy" });

const sections: [string, string][] = [
  ["Information we collect", "When you submit an enquiry we collect the details you provide: name, company, business email, phone or WhatsApp number, country, project information and your message. Your enquiry list is stored only in your browser until you submit it."],
  ["How we use it", "We use this information to respond to your enquiry, prepare quotations and provide technical support. We do not sell your information."],
  ["Processors", "Enquiries may be forwarded to our CRM or business systems to manage responses. Details of processors will be listed here."],
  ["Retention", "We keep enquiry information only as long as necessary for the purposes above or as required by law."],
  ["Your rights", "You may request access to, correction of, or deletion of your information by contacting us."],
];

export default function Page() {
  return (
    <>
      <PageHero variant="light" eyebrow="Legal" title="Privacy notice" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy notice" }]} />
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
