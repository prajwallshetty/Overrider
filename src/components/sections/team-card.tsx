import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { cn } from "@/lib/utils";

export function TeamCard({ member, large }: { member: TeamMember; large?: boolean }) {
  return (
    <article className="group/t">
      <div className={cn("relative overflow-hidden rounded-2xl bg-ink-2", large ? "aspect-[4/5]" : "aspect-square")}>
        {member.photo ? (
          <Image src={member.photo} alt={member.name} fill className="object-cover grayscale transition-all duration-700 group-hover/t:grayscale-0" sizes="(min-width:1024px) 33vw, 50vw" />
        ) : (
          <div className="hairline-grid absolute inset-0 grid place-items-center text-white/80">
            <svg viewBox="0 0 100 100" className="w-1/3 opacity-30" aria-hidden>
              <circle cx="50" cy="36" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 92c4-20 18-30 34-30s30 10 34 30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="absolute bottom-4 left-4 rounded border border-dashed border-amber-400/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300/90">Photo to be added</span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <h3 className={cn("font-display font-semibold tracking-tight", large ? "text-2xl" : "text-lg")}>{member.name}</h3>
        <p className="mt-1 text-sm text-red">{member.role}</p>
        {large && <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{member.bio}</p>}
      </div>
    </article>
  );
}
