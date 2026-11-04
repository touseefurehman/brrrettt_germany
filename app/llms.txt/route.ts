import { audiences, externerBetreibermanager } from "@/lib/leistungen";
import { leistungsseiten } from "@/lib/leistungsseiten";
import { fullCompanyName, isSet, site } from "@/lib/site";
import { articleBySlug } from "@/lib/wissen";

// /llms.txt (GEO-Audit, Aufgabe 5): Kurzüberblick für Sprachmodelle mit den rund 15 Seiten, die die Substanz tragen.
// Die Auswahl wird hier gepflegt; Titel und Beschreibungen kommen aus den Seitendaten, damit nichts auseinanderläuft.
// Bei größeren Änderungen an der Seitenstruktur die Listen unten nachziehen.
export const dynamic = "force-static";

const service = (slug: string) => {
  const p = slug === externerBetreibermanager.slug ? externerBetreibermanager : leistungsseiten.find((s) => s.slug === slug);
  if (!p) throw new Error(`llms.txt: unbekannte Leistungsseite ${slug}`);
  return link(p.name, `/${p.slug}`, p.cardText);
};

const article = (slug: string) => {
  const a = articleBySlug(slug);
  if (!a) throw new Error(`llms.txt: unbekannter Artikel ${slug}`);
  return link(a.h1, `/wissen/${a.slug}`, a.teaser);
};

const link = (title: string, path: string, note: string) => `- [${title}](${site.url}${path}): ${note.trim()}`;

export function GET() {
  const provider = isSet(site.companyName)
    ? ` betreibermanager.de ist ein Angebot der ${fullCompanyName}${isSet(site.city) ? ` mit Sitz in ${site.city}` : ""}.`
    : "";

  const body = [
    "# betreibermanager.de",
    "",
    `> Koordination von Betreiberpflichten für Gebäude und technische Anlagen in Deutschland: Pflichten ermitteln, Prüfungen mit qualifizierten Prüfpartnern organisieren, Nachweise zusammenführen.${provider}`,
    "",
    "Für Betreiber, technische Leiter und Facility Manager in Wohnungsunternehmen, Kommunen, Krankenhäusern und Unternehmen mit mehreren Standorten. Die gesetzliche Betreiberverantwortung bleibt beim Betreiber; betreibermanager.de übernimmt Ermittlung, Organisation, Koordination und Dokumentation. Alle Fristen auf der Seite sind mit Rechtsgrundlage und Fundstelle belegt.",
    "",
    "## Leistungen",
    "",
    service("betreiberpflichten"),
    service("betreiberverantwortung"),
    service(externerBetreibermanager.slug),
    link("Leistungskatalog", "/leistungen", "Alle koordinierten Prüf-, Wartungs- und Betreiberleistungen nach Gewerk."),
    link("Prüffristen", "/prueffristen", "Übersicht der Prüffristen technischer Anlagen mit Rechtsgrundlage."),
    "",
    "## Prüfbereiche",
    "",
    service("dguv-v3-pruefung"),
    link(
      "DGUV V3 Prüfung Kosten",
      "/dguv-v3-pruefung-kosten",
      "Kosten der DGUV V3 Prüfung je Gerät und Anlage nach veröffentlichten Anbieterangaben, mit Rechenbeispiel.",
    ),
    service("uvv-pruefung"),
    service("legionellenpruefung"),
    service("vdi-6022"),
    service("feuerloescher-pruefung"),
    service("regalpruefung"),
    "",
    "## Branchen",
    "",
    ...audiences.map((a) => link(`Betreiberpflichten ${a.name}`, `/betreiberpflichten/${a.slug}`, a.cardText)),
    "",
    "## Wissen",
    "",
    link("Wissen", "/wissen", "Fachartikel zu Prüffristen, Prüferqualifikation, Haftung und Organisation von Betreiberpflichten."),
    article("dguv-v3-pruefung-wie-oft"),
    article("befaehigte-person-trbs-1203"),
    article("haftung-fehlende-pruefungen"),
    article("betreiberpflichtenkataster-erstellen"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
