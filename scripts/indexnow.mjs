// Meldet alle URLs der Live-Sitemap per IndexNow an Bing, Yandex, Seznam & Co. (GEO-Audit, Aufgabe 1.5).
// Nach jedem Deployment mit neuen oder geänderten Seiten ausführen: `npm run indexnow`
// Nur bestimmte URLs melden: `npm run indexnow -- /wissen/neuer-artikel /dguv-v3-pruefung`
// Der Schlüssel liegt als Datei unter public/<key>.txt und muss live erreichbar sein.

const host = "www.betreibermanager.de";
const key = "5f17cc62bf13b379cdf06b7838a6f8a9";

const paths = process.argv.slice(2);
const urls = paths.length
  ? paths.map((p) => `https://${host}${p.startsWith("/") ? p : `/${p}`}`)
  : [...(await (await fetch(`https://${host}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});

// 200/202 = angenommen; 403 = Schlüsseldatei nicht erreichbar; 422 = URLs passen nicht zum Host
console.log(`${urls.length} URLs gemeldet – HTTP ${res.status} ${res.statusText}`);
if (!res.ok) process.exit(1);
