import { Reveal } from "../reveal";
import {
  IconBadge,
  ChefHatIcon,
  TruckIcon,
  BriefcaseIcon,
  HeartIcon,
  PeopleIcon,
  SparklesIcon,
} from "./icons";
import { GradientField } from "./GradientField";
import { UNORA } from "./theme";

// Real Urasa content only — mirrors activities.tsx (ACTIVITIES) and
// services/page.tsx (SERVICES), just reframed into the two-column
// icon-list layout from the reference poster. No fabricated sectors.
const OUR_SERVICES = [
  {
    title: "Corporate & Private Catering",
    body: "Personalised menus and live kitchen counters, built around what's in season.",
    icon: <ChefHatIcon />,
  },
  {
    title: "Event Delivery & Staffing",
    body: "Full-service delivery, front-of-house staffing, and on-site execution.",
    icon: <TruckIcon />,
  },
];

const WHO_WE_SERVE = [
  {
    title: "Corporate & Institutions",
    stat: "10–250 guests",
    icon: <BriefcaseIcon />,
  },
  {
    title: "Weddings",
    stat: "50–500 guests",
    icon: <HeartIcon />,
  },
  {
    title: "Private Functions",
    stat: "2–40 guests",
    icon: <PeopleIcon />,
  },
  {
    title: "Standing & Reception",
    stat: "40–800 guests",
    icon: <SparklesIcon />,
  },
];

export function UnoraServices() {
  return (
    <section
      aria-labelledby="unora-services-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.blueTint }}
    >
      <GradientField colors={[UNORA.navySoft, UNORA.coral]} />
      <h2 id="unora-services-heading" className="sr-only">
        Our services and who we serve
      </h2>
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <p
              className="mb-6 text-[12px] font-semibold tracking-[0.28em]"
              style={{ color: UNORA.coralDeep }}
            >
              OUR SERVICES
            </p>
            <ul className="flex flex-col gap-6">
              {OUR_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <li className="flex items-start gap-4">
                    <IconBadge bg={UNORA.coral} size={56}>
                      {s.icon}
                    </IconBadge>
                    <div>
                      <h3
                        className="font-display text-lg"
                        style={{ color: UNORA.navy }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: UNORA.inkSoft }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-6 text-[12px] font-semibold tracking-[0.28em]"
              style={{ color: UNORA.coralDeep }}
            >
              WHO WE SERVE
            </p>
            <ul className="flex flex-col gap-6">
              {WHO_WE_SERVE.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <li className="flex items-start gap-4">
                    <IconBadge bg={UNORA.navy} size={56}>
                      {s.icon}
                    </IconBadge>
                    <div>
                      <h3
                        className="font-display text-lg"
                        style={{ color: UNORA.navy }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="mt-1 text-[11px] tracking-[0.1em]"
                        style={{ color: UNORA.inkSoft }}
                      >
                        {s.stat}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
