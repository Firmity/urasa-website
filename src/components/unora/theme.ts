// Color language for the "Unora" landing-page theme — local constants only,
// deliberately NOT wired into globals.css / @theme tokens. The classic site
// (SiteHeader, SiteFooter, every other route) must never see these values;
// keeping them scoped to this folder is what guarantees that isolation.
export const UNORA = {
  cream: "#FBF3E6",
  creamRaised: "#F4E9D6",
  coral: "#EE6F82",
  coralDeep: "#DD4F68",
  navy: "#163B4D",
  navySoft: "#2B5166",
  gold: "#EAA83B",
  olive: "#5C7A3A",
  ink: "#22303A",
  inkSoft: "#4B5B63",
} as const;

export type UnoraColor = (typeof UNORA)[keyof typeof UNORA];

/**
 * Shared chrome re-theme: locally overrides the same design-token CSS
 * variables globals.css defines at :root (the exact pattern already used
 * for html[data-high-contrast="true"]) so shared site chrome — navbar,
 * footer — picks up the Unora palette automatically through their
 * existing bg-washi / text-ink / border-line / bg-brand utility classes,
 * with zero parallel "unora" className branches to keep in sync.
 * Returns undefined for the classic theme so chrome stays pixel-identical
 * to before this feature existed.
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
    "--nezumi-light": "#E4D6C2",
    "--line": "rgba(22, 59, 77, 0.16)",
  };
}
