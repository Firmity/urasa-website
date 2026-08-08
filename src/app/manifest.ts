import type { MetadataRoute } from "next";

// Renders as /manifest.webmanifest, auto-linked by Next.js — powers
// "Add to Home Screen" on Android/Chrome and gives PWA-aware surfaces
// (Android share sheets, some desktop install prompts) a proper name and
// icon instead of a screenshot thumbnail or generic globe.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Urasa — We care about warmth",
    short_name: "Urasa",
    description:
      "A seasonal, ingredient-first catering house. One kitchen team, from the first tasting to the last course.",
    start_url: "/",
    display: "standalone",
    // Rebrand (Aug 2026): matches the new Unora theme's cream page bg and
    // the logo's orange arc — see src/components/unora/theme.ts.
    background_color: "#F8F4EF",
    theme_color: "#E4572E",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
