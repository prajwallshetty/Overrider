import Image from "next/image";
import type { VisualKey } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Branded technical illustrations used wherever real photography has not yet
 * been supplied. Pass `src` to show a photograph instead — the illustration is
 * the graceful fallback, so content editors only need to add an image path.
 */
export function Visual({
  kind,
  src,
  alt = "",
  className,
  tone = "dark",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  kind: VisualKey;
  src?: string;
  alt?: string;
  className?: string;
  tone?: "dark" | "light";
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-ink", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  const fg = dark ? "#c9cfd6" : "#1c2532";
  const dim = dark ? "rgba(201,207,214,0.22)" : "rgba(28,37,50,0.18)";
  const faint = dark ? "rgba(201,207,214,0.08)" : "rgba(28,37,50,0.07)";
  const red = "#e0352a";
  const id = `v-${kind}-${tone}`;

  return (
    <div
      className={cn("relative overflow-hidden", dark ? "bg-ink" : "bg-paper-2", className)}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={dark ? "#141c28" : "#efece6"} />
            <stop offset="1" stopColor={dark ? "#0b0f15" : "#e3dfd7"} />
          </linearGradient>
          <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke={faint} strokeWidth="1" />
          </pattern>
          <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={red} stopOpacity="0.35" />
            <stop offset="1" stopColor={red} stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={red} />
          </marker>
          <marker id={`${id}-arrow-fg`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={fg} />
          </marker>
        </defs>
        <rect width="800" height="600" fill={`url(#${id}-bg)`} />
        <rect width="800" height="600" fill={`url(#${id}-grid)`} />
        {art[kind]({ id, fg, dim, faint, red, dark })}
      </svg>
    </div>
  );
}

type ArtProps = { id: string; fg: string; dim: string; faint: string; red: string; dark: boolean };

const flow = "ovr-flow";

const art: Record<VisualKey, (p: ArtProps) => React.ReactNode> = {
  building: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="560" cy="200" r="220" fill={`url(#${id}-glow)`} stroke="none" />
      {/* tower */}
      <rect x="300" y="70" width="260" height="470" stroke={fg} />
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1="300" x2="560" y1={110 + i * 33} y2={110 + i * 33} stroke={dim} />
      ))}
      {/* stair core */}
      <rect x="470" y="70" width="60" height="470" stroke={red} strokeWidth="1.6" />
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M472 ${100 + i * 33} L528 ${78 + i * 33}`} stroke={red} strokeOpacity="0.45" />
      ))}
      {/* roof fan */}
      <rect x="478" y="40" width="44" height="30" stroke={fg} />
      <circle cx="500" cy="55" r="10" stroke={red} />
      <path d="M500 40 V18" stroke={red} markerEnd={`url(#${id}-arrow)`} className={flow} strokeDasharray="4 6" />
      {/* windows */}
      {Array.from({ length: 12 }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={316 + c * 30} y={118 + r * 33} width="18" height="18" stroke={dim} />
        )),
      )}
      {/* ground */}
      <line x1="80" x2="760" y1="540" y2="540" stroke={fg} />
      <rect x="140" y="400" width="140" height="140" stroke={dim} />
      <rect x="590" y="330" width="130" height="210" stroke={dim} />
      {/* basement */}
      <rect x="300" y="540" width="260" height="50" stroke={dim} strokeDasharray="4 4" />
      <text x="80" y="90" fill={fg} fontSize="11" fontFamily="monospace" letterSpacing="2">SECTION A–A</text>
      <text x="580" y="150" fill={red} fontSize="11" fontFamily="monospace" letterSpacing="1.5">PRESSURIZED CORE</text>
      <path d="M576 146 H535" stroke={red} strokeWidth="1" />
    </g>
  ),

  smoke: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      {/* smoke clouds */}
      <g filter={`url(#${id}-blur)`} opacity="0.75">
        <ellipse cx="300" cy="230" rx="170" ry="70" fill="#5b6573" />
        <ellipse cx="470" cy="200" rx="150" ry="60" fill="#6b7583" />
        <ellipse cx="380" cy="300" rx="120" ry="50" fill="#4a5361" />
      </g>
      <circle cx="380" cy="470" r="90" fill={`url(#${id}-glow)`} stroke="none" />
      {/* room section */}
      <path d="M90 520 V120 H710 V520 Z" stroke={fg} />
      <line x1="90" x2="710" y1="160" y2="160" stroke={dim} strokeDasharray="6 6" />
      <text x="100" y="152" fill={fg} fontSize="10" fontFamily="monospace" letterSpacing="2" opacity="0.7">SMOKE LAYER</text>
      {/* extract fan */}
      <rect x="560" y="70" width="90" height="50" stroke={fg} />
      <circle cx="605" cy="95" r="16" stroke={red} strokeWidth="1.6" />
      <path d="M605 79 L605 111 M589 95 L621 95" stroke={red} />
      <path d="M605 70 V30" stroke={red} markerEnd={`url(#${id}-arrow)`} />
      {/* flow paths */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${180 + i * 90} ${300 - i * 15} C ${300 + i * 60} ${180}, 540 ${160}, 600 125`}
          stroke={red}
          strokeOpacity={0.4 + i * 0.15}
          strokeDasharray="5 7"
          className={flow}
        />
      ))}
      {/* make-up air */}
      <rect x="90" y="430" width="16" height="70" fill={fg} opacity="0.3" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M30 ${445 + i * 20} H150`} stroke={fg} markerEnd={`url(#${id}-arrow-fg)`} className={flow} strokeDasharray="6 6" />
      ))}
      <text x="30" y="425" fill={fg} fontSize="10" fontFamily="monospace" letterSpacing="2">MAKE-UP AIR</text>
      {/* fire */}
      <path d="M360 520 C 360 490, 380 485, 372 455 C 395 475, 405 495, 400 520 Z" fill={red} opacity="0.85" />
      <line x1="90" x2="710" y1="520" y2="520" stroke={fg} />
      {/* dampers */}
      {[220, 470].map((x) => (
        <g key={x}>
          <rect x={x} y="112" width="40" height="16" stroke={fg} />
          <line x1={x + 6} x2={x + 34} y1="126" y2="114" stroke={red} />
        </g>
      ))}
    </g>
  ),

  pressurization: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="400" cy="300" r="260" fill={`url(#${id}-glow)`} stroke="none" opacity="0.6" />
      {/* stair shaft */}
      <rect x="320" y="60" width="160" height="500" stroke={red} strokeWidth="1.8" />
      {Array.from({ length: 6 }).map((_, i) => {
        const y = 80 + i * 80;
        return (
          <g key={i}>
            <path d={`M330 ${y + 70} L ${400} ${y + 30} L 470 ${y + 30}`} stroke={fg} strokeOpacity="0.8" />
            {Array.from({ length: 6 }).map((__, s) => (
              <line key={s} x1={330 + s * 11.6} x2={330 + s * 11.6} y1={y + 70 - s * 6.6} y2={y + 64 - s * 6.6} stroke={dim} />
            ))}
            <text x="392" y={y + 60} fill={red} fontSize="16" fontFamily="monospace" opacity="0.8">+</text>
          </g>
        );
      })}
      {/* floors */}
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <line x1="60" x2="320" y1={80 + i * 80} y2={80 + i * 80} stroke={dim} />
          <line x1="480" x2="740" y1={80 + i * 80} y2={80 + i * 80} stroke={dim} />
        </g>
      ))}
      {/* doors with outward arrows */}
      {[2, 4].map((i) => (
        <g key={i}>
          <path d={`M320 ${80 + i * 80 + 20} V ${80 + i * 80 + 70}`} stroke={fg} strokeWidth="3" />
          {[0, 1, 2].map((a) => (
            <path key={a} d={`M318 ${80 + i * 80 + 30 + a * 14} H 230`} stroke={red} markerEnd={`url(#${id}-arrow)`} className={flow} strokeDasharray="5 6" />
          ))}
          <g filter={`url(#${id}-blur)`} opacity="0.55">
            <ellipse cx="140" cy={80 + i * 80 + 45} rx="70" ry="22" fill="#5b6573" />
          </g>
        </g>
      ))}
      {/* supply fan */}
      <rect x="370" y="20" width="60" height="40" stroke={fg} />
      <circle cx="400" cy="40" r="12" stroke={red} />
      <path d="M400 -10 V 18" stroke={fg} markerEnd={`url(#${id}-arrow-fg)`} />
      {/* gauge */}
      <g transform="translate(610 150)">
        <circle r="54" stroke={fg} />
        <path d="M-40 20 A 44 44 0 1 1 40 20" stroke={dim} strokeWidth="6" />
        <path d="M-40 20 A 44 44 0 0 1 10 -43" stroke={red} strokeWidth="6" />
        <line x1="0" y1="0" x2="18" y2="-34" stroke={red} strokeWidth="2" />
        <circle r="4" fill={red} />
        <text x="-10" y="40" fill={fg} fontSize="12" fontFamily="monospace">ΔP</text>
      </g>
    </g>
  ),

  ventilation: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      {/* car park plan */}
      <rect x="60" y="70" width="680" height="460" stroke={fg} />
      {Array.from({ length: 13 }).map((_, i) => (
        <g key={i}>
          <line x1={90 + i * 50} x2={90 + i * 50} y1="70" y2="160" stroke={dim} />
          <line x1={90 + i * 50} x2={90 + i * 50} y1="440" y2="530" stroke={dim} />
        </g>
      ))}
      <line x1="60" x2="740" y1="160" y2="160" stroke={dim} strokeDasharray="8 8" />
      <line x1="60" x2="740" y1="440" y2="440" stroke={dim} strokeDasharray="8 8" />
      {/* columns */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={170 + i * 160} y="292" width="16" height="16" fill={fg} opacity="0.4" />
      ))}
      {/* jet fans */}
      {[[150, 230], [350, 230], [550, 230], [150, 370], [350, 370], [550, 370]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y - 9} width="44" height="18" rx="2" stroke={red} strokeWidth="1.5" />
          <path d={`M${x + 50} ${y} H ${x + 130}`} stroke={red} strokeOpacity="0.7" markerEnd={`url(#${id}-arrow)`} strokeDasharray="6 6" className={flow} />
        </g>
      ))}
      {/* extract shaft */}
      <rect x="690" y="250" width="50" height="100" stroke={fg} strokeWidth="1.6" />
      <circle cx="715" cy="300" r="16" stroke={red} strokeWidth="1.6" />
      <circle cx="715" cy="300" r="80" fill={`url(#${id}-glow)`} stroke="none" />
      {/* sensors */}
      {[[260, 300], [460, 300]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" stroke={fg} />
          <circle cx={x} cy={y} r="18" stroke={fg} strokeOpacity="0.3" />
          <circle cx={x} cy={y} r="30" stroke={fg} strokeOpacity="0.12" />
        </g>
      ))}
      <text x="70" y="56" fill={fg} fontSize="11" fontFamily="monospace" letterSpacing="2">BASEMENT B1 · ZONE 01</text>
      <text x="600" y="56" fill={red} fontSize="11" fontFamily="monospace" letterSpacing="2">EXTRACT</text>
    </g>
  ),

  override: ({ id, fg, dim, red, dark }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="400" cy="300" r="300" fill={`url(#${id}-glow)`} stroke="none" opacity="0.5" />
      <rect x="150" y="60" width="500" height="480" rx="6" stroke={fg} fill={dark ? "#121a25" : "#f7f5f1"} />
      <rect x="150" y="60" width="500" height="54" rx="6" fill={red} />
      <text x="176" y="94" fill="#fff" fontSize="15" fontFamily="sans-serif" fontWeight="700" letterSpacing="3">FIREMAN OVERRIDE PANEL</text>
      {/* mimic */}
      <rect x="176" y="136" width="448" height="120" stroke={dim} />
      {Array.from({ length: 4 }).map((_, i) => (
        <g key={i}>
          <rect x={192 + i * 108} y="152" width="92" height="88" stroke={fg} strokeOpacity="0.6" />
          <text x={200 + i * 108} y="170" fill={fg} fontSize="9" fontFamily="monospace" opacity="0.8">ZONE 0{i + 1}</text>
          <circle cx={238 + i * 108} cy="208" r="16" stroke={i === 1 ? red : fg} strokeWidth={i === 1 ? 2 : 1} />
          <path d={`M${238 + i * 108} 194 V 222 M${224 + i * 108} 208 H ${252 + i * 108}`} stroke={i === 1 ? red : dim} />
        </g>
      ))}
      {/* switches rows */}
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => {
          const cx = 210 + c * 76;
          const cy = 300 + r * 76;
          const on = (r + c) % 4 === 1;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={cx} cy={cy} r="20" stroke={fg} strokeOpacity="0.7" />
              <line x1={cx} y1={cy} x2={cx + (c % 3 === 0 ? -12 : c % 3 === 1 ? 0 : 12)} y2={cy - 14} stroke={fg} strokeWidth="3" strokeLinecap="round" />
              <circle cx={cx - 12} cy={cy + 30} r="4" fill={on ? red : dim} />
              <circle cx={cx} cy={cy + 30} r="4" fill={!on && c % 2 === 0 ? "#3fae6a" : dim} />
              <circle cx={cx + 12} cy={cy + 30} r="4" fill={dim} />
            </g>
          );
        }),
      )}
      {/* key switch */}
      <circle cx="600" cy="510" r="0" />
    </g>
  ),

  panel: ({ id, fg, dim, red, dark }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="420" cy="300" r="260" fill={`url(#${id}-glow)`} stroke="none" opacity="0.6" />
      {/* cabinet in perspective */}
      <path d="M260 80 L520 60 L520 560 L260 540 Z" fill={dark ? "#151e2b" : "#f7f5f1"} stroke={fg} />
      <path d="M520 60 L590 90 L590 530 L520 560" fill={dark ? "#0f1620" : "#e6e2da"} stroke={fg} />
      <path d="M280 100 L500 84 L500 540 L280 522 Z" stroke={dim} />
      {/* display */}
      <path d="M300 130 L480 118 L480 200 L300 208 Z" fill={dark ? "#0a0f15" : "#d8d4cc"} stroke={fg} strokeOpacity="0.7" />
      <path d="M314 180 L340 168 L360 176 L388 150 L410 160 L440 140 L466 146" stroke={red} strokeWidth="1.6" />
      {/* LED rows */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={312 + c * 30} cy={250 + r * 30 - c * 1.2} r="5" fill={(r * 6 + c) % 7 === 2 ? red : (r + c) % 3 === 0 ? "#3fae6a" : dim} />
        )),
      )}
      {/* switches */}
      {Array.from({ length: 2 }).map((_, r) =>
        Array.from({ length: 4 }).map((__, c) => (
          <g key={`s${r}-${c}`}>
            <circle cx={322 + c * 44} cy={430 + r * 50 - c * 1.5} r="14" stroke={fg} />
            <line x1={322 + c * 44} y1={430 + r * 50 - c * 1.5} x2={322 + c * 44} y2={418 + r * 50 - c * 1.5} stroke={fg} strokeWidth="3" strokeLinecap="round" />
          </g>
        )),
      )}
      <rect x="260" y="540" width="0" height="0" />
      <line x1="120" x2="700" y1="565" y2="565" stroke={dim} />
    </g>
  ),

  controller: ({ id, fg, dim, red, dark }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="400" cy="300" r="240" fill={`url(#${id}-glow)`} stroke="none" opacity="0.55" />
      <rect x="230" y="120" width="340" height="360" rx="14" fill={dark ? "#151e2b" : "#f7f5f1"} stroke={fg} />
      <rect x="260" y="150" width="280" height="150" rx="6" fill={dark ? "#0a0f15" : "#ddd9d1"} stroke={dim} />
      <text x="282" y="240" fill={fg} fontSize="54" fontFamily="monospace" fontWeight="300">−−.−</text>
      <text x="470" y="240" fill={red} fontSize="18" fontFamily="monospace">Pa</text>
      <text x="282" y="178" fill={fg} fontSize="10" fontFamily="monospace" letterSpacing="2" opacity="0.7">SETPOINT · AUTO</text>
      <path d="M282 280 C 320 260, 340 290, 380 272 S 450 262, 518 270" stroke={red} strokeWidth="1.6" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={272 + i * 92} y="330" width="76" height="40" rx="4" stroke={fg} strokeOpacity="0.6" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={290 + i * 74} cy="420" r="6" fill={i === 0 ? "#3fae6a" : i === 2 ? red : dim} />
      ))}
      {/* cable glands */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={290 + i * 62} y="480" width="20" height="18" stroke={fg} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${300 + i * 62} 498 C ${300 + i * 62} 540, ${200 + i * 120} 560, ${150 + i * 160} 600`} stroke={dim} />
      ))}
    </g>
  ),

  sensor: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      <circle cx="400" cy="300" r="200" fill={`url(#${id}-glow)`} stroke="none" />
      {/* camera */}
      <path d="M250 200 L470 200 L500 230 L500 300 L250 300 Z" stroke={fg} strokeWidth="1.6" />
      <circle cx="470" cy="250" r="26" stroke={red} strokeWidth="1.6" />
      <circle cx="470" cy="250" r="12" stroke={red} />
      <path d="M330 300 L340 360 H 300" stroke={fg} />
      {/* view cone */}
      <path d="M500 230 L760 120 M500 270 L760 420" stroke={red} strokeOpacity="0.4" strokeDasharray="5 6" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="470" cy="250" r={70 + i * 50} stroke={fg} strokeOpacity={0.18 - i * 0.04} />
      ))}
      <rect x="590" y="220" width="110" height="80" stroke={red} strokeWidth="1.5" />
      <text x="594" y="214" fill={red} fontSize="10" fontFamily="monospace">EVENT · VERIFY</text>
      <line x1="80" x2="720" y1="500" y2="500" stroke={dim} />
    </g>
  ),

  ai: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.2">
      {/* camera tiles */}
      {Array.from({ length: 2 }).map((_, r) =>
        Array.from({ length: 3 }).map((__, c) => {
          const x = 70 + c * 230;
          const y = 80 + r * 230;
          const hot = r === 0 && c === 1;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="210" height="200" stroke={hot ? red : dim} strokeWidth={hot ? 1.6 : 1} />
              <path d={`M${x} ${y + 150} L ${x + 60} ${y + 110} L ${x + 120} ${y + 140} L ${x + 210} ${y + 90}`} stroke={dim} />
              <text x={x + 10} y={y + 20} fill={fg} fontSize="9" fontFamily="monospace" opacity="0.7">CAM 0{r * 3 + c + 1}</text>
              {hot && (
                <g>
                  <g filter={`url(#${id}-blur)`} opacity="0.8">
                    <ellipse cx={x + 110} cy={y + 90} rx="55" ry="30" fill="#6b7583" />
                  </g>
                  <rect x={x + 50} y={y + 50} width="120" height="80" stroke={red} strokeWidth="1.8" strokeDasharray="10 4" />
                  <rect x={x + 50} y={y + 34} width="96" height="16" fill={red} />
                  <text x={x + 55} y={y + 46} fill="#fff" fontSize="9" fontFamily="monospace">SMOKE · REVIEW</text>
                </g>
              )}
            </g>
          );
        }),
      )}
      <circle cx="405" cy="180" r="160" fill={`url(#${id}-glow)`} stroke="none" opacity="0.5" />
      <text x="70" y="550" fill={fg} fontSize="10" fontFamily="monospace" letterSpacing="2" opacity="0.7">PROTOTYPE VISUALISATION — NOT A CERTIFIED DETECTOR</text>
    </g>
  ),

  blueprint: ({ id, fg, dim, red }) => (
    <g fill="none" strokeWidth="1.1">
      <rect x="100" y="90" width="600" height="420" stroke={fg} />
      <path d="M100 250 H 420 V 510 M420 330 H 700 M560 90 V 330" stroke={fg} />
      <path d="M160 250 A 40 40 0 0 1 200 210" stroke={dim} />
      <path d="M420 400 A 40 40 0 0 0 460 440" stroke={dim} />
      {/* dimension lines */}
      <path d="M100 60 H 700" stroke={dim} markerStart={`url(#${id}-arrow-fg)`} markerEnd={`url(#${id}-arrow-fg)`} />
      <path d="M730 90 V 510" stroke={dim} markerStart={`url(#${id}-arrow-fg)`} markerEnd={`url(#${id}-arrow-fg)`} />
      {/* zones */}
      <rect x="110" y="100" width="300" height="140" fill={red} fillOpacity="0.08" stroke={red} strokeDasharray="6 5" />
      <text x="124" y="124" fill={red} fontSize="11" fontFamily="monospace" letterSpacing="2">ZONE A</text>
      {[[180, 170], [300, 170], [500, 200], [600, 420], [250, 400]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" stroke={i < 2 ? red : fg} />
          <path d={`M${x - 5} ${y} H ${x + 5} M${x} ${y - 5} V ${y + 5}`} stroke={i < 2 ? red : fg} />
        </g>
      ))}
      <rect x="560" y="440" width="130" height="60" stroke={fg} />
      <text x="570" y="462" fill={fg} fontSize="9" fontFamily="monospace">DWG · CTRL-01</text>
      <text x="570" y="480" fill={fg} fontSize="9" fontFamily="monospace" opacity="0.6">REV —</text>
    </g>
  ),

  network: ({ id, fg, dim, red }) => {
    const nodes = [
      [400, 300], [220, 180], [580, 170], [200, 420], [600, 430], [400, 110], [400, 500], [110, 300], [690, 300],
    ];
    return (
      <g fill="none" strokeWidth="1.2">
        <circle cx="400" cy="300" r="220" fill={`url(#${id}-glow)`} stroke="none" />
        {nodes.slice(1).map(([x, y], i) => (
          <path key={i} d={`M400 300 L ${x} ${y}`} stroke={i % 3 === 0 ? red : dim} strokeDasharray={i % 3 === 0 ? "5 6" : undefined} className={i % 3 === 0 ? flow : undefined} />
        ))}
        {[[1, 5], [5, 2], [2, 8], [8, 4], [4, 6], [6, 3], [3, 7], [7, 1]].map(([a, b], i) => (
          <path key={`e${i}`} d={`M${nodes[a][0]} ${nodes[a][1]} L ${nodes[b][0]} ${nodes[b][1]}`} stroke={dim} strokeOpacity="0.6" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={`n${i}`}>
            <rect x={x - (i === 0 ? 34 : 16)} y={y - (i === 0 ? 34 : 16)} width={i === 0 ? 68 : 32} height={i === 0 ? 68 : 32} rx="4" stroke={i === 0 ? red : fg} strokeWidth={i === 0 ? 1.8 : 1.1} fill="#0d1117" fillOpacity="0.4" />
          </g>
        ))}
        <path d="M384 290 H 416 M384 300 H 416 M384 310 H 408" stroke={red} />
      </g>
    );
  },
};
