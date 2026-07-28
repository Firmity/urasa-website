export type Ritu = {
  id: string;
  label: string;
  jp: string; // devanagari mark, mirrors the kanji-mark convention used elsewhere
  months: string;
  accent: string;
};

export const RITUS: Ritu[] = [
  {
    id: "vasant",
    label: "Vasant",
    jp: "वसंत",
    months: "Feb – Apr",
    accent: "#8a9a3f", // fresh new-leaf green-yellow
  },
  {
    id: "grishma",
    label: "Grishma",
    jp: "ग्रीष्म",
    months: "Apr – Jun",
    accent: "#c98a2b", // turmeric gold
  },
  {
    id: "varsha",
    label: "Varsha",
    jp: "वर्षा",
    months: "Jun – Aug",
    accent: "#2b4a5e", // monsoon indigo
  },
  {
    id: "sharad",
    label: "Sharad",
    jp: "शरद",
    months: "Aug – Oct",
    accent: "#c05a2b", // marigold
  },
  {
    id: "hemant",
    label: "Hemant",
    jp: "हेमंत",
    months: "Oct – Dec",
    accent: "#8a3b2b", // rust
  },
  {
    id: "shishir",
    label: "Shishir",
    jp: "शिशिर",
    months: "Dec – Feb",
    accent: "#5c3a52", // muted plum
  },
];

/** Six ritu of roughly two months each, starting mid-February. */
export function getCurrentRitu(date: Date = new Date()): Ritu {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  // shift so "day of ritu-year" starts at Feb 15
  const dayOfYear =
    (month * 30 + day - 45 + 360) % 360; // approximate, evenly spaced
  const index = Math.floor(dayOfYear / 60) % 6;
  return RITUS[index];
}
