"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface EnquiryLine {
  slug: string;
  qty: number;
}

interface Ctx {
  items: EnquiryLine[];
  count: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const EnquiryContext = createContext<Ctx | null>(null);
const KEY = "ovr-enquiry-list";

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter((x) => typeof x?.slug === "string"));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => (prev.some((p) => p.slug === slug) ? prev.map((p) => (p.slug === slug ? { ...p, qty: p.qty + qty } : p)) : [...prev, { slug, qty }]));
  }, []);
  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((p) => p.slug !== slug)), []);
  const setQty = useCallback((slug: string, qty: number) => setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty: Math.max(1, Math.min(999, qty)) } : p))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(
    () => ({ items, ready, count: items.reduce((n, i) => n + i.qty, 0), add, remove, setQty, clear, has: (s) => items.some((i) => i.slug === s) }),
    [items, ready, add, remove, setQty, clear],
  );
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
