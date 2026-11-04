// Leistungskatalog für /leistungen (Master-Portfolio Teil 2).
// Bewusst eine Übersichtsseite statt einer Seite je Leistung (SEO-Konzept K-01/K-05: eigene Seite nur bei
// belegtem Suchvolumen). `href` verweist auf eine bestehende Seite, die die Leistung bereits ausführlich behandelt.
// Eine Leistung lässt sich im Formular vorwählen: /leistungen?leistung=<slug>#anfrage

export type KatalogLeistung = { name: string; href?: string };
export type KatalogBereich = { slug: string; name: string; intro: string; items: KatalogLeistung[] };

export const leistungskatalog: KatalogBereich[] = [
  {
    slug: "pruefservices-dguv-vde",
    name: "Gesetzliche Prüfservices (DGUV & VDE)",
    intro: "Wiederkehrende Prüfungen elektrischer Anlagen und Arbeitsmittel durch befähigte Personen nach TRBS 1203.",
    items: [
      { name: "DGUV Vorschrift 3 Prüfung (ortsveränderliche Betriebsmittel)", href: "/dguv-v3-pruefung" },
      { name: "DGUV Vorschrift 3 / VDE 0105-100 (ortsfeste elektrische Anlagen)", href: "/dguv-v3-pruefung" },
      { name: "VDE 0751 / DIN EN 62353 Prüfung (medizinische Geräte)" },
      { name: "DGUV Vorschrift 4 (Prüfung in öffentlichen Einrichtungen/Schulen)", href: "/betreiberpflichten/kommunen" },
      { name: "DGUV Vorschrift 52 / 54 (Kran- & Hebezeugprüfung)", href: "/uvv-pruefung" },
      { name: "DGUV Regel 108-007 (Regalanlagen / DIN EN 15635)", href: "/regalpruefung" },
      { name: "DGUV Vorschrift 68 (Flurförderzeuge & Gabelstapler)", href: "/wissen/uvv-pruefung-stapler" },
      { name: "DGUV Regel 112-198 (PSAgA gegen Absturz)" },
      { name: "Prüfung elektrischer Pflegebetten nach DIN EN 60601-2-38", href: "/betreiberpflichten/krankenhaeuser" },
      { name: "Prüfung von Leitern, Tritten & Fahrgerüsten" },
    ],
  },
  {
    slug: "brandschutz",
    name: "Brandschutz, Rauch- & Entrauchungsanlagen",
    intro: "Wartung und Prüfung der Anlagen des vorbeugenden Brandschutzes sowie Flucht- und Feuerwehrpläne.",
    items: [
      { name: "Wartung & Prüfung von Brandschutztüren & Feststellanlagen", href: "/pruefbereiche/brandschutz" },
      { name: "RWA-Anlagen Wartung (Rauch- & Wärmeabzugsanlagen)", href: "/pruefbereiche/brandschutz" },
      { name: "Wandhydranten- & Steigleitungen-Prüfung nach DIN 14462", href: "/pruefbereiche/brandschutz" },
      { name: "Sprinkleranlagen-Wartung & VdS-Prüfservice" },
      { name: "Feuerlöscher-Wartung & Füllservice B2B", href: "/feuerloescher-pruefung" },
      { name: "Erstellung von Flucht- & Rettungsplänen nach DIN ISO 23601" },
      { name: "Erstellung von Feuerwehrplänen nach DIN 14095" },
      { name: "Brandabschottungen & Weichschott-Sanierung" },
      { name: "Gaslöschanlagen-Wartung (CO2, Novec, Inergen)" },
      { name: "Rauchansaugsysteme (RAS) Wartung in Rechenzentren" },
    ],
  },
  {
    slug: "heizung-lueftung-klima",
    name: "Heizung, Lüftung, Klima & Kälte (RLT)",
    intro: "Hygiene, Dichtheit und Instandhaltung von RLT-, Kälte- und Heizungsanlagen sowie Trinkwasser.",
    items: [
      { name: "RLT-Anlagen-Hygienekontrolle nach VDI 6022", href: "/vdi-6022" },
      { name: "Kühlturm- & Verdunstungskühlanlagen nach 42. BImSchV" },
      { name: "Trinkwasser-Legionellenprüfung & VDI 6023 Beprobung", href: "/legionellenpruefung" },
      { name: "Gewerbliche Klimaanlagen- & Chiller-Wartung", href: "/vdi-6022" },
      { name: "Kältemittel-Dichtheitsprüfung nach Verordnung (EU) 2024/573" },
      { name: "Fettabluft- & Großküchen-Lüftungsreinigung" },
      { name: "Wärmepumpen-Großanlagen Instandhaltung" },
      { name: "Pellets- & Hackschnitzel-Heizanlagen Wartung" },
      { name: "Druckverteiler- & Kesselwartung für Großimmobilien", href: "/pruefbereiche/druck-gas" },
      { name: "Hydraulischer Abgleich für Gewerbeobjekte" },
    ],
  },
  {
    slug: "aufzuege-foerdertechnik",
    name: "Aufzüge, Fördertechnik & Zugänge",
    intro: "Aufzugsprüfung durch ZÜS, Wartung von Toren, Türen, Hebebühnen und Fassadenbefahranlagen.",
    items: [
      { name: "Aufzugswartung & Notruf-Leitzentralen-Anbindung (24/7)", href: "/pruefbereiche/aufzugsanlagen" },
      { name: "Prüfservice für Personen- & Lastenaufzüge (ZÜS)", href: "/pruefbereiche/aufzugsanlagen" },
      { name: "Fahrtreppen- & Rollsteig-Wartung" },
      { name: "Automatiktüren- & Schiebetür-Prüfung nach DIN 18650" },
      { name: "Karusselltüren- & Drehtür-Service" },
      { name: "Sektionaltor- & Schnelllauftor-Wartung" },
      { name: "Schrankenanlagen- & Poller-Wartung" },
      { name: "Hebebühnen- & Verladerampen-Prüfung" },
      { name: "Fassadenbefahranlagen & Dachkran-Wartung" },
      { name: "Treppenlift- & Plattformlift-Wartung" },
    ],
  },
  {
    slug: "sicherheitstechnik",
    name: "Gebäude-Infrastruktur & Sicherheitstechnik",
    intro: "Instandhaltung von Sicherheits-, Melde- und Kommunikationsanlagen sowie Blitzschutz.",
    items: [
      { name: "Einbruchmeldeanlagen (EMA) Wartung nach VdS" },
      { name: "Videoüberwachungs- & CCTV-Systeme Instandhaltung" },
      { name: "Zutrittskontroll- & Zeiterfassungssysteme Service" },
      { name: "Blitzschutz- & Überspannungsschutz nach DIN EN 62305" },
      { name: "ELT- & Notbeleuchtungsanlagen-Wartung", href: "/pruefbereiche/brandschutz" },
      { name: "Schwachstrom- & Sprachalarmierungsanlagen (SAA)" },
      { name: "Zaunanlagen- & Perimeterschutz-Service" },
      { name: "Gegensprech- & Rufanlagen in Seniorenheimen", href: "/wissen/betreiberpflichten-pflegeheime" },
      { name: "Schließanlagen-Management & Zylinder-Service" },
      { name: "Parkleitsysteme- & Tiefgaragen-Schranken-Wartung" },
    ],
  },
  {
    slug: "gebaeudehuelle-aussenanlagen",
    name: "Umwelt, Gebäudehülle & Außenanlagen",
    intro: "Verkehrssicherung und Pflege von Dach, Fassade, Außenflächen und Entwässerung.",
    items: [
      { name: "Dachbegrünung-Pflege & Entwässerungs-Wartung" },
      { name: "Flachdach-Leckortung & Dichtigkeitsprüfung" },
      { name: "Fassadenreinigung & Hydrophobierung Großobjekte" },
      { name: "Tiefgaragen-Reinigung & Ölabscheider-Entleerung" },
      { name: "Baumpflege & Baumkontrolle nach FLL" },
      { name: "Winterdienst & Schneeräumung für Gewerbeareale" },
      { name: "Unkrautbeseitigung & Kehrdienst Großparkplätze" },
      { name: "Spielplatzprüfung nach DIN EN 1176" },
      { name: "Rückstauklappen- & Fäkalienhebeanlagen-Wartung" },
      { name: "Fettabscheider-Entleerung & Generalinspektion" },
    ],
  },
  {
    slug: "energie-pv-laden",
    name: "Energiemanagement, PV & Ladeinfrastruktur",
    intro: "Inspektion und Wartung von Energieerzeugung, Speicher, Ladepunkten und Mittelspannung.",
    items: [
      { name: "Wandler- & Zähleranlagen-Wartung Gewerbe" },
      { name: "PV-Anlagen-Inspektion mit Wärmebild-Drohne" },
      { name: "Gewerbliche Wallbox- & Ladesäulen-Wartung" },
      { name: "Batteriespeicher-Inspektion & Kapazitätstest" },
      { name: "Energieaudit nach EDL-G / DIN EN 16247" },
      { name: "Gebäude-Thermografie & Blower-Door-Test" },
      { name: "Trafo-Ölanalyse & Mittelspannungsschaltanlagen" },
    ],
  },
  {
    slug: "reinigung-schadstoffe",
    name: "Reinigung, Hygiene & Schadstoffsanierung",
    intro: "Sonderreinigung und Schadstoffsanierung durch zugelassene Fachbetriebe.",
    items: [
      { name: "Grundreinigung & Beschichtung von PVC/Linoleum" },
      { name: "Reinraum-Sonderreinigung (VDI 2083)" },
      { name: "Asbestsanierung im laufenden Betrieb (TRGS 519)" },
    ],
  },
  {
    slug: "fm-software-verantwortung",
    name: "FM-Software, Dokumentation & Verantwortung",
    intro: "Organisation der Betreiberverantwortung: Beauftragte, Kataster, Audits, CAFM und Bestandsdaten.",
    items: [
      { name: "CAFM-Software-Implementierung (Computer-Aided FM)" },
      { name: "Digitalisierung von Bestandsplänen & CAD-Erfassung" },
      { name: "Erstellung von Betreiberverantwortung-Audits (GEFMA 190)", href: "/betreiberverantwortung" },
      { name: "Brandschutzbeauftragter extern für Gewerbe" },
      { name: "Fachkraft für Arbeitssicherheit (SiFa) extern" },
      { name: "Gefahrstoffbeauftragter & Gefahrstoffkataster" },
      { name: "Energieausweis-Erstellung für Nichtwohngebäude" },
      { name: "Instandhaltungsstau-Ermittlung & Zustandserfassung", href: "/wissen/betreiberpflichten-objektuebernahme" },
      { name: "Technisches Due-Diligence-Gutachten", href: "/wissen/betreiberpflichten-objektuebernahme" },
    ],
  },
  {
    slug: "spezialimmobilien",
    name: "Spezial-Immobilien & Sondermärkte",
    intro: "Prüfungen für Labore, Reinräume, Bühnen, Schießstände und Hubschrauberlandeplätze.",
    items: [
      { name: "Reinraum-Monitoring & Partikelmessung" },
      { name: "Schießstand-Prüfung & Wartung (Behörden/Sport)" },
      { name: "Hubschrauberlandeplatz-Wartung auf Krankenhäusern" },
      { name: "Labor-Abzugs-Wartung nach DIN EN 14175" },
      { name: "Theater- & Bühnentechnik-Prüfung (DGUV Vorschrift 17)" },
    ],
  },
];

export function katalogSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const katalogLeistungen = leistungskatalog.flatMap((b) => b.items.map((i) => i.name));

export const katalogBySlug = (slug: string) => katalogLeistungen.find((name) => katalogSlug(name) === slug);
