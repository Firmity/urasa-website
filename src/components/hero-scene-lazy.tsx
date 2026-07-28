"use client";

import dynamic from "next/dynamic";

// `dynamic(..., { ssr: false })` must be called from within a Client
// Component module — Hero itself stays a server component, so this thin
// wrapper is the client boundary that performs the lazy, no-SSR import.
export const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);
