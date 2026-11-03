import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Visual } from "@/components/visuals/visual";
import { CtaBand } from "@/components/sections/cta-band";
import { getServices, getSystems } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Systems",
  description: "Smoke management, pressurization, ventilation, fireman override and AI & automation integration — Override-R life-safety control systems.",
  path: "/systems",
});

const matrix: { area: string; cells: Record<string, boolean> }[] = [
  { area: "Escape stairs & lobbies", cells: { "smoke-management": false, pressurization: true, ventilation: false, "fireman-override-systems": true, "ai-automation-integration": false } },
  { area: "Corridors", cells: { "smoke-management": true, pressurization: false, ventilation: false, "fireman-override-systems": true, "ai-automation-integration": false } },
  { area: "Atria & large volumes", cells: { "smoke-management": true, pressurization: false, ventilation: false, "fireman-override-systems": true, "ai-automation-integration": true } },
  { area: "Basement car parks", cells: { "smoke-management": true, pressurization: false, ventilation: true, "fireman-override-systems": true, "ai-automation-integration": true } },
  { area: "Plant & technical rooms", cells: { "smoke-management": false, pressurization: false, ventilation: true, "fireman-override-systems": false, "ai-automation-integration": false } },
  { area: "Lift shafts & lobbies", cells: { "smoke-management": false, pressurization: true, ventilation: false, "fireman-override-systems": true, "ai-automation-integration": false } },
  { area: "Fire command centre", cells: { "smoke-management": false, pressurization: false, ventilation: false, "fireman-override-systems": true, "ai-automation-integration": true } },
];

export default async function SystemsPage() {
  const [systems, services] = await Promise.all([getSystems(), getServices()]);
  return (
    <>
      <PageHero
        variant="immersive"
        visual="building"
        eyebrow="Systems"
        title={"Every way air moves in a fire — *controlled.*"}
        intro="Five system families that together protect escape routes, clear smoke and give the fire service command of the building."
        crumbs={[{ label: "Home", href: "/" }, { label: "Systems" }]}
      >
        <ButtonLink href="#families" size="lg" arrow>
          Explore system families
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline-light">
          Talk to an engineer
        </ButtonLink>
      </PageHero>

      {/* Index of families */}
      <Section id="families" tone="paper">
        <Container>
          <SectionHeading eyebrow="System families" title="Choose a system to explore." intro="Each page explains the working principle, architecture, applications, components and technical considerations." />
          <div className="mt-16 border-t border-ink/10">
            {systems.map((s, i) => (
              <Reveal key={s.slug}>
                <Link href={`/systems/${s.slug}`} className="group/row grid items-center gap-6 border-b border-ink/10 py-8 md:grid-cols-12 md:py-10">
                  <span className="font-mono text-sm text-ink/35 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="md:col-span-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-3xl font-semibold tracking-tight transition-all duration-500 ease-out-expo group-hover/row:translate-x-2 group-hover/row:text-red md:text-5xl">{s.name}</h2>
                      {s.status === "in-development" && <Badge tone="amber">In development</Badge>}
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{s.category}</p>
                  </div>
                  <p className="text-ink/60 md:col-span-4">{s.summary}</p>
                  <div className="flex items-center justify-end gap-4 md:col-span-2">
                    <div className="hidden h-16 w-24 overflow-hidden rounded-lg opacity-0 transition-all duration-500 group-hover/row:opacity-100 lg:block">
                      <Visual kind={s.visual} className="h-full w-full" />
                    </div>
                    <span className="grid size-12 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover/row:rotate-45 group-hover/row:border-red group-hover/row:bg-red group-hover/row:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How the systems connect */}
      <Section tone="ink">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow light>Integrated response</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">One alarm. A coordinated building-wide response.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                When a fire is detected, several systems must act together: the stair pressurizes, the fire zone extracts, car park fans follow their strategy — and the fire service sees all of it on a single override panel.
              </p>
              <ol className="mt-10 space-y-4">
                {["Fire alarm identifies the zone", "Cause-and-effect drives every system", "Fireman override panel shows real status", "Fire service can take control at any time"].map((t, i) => (
                  <li key={t} className="flex items-center gap-4 text-white/80">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 font-mono text-xs">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <Reveal className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Visual kind="building" className="aspect-[4/3] w-full" alt="Section diagram of a building with pressurized stair core and roof fan" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Comparison matrix */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Where each system applies" title="Application matrix" intro="A general guide to which system families typically apply to each area of a building. Your fire strategy determines the actual requirements." />
          <div className="mt-14 overflow-x-auto rounded-2xl border border-ink/10">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <caption className="sr-only">Typical application of system families by building area</caption>
              <thead>
                <tr className="bg-ink text-white">
                  <th scope="col" className="p-5 font-semibold">Building area</th>
                  {systems.map((s) => (
                    <th key={s.slug} scope="col" className="p-5 text-center font-semibold">
                      <Link href={`/systems/${s.slug}`} className="hover:text-red-400">{s.shortName}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={row.area} className={cn("border-t border-ink/10", i % 2 && "bg-paper/60")}>
                    <th scope="row" className="p-5 font-medium">{row.area}</th>
                    {systems.map((s) => (
                      <td key={s.slug} className="p-5 text-center">
                        {row.cells[s.slug] ? (
                          <span className="inline-grid size-7 place-items-center rounded-full bg-red/10 text-red">
                            <Check className="size-4" aria-label="Typically applies" />
                          </span>
                        ) : (
                          <Minus className="mx-auto size-4 text-ink/20" aria-label="Not typical" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-5 text-headline font-semibold">Engineering support at every stage.</h2>
              <ButtonLink href="/services" variant="dark" className="mt-8" arrow>
                All services
              </ButtonLink>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group/s flex h-full flex-col bg-paper p-7 transition-colors hover:bg-white">
                    <span className="flex items-center justify-between">
                      <span className="text-lg font-semibold tracking-tight">{s.name}</span>
                      <ArrowUpRight className="size-4 text-red transition-transform group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5" />
                    </span>
                    <span className="mt-2 text-sm text-ink/60">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
      <div className="h-16 bg-paper md:h-24" />
    </>
  );
}
