import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Renders as /robots.txt. Content matches the brief exactly: allow
// everything except internal/framework routes, point crawlers at the
// sitemap and canonical host.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
