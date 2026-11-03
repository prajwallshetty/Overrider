import { Download, FileText } from "lucide-react";
import type { ResourceItem } from "@/content/types";

export function ResourceList({ items }: { items: ResourceItem[] }) {
  const topics = Array.from(new Set(items.map((i) => i.topic)));
  return (
    <div className="space-y-14">
      {topics.map((t) => (
        <div key={t} className="grid gap-6 lg:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red lg:col-span-3 lg:pt-6">{t}</p>
          <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-9">
            {items.filter((i) => i.topic === t).map((r) => (
              <li key={r.id} className="grid items-center gap-4 py-6 sm:grid-cols-[auto_1fr_auto]">
                <span className="grid size-12 place-items-center rounded-xl bg-ink text-white">
                  <FileText className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight">{r.title}</p>
                  <p className="mt-1 text-sm text-ink/60">{r.description}</p>
                </div>
                {r.file ? (
                  <a href={r.file} download className="inline-flex items-center gap-2 justify-self-start rounded-full bg-ink px-4 py-2.5 text-sm text-white hover:bg-red sm:justify-self-end">
                    <Download className="size-4" /> {r.format}
                  </a>
                ) : (
                  <span className="justify-self-start rounded-full border border-dashed border-ink/20 px-3 py-1.5 text-xs text-ink/50 sm:justify-self-end">{r.format} · Coming soon</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
