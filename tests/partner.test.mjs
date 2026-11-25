import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { PT, PROMISES, validatePartnerPages, visibleTexts, wordCount, markerCount } from "../lib/partner-core.ts";

const dir = new URL("../content/partner/", import.meta.url);
const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(new URL(f, dir), "utf8")));

test("Prüfpartner-Seiten bestehen die Qualitätsschranke", () => assert.deepEqual(validatePartnerPages(pages), []));

test("Seiten sind Entwürfe bis zur Freigabe: nichts veröffentlicht, kein reviewedBy", () => {
  for (const p of pages) {
    assert.notEqual(p.status, "published", p.slug);
    assert.equal(p.reviewedBy, null, p.slug);
  }
});

test("Umfang, Kurzantwort, FAQ, Tabelle, kein Service-Schema", () => {
  assert.equal(pages.length, 3);
  for (const p of pages) {
    const w = wordCount(p);
    assert.ok(w >= PT.wordsMin && w <= PT.wordsMax, `${p.slug}: ${w}`);
    const k = p.kurzantwort.split(/\s+/).length;
    assert.ok(k >= 40 && k <= 60, `${p.slug}: Kurzantwort ${k}`);
    assert.ok(p.faq.length >= 6 && p.faq.length <= 10, p.slug);
    assert.ok(p.tables.length >= 1, p.slug);
    assert.equal(JSON.stringify(p).includes('"Service"'), false, p.slug);
  }
});

test("keine Versprechen: garantiert, Auftragsgarantie (außer als „Nein“ in der FAQ), bestehende Kunden, bundesweit abgedeckt, Rahmenvertrag mit <Firma>", () => {
  for (const p of pages) {
    const rest = [p.h1, p.kurzantwort, ...p.sections.map((s) => s.content), ...p.tables.flatMap((t) => t.rows.flat()),
      ...p.faq.filter((f) => !(/garantier|Auftragsgarantie/i.test(f.question) && /^Nein/.test(f.answer))).flatMap((f) => [f.question, f.answer])].join("\n");
    assert.equal(PROMISES.test(rest), false, p.slug);
  }
  const garantie = pages.flatMap((p) => p.faq.filter((f) => /garantier|Auftragsgarantie/i.test(f.question)));
  assert.ok(garantie.length >= 3, "jede Seite beantwortet die Garantiefrage");
  for (const f of garantie) assert.match(f.answer, /^Nein/);
});

test("Qualifikation nur allgemein: keine pauschalen Prüffristen, Link auf TRBS 1203", () => {
  for (const p of pages) {
    const t = visibleTexts(p).join("\n");
    assert.equal(/\b(alle \d|mindestens (alle|einmal|jährlich)|Regelwert)/i.test(t), false, `${p.slug}: Frist im Text`);
  }
  for (const s of ["rahmenvertraege", "dguv-v3", "subunternehmer"]) {
    const p = pages.find((x) => x.slug === s);
    assert.ok(p.sources.some((x) => x.url === "https://www.baua.de/DE/Angebote/Regelwerk/TRBS/TRBS-1203.html"), s);
  }
});

test("Veröffentlichung nur mit reviewedBy, geprüften Links und ohne Marker", () => {
  const p = JSON.parse(JSON.stringify(pages[0]));
  const pub = { ...p, status: "published" };
  assert.match(validatePartnerPages([pub]).join(), /reviewedBy/);
  assert.match(validatePartnerPages([{ ...pub, reviewedBy: "X", linksVerifiedManually: undefined }]).join(), /Links/);
  assert.match(validatePartnerPages([{ ...pub, reviewedBy: "X", kurzantwort: pub.kurzantwort + " [PRÜFEN: x]" }]).join(), /PRÜFEN/);
  assert.match(validatePartnerPages([{ ...p, faq: p.faq.slice(0, 5) }]).join(), /FAQ/);
});
