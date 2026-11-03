import { PageHero } from "@/components/layout/page-hero";
import { StoryNav } from "@/components/sections/story-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Visual } from "@/components/visuals/visual";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({ title: "Technology & innovation", description: "Override-R's technology direction: proven control systems today, AI-assisted detection and connected monitoring in development.", path: "/our-story/technology" });

const stages = [
  { stage: "Available", tone: "green", title: "Control systems", items: ["Fireman override panels", "Automatic & semi-automatic panels", "Zone control", "Pressurization & ventilation controls"] },
  { stage: "In development", tone: "amber", title: "Monitoring & integration", items: ["Safety monitoring gateway", "BMS status integration", "Event and fault history"] },
  { stage: "Research & development", tone: "amber", title: "AI-assisted awareness", items: ["Vision-based smoke identification", "Vision-based flame identification", "Human-verified alert workflow"] },
  { stage: "Future direction", tone: "grey", title: "Connected safety", items: ["Readiness reporting", "Remote diagnostics concept", "Portfolio-level visibility"] },
] as const;

export default function TechnologyPage() {
  return (
    <>
      <PageHero variant="split" visual="ai" eyebrow="Technology & innovation" title="Proven foundations. Intelligent future." intro="We build intelligence on top of certified life-safety systems — never instead of them. Here is where each part of our technology stands today." crumbs={[{ label: "Home", href: "/" }, { label: "Our Story", href: "/our-story" }, { label: "Technology" }]}>
        <ButtonLink href="/systems/ai-automation-integration" size="lg" arrow>AI &amp; automation</ButtonLink>
      </PageHero>
      <StoryNav active="/our-story/technology" />

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Technology roadmap" title="A transparent view of maturity." intro="We clearly separate what is commercially available from what is in development or research. Timelines will be shared only when they are confirmed." />
          <div className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-emerald-500 via-amber-400 to-ink/10 lg:block" />
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="relative">
                <span className={cn("relative z-10 inline-flex items-center gap-2 rounded-full border bg-paper px-3 py-1.5 text-xs font-semibold", s.tone === "green" ? "border-emerald-500/40 text-emerald-700" : s.tone === "amber" ? "border-amber-400/60 text-amber-800" : "border-ink/15 text-ink/50")}>
                  <span className={cn("size-2 rounded-full", s.tone === "green" ? "bg-emerald-500" : s.tone === "amber" ? "bg-amber-400" : "bg-ink/30")} />
                  {s.stage}
                </span>
                <div className={cn("mt-6 rounded-2xl border p-7", s.tone === "green" ? "border-ink/10 bg-white" : "border-dashed border-ink/20 bg-paper")}>
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <ul className="mt-5 space-y-2 text-sm text-ink/65">
                    {s.items.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-px w-3 shrink-0 bg-red" />{x}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Visual kind="sensor" className="aspect-[4/3] w-full" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <Eyebrow light>AI fire &amp; smoke detection</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">What we are building — and what we are not claiming.</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 p-6">
                  <p className="font-semibold">We are developing</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/65">
                    <li>Vision analytics on existing camera feeds</li>
                    <li>Supplementary alerts for operators</li>
                    <li>Human verification workflows</li>
                    <li>Integration with monitoring dashboards</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-red/40 bg-red/[0.06] p-6">
                  <p className="font-semibold">We do not claim</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/65">
                    <li>Certification as a fire detector</li>
                    <li>Replacement of fire alarm systems</li>
                    <li>Validated detection performance (yet)</li>
                    <li>Authority approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand eyebrow="Pilot programme" title="Interested in shaping what comes next?" body="We welcome conversations with building owners and facility teams interested in future monitoring and AI pilots." primary={{ label: "Get in touch", href: "/contact" }} secondary={{ label: "AI & automation", href: "/systems/ai-automation-integration" }} />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
