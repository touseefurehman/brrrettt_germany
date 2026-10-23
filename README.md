# betreibermanager.de

Next.js 15 (App Router), gehostet auf Vercel.

## Vor dem Launch ausfüllen

- **`lib/site.ts`** – Firmenname, Rechtsform, Anschrift, Telefon, Region, Registerdaten, Ansprechpartner. Alles in `[eckigen Klammern]`. Diese Daten erscheinen in Header, Footer, Kontakt, Impressum, Datenschutz und im JSON-LD (Platzhalter werden im JSON-LD automatisch weggelassen).
- **`app/ueber-uns/page.tsx`** – Werdegang, Porträtfoto, Mitgliedschaften (z. B. GEFMA).
- **`app/datenschutz/page.tsx`** – markierte Stellen (Log-Speicherdauer, Rechtsgrundlage USA-Übermittlung, Versanddienst, Aufsichtsbehörde). Impressum und Datenschutz anwaltlich prüfen lassen.
- **`components/LandingPage.tsx`** – optional `duration` je Ablaufschritt.

## Inhalte (SEO/GEO)

- **Landingpages** – `lib/leistungen.ts`: `/externer-betreibermanager` und `/betreiberpflichten/<slug>` (Wohnungsunternehmen, Kommunen, Krankenhäuser). Jede Seite hat ein eigenes Anfrageformular; die Herkunftsseite steht in der Anfrage-E-Mail (Feld „Seite“).
- **Wissen** – `lib/artikel-grundlagen.ts`, `lib/artikel-branchen.ts`, registriert in `lib/wissen.ts`. Übersicht `/wissen`, Artikel `/wissen/<slug>`. Sitemap, Übersicht und Prüfbereichsseiten (Feld `areas`) übernehmen neue Artikel automatisch.
- **Bausteine** – `lib/pages.ts`: Definition, Tabelle, Checkliste, Schritte, Praxisbeispiel, Hinweis. Fließtext kennt `**fett**` und `[Text](/pfad)`. Regelwerke zentral in `lib/normen.ts`.
- Jede neue Seite bekommt FAQ (inkl. FAQPage-Schema), Breadcrumb-Schema, Canonical und Regelwerksverweise; Artikel zusätzlich Article-Schema mit Datum (`modified` bei Änderungen pflegen).
- Kostenmodell auf `/externer-betreibermanager` ohne Zahlen – siehe TODO in `lib/leistungen.ts`. Praxisbeispiele sind als veranschaulichende Beispiele gekennzeichnet; durch echte Referenzen ersetzen, sobald freigegeben.

## Kontaktformular und Umgebungsvariablen

Das Formular sendet direkt aus dem Browser an Web3Forms (Access Key in `components/ContactForm.tsx`, derselbe wie bei lieferantgesucht.de). Die Anfragen gehen an die E-Mail-Adresse, mit der dieser Access Key bei web3forms.com registriert ist. Spam-Schutz: verstecktes Honeypot-Feld, Mindestzeit von 3 Sekunden, `botcheck` von Web3Forms.

| Variable            | Beispiel                                             |
| ------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` – GA4-Mess-ID (optional, siehe unten) |

Das Formular „Bestandsaufnahme anfragen“ hat die Pflichtfelder Organisation, Ansprechpartner, E-Mail und Anzahl Standorte (Lastenheft L-02/L-03). Nach dem Versand leitet es auf `/anfrage-gesendet` weiter und sendet das GA4-Event `generate_lead` mit `source_page` und `locations`.

**Google Analytics** wird nur geladen, wenn `NEXT_PUBLIC_GA_ID` gesetzt ist **und** der Besucher im Einwilligungsbanner zustimmt. Ohne ID bleibt die Seite cookiefrei; Datenschutzerklärung und Footer passen sich automatisch an. Vor dem Aktivieren: Freigabe des Auftraggebers (T-12), AV-Vertrag mit Google, anwaltliche Prüfung der Datenschutzerklärung. In GA4 `generate_lead` als Schlüsselereignis markieren.
## Domain

In Vercel unter Settings → Domains `www.betreibermanager.de` als Primary (Production) und `betreibermanager.de` als 308-Weiterleitung auf www eintragen. Die Weiterleitung übernimmt allein Vercel – keine Host-Weiterleitung in `next.config.ts` anlegen, sonst entsteht eine Redirect-Schleife. `site.url` in `lib/site.ts` muss auf dieselbe Primärdomain zeigen. `*.vercel.app` wird per `X-Robots-Tag: noindex` gesperrt (`next.config.ts`). Nach dem Launch Sitemap (`/sitemap.xml`) in Google Search Console und Bing Webmaster Tools einreichen.
