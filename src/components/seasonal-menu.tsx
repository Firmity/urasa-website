"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { RituBadge } from "./ritu-badge";
import { useSeason } from "./app-provider";
import { RITUS, type Ritu } from "@/lib/season";
import { HeroScene } from "./hero-scene-lazy";
import { CtaButton } from "./cta-button";

// The six course stages are constant — what changes per ritu is which
// dish fills each stage. Keeping stage and dish separate means switching
// the ritu preview swaps the menu content without restructuring the list.
const COURSE_STAGES = [
  { n: "01", jp: "स्वागत", name: "Swagat", translation: "Welcome" },
  { n: "02", jp: "कचूंबर", name: "Kachumber", translation: "Raw salad" },
  { n: "03", jp: "सब्ज़ी", name: "Sabzi", translation: "Vegetable" },
  { n: "04", jp: "दाल-चावल", name: "Dal-Chawal", translation: "Lentils & rice" },
  { n: "05", jp: "तंदूर", name: "Tandoor", translation: "From the clay oven" },
  { n: "06", jp: "मिष्ठान", name: "Mishti", translation: "Something sweet" },
] as const;

// One photo per course stage, index-matched to COURSE_STAGES. These are
// the same six generic dish shots used elsewhere on the site (Kitchen's
// "Plated" grid) — reused here rather than sourcing 36 unique per-ritu
// photos, so the same photo appears in the same course slot regardless of
// which ritu is selected. The dish description below it still changes.
const COURSE_PHOTOS = [
  "/food/thali-platter.webp",
  "/food/tomato-basil-pasta.webp",
  "/food/rose-lassi.webp",
  "/food/green-pea-soup.webp",
  "/food/seasonal-fruit-plate.webp",
  "/food/berry-smoothie.webp",
];

// Illustrative only — six dishes per ritu, one per course stage above.
// Real event menus are tasted and confirmed before booking.
const DISHES_BY_RITU: Record<string, string[]> = {
  vasant: [
    "Fresh pea and mint shorba, finished with a curry leaf tempering.",
    "Shaved fennel, orange, and young spinach, citrus dressing.",
    "Stir-fried spring greens with garlic and dried red chilli.",
    "Moong dal with fresh dill, paired with jeera rice.",
    "Charred paneer tikka with a raw mango glaze.",
    "Gajar halwa, lightly spiced, served warm.",
  ],
  grishma: [
    "Chilled raw mango and buttermilk shorba, mustard tempering.",
    "Cucumber, mint, and pomegranate salad, black salt.",
    "Bhindi tossed with dried mango powder and kalonji.",
    "Chana dal with tamarind, paired with jeera rice.",
    "Tandoori prawns, yoghurt and kasuri methi marinade.",
    "Mango kulfi, cardamom-forward, lightly sweetened.",
  ],
  varsha: [
    "Hot tomato-dhania shorba with a tempered mustard finish.",
    "Roasted corn and raw papaya salad, lime.",
    "Monsoon greens sautéed with garlic.",
    "Masoor dal with ginger, paired with steamed rice.",
    "Malai chicken skewers, finished over live coals.",
    "Warm gulab jamun, served two to a bowl.",
  ],
  sharad: [
    "Roasted pumpkin and coconut shorba.",
    "Pomegranate, roasted beet, and walnut salad.",
    "Stuffed baby eggplant in a peanut-sesame masala.",
    "Toor dal, curry leaf tempering, paired with rice.",
    "Tandoori mushroom skewers, smoked chilli marinade.",
    "Til and jaggery ladoo, served warm.",
  ],
  hemant: [
    "Roasted beet and ginger shorba.",
    "Shredded carrot and radish salad, roasted peanuts.",
    "Sarson ka saag, a spoon of ghee.",
    "Urad dal, slow-cooked overnight, paired with rice.",
    "Tandoori leg of lamb, marinated twenty-four hours.",
    "Moong dal halwa, warm, ghee-rich.",
  ],
  shishir: [
    "Black pepper rasam, served piping hot.",
    "Citrus segments, roasted peanut, and chilli.",
    "Methi malai mutter, slow-cooked.",
    "Dal makhani, finished with a swirl of cream.",
    "Tandoori chicken, extra char, extra smoke.",
    "Moong dal halwa, ghee-rich, served warm.",
  ],
};

export function SeasonalMenu() {
  const { ritu, isPreview, previewRitu } = useSeason();
  const dishes = DISHES_BY_RITU[ritu.id] ?? DISHES_BY_RITU.vasant;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSelect = (id: string) => {
    previewRitu(id === ritu.id && isPreview ? null : id);
  };

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative overflow-hidden bg-washi-raised"
    >
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal className="max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 sm:mb-4">
            <p className="text-[13px] tracking-[0.25em] text-brand">
              A sample sequence
            </p>
            <RituBadge />
          </div>
          <h2
            id="menu-heading"
            className="font-display text-2xl leading-tight text-ink sm:text-4xl"
          >
            Six courses, shaped by {ritu.label}.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:mt-4">
            Ritu is the older, more specific idea of season this menu is
            built around — six roughly two-month windows tracked by what's
            actually happening at the market, rather than the four
            calendar seasons. Each ritu has its own temperature, its own
            produce, and its own cooking instinct: what you'd want to eat
            in {ritu.label} isn't what you'd want two months from now.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Every Urasa menu follows this general progression, rebuilt
            around whichever ritu is active. This sequence is illustrative
            — your event menu is tasted and confirmed before booking.
          </p>
        </Reveal>

        {/* ---------------- Mobile (unchanged layout): capsule row + plain list ---------------- */}
        <div className="md:hidden">
          <Reveal className="mt-6 sm:mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] tracking-[0.14em] text-nezumi">
                Preview a ritu
              </p>
              {isPreview && (
                <button
                  type="button"
                  onClick={() => previewRitu(null)}
                  className="text-[11px] tracking-[0.1em] text-brand"
                >
                  Reset to today
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {RITUS.map((r) => {
                const selected = r.id === ritu.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelect(r.id)}
                    aria-current={selected ? "true" : undefined}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      selected
                        ? "border-brand bg-brand/5 text-ink"
                        : "border-line text-ink-soft hover:border-brand"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full"
                      style={{ background: r.accent }}
                    />
                    {r.label}
                    <span className="text-[10px] text-nezumi">{r.months}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <ol className="mt-8 divide-y divide-line border-y border-line">
            {COURSE_STAGES.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 60}>
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="flex w-full items-start justify-between gap-4 py-4 text-left transition-opacity hover:opacity-70"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs text-nezumi">{stage.n}</span>
                      <div>
                        <h3 className="font-display text-lg text-ink">{stage.name}</h3>
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">
                          {dishes[i]}
                        </p>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg leading-tight text-brand"
                    >
                      {stage.jp}
                    </span>
                  </button>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------------- Desktop: ritu timeline + colored menu panel ---------------- */}
        <div className="mt-10 hidden md:grid md:grid-cols-[220px_1fr] md:gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          <Reveal>
            <RituTimeline
              ritu={ritu}
              isPreview={isPreview}
              onSelect={handleSelect}
              onReset={() => previewRitu(null)}
            />
          </Reveal>
          <Reveal delay={80}>
            <MenuSpread ritu={ritu} dishes={dishes} onOpenDish={setOpenIndex} />
          </Reveal>
        </div>
      </div>

      {/* Decorative bowl, moved here from the hero — quiet corner detail,
          tinted to the active/previewed ritu. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 hidden h-56 w-56 sm:block md:h-72 md:w-72"
      >
        <HeroScene />
      </div>

      {openIndex !== null && (
        <MenuItemModal
          stage={COURSE_STAGES[openIndex]}
          photo={COURSE_PHOTOS[openIndex]}
          description={dishes[openIndex]}
          ritu={ritu}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

/**
 * Left-hand vertical timeline of the six ritu — a spine (border-l) with a
 * dot per ritu. Selecting one calls onSelect, which re-tints the whole
 * site AND swaps the menu panel beside it, so cause and effect are visible
 * in the same glance. Desktop-only companion to the mobile capsule row.
 */
function RituTimeline({
  ritu,
  isPreview,
  onSelect,
  onReset,
}: {
  ritu: Ritu;
  isPreview: boolean;
  onSelect: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-2">
        <p className="text-[11px] tracking-[0.14em] text-nezumi">
          Preview a ritu
        </p>
        {isPreview && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] tracking-[0.1em] text-brand"
          >
            Reset
          </button>
        )}
      </div>

      <ol className="relative border-l border-line pl-6">
        {RITUS.map((r) => {
          const selected = r.id === ritu.id;
          return (
            <li key={r.id} className="relative pb-7 last:pb-0">
              <button
                type="button"
                onClick={() => onSelect(r.id)}
                aria-current={selected ? "true" : undefined}
                className="group flex flex-col items-start text-left"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-0.5 h-3 w-3 rounded-full border-2 transition-transform duration-300 ease-out"
                  style={{
                    borderColor: r.accent,
                    background: selected ? r.accent : "var(--washi-raised)",
                    transform: selected ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span
                  className={`text-sm transition-colors duration-200 ${
                    selected ? "text-ink" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {r.label}
                </span>
                <span className="text-[10px] tracking-[0.08em] text-nezumi">
                  {r.months}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// The six courses split into a two-page spread — left page is the
// lighter opening courses, right page is the heartier back half. Fixed
// grouping (not derived) since the "page" concept only makes sense for
// exactly these six roles.
const PAGE_GROUPS = [
  { indices: [0, 1, 2] as const, mark: "आरंभ", label: "To begin" },
  { indices: [3, 4, 5] as const, mark: "मुख्य", label: "Mains & sweets" },
];

// Three bubble diameters, reused per page in the same order, so both
// pages get the same organic big/small/medium rhythm as the reference
// menu spread rather than a uniform grid of identical thumbnails.
const BUBBLE_SIZES = [
  "h-24 w-24 sm:h-28 sm:w-28",
  "h-20 w-20 sm:h-24 sm:w-24",
  "h-[5.5rem] w-[5.5rem] sm:h-[6.5rem] sm:w-[6.5rem]",
];

/**
 * Two-page menu spread — a book-style layout with a subtle solid center
 * gutter, bilingual category headers per page, and circular dish photos
 * (consistent photo-left/text-right on every row — an earlier alternating
 * layout pushed text toward the outer page edges and clipped it).
 * Background is the ritu accent darkened toward ink via color-mix so
 * washi text stays WCAG-legible on every ritu, including the lighter
 * ones (vasant, grishma) where the raw accent alone dips under 3:1. The
 * inner content remounts on ritu change (key={ritu.id}) to replay the
 * .menu-fade crossfade for text/photos; the background-color itself
 * transitions natively since var(--season-accent) is read through a CSS
 * transition.
 */
function MenuSpread({
  ritu,
  dishes,
  onOpenDish,
}: {
  ritu: Ritu;
  dishes: string[];
  onOpenDish: (index: number) => void;
}) {
  return (
    <div
      className="overflow-hidden rounded-sm transition-colors duration-500 ease-out"
      style={{
        background:
          "color-mix(in srgb, var(--season-accent) 60%, var(--sumi) 40%)",
      }}
    >
      <div key={ritu.id} className="menu-fade">
        <div className="flex items-baseline justify-between gap-3 border-b border-washi/20 px-6 py-4 sm:px-8">
          <h3 className="font-display text-xl text-washi sm:text-2xl">
            {ritu.label}
          </h3>
          <span className="text-[11px] tracking-[0.14em] text-washi/70">
            {ritu.months}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {PAGE_GROUPS.map((group, gi) => (
            <div
              key={group.mark}
              className={`relative border border-washi/10 px-6 py-8 sm:px-8 sm:py-10 ${
                gi === 0 ? "sm:border-r-washi/20" : ""
              }`}
            >
              <div className="mb-6 flex items-center gap-2">
                <span aria-hidden="true" className="font-display text-lg text-washi">
                  {group.mark}
                </span>
                <span className="text-[10px] tracking-[0.18em] text-washi/70">
                  {group.label.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col gap-7">
                {group.indices.map((i, pos) => {
                  const stage = COURSE_STAGES[i];
                  return (
                    <button
                      key={stage.n}
                      type="button"
                      onClick={() => onOpenDish(i)}
                      className="group flex w-full items-center gap-4 text-left transition-opacity hover:opacity-85"
                    >
                      <div
                        className={`relative shrink-0 overflow-hidden rounded-full border border-washi/25 bg-washi/10 ${BUBBLE_SIZES[pos]}`}
                      >
                        <Image
                          src={COURSE_PHOTOS[i]}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      <span
                        aria-hidden="true"
                        className="hidden h-px w-8 shrink-0 border-t border-washi/35 sm:block lg:w-10"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <h4 className="break-words font-display text-base text-washi sm:text-lg">
                            {stage.name}
                          </h4>
                          <span aria-hidden="true" className="shrink-0 text-sm text-washi/70">
                            {stage.jp}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-snug text-washi/75 sm:text-[13px]">
                          {dishes[i]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-8 text-center text-[10px] tracking-[0.3em] text-washi/40">
                — {gi === 0 ? "01" : "02"} —
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Dish detail popup — photo pane (with the mark overlaid top-left and a
 * vertical "ENQUIRE" tab along the edge) beside a cream text pane with the
 * course name, its Devanagari mark, translation, and description. Closes
 * on Escape, backdrop click, or the close button.
 */
function MenuItemModal({
  stage,
  photo,
  description,
  ritu,
  onClose,
}: {
  stage: (typeof COURSE_STAGES)[number];
  photo: string;
  description: string;
  ritu: Ritu;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-item-heading"
      className="menu-fade fixed inset-0 z-[60] grid grid-cols-1 overflow-y-auto bg-washi sm:grid-cols-2"
    >
      {/* Photo pane — fills the full left half of the viewport */}
      <div className="relative h-72 bg-ink sm:h-full">
        <Image
          src={photo}
          alt={stage.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute left-6 top-6 flex items-center gap-2 text-washi sm:left-10 sm:top-10">
          <span className="font-display text-2xl leading-none">उरसा</span>
          <span className="text-[10px] tracking-[0.25em] text-washi/80">
            URASA
          </span>
        </div>
        <a
          href="/enquire"
          className="absolute bottom-6 left-6 text-[11px] tracking-[0.35em] text-washi/85 sm:bottom-10 sm:left-10 [writing-mode:vertical-rl]"
        >
          ENQUIRE
        </a>
      </div>

      {/* Detail pane — fills the full right half of the viewport */}
      <div className="relative flex min-h-[50vh] flex-col justify-center gap-6 px-6 py-14 sm:h-full sm:px-12 sm:py-10 md:px-20 lg:px-28">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand sm:right-10 sm:top-10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div>
          <p className="text-[11px] tracking-[0.14em] text-nezumi">
            Course {stage.n} · {stage.jp} · {stage.translation}
          </p>
          <h3 id="menu-item-heading" className="font-display mt-2 text-4xl text-ink sm:text-5xl">
            {stage.name}
          </h3>
        </div>

        <p className="max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>

        <div className="flex items-center gap-2 border-t border-line pt-5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--season-accent)" }}
          />
          <span className="text-[11px] tracking-[0.1em] text-nezumi">
            From the {ritu.label} sequence · {ritu.months}
          </span>
        </div>

        <CtaButton href="/enquire" className="mt-2 w-fit">
          Enquire about this menu
        </CtaButton>
      </div>
    </div>
  );
}
