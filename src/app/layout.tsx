import type { Metadata, Viewport } from "next";
import "@fontsource/shippori-mincho/400.css";
import "@fontsource/shippori-mincho/500.css";
import "@fontsource/shippori-mincho/600.css";
import "@fontsource/shippori-mincho/700.css";
import "@fontsource/shippori-mincho/800.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
import { MotionProvider } from "@/components/app-provider";
import { SkipLink } from "@/components/skip-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";

const fontVariables = "font-vars";

export const metadata: Metadata = {
  // Base for resolving every relative URL in child pages' metadata
  // (openGraph.images, alternates.canonical, etc.) — without this,
  // those resolve against whatever host is serving the request instead
  // of the canonical production domain.
  metadataBase: new URL(SITE_URL),
  title: "Urasa — We care about warmth, Catering for Occasions of Consequence",
  description:
    "Urasa is a seasonal, ingredient-first Indian catering house for corporate events, weddings, and private functions, built on balanced cooking and one kitchen team from prep to plate.",
  // Site-wide fallback so any page that forgets its own openGraph/twitter
  // block still gets a real preview instead of nothing when the link is
  // shared on WhatsApp, Twitter/X, iMessage, Slack, etc. The 5 pages with
  // their own openGraph.images (set from URASA META TECH.txt) override
  // this per-field, not wholesale — this logo card is only what shows up
  // where nothing more specific was requested.
  openGraph: {
    type: "website",
    siteName: "Urasa",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Urasa — We care about warmth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

// This site has no dark theme — declaring colorScheme: "light" (renders
// as <meta name="color-scheme" content="light">) stops Android
// Chrome/WebView's "force dark" heuristic and Samsung Internet's night
// mode from auto-inverting our colors, which is what was turning the
// cream/coral Unora hero into the near-black + maroon screenshot: those
// browsers apply a contrast-based auto-dark filter to any page that
// doesn't explicitly say it's light-only.
export const viewport: Viewport = {
  colorScheme: "light",
  // Tints the mobile browser chrome (Android Chrome's address bar,
  // Safari's status bar area) with the brand green instead of default
  // white/black — the same "make the browser itself feel branded" idea
  // as the favicon, just for the chrome around the tab instead of the
  // tab icon.
  themeColor: "#40492C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-washi text-ink">
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
