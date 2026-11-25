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

// Freigegeben von Henryk (Phase 1). Alle anderen bleiben Entwurf, bis sie ausdrücklich freigegeben werden.
const APPROVED = ["gewerbeimmobilien", "immobilienportfolios", "industriestandorte"];
test("Nur freigegebene Seiten sind veröffentlicht, mit reviewedBy", () => {
  for (const p of pages) {
    if (APPROVED.includes(p.slug)) continue;
    assert.notEqual(p.status, "published", `${p.slug} darf ohne Freigabe nicht veröffentlicht sein`);
  }
  for (const p of pages.filter((x) => x.status === "published")) assert.ok(p.reviewedBy && p.linksVerifiedManually, p.slug);
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
  const p = JSON.parse(JSON.stringify(pages.find((x) => x.slug === "logistikzentren-tore")));
  const errors = validatePages([{ ...p, status: "published" }]).join("\n");
  assert.match(errors, /reviewedBy/);
  assert.match(errors, /PRÜFEN/);
  const clean = JSON.parse(JSON.stringify({ ...p, status: "published", reviewedBy: "Test" }).replace(/\[PRÜFEN[^\]]*\]/g, "geklärt"));
  // Der Text verlinkt auf eine noch nicht veröffentlichte Seite: das muss die Schranke ebenfalls melden, sonst nichts
  const rest = validatePages([clean]);
  assert.ok(rest.length >= 1 && rest.every((e) => /nicht veröffentlichte Seite/.test(e)), rest.join("\n"));
  assert.match(validatePages([{ ...clean, faq: clean.faq.slice(0, 7) }]).join(), /FAQ/);
  assert.match(validatePages([{ ...clean, sources: clean.sources.slice(0, 2) }]).join(), /Quellen/);
});
