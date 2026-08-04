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
  // block still gets a sane social preview instead of nothing.
  openGraph: {
    type: "website",
    siteName: "Urasa",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
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
