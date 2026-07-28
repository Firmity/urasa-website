import { Reveal } from "../reveal";
import { IconBadge, LeafIcon, ShieldCheckIcon, ChefHatIcon, CalendarClockIcon, HandshakeIcon } from "./icons";
import { UNORA } from "./theme";

const BADGES = [
  { icon: <LeafIcon />, label: "Seasonal sourcing", bg: UNORA.olive },
  { icon: <ShieldCheckIcon />, label: "Food safety first", bg: UNORA.coral },
  { icon: <ChefHatIcon />, label: "One kitchen team", bg: UNORA.gold },
  { icon: <CalendarClockIcon />, label: "Tasting-led planning", bg: UNORA.navySoft },
  { icon: <HandshakeIcon />, label: "Responsible sourcing", bg: UNORA.coralDeep },
];

/** 5-icon trust row, styled after the reference poster's badge strip. */
export function UnoraTrustBadges() {
  return (
    <section
      aria-labelledby="unora-trust-heading"
      style={{ background: UNORA.cream }}
    >
      <h2 id="unora-trust-heading" className="sr-only">
        Why clients choose Urasa
      </h2>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12 md:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-4">
          {BADGES.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 70}
              className="flex flex-col items-center gap-3 text-center"
            >
              <IconBadge bg={b.bg} size={64}>
                {b.icon}
              </IconBadge>
              <p
                className="max-w-[9rem] text-[12px] font-medium leading-snug tracking-[0.01em]"
                style={{ color: UNORA.ink }}
              >
                {b.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
