"use client";

import { useA11y } from "./app-provider";
import { Hero } from "./hero";
import { Activities } from "./activities";
import { Philosophy } from "./philosophy";
import { SeasonalMenu } from "./seasonal-menu";
import { ValuePillars } from "./value-pillars";
import { Kitchen } from "./kitchen";
import { Testimonials } from "./testimonials";
import { SectionDivider } from "./section-divider";
import { UnoraHero } from "./unora/UnoraHero";
import { UnoraTrustBadges } from "./unora/UnoraTrustBadges";
import { UnoraPhilosophy } from "./unora/UnoraPhilosophy";
import { UnoraServices } from "./unora/UnoraServices";
import { UnoraExcellenceBand } from "./unora/UnoraExcellenceBand";
import { UnoraMenu } from "./unora/UnoraMenu";
import { UnoraKitchen } from "./unora/UnoraKitchen";
import { UnoraTestimonials } from "./unora/UnoraTestimonials";
import { UnoraClosingBand } from "./unora/UnoraClosingBand";

/**
 * Landing-page section stack, switched by the navbar toggle. "unora" is
 * the default on every fresh load (no persistence, per product decision);
 * "classic" is the original washi site, reachable for the visit's
 * duration only. Split out from page.tsx (a server component) because the
 * toggle reads client-side context.
 */
export function LandingThemeSwitch() {
  const { landingTheme } = useA11y();

  if (landingTheme === "classic") {
    return (
      <>
        <Hero />
        <Activities />
        <SectionDivider />
        <Philosophy />
        <SectionDivider />
        <SeasonalMenu />
        <SectionDivider />
        <ValuePillars />
        <SectionDivider />
        <Kitchen />
        <SectionDivider />
        <Testimonials />
      </>
    );
  }

  return (
    <>
      <UnoraHero />
      <UnoraTrustBadges />
      <UnoraPhilosophy />
      <UnoraServices />
      <UnoraExcellenceBand />
      <UnoraMenu />
      <UnoraKitchen />
      <UnoraTestimonials />
      <UnoraClosingBand />
    </>
  );
}
