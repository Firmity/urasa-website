import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { faqSchema } from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Urasa",
  description:
    "Answers to common questions about Urasa's catering: philosophy, services, guest ranges, sourcing, and how booking works.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: "/faq",
    title: "Frequently Asked Questions — Urasa",
    description:
      "What Urasa is, how it sources and staffs, which events it caters, and how booking a tasting works.",
    images: ["/food/thali-platter.webp"],
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section aria-labelledby="faq-heading" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
              FAQ
            </p>
            <h1
              id="faq-heading"
              className="font-display text-3xl leading-tight text-ink sm:text-5xl"
            >
              Frequently asked questions.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              The short answers. For anything specific to your date,
              headcount, or venue, an enquiry gets you a real answer
              within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-list-heading" className="bg-washi-raised">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <h2 id="faq-list-heading" className="sr-only">
            Questions and answers
          </h2>
          <dl className="divide-y divide-line border-t border-b border-line">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.question} delay={Math.min(i, 6) * 60}>
                <div className="py-6 sm:py-8">
                  <dt className="font-display text-lg text-ink sm:text-xl">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.answer}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="faq-cta-heading" className="bg-washi">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:py-20 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-xl">
            <h2 id="faq-cta-heading" className="font-display text-2xl text-ink sm:text-3xl">
              Still have a question?
            </h2>
            <div className="mt-6 flex justify-center">
              <CtaButton href="/enquire">Ask us directly</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
