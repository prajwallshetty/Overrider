import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Visual } from "@/components/visuals/visual";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/content/company";

export function CtaBand({
  eyebrow = "Start a conversation",
  title = "Let's engineer a safer building together.",
  body = "Share your drawings, fire strategy or equipment schedule. Our engineers will review the control requirements and respond with a clear, practical recommendation.",
  primary = { label: "Request a Quote", href: "/request-quote" },
  secondary = { label: "Talk to our experts", href: "/contact" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-paper py-6 md:py-10">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-ink text-white">
          <Visual kind="blueprint" className="absolute inset-0 -z-10 opacity-50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
          <div className="grid gap-10 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-12 lg:px-16">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow text-red-400">{eyebrow}</p>
              <h2 className="mt-6 text-display font-semibold">{title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">{body}</p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col justify-end gap-3 lg:col-span-4 lg:items-end">
              <Magnetic>
                <ButtonLink href={primary.href} size="lg" arrow>
                  {primary.label}
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={secondary.href} size="lg" variant="outline-light">
                {secondary.label}
              </ButtonLink>
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
                <WhatsAppIcon className="size-4" /> Or message us on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
