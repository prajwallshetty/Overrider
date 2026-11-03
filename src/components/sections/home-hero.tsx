"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { ButtonLink } from "@/components/ui/button";
import { Visual } from "@/components/visuals/visual";

const statusRows = [
  { zone: "Zone 03 · L12 corridor", device: "Smoke extract fan", state: "RUN", tone: "red" },
  { zone: "Stair core A", device: "Pressurization fan", state: "RUN", tone: "red" },
  { zone: "Zone 03 · L12", device: "Smoke damper SD-12", state: "OPEN", tone: "red" },
  { zone: "Basement B1", device: "Jet fan group", state: "AUTO", tone: "green" },
] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-20">
        {/* Replace `src` with real architectural photography or swap for a <video> when assets are available. */}
        <Visual kind="building" priority className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink to-transparent" />

      <div className="container-x w-full pb-16 pt-36 md:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="eyebrow text-red-400"
            >
              Intelligent Fire &amp; Building Safety Technology
            </motion.p>
            <AnimatedHeading text={"Engineering\n*Safer* Buildings."} className="mt-7 text-display-xl font-semibold" delay={0.2} />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
            >
              Override-R engineers the control layer of life safety — smoke management, pressurization, ventilation and fireman override systems that behave exactly as designed when a building needs them most.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <ButtonLink href="/systems" size="lg" arrow>
                  Explore Our Systems
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/contact" size="lg" variant="outline-light">
                Talk to Our Experts
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:col-span-4 lg:block"
            aria-hidden
          >
            <div className="rounded-2xl border border-white/10 bg-ink/70 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Override panel · Illustrative</p>
                <span className="flex items-center gap-2 font-mono text-[11px] text-red-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-red" />
                  </span>
                  FIRE MODE
                </span>
              </div>
              <ul className="divide-y divide-white/5">
                {statusRows.map((r) => (
                  <li key={r.device} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-white/90">{r.device}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-white/40">{r.zone}</p>
                    </div>
                    <span className={`rounded px-2 py-1 font-mono text-[10px] font-semibold tracking-wider ${r.tone === "red" ? "bg-red/15 text-red-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                      {r.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/45">
          <div className="flex items-center gap-3">
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-red" />
            </span>
            <span className="font-mono uppercase tracking-[0.2em]">Scroll to explore</span>
          </div>
          <p className="hidden font-mono uppercase tracking-[0.2em] md:block">Smoke · Pressurization · Ventilation · Override · AI</p>
        </div>
      </div>
    </section>
  );
}
