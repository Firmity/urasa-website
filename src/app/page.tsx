import type { Metadata } from "next";
import { LandingThemeSwitch } from "@/components/landing-theme-switch";
import { JsonLd } from "@/components/json-ld";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Urasa — Seasonal & Ingredient-First Catering House",
  description:
    "A seasonal, ingredient-first catering house. One kitchen team, from the first tasting to the last course, built around what the market actually has that week.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Urasa — Seasonal & Ingredient-First Catering House",
    description:
      "We care about warmth. One kitchen team cooking seasonal, ingredient-first menus for corporate events, weddings, and private functions.",
    images: ["/food/thali-platter.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urasa — Seasonal Catering House",
    description:
      "Ingredient-first catering menus built around seasonal markets. We care about warmth.",
    images: ["/food/thali-platter.webp"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <LandingThemeSwitch />
    </>
  );
}
