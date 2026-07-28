import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Careers — Urasa",
  description:
    "Join the Urasa kitchen — one team that plans, cooks, and serves every event, on menus that change with the season.",
};

const REASONS = [
  {
    title: "One kitchen, real ownership",
    body: "No sub-contracted service staff. The chefs who plan a menu are the chefs who cook and serve it on the day — you see a job through, start to finish.",
  },
  {
    title: "The menu never goes stale",
    body: "Six ritu, not a fixed banquet list. What you're cooking in March genuinely isn't what you cooked in January — the job keeps teaching you something.",
  },
  {
    title: "Balanced kitchens, not burnout kitchens",
    body: "Santulan applies to how we run service, too — realistic covers per chef, predictable schedules around event dates, and a team that plans workload together.",
  },
];

const ROLES = [
  { title: "Line Cook", type: "Full-time · Lucknow" },
  { title: "Tandoor Chef", type: "Full-time · Lucknow" },
  { title: "Event Captain", type: "Full-time · Multi-city" },
  { title: "Pastry & Mishti Chef", type: "Full-time · Lucknow" },
];

export default function CareersPage() {
  return (
    <>
      <section aria-labelledby="careers-heading" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
              Careers
            </p>
            <h1 id="careers-heading" className="font-display text-3xl leading-tight text-ink sm:text-5xl">
              Join our kitchen.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Be part of the ambitious, collective effort of a single
              kitchen team that plans, cooks, and serves every occasion of
              consequence we take on — no sub-contracted hands, no
              hand-off between planning and plating.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="reasons-heading" className="border-b border-line bg-washi-raised">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <Reveal>
            <h2 id="reasons-heading" className="font-display mb-8 text-2xl text-ink sm:mb-12 sm:text-3xl">
              Why cook with Urasa.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} className="flex flex-col bg-washi-raised p-6 sm:p-8">
                <h3 className="font-display text-xl text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="roles-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <Reveal className="max-w-xl">
            <h2 id="roles-heading" className="font-display text-2xl text-ink sm:text-3xl">
              Open roles.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Nothing that fits right now? Send your CV anyway — we keep it
              on file and reach out when a seat opens on the right team.
            </p>
          </Reveal>

          <ul className="mt-8 divide-y divide-line border-t border-b border-line sm:mt-10">
            {ROLES.map((role) => (
              <li key={role.title} className="flex items-center justify-between gap-4 py-4 sm:py-5">
                <span className="text-lg text-ink sm:text-xl">{role.title}</span>
                <span className="text-[11px] tracking-[0.1em] text-nezumi">
                  {role.type}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-start">
            <CtaButton href="mailto:careers@urasa.example?subject=Application">
              Send your CV
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
