import { SITE_URL } from "@/lib/site";
import { SITE_ADDRESS_DISPLAY, SITE_EMAIL, SITE_PHONE_DISPLAY } from "@/lib/contact-info";
import { STAT_CITIES, STAT_EVENTS_CATERED, STAT_MAX_GUESTS, STAT_MIN_GUESTS } from "@/lib/stats";
import { RITUS } from "@/lib/season";
import { COURSE_STAGES } from "@/lib/menu";
import { FAQ_ITEMS } from "@/lib/faq";

// Renders as /llms.txt — the emerging (unofficial, no single governing
// spec yet) convention for giving LLMs and AI answer engines a compact,
// plain-language summary of a site, separate from robots.txt (crawl
// permissions) and sitemap.xml (URL discovery). This route is dynamic
// rather than a static public/llms.txt file specifically so every fact
// below is imported from the same lib/ constants the actual pages
// render — RITUS, COURSE_STAGES, FAQ_ITEMS, the stats — instead of a
// second hand-maintained copy that could quietly drift out of sync.
//
// Not a substitute for JSON-LD (lib/schema.ts) or per-page metadata —
// those remain the structured, machine-parsed source of truth for
// search engines. This is the plain-prose equivalent for a model doing
// a quick read-and-summarize pass.

export const revalidate = 86400; // content changes rarely; cache a day

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push("# Urasa");
  lines.push("");
  lines.push("> A seasonal, ingredient-first catering house. One kitchen team, from the first tasting to the last course, built around what the market actually has that week.");
  lines.push("");
  lines.push("Tagline: \"We care about warmth.\" Standing line: \"Seasonal Indian cooking, plated with care\" / \"Catering for occasions of consequence.\"");
  lines.push("");

  lines.push("## Philosophy");
  lines.push("");
  lines.push("Three principles govern every Urasa menu:");
  lines.push("");
  lines.push("- **Ritu (ऋतु) — Cook with the season.** Menus rotate through six traditional ritu, not a fixed banquet calendar or the four Western seasons.");
  lines.push("- **Santulan (संतुलन) — Balance on the plate.** Every course balances grains, protein, and vegetables for flavour and nutrition together, not just size or spectacle.");
  lines.push("- **Nishtha (निष्ठा) — One kitchen, start to finish.** The chefs who plan a menu are the chefs who cook and serve it on the day. No sub-contracted staff, ever.");
  lines.push("");

  lines.push("## The six ritu");
  lines.push("");
  for (const r of RITUS) {
    lines.push(`- **${r.label} (${r.jp})** — ${r.months}`);
  }
  lines.push("");

  lines.push("## Sample course sequence");
  lines.push("");
  lines.push("Illustrative — real event menus are tasted and confirmed with the client before booking.");
  lines.push("");
  for (const c of COURSE_STAGES) {
    lines.push(`- ${c.n}. **${c.name} (${c.jp})** — ${c.translation}`);
  }
  lines.push("");

  lines.push("## Services");
  lines.push("");
  lines.push("- **Corporate & Private Catering** — personalised seasonal menus and live kitchen counters.");
  lines.push("- **Event Delivery & Staffing** — full-service delivery, front-of-house staffing, end-to-end on-site execution.");
  lines.push("");

  lines.push("## Who Urasa serves");
  lines.push("");
  lines.push("- **Corporate & Institutions** — 10–250 guests. Board dinners, product launches, offsite retreats.");
  lines.push("- **Weddings** — 50–500 guests. Tasting-led planning from first meeting to final course.");
  lines.push("- **Private Functions** — 2–40 guests. In-home tasting menus, milestone celebrations, a dedicated on-site chef.");
  lines.push("- **Standing & Reception** — 40–800 guests. The same seasonal menu, reformatted as a canapé sequence for a moving room.");
  lines.push("");

  lines.push("## Responsibility");
  lines.push("");
  lines.push("- Seasonal, close sourcing — short supply chains, nothing forced out of season.");
  lines.push("- Balance on every plate — real nutrition, portioning that respects the guest.");
  lines.push("- Minimal, deliberate waste — headcounts confirmed close to the date, tasting surplus redirected to staff meals, never discarded.");
  lines.push("- One accountable kitchen — every person on site is an Urasa hire, trained and scheduled directly, never outsourced.");
  lines.push("");

  lines.push("## By the numbers");
  lines.push("");
  lines.push(`- ${STAT_CITIES} cities`);
  lines.push(`- ${STAT_MIN_GUESTS}–${STAT_MAX_GUESTS} guests per event`);
  lines.push(`- ${STAT_EVENTS_CATERED}+ events catered`);
  lines.push("");

  lines.push("## Frequently asked questions");
  lines.push("");
  for (const item of FAQ_ITEMS) {
    lines.push(`**${item.question}**`);
    lines.push(item.answer);
    lines.push("");
  }

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Email: ${SITE_EMAIL}`);
  lines.push(`- Phone: ${SITE_PHONE_DISPLAY}`);
  lines.push(`- Studio: ${SITE_ADDRESS_DISPLAY}`);
  lines.push(`- Enquire: ${SITE_URL}/enquire`);
  lines.push("");

  lines.push("## Pages");
  lines.push("");
  lines.push(`- [Home](${SITE_URL}/) — overview, philosophy, seasonal menu`);
  lines.push(`- [About](${SITE_URL}/about) — the studio, footprint, brand`);
  lines.push(`- [Services](${SITE_URL}/services) — catering formats and guest ranges`);
  lines.push(`- [Responsibility](${SITE_URL}/responsibility) — sourcing, waste, staffing standards`);
  lines.push(`- [FAQ](${SITE_URL}/faq) — common questions, answered`);
  lines.push(`- [Careers](${SITE_URL}/careers) — open kitchen-team roles`);
  lines.push(`- [Enquire](${SITE_URL}/enquire) — request a tasting`);

  return lines.join("\n") + "\n";
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
