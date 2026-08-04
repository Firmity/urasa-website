"use client";

import Image from "next/image";
import { Reveal } from "../reveal";
import { useSeason } from "../app-provider";
import { RITUS } from "@/lib/season";
import { COURSE_STAGES, MENU_PAGE_GROUPS, getDishesForRitu } from "@/lib/menu";
import { UnoraButton } from "./button";
import { GradientField } from "./GradientField";
import { UNORA } from "./theme";

/**
 * Seasonal menu, reskinned as a restaurant menu card: two juxtaposed
 * oversized serif category words (thin + bold, coral), a textured photo,
 * and dotted-leader item rows — course number stands in for a price since
 * Urasa doesn't sell an à la carte list. Course stages + per-ritu dishes
 * come from lib/menu.ts (shared with the classic theme and the home
 * page's Menu JSON-LD), so all three can never disagree. Ritu chip row
 * still drives which ritu's dishes are shown, reusing useSeason() from
 * the classic site.
 */
export function UnoraMenu() {
  const { ritu } = useSeason();
  const dishes = getDishesForRitu(ritu);

  return (
    <section
      id="menu"
      aria-labelledby="unora-menu-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.cream }}
    >
      <GradientField colors={[UNORA.gold, UNORA.olive]} />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:py-14 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-[12px] font-semibold tracking-[0.28em]"
            style={{ color: UNORA.coralDeep }}
          >
            SEASONAL MENU
          </p>
          <h2
            id="unora-menu-heading"
            className="font-display text-2xl leading-tight sm:text-4xl"
            style={{ color: UNORA.navy }}
          >
            Right now, we&rsquo;re cooking for {ritu.label}.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div
            className="flex flex-wrap items-center justify-center gap-2 rounded-full p-2"
            style={{ background: UNORA.creamRaised }}
          >
            {RITUS.map((r) => {
              const active = r.id === ritu.id;
              return (
                <span
                  key={r.id}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] tracking-[0.06em] transition-colors"
                  style={{
                    background: active ? r.accent : "transparent",
                    color: active ? "#FFFFFF" : UNORA.inkSoft,
                  }}
                >
                  <span className="font-display">{r.jp}</span>
                  {r.label}
                </span>
              );
            })}
          </div>
        </Reveal>

        {/* Menu card */}
        <Reveal delay={140} className="mt-14 sm:mt-16">
          <div
            key={ritu.id}
            className="menu-fade overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14"
            style={{ background: UNORA.creamRaised }}
          >
            <p
              className="mb-2 text-[11px] tracking-[0.3em]"
              style={{ color: UNORA.inkSoft }}
            >
              {ritu.label.toUpperCase()} · {ritu.months.toUpperCase()}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3
                className="font-display font-normal leading-none text-5xl sm:text-7xl"
                style={{ color: UNORA.coral }}
              >
                {MENU_PAGE_GROUPS[0].label}
              </h3>
              <h3
                className="font-display font-bold leading-none text-5xl sm:text-7xl"
                style={{ color: UNORA.coralDeep }}
              >
                {MENU_PAGE_GROUPS[1].label}
              </h3>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr_1fr] md:gap-10">
              <div className="relative hidden overflow-hidden rounded-3xl md:block">
                <Image
                  src="/food/chana-masala.webp"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: ritu.accent, opacity: 0.22, mixBlendMode: "color" }}
                />
              </div>

              {MENU_PAGE_GROUPS.map((group) => (
                <div key={group.mark}>
                  <div className="mb-6 flex items-center gap-2">
                    <span
                      className="font-display text-lg"
                      style={{ color: UNORA.navy }}
                    >
                      {group.mark}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.18em]"
                      style={{ color: UNORA.inkSoft }}
                    >
                      {group.label.toUpperCase()}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-6">
                    {group.indices.map((i) => {
                      const stage = COURSE_STAGES[i];
                      return (
                        <li key={stage.n}>
                          <div className="flex items-baseline gap-2">
                            <h4
                              className="font-display shrink-0 text-lg"
                              style={{ color: UNORA.navy }}
                            >
                              {stage.name}
                            </h4>
                            <span
                              aria-hidden="true"
                              className="mb-1 h-px flex-1"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, rgba(34,48,58,0.4) 0, rgba(34,48,58,0.4) 2px, transparent 2px, transparent 6px)",
                              }}
                            />
                            <span
                              className="font-display shrink-0 text-sm"
                              style={{ color: UNORA.coralDeep }}
                            >
                              {stage.n}
                            </span>
                          </div>
                          <p
                            className="text-xs italic"
                            style={{ color: UNORA.coralDeep }}
                          >
                            {stage.translation}
                          </p>
                          <p
                            className="mt-1 text-[13px] leading-snug"
                            style={{ color: UNORA.inkSoft }}
                          >
                            {dishes[i]}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={180} className="mt-10 flex justify-center">
          <UnoraButton href="/enquire" variant="coral">
            Ask about this season&rsquo;s menu
          </UnoraButton>
        </Reveal>
      </div>
    </section>
  );
}
