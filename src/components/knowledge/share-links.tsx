"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const cls = "grid size-10 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-red hover:text-red";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Share</span>
      <a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><LinkedInIcon className="size-4" /></a>
      <a className={cls} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon className="size-4" /></a>
      <a className={cls} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email"><Mail className="size-4" /></a>
      <button
        type="button"
        className={cls}
        aria-label="Copy link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-red" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
