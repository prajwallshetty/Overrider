"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/company";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function MobileNav({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn("grid size-10 place-items-center rounded-full lg:hidden", light ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5")}
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-ink text-white"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
                <Dialog.Description className="sr-only">Main menu links</Dialog.Description>
                <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
                  <Logo light />
                  <Dialog.Close aria-label="Close menu" className="grid size-10 place-items-center rounded-full hover:bg-white/10">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                  <ul>
                    {mainNav.map((item, i) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <Link href={item.href} onClick={close} className="flex-1 py-4 font-display text-[1.65rem] font-semibold tracking-tight">
                            {item.label}
                          </Link>
                          {item.mega && (
                            <button
                              type="button"
                              aria-expanded={expanded === item.label}
                              aria-label={`Expand ${item.label}`}
                              onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                              className="grid size-10 place-items-center rounded-full border border-white/15"
                            >
                              <ChevronDown className={cn("size-4 transition-transform", expanded === item.label && "rotate-180")} />
                            </button>
                          )}
                        </div>
                        <AnimatePresence initial={false}>
                          {item.mega && expanded === item.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <ul className="space-y-1 pb-5">
                                {item.mega.columns.flatMap((c) => c.links).map((l) => (
                                  <li key={l.href + l.label}>
                                    <Link href={l.href} onClick={close} className="block py-1.5 text-[15px] text-white/65 hover:text-white">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                    <li className="border-b border-white/10">
                      <Link href="/services" onClick={close} className="block py-4 font-display text-[1.65rem] font-semibold tracking-tight">Services</Link>
                    </li>
                    <li>
                      <Link href="/contact" onClick={close} className="block py-4 font-display text-[1.65rem] font-semibold tracking-tight">Contact</Link>
                    </li>
                  </ul>
                </nav>
                <div className="space-y-3 border-t border-white/10 p-5">
                  <ButtonLink href="/request-quote" onClick={close} size="lg" className="w-full" arrow>
                    Request a Quote
                  </ButtonLink>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm">
                      <WhatsAppIcon className="size-4" /> WhatsApp
                    </a>
                    <a href={`mailto:${site.contact.email}`} className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm">
                      <Mail className="size-4" /> Email
                    </a>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
