import Image from "next/image";
import {
  IconBadge,
  PeopleIcon,
  LeafIcon,
  ChefHatIcon,
  BriefcaseIcon,
  ScaleIcon,
  CalendarClockIcon,
  ShieldCheckIcon,
  QuestionCircleIcon,
} from "./icons";
import { GradientField } from "./GradientField";
import { UNORA } from "./theme";

// Same destinations as the classic SiteFooter's nav — just given an icon
// each and laid out as a badge row instead of a plain text link list.
const FOOTER_LINKS = [
  { href: "/about", label: "About", icon: <PeopleIcon /> },
  { href: "/#philosophy", label: "Philosophy", icon: <LeafIcon /> },
  { href: "/#menu", label: "Menu", icon: <ChefHatIcon /> },
  { href: "/careers", label: "Careers", icon: <BriefcaseIcon /> },
  { href: "/responsibility", label: "Responsibility", icon: <ScaleIcon /> },
  { href: "/enquire", label: "Enquire", icon: <CalendarClockIcon /> },
  { href: "/faq", label: "FAQ", icon: <QuestionCircleIcon /> },
  { href: "/accessibility", label: "Accessibility", icon: <ShieldCheckIcon /> },
];

/**
 * Bespoke Unora footer — dark navy band (closes out the coral
 * UnoraClosingBand above it with the palette's other anchor color),
 * inverted logo, and an icon-badge nav row instead of the classic
 * footer's plain grey text links. A CSS-variable recolor of the classic
 * markup read as "still the classic footer" in review, so this is a real
 * standalone component, same as every other Unora section.
 */
export function UnoraFooter() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: UNORA.navy }}
    >
      <GradientField colors={[UNORA.coral, UNORA.gold]} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:py-14 md:px-8">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-full.webp"
              alt="Urasa — We care about warmth"
              width={841}
              height={272}
              className="h-12 w-auto sm:h-14"
              style={{ filter: "brightness(0) invert(1)" }}
              unoptimized
            />
            <p className="text-xs text-white/60">
              &copy; {new Date().getFullYear()} Urasa.
              <br />
              We care about warmth.
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="mt-10 grid grid-cols-4 gap-x-4 gap-y-8 sm:mt-12 md:grid-cols-8"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <IconBadge bg="rgba(255,255,255,0.1)" fg={UNORA.coral} size={44}>
                {link.icon}
              </IconBadge>
              <span className="text-[10px] leading-tight tracking-[0.06em] text-white/75 transition-colors group-hover:text-white">
                {link.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
