import Image from "next/image";
import { Reveal } from "./reveal";
import { RituBadge } from "./ritu-badge";

const PRINCIPLES = [
  {
    id: "ritu",
    mark: "ऋतु",
    title: "Ritu",
    subtitle: "Cook with the season",
    body: "Our menus rotate with the six ritu, not a fixed calendar.",
    photo: "/food/thali-platter.webp",
    // Darkened toward ink so washi text stays WCAG-legible over every
    // ritu accent, including the lightest ones (vasant, grishma) — the
    // raw accent alone dips as low as ~2.9:1 contrast for small text.
    tint: "color-mix(in srgb, var(--season-accent) 62%, var(--sumi) 38%)",
    showRituBadge: true,
  },
  {
    id: "santulan",
    mark: "संतुलन",
    title: "Santulan",
    subtitle: "Balance on the plate",
    body: "Grains, protein, and vegetables, built for flavour and nutrition together.",
    photo: "/food/rainbow-bowl.webp",
    tint: "color-mix(in srgb, var(--kin) 60%, var(--sumi) 40%)",
    showRituBadge: false,
  },
  {
    id: "nishtha",
    mark: "निष्ठा",
    title: "Nishtha",
    subtitle: "One kitchen, start to finish",
    body: "The chefs who plan your menu are the chefs who cook it on the day.",
    photo: "/food/herbed-kebab-plate.webp",
    tint: "var(--sumi)",
    showRituBadge: false,
  },
];

/**
 * The three principles as compact square photo cards — a real dish photo
 * under a color tint (mix-blend-mode: color, so the principle's tone
 * still reads without hiding the photo entirely), the Devanagari mark
 * top-left, and the title/body on a dark gradient scrim at the bottom.
 * Section background stays the light washi-raised it always was.
 */
export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-washi-raised"
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14 md:px-8 md:py-16">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-[13px] tracking-[0.25em] text-brand sm:mb-4">
            Philosophy
          </p>
          <h2
            id="philosophy-heading"
            className="font-display text-2xl leading-tight text-ink sm:text-4xl"
          >
            Three principles govern{" "}
            <span
              className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, var(--season-accent) 38%, transparent 38%)",
                mixBlendMode: "multiply",
              }}
            >
              every table we set
            </span>
            .
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className="group relative aspect-square overflow-hidden rounded-sm border border-line">
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-80 transition-opacity duration-500 ease-out group-hover:opacity-45"
                  style={{ background: p.tint, mixBlendMode: "color" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                />

                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl leading-none text-washi sm:text-3xl"
                  >
                    {p.mark}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-washi sm:text-xl">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-washi/75">{p.subtitle}</p>
                    <p className="mt-1.5 text-[12px] leading-snug text-washi/85">
                      {p.body}
                    </p>
                    {p.showRituBadge && <RituBadge className="mt-2" />}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
