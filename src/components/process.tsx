import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "01",
    title: "Enquiry",
    body: "Tell us the date, headcount, and occasion. We reply within one business day with availability.",
  },
  {
    n: "02",
    title: "Tasting",
    body: "A seated tasting for up to four, built from your draft menu, at our kitchen or your venue.",
  },
  {
    n: "03",
    title: "Confirmation",
    body: "Final headcount, dietary notes, and run-of-show are locked six weeks before your date.",
  },
  {
    n: "04",
    title: "Service",
    body: "Our kitchen team travels with the menu. One point of contact runs service from first course to last.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
            Process
          </p>
          <h2 id="process-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            From enquiry to final course.
          </h2>
        </Reveal>

        <ol className="mt-8 md:mt-14 grid grid-cols-1 gap-0 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 100}
              className="relative border-t border-line py-5 pr-6 sm:py-8 md:border-t-0 md:border-l md:py-2 md:pl-6"
            >
              <span className="text-sm text-brand">{s.n}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
