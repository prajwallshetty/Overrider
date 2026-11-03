import { AlertTriangle, Check, Info } from "lucide-react";
import type { Product, SystemBlock, SystemItem } from "@/content/types";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Accordion } from "@/components/ui/accordion";
import { Visual } from "@/components/visuals/visual";
import { ProductCard } from "@/components/products/product-card";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ModesTabs } from "./modes-tabs";
import { cn } from "@/lib/utils";

const defaultIds: Record<SystemBlock["type"], string> = {
  overview: "overview",
  principle: "principle",
  architecture: "architecture",
  subsystems: "subsystems",
  modes: "modes",
  applications: "applications",
  components: "components",
  considerations: "considerations",
  callout: "notice",
  faq: "faq",
  "related-products": "products",
  enquiry: "enquiry",
};

export function blockId(b: SystemBlock) {
  return b.id ?? defaultIds[b.type];
}

/** Renders a system page from its ordered content blocks. */
export function SystemBlocks({ system, products }: { system: SystemItem; products: Product[] }) {
  return (
    <>
      {system.blocks.map((b, i) => (
        <BlockSwitch key={i} block={b} system={system} products={products} index={i} />
      ))}
    </>
  );
}

function BlockSwitch({ block: b, system, products, index }: { block: SystemBlock; system: SystemItem; products: Product[]; index: number }) {
  const id = blockId(b);
  switch (b.type) {
    case "overview":
      return (
        <Section id={id} tone="paper">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>{b.eyebrow}</Eyebrow>
                <h2 className="mt-5 text-headline font-semibold">{b.title}</h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {b.body.map((p, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p className={cn("leading-relaxed text-ink/70", i === 0 ? "text-xl text-ink/85" : "mt-6 text-lg")}>{p}</p>
                  </Reveal>
                ))}
                {b.points && (
                  <Stagger as="ul" className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
                    {b.points.map((pt) => (
                      <StaggerItem as="li" key={pt} className="flex items-start gap-3 bg-paper p-5 text-[15px]">
                        <Check className="mt-0.5 size-4 shrink-0 text-red" />
                        {pt}
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </div>
            </div>
          </Container>
        </Section>
      );

    case "principle":
      return (
        <Section id={id} tone="white">
          <Container>
            <SectionHeading eyebrow="How it works" title={b.title} intro={b.intro} />
            <Stagger as="ol" className={cn("relative mt-16 grid gap-10 md:gap-6", b.steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5")}>
              <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-red via-ink/15 to-ink/5 md:block" />
              {b.steps.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="relative">
                  <span className={cn("relative z-10 grid size-11 place-items-center rounded-full border font-mono text-sm", i === 0 ? "border-red bg-red text-white" : "border-ink/15 bg-white")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      );

    case "architecture":
      return (
        <Section id={id} tone="ink" className="overflow-hidden">
          <div className="hairline-grid absolute inset-0 text-white opacity-60" aria-hidden />
          <Container className="relative">
            <SectionHeading light eyebrow="Technical diagram" title={b.title} intro={b.intro} />
            <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {b.layers.map((l, i) => (
                <ArchitectureLayer key={l.title} layer={l} index={i} last={i === b.layers.length - 1} />
              ))}
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">Schematic — simplified for illustration. Project architecture is defined per design.</p>
          </Container>
        </Section>
      );

    case "subsystems":
      if (b.items.length <= 2) {
        return (
          <Section id={id} tone="paper">
            <Container>
              <SectionHeading eyebrow={system.shortName} title={b.title} intro={b.intro} />
              <div className="mt-16 space-y-20 md:space-y-28">
                {b.items.map((it, i) => (
                  <div key={it.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <Reveal className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                      <div className="overflow-hidden rounded-2xl">
                        <Visual kind={it.visual ?? system.visual} className="aspect-[16/11] w-full" />
                      </div>
                    </Reveal>
                    <Reveal delay={0.1} className="lg:col-span-5">
                      <p className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")} / {String(b.items.length).padStart(2, "0")}</p>
                      <h3 className="mt-4 text-headline font-semibold">{it.title}</h3>
                      <p className="mt-5 text-lg leading-relaxed text-ink/65">{it.body}</p>
                      <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6">
                        {it.bullets.map((x) => (
                          <li key={x} className="flex items-center gap-3 text-[15px]">
                            <span className="h-px w-4 bg-red" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        );
      }
      return (
        <Section id={id} tone="paper">
          <Container>
            <SectionHeading eyebrow="Capabilities" title={b.title} intro={b.intro} />
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {b.items.map((it, i) => {
                const dev = it.bullets.some((x) => /development|roadmap|future/i.test(x));
                return (
                  <Reveal key={it.title} delay={(i % 3) * 0.06}>
                    <SpotlightCard as="article" className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white">
                      <Visual kind={it.visual ?? system.visual} tone="light" className="aspect-[16/9] w-full" />
                      <div className="relative flex flex-1 flex-col p-7">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                          {dev && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">In development</span>}
                        </div>
                        <h3 className="mt-4 text-xl font-semibold tracking-tight">{it.title}</h3>
                        <p className="mt-3 leading-relaxed text-ink/60">{it.body}</p>
                        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                          {it.bullets.map((x) => (
                            <li key={x} className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60">{x}</li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>
      );

    case "modes":
      return (
        <Section id={id} tone="white">
          <Container>
            <SectionHeading eyebrow="Operation" title={b.title} intro={b.intro} />
            <div className="mt-14">
              <ModesTabs modes={b.modes} />
            </div>
          </Container>
        </Section>
      );

    case "applications":
      return (
        <Section id={id} tone={index % 2 ? "white" : "paper"}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>Applications</Eyebrow>
                <h2 className="mt-5 text-headline font-semibold">{b.title}</h2>
                {b.intro && <p className="mt-5 text-lg text-ink/60">{b.intro}</p>}
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8">
                {b.items.map((a, i) => (
                  <div key={a.title} className="group/app relative bg-paper p-8 transition-colors duration-500 hover:bg-ink hover:text-white">
                    <span className="font-mono text-xs text-red">A{i + 1}</span>
                    <h3 className="mt-10 text-2xl font-semibold tracking-tight">{a.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/60 transition-colors group-hover/app:text-white/65">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      );

    case "components":
      return (
        <Section id={id} tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <Eyebrow>Bill of systems</Eyebrow>
                  <h2 className="mt-5 text-headline font-semibold">{b.title}</h2>
                  {b.intro && <p className="mt-5 text-lg text-ink/60">{b.intro}</p>}
                  <div className="mt-10 overflow-hidden rounded-2xl">
                    <Visual kind="panel" tone="light" className="aspect-[4/3] w-full" />
                  </div>
                </div>
              </div>
              <dl className="lg:col-span-7">
                {b.items.map((c, i) => (
                  <Reveal key={c.name} className="grid gap-2 border-t border-ink/10 py-7 last:border-b sm:grid-cols-[48px_1fr_1.3fr] sm:gap-6">
                    <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <dt className="text-lg font-semibold tracking-tight">{c.name}</dt>
                    <dd className="leading-relaxed text-ink/60">{c.role}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </Container>
        </Section>
      );

    case "considerations":
      return (
        <Section id={id} tone="paper">
          <Container>
            <SectionHeading eyebrow="Engineering notes" title={b.title} intro={b.intro} />
            <div className={cn("mt-14 grid gap-4", b.items.length === 5 ? "md:grid-cols-2 lg:grid-cols-5" : b.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {b.items.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05} className="relative rounded-2xl border border-ink/10 bg-white p-7">
                  <span className="absolute right-6 top-6 font-mono text-[11px] text-ink/30">TN-{String(i + 1).padStart(2, "0")}</span>
                  <span className="block h-1 w-8 bg-red" />
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      );

    case "callout":
      return (
        <div id={id} className="scroll-mt-24 bg-paper py-10">
          <Container>
            <div
              className={cn(
                "flex flex-col gap-4 rounded-2xl border p-7 md:flex-row md:items-start md:gap-6 md:p-9",
                b.tone === "notice" ? "border-amber-400/50 bg-amber-50" : "border-ink/10 bg-white",
              )}
              role="note"
            >
              {b.tone === "notice" ? <AlertTriangle className="size-6 shrink-0 text-amber-600" /> : <Info className="size-6 shrink-0 text-red" />}
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="mt-2 max-w-4xl leading-relaxed text-ink/70">{b.body}</p>
              </div>
            </div>
          </Container>
        </div>
      );

    case "faq":
      return (
        <Section id={id} tone="paper">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>FAQs</Eyebrow>
                <h2 className="mt-5 text-headline font-semibold">{b.title ?? "Frequently asked questions"}</h2>
              </div>
              <div className="lg:col-span-8">
                <Accordion items={b.items} />
              </div>
            </div>
          </Container>
        </Section>
      );

    case "related-products":
      if (!products.length) return null;
      return (
        <Section id={id} tone="white">
          <Container>
            <SectionHeading eyebrow="Related products" title={b.title ?? "Related products"} intro="Product data is being finalised — specifications shown on each page are marked where confirmation is pending." />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </Section>
      );

    case "enquiry":
      return (
        <Section id={id} tone="ink">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow light>Technical enquiry</Eyebrow>
                <h2 className="mt-5 text-headline font-semibold">{b.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-white/60">{b.body}</p>
                <ul className="mt-10 space-y-3 text-sm text-white/60">
                  <li className="flex gap-3"><Check className="size-4 text-red-400" /> Reviewed by an engineer, not a sales script</li>
                  <li className="flex gap-3"><Check className="size-4 text-red-400" /> Drawings and fire strategy welcome</li>
                  <li className="flex gap-3"><Check className="size-4 text-red-400" /> No obligation</li>
                </ul>
              </div>
              <div className="lg:col-span-7">
                <EnquiryForm type="consultation" tone="dark" defaultInterest={system.name} />
              </div>
            </div>
          </Container>
        </Section>
      );
  }
}

function ArchitectureLayer({ layer, index, last }: { layer: { title: string; caption: string; items: string[] }; index: number; last: boolean }) {
  return (
    <>
      <Reveal delay={index * 0.12} className={cn("relative rounded-2xl border p-6 md:p-7", index === 1 ? "border-red/50 bg-red/[0.06]" : "border-white/10 bg-white/[0.02]")}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{layer.caption}</p>
          <span className="font-mono text-[11px] text-white/30">L{index + 1}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{layer.title}</h3>
        <ul className="mt-6 space-y-2">
          {layer.items.map((it) => (
            <li key={it} className="flex items-center gap-3 rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-sm text-white/80">
              <span className={cn("size-1.5 rounded-full", index === 1 ? "bg-red" : "bg-white/40")} />
              {it}
            </li>
          ))}
        </ul>
      </Reveal>
      {!last && (
        <div aria-hidden className="flex items-center justify-center py-1 lg:py-0">
          <svg viewBox="0 0 60 20" className="h-5 w-14 rotate-90 lg:rotate-0">
            <path d="M0 10 H52" stroke="#d4271d" strokeWidth="1.5" strokeDasharray="4 4" className="ovr-flow" />
            <path d="M48 4 L58 10 L48 16" fill="none" stroke="#d4271d" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </>
  );
}
