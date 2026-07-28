import { Reveal } from "../reveal";
import { IconBadge, LeafIcon, ScaleIcon, ShieldCheckIcon } from "./icons";
import { GradientField } from "./GradientField";
import { UNORA } from "./theme";

const PRINCIPLES = [
  {
    id: "ritu",
    mark: "ऋतु",
    title: "Ritu",
    subtitle: "Cook with the season",
    body: "Our menus rotate with the six ritu, not a fixed calendar.",
    icon: <LeafIcon />,
    bg: UNORA.olive,
  },
  {
    id: "santulan",
    mark: "संतुलन",
    title: "Santulan",
    subtitle: "Balance on the plate",
    body: "Grains, protein, and vegetables, built for flavour and nutrition together.",
    icon: <ScaleIcon />,
    bg: UNORA.gold,
  },
  {
    id: "nishtha",
    mark: "निष्ठा",
    title: "Nishtha",
    subtitle: "One kitchen, start to finish",
    body: "The chefs who plan your menu are the chefs who cook it on the day.",
    icon: <ShieldCheckIcon />,
    bg: UNORA.coral,
  },
];

/** Three principle cards as icon badges, reskinning philosophy.tsx's copy. */
export function UnoraPhilosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="unora-philosophy-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.cream }}
    >
      <GradientField colors={[UNORA.olive, UNORA.gold, UNORA.coral]} />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:py-14 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-[12px] font-semibold tracking-[0.28em]"
            style={{ color: UNORA.coralDeep }}
          >
            PHILOSOPHY
          </p>
          <h2
            id="unora-philosophy-heading"
            className="font-display text-2xl leading-tight sm:text-4xl"
            style={{ color: UNORA.navy }}
          >
            Three principles govern every table we set.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div
                className="flex h-full flex-col items-center rounded-3xl px-6 py-10 text-center"
                style={{ background: UNORA.creamRaised }}
              >
                <IconBadge bg={p.bg} size={80}>
                  {p.icon}
                </IconBadge>
                <span
                  className="font-display mt-5 text-2xl leading-none"
                  style={{ color: UNORA.navy }}
                >
                  {p.mark}
                </span>
                <h3
                  className="font-display mt-2 text-xl"
                  style={{ color: UNORA.navy }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-1 text-[11px] tracking-[0.08em]"
                  style={{ color: UNORA.coralDeep }}
                >
                  {p.subtitle}
                </p>
                <p
                  className="mt-3 max-w-[16rem] text-sm leading-relaxed"
                  style={{ color: UNORA.inkSoft }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
