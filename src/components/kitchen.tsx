"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";

// `portrait` is null until real photography exists — set it to a path
// under /public/team/ (e.g. "/team/asha-rao.webp") and ChefPortrait swaps
// from the monogram placeholder to the real photo automatically, no other
// changes needed.
const CHEFS: { name: string; role: string; portrait: string | null }[] = [
  { name: "Chef name", role: "Executive Chef", portrait: null },
  { name: "Chef name", role: "Head of Pastry", portrait: null },
  { name: "Chef name", role: "Tandoor Lead", portrait: null },
];

const DISHES = [
  { label: "Thali, plated", image: "/food/thali-platter.webp" },
  { label: "Herb & tomato pasta", image: "/food/tomato-basil-pasta.webp" },
  { label: "Rose lassi", image: "/food/rose-lassi.webp" },
  { label: "Green pea soup", image: "/food/green-pea-soup.webp" },
  { label: "Seasonal fruit", image: "/food/seasonal-fruit-plate.webp" },
  { label: "Berry smoothie", image: "/food/berry-smoothie.webp" },
];

const VIDEOS = [
  { title: "In the kitchen: prep for a 200-guest wedding", length: "2:14" },
  { title: "Tandoor course, start to finish", length: "1:40" },
];

export function Kitchen() {
  const [moodDish, ...stripDishes] = DISHES;
  const [photoA, photoB] = stripDishes;
  const restDishes = stripDishes.slice(2);

  return (
    <section id="kitchen" aria-labelledby="kitchen-heading" className="bg-washi-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-[13px] tracking-[0.25em] text-brand sm:mb-4">
            Our kitchen
          </p>
          <h2
            id="kitchen-heading"
            className="font-display text-2xl leading-tight text-ink sm:text-4xl"
          >
            The people and the plates.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft sm:mt-4">
            A look at the team and the plates — imagery here updates as we
            shoot with each new season.
          </p>
        </Reveal>

        {/* Chefs */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {CHEFS.map((chef, i) => (
            <Reveal key={i} delay={i * 90} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ink">
                {chef.portrait ? (
                  <Image
                    src={chef.portrait}
                    alt={chef.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <ChefMonogram label={chef.role} />
                )}
              </div>
              <p className="mt-3 text-lg text-ink">{chef.name}</p>
              <p className="text-[11px] tracking-[0.1em] text-nezumi">
                {chef.role}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Video placeholders */}
        <Reveal className="mt-10 sm:mt-14">
          <p className="mb-3 text-[11px] tracking-[0.14em] text-nezumi sm:mb-4">
            Kitchen films
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {VIDEOS.map((video, i) => (
              <VideoPlaceholder key={i} title={video.title} length={video.length} />
            ))}
          </div>
        </Reveal>

        {/* Plated — dark editorial spread: mood panel + stacked photos +
            vertical label, echoing a printed cuisine-page layout. Bleeds
            to the viewport edge on mobile via negative margin so the ink
            panel reads as a deliberate break from the paper sections
            around it, not another boxed card. */}
        <Reveal className="mt-10 sm:mt-14" delay={100}>
          <div className="-mx-5 md:mx-0">
            <div className="relative overflow-hidden bg-brand-deep px-5 py-10 sm:px-8 sm:py-14 md:rounded-sm md:px-10 md:py-16">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5">
                {/* Mood panel */}
                <div className="relative aspect-[4/5] overflow-hidden bg-washi/10 md:col-span-5 md:aspect-auto">
                  <Image
                    src={moodDish.image}
                    alt={moodDish.label}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <p className="max-w-[220px] text-sm leading-relaxed text-washi/90">
                      What we choose isn&rsquo;t just what&rsquo;s fresh — it&rsquo;s the
                      character of the ingredient itself.
                    </p>
                    <p className="max-w-[200px] text-xs leading-relaxed text-washi/60">
                      Season&rsquo;s close —
                      <br />
                      the plate remembers
                      <br />
                      what the market gave it.
                    </p>
                  </div>
                </div>

                {/* Stacked photos */}
                <div className="grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-1 md:gap-4">
                  {[photoA, photoB].map((dish) => (
                    <div
                      key={dish.label}
                      className="group relative aspect-square overflow-hidden bg-washi/10 md:aspect-[16/10]"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.label}
                        fill
                        sizes="(min-width: 768px) 34vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 py-2 text-[10px] tracking-[0.06em] text-washi">
                        {dish.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Vertical label */}
                <div className="hidden items-center justify-center md:col-span-2 md:flex">
                  <div className="flex flex-col items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl leading-none [writing-mode:vertical-rl]"
                      style={{ color: "var(--season-accent)" }}
                    >
                      प्लेटेड
                    </span>
                    <span className="text-sm tracking-[0.35em] text-washi/80 [writing-mode:vertical-rl]">
                      PLATED
                    </span>
                  </div>
                </div>
              </div>

              {/* Remaining dishes as a quiet strip beneath */}
              <div
                role="list"
                aria-label="More plated dishes"
                className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3"
              >
                {restDishes.map((dish) => (
                  <div
                    key={dish.label}
                    role="listitem"
                    className="group relative aspect-square overflow-hidden bg-washi/10"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.label}
                      fill
                      sizes="(min-width: 640px) 12vw, 25vw"
                      className="object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Editorial stand-in for a chef portrait: a season-tinted monogram on a
 * radial ink field, styled to read as a deliberate placeholder rather than
 * an unfinished dev asset. Swap for a real portrait by setting `portrait`
 * on the matching CHEFS entry — same aspect box, no other changes needed.
 */
function ChefMonogram({ label }: { label: string }) {
  const initials = label
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      style={{
        background:
          "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--season-accent) 20%, var(--sumi)) 0%, var(--sumi) 72%)",
      }}
    >
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full border text-xl tracking-wide text-washi sm:h-20 sm:w-20 sm:text-2xl"
        style={{ borderColor: "var(--season-accent)" }}
      >
        {initials}
      </span>
      <span
        aria-hidden="true"
        className="h-px w-8"
        style={{ background: "var(--season-accent)" }}
      />
      <span className="text-[10px] tracking-[0.18em] text-nezumi-light">
        Portrait coming soon
      </span>
    </div>
  );
}

function VideoPlaceholder({ title, length }: { title: string; length: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="border border-line bg-washi">
      <div className="relative aspect-video overflow-hidden border-b border-line bg-ink">
        {playing ? (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
          >
            <span className="text-[11px] tracking-[0.1em] text-washi">
              Footage forthcoming
            </span>
            <span className="text-[10px] text-nezumi-light">
              {title}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              aria-hidden="true"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--season-accent)"
              strokeWidth="1.3"
              opacity="0.55"
            >
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="M9.5 9l6 3-6 3V9z" fill="var(--season-accent)" stroke="none" />
            </svg>
          </div>
        )}

        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-pressed={playing}
          aria-label={playing ? `Pause: ${title}` : `Play: ${title}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-washi/90 text-ink transition-transform group-hover:scale-105">
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5l12 7-12 7V5z" />
              </svg>
            )}
          </span>
        </button>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm text-ink">{title}</p>
        <span className="text-[11px] text-nezumi">{length}</span>
      </div>
    </div>
  );
}
