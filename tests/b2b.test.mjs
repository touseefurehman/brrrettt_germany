import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { THRESHOLDS, validatePages, visibleTexts, wordCount } from "../lib/b2b-core.ts";
import { validateSchemas } from "../lib/b2b-schema.ts";

const dir = new URL("../content/b2b/", import.meta.url);
const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(new URL(f, dir), "utf8")));
const SITE = "https://www.betreibermanager.de";

test("Daten bestehen die Qualitätsschranke des Builds", () => {
  assert.deepEqual(validatePages(pages), []);
});

test("Veröffentlichte Seiten haben reviewedBy, geprüfte Links und keine [PRÜFEN]-Marker", () => {
  for (const p of pages.filter((x) => x.status === "published")) {
    assert.ok(p.reviewedBy && p.linksVerifiedManually, p.slug);
    assert.equal(/\[PRÜFEN/.test(JSON.stringify(p)), false, p.slug);
  }
});

test("Wortzahl, FAQ, Quellen, Links, Titel und Description", () => {
  for (const p of pages) {
    const w = wordCount(p);
    assert.ok(w >= THRESHOLDS.wordsMin && w <= THRESHOLDS.wordsMax, `${p.slug}: ${w} Wörter`);
    assert.ok(p.faq.length >= THRESHOLDS.faqMin && p.faq.length <= THRESHOLDS.faqMax, `${p.slug}: FAQ`);
    assert.ok(p.sources.length >= THRESHOLDS.sourcesMin, `${p.slug}: Quellen`);
    assert.ok(p.internalLinks.filter((l) => !l.href.startsWith("/pruefmanagement/")).length >= THRESHOLDS.linksMin, `${p.slug}: Links`);
    assert.ok(p.aiPrompts.length >= 5 && p.aiPrompts.length <= 8, `${p.slug}: aiPrompts`);
  }
});

test("JSON-LD ist gültig und stimmt mit dem sichtbaren Inhalt überein", () => {
  for (const p of pages) assert.deepEqual(validateSchemas(p, pages, SITE), [], p.slug);
});

test("keine verbotenen Aussagen über betreibermanager.de", () => {
  const forbidden = /zertifizier|Prüfgesellschaft|wir prüfen|garantiert|garantier/i;
  for (const p of pages) assert.equal(forbidden.test(visibleTexts(p).join("\n")), false, p.slug);
});

test("Qualitätsschranke greift: Veröffentlichung nur mit Freigabe, ohne [PRÜFEN], genug Umfang", () => {
  const base = JSON.parse(JSON.stringify(pages.find((x) => x.slug === "logistikzentren-tore")));
  const pub = { ...base, status: "published" };
  assert.deepEqual(validatePages([pub]).filter((e) => !/nicht veröffentlichte Seite/.test(e)), []);
  assert.match(validatePages([{ ...pub, reviewedBy: null }]).join(), /reviewedBy/);
  assert.match(validatePages([{ ...pub, linksVerifiedManually: undefined }]).join(), /Quellenlinks/);
  assert.match(validatePages([JSON.parse(JSON.stringify(pub).replace("Torprüfplan", "[PRÜFEN: x] Torprüfplan").replace("Tore", "Tore [PRÜFEN: x]"))]).join(), /PRÜFEN/);
  assert.match(validatePages([{ ...pub, faq: pub.faq.slice(0, 7) }]).join(), /FAQ/);
  assert.match(validatePages([{ ...pub, sources: pub.sources.slice(0, 2) }]).join(), /Quellen/);
  assert.match(validatePages([{ ...pub, kurzantwort: "Zu kurz." }]).join(), /kurzantwort/);
});
