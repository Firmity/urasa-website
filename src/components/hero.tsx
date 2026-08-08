import { CountUp } from "./count-up";
import { CtaButton } from "./cta-button";
import { BorderStrip } from "./border-strip";
import { HeroSlideshow } from "./hero-slideshow";
import {
  STAT_CITIES,
  STAT_EVENTS_CATERED,
  STAT_MAX_GUESTS,
  STAT_MIN_GUESTS,
} from "@/lib/stats";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Introduction"
    >
      {/* Full-width backdrop: the food collage, softened and gradient-masked
          so the hero copy stays WCAG-legible over it at every breakpoint. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-gradient-to-r from-washi via-washi/92 to-washi/70" />
        <div className="absolute inset-0 bg-washi/30" />
      </div>

      <BorderStrip />

      <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 pb-10 pt-8 sm:pb-14 sm:pt-10 md:grid-cols-[auto_1fr] md:gap-10 md:px-8 md:pb-16 md:pt-14">
        {/* vertical wayfinding rule */}
        <div className="mb-8 hidden md:mb-0 md:flex md:flex-col md:items-center md:gap-4">
          <span className="h-24 w-px bg-line" aria-hidden="true" />
          <span className="text-[11px] tracking-[0.3em] text-nezumi [writing-mode:vertical-rl]">
            WE CARE ABOUT WARMTH
          </span>
          <span className="h-24 w-px bg-line" aria-hidden="true" />
        </div>

        <div>
          <p className="mb-3 text-[13px] tracking-[0.25em] text-brand sm:mb-5">
            Catering for occasions of consequence
          </p>
          <h1 className="font-display max-w-3xl text-[2.1rem] leading-[1.1] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Seasonal Indian
            <br />
            cooking, plated with care.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-lg">
            Urasa brings a healthy, ingredient-first kitchen to corporate
            events, weddings, and private functions — menus built around
            what&rsquo;s genuinely in season, cooked by chefs who travel
            with your event.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <CtaButton href="/enquire">Request a tasting</CtaButton>
            <a
              href="#menu"
              className="brush-underline inline-flex items-center justify-center px-1 py-3.5 text-[13px] tracking-[0.14em] text-ink-soft sm:py-4"
            >
              See a sample menu
            </a>
          </div>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6 sm:mt-16 sm:gap-6 sm:pt-8">
            <div>
              <dt className="text-[10px] tracking-[0.1em] text-nezumi sm:text-[11px] sm:tracking-[0.14em]">
                Events served
              </dt>
              <dd className="mt-1 text-2xl text-ink sm:text-3xl">
                <CountUp to={STAT_EVENTS_CATERED} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.1em] text-nezumi sm:text-[11px] sm:tracking-[0.14em]">
                Guest capacity
              </dt>
              <dd className="mt-1 text-2xl text-ink sm:text-3xl">
                {STAT_MIN_GUESTS}–<CountUp to={STAT_MAX_GUESTS} />
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.1em] text-nezumi sm:text-[11px] sm:tracking-[0.14em]">
                Cities
              </dt>
              <dd className="mt-1 text-2xl text-ink sm:text-3xl">
                <CountUp to={STAT_CITIES} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <BorderStrip />
    </section>
  );
}
