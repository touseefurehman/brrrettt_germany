# Rank & Rent: Landingpages (Objekttyp × Prüfbereich)

Datengetriebenes System für Landingpages mit je einem mietbaren Partnerplatz. Alle Texte deutsch, keine CMS-Abhängigkeit.
**Die echten Inhalte kommen erst nach der Scoring-Analyse**, die entscheidet, welche Seiten gebaut werden. Die Beispielseiten
(Schulen · DGUV V3 / Brandschutz) sind Platzhalter im Status `draft`.

## URL-Struktur

| URL | Inhalt |
| --- | --- |
| `/pruefpflichten` | Übersicht aller veröffentlichten Objekttypen (ohne veröffentlichtes Objekt: 404) |
| `/pruefpflichten/[objekt]` | Objekt-Hub, z. B. `/pruefpflichten/schulen` |
| `/pruefpflichten/[objekt]/[slug]` | Landingpage, z. B. `/pruefpflichten/schulen/dguv-v3-pruefung` (Segment = `slug` der Landingpage) |
| `/fuer-pruefpartner` | Vertriebsseite für Prüfbetriebe mit Verfügbarkeitsformular (sofort live) |

## Dateien

- `objekte.json` – Objekttypen: `slug, name, h1, intro, audience, metaTitle, metaDescription, faq[], status`
- `pruefbereiche.json` – Prüfbereiche: `slug, name, legalBasis[], defaultIntervals, formFields[]`
  (Feldtypen: `select, multiselect, number, text, boolean, date`; `options[]` für select/multiselect)
- `landingpages.json` – eine Zeile je Kombination: `id, objekt, pruefbereich, slug, h1, shortAnswer, heroText, sections[], faq[] (4–6),
  legalBasis, costRange{text,note}, metaTitle (max. 65 Zeichen), metaDescription, partnerSlotId, status, priorityScore,
  trackingPrompts[], published, updated`
- `partners.json` – nach `partnerSlotId`: `name, logo, certifications[], region, quote, ctaText, ctaUrl, leadEmail, active`

`sections[].content` ist Markdown (Absätze, `###`, Listen, Tabellen, `**fett**`, `[Text](/pfad)`). Der Build bricht bei
Inkonsistenzen ab (doppelte IDs/URLs/Slots, unbekannte Objekte/Prüfbereiche, zu lange Titel, FAQ nicht 4–6, Objekt nicht veröffentlicht).

## Neues anlegen

1. **Objekt**: Eintrag in `objekte.json` (`status: "draft"`).
2. **Prüfbereich**: Eintrag in `pruefbereiche.json` inkl. `formFields`. Rechtsgrundlagen-Begriffe, die verlinkt werden sollen,
   stehen in `lib/rank-rent.ts` (`legalSources`).
3. **Landingpage**: Eintrag in `landingpages.json` mit eindeutiger `id`, `partnerSlotId` (z. B. `schulen-dguv-v3`) und `status: "draft"`.

## Veröffentlichen

`status` auf `"published"` setzen (Objekt **und** Landingpage), committen, pushen. Nur veröffentlichte Einträge bekommen Routen,
erscheinen in Hubs und Sitemap. Der Footer-Link auf `/pruefpflichten` erscheint automatisch, sobald ein Objekt veröffentlicht ist.

**Entwürfe ansehen** (nie indexiert, `noindex`): `npm run dev` zeigt sie direkt unter ihrer URL. Für einen lokalen Produktions-Build:
`RANK_RENT_PREVIEW=1 npm run build && npm start`. Auf Vercel Production wird der Vorschau-Modus immer ignoriert.

## Partner aktivieren

In `partners.json` unter der `partnerSlotId` eintragen und `active: true` setzen. Erst dann erscheinen Name, Logo und Zitat
(Modus B, gekennzeichnet als „Anzeige“, Links `rel="sponsored noopener"`) und Anfragen gehen an `leadEmail`. Ohne aktiven Eintrag
zeigt die Seite die neutrale Box (Modus A) mit dem Hinweis auf `/fuer-pruefpartner`, Anfragen gehen an `LEAD_FALLBACK_EMAIL`.
Deaktivieren: `active: false`.

## E-Mail-Versand und Umgebungsvariablen

Versand über **Web3Forms** (derselbe Access Key wie das Kontaktformular). Alle Anfragen kommen im Postfach des Keys an.
Web3Forms kennt kein BCC und kein Routing: Oben in der Mail steht „WEITERLEITEN AN PARTNER: …“ (Slot gemietet) bzw.
„KEIN PARTNER GEMIETET“. Mit Web3Forms-Pro (`WEB3FORMS_PRO=1`) geht die Mail zusätzlich direkt als CC an den Partner.

| Variable | Zweck |
| --- | --- |
| `WEB3FORMS_ACCESS_KEY` | optional; Standard ist der Key aus `components/ContactForm.tsx` |
| `WEB3FORMS_PRO` | optional, `1` nur mit Pro-Tarif: Partner-Adresse als `ccemail` |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` (oder `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) | optional: Upstash Redis (Vercel Marketplace) für Lead-Speicher und Rate-Limit. Ohne sie ist die Mail das Archiv. |

Lokal testen: `LEAD_DRY_RUN=1` schreibt die Anfrage in die Server-Konsole statt sie zu senden.
Hinweis: Web3Forms erlaubt Server-seitige Aufrufe ggf. nur in bezahlten Tarifen. Schlägt der Versand fehl, zeigt das Formular eine Fehlermeldung.

Leads liegen in Redis als Listen `rankrent:leads` und `rankrent:partner-requests` (JSON je Eintrag, inkl. Einwilligungs-Zeitstempel).
Spam-Schutz: Honeypot, Mindestausfüllzeit 3 s, 5 Anfragen pro Stunde und IP.
