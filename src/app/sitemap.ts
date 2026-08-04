import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Renders as /sitemap.xml. One entry per real route — the Unora/classic
// landing-page toggle and the #philosophy / #menu anchors on "/" aren't
// separate URLs, so they don't get separate entries.
const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/enquire", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/responsibility", changeFrequency: "yearly", priority: 0.6 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
