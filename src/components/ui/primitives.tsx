import Link from "next/link";
import { cn } from "@/lib/utils";

export function Section({ className, children, id, tone = "paper" }: { className?: string; children: React.ReactNode; id?: string; tone?: "paper" | "white" | "ink" | "navy" }) {
  const tones = {
    paper: "bg-paper text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-white",
    navy: "bg-navy text-white",
  } as const;
  return (
    <section id={id} className={cn("relative py-20 md:py-28 lg:py-32 scroll-mt-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return <p className={cn("eyebrow", light ? "text-red-400" : "text-red", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = "split",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  align?: "split" | "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  if (align === "split") {
    return (
      <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-12 items-end", className)}>
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
          <Tag className="mt-5 text-headline font-semibold">{title}</Tag>
        </div>
        {intro && <p className={cn("lg:col-span-5 text-lg leading-relaxed", light ? "text-white/65" : "text-ink/65")}>{intro}</p>}
      </div>
    );
  }
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", align === "left" && "max-w-3xl", className)}>
      {eyebrow && <Eyebrow light={light} className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <Tag className="mt-5 text-headline font-semibold">{title}</Tag>
      {intro && <p className={cn("mt-6 text-lg leading-relaxed", light ? "text-white/65" : "text-ink/65")}>{intro}</p>}
    </div>
  );
}

export function Badge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "red" | "dark" | "amber" | "outline-light"; className?: string }) {
  const tones = {
    neutral: "bg-ink/5 text-ink/70 border-ink/10",
    red: "bg-red/10 text-red border-red/20",
    dark: "bg-ink text-white border-ink",
    amber: "bg-amber-100 text-amber-900 border-amber-300/60",
    "outline-light": "bg-white/5 text-white/80 border-white/15",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", tones[tone], className)}>
      {children}
    </span>
  );
}

/** Visible marker for values awaiting confirmed company data. */
export function Placeholder({ children = "Awaiting data", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded border border-dashed border-amber-500/50 bg-amber-50 px-2 py-0.5 font-mono text-[11px] text-amber-800", className)}>
      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
      {children}
    </span>
  );
}

export function SampleNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border border-dashed border-amber-500/50 bg-amber-50/80 px-4 py-3 text-sm text-amber-900", className)}>
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

export function Breadcrumbs({ items, light }: { items: { label: string; href?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs", light ? "text-white/50" : "text-ink/50")}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className={cn("transition-colors", light ? "hover:text-white" : "hover:text-ink")}>{it.label}</Link>
            ) : (
              <span aria-current="page" className={light ? "text-white/80" : "text-ink/80"}>{it.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
