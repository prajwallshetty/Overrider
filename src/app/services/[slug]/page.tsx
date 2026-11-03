import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Info } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { getService, getServices } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getService(slug);
  return s ? pageMeta({ title: s.name, description: s.summary, path: `/services/${s.slug}` }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();
  const others = (await getServices()).filter((x) => x.slug !== s.slug);
  return (
    <>
      <PageHero variant="split" visual={s.visual} eyebrow="Service" title={s.name} intro={s.intro} crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.name }]}>
        <ButtonLink href="#enquiry" size="lg" arrow>Project enquiry</ButtonLink>
      </PageHero>

      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Scope</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">What&apos;s included</h2>
            </div>
            <div className="grid gap-4 lg:col-span-8">
              {s.scope.map((x, i) => (
                <Reveal key={x.title} delay={i * 0.06} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-7 sm:grid-cols-[60px_1fr]">
                  <span className="font-display text-4xl font-semibold text-red">{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{x.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/60">{x.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">Deliverables</p>
              <ul className="mt-5 space-y-3">
                {s.deliverables.map((d) => <li key={d} className="flex gap-3"><Check className="size-4 shrink-0 text-red" />{d}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">When to engage</p>
              <ul className="mt-5 space-y-3">
                {s.whenToEngage.map((d) => <li key={d} className="flex gap-3"><span className="mt-3 h-px w-3 shrink-0 bg-red" />{d}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">Process</p>
              <Stagger as="ol" className="mt-5 space-y-3">
                {s.process.map((p, i) => (
                  <StaggerItem as="li" key={p} className="flex items-center gap-4 rounded-xl border border-ink/10 p-4">
                    <span className="grid size-8 place-items-center rounded-full bg-ink font-mono text-xs text-white">{i + 1}</span>
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
          {s.note && (
            <div className="mt-14 flex gap-4 rounded-2xl border border-ink/10 bg-paper p-6" role="note">
              <Info className="size-5 shrink-0 text-red" />
              <p className="text-ink/70">{s.note}</p>
            </div>
          )}
        </Container>
      </Section>

      <Section id="enquiry" tone="ink">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow light>Project enquiry</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Discuss {s.name.toLowerCase()} for your project.</h2>
              <p className="mt-5 text-lg text-white/60">Share the basics and an engineer will be in touch.</p>
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm type="service" tone="dark" defaultInterest="Services / consultation" defaultMessage={`Service: ${s.name}\n\n`} />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Other services</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug}><Link href={`/services/${o.slug}`} className="block h-full bg-paper p-6 font-semibold transition-colors hover:bg-white hover:text-red">{o.name} →</Link></li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
