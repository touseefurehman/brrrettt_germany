// Google Analytics 4 – wird nur geladen, wenn NEXT_PUBLIC_GA_ID gesetzt ist UND der Besucher eingewilligt hat
// (Lastenheft L-05). Ohne ID bleibt die Website cookie- und trackingfrei, Datenschutzerklärung passt sich an.

// Mess-ID des GA4-Datenstreams „betreibermanager.de“ (Property 560297836); per NEXT_PUBLIC_GA_ID überschreibbar
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-V1E03KQL0H";
export const hasAnalytics = /^G-[A-Z0-9]+$/.test(GA_ID);

export const CONSENT_KEY = "bm-analytics-consent";
export const OPEN_CONSENT_EVENT = "bm-open-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sendet ein GA4-Event; tut nichts, wenn GA nicht geladen ist (keine ID, keine Einwilligung, Blocker). */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, { ...params, transport_type: "beacon" });
  }
}
