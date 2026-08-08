"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import { Loader } from "./loader";
import {
  SITE_ADDRESS_DISPLAY,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/contact-info";

type SubmitState = "idle" | "submitting" | "submitted" | "error";

export function Contact() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      date: String(formData.get("date") ?? ""),
      guests: String(formData.get("guests") ?? ""),
      details: String(formData.get("details") ?? ""),
    };

    setState("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!res.ok || !body?.ok) {
        throw new Error(body?.error ?? "[NETWORK_ERR] Something went wrong. Please try again.");
      }

      setState("submitted");
    } catch (err) {
      setState("error");
      // Strip the leading [ERROR_CODE] tag before showing this to a
      // visitor — that prefix is for server logs, not the enquiry form.
      const message =
        err instanceof Error ? err.message.replace(/^\[[A-Z_]+\]\s*/, "") : "";
      setErrorMessage(message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
              Enquire
            </p>
            <h2 id="contact-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Tell us about your date.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Share a headcount and a rough date and we&rsquo;ll come back
              with availability and a starting menu direction within one
              business day.
            </p>

            <dl className="mt-10 space-y-4 border-t border-line pt-8">
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-nezumi">
                  Studio
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  {SITE_ADDRESS_DISPLAY}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-nezumi">
                  Direct line
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  <a href={`tel:${SITE_PHONE_TEL}`} className="brush-underline">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-nezumi">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  <a href={`mailto:${SITE_EMAIL}`} className="brush-underline">
                    {SITE_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100}>
            {state === "submitted" ? (
              <div
                role="status"
                className="flex h-full flex-col justify-center border border-line bg-washi-raised p-8"
              >
                <p className="text-2xl text-ink">
                  Received, thank you.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  We&rsquo;ll reply from {SITE_EMAIL} within one business
                  day with availability. Check your inbox for a
                  confirmation of what you sent us.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field id="name" label="Name" autoComplete="name" required />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field id="date" label="Event date" type="date" />
                  <Field id="guests" label="Guest count" type="number" min={1} />
                </div>
                <div>
                  <label
                    htmlFor="details"
                    className="mb-2 block text-[11px] tracking-[0.14em] text-nezumi"
                  >
                    Occasion &amp; details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
                  />
                </div>
                {state === "error" && errorMessage && (
                  <p role="alert" className="text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}
                <CtaButton type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
                  {state === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <Loader size={16} label="Sending enquiry" />
                      Sending&hellip;
                    </span>
                  ) : (
                    "Send enquiry"
                  )}
                </CtaButton>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required,
  min,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] tracking-[0.14em] text-nezumi"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        min={min}
        className="w-full border border-line bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
      />
    </div>
  );
}
