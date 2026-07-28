import Image from "next/image";
import { Reveal } from "../reveal";
import { UNORA } from "./theme";

// Same data shape as kitchen.tsx's CHEFS/DISHES — simplified highlight only
// (full carousel/video section stays in the classic theme).
const CHEFS: { name: string; role: string }[] = [
  { name: "Chef name", role: "Executive Chef" },
  { name: "Chef name", role: "Head of Pastry" },
  { name: "Chef name", role: "Tandoor Lead" },
];

const DISHES = [
  { label: "Thali, plated", image: "/food/thali-platter.webp" },
  { label: "Herb & tomato pasta", image: "/food/tomato-basil-pasta.webp" },
  { label: "Rose lassi", image: "/food/rose-lassi.webp" },
  { label: "Seasonal fruit", image: "/food/seasonal-fruit-plate.webp" },
];

export function UnoraKitchen() {
  return (
    <section
      id="kitchen"
      aria-labelledby="unora-kitchen-heading"
      style={{ background: UNORA.cream }}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <p
            className="mb-3 text-[12px] font-semibold tracking-[0.28em]"
            style={{ color: UNORA.coralDeep }}
          >
            OUR KITCHEN
          </p>
          <h2
            id="unora-kitchen-heading"
            className="font-display text-2xl leading-tight sm:text-4xl"
            style={{ color: UNORA.navy }}
          >
            The people and the plates.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
          {CHEFS.map((chef, i) => (
            <Reveal key={chef.role} delay={i * 90}>
              <div
                className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-3xl text-center"
                style={{ background: UNORA.navy }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-lg text-white sm:h-16 sm:w-16"
                  style={{ border: `1.5px solid ${UNORA.gold}` }}
                >
                  {chef.role
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <p className="px-2 text-[11px] tracking-[0.08em] text-white/70">
                  {chef.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4">
          {DISHES.map((dish, i) => (
            <Reveal key={dish.label} delay={i * 70}>
              <div className="group relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={dish.image}
                  alt={dish.label}
                  fill
                  sizes="(min-width: 640px) 22vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
