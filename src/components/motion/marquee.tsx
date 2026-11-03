import { cn } from "@/lib/utils";

/** CSS-only infinite marquee (21st.dev "marquee" pattern). Pauses on hover and respects reduced motion. */
export function Marquee({ children, className, duration = 40, gap = "3rem" }: { children: React.ReactNode; className?: string; duration?: number; gap?: string }) {
  return (
    <div
      className={cn("group/mq relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s`, ["--marquee-gap" as string]: gap, gap }}
    >
      {[0, 1].map((k) => (
        <div key={k} aria-hidden={k === 1} className="flex shrink-0 animate-marquee items-center group-hover/mq:[animation-play-state:paused]" style={{ gap }}>
          {children}
        </div>
      ))}
    </div>
  );
}
