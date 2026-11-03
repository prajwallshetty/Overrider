import type { VisualKey } from "@/content/types";
import { Breadcrumbs, Eyebrow } from "@/components/ui/primitives";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { Visual } from "@/components/visuals/visual";
import { cn } from "@/lib/utils";

/**
 * Shared page hero. Three compositions keep pages from feeling templated:
 * - "split": dark, text left / illustration right (system & service pages)
 * - "immersive": dark, full-bleed illustration behind text (landing pages)
 * - "light": editorial paper hero with no illustration (catalogues, knowledge)
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  visual,
  image,
  variant = "split",
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  visual?: VisualKey;
  image?: string;
  variant?: "split" | "immersive" | "light";
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  if (variant === "light") {
    return (
      <section className="relative overflow-hidden bg-paper pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="hairline-grid absolute inset-0 text-ink [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-x relative">
          {crumbs && <Breadcrumbs items={crumbs} />}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{eyebrow}</Eyebrow>
              <AnimatedHeading text={title} className="mt-6 text-display font-semibold" />
            </div>
            <Reveal delay={0.2} className="lg:col-span-4">
              {intro && <p className="text-lg leading-relaxed text-ink/65">{intro}</p>}
              {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
            </Reveal>
          </div>
          {aside}
        </div>
      </section>
    );
  }

  if (variant === "immersive") {
    return (
      <section className={cn("relative isolate overflow-hidden bg-ink pt-36 text-white md:pt-48", aside ? "pb-0" : "pb-20 md:pb-28")}>
        {visual && <Visual kind={visual} src={image} priority className="absolute inset-0 -z-10 opacity-70" />}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-x">
          {crumbs && <Breadcrumbs items={crumbs} light />}
          <div className="mt-10 max-w-4xl">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <AnimatedHeading text={title} className="mt-6 text-display-xl font-semibold" />
            {intro && (
              <Reveal delay={0.3}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">{intro}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-3">{children}</div>
              </Reveal>
            )}
          </div>
          {aside && <div className="mt-16 md:mt-20">{aside}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 text-white md:pt-40">
      <div className="hairline-grid absolute inset-0 -z-10 text-white opacity-60" aria-hidden />
      <div className="container-x">
        {crumbs && <Breadcrumbs items={crumbs} light />}
        <div className="mt-10 grid gap-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          <div className="lg:col-span-6 lg:pt-6">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <AnimatedHeading text={title} className="mt-6 text-display font-semibold" />
            {intro && (
              <Reveal delay={0.3}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">{intro}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-3">{children}</div>
              </Reveal>
            )}
          </div>
          {visual && (
            <Reveal delay={0.2} className="lg:col-span-6">
              <div className={cn("relative overflow-hidden rounded-2xl border border-white/10")}>
                <Visual kind={visual} src={image} priority className="aspect-[4/3] w-full" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              </div>
            </Reveal>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}
