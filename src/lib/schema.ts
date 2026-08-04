import { SITE_URL } from "./site";
import { COURSE_STAGES, MENU_PAGE_GROUPS, getCurrentMenu } from "./menu";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Urasa",
  publisher: { "@id": ORG_ID },
};

const isPartOfWebsite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Urasa",
  url: SITE_URL,
};

/**
 * Full organization entity, used on the home page. Every other page
 * emits a lighter subset with a page-relevant `knowsAbout` — same @id,
 * so search engines merge them into one entity across the site (the
 * pattern the source content used), without repeating the full profile
 * (servesCuisine, priceRange, description) on every single page.
 */
function organizationFull(extra: Record<string, unknown> = {}) {
  return {
    "@type": "FoodEstablishment",
    "@id": ORG_ID,
    name: "Urasa",
    alternateName: "यूरासा",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.webp`,
    image: `${SITE_URL}/food/thali-platter.webp`,
    description:
      "A seasonal, ingredient-first catering house. One kitchen team, from the first tasting to the last course, built around seasonal markets.",
    slogan: "We care about warmth",
    servesCuisine: ["Indian", "Seasonal", "Vegetarian", "Non-Vegetarian"],
    priceRange: "₹₹₹",
    knowsAbout: [
      "Corporate Catering",
      "Private Catering",
      "Wedding Catering",
      "Seasonal Menus",
    ],
    ...extra,
  };
}

function organizationLite(knowsAbout: string[]) {
  return {
    "@type": "FoodEstablishment",
    "@id": ORG_ID,
    name: "Urasa",
    alternateName: "यूरासा",
    url: SITE_URL,
    slogan: "We care about warmth",
    knowsAbout,
  };
}

/**
 * Home page — merges what the source content treated as three separate
 * pages (Home / Philosophy / Menu) into one graph, since #philosophy and
 * #menu are anchors on "/" rather than real routes. The Menu section is
 * generated from lib/menu.ts's live ritu/dishes (same data the page
 * renders) instead of a hardcoded season, so it can't go stale.
 */
export function homeSchema() {
  const { ritu, dishes } = getCurrentMenu();

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationFull({ hasMenu: `${SITE_URL}/#menu` }),
      website,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#philosophy`,
        url: `${SITE_URL}/#philosophy`,
        name: "Urasa Philosophy — Three Core Principles",
        description:
          "Three principles govern every table we set: Ritu (seasonal cooking), Santulan (balance on the plate), and Nishtha (one kitchen team).",
        isPartOf: isPartOfWebsite,
      },
      {
        "@type": "Menu",
        "@id": `${SITE_URL}/#menu`,
        url: `${SITE_URL}/#menu`,
        name: `${ritu.label} (${ritu.jp}) Seasonal Menu`,
        description: `Urasa's ingredient-first seasonal catering menu for ${ritu.label}, ${ritu.months}.`,
        inLanguage: "en",
        hasMenuSection: MENU_PAGE_GROUPS.map((group) => ({
          "@type": "MenuSection",
          name: `${group.label} (${group.mark})`,
          hasMenuItem: group.indices.map((i) => ({
            "@type": "MenuItem",
            name: COURSE_STAGES[i].name,
            description: dishes[i],
          })),
        })),
      },
    ],
  };
}

export function aboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about/#webpage`,
        url: `${SITE_URL}/about`,
        name: "About Urasa — We care about warmth",
        description:
          "Learn about Urasa, a seasonal ingredient-first catering house driven by three core principles: Ritu, Santulan, and Nishtha.",
        isPartOf: isPartOfWebsite,
        about: { "@id": ORG_ID },
      },
      organizationLite([
        "Ritu - Seasonal Cooking",
        "Santulan - Balance on the plate",
        "Nishtha - One dedicated kitchen team",
      ]),
    ],
  };
}

export function servicesSchema() {
  const provider = {
    "@type": "FoodEstablishment",
    "@id": ORG_ID,
    name: "Urasa",
    url: SITE_URL,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/services/#webpage`,
        url: `${SITE_URL}/services`,
        name: "Catering Services & Who We Serve — Urasa",
        description:
          "Explore Urasa's catering services, including corporate & private catering, event delivery, on-site live kitchen counters, and front-of-house staffing.",
        isPartOf: isPartOfWebsite,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/#corporate-private-catering`,
        name: "Corporate & Private Catering",
        serviceType: "Catering Service",
        description:
          "Personalised seasonal menus and live kitchen counters built around what is fresh in the market that week.",
        provider,
        audience: {
          "@type": "Audience",
          audienceType:
            "Corporate institutions, weddings, private functions, and standing receptions.",
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/#delivery-staffing`,
        name: "Event Delivery & Staffing",
        serviceType: "Event Management & Staffing",
        description:
          "Full-service food delivery, front-of-house staffing, and end-to-end on-site execution.",
        provider,
      },
    ],
  };
}

export function careersSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/careers/#webpage`,
        url: `${SITE_URL}/careers`,
        name: "Careers at Urasa — Join Our Kitchen Team",
        description:
          "Join the kitchen team at Urasa. One dedicated team that plans, cooks, and serves every event from start to finish.",
        isPartOf: isPartOfWebsite,
      },
      organizationLite([
        "In-house kitchen staff",
        "Seasonal food preparation",
        "Hospitality and event service",
      ]),
    ],
  };
}

export function enquireSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/enquire/#webpage`,
        url: `${SITE_URL}/enquire`,
        name: "Enquire & Request a Tasting — Urasa",
        description:
          "Tell us your event date, headcount, and occasion. Request a tasting or inquire about seasonal catering services with Urasa.",
        isPartOf: isPartOfWebsite,
        potentialAction: {
          "@type": "ReserveAction",
          target: `${SITE_URL}/enquire`,
          name: "Request a Tasting / Event Enquiry",
        },
      },
      organizationFull({}),
    ],
  };
}

export function responsibilitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/responsibility/#webpage`,
        url: `${SITE_URL}/responsibility`,
        name: "Responsibility — Urasa",
        description:
          "How Urasa sources, cooks, and staffs responsibly — seasonal sourcing, balanced nutrition, and a single accountable kitchen team.",
        isPartOf: isPartOfWebsite,
      },
      organizationLite([
        "Seasonal, close sourcing",
        "Balance on every plate",
        "Minimal, deliberate waste",
        "One accountable kitchen",
      ]),
    ],
  };
}

export function accessibilitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/accessibility/#webpage`,
        url: `${SITE_URL}/accessibility`,
        name: "Accessibility Statement — Urasa",
        description:
          "How the Urasa website is built to be usable for everyone, and how to report an accessibility issue.",
        isPartOf: isPartOfWebsite,
      },
    ],
  };
}
