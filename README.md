# betreibermanager.de

Next.js 15 (App Router), gehostet auf Vercel.

## Vor dem Launch ausfüllen

- **`lib/site.ts`** – Firmenname, Rechtsform, Anschrift, Telefon, Region, Registerdaten, Ansprechpartner. Alles in `[eckigen Klammern]`. Diese Daten erscheinen in Header, Footer, Kontakt, Impressum, Datenschutz und im JSON-LD (Platzhalter werden im JSON-LD automatisch weggelassen).
- **`app/ueber-uns/page.tsx`** – Werdegang, Porträtfoto, Mitgliedschaften (z. B. GEFMA).
- **`app/datenschutz/page.tsx`** – markierte Stellen (Log-Speicherdauer, Rechtsgrundlage USA-Übermittlung, Versanddienst, Aufsichtsbehörde). Impressum und Datenschutz anwaltlich prüfen lassen.
- **`components/LandingPage.tsx`** – optional `duration` je Ablaufschritt.

## Umgebungsvariablen (Kontaktformular)

Versand über die Resend-API (`app/api/kontakt/route.ts`):

| Variable         | Beispiel                                          |
| ---------------- | ------------------------------------------------- |
| `RESEND_API_KEY` | `re_…`                                            |
| `CONTACT_FROM`   | `Website <anfrage@betreibermanager.de>` (Domain bei Resend verifizieren) |
| `CONTACT_TO`     | `kontakt@betreibermanager.de` (optional)          |

Ohne diese Variablen antwortet die Route mit 503 und das Formular versendet stattdessen über Web3Forms (Access Key in `components/ContactForm.tsx`, derselbe wie bei lieferantgesucht.de).

## Domain

In Vercel unter Settings → Domains `betreibermanager.de` als Primary und `www.betreibermanager.de` als Weiterleitung eintragen. `*.vercel.app` wird per `X-Robots-Tag: noindex` gesperrt (`next.config.ts`). Nach dem Launch Sitemap (`/sitemap.xml`) in Google Search Console und Bing Webmaster Tools einreichen.
