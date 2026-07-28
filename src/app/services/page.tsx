import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Services — Urasa",
  description:
    "One Urasa kitchen, four service formats — corporate and executive dining, weddings, private functions, and standing receptions.",
};

const SERVICES = [
  {
    title: "Corporate & Institutions",
    body: "Board dinners, product launches, and offsite retreats, with menus built around your event's timing and audience.",
    stat: "10–250 guests",
  },
  {
    title: "Weddings",
    body: "A tasting-led planning process from first meeting to final course, coordinated with your venue and planner.",
    stat: "50–500 guests",
  },
  {
    title: "Private Functions",
    body: "In-home tasting menus, milestone celebrations, and small sit-down dinners with a dedicated chef on site.",
    stat: "2–40 guests",
  },
  {
    title: "Standing & Reception",
    body: "The same seasonal, balanced menu, reformatted as a canapé sequence for a moving room.",
    stat: "40–800 guests",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-heading" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
              Services
            </p>
            <h1 id="services-heading" className="font-display text-3xl leading-tight text-ink sm:text-5xl">
              One kitchen, four formats.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              The same team, the same seasonal sourcing, and the same
              balanced-plate approach — reshaped for whatever the room
              actually needs, from a boardroom dinner to a standing
              reception for eight hundred.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="formats-heading" className="bg-washi-raised">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <h2 id="formats-heading" className="sr-only">
            Service formats
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 90}
                className="flex flex-col justify-between border border-line bg-washi p-8 transition-colors hover:border-brand"
              >
                <div>
                  <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
                <p className="mt-8 text-[11px] tracking-[0.14em] text-nezumi">
                  {s.stat}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={SERVICES.length * 90} className="mt-12">
            <CtaButton href="/enquire">Start an enquiry</CtaButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
