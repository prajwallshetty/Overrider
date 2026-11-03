"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ClipboardList } from "lucide-react";
import { mainNav, type NavItem } from "@/content/navigation";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { MobileNav } from "./mobile-nav";
import { useEnquiry } from "@/components/shop/enquiry-provider";
import { Visual } from "@/components/visuals/visual";
import { cn } from "@/lib/utils";

const darkHero = (p: string) => p === "/" || /^\/(systems|services|our-story)(\/|$)/.test(p);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { count, ready } = useEnquiry();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || !!open || !darkHero(pathname);
  const light = !solid;

  const openMenu = (label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const current = mainNav.find((n) => n.label === open);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        solid ? "border-b border-ink/[0.07] bg-paper/85 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo light={light} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.label} onMouseEnter={() => openMenu(item.mega ? item.label : null)}>
                {item.mega ? (
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(navCls(light, active(item.href)), "pr-1")}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={open === item.label}
                      aria-controls="mega-panel"
                      aria-label={`${item.label} menu`}
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      className={cn("grid size-7 place-items-center rounded-full transition-colors", light ? "text-white/70 hover:text-white" : "text-ink/50 hover:text-ink")}
                    >
                      <ChevronDown className={cn("size-3.5 transition-transform duration-300", open === item.label && "rotate-180")} />
                    </button>
                  </div>
                ) : (
                  <Link href={item.href} className={navCls(light, active(item.href))}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop/enquiry"
            aria-label={`Enquiry list${ready && count ? `, ${count} items` : ""}`}
            className={cn("relative grid size-10 place-items-center rounded-full transition-colors", light ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5")}
          >
            <ClipboardList className="size-[18px]" />
            {ready && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-red px-1 text-[10px] font-bold leading-5 text-white">{count}</span>
            )}
          </Link>
          <Link href="/contact" className={cn("hidden px-3 text-sm font-medium transition-colors md:inline-block", light ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink")}>
            Contact
          </Link>
          <Magnetic className="hidden sm:inline-block">
            <ButtonLink href="/request-quote" size="sm" arrow>
              Request a Quote
            </ButtonLink>
          </Magnetic>
          <MobileNav light={light} />
        </div>
      </div>

      <AnimatePresence>
        {current?.mega && (
          <motion.div
            id="mega-panel"
            key={current.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-paper shadow-[0_30px_60px_-30px_rgba(13,17,23,0.25)] lg:block"
            onMouseEnter={() => openMenu(current.label)}
          >
            <MegaPanel item={current} onNavigate={() => setOpen(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function navCls(light: boolean, isActive: boolean) {
  return cn(
    "relative inline-flex h-10 items-center rounded-full px-3.5 text-[14px] font-medium transition-colors",
    light ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink",
    isActive && (light ? "text-white" : "text-ink"),
    isActive && "after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:bg-red",
  );
}

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const m = item.mega!;
  return (
    <div className="container-x grid grid-cols-12 gap-10 py-10">
      <div className="col-span-3 border-r border-ink/10 pr-10">
        <p className="eyebrow text-red">{item.label}</p>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight">{m.intro.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">{m.intro.body}</p>
        <Link href={m.intro.cta.href} onClick={onNavigate} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-red">
          {m.intro.cta.label} →
        </Link>
      </div>
      <div className={cn("col-span-6 grid gap-10", m.columns.length > 1 && "grid-cols-[1.4fr_1fr]")}>
        {m.columns.map((col) => (
          <div key={col.title}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">{col.title}</p>
            <ul className="space-y-1">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} onClick={onNavigate} className="group/ml -mx-3 block rounded-lg px-3 py-2 transition-colors hover:bg-white">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      <span className="h-px w-0 bg-red transition-all duration-300 group-hover/ml:w-3" />
                      {l.label}
                    </span>
                    {l.description && <span className="mt-0.5 block text-[13px] text-ink/55">{l.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {m.feature && (
        <Link href={m.feature.href} onClick={onNavigate} className="group/f relative col-span-3 overflow-hidden rounded-xl">
          <Visual kind={item.label === "Systems" ? "ai" : "panel"} className="aspect-[4/5] h-full w-full transition-transform duration-700 ease-out-expo group-hover/f:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="eyebrow text-red-400">{m.feature.eyebrow}</p>
            <p className="mt-2 font-display text-lg font-semibold leading-snug">{m.feature.title}</p>
          </div>
        </Link>
      )}
    </div>
  );
}
