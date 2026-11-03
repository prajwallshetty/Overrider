import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/our-story", label: "About" },
  { href: "/our-story/team", label: "Team" },
  { href: "/our-story/technology", label: "Technology" },
  { href: "/our-story/partners", label: "Partners" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function StoryNav({ active }: { active: string }) {
  return (
    <div className="sticky top-[72px] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <nav aria-label="Our story" className="container-x no-scrollbar flex gap-1 overflow-x-auto">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={active === l.href ? "page" : undefined} className={cn("relative shrink-0 px-3 py-4 text-[13px] font-medium", active === l.href ? "text-ink" : "text-ink/50 hover:text-ink")}>
            {l.label}
            {active === l.href && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-red" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}
