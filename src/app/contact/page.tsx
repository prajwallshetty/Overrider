import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs, Container, Eyebrow, SampleNotice } from "@/components/ui/primitives";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import type { EnquiryType } from "@/lib/enquiry";

export const metadata = pageMeta({ title: "Contact", description: "Contact Override-R — general enquiries, quotations, product questions, technical consultation and partnerships.", path: "/contact" });

const valid: EnquiryType[] = ["general", "quote", "product", "consultation", "partnership"];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initial = valid.includes(type as EnquiryType) ? (type as EnquiryType) : "general";
  const channels = [
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Message our team", href: `https://wa.me/${site.contact.whatsapp}`, external: true },
    { icon: Phone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ];
  return (
    <div className="bg-paper pt-28 md:pt-32">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="mt-10 grid gap-14 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact</Eyebrow>
            <AnimatedHeading text={"Let's talk about your *building.*"} className="mt-6 text-display font-semibold" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">Whether you have a question, a drawing to review or a quotation to request — our engineers respond personally.</p>

            <ul className="mt-12 space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined} className="group/c flex items-center gap-5 rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink">
                    <span className="grid size-12 place-items-center rounded-full bg-ink text-white transition-colors group-hover/c:bg-red">
                      <c.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{c.label}</span>
                      <span className="block font-semibold">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-6 border-t border-ink/10 pt-8 text-sm text-ink/65 sm:grid-cols-2">
              <div className="flex gap-3"><MapPin className="size-4 shrink-0 text-red" /><span>{site.contact.address.map((l) => <span key={l} className="block">{l}</span>)}</span></div>
              <div className="flex gap-3"><Clock className="size-4 shrink-0 text-red" /><span>{site.contact.hours}</span></div>
            </div>
            {site.isPlaceholderContact && <SampleNotice className="mt-8">Contact details shown are placeholders and must be replaced before launch.</SampleNotice>}
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 shadow-[0_40px_80px_-40px_rgba(13,17,23,0.25)] ring-1 ring-ink/5 md:p-10">
              <EnquiryForm type={initial} selectableTypes={valid} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
