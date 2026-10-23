"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { btnGhost, btnPrimary } from "./ui";
import { CONSENT_KEY, GA_ID, OPEN_CONSENT_EVENT } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Speicher blockiert: Die Entscheidung gilt nur für diesen Seitenaufruf.
  }
}

/** Google Analytics wird erst nach Einwilligung geladen. Nur eingebunden, wenn eine GA4-ID gesetzt ist. */
export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setBannerOpen(stored === null);
    const open = () => setBannerOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const choose = (value: "granted" | "denied") => {
    storeConsent(value);
    setBannerOpen(false);
    if (value === "denied" && consent === "granted") {
      // Analytics lief bereits auf dieser Seite – neu laden, um es zu entfernen.
      window.location.reload();
      return;
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {bannerOpen && (
        <div role="dialog" aria-labelledby="consent-title" className="consent-banner">
          <div>
            <strong id="consent-title">Webanalyse</strong>
            <p>
              Mit Ihrer Einwilligung nutzen wir Google Analytics, um zu verstehen, welche Seiten zu Anfragen führen. Dabei
              werden Cookies gesetzt und Daten an Google übermittelt. Sie können Ihre Entscheidung jederzeit über
              „Cookie-Einstellungen“ im Fußbereich ändern. Mehr in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          </div>
          <div className="consent-actions">
            <button type="button" className={btnPrimary} onClick={() => choose("granted")}>
              Akzeptieren
            </button>
            <button type="button" className={`${btnGhost} h-9 px-4 consent-deny`} onClick={() => choose("denied")}>
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentSettingsButton() {
  return (
    <button type="button" className="footer-link-button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie-Einstellungen
    </button>
  );
}
