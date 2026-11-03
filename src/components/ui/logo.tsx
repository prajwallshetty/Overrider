import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="7" fill="#d4271d" />
      <circle cx="16" cy="16" r="8.5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <path d="M16 4.5V12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Override-R home">
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
      <span className={cn("font-display text-[17px] font-extrabold tracking-[0.08em]", light ? "text-white" : "text-ink")}>
        OVERRIDE<span className="text-red">-R</span>
      </span>
    </Link>
  );
}
