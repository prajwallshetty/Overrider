import { NextResponse } from "next/server";
import { enquirySchema, enquiryTypes } from "@/lib/enquiry";

/**
 * Enquiry endpoint — CRM/automation ready.
 * - Validates with the shared zod schema.
 * - Spam protection: honeypot field, minimum fill time, simple per-IP rate limit.
 * - Forwards valid enquiries as JSON to ENQUIRY_WEBHOOK_URL when configured
 *   (HubSpot / Zoho / Salesforce / Make / Zapier / custom admin API).
 * Replace the in-memory limiter with a shared store (e.g. Redis) in multi-instance deployments.
 */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Spam heuristics: honeypot filled or form submitted implausibly fast → accept silently, drop.
  if (data.website || (data.startedAt && now - data.startedAt < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const { website: _w, startedAt: _s, ...lead } = data;
  const payload = {
    ...lead,
    typeLabel: enquiryTypes[lead.type],
    receivedAt: new Date(now).toISOString(),
    reference: `OVR-${now.toString(36).toUpperCase()}`,
  };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
      return NextResponse.json({ ok: false, error: "We could not send your enquiry right now. Please email us directly." }, { status: 502 });
    }
  } else {
    console.info("[enquiry] received (no ENQUIRY_WEBHOOK_URL configured)", payload.reference, payload.typeLabel);
  }

  return NextResponse.json({ ok: true, reference: payload.reference });
}
