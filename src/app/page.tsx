import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { IndustriesExplorer } from "@/components/sections/industries-explorer";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, Eyebrow, Section, SectionHeading, Badge } from "@/components/ui/primitives";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Marquee } from "@/components/motion/marquee";
import { CountUp } from "@/components/motion/count-up";
import { Visual } from "@/components/visuals/visual";
import { ProductCard } from "@/components/products/product-card";
import { ArticleCard } from "@/components/knowledge/article-card";
import { getArticles, getFeaturedProducts, getIndustries, getProductCategories, getSystems } from "@/lib/content";
import { differentiators, workflow } from "@/content/company";
import { cn } from "@/lib/utils";

const bentoLayout = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

export default async function HomePage() {
  const [systems, featured, industries, articles, categories] = await Promise.all([
    getSystems(),
    getFeaturedProducts(),
    getIndustries(),
    getArticles(),
    getProductCategories(),
  ]);

  return (
    <>
      <HomeHero />

      {/* Capability marquee */}
      <div className="border-y border-ink/10 bg-paper py-6">
        <Marquee duration={45}>
          {["Smoke management", "Staircase pressurization", "Static pressure control", "Car park ventilation", "Room ventilation", "Fireman override panels", "Zone control", "AI & automation"].map((t) => (
            <span key={t} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-ink/80 md:text-3xl">
              {t}
              <span className="size-2 rotate-45 bg-red" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>

      {/* B. Company introduction */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>What we do</Eyebrow>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10">
                {[
                  { n: systems.length, l: "System families" },
                  { n: categories.length, l: "Product categories" },
                  { n: workflow.length, l: "Stage delivery process" },
                  { n: industries.length, l: "Sectors served" },
                ].map((s) => (
                  <div key={s.l} className="bg-paper p-5">
                    <p className="font-display text-4xl font-semibold tracking-tight">
                      <CountUp to={s.n} />
                    </p>
                    <p className="mt-1 text-xs text-ink/55">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium leading-[1.2] tracking-tight text-ink">
                  Fire and smoke equipment is only as good as the logic that controls it.{" "}
                  <span className="text-ink/40">
                    Override-R designs and builds that control layer — the panels, sequences and interfaces that make fans, dampers and alarms work together as one system, and give the fire service clear command when they arrive.
                  </span>
                </p>
              </Reveal>
              <Stagger as="ul" className="mt-14 grid gap-x-10 border-t border-ink/10 sm:grid-cols-2">
                {[
                  ["Fire safety systems", "Control solutions engineered around the building's fire strategy."],
                  ["Smoke management", "Extract, make-up air and damper sequencing by zone."],
                  ["Pressurization", "Protected stairs and lobbies held at the designed differential."],
                  ["Ventilation", "Car park and room ventilation with prioritised fire mode."],
                  ["Fireman override systems", "Clear fire service status and manual control."],
                  ["AI & automation integration", "Monitoring and AI-assisted awareness — in development."],
                ].map(([t, d], i) => (
                  <StaggerItem as="li" key={t} className="flex gap-5 border-b border-ink/10 py-5">
                    <span className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="mt-1 text-sm text-ink/60">{d}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* C. Core capabilities — bento */}
      <Section tone="paper" className="!pt-0">
        <Container>
          <SectionHeading
            eyebrow="Core capabilities"
            title="Five system families. One coherent control philosophy."
            intro="Each family solves a different part of the life-safety problem. Together they form a single, integrated response to fire and smoke."
          />
          <div className="mt-14 grid auto-rows-[minmax(300px,auto)] gap-4 md:grid-cols-6">
            {systems.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06} className={cn(bentoLayout[i])}>
                <SpotlightCard as="article" className="group/b h-full rounded-2xl border border-ink/10 bg-ink text-white">
                  <Link href={`/systems/${s.slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${s.name}`} />
                  <Visual kind={s.visual} src={s.image} className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-1000 ease-out-expo group-hover/b:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/0" />
                  <div className={cn("relative z-10 flex h-full flex-col justify-end p-6 md:p-8", i === 0 && "md:p-10")}>
                    <div className="mb-auto flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">{s.category}</span>
                      {s.status === "in-development" && <Badge tone="amber">In development</Badge>}
                    </div>
                    <h3 className={cn("font-display font-semibold tracking-tight", i === 0 ? "text-headline" : "text-2xl")}>{s.name}</h3>
                    <p className={cn("mt-3 max-w-md text-white/65", i === 0 ? "text-lg" : "text-[15px]")}>{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      Explore
                      <span className="grid size-8 place-items-center rounded-full bg-white/10 transition-all duration-500 group-hover/b:bg-red">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="md:col-span-6">
              <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink/10 bg-white p-8 md:flex-row md:items-center">
                <p className="max-w-2xl text-lg text-ink/70">
                  Not sure which system applies to your project? Our engineers can review the fire strategy and recommend the right combination.
                </p>
                <ButtonLink href="/services/technical-consultation" variant="dark" arrow>
                  Technical consultation
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* D. Featured products */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading align="left" eyebrow="Featured products" title="Panels and controls, configured to each building." />
            <ButtonLink href="/products" variant="outline" arrow>
              Full catalogue
            </ButtonLink>
          </div>
        </Container>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(3rem,calc((100vw_-_1440px)/2_+_3rem))] scroll-px-5 lg:scroll-px-12">
          {featured.map((p) => (
            <div key={p.slug} className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <Container>
          <p className="mt-6 text-xs text-ink/45">Product photography and technical specifications are being finalised. Detailed data is shown on each product page as it is confirmed.</p>
        </Container>
      </Section>

      {/* E. Why Override-R */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>Why Override-R</Eyebrow>
                <h2 className="mt-5 text-headline font-semibold">Engineering judgement, not catalogue selling.</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
                  We start from the fire strategy and the way air actually moves — then build control solutions that installers can wire, commissioners can test and firefighters can trust.
                </p>
                <div className="mt-10 hidden overflow-hidden rounded-2xl lg:block">
                  <Visual kind="blueprint" tone="light" className="aspect-[4/3] w-full" />
                </div>
              </div>
            </div>
            <ol className="lg:col-span-7">
              {differentiators.map((d, i) => (
                <Reveal as="li" key={d.title} className="group/d grid grid-cols-[auto_1fr] gap-8 border-t border-ink/10 py-10 last:border-b">
                  <span className="font-display text-5xl font-semibold tracking-tighter text-ink/10 transition-colors duration-500 group-hover/d:text-red md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-title font-semibold">{d.title}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-ink/60">{d.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* F. Industries */}
      <Section tone="ink">
        <Container>
          <SectionHeading light eyebrow="Industries served" title="Built for buildings where safety is non-negotiable." intro="From residential towers to infrastructure, every sector brings its own occupancy, risk and authority requirements." />
          <div className="mt-16">
            <IndustriesExplorer industries={industries} systems={systems.map(({ slug, name }) => ({ slug, name }))} />
          </div>
        </Container>
      </Section>

      {/* G. Project workflow */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="How we work" title="From first conversation to handover." intro="A structured, transparent process — so everyone on the project knows what happens next and who is responsible." />
          <Stagger as="ol" className="relative mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {workflow.map((w, i) => (
              <StaggerItem as="li" key={w.title} className="group/w relative bg-paper p-8 transition-colors duration-500 hover:bg-white md:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full border border-ink/15 font-mono text-sm transition-all duration-500 group-hover/w:border-red group-hover/w:bg-red group-hover/w:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-ink/10" />
                </div>
                <h3 className="mt-8 text-title font-semibold">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{w.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* H. Technology & innovation */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Visual kind="ai" className="aspect-[4/3] w-full" />
              </div>
            </Reveal>
            <div className="lg:col-span-6">
              <Eyebrow light>Technology &amp; innovation</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Adding intelligence — responsibly.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/65">
                We are developing AI-assisted fire and smoke detection and connected monitoring to give building teams earlier awareness and better information. These capabilities are designed to supplement certified fire detection — never to replace it.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <Badge tone="outline-light">
                    <span className="size-1.5 rounded-full bg-emerald-400" /> Available today
                  </Badge>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    <li>Fireman override panels</li>
                    <li>Smoke control panels</li>
                    <li>Pressurization controls</li>
                    <li>Ventilation controls</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-dashed border-amber-400/30 bg-amber-400/[0.04] p-6">
                  <Badge tone="outline-light">
                    <span className="size-1.5 rounded-full bg-amber-400" /> In development
                  </Badge>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    <li>AI fire detection</li>
                    <li>AI smoke detection</li>
                    <li>CCTV integration</li>
                    <li>Connected monitoring</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-white/45">
                AI detection is not certified as a fire detection device and is not a substitute for code-compliant fire alarm systems.
              </p>
              <div className="mt-8">
                <TextLink href="/systems/ai-automation-integration" light>
                  Explore AI &amp; automation
                </TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* I. Knowledge preview */}
      <Section tone="paper">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading align="left" eyebrow="Knowledge centre" title="Technical clarity, shared openly." />
            <ButtonLink href="/knowledge" variant="outline" arrow>
              All articles
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {articles[0] && (
              <Reveal className="lg:col-span-7">
                <ArticleCard article={articles[0]} size="lg" />
              </Reveal>
            )}
            <div className="lg:col-span-5">
              {articles.slice(1, 5).map((a) => (
                <ArticleCard key={a.slug} article={a} size="row" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* J. Final CTA */}
      <CtaBand />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
