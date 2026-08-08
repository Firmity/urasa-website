import { SITE_EMAIL, SITE_PHONE_DISPLAY } from "./contact-info";

/**
 * Single source of truth for Urasa's FAQ content — same DRY pattern as
 * menu.ts. Rendered as real, visible copy on /faq (with matching
 * FAQPage JSON-LD built from this exact array in lib/schema.ts) and fed
 * verbatim into /llms.txt. One list, three surfaces, so an answer can't
 * drift out of sync between what a visitor reads and what an AI crawler
 * or answer engine ingests.
 *
 * Every answer here is a restatement of facts already published
 * elsewhere on the site (About, Services, Responsibility, Enquire) —
 * nothing here should introduce a new claim that isn't backed by an
 * existing page.
 */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is Urasa?",
    answer:
      "Urasa is a seasonal, ingredient-first catering house. One kitchen team plans, cooks, and serves every event — from the first tasting to the last course — built around what's genuinely in season, not a menu frozen months in advance.",
  },
  {
    question: "What does Urasa's tagline \"We care about warmth\" mean?",
    answer:
      "It's Urasa's standing description of how it cooks and serves: seasonal Indian cooking, plated with care, for catering for occasions of consequence.",
  },
  {
    question: "What are Ritu, Santulan, and Nishtha?",
    answer:
      "They're Urasa's three governing principles. Ritu (ऋतु) means cooking with the season — menus rotate through six traditional ritu rather than a fixed banquet calendar. Santulan (संतुलन) means balance on the plate — every course balances grains, protein, and vegetables for flavour and nutrition together. Nishtha (निष्ठा) means one kitchen, start to finish — the chefs who plan a menu are the same chefs who cook and serve it on the day, with no sub-contracted staff.",
  },
  {
    question: "What kind of events does Urasa cater?",
    answer:
      "Four formats: corporate & institutional events such as board dinners, product launches, and offsite retreats (10–250 guests); weddings, with tasting-led planning from first meeting to final course (50–500 guests); private functions such as in-home tasting menus and milestone celebrations with a dedicated on-site chef (2–40 guests); and standing & reception events, where the same seasonal menu is reformatted as a canapé sequence for a moving room (40–800 guests).",
  },
  {
    question: "Does Urasa serve vegetarian and non-vegetarian food?",
    answer:
      "Yes. Urasa's seasonal menus include both vegetarian and non-vegetarian courses, built around what's fresh in the market that week.",
  },
  {
    question: "Is Urasa's kitchen and service staff outsourced?",
    answer:
      "No. Every person on site — kitchen and front-of-house — is an Urasa hire, trained, paid, and scheduled directly by Urasa. That's Nishtha: one accountable kitchen team, with no sub-contracted staff standing between Urasa and the guest.",
  },
  {
    question: "How many cities does Urasa operate in?",
    answer:
      "Urasa currently caters events across 6 cities, with 640+ events catered and guest counts per event ranging from 10 to 800.",
  },
  {
    question: "How does booking with Urasa work?",
    answer:
      "Share your event date, headcount, and occasion through the enquiry form. Urasa replies with availability and a starting menu direction, typically within one business day. From there it's a tasting-led process: taste, adjust, and confirm the final menu together, and Urasa's own team executes the event start to finish.",
  },
  {
    question: "How can I contact Urasa?",
    answer: `Email ${SITE_EMAIL} or call ${SITE_PHONE_DISPLAY}. You can also submit an enquiry directly through the contact form on the Enquire page.`,
  },
];
