import { Reveal } from "../reveal";
import { UnoraButton } from "./button";
import { UNORA } from "./theme";

/**
 * Closing contact band, echoing the reference poster's coral sign-off
 * strip. No fabricated social handles or phone/email — the real site's
 * only contact channel is the /enquire form, so that's the one CTA here.
 */
export function UnoraClosingBand() {
  return (
    <section
      aria-labelledby="unora-closing-heading"
      className="relative overflow-hidden"
      style={{ background: UNORA.coral }}
    >
      <div
        aria-hidden="true"
        className="unora-drift-1 pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full opacity-40 blur-2xl"
        style={{ background: UNORA.gold }}
      />
      <div
        aria-hidden="true"
        className="unora-drift-2 pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-2xl"
        style={{ background: UNORA.navy }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-10 text-center sm:py-14 md:px-8">
        <Reveal>
          <h2
            id="unora-closing-heading"
            className="font-display text-2xl leading-tight text-white sm:text-4xl"
          >
            Good food. Genuine care. Better tables.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            Tell us your date, headcount, and occasion — we&rsquo;ll take it
            from there.
          </p>
          <div className="mt-8 flex justify-center">
            <UnoraButton href="/enquire" variant="navy">
              Request a tasting
            </UnoraButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
