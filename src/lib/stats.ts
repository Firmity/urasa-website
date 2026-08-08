/**
 * Single source of truth for Urasa's headline stats — same pattern as
 * site.ts/contact-info.ts. Previously the same three numbers (6, 640,
 * 800) were hardcoded independently in hero.tsx, UnoraHero.tsx, and
 * about/page.tsx; also now reused in llms.txt so the number an AI
 * crawler reads can't drift from the number a visitor sees.
 */
export const STAT_CITIES = 6;
export const STAT_EVENTS_CATERED = 640;
export const STAT_MIN_GUESTS = 10;
export const STAT_MAX_GUESTS = 800;
