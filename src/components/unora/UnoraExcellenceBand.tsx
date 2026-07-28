import { Reveal } from "../reveal";
import { IconBadge, ChefHatIcon, LeafIcon, HandshakeIcon } from "./icons";
import { GradientField } from "./GradientField";
import { UNORA } from "./theme";

// Real content from value-pillars.tsx (PILLARS) — reframed as excellence
// statements on a dark navy band, echoing the reference poster's closing
// icon strip. Only three items exist in the real site, so this stays a
// 3-up row rather than padding out to 5 with invented claims.
const PILLARS = [
  {
    eyebrow: "CSR",
    title: "A responsible kitchen",
    body: "We source close to season and cut avoidable waste — every choice measured against its impact on people and place.",
    href: "/responsibility",
    icon: <ChefHatIcon />,
  },
  {
    eyebrow: "Innovation",
    title: "Reinventing seasonal catering",
    body: "Menus rebuilt around the six ritu — our supply chain and service model adapt with what the market gives us each week.",
    href: "/#philosophy",
    icon: <LeafIcon />,
  },
  {
    eyebrow: "Candidates",
    title: "Join our kitchen",
    body: "One kitchen team that plans, cooks, and serves every event start to finish — no sub-contracted hands.",
    href: "/careers",
    icon: <HandshakeIcon />,
  },
];

export function UnoraExcellenceBand() {
  return (
    <section
      aria-labelledby="unora-excellence-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.navy }}
    >
      <GradientField colors={[UNORA.coral, UNORA.gold]} />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:py-14 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="unora-excellence-heading"
            className="font-display text-2xl leading-tight text-white sm:text-4xl"
          >
            We measure our meals by their impact on society, people, and the
            environment.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <a
                href={p.href}
                className="group flex h-full flex-col items-center rounded-3xl px-6 py-8 text-center transition-colors duration-300 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <IconBadge bg={UNORA.coral} size={64}>
                  {p.icon}
                </IconBadge>
                <p
                  className="mt-5 text-[11px] tracking-[0.16em]"
                  style={{ color: UNORA.gold }}
                >
                  {p.eyebrow}
                </p>
                <h3 className="font-display mt-2 text-lg text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {p.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] tracking-[0.12em] text-white/90">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
