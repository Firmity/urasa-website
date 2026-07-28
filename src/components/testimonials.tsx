import { Reveal } from "./reveal";

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

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="bg-washi-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <h2 id="testimonials-heading" className="sr-only">
          Client testimonials
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 100}
              className="flex flex-col justify-between"
            >
              <p className="text-xl leading-snug text-ink">
                &ldquo;{q.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="text-sm text-ink">{q.name}</p>
                <p className="text-xs tracking-[0.1em] text-nezumi">
                  {q.role}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
