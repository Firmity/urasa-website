/**
 * Single source of truth for Urasa's public phone/email — same pattern as
 * SITE_URL in site.ts. Every place that displays or emails to Urasa's
 * contact details imports from here instead of hardcoding the string, so
 * a future number/address change is a one-line edit instead of a
 * grep-and-replace across the site.
 */

// Inbox that receives contact-form enquiries and is shown as the public
// "Email" contact point across the site.
export const SITE_EMAIL = "connect@urasa.in";

// Raw digits for the tel: URI — no spaces or formatting. Some mobile OSes
// mis-dial or refuse to autofill a tel: href that contains spaces.
export const SITE_PHONE_TEL = "+911204245551";

// Human-readable form for on-page display.
export const SITE_PHONE_DISPLAY = "+91 120 424 5551";
