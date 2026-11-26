// Herkunft des Besuchs (UTM-Parameter und externer Referrer) – beim ersten Seitenaufruf der Sitzung in sessionStorage gemerkt
// und nur als versteckte Felder im Prüfpartner-Formular mitgesendet. Keine Cookies, keine personenbezogenen Daten in URLs.

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | "referrer", string>>;
const KEY = "bm_attribution";

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(location.search);
    const data: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 150);
    }
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.host !== location.host) data.referrer = `${r.origin}${r.pathname}`.slice(0, 300);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* sessionStorage gesperrt → ohne Herkunft weiter */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
