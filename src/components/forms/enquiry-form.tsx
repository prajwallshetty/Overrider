"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/content/company";
import {
  enquirySchema,
  enquiryTypes,
  interestOptions,
  projectStages,
  projectTypes,
  type EnquiryType,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

export interface EnquiryFormProps {
  type?: EnquiryType;
  /** Show a type selector so the user can switch enquiry type. */
  selectableTypes?: EnquiryType[];
  defaultInterest?: string;
  defaultMessage?: string;
  products?: { slug: string; name: string; qty: number }[];
  onSuccess?: () => void;
  tone?: "light" | "dark";
  compact?: boolean;
  submitLabel?: string;
}

export function EnquiryForm({
  type = "general",
  selectableTypes,
  defaultInterest,
  defaultMessage,
  products,
  onSuccess,
  tone = "light",
  compact,
  submitLabel,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const [current, setCurrent] = useState<EnquiryType>(type);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const dark = tone === "dark";

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      type: current,
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      location: String(fd.get("location") ?? ""),
      projectType: String(fd.get("projectType") ?? ""),
      stage: String(fd.get("stage") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on" ? true : undefined,
      website: String(fd.get("website") ?? ""),
      products,
      source: pathname,
      startedAt: startedAt.current,
    };
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      const next: Errors = {};
      for (const k in fe) if (fe[k]?.[0]) next[k] = fe[k]![0];
      setErrors(next);
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.fields) {
          const next: Errors = {};
          for (const k in json.fields) if (json.fields[k]?.[0]) next[k] = json.fields[k][0];
          setErrors(next);
        }
        throw new Error(json.error || "Something went wrong.");
      }
      setReference(json.reference ?? null);
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className={cn("rounded-2xl border p-8 md:p-10", dark ? "border-white/10 bg-white/[0.03] text-white" : "border-ink/10 bg-white")}
      >
        <CheckCircle2 className="size-10 text-red" />
        <h3 className="mt-6 text-title font-semibold">Thank you — your enquiry has been received.</h3>
        <p className={cn("mt-3 max-w-lg leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>
          An Override-R engineer will review your {enquiryTypes[current].toLowerCase()} and respond by email.
          {reference && (
            <>
              {" "}Your reference is <span className="font-mono font-semibold">{reference}</span>.
            </>
          )}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm font-semibold text-red hover:underline">
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("relative", dark && "text-white")} aria-describedby="form-required-note">
      {selectableTypes && (
        <fieldset className="mb-8">
          <legend className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.14em]", dark ? "text-white/50" : "text-ink/50")}>Enquiry type</legend>
          <div className="flex flex-wrap gap-2">
            {selectableTypes.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={current === t}
                onClick={() => setCurrent(t)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  current === t
                    ? "border-red bg-red text-white"
                    : dark
                      ? "border-white/15 text-white/70 hover:border-white/40"
                      : "border-ink/15 text-ink/70 hover:border-ink/40",
                )}
              >
                {enquiryTypes[t]}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {products && products.length > 0 && (
        <div className={cn("mb-8 rounded-xl border p-4", dark ? "border-white/10" : "border-ink/10 bg-paper")}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red">Products in this enquiry</p>
          <ul className="mt-3 space-y-1 text-sm">
            {products.map((p) => (
              <li key={p.slug} className="flex justify-between gap-4">
                <span>{p.name}</span>
                <span className={cn("font-mono", dark ? "text-white/50" : "text-ink/50")}>× {p.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={cn("grid gap-x-6 gap-y-5", !compact && "md:grid-cols-2")}>
        <Field name="name" label="Full name" required error={errors.name} dark={dark} autoComplete="name" />
        <Field name="company" label="Company" required error={errors.company} dark={dark} autoComplete="organization" />
        <Field name="email" label="Business email" type="email" required error={errors.email} dark={dark} autoComplete="email" />
        <Field name="phone" label="Phone / WhatsApp" type="tel" required error={errors.phone} dark={dark} autoComplete="tel" />
        <Field name="country" label="Country" required error={errors.country} dark={dark} autoComplete="country-name" />
        <Field name="location" label="Project location" error={errors.location} dark={dark} placeholder="City / site" />
        <SelectField name="projectType" label="Project type" options={projectTypes} dark={dark} />
        <SelectField name="stage" label="Current project stage" options={projectStages} dark={dark} />
        <div className={cn(!compact && "md:col-span-2")}>
          <SelectField name="interest" label="Interested system" options={interestOptions} defaultValue={defaultInterest} dark={dark} />
        </div>
        <div className={cn(!compact && "md:col-span-2")}>
          <Field
            name="message"
            label="Message"
            textarea
            required
            error={errors.message}
            dark={dark}
            defaultValue={defaultMessage}
            placeholder="Tell us about the building, systems involved and what you need from us."
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, visible to bots */}
      <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={cn("mt-6 flex items-start gap-3 text-sm", dark ? "text-white/65" : "text-ink/65")}>
        <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-red" aria-invalid={!!errors.consent} />
        <span>
          I agree that Override-R may store and use these details to respond to my enquiry, as described in the{" "}
          <a href="/privacy" className="underline underline-offset-2">privacy notice</a>.
        </span>
      </label>
      {errors.consent && <p className="mt-2 text-sm text-red">{errors.consent}</p>}

      <AnimatePresence>
        {status === "error" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="mt-6 overflow-hidden">
            <div className="flex items-start gap-3 rounded-xl border border-red/30 bg-red/5 p-4 text-sm">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red" />
              <div>
                <p className="font-semibold">{serverError}</p>
                <p className={cn("mt-1", dark ? "text-white/60" : "text-ink/60")}>
                  You can also reach us at{" "}
                  <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" arrow disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            submitLabel ?? (current === "quote" ? "Request quotation" : "Send enquiry")
          )}
        </Button>
        <div className={cn("flex items-center gap-4 text-sm", dark ? "text-white/55" : "text-ink/55")}>
          <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-red">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-1.5 hover:text-red">
            <Mail className="size-4" /> Email
          </a>
        </div>
      </div>
      <p id="form-required-note" className={cn("mt-4 text-xs", dark ? "text-white/40" : "text-ink/40")}>
        Fields marked * are required.
      </p>
    </form>
  );
}

const inputCls = (dark: boolean, err?: string) =>
  cn(
    "peer w-full rounded-none border-0 border-b bg-transparent px-0 pb-2.5 pt-1.5 text-[15px] outline-none transition-colors placeholder:text-current placeholder:opacity-35 focus:border-red focus-visible:outline-none",
    dark ? "border-white/20" : "border-ink/20",
    err && "border-red",
  );

function Field({
  name,
  label,
  required,
  error,
  dark,
  textarea,
  type = "text",
  ...rest
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  dark: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className={cn("block text-xs font-semibold uppercase tracking-[0.12em]", dark ? "text-white/50" : "text-ink/50")}>
        {label}
        {required && <span className="text-red"> *</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} aria-invalid={!!error} aria-describedby={error ? errId : undefined} className={cn(inputCls(dark, error), "resize-y")} {...rest} />
      ) : (
        <input id={id} name={name} type={type} aria-invalid={!!error} aria-describedby={error ? errId : undefined} className={inputCls(dark, error)} {...rest} />
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-red">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ name, label, options, dark, defaultValue }: { name: string; label: string; options: readonly string[]; dark: boolean; defaultValue?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={cn("block text-xs font-semibold uppercase tracking-[0.12em]", dark ? "text-white/50" : "text-ink/50")}>
        {label}
      </label>
      <select id={id} name={name} defaultValue={defaultValue ?? ""} className={cn(inputCls(dark), "cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat", dark ? "[&>option]:bg-ink" : "")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23d4271d' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
