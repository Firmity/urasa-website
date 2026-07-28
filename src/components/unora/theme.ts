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
