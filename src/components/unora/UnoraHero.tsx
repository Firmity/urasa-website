import Image from "next/image";
import { Reveal } from "../reveal";
import { CountUp } from "../count-up";
import { UnoraButton } from "./button";
import { UNORA } from "./theme";

/**
 * Hero — logo lockup, tagline, photo collage, circular trust-badge callout.
 * Real Urasa copy/stats (see about/page.tsx), new coral/navy/gold visual
 * language only. Decorative blobs use local UNORA constants, not
 * --season-accent, so this section reads the same regardless of ritu.
 */
export function UnoraHero() {
  return (
    <section
      aria-labelledby="unora-hero-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.cream }}
    >
      {/* Decorative color blobs — slowly drifting (see unora-drift-* in
          globals.css), not static, so the hero has the same ambient
          motion as the rest of the Unora page. */}
      <div
        aria-hidden="true"
        className="unora-drift-1 pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-2xl"
        style={{ background: UNORA.gold }}
      />
      <div
        aria-hidden="true"
        className="unora-drift-2 pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{ background: UNORA.olive }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-10 sm:py-14 md:grid-cols-2 md:items-center md:gap-8 md:px-8 md:py-16">
        <Reveal>
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: UNORA.coral }}
            />
            <p
              className="text-[12px] font-semibold tracking-[0.28em]"
              style={{ color: UNORA.coralDeep }}
            >
              WE CARE ABOUT WARMTH
            </p>
          </div>

          <h1
            id="unora-hero-heading"
            className="font-display mt-5 text-4xl leading-[1.08] sm:text-6xl"
            style={{ color: UNORA.navy }}
          >
            यूरासा · Urasa
          </h1>
          <p
            className="mt-5 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: UNORA.inkSoft }}
          >
            A seasonal, ingredient-first catering house — one kitchen team,
            from the first tasting to the last course, built around what the
            market actually has that week.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <UnoraButton href="/enquire">Request a tasting</UnoraButton>
            <UnoraButton href="/services" variant="outline">
              Our services
            </UnoraButton>
          </div>

          <div className="mt-10 flex gap-8 border-t pt-6" style={{ borderColor: "rgba(22,59,77,0.14)" }}>
            <div>
              <p className="font-display text-2xl" style={{ color: UNORA.navy }}>
                <CountUp to={6} /> cities
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em]" style={{ color: UNORA.inkSoft }}>
                FOOTPRINT
              </p>
            </div>
            <div>
              <p className="font-display text-2xl" style={{ color: UNORA.navy }}>
                10–<CountUp to={800} /> guests
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em]" style={{ color: UNORA.inkSoft }}>
                SCALE
              </p>
            </div>
          </div>
        </Reveal>

        {/* Photo collage + circular trust badge */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image
                src="/food/thali-platter.webp"
                alt="Thali, plated"
                fill
                sizes="(min-width: 768px) 24vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image
                src="/food/rainbow-bowl.webp"
                alt="Seasonal rainbow bowl"
                fill
                sizes="(min-width: 768px) 24vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image
                src="/food/herbed-kebab-plate.webp"
                alt="Herbed kebab plate"
                fill
                sizes="(min-width: 768px) 24vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image
                src="/food/tomato-basil-pasta.webp"
                alt="Herb & tomato pasta"
                fill
                sizes="(min-width: 768px) 24vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Circular trust badge, overlapping the collage like the
              reference poster's seal. */}
          <div
            className="absolute -left-4 top-1/2 flex h-28 w-28 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center shadow-xl sm:h-36 sm:w-36"
            style={{ background: UNORA.navy, color: "#FFFFFF" }}
          >
            <span className="font-display text-xl sm:text-2xl">1</span>
            <span className="mt-0.5 max-w-[80px] text-[9px] leading-tight tracking-[0.08em] sm:text-[10px]">
              KITCHEN, EVERY OCCASION
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
