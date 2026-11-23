#!/usr/bin/env node
// Messlauf je Cluster: node tools/report-engine/measure.mjs <slug> [--mock] [--all]
// Schreibt content/measurements/<slug>-<YYYY-MM>.json (Mock: <slug>-<YYYY-MM>.mock.json, "mock": true).
// Echte Läufe brauchen OPENAI_API_KEY, PERPLEXITY_API_KEY und GEMINI_API_KEY. Ein Mock-Lauf wird nie als
// latestMeasurementFile eingetragen und kann nie auf einer veröffentlichten Seite erscheinen (Build bricht ab).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMeasurement, normDomain } from "./aggregate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const clustersPath = join(root, "content", "clusters.json");

const args = process.argv.slice(2);
const mock = args.includes("--mock");
const slugs = args.includes("--all") ? readJson(clustersPath).map((c) => c.slug) : args.filter((a) => !a.startsWith("--"));
if (slugs.length === 0) {
  console.error("Aufruf: measure.mjs <cluster-slug> [--mock]  |  measure.mjs --all [--mock]");
  process.exit(1);
}

const KEYS = { chatgpt: "OPENAI_API_KEY", perplexity: "PERPLEXITY_API_KEY", gemini: "GEMINI_API_KEY" };

async function ask(engine, text) {
  const key = process.env[KEYS[engine]];
  if (engine === "chatgpt") {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o", tools: [{ type: "web_search_preview" }], input: text }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const j = await res.json();
    const parts = (j.output ?? []).filter((o) => o.type === "message").flatMap((o) => o.content ?? []);
    return {
      text: parts.map((p) => p.text ?? "").join("\n"),
      urls: parts.flatMap((p) => (p.annotations ?? []).filter((a) => a.type === "url_citation").map((a) => a.url)),
    };
  }
  if (engine === "perplexity") {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "sonar", messages: [{ role: "user", content: text }] }),
    });
    if (!res.ok) throw new Error(`Perplexity ${res.status}`);
    const j = await res.json();
    return { text: j.choices?.[0]?.message?.content ?? "", urls: j.citations ?? [] };
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text }] }], tools: [{ google_search: {} }] }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const j = await res.json();
  const cand = j.candidates?.[0];
  // Gemini liefert Weiterleitungs-URLs; der Titel des Chunks ist die Domain der Quelle
  return {
    text: (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("\n"),
    urls: (cand?.groundingMetadata?.groundingChunks ?? []).map((c) => c.web?.title ?? c.web?.uri).filter(Boolean),
  };
}

const mentionsIn = (text, brands) => {
  const hay = text.toLowerCase();
  return brands
    .filter((b) => [b.name, ...(b.aliases ?? [])].some((n) => hay.includes(n.toLowerCase())))
    .map((b) => b.name);
};

function mockAnswers(prompts, brands, engines) {
  // Deutlich erkennbare Testdaten, nur für die Entwicklung
  const names = brands.length ? brands : [{ name: "Mock-Anbieter A", domain: "mock-a.example" }, { name: "Mock-Anbieter B", domain: "mock-b.example" }];
  const list = prompts.length ? prompts : [{ id: "mock-1", text: "Mock-Frage", intent: "anbietercheck" }];
  return list.flatMap((p, pi) =>
    engines.map((engine, ei) => ({
      promptId: p.id,
      engine,
      intent: p.intent,
      mentions: [names[(pi + ei) % names.length].name],
      citations: names.slice(0, 3).map((b, k) => ({ url: `https://${normDomain(b.domain)}/`, domain: normDomain(b.domain), position: k + 1 })),
    })),
  );
}

for (const slug of slugs) {
  const cluster = readJson(clustersPath).find((c) => c.slug === slug);
  if (!cluster) throw new Error(`Unbekannter Cluster: ${slug}`);
  const topic = readJson(join(root, "tools/report-engine/topics", `${slug}.json`));
  const brandsFile = join(root, "tools/report-engine/topics", `${slug}.brands.json`);
  const brands = existsSync(brandsFile) ? readJson(brandsFile).brands : [];
  const engines = topic.engines;

  for (const p of topic.prompts) {
    if (!["beauftragung", "anbietercheck"].includes(p.intent)) throw new Error(`${slug}: Frage ${p.id} ohne gültigen intent`);
  }
  if (topic.prompts.length === 0 && !mock) {
    console.warn(`${slug}: Fragenset leer – übersprungen (siehe tools/report-engine/topics/${slug}.json)`);
    continue;
  }
  if (!mock) {
    const missing = engines.map((e) => KEYS[e]).filter((k) => !process.env[k]);
    if (missing.length) throw new Error(`Fehlende API-Schlüssel: ${missing.join(", ")} (oder --mock verwenden)`);
  }

  let answers;
  if (mock) answers = mockAnswers(topic.prompts, brands, engines);
  else {
    answers = [];
    for (const p of topic.prompts) {
      for (const engine of engines) {
        const r = await ask(engine, p.text);
        answers.push({
          promptId: p.id,
          engine,
          intent: p.intent,
          mentions: mentionsIn(r.text, brands),
          citations: r.urls.map((url, k) => ({ url, domain: normDomain(url), position: k + 1 })),
        });
      }
    }
  }

  const now = new Date();
  const month = now.toISOString().slice(0, 7);
  const day = now.toISOString().slice(0, 10);
  const m = buildMeasurement({
    cluster: slug,
    month,
    dateLabel: new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(now),
    temporalCoverage: day,
    engines,
    promptCount: topic.prompts.length || new Set(answers.map((a) => a.promptId)).size,
    answers,
    brands,
    partnerName: cluster.partnerName,
    mock,
  });
  const file = `${slug}-${month}${mock ? ".mock" : ""}.json`;
  writeFileSync(join(root, "content/measurements", file), JSON.stringify(m, null, 2) + "\n");
  console.log(`${slug}: ${answers.length} Antworten → content/measurements/${file}${mock ? " (MOCK)" : ""}`);
  if (!mock) {
    const all = readJson(clustersPath);
    all.find((c) => c.slug === slug).latestMeasurementFile = file;
    writeFileSync(clustersPath, JSON.stringify(all, null, 2) + "\n");
  }
}
