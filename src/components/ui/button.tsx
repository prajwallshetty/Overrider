import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-red text-white hover:bg-red-600 shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
        dark: "bg-ink text-white hover:bg-ink-3",
        light: "bg-white text-ink hover:bg-paper",
        outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
        "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
        ghost: "text-ink hover:text-red",
      },
      size: {
        sm: "h-9 px-4 text-[13px] rounded-full",
        md: "h-11 px-5 text-sm rounded-full",
        lg: "h-14 px-7 text-[15px] rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Common = VariantProps<typeof buttonVariants> & { className?: string; children: React.ReactNode; arrow?: boolean };

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span className="relative z-10 grid size-5 place-items-center overflow-hidden">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-5 group-hover/btn:translate-x-5" />
          <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );
}

export function ButtonLink({ href, variant, size, className, children, arrow, ...rest }: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({ variant, size, className, children, arrow, ...rest }: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function TextLink({ href, children, className, light }: { href: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/tl inline-flex items-center gap-1.5 text-sm font-semibold",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover/tl:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight className="size-4 text-red transition-transform duration-300 group-hover/tl:translate-x-0.5 group-hover/tl:-translate-y-0.5" />
    </Link>
  );
}
