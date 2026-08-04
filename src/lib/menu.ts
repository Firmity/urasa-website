import { getCurrentRitu, type Ritu } from "./season";

/**
 * Single source of truth for the illustrative seasonal menu — course
 * stages and per-ritu dishes. Previously duplicated verbatim between
 * seasonal-menu.tsx (classic theme) and unora/UnoraMenu.tsx (Unora
 * theme); extracted here so both themes and the home page's Menu
 * JSON-LD (see lib/schema.ts) read from one place and can never drift
 * out of sync with each other. Illustrative only — real event menus are
 * tasted and confirmed before booking.
 */
export const COURSE_STAGES = [
  { n: "01", jp: "स्वागत", name: "Swagat", translation: "Welcome" },
  { n: "02", jp: "कचूंबर", name: "Kachumber", translation: "Raw salad" },
  { n: "03", jp: "सब्ज़ी", name: "Sabzi", translation: "Vegetable" },
  { n: "04", jp: "दाल-चावल", name: "Dal-Chawal", translation: "Lentils & rice" },
  { n: "05", jp: "तंदूर", name: "Tandoor", translation: "From the clay oven" },
  { n: "06", jp: "मिष्ठान", name: "Mishti", translation: "Something sweet" },
] as const;

export const COURSE_PHOTOS = [
  "/food/thali-platter.webp",
  "/food/tomato-basil-pasta.webp",
  "/food/rose-lassi.webp",
  "/food/green-pea-soup.webp",
  "/food/seasonal-fruit-plate.webp",
  "/food/berry-smoothie.webp",
];

export const DISHES_BY_RITU: Record<string, string[]> = {
  vasant: [
    "Fresh pea and mint shorba, finished with a curry leaf tempering.",
    "Shaved fennel, orange, and young spinach, citrus dressing.",
    "Stir-fried spring greens with garlic and dried red chilli.",
    "Moong dal with fresh dill, paired with jeera rice.",
    "Charred paneer tikka with a raw mango glaze.",
    "Gajar halwa, lightly spiced, served warm.",
  ],
  grishma: [
    "Chilled raw mango and buttermilk shorba, mustard tempering.",
    "Cucumber, mint, and pomegranate salad, black salt.",
    "Bhindi tossed with dried mango powder and kalonji.",
    "Chana dal with tamarind, paired with jeera rice.",
    "Tandoori prawns, yoghurt and kasuri methi marinade.",
    "Mango kulfi, cardamom-forward, lightly sweetened.",
  ],
  varsha: [
    "Hot tomato-dhania shorba with a tempered mustard finish.",
    "Roasted corn and raw papaya salad, lime.",
    "Monsoon greens sautéed with garlic.",
    "Masoor dal with ginger, paired with steamed rice.",
    "Malai chicken skewers, finished over live coals.",
    "Warm gulab jamun, served two to a bowl.",
  ],
  sharad: [
    "Roasted pumpkin and coconut shorba.",
    "Pomegranate, roasted beet, and walnut salad.",
    "Stuffed baby eggplant in a peanut-sesame masala.",
    "Toor dal, curry leaf tempering, paired with rice.",
    "Tandoori mushroom skewers, smoked chilli marinade.",
    "Til and jaggery ladoo, served warm.",
  ],
  hemant: [
    "Roasted beet and ginger shorba.",
    "Shredded carrot and radish salad, roasted peanuts.",
    "Sarson ka saag, a spoon of ghee.",
    "Urad dal, slow-cooked overnight, paired with rice.",
    "Tandoori leg of lamb, marinated twenty-four hours.",
    "Moong dal halwa, warm, ghee-rich.",
  ],
  shishir: [
    "Black pepper rasam, served piping hot.",
    "Citrus segments, roasted peanut, and chilli.",
    "Methi malai mutter, slow-cooked.",
    "Dal makhani, finished with a swirl of cream.",
    "Tandoori chicken, extra char, extra smoke.",
    "Moong dal halwa, ghee-rich, served warm.",
  ],
};

// Same page split used by both themes' two-page/two-column menu spread.
export const MENU_PAGE_GROUPS = [
  { indices: [0, 1, 2] as const, mark: "आरंभ", label: "To begin" },
  { indices: [3, 4, 5] as const, mark: "मुख्य", label: "Mains & sweets" },
];

export function getDishesForRitu(ritu: Ritu): string[] {
  return DISHES_BY_RITU[ritu.id] ?? DISHES_BY_RITU.vasant;
}

/** Server-safe: current ritu + its illustrative dishes, for JSON-LD. */
export function getCurrentMenu(date: Date = new Date()) {
  const ritu = getCurrentRitu(date);
  return { ritu, dishes: getDishesForRitu(ritu) };
}
