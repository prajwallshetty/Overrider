"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList } from "lucide-react";
import { useEnquiry } from "./enquiry-provider";

export function BasketBar() {
  const { count, ready, items } = useEnquiry();
  return (
    <AnimatePresence>
      {ready && count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-4 z-40 px-4"
        >
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-full bg-ink py-2 pl-5 pr-2 text-white shadow-2xl">
            <span className="flex items-center gap-3 text-sm">
              <ClipboardList className="size-4 text-red-400" />
              {items.length} product{items.length > 1 ? "s" : ""} · {count} unit{count > 1 ? "s" : ""}
            </span>
            <Link href="/shop/enquiry" className="rounded-full bg-red px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-red-600">
              Review &amp; request quote
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
