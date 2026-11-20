# Share-of-Voice-Inhalte: KI-Report und Fachbeiträge

| URL | Inhalt |
| --- | --- |
| `/report` | Übersicht aller Reports |
| `/report/ki-report-dguv-v3-2026` | KI-Report DGUV V3 2026 (Daten: `ki-report-dguv-v3-2026.json`) |
| `/fachbeitraege` | Übersicht der Fachbeiträge – **404, solange kein Beitrag veröffentlicht ist** |
| `/fachbeitraege/[slug]` | Fachbeitrag (Daten: `fachbeitraege-themen.json`) |

Loader und Typen: `lib/sov.ts`. Seiten: `components/sov/`, `app/report/`, `app/fachbeitraege/`.
Texte werden unverändert aus dem JSON gerendert (`content` und `sections[].content` sind Markdown wie bei Rank & Rent).

## Report mit neuen Messdaten aktualisieren

1. **Gleicher Report, neue Messung:** Zahlen und Texte in `ki-report-dguv-v3-2026.json` ersetzen (`period`, `methodology`,
   `keyFindings`, `byEngine`, `byCategory`, `shortAnswer`, `findings`, `datePublished`). Messzeitraum für das Dataset-Schema
   steht als `temporalCoverage` in `lib/sov.ts` (ISO, z. B. `2027-02-01/2027-02-03`).
   Achtung: Zahlen im Fließtext (`shortAnswer`, `findings`, `faq`) werden nicht automatisch angepasst.
2. **Neuer Report** (z. B. 2027): neue JSON-Datei mit gleicher Struktur und neuem `slug` anlegen und in `lib/sov.ts` im
   Array `reports` ergänzen (`shortTitle`, `temporalCoverage`). Der neueste Report (nach `datePublished`) erscheint
   automatisch in den Linkboxen (Elektroprüfung-Hub, `/fachpartner`, Footer); Sitemap und `/report` listen alle.
3. Diagramme: Befund 1–4 bekommen der Reihe nach Top-10-Domains, Quellentypen gesamt, Quellen pro Antwort und
   Quellentypen je KI-System. Werte erscheinen mit einer Nachkommastelle (`4,0 %`).
4. Prüfen: `npm run build && npm start`, dann `node scripts/check-sov.mjs http://localhost:3000`
   (vergleicht jede angezeigte Zahl mit dem JSON, prüft JSON-LD, Sitemap, Linkboxen und die 404 der Entwürfe).
   Nach dem Deploy: `node scripts/check-sov.mjs https://www.betreibermanager.de`.

## Fachbeitrag veröffentlichen

Die 8 Themen sind Entwürfe (`status: "draft"`) mit `title`, `angle` (intern, wird nicht angezeigt), `legalBasis[]`, `relatedPages[]`.
Zum Veröffentlichen ergänzen:

- `shortAnswer` – Kurzantwort, erster Absatz
- `sections[]` – `{ "heading": "...", "content": "Markdown" }`
- `faq[]` – optional, `{ "question", "answer" }` (erzeugt FAQPage-Schema)
- `metaTitle` (max. 65 Zeichen), `metaDescription`, `datePublished` (ISO), optional `dateModified`

Außerdem (Fassung 2): `author`, `reviewedBy` (Name und Qualifikation der fachlich prüfenden Person – **Pflicht zur Veröffentlichung**, derzeit `null`), `lastReviewed`, `legalStatus`, `disclaimer`; `showPartnerCta` blendet die Prüfpartner-Box ein (Standard aus).

Dann `status: "published"`. Der Build bricht ab, wenn ein veröffentlichter Beitrag Pflichtfelder vermissen lässt.
Mit dem ersten veröffentlichten Beitrag werden `/fachbeitraege` (gruppiert nach `type`: `kontraer` / `zukunft`),
der Footer-Link und der Sitemap-Eintrag automatisch aktiv.

Rechtsgrundlagen werden über die Linkliste `legalSources` in `lib/rank-rent.ts` mit Primärquellen verlinkt; neue Regelwerke dort ergänzen.

**Entwürfe ansehen** (`noindex`, mit Platzhaltern für fehlenden Text): `npm run dev`, dann `/fachbeitraege/<slug>`.
Auf Vercel Production sind Entwürfe nie erreichbar.
