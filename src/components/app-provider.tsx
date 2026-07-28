"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentRitu, RITUS, type Ritu } from "@/lib/season";

export type LandingTheme = "unora" | "classic";

type AppState = {
  reduceMotion: boolean;
  highContrast: boolean;
  toggleReduceMotion: () => void;
  toggleHighContrast: () => void;
  ritu: Ritu;
  isPreview: boolean;
  previewRitu: (id: string | null) => void;
  // Landing-page visual theme only (not persisted — every fresh load
  // starts on "unora", the new default; "classic" is the original washi
  // site, reachable via the navbar toggle for the duration of the visit).
  landingTheme: LandingTheme;
  toggleLandingTheme: () => void;
};

const AppContext = createContext<AppState | null>(null);

const MOTION_KEY = "urasa-reduce-motion";
const CONTRAST_KEY = "urasa-high-contrast";

function readStored(key: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(key) === "true";
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(() => readStored(MOTION_KEY));
  const [highContrast, setHighContrast] = useState(() => readStored(CONTRAST_KEY));
  // No localStorage read here on purpose — resets to "unora" every visit.
  const [landingTheme, setLandingTheme] = useState<LandingTheme>("unora");

  // Auto-detected ritu is computed once on the client to avoid an SSR/CSR
  // date mismatch; a visitor can also preview any of the six manually.
  const [autoRitu] = useState(() => getCurrentRitu());
  const [previewId, setPreviewId] = useState<string | null>(null);
  const ritu = previewId
    ? RITUS.find((r) => r.id === previewId) ?? autoRitu
    : autoRitu;

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-reduce-motion",
      String(reduceMotion)
    );
    window.localStorage.setItem(MOTION_KEY, String(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-high-contrast",
      String(highContrast)
    );
    window.localStorage.setItem(CONTRAST_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.setAttribute("data-ritu", ritu.id);
    document.documentElement.style.setProperty("--season-accent", ritu.accent);
  }, [ritu]);

  const toggleReduceMotion = useCallback(() => setReduceMotion((v) => !v), []);
  const toggleHighContrast = useCallback(() => setHighContrast((v) => !v), []);
  const previewRitu = useCallback((id: string | null) => setPreviewId(id), []);
  const toggleLandingTheme = useCallback(
    () => setLandingTheme((v) => (v === "unora" ? "classic" : "unora")),
    []
  );

  return (
    <AppContext.Provider
      value={{
        reduceMotion,
        highContrast,
        toggleReduceMotion,
        toggleHighContrast,
        ritu,
        isPreview: previewId !== null,
        previewRitu,
        landingTheme,
        toggleLandingTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useA11y must be used within MotionProvider");
  return ctx;
}

export function useSeason() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useSeason must be used within MotionProvider");
  return ctx;
}
