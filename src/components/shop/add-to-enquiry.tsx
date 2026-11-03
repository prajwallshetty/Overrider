"use client";

import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { useEnquiry } from "./enquiry-provider";
import { cn } from "@/lib/utils";

export function AddToEnquiry({ slug, size = "md", className, full }: { slug: string; size?: "sm" | "md" | "lg"; className?: string; full?: boolean }) {
  const { add, has, ready } = useEnquiry();
  const added = ready && has(slug);
  const h = size === "sm" ? "h-9 text-[13px] px-4" : size === "lg" ? "h-14 px-7 text-[15px]" : "h-11 px-5 text-sm";
  if (added) {
    return (
      <Link href="/shop/enquiry" className={cn("inline-flex items-center justify-center gap-2 rounded-full border border-red/30 bg-red/5 font-medium text-red transition-colors hover:bg-red hover:text-white", h, full && "w-full", className)}>
        <Check className="size-4" /> In enquiry list
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => add(slug)}
      className={cn("inline-flex items-center justify-center gap-2 rounded-full bg-ink font-medium text-white transition-colors hover:bg-red", h, full && "w-full", className)}
    >
      <Plus className="size-4" /> Add to enquiry
    </button>
  );
}
