import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { CtaButton } from "@/components/cta-button";
import { JsonLd } from "@/components/json-ld";
import { aboutSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Urasa — Driven by Ritu, Santulan & Nishtha",
  description:
    "Discover Urasa's philosophy. Built on three core principles: Ritu (seasonal cooking), Santulan (balanced plates), and Nishtha (one dedicated kitchen team).",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: "About Urasa — We Care About Warmth",
    description:
      "Learn how our single kitchen team plans, cooks, and serves seasonal menus with care and balance.",
    images: ["/food/thali-platter.webp"],
  },
};

const BRAND_MOCKUPS = [
  { src: "/mockups/signage-storefront.webp", alt: "Urasa signage above a storefront" },
  { src: "/mockups/takeaway-bag.webp", alt: "Urasa branded takeaway bag on a table" },
  { src: "/mockups/apron-service.webp", alt: "Kitchen apron with the Urasa mark" },
  { src: "/mockups/chafing-dish.webp", alt: "Catering chafing dish with the Urasa mark" },
  { src: "/mockups/delivery-van.webp", alt: "Urasa delivery van" },
  { src: "/mockups/bag-and-containers.webp", alt: "Urasa takeaway bag and food containers" },
  { src: "/mockups/business-card.webp", alt: "Urasa catering services business card" },
  { src: "/mockups/takeaway-tub.webp", alt: "Urasa branded takeaway tub" },
  { src: "/mockups/apron-flatlay.webp", alt: "Urasa apron laid flat beside kitchen tools" },
  { src: "/mockups/signage-angle.webp", alt: "Urasa storefront signage, side angle" },
  { src: "/mockups/logo-print.webp", alt: "Urasa logo printed on paper" },
  { src: "/mockups/chef-jacket.webp", alt: "Urasa mark embroidered on a chef's jacket" },
  { src: "/mockups/app-icon-phone.webp", alt: "Urasa app icon on a phone home screen" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema()} />
      {/* Full-bleed overview cover: light washi ground (no black panel)
          with a decorative concentric-ring pattern tinted to the live
          ritu, and the Urasa mark blown up to real scale inside a soft
          glowing radial disc — the page's opening statement, not a
          strip. (The crane artwork lives in the Studio section below
          instead, behind a washi wash.) */}
      <section
        aria-labelledby="overview-heading"
        className="relative overflow-hidden bg-washi"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 42%, var(--season-accent) 0px, var(--season-accent) 1.5px, transparent 1.5px, transparent 28px)",
          }}
        />

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col items-center justify-center px-6 py-20 sm:min-h-[85vh] sm:py-28">
          <div className="absolute left-6 top-6 flex items-center gap-2 text-ink sm:left-10 sm:top-10">
            <span className="font-display text-xl leading-none">यूरासा</span>
            <span className="text-[10px] tracking-[0.25em] text-nezumi">
              URASA
            </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute right-6 top-10 hidden text-xs tracking-[0.35em] text-nezumi sm:right-10 sm:block [writing-mode:vertical-rl]"
          >
            यूरासा · अवलोकन
          </span>

          <Reveal className="relative flex flex-col items-center">
            {/* Soft glowing radial disc — a blurred outer halo plus a
                tighter inner gradient, instead of a flat-filled circle.
                The logo mark sits on this colored disc, not directly on
                the page background, so it stays high-contrast regardless
                of the section's own bg color. */}
            <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[380px] sm:w-[380px] md:h-[440px] md:w-[440px]">
              <div
                aria-hidden="true"
                className="absolute inset-[-15%] rounded-full blur-3xl transition-colors duration-500 ease-out"
                style={{
                  background:
                    "radial-gradient(circle, var(--season-accent) 0%, transparent 68%)",
                  opacity: 0.55,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full transition-colors duration-500 ease-out"
                style={{
                  background:
                    "radial-gradient(circle at 42% 38%, color-mix(in srgb, var(--season-accent) 70%, white 30%) 0%, var(--season-accent) 55%, color-mix(in srgb, var(--season-accent) 40%, transparent) 78%, transparent 100%)",
                }}
              />
              <Image
                src="/logo-mark.webp"
                alt="Urasa mark"
                width={224}
                height={213}
                className="relative h-[62%] w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                style={{ filter: "brightness(0) invert(1)" }}
                unoptimized
                priority
              />
            </div>

            <h1
              id="overview-heading"
              className="font-display mt-10 text-center text-3xl leading-tight text-ink sm:text-5xl"
            >
              यूरासा · Urasa
            </h1>
            <p className="mt-2 text-center text-sm tracking-[0.14em] text-nezumi">
              We care about warmth
            </p>
          </Reveal>
        </div>

        <div className="relative border-t border-line py-5">
          <p className="text-center text-[11px] tracking-[0.4em] text-nezumi">
            OVERVIEW · अवलोकन
          </p>
        </div>
      </section>

      {/* Overview detail — the story on the left, the numbers on the
          right, on the site's usual light paper so the dark cover above
          reads as a deliberate break, not the whole page's tone. The
          crane artwork sits behind everything here as a faint watermark,
          washed with washi rather than shown at full strength, so the
          existing dark-ink text stays legible without any color changes. */}
      <section
        aria-labelledby="overview-detail-heading"
        className="relative overflow-hidden bg-washi"
      >
        <Image
          src="/background_cranes.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-washi/88" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-nezumi">THE STUDIO</p>
            <h2
              id="overview-detail-heading"
              className="font-display mt-3 text-2xl leading-tight text-ink sm:text-3xl"
            >
              One kitchen, every occasion.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              Urasa is a seasonal, ingredient-first catering house built on
              one kitchen team, from the first tasting to the last course.
              We started from a frustration with catering as usual — menus
              frozen months in advance, &ldquo;seasonal&rdquo; used as
              decoration rather than a real constraint. Every menu here
              only exists because of what the market has that week.
            </p>
            <CtaButton href="/enquire" className="mt-6 w-fit">
              Request a tasting
            </CtaButton>
          </Reveal>

          <Reveal delay={100} className="grid grid-cols-2 gap-x-6 gap-y-8">
            <MetaRow label="CLIENT" lines={["Urasa · यूरासा"]} />
            <MetaRow
              label="SERVICES"
              lines={[
                "Corporate catering",
                "Weddings & private events",
                "Kitchen staffing",
              ]}
            />
            <div>
              <p className="text-[11px] tracking-[0.2em] text-nezumi">
                FOOTPRINT
              </p>
              <p className="mt-1.5 text-lg text-ink">
                <CountUp to={6} /> cities
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-nezumi">
                SCALE
              </p>
              <p className="mt-1.5 text-lg text-ink">
                10–<CountUp to={800} /> guests
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand mockups, cropped from the identity sheet — signage,
          packaging, apron, van. Same mark, every touchpoint. */}
      <section aria-labelledby="brand-heading" className="bg-washi-raised">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8 md:py-24">
          <Reveal className="max-w-2xl">
            <p className="mb-3 text-[13px] tracking-[0.25em] text-brand sm:mb-4">
              Seen everywhere we show up
            </p>
            <h2 id="brand-heading" className="font-display text-2xl leading-tight text-ink sm:text-4xl">
              One mark, every touchpoint.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              From the signage over the kitchen door to the tub that leaves
              it — the same mark, the same warmth.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {BRAND_MOCKUPS.map((m, i) => (
              <Reveal key={m.src} delay={(i % 4) * 60}>
                <div className="group relative aspect-square overflow-hidden border border-line">
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 768px) 22vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta-heading" className="bg-washi">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:py-20 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-xl">
            <h2 id="about-cta-heading" className="font-display text-2xl text-ink sm:text-3xl">
              Planning something and want to talk it through?
            </h2>
            <div className="mt-6 flex justify-center">
              <CtaButton href="/enquire">Request a tasting</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function MetaRow({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] text-nezumi">{label}</p>
      <div className="mt-1.5 space-y-0.5">
        {lines.map((line) => (
          <p key={line} className="text-sm text-ink sm:text-base">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
