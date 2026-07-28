import { Reveal } from "../reveal";
import { UNORA } from "./theme";

// Same QUOTES as testimonials.tsx — real client quotes, new card treatment.
const QUOTES = [
  {
    quote:
      "The pacing was the thing our guests still mention. Nobody was waiting on a course, and nothing felt rushed either.",
    name: "Priya Nair",
    role: "Head of Events, Meridian Capital",
  },
  {
    quote:
      "We changed our headcount twice in the final week and the team absorbed it without a single visible ripple on the day.",
    name: "Thomas Berg",
    role: "Wedding client, June 2025",
  },
  {
    quote:
      "Genuinely seasonal — the menu we tasted in March was not the menu we ate in May, and it was better for it.",
    name: "Ananya Rao",
    role: "Founder, Studio Rao",
  },
];

export function UnoraTestimonials() {
  return (
    <section
      aria-labelledby="unora-testimonials-heading"
      style={{ background: UNORA.cream }}
    >
      <h2 id="unora-testimonials-heading" className="sr-only">
        Client testimonials
      </h2>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <div
                className="flex h-full flex-col justify-between rounded-3xl p-7"
                style={{ background: UNORA.creamRaised }}
              >
                <p
                  className="text-lg leading-snug"
                  style={{ color: UNORA.navy }}
                >
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer
                  className="mt-6 pt-4"
                  style={{ borderTop: `1px solid rgba(22,59,77,0.14)` }}
                >
                  <p className="text-sm" style={{ color: UNORA.navy }}>
                    {q.name}
                  </p>
                  <p
                    className="text-xs tracking-[0.1em]"
                    style={{ color: UNORA.inkSoft }}
                  >
                    {q.role}
                  </p>
                </footer>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
