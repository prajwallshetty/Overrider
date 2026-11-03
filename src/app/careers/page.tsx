import { PageHero } from "@/components/layout/page-hero";
import { StoryNav } from "@/components/sections/story-nav";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Container, Eyebrow, Section, SampleNotice } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { openRoles } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Careers", description: "Join Override-R and engineer the systems that keep people safe in buildings.", path: "/careers" });

const values = [
  ["Meaningful work", "Every panel we build protects escape routes and supports firefighters."],
  ["Engineering depth", "Work across controls, fire engineering, commissioning and software."],
  ["Ownership", "Small teams, clear responsibility and direct contact with real projects."],
  ["Learning", "From site commissioning to AI development — broad exposure, fast growth."],
];

export default function CareersPage() {
  return (
    <>
      <PageHero variant="light" eyebrow="Careers" title="Engineer what keeps people safe." intro="We are building a team of engineers who care about getting life-safety details right." crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
      <StoryNav active="/careers" />
      <Section tone="paper">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05} className="rounded-2xl border border-ink/10 bg-white p-7">
                <span className="block h-1 w-8 bg-red" />
                <h2 className="mt-6 text-lg font-semibold tracking-tight">{t}</h2>
                <p className="mt-2 text-sm text-ink/60">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Open roles</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Opportunities</h2>
            </div>
            <SampleNotice className="md:max-w-md">Roles listed are illustrative placeholders. Only confirmed vacancies will be published.</SampleNotice>
          </div>
          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {openRoles.map((r) => (
              <li key={r.title} className="grid gap-2 py-7 md:grid-cols-12 md:items-center">
                <p className="text-xl font-semibold tracking-tight md:col-span-6">{r.title}</p>
                <p className="text-sm text-ink/55 md:col-span-2">{r.team}</p>
                <p className="text-sm text-ink/55 md:col-span-2">{r.location}</p>
                <p className="text-sm text-ink/55 md:col-span-2 md:text-right">{r.type}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Apply</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Introduce yourself.</h2>
              <p className="mt-4 text-ink/60">Tell us about your background and the role you are interested in. CV upload will be added with the recruitment system.</p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm type="careers" submitLabel="Send introduction" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
