"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { CtaButton } from "./cta-button";
import { Loader } from "./loader";

// No real backend yet — this stands in for the network round-trip so the
// submit button's loading state (and the embroidered loader) has a job.
const SIMULATED_LATENCY_MS = 650;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
                  12 Foundry Lane, Lucknow, Uttar Pradesh
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-nezumi">
                  Direct line
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  <a href="tel:+910000000000" className="brush-underline">
                    +91 00000 00000
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-nezumi">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-ink">
                  <a href="mailto:events@urasa.example" className="brush-underline">
                    events@urasa.example
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100}>
            {submitted ? (
              <div
                role="status"
                className="flex h-full flex-col justify-center border border-line bg-washi-raised p-8"
              >
                <p className="text-2xl text-ink">
                  Received, thank you.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  We&rsquo;ll reply from events@urasa.example within one
                  business day with availability.
                </p>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setSubmitting(true);
                  window.setTimeout(() => {
                    setSubmitting(false);
                    setSubmitted(true);
                  }, SIMULATED_LATENCY_MS);
                }}
                noValidate
              >
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
                <CtaButton type="submit" disabled={submitting} aria-busy={submitting}>
                  {submitting ? (
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
