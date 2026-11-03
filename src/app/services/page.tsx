import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Visual } from "@/components/visuals/visual";
import { workflow } from "@/content/company";
import { getServices } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Services", description: "Technical consultation, system design support, integration, project coordination, CFD calculation and technical project support.", path: "/services" });

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero variant="split" visual="blueprint" eyebrow="Services" title="Engineering support from concept to handover." intro="Six services that help consultants, contractors and owners get life-safety control right — at every stage of a project." crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}>
        <ButtonLink href="#services" size="lg" arrow>View services</ButtonLink>
        <ButtonLink href="/contact?type=consultation" size="lg" variant="outline-light">Book a consultation</ButtonLink>
      </PageHero>
      <Section id="services" tone="paper">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <SpotlightCard as="article" className="group/s flex h-full flex-col rounded-2xl border border-ink/10 bg-white">
                  <Link href={`/services/${s.slug}`} className="absolute inset-0 z-20" aria-label={s.name} />
                  <Visual kind={s.visual} tone="light" className="aspect-[16/10] w-full" />
                  <div className="relative flex flex-1 flex-col p-7">
                    <span className="font-mono text-xs text-red">S{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight">{s.name}</h2>
                    <p className="mt-3 flex-1 leading-relaxed text-ink/60">{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      Learn more <ArrowUpRight className="size-4 text-red transition-transform group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="ink">
        <Container>
          <SectionHeading light eyebrow="Engagement" title="Engage us at any stage." intro="Services can be combined across the project lifecycle." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {workflow.map((w, i) => (
              <li key={w.title} className="bg-ink p-6">
                <span className="font-mono text-xs text-red-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-semibold">{w.title}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <CtaBand />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
