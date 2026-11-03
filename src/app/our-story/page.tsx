import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { StoryNav } from "@/components/sections/story-nav";
import { TeamCard } from "@/components/sections/team-card";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, Eyebrow, Section, SectionHeading, SampleNotice } from "@/components/ui/primitives";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { Visual } from "@/components/visuals/visual";
import { differentiators, milestones, partners } from "@/content/company";
import { getTeam } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Our Story", description: "About Override-R — our vision, mission, approach, team and the technology we are building.", path: "/our-story" });

export default async function OurStoryPage() {
  const team = await getTeam();
  const founders = team.filter((t) => t.group === "founders");
  return (
    <>
      <PageHero
        variant="immersive"
        visual="blueprint"
        eyebrow="Our story"
        title={"We exist so that buildings *behave* as designed."}
        intro="Override-R was founded on a simple observation: life-safety equipment is only as reliable as the control logic behind it. We set out to engineer that logic properly."
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
      />
      <StoryNav active="/our-story" />

      {/* About */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>About Override-R</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">An engineering company focused on the control layer of life safety.</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-ink/70 lg:col-span-6 lg:col-start-7">
              <p className="text-xl text-ink/85">
                Override-R develops control solutions for smoke management, pressurization, ventilation and fireman override systems — and is developing AI and automation capabilities to complement them.
              </p>
              <p>
                We work alongside consultants, contractors and building owners to translate fire strategies into control systems that can be installed, tested and trusted. {/* EDIT: add verified company background, founding location and year. */}
              </p>
              <SampleNotice>Company background, founding details and history are placeholders to be completed with verified information.</SampleNotice>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision & mission — editorial split */}
      <section className="grid bg-ink text-white lg:grid-cols-2">
        <div className="relative isolate overflow-hidden p-8 py-20 sm:p-14 lg:p-20">
          <Visual kind="building" className="absolute inset-0 -z-10 opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/95 to-ink/60" />
          <p className="eyebrow text-red-400">Vision</p>
          <p className="mt-8 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-tight">
            Buildings where every life-safety system responds exactly as intended — every time, for everyone inside.
          </p>
        </div>
        <div className="border-t border-white/10 p-8 py-20 sm:p-14 lg:border-l lg:border-t-0 lg:p-20">
          <p className="eyebrow text-red-400">Mission</p>
          <p className="mt-8 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-tight">
            To engineer clear, reliable and intelligent control for fire and smoke systems — and to support the people who design, build and operate them.
          </p>
        </div>
      </section>

      {/* Approach */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Our approach" title="How we think about engineering." intro="Principles that guide every panel we design and every recommendation we make." />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05} className="rounded-2xl border border-ink/10 bg-paper p-7">
                <span className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="paper">
        <Container>
          <SectionHeading align="center" eyebrow="Our journey" title="Milestones" intro="Placeholder milestones — to be replaced with verified company history." />
          <Timeline className="mx-auto mt-16 max-w-5xl" items={milestones.map((m) => ({ label: m.year, title: m.title, body: m.body }))} />
        </Container>
      </Section>

      {/* Founders */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading align="left" eyebrow="Founders" title="The people behind Override-R." />
            <ButtonLink href="/our-story/team" variant="outline" arrow>Meet the team</ButtonLink>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:w-2/3">
            {founders.map((f) => <TeamCard key={f.id} member={f} large />)}
          </div>
        </Container>
      </Section>

      {/* Technology + partners + careers bento */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <Link href="/our-story/technology" className="group/x relative isolate overflow-hidden rounded-2xl bg-ink p-8 text-white lg:col-span-2 lg:row-span-2 lg:min-h-[520px]">
              <Visual kind="ai" className="absolute inset-0 -z-10 opacity-70 transition-transform duration-1000 group-hover/x:scale-105" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="flex h-full flex-col justify-end">
                <p className="eyebrow text-red-400">Technology &amp; innovation</p>
                <h3 className="mt-4 max-w-lg text-headline font-semibold">Building the intelligent layer — responsibly.</h3>
                <span className="mt-6 text-sm font-semibold">Explore our technology →</span>
              </div>
            </Link>
            <Link href="/our-story/partners" className="group/x rounded-2xl border border-ink/10 bg-white p-8 transition-colors hover:border-ink">
              <p className="eyebrow text-red">Partners</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Working with the wider industry.</h3>
              <p className="mt-3 text-ink/60">{partners.length} partner categories — details to be announced.</p>
              <span className="mt-8 inline-block text-sm font-semibold text-red">Partner with us →</span>
            </Link>
            <Link href="/careers" className="group/x rounded-2xl bg-red p-8 text-white transition-colors hover:bg-red-600">
              <p className="eyebrow text-white/80">Careers</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Engineer what keeps people safe.</h3>
              <span className="mt-8 inline-block text-sm font-semibold">See opportunities →</span>
            </Link>
          </div>
          <div className="mt-10">
            <TextLink href="/contact">Contact Override-R</TextLink>
          </div>
        </Container>
      </Section>
      <CtaBand />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
