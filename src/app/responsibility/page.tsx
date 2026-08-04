import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { responsibilitySchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Responsibility — Urasa",
  description:
    "How Urasa sources, cooks, and staffs responsibly — seasonal sourcing, balanced nutrition, and a single accountable kitchen team.",
  alternates: { canonical: "/responsibility" },
  openGraph: {
    type: "website",
    url: "/responsibility",
    title: "Responsibility — Urasa",
    description:
      "Seasonal sourcing, balance on every plate, minimal waste, and one accountable kitchen team — no sub-contracted hands.",
    images: ["/food/rainbow-bowl.webp"],
  },
};

const PILLARS = [
  {
    title: "Seasonal, close sourcing",
    body: "Cooking by ritu isn't a marketing angle — it's a sourcing constraint. Menus are built around what's genuinely available each fortnight, which keeps supply chains short and cuts the emissions and cost of forcing ingredients out of season.",
  },
  {
    title: "Balance on every plate",
    body: "Santulan governs nutrition as much as flavour: every course is built around a real balance of grains, protein, and vegetables, and portioning that respects the guest rather than maximising plate size.",
  },
  {
    title: "Minimal, deliberate waste",
    body: "Headcounts are confirmed close to the event date, prep quantities are planned against that number, and surplus from tastings and trials is never simply discarded — it's redirected to staff meals first.",
  },
  {
    title: "One accountable kitchen",
    body: "Nishtha means no sub-contracted service staff standing between us and the guest. Every person on site is an Urasa hire, trained, paid, and scheduled directly by us — accountability we can't outsource away.",
  },
];

export default function ResponsibilityPage() {
  return (
    <>
      <JsonLd data={responsibilitySchema()} />
      <section aria-labelledby="responsibility-heading" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
              Responsibility
            </p>
            <h1
              id="responsibility-heading"
              className="font-display text-3xl leading-tight text-ink sm:text-5xl"
            >
              We measure our meals by their impact.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Not just on society, people, and the environment in the
              abstract — on the specific supply chain, kitchen team, and
              guests in front of us for a given event. Here's how the
              three principles behind our menus (ritu, santulan, nishtha)
              translate into how we actually source, cook, and staff.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pillars-heading" className="border-b border-line bg-washi-raised">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 sm:py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12 md:px-8 md:py-24">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/santulan-card.webp"
                alt="Illustration representing balance across sourcing, plate, and team"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <h2 id="pillars-heading" className="sr-only">
              How this plays out
            </h2>
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 90} className="flex flex-col bg-washi-raised p-6 sm:p-7">
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-responsibility-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <Reveal className="max-w-xl">
            <h2 id="contact-responsibility-heading" className="font-display text-2xl text-ink sm:text-3xl">
              Questions about sourcing or our kitchen practices?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Get in touch and we'll walk you through specifics for your
              event — supplier list, allergen handling, and staffing
              included.
            </p>
            <a
              href="/enquire"
              className="brush-underline mt-6 inline-flex w-fit items-center text-[13px] tracking-[0.14em] text-brand"
            >
              Enquire
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
