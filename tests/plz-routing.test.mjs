// Tests für das regionale Lead-Routing: `npm test` (node:test, keine zusätzlichen Pakete; Node 22 lädt .ts direkt)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bundeslandForPlz, findSlot } from "../lib/plz-routing.ts";

const json = (f) => JSON.parse(readFileSync(new URL(`../content/partners/${f}`, import.meta.url), "utf8"));
const table = json("plz-bundesland.json");
const regionen = json("regionen.json");

test("drei Beispiel-PLZ werden dem richtigen Bundesland zugeordnet", () => {
  assert.equal(bundeslandForPlz("80331", table), "bayern"); // München
  assert.equal(bundeslandForPlz("20095", table), "hamburg"); // Hamburg
  assert.equal(bundeslandForPlz("50667", table), "nordrhein-westfalen"); // Köln
});

test("Sonderbereiche haben Vorrang vor dem Zweistellen-Raster", () => {
  assert.equal(bundeslandForPlz("14050", table), "berlin"); // Berlin-Spandau, sonst Brandenburg (14xxx)
  assert.equal(bundeslandForPlz("14467", table), "brandenburg"); // Potsdam
});

test("ungültige oder unbekannte PLZ ergibt null", () => {
  assert.equal(bundeslandForPlz("1234", table), null);
  assert.equal(bundeslandForPlz("abcde", table), null);
  assert.equal(bundeslandForPlz("00000", table), null);
});

test("alle Bundesländer der Tabelle stehen in regionen.json", () => {
  const known = new Set(regionen.map((r) => r.slug));
  assert.equal(regionen.length, 16);
  for (const r of table) assert.ok(known.has(r.bundesland), r.bundesland);
});

test("ausgelieferte slots.json: alle frei, daher nie ein Partner", () => {
  const slots = json("slots.json");
  assert.ok(slots.length > 0);
  assert.ok(slots.every((s) => s.status === "frei" && !s.partnerSlotId));
  assert.equal(findSlot(slots, "dguv-v3", "schulen", "bayern"), null);
});

test("vergebener Slot greift nur für sein Bundesland; Objektart-Slot vor allgemeinem; bundesweit zuletzt", () => {
  const slots = [
    { thema: "dguv-v3", region: "bayern", status: "vergeben", partnerSlotId: "a" },
    { thema: "dguv-v3", objektart: "schulen", region: "bayern", status: "vergeben", partnerSlotId: "b" },
    { thema: "dguv-v3", region: "bundesweit", status: "vergeben", partnerSlotId: "c" },
    { thema: "uvv", region: "hamburg", status: "frei" },
  ];
  assert.equal(findSlot(slots, "dguv-v3", "schulen", "bayern")?.partnerSlotId, "b");
  assert.equal(findSlot(slots, "dguv-v3", "kliniken", "bayern")?.partnerSlotId, "a");
  assert.equal(findSlot(slots, "dguv-v3", "kliniken", "hamburg")?.partnerSlotId, "c");
  assert.equal(findSlot(slots, "uvv", "schulen", "hamburg"), null);
  assert.equal(findSlot(slots, "dguv-v3", "schulen", null), null); // PLZ unbekannt → Fallback
});
