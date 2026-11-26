# betreibermanager.de

Next.js 15 (App Router), gehostet auf Vercel.

## Vor dem Launch ausfüllen

- **`lib/site.ts`** – Firmenname, Rechtsform, Anschrift, Telefon, Region, Registerdaten, Ansprechpartner. Alles in `[eckigen Klammern]`. Diese Daten erscheinen in Header, Footer, Kontakt, Impressum, Datenschutz und im JSON-LD (Platzhalter werden im JSON-LD automatisch weggelassen).
- **`lib/site.ts` → `company`** – belegbare Angaben für „Über uns“ und das Organization-Schema: Gründungsjahr, Teamgröße, Kennzahlen, handelnde Personen, Fallbeispiele, Mitgliedschaften (z. B. GEFMA), Zertifizierungen. Nicht Belegtes leer lassen – es wird dann nicht angezeigt. Dazu `editorialResponsible` (§ 18 Abs. 2 MStV) fürs Impressum; das Impressum wird indexierbar, sobald die Anschrift steht.
- **`lib/autoren.ts`** – Autorenprofil(e): Name, Funktion, Qualifikation (z. B. TRBS 1203), Berufsjahre, Fachgebiete, Foto. Sobald der Name eingetragen ist, entstehen `/autoren/<slug>`, die Autorenzeile im Artikelkopf und `author` als Person im Article-Schema. Artikel ohne Feld `author` gehören dem ersten Autor.
- **`app/datenschutz/page.tsx`** – markierte Stellen (Log-Speicherdauer, Rechtsgrundlage USA-Übermittlung, Versanddienst, Aufsichtsbehörde). Impressum und Datenschutz anwaltlich prüfen lassen.
- **`components/LandingPage.tsx`** – optional `duration` je Ablaufschritt.

## Inhalte (SEO/GEO)

- **Landingpages** – `lib/leistungen.ts`: `/externer-betreibermanager` und `/betreiberpflichten/<slug>` (Wohnungsunternehmen, Kommunen, Krankenhäuser). Jede Seite hat ein eigenes Anfrageformular; die Herkunftsseite steht in der Anfrage-E-Mail (Feld „Seite“).
- **Leistungskatalog** – `lib/leistungskatalog.ts`: alle Leistungen nach Gewerk auf `/leistungen`. Feld `href` verlinkt eine bestehende Seite zur Leistung. „Anfragen“ wählt die Leistung im Formular vor (`/leistungen?leistung=<slug>#anfrage`); sie steht als Feld „Leistung“ in der Anfrage-E-Mail.
- **Wissen** – `lib/artikel-grundlagen.ts`, `lib/artikel-branchen.ts`, registriert in `lib/wissen.ts`. Übersicht `/wissen`, Artikel `/wissen/<slug>`. Sitemap, Übersicht und Prüfbereichsseiten (Feld `areas`) übernehmen neue Artikel automatisch.
- **Bausteine** – `lib/pages.ts`: Definition, Tabelle, Checkliste, Schritte, Praxisbeispiel, Hinweis. Fließtext kennt `**fett**` und `[Text](/pfad)`. Regelwerke zentral in `lib/normen.ts`.
- Jede neue Seite bekommt FAQ (inkl. FAQPage-Schema), Breadcrumb-Schema, Canonical und Regelwerksverweise; Artikel zusätzlich Article-Schema mit Datum (`modified` bei Änderungen pflegen).
- Kostenmodell auf `/externer-betreibermanager` ohne Zahlen – siehe TODO in `lib/leistungen.ts`. Praxisbeispiele sind als veranschaulichende Beispiele gekennzeichnet; durch echte Referenzen ersetzen, sobald freigegeben.

## Kontaktformular und Umgebungsvariablen

Das Formular sendet direkt aus dem Browser an Web3Forms (Access Key in `components/ContactForm.tsx`). Die Anfragen gehen an die E-Mail-Adresse, mit der dieser Access Key bei web3forms.com registriert ist. Spam-Schutz: verstecktes Honeypot-Feld, Mindestzeit von 3 Sekunden, `botcheck` von Web3Forms.

| Variable            | Beispiel                                             |
| ------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` – GA4-Mess-ID (optional, siehe unten) |

Das Formular „Bestandsaufnahme anfragen“ hat die Pflichtfelder Organisation, Ansprechpartner, E-Mail und Anzahl Standorte (Lastenheft L-02/L-03). Nach dem Versand leitet es auf `/anfrage-gesendet` weiter und sendet das GA4-Event `generate_lead` mit `source_page` und `locations`.

**Google Analytics** (Mess-ID `G-V1E03KQL0H` in `lib/analytics.ts`, per `NEXT_PUBLIC_GA_ID` überschreibbar) wird erst geladen, wenn der Besucher im Einwilligungsbanner zustimmt. Ohne gültige ID bleibt die Seite cookiefrei; Datenschutzerklärung und Footer passen sich automatisch an. Vor dem Aktivieren: Freigabe des Auftraggebers (T-12), AV-Vertrag mit Google, anwaltliche Prüfung der Datenschutzerklärung. In GA4 `generate_lead` als Schlüsselereignis markieren.
## E-Mail: nur Web3Forms

Die Website versendet E-Mails ausschließlich über Web3Forms, immer aus dem Browser. Es gibt keinen anderen E-Mail-Dienst, keine automatischen E-Mail-Folgen und kein Double-Opt-in. Bestätigungen an Absender laufen nur über den Web3Forms-Autoresponder (Pro-Tarif, im Web3Forms-Dashboard eingerichtet; Vorschlagstext: `deliverables/web3forms-autoresponder.txt`).

- **Nullmessung** (`/api/nullmessung`): Die Anfrage wird gespeichert (`DATABASE_URL`) und per Web3Forms gemeldet. Der Besucher sieht die Bestätigung auf der Seite. Den Befund `/befund/<token>` sendet Henryk persönlich: in `/admin/leads` mit „Link kopieren“, danach den Status auf „Befund gesendet“ setzen.
- **Prüfpartner-Bewerbung** (`/fuer-pruefpartner` und Unterseiten, Abschnitt „Registrierung“): Das Formular ist nur sichtbar mit `PARTNER_FORM_ENABLED=true`, sonst führen die CTAs zu `/kontakt`. Web3Forms-Key: `NEXT_PUBLIC_WEB3FORMS_PARTNER_KEY`, falls gesetzt, sonst der bestehende Key des Kontaktformulars. Ablauf: `POST /api/partner-application` (speichern) → Web3Forms → `PATCH /api/partner-application/<id>` (Versandergebnis). Freitexte (weitere Qualifikationen, Nachricht) stehen nur in `/admin/partner`, nicht in der E-Mail. Ohne `DATABASE_URL` geht die Bewerbung nur per Web3Forms ein.
- **Admin** `/admin/partner`: Filter, Suche, CSV-Export, Zähler, Detailansicht mit Notizen und Verlauf. Status neu → in Prüfung → qualifiziert/abgelehnt; „aktiv“ nur über „Freigeben“. Endgültiges Löschen mit Bestätigung; das Löschprotokoll enthält keine personenbezogenen Daten.
- **Bereinigung** (`/api/cron/cleanup`, täglich, `CRON_SECRET`): Prüfpartner-Bewerbungen `PARTNER_RETENTION_DAYS` (Standard 365) nach dem letzten Statuswechsel, „aktiv“ nie; Nullmessungs-Anfragen im Status „neu“ 30 Tage nach Bereitstellung des Befunds. Lokal simuliert `?days=<n>` die Zeit.
- Kopien der Benachrichtigungen im Postfach und im Web3Forms-Konto löscht Henryk selbst nach derselben Frist.

## Domain

In Vercel unter Settings → Domains `www.betreibermanager.de` als Primary (Production) und `betreibermanager.de` als 308-Weiterleitung auf www eintragen. Die Weiterleitung übernimmt allein Vercel – keine Host-Weiterleitung in `next.config.ts` anlegen, sonst entsteht eine Redirect-Schleife. `site.url` in `lib/site.ts` muss auf dieselbe Primärdomain zeigen. `*.vercel.app` wird per `X-Robots-Tag: noindex` gesperrt (`next.config.ts`). Nach dem Launch Sitemap (`/sitemap.xml`) in Google Search Console und Bing Webmaster Tools einreichen.

## Indexierung

- **Sitemap** (`app/sitemap.ts`) wird aus den Routing-Daten erzeugt, nur kanonische URLs, `lastmod` je Seitengruppe bzw. Artikel-`modified`.
- **Search Console / Bing**: Verifizierungscode als `GOOGLE_SITE_VERIFICATION` bzw. `BING_SITE_VERIFICATION` in Vercel setzen (oder Domain per DNS-TXT verifizieren), dann Sitemap einreichen. Bing kann die Property aus der Search Console importieren.
- **IndexNow**: Schlüsseldatei liegt in `public/`. Nach einem Deployment `npm run indexnow` (ganze Sitemap) oder `npm run indexnow -- /wissen/<slug>` (einzelne URLs).
- **llms.txt** (`app/llms.txt/route.ts`): rund 20 Kernseiten, Firmierung und Sitz erscheinen automatisch, sobald in `lib/site.ts` eingetragen.
