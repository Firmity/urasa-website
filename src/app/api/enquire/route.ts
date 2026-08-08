import { NextRequest, NextResponse } from "next/server";
import { sendMail, SmtpConfigError, MailSendError } from "@/lib/mailer";
import { SITE_EMAIL } from "@/lib/contact-info";

// nodemailer needs Node's net/tls modules — not available on the Edge
// runtime, so this route must run in the Node.js runtime.
export const runtime = "nodejs";

interface EnquiryPayload {
  name: string;
  email: string;
  date: string;
  guests: string;
  details: string;
}

const MAX_LEN = {
  name: 120,
  email: 254,
  date: 32,
  guests: 16,
  details: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit. Per-process only — it resets on cold
// start and does not coordinate across multiple server instances/regions.
// That's an acceptable tradeoff for a single small deployment; swap for a
// shared store (Redis, Upstash) if this ever runs multi-instance.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

type ValidationResult =
  | { ok: true; data: EnquiryPayload }
  | { ok: false; error: string };

function validate(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "[INVALID_INPUT] Request body must be an object" };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const date = typeof b.date === "string" ? b.date.trim() : "";
  const guests =
    typeof b.guests === "string" || typeof b.guests === "number" ? String(b.guests).trim() : "";
  const details = typeof b.details === "string" ? b.details.trim() : "";

  if (!name || name.length > MAX_LEN.name) {
    return { ok: false, error: "[INVALID_INPUT] Name is required (max 120 characters)." };
  }
  if (!email || email.length > MAX_LEN.email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "[INVALID_INPUT] A valid email address is required." };
  }
  if (date.length > MAX_LEN.date) {
    return { ok: false, error: "[INVALID_INPUT] Event date is too long." };
  }
  if (guests.length > MAX_LEN.guests) {
    return { ok: false, error: "[INVALID_INPUT] Guest count is too long." };
  }
  if (details.length > MAX_LEN.details) {
    return { ok: false, error: "[INVALID_INPUT] Details must be under 4000 characters." };
  }

  return { ok: true, data: { name, email, date, guests, details } };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    console.warn(`[RATE_LIMIT] /api/enquire blocked ip=${ip}`);
    return NextResponse.json(
      { ok: false, error: "[RATE_LIMIT] Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "[INVALID_INPUT] Malformed request body." },
      { status: 400 }
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  const { name, email, date, guests, details } = result.data;

  const summaryRows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Event date", date || "Not specified"],
    ["Guest count", guests || "Not specified"],
  ];

  const notificationText = [
    "New enquiry from urasa.in",
    "",
    ...summaryRows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Occasion & details:",
    details || "(none provided)",
  ].join("\n");

  const notificationHtml = `
    <h2 style="color:#40492C">New enquiry from urasa.in</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${summaryRows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;color:#40492C">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-weight:bold;color:#40492C">Occasion &amp; details</p>
    <p>${escapeHtml(details || "(none provided)").replace(/\n/g, "<br>")}</p>
  `;

  // Fatal path: if Urasa never receives the enquiry, the submission has
  // functionally failed. Surface that to the client so they know to
  // retry or call instead of believing an enquiry was sent.
  try {
    await sendMail({
      to: SITE_EMAIL,
      subject: `New enquiry — ${name}${date ? ` (${date})` : ""}`,
      text: notificationText,
      html: notificationHtml,
      replyTo: email,
    });
  } catch (err) {
    logMailError("notification", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "[MAIL_SEND_ERR] Could not deliver your enquiry right now. Please try again shortly or call us directly.",
      },
      { status: 502 }
    );
  }

  // Non-fatal path: Urasa already has the enquiry at this point. A failed
  // acknowledgement email is a UX nicety, not a lost lead — log it and
  // still report success to the client.
  try {
    await sendMail({
      to: email,
      subject: "We've received your enquiry — Urasa",
      text: [
        `Hi ${name},`,
        "",
        "Thanks for reaching out to Urasa. We've received your enquiry and will reply with availability and a starting menu direction within one business day.",
        "",
        "Here's what you sent us:",
        ...summaryRows.slice(1).map(([k, v]) => `${k}: ${v}`),
        `Occasion & details: ${details || "(none provided)"}`,
        "",
        "We care about warmth.",
        "— Urasa",
      ].join("\n"),
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to Urasa. We've received your enquiry and will reply with availability and a starting menu direction within one business day.</p>
        <p style="font-weight:bold;color:#40492C">What you sent us</p>
        <table cellpadding="6" style="border-collapse:collapse">
          ${summaryRows
            .slice(1)
            .map(
              ([k, v]) =>
                `<tr><td style="font-weight:bold;color:#40492C">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
            )
            .join("")}
        </table>
        <p><em>We care about warmth.</em><br>— Urasa</p>
      `,
    });
  } catch (err) {
    logMailError("acknowledgement", err);
  }

  return NextResponse.json({ ok: true });
}

function logMailError(context: "notification" | "acknowledgement", err: unknown): void {
  if (err instanceof SmtpConfigError || err instanceof MailSendError) {
    console.error(`[${context}] ${err.message}`);
    return;
  }
  console.error(`[${context}] [MAIL_SEND_ERR] Unexpected error: ${String(err)}`);
}
