import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * SMTP-backed mailer for the enquiry form. Credentials come entirely from
 * env vars — nothing here hardcodes a mailbox, host, or password. See
 * .env.example for the full var list and where to source them from your
 * mailbox provider (Google Workspace, Zoho Mail, etc. — anything that
 * exposes SMTP for connect@urasa.in).
 *
 * Layer boundary: this module only knows how to send a already-composed
 * message over SMTP. It has no knowledge of the enquiry form's fields —
 * that composition lives in the route handler. Keeps this file testable
 * in isolation and reusable for any future transactional email.
 */

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

/** [SMTP_CONFIG_ERR] — required env vars are missing or malformed. */
export class SmtpConfigError extends Error {
  constructor(detail: string) {
    super(`[SMTP_CONFIG_ERR] ${detail}`);
    this.name = "SmtpConfigError";
  }
}

/**
 * Shape nodemailer's SMTP transport actually throws — `Error` plus
 * provider diagnostics that the base `.message` string drops on the
 * floor. `code` is nodemailer's own classification (e.g. "EAUTH",
 * "ECONNECTION"); `response`/`responseCode`/`command` are the raw SMTP
 * server reply. Surfacing all of these (not just `.message`) is the
 * difference between "535 authentication rejected" and knowing *why* —
 * e.g. "534 5.7.9 Application-specific password required" vs "535 5.7.8
 * Username and Password not accepted" are both "auth rejected" but need
 * completely different fixes.
 */
interface SmtpTransportError extends Error {
  code?: string;
  response?: string;
  responseCode?: number;
  command?: string;
}

function isSmtpTransportError(err: unknown): err is SmtpTransportError {
  return err instanceof Error && ("response" in err || "code" in err);
}

/** [MAIL_SEND_ERR] — SMTP transport accepted the config but the send failed. */
export class MailSendError extends Error {
  constructor(context: string, cause: unknown) {
    let detail = cause instanceof Error ? cause.message : String(cause);
    if (isSmtpTransportError(cause)) {
      const parts = [
        cause.code && `code=${cause.code}`,
        cause.responseCode && `responseCode=${cause.responseCode}`,
        cause.command && `command=${cause.command}`,
        cause.response && `response=${JSON.stringify(cause.response)}`,
      ].filter(Boolean);
      if (parts.length > 0) detail = parts.join(" ");
    }
    super(`[MAIL_SEND_ERR] ${context}: ${detail}`);
    this.name = "MailSendError";
  }
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new SmtpConfigError(`Missing required env vars: ${missing.join(", ")}`);
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isFinite(port)) {
    throw new SmtpConfigError(`SMTP_PORT is not a valid number: "${process.env.SMTP_PORT}"`);
  }

  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 is implicit TLS; 587/25 use STARTTLS. SMTP_SECURE lets an
    // operator override this if their provider is nonstandard.
    secure,
    // On a STARTTLS port, force the TLS upgrade before AUTH instead of
    // negotiating it opportunistically. Some providers (GoDaddy included)
    // will silently reject AUTH over a connection that didn't upgrade
    // cleanly rather than erroring on the STARTTLS step itself — without
    // this the failure surfaces as a confusing plain auth rejection.
    requireTLS: !secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Verbose SMTP conversation logging to the server console — this is
    // credential-adjacent, not credential-leaking (nodemailer masks the
    // AUTH payload), and buys real diagnosis instead of guessing. Strip
    // this once the account is confirmed working.
    logger: true,
    debug: true,
  });

  return cachedTransporter;
}

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

const SEND_TIMEOUT_MS = 10_000;

/**
 * Sends one email, bounded by a hard timeout so a hung SMTP connection
 * can't stall the request indefinitely. Throws SmtpConfigError (bad env)
 * or MailSendError (send failed) — callers decide whether that failure is
 * fatal to the outer request.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  try {
    await Promise.race([
      transporter.sendMail({
        from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        replyTo: message.replyTo,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("SMTP send timed out")), SEND_TIMEOUT_MS)
      ),
    ]);
  } catch (err) {
    throw new MailSendError(`sending to ${message.to}`, err);
  }
}
