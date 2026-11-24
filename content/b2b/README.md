# B2B-Landingpages (Leistung × Objektart × Zielkunde)

Kommerzielle Seiten für Betreiber mit vielen Objekten. Eine JSON-Datei je Seite: `content/b2b/<slug>.json`.
Alle Seiten sind **Entwürfe**, bis sie freigegeben werden. Der Rest dieser Datei beschreibt Aufbau, Freigabe und Prüfung.

## URL-Schema

| URL | Inhalt |
| --- | --- |
| `/pruefmanagement/<objekt>` | Koordination über alle Prüfbereiche eines Objekttyps |
| `/pruefmanagement/<objekt>/<pruefbereich>` | ein Prüfbereich an einem Objekttyp |
| `/vorschau/b2b/<slug>?token=<PREVIEW_TOKEN>` | Vorschau (noindex, Banner „ENTWURF – nicht veröffentlicht“, `[PRÜFEN]` gelb) |

`slug` = URL-Pfad nach `/pruefmanagement/` mit „-“ statt „/“ (z. B. `logistikzentren-tore`).

## Felder

`slug, url, service (pruefmanagement | brandschutz | rlt-hygiene | tore | dguv-v3), objekt, zielkunde, status (draft | review | published),
reviewedBy, lastReviewed, metaTitle (≤ 60), metaDescription (≤ 158), h1, kurzantwort, sections[], tables[], faq[], sources[],
internalLinks[], internalLinksFromExisting[], aiPrompts[], primaryIntent, ctaTopic, cannibalization {relatedUrls, differentiation, decision}`

`sections[]` hat feste Reihenfolge: `zielgruppe, betreiberpflichten, pruefkategorien, regelwerke, fristen, standorte, koordination, kosten`.
Inhalt ist die Markdown-Teilmenge aus `lib/rank-rent.ts` (Absätze, `###`, Listen, `**fett**`, `[Text](/pfad)`); Tabellen stehen in `tables[]`
und werden über `sections[].table` eingebunden. FAQ, Quellen, Weiterführende Seiten und die Anfrage (`/kontakt?thema=<ctaTopic>`) folgen automatisch.

`internalLinksFromExisting` ist **nur vorbereitet**: Links bestehender Seiten auf diese Seite, erst bei Veröffentlichung einzubauen.

## Textregeln

- Nur Rechtsgrundlagen aus dem Briefing (Abschnitt 5) und der bestehenden Seite. Alles andere als `[PRÜFEN: …]` markieren.
- Keine Preise, Bewertungen, Kundenzahlen, Fallstudien, Zertifikate. Kosten nur als Faktoren.
- betreibermanager.de **koordiniert**; es prüft nicht, ist nicht zertifiziert und keine zugelassene Überwachungsstelle (ZÜS).

## Freigabe

1. Alle `[PRÜFEN]` auflösen (Henryk), `reviewedBy` und `lastReviewed` setzen.
2. `status: "published"` setzen. **Der Build bricht ab**, wenn bei `published` gilt: `reviewedBy` fehlt, ein `[PRÜFEN`-Marker enthalten ist, weniger als 1.000 Wörter, weniger als 8 FAQ oder weniger als 3 Quellen.
3. Erst dann erscheint die Seite unter ihrer URL, in `sitemap.xml` und `llms.txt`. `draft` und `review` liefern in Production 404.
4. `internalLinksFromExisting` einbauen, `npm run b2b:report`, committen.

## Prüfen

```bash
npm run b2b:report   # Wortzahl, FAQ, Quellen, Links (Ziel existiert), JSON-LD, verbotene Begriffe → deliverables/b2b-landingpages.csv
npm test             # u. a. tests/b2b.test.mjs
```

Umgebungsvariable `PREVIEW_TOKEN` (mind. 16 Zeichen) in Vercel setzen; ohne sie ist die Vorschau gesperrt (404).
