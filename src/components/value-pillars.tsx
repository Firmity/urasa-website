import { Reveal } from "./reveal";

const PILLARS = [
  {
    eyebrow: "CSR",
    title: "A responsible kitchen",
    body: "We source close to season, cut avoidable waste, and hold our supply chain to the same standard we hold our plating — every choice measured against its impact on people and place.",
    href: "/responsibility",
    icon: <ChefHatIcon />,
  },
  {
    eyebrow: "Innovation",
    title: "Reinventing seasonal catering",
    body: "Menus rebuilt around the six ritu, not a fixed banquet calendar — our supply chain, prep, and service model all adapt with what the market gives us each week.",
    href: "/#philosophy",
    icon: <LeafIcon />,
  },
  {
    eyebrow: "Candidates",
    title: "Join our kitchen",
    body: "Be part of a single kitchen team that plans, cooks, and serves every event start to finish — no sub-contracted hands, real ownership of the plate.",
    href: "/careers",
    icon: <HandshakeIcon />,
  },
];

export function ValuePillars() {
  return (
    <section aria-labelledby="value-heading" className="bg-washi-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="value-heading"
            className="font-display text-2xl leading-tight text-ink sm:text-4xl"
          >
            We measure our meals by their impact on society, people, and the
            environment.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <a
                href={p.href}
                className="group flex h-full flex-col border border-line bg-washi p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand hover:shadow-lg sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-brand transition-colors group-hover:border-brand group-hover:bg-brand/5"
                >
                  {p.icon}
                </span>
                <p className="text-[11px] tracking-[0.14em] text-nezumi">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[11px] tracking-[0.12em] text-brand transition-colors group-hover:text-season">
                  Learn more <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChefHatIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 12c-2.2 0-4-1.8-4-4a4 4 0 0 1 4-4c.3-1.7 1.8-3 3.6-3 1.3 0 2.5.7 3.1 1.8.5-.3 1.1-.4 1.7-.4a3.6 3.6 0 0 1 3.6 3.6c1.7.3 3 1.8 3 3.6a4 4 0 0 1-4 4" />
      <path d="M7 12v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
      <path d="M6 20h12" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 4c-8 0-14 6-14 14 8 0 14-6 14-14Z" />
      <path d="M6 18c3-5 6-8 12-11" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12l4-3 3 2 3-2 2 2" />
      <path d="M22 12l-4-3-3 2-3-2-1 1" />
      <path d="M9 11l5 5c.6.6 1.6.6 2.2 0 .6-.6.6-1.6 0-2.2" />
      <path d="M12 14l1.5 1.5c.6.6 1.6.6 2.2 0 .6-.6.6-1.6 0-2.2" />
    </svg>
  );
}
