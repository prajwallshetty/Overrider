import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/knowledge", label: "All articles" },
  { href: "/knowledge/category/blog", label: "Blog" },
  { href: "/knowledge/category/technical-articles", label: "Technical articles" },
  { href: "/knowledge/category/fire-safety-guides", label: "Fire safety guides" },
  { href: "/knowledge/category/industry-insights", label: "Industry insights" },
  { href: "/knowledge/category/case-studies", label: "Case studies" },
  { href: "/knowledge/faqs", label: "FAQs" },
  { href: "/knowledge/resources", label: "Technical resources" },
  { href: "/knowledge/downloads", label: "Downloads" },
  { href: "/knowledge/documentation", label: "Documentation" },
];

export function KnowledgeNav({ active }: { active: string }) {
  return (
    <div className="border-y border-ink/10 bg-white">
      <nav aria-label="Knowledge centre" className="container-x no-scrollbar flex gap-1 overflow-x-auto">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={active === l.href ? "page" : undefined} className={cn("relative shrink-0 px-3 py-4 text-[13px] font-medium transition-colors", active === l.href ? "text-ink" : "text-ink/50 hover:text-ink")}>
            {l.label}
            {active === l.href && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-red" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}
