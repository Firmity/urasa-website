import Image from "next/image";
import { Reveal } from "./reveal";

const ACTIVITIES = [
  {
    title: "Corporate & Private Catering",
    body: "Personalised menus and live kitchen counters for offices, weddings, and private functions — built around what's in season, not a fixed banquet list.",
    image: "/food/thali-platter.webp",
    href: "/services",
  },
  {
    title: "Event Delivery & Staffing",
    body: "Full-service delivery, front-of-house staffing, and on-site execution — the same kitchen team from prep through to the last course.",
    image: "/food/tomato-basil-pasta.webp",
    href: "/services",
  },
];

export function Activities() {
  return (
    <section aria-labelledby="activities-heading" className="bg-washi-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16 md:px-8 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-[13px] tracking-[0.25em] text-brand sm:mb-4">
            Our activities
          </p>
          <h2
            id="activities-heading"
            className="font-display text-2xl leading-tight text-ink sm:text-4xl"
          >
            Two formats, one kitchen.
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
          {ACTIVITIES.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <a
                href={a.href}
                className="group flex items-center gap-4 border border-line bg-washi p-3 transition-colors hover:border-brand sm:gap-5 sm:p-4"
              >
                <div className="relative aspect-square w-20 shrink-0 overflow-hidden sm:w-24">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-ink sm:text-xl">{a.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft sm:text-sm">
                    {a.body}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-brand sm:text-[11px]">
                    Learn more
                    <svg
                      aria-hidden="true"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
