"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/content/types";
import { useEnquiry } from "./enquiry-provider";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Visual } from "@/components/visuals/visual";
import { ButtonLink } from "@/components/ui/button";

export function EnquiryBasket({ products }: { products: Pick<Product, "slug" | "name" | "visual" | "images" | "category" | "summary">[] }) {
  const { items, ready, setQty, remove, clear } = useEnquiry();
  const [sent, setSent] = useState(false);
  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.slug === i.slug) })).filter((l) => l.product);

  if (!ready) return <div className="h-64 animate-pulse rounded-2xl bg-ink/5" aria-busy="true" />;

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-ink/10 bg-white p-12 text-center md:p-20">
        <CheckCircle2 className="mx-auto size-12 text-red" />
        <p className="mt-6 font-display text-2xl font-semibold">Thank you — your quotation request has been sent.</p>
        <p className="mx-auto mt-3 max-w-md text-ink/60">An Override-R engineer will review your enquiry list and respond by email. Your list has been cleared.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" arrow>Back to the shop</ButtonLink>
          <ButtonLink href="/knowledge" variant="outline">Visit the knowledge centre</ButtonLink>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/20 p-12 text-center md:p-20">
        <p className="font-display text-2xl font-semibold">Your enquiry list is empty.</p>
        <p className="mx-auto mt-3 max-w-md text-ink/60">Browse the catalogue and add products to build a quotation request — or send a general quotation request without products.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" arrow>Browse the shop</ButtonLink>
          <ButtonLink href="/request-quote" variant="outline">General quotation request</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{lines.length} product{lines.length > 1 ? "s" : ""}</p>
          <button type="button" onClick={clear} className="text-sm text-ink/50 hover:text-red">Clear list</button>
        </div>
        <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
          <AnimatePresence initial={false}>
            {lines.map(({ slug, qty, product }) => (
              <motion.li key={slug} layout exit={{ opacity: 0, height: 0 }} className="flex gap-4 py-5">
                <Link href={`/products/${slug}`} className="block size-20 shrink-0 overflow-hidden rounded-lg">
                  <Visual kind={product!.visual} src={product!.images[0]} tone="light" className="size-full" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/products/${slug}`} className="font-semibold leading-snug hover:text-red">{product!.name}</Link>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button type="button" aria-label="Decrease quantity" onClick={() => setQty(slug, qty - 1)} className="grid size-8 place-items-center"><Minus className="size-3.5" /></button>
                      <input
                        aria-label={`Quantity for ${product!.name}`}
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(slug, Number(e.target.value) || 1)}
                        className="w-10 bg-transparent text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button type="button" aria-label="Increase quantity" onClick={() => setQty(slug, qty + 1)} className="grid size-8 place-items-center"><Plus className="size-3.5" /></button>
                    </div>
                    <button type="button" onClick={() => remove(slug)} aria-label={`Remove ${product!.name}`} className="grid size-8 place-items-center rounded-full text-ink/40 hover:bg-red/10 hover:text-red">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <Link href="/shop" className="mt-6 inline-block text-sm font-semibold text-red hover:underline">+ Add more products</Link>
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Request quotation</h2>
          <p className="mt-2 text-ink/60">Add your project details. Pricing and lead times are provided by quotation.</p>
          <div className="mt-8">
            <EnquiryForm
              type="quote"
              products={lines.map((l) => ({ slug: l.slug, name: l.product!.name, qty: l.qty }))}
              onSuccess={() => {
                setSent(true);
                clear();
              }}
              submitLabel="Request quotation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
