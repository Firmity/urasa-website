// Color language for the "Unora" landing-page theme — local constants only,
// deliberately NOT wired into globals.css / @theme tokens. The classic site
// (SiteHeader, SiteFooter, every other route) must never see these values;
// keeping them scoped to this folder is what guarantees that isolation.
//
// Rebrand (Aug 2026): derived entirely from the new Urasa logo's 3-color
// mark — E4572E (orange arc), D2B48C (tan steam), 3B2A21 (dark brown
// wordmark) — no other hues introduced. Every value below is a tint/shade
// of one of those three, computed in HSL (see the palette-derivation note
// in PR description / commit message for the exact deltas), so the whole
// landing page reads as one consistent 3-color brand instead of the old
// 5-hue coral/navy/gold/olive/blue system.
export const UNORA = {
  // Paper background — a barely-there tint of the tan (D2B48C), L≈96%.
  cream: "#F8F4EF",
  // Raised/card surface — same tan hue, meaningfully darker than cream so
  // cards visibly sit "above" the page (L≈87%).
  creamRaised: "#ECE0CF",
  // Alternate section background — a barely-there tint of the orange
  // (E4572E) with reduced saturation, not a fully saturated color, so
  // body text/cards still read as "light background" rather than a
  // colored panel. Distinct enough from `cream` (tan-tinted) to visibly
  // alternate between sections while staying in the same brand family.
  blueTint: "#F3E6E2",
  // Primary brand color — the logo's orange arc, used as-is.
  coral: "#E4572E",
  // Hover/pressed state and small-text accent (needs more contrast on
  // cream than the base orange gives).
  coralDeep: "#BC3D18",
  // Dark anchor color — the logo's wordmark brown, used as-is for dark
  // sections/badges/footer bg (replaces the old navy).
  navy: "#3B2A21",
  // Softer brown, one step up in lightness from navy — secondary dark
  // badge fills and gradient stops.
  navySoft: "#765442",
  // Tan accent — the logo's steam color, used as-is (replaces the old
  // gold for badges/borders/gradient stops).
  gold: "#D2B48C",
  // Deep muted tan/khaki — darker shade of the tan, gives trust-badge
  // rows a 5th visually distinct fill without leaving the brand hues.
  olive: "#A47940",
  // Primary text ink — same value as `navy`; kept as a separate key
  // because callers reach for `ink`/`inkSoft` for text and `navy` for
  // fills/backgrounds, and that distinction is worth preserving even
  // though the color is identical post-rebrand.
  ink: "#3B2A21",
  // Secondary/muted text — lightened brown, clears 4.5:1 against cream,
  // creamRaised, and blueTint alike (see contrast notes in the rebrand
  // PR).
  inkSoft: "#735240",
} as const;

export type UnoraColor = (typeof UNORA)[keyof typeof UNORA];

/**
 * Shared chrome re-theme for the navbar: locally overrides the same
 * design-token CSS variables globals.css defines at :root (the exact
 * pattern already used for html[data-high-contrast="true"]) so
 * SiteHeader picks up the Unora palette through its existing
 * bg-washi / text-ink / border-line / bg-brand utility classes, with no
 * parallel "unora" className branch to keep in sync. Returns undefined
 * for the classic theme so the header stays pixel-identical to before.
 *
 * The footer does NOT use this — a plain recolor of the classic footer
 * markup read as "still the classic footer" to a real viewer, so
 * SiteFooter instead branches to a fully bespoke UnoraFooter component.
 */
export function unoraChromeVars(
  isClassic: boolean
): Record<string, string> | undefined {
  if (isClassic) return undefined;
  return {
    "--washi": UNORA.cream,
    "--washi-raised": UNORA.creamRaised,
    "--sumi": UNORA.navy,
    "--sumi-soft": UNORA.inkSoft,
    "--brand": UNORA.coral,
    "--brand-deep": UNORA.coralDeep,
    "--ai": UNORA.navySoft,
    "--kin": UNORA.gold,
    "--nezumi": UNORA.inkSoft,
    "--nezumi-light": "#E2CFB6",
    "--line": "rgba(59, 42, 33, 0.16)",
  };
}
