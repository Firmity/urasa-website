/**
 * Single source of truth for the production origin. Every SEO surface —
 * metadataBase, robots.ts, sitemap.ts, JSON-LD @id/url fields, canonical
 * links — imports this instead of hardcoding the domain, so a future
 * domain change is a one-line edit instead of a grep-and-replace across
 * a dozen files.
 */
export const SITE_URL = "https://www.urasa.in";
