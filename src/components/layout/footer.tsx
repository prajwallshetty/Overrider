import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/company";
import { Logo } from "@/components/ui/logo";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">{site.description}</p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-white/75 hover:text-white">
                <Mail className="size-4 text-red-400" /> {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/75 hover:text-white">
                <Phone className="size-4 text-red-400" /> {site.contact.phone}
              </a>
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                <WhatsAppIcon className="size-4 text-red-400" /> WhatsApp
              </a>
              {site.social.linkedin && (
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 hover:text-white">
                  <LinkedInIcon className="size-4 text-red-400" /> LinkedIn
                </a>
              )}
            </div>
            {site.isPlaceholderContact && (
              <p className="mt-6 inline-block rounded border border-dashed border-amber-400/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300/80">
                Contact details are placeholders
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerNav.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[14px] text-white/70 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Information on this website is general in nature. Life-safety system design must be carried out by qualified professionals in accordance with applicable codes and authority requirements.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="container-x -mb-[0.18em] whitespace-nowrap font-display text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.035]">
          OVERRIDE-R
        </p>
      </div>
    </footer>
  );
}
