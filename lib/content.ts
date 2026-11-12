export type FaqEntry = [question: string, answer: string];

export const faqs: FaqEntry[] = [
  [
    "Können Sie unsere gesamten Betreiberpflichten koordinieren?",
    "Ja. Wir koordinieren Pflichtenermittlung, Prüforganisation und Dokumentation – von der Bestandsaufnahme bis zur Nachweisführung. Die eigentlichen Prüfungen erfolgen über qualifizierte Prüfpartner. Die gesetzliche Betreiberverantwortung verbleibt beim Betreiber.",
  ],
  [
    "Wie oft muss die DGUV-V3-Prüfung durchgeführt werden?",
    "Es gibt keine pauschale Frist. Die Prüffrist ergibt sich aus der Gefährdungsbeurteilung. Für ortsveränderliche Betriebsmittel nennt die DGUV Richtwerte zwischen sechs Monaten und zwei Jahren, für ortsfeste Anlagen in der Regel vier Jahre. In Büroumgebungen sind längere Intervalle möglich, auf Baustellen deutlich kürzere. Wir ermitteln die für Ihre Anlagen passende Frist und dokumentieren die Begründung.",
  ],
  [
    "Wer darf eine DGUV-V3-Prüfung durchführen?",
    "Die Prüfung muss von einer befähigten Person nach TRBS 1203 durchgeführt werden. Das setzt eine elektrotechnische Ausbildung, einschlägige Berufserfahrung und eine zeitnahe berufliche Tätigkeit im Prüfbereich voraus. Wir beauftragen ausschließlich Prüfpartner, die diese Anforderungen nachweisen.",
  ],
  [
    "Was passiert, wenn eine Prüffrist überschritten wird?",
    "Der Versicherungsschutz kann eingeschränkt sein, und bei einem Schadensfall stellt sich die Frage nach einer Organisationspflichtverletzung. Bei Kontrollen durch Berufsgenossenschaft oder Aufsichtsbehörde drohen Beanstandungen bis hin zu Bußgeldern. Entscheidend ist, dass die Fristüberschreitung erkannt und nachgeholt wird – deshalb steht das Fristenmanagement im Zentrum unserer Leistung.",
  ],
  [
    "Kann ich die Betreiberverantwortung vollständig abgeben?",
    "Nein. Die gesetzliche Betreiberverantwortung verbleibt immer beim Betreiber und lässt sich nicht auslagern. Delegierbar sind die Aufgaben: Ermittlung, Organisation, Koordination und Dokumentation. Genau diese Aufgaben übernehmen wir, während die Verantwortung bei Ihnen bleibt.",
  ],
  [
    "Muss ich mehrere Prüforganisationen selbst koordinieren?",
    "Nein. Sie haben bei uns einen zentralen Ansprechpartner. Wir übernehmen die Abstimmung zwischen den geeigneten Prüfpartnern, die Terminorganisation und die Zusammenführung der Nachweise.",
  ],
  [
    "Wie ermitteln Sie die für uns relevanten Pflichten?",
    "Wir betrachten Anlagenart, Nutzung, Gebäudetyp und den bestehenden Prüfstatus. Auf dieser Grundlage werden relevante Vorschriften – etwa BetrSichV, DGUV Vorschrift 3, ArbStättV, VDI 6022 und die Systematik der GEFMA 190 –, Prüffristen, Zuständigkeiten und Dokumentationspflichten ermittelt.",
  ],
  [
    "Können mehrere Standorte gemeinsam betreut werden?",
    "Auch für mehrere Standorte können Prüfbedarf, Termine und Dokumentation zentral koordiniert werden. Den konkreten Umfang stimmen wir individuell mit Ihnen ab.",
  ],
  [
    "Arbeiten Sie mit zugelassenen Prüfstellen?",
    "Gesetzlich vorgeschriebene Prüfungen koordinieren wir über qualifizierte Prüforganisationen und, wo erforderlich, zugelassene Überwachungsstellen (ZÜS). Angaben zu Zulassungen und Zertifizierungen klären wir projektbezogen.",
  ],
  [
    "Kann ich auch eine einzelne Anlagenprüfung anfragen?",
    "Ja. Beschreiben Sie Ihre Anlage und den gewünschten Prüfbereich. Wir prüfen, ob sich die Leistung über einen geeigneten Partner in unserem Netzwerk koordinieren lässt.",
  ],
];

/** Eine Zeile der Prüffristen-Übersicht: Anlagenart, Prüfung, Richtfrist, Rechtsgrundlage */
export type DeadlineRow = [asset: string, check: string, interval: string, basis: string];

export type AreaSlug = "dguv-v3-pruefung" | "brandschutz" | "aufzugsanlagen" | "lueftung-klima" | "druck-gas";

export type Area = {
  slug: AreaSlug;
  name: string;
  /** Kurztext der Karte auf der Startseite (inkl. Fristangabe) */
  cardText: string;
  norm: string;
  title: string;
  description: string;
  h1: string;
  serviceType: string;
  intro: string[];
  scope: string[];
  rows: DeadlineRow[];
  tasks: string[];
};

export const areas: Area[] = [
  {
    slug: "dguv-v3-pruefung",
    name: "Elektrotechnik",
    cardText:
      "Ortsfeste Anlagen und ortsveränderliche Betriebsmittel. Prüffristen nach DGUV Vorschrift 3 und der Gefährdungsbeurteilung.",
    norm: "DGUV Vorschrift 3 · VDE",
    title: "DGUV V3 Prüfung koordinieren – Fristen und Nachweise",
    description:
      "Wir organisieren die DGUV-V3-Prüfung Ihrer elektrischen Anlagen: befähigte Prüfer, abgestimmte Termine, lückenlose Dokumentation.",
    h1: "DGUV V3 Prüfung: ortsfeste Anlagen und ortsveränderliche Betriebsmittel",
    serviceType: "Koordination der DGUV-V3-Prüfung",
    intro: [
      "Die DGUV Vorschrift 3 verpflichtet Unternehmer, elektrische Anlagen und Betriebsmittel vor der ersten Inbetriebnahme und danach in bestimmten Zeitabständen auf ihren ordnungsgemäßen Zustand prüfen zu lassen. Die konkrete Frist legt der Betreiber über die Gefährdungsbeurteilung nach § 3 BetrSichV fest; die Tabellen 1A und 1B der Durchführungsanweisung zur DGUV Vorschrift 3 liefern dafür Richtwerte.",
      "Ortsfeste elektrische Anlagen werden nach DIN VDE 0105-100 geprüft, ortsveränderliche Betriebsmittel nach DIN EN 50699 (VDE 0702), nach Instandsetzung nach DIN EN 50678 (VDE 0701). Prüfen darf eine befähigte Person nach TRBS 1203 – in der Regel eine Elektrofachkraft mit geeigneter Messtechnik.",
    ],
    scope: [
      "Ortsfeste Anlagen: Verteiler, Unterverteilungen, fest angeschlossene Maschinen und Beleuchtung",
      "Ortsveränderliche Betriebsmittel: Geräte mit Stecker, Verlängerungsleitungen, Mehrfachsteckdosen",
      "Fehlerstrom-Schutzeinrichtungen (RCD) inklusive Auslöseprüfung",
      "Prüfprotokolle, Prüfplaketten und Mängellisten je Anlage und Standort",
    ],
    rows: [
      ["Elektrische Anlagen und ortsfeste Betriebsmittel", "Wiederholungsprüfung", "4 Jahre", "DGUV Vorschrift 3, Tabelle 1A"],
      ["Elektrische Anlagen in Räumen besonderer Art (DIN VDE 0100 Gruppe 700)", "Wiederholungsprüfung", "1 Jahr", "DGUV Vorschrift 3, Tabelle 1A"],
      ["Ortsveränderliche Betriebsmittel", "Wiederholungsprüfung", "Richtwert 6 Monate, auf Baustellen 3 Monate; bei Fehlerquote unter 2 % bis 1 Jahr (Werkstatt) bzw. 2 Jahre (Büro)", "DGUV Vorschrift 3, Tabelle 1B"],
      ["Fehlerstrom-Schutzeinrichtungen in stationären Anlagen", "Betätigen der Prüftaste durch den Benutzer", "6 Monate", "DGUV Vorschrift 3, Tabelle 1A"],
      ["Fehlerstrom-Schutzeinrichtungen in nichtstationären Anlagen", "Betätigen der Prüftaste durch den Benutzer", "arbeitstäglich", "DGUV Vorschrift 3, Tabelle 1A"],
    ],
    tasks: [
      "Bestand an Anlagen und Betriebsmitteln erfassen und Prüffristen begründet festlegen",
      "Befähigte Prüfer nach TRBS 1203 beauftragen und Termine mit dem Betriebsablauf abstimmen",
      "Prüfprotokolle zentral ablegen, Mängel nachverfolgen und Folgetermine überwachen",
    ],
  },
  {
    slug: "brandschutz",
    name: "Brandschutz",
    cardText:
      "Brandmeldeanlagen, Feuerlöscher, Löschtechnik und Rettungswege. Prüfung in der Regel jährlich, bei Feuerlöschern alle zwei Jahre.",
    norm: "DIN 14675 · ASR A2.2",
    title: "Brandschutzprüfung organisieren – BMA, Löschtechnik",
    description:
      "Brandmeldeanlagen, Feuerlöscher, Rettungswege: Wir koordinieren die wiederkehrenden Prüfungen und führen die Nachweise zusammen.",
    h1: "Brandschutzprüfung: Brandmeldeanlagen, Feuerlöscher und Sicherheitstechnik",
    serviceType: "Koordination wiederkehrender Brandschutzprüfungen",
    intro: [
      "Brandschutztechnische Anlagen unterliegen einem Geflecht aus Arbeitsschutzrecht, Normen und Landesbaurecht. Feuerlöscher sind nach ASR A2.2 mindestens alle zwei Jahre durch eine sachkundige Person zu prüfen. Brandmeldeanlagen werden nach DIN 14675 und DIN VDE 0833-1 vierteljährlich inspiziert und jährlich gewartet.",
      "In Sonderbauten schreiben die Prüfverordnungen der Bundesländer zusätzlich wiederkehrende Prüfungen durch bauaufsichtlich anerkannte Prüfsachverständige vor – für Brandmeldeanlagen, Sicherheitsbeleuchtung und Rauchabzugsanlagen in der Regel alle drei Jahre.",
    ],
    scope: [
      "Brandmeldeanlagen (BMA) und Alarmierungseinrichtungen",
      "Tragbare Feuerlöscher und Wandhydranten",
      "Sicherheitsbeleuchtung und Rettungswegkennzeichnung",
      "Rauch- und Wärmeabzugsanlagen (RWA) sowie Feststellanlagen an Brandschutztüren",
    ],
    rows: [
      ["Tragbare Feuerlöscher", "Instandhaltung durch Sachkundigen", "2 Jahre", "ASR A2.2, DIN 14406-4"],
      ["Tragbare Feuerlöscher", "Innere Prüfung", "4–5 Jahre", "DIN 14406-4"],
      ["Tragbare Feuerlöscher", "Festigkeitsprüfung", "10 Jahre", "DIN 14406-4, BetrSichV"],
      ["Wandhydranten", "Instandhaltung", "1 Jahr", "DIN 14461-1, DIN EN 671-3"],
      ["Brandmeldeanlagen", "Inspektion / Wartung", "vierteljährlich / jährlich", "DIN 14675-1, DIN VDE 0833-1"],
      ["Brandmeldeanlagen in Sonderbauten", "Prüfung durch Prüfsachverständigen", "in der Regel 3 Jahre", "je nach Landesrecht: Prüfverordnung bzw. Sonderbauverordnung des jeweiligen Bundeslandes"],
      ["Sicherheitsbeleuchtung", "Funktionsprüfung / Prüfung der Nennbetriebsdauer", "monatlich / jährlich", "DIN EN 50172, DIN VDE V 0108-100-1"],
      ["Rauch- und Wärmeabzugsanlagen", "Wartung", "1 Jahr", "DIN 18232-2"],
      ["Rauch- und Wärmeabzugsanlagen", "Sicht- und Funktionsprüfung durch den Betreiber", "monatlich bzw. vierteljährlich", "DIN 18232-2"],
      ["Feststellanlagen an Brandschutztüren", "Funktionsprüfung durch Betreiber / Wartung", "monatlich / jährlich", "DIN 14677, allgemeine bauaufsichtliche Zulassung"],
    ],
    tasks: [
      "Brandschutztechnische Anlagen erfassen und Prüfpflichten nach Arbeitsschutz- und Landesrecht zuordnen",
      "Sachkundige, Fachfirmen und Prüfsachverständige beauftragen und Termine bündeln",
      "Prüfberichte und Mängel zentral dokumentieren, Behebung bis zum Abschluss verfolgen",
    ],
  },
  {
    slug: "aufzugsanlagen",
    name: "Aufzugsanlagen",
    cardText:
      "Haupt- und Zwischenprüfung durch eine zugelassene Überwachungsstelle, üblicherweise im Wechsel alle zwölf Monate.",
    norm: "BetrSichV · ZÜS",
    title: "Aufzugsanlagen: Prüfung durch ZÜS koordinieren",
    description:
      "Haupt- und Zwischenprüfung Ihrer Aufzugsanlagen durch zugelassene Überwachungsstellen – Termine, Fristen und Dokumentation aus einer Hand.",
    h1: "Aufzugsprüfung durch die ZÜS: Haupt- und Zwischenprüfung koordinieren",
    serviceType: "Koordination der wiederkehrenden Aufzugsprüfung",
    intro: [
      "Aufzugsanlagen sind überwachungsbedürftige Anlagen nach der Betriebssicherheitsverordnung. Sie sind wiederkehrend durch eine zugelassene Überwachungsstelle (ZÜS) zu prüfen: Die Hauptprüfung ist spätestens alle zwei Jahre fällig, dazwischen liegt eine Zwischenprüfung. Haupt- und Zwischenprüfung wechseln sich damit üblicherweise im Zwölf-Monats-Rhythmus ab (BetrSichV Anhang 2 Abschnitt 2).",
      "Zusätzlich muss der Betreiber einen Notfallplan bereithalten, ein Zweiwege-Kommunikationssystem mit ständig besetzter Notrufzentrale sicherstellen und die Prüffristen in der Gefährdungsbeurteilung festlegen.",
    ],
    scope: [
      "Personen- und Lastenaufzüge",
      "Hauptprüfung und Zwischenprüfung durch die ZÜS",
      "Notrufsystem und Notfallplan",
      "Mängelbeseitigung nach Prüfbericht in Abstimmung mit dem Wartungsunternehmen",
    ],
    rows: [
      ["Aufzugsanlagen", "Hauptprüfung durch ZÜS", "spätestens 2 Jahre", "BetrSichV Anhang 2 Abschnitt 2"],
      ["Aufzugsanlagen", "Zwischenprüfung durch ZÜS", "in der Mitte zwischen zwei Hauptprüfungen", "BetrSichV Anhang 2 Abschnitt 2"],
      ["Aufzugsanlagen", "Prüfung vor Inbetriebnahme und nach prüfpflichtigen Änderungen", "anlassbezogen", "§ 15 BetrSichV"],
    ],
    tasks: [
      "Prüftermine mit ZÜS und Wartungsunternehmen abstimmen, damit die Anlage nur einmal stillsteht",
      "Notfallplan und Notrufkonzept auf Vollständigkeit prüfen",
      "Prüfberichte ablegen, Mängelfristen überwachen und Nachprüfungen veranlassen",
    ],
  },
  {
    slug: "lueftung-klima",
    name: "Lüftung & Klima",
    cardText: "Hygieneinspektion nach VDI 6022, abhängig von Bauart alle zwei bis drei Jahre.",
    norm: "VDI 6022",
    title: "VDI 6022 Hygieneinspektion organisieren",
    description:
      "Hygiene- und Funktionsprüfung raumlufttechnischer Anlagen nach VDI 6022. Wir beauftragen qualifizierte Prüfer und überwachen die Fristen.",
    h1: "VDI 6022 Hygieneinspektion für raumlufttechnische Anlagen",
    serviceType: "Koordination der Hygieneinspektion nach VDI 6022",
    intro: [
      "Raumlufttechnische Anlagen (RLT-Anlagen) müssen nach VDI 6022 Blatt 1 regelmäßig einer Hygieneinspektion unterzogen werden: alle drei Jahre bei Anlagen ohne Luftbefeuchtung, alle zwei Jahre bei Anlagen mit Befeuchtung. Dazwischen liegen kürzere Hygienekontrollen nach den Checklisten der Richtlinie.",
      "Klimaanlagen mit einer Nennleistung für den Kältebedarf von mehr als 12 Kilowatt unterliegen zusätzlich der energetischen Inspektion nach § 74 GEG, in der Regel alle zehn Jahre. Für Anlagen mit fluorierten Kältemitteln gelten Dichtheitskontrollen nach der F-Gase-Verordnung.",
    ],
    scope: [
      "Zentrale RLT-Anlagen und Klimageräte",
      "Hygieneinspektion inklusive Probenahme durch Fachpersonal (VDI 6022 Kategorie A)",
      "Energetische Inspektion von Klimaanlagen nach GEG",
      "Dichtheitskontrolle von Kälteanlagen nach F-Gase-Verordnung",
    ],
    rows: [
      ["RLT-Anlagen ohne Befeuchtung", "Hygieneinspektion", "3 Jahre", "VDI 6022 Blatt 1"],
      ["RLT-Anlagen mit Befeuchtung", "Hygieneinspektion", "2 Jahre", "VDI 6022 Blatt 1"],
      ["RLT-Anlagen mit erdverlegten Bauteilen", "Hygieneinspektion", "2 Jahre", "VDI 6022 Blatt 1"],
      ["Klimaanlagen über 12 kW Kälteleistung", "Energetische Inspektion", "10 Jahre", "§ 74 GEG"],
      ["Kälteanlagen mit F-Gasen ab 5 t CO₂-Äquivalent", "Dichtheitskontrolle", "12, 6 oder 3 Monate je nach Füllmenge", "Verordnung (EU) 2024/573"],
    ],
    tasks: [
      "RLT- und Kälteanlagen erfassen und Inspektionsintervalle je Bauart festlegen",
      "Hygieneinspektoren mit VDI-6022-Qualifikation und Kältefachbetriebe beauftragen",
      "Inspektionsberichte und Laborbefunde zentral dokumentieren, Mängel verfolgen",
    ],
  },
  {
    slug: "druck-gas",
    name: "Druck & Gas",
    cardText:
      "Innere Prüfung, äußere Prüfung und Festigkeitsprüfung nach BetrSichV, abhängig von Fluidgruppe und Druckinhaltsprodukt.",
    norm: "Betriebssicherheitsverordnung",
    title: "Druckbehälter und Gasanlagen prüfen lassen",
    description:
      "Innere, äußere und Festigkeitsprüfung nach Betriebssicherheitsverordnung. Wir koordinieren geeignete Prüfstellen und sichern die Nachweise.",
    h1: "Druckbehälter und Gasanlagen: Prüfungen nach Betriebssicherheitsverordnung",
    serviceType: "Koordination der Prüfung von Druckanlagen und Gasanlagen",
    intro: [
      "Druckanlagen sind überwachungsbedürftige Anlagen nach BetrSichV. Ob eine zugelassene Überwachungsstelle (ZÜS) oder eine zur Prüfung befähigte Person prüft, hängt von Fluidgruppe, maximal zulässigem Druck und Druckinhaltsprodukt (PS × V) ab. BetrSichV Anhang 2 Abschnitt 4 legt Höchstfristen fest: äußere Prüfung alle zwei Jahre, innere Prüfung alle fünf Jahre, Festigkeitsprüfung alle zehn Jahre.",
      "Für Gasinstallationen in Gebäuden empfiehlt das DVGW-Arbeitsblatt G 600 (TRGI) eine regelmäßige Sichtkontrolle durch den Betreiber und eine Gebrauchsfähigkeitsprüfung durch ein Vertragsinstallationsunternehmen.",
    ],
    scope: [
      "Druckbehälter, Druckluftanlagen und Dampfkessel",
      "Einordnung nach Fluidgruppe und Druckinhaltsprodukt",
      "Flüssiggasanlagen und Gasinstallationen",
      "Prüfung vor Inbetriebnahme und wiederkehrende Prüfungen",
    ],
    rows: [
      ["Druckbehälter", "Äußere Prüfung", "Höchstfrist 2 Jahre", "BetrSichV Anhang 2 Abschnitt 4"],
      ["Druckbehälter", "Innere Prüfung", "Höchstfrist 5 Jahre", "BetrSichV Anhang 2 Abschnitt 4"],
      ["Druckbehälter", "Festigkeitsprüfung", "Höchstfrist 10 Jahre", "BetrSichV Anhang 2 Abschnitt 4"],
      ["Gasinstallationen in Gebäuden", "Gebrauchsfähigkeitsprüfung", "empfohlen alle 12 Jahre", "DVGW G 600 (TRGI)"],
    ],
    tasks: [
      "Druckanlagen nach Fluidgruppe und Druckinhaltsprodukt einordnen und Prüfzuständigkeit klären",
      "ZÜS oder befähigte Personen beauftragen und Prüfungen mit Stillstandszeiten abstimmen",
      "Prüfbescheinigungen und Fristen je Anlage dokumentieren",
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

// Elektrotechnik und Lüftung haben eigene Leistungsseiten auf oberster Ebene (Lastenheft T-01);
// die alten URLs unter /pruefbereiche leiten per 301 dorthin weiter (next.config.ts).
const movedAreas: Partial<Record<AreaSlug, string>> = {
  "dguv-v3-pruefung": "/dguv-v3-pruefung",
  "lueftung-klima": "/vdi-6022",
};
export const areaPath = (slug: AreaSlug) => movedAreas[slug] ?? `/pruefbereiche/${slug}`;
export const isMovedArea = (slug: AreaSlug) => slug in movedAreas;

/** Weitere Anlagen ohne eigene Prüfbereichsseite – für die Prüffristen-Übersicht */
export const otherDeadlines: DeadlineRow[] = [
  ["Kraftbetätigte Türen und Tore", "Prüfung durch Sachkundigen", "mindestens 1 Jahr", "ASR A1.7"],
  ["Lagereinrichtungen und Regale", "Experteninspektion durch fachkundige Person", "mindestens alle 12 Monate", "DIN EN 15635, § 14 Abs. 2 BetrSichV, DGUV Information 208-061"],
  ["Leitern und Tritte", "Sichtprüfung durch befähigte Person", "nach Gefährdungsbeurteilung, üblich 1 Jahr", "DGUV Information 208-016"],
  ["Blitzschutzsysteme", "Umfassende Prüfung", "2 Jahre (Schutzklasse I/II) bzw. 4 Jahre (III/IV)", "DIN EN 62305-3 Beiblatt 3"],
  ["Fettabscheider", "Generalinspektion / Wartung", "5 Jahre / 1 Jahr", "DIN 4040-100, DIN EN 1825-2"],
];

/** Trinkwasser hat keine eigene Prüfbereichsseite, aber eine eigene Gruppe in der Prüffristen-Übersicht */
export const drinkingWaterDeadlines: DeadlineRow[] = [
  ["Großanlagen zur Trinkwassererwärmung mit Duschen bei gewerblicher, nicht öffentlicher Tätigkeit – etwa vermietete Wohnungen", "Untersuchung auf Legionellen", "mindestens alle 3 Jahre", "§ 31 Abs. 1, Abs. 2 Nr. 2 Buchst. a TrinkwV"],
  ["Großanlagen zur Trinkwassererwärmung mit Duschen bei öffentlicher Tätigkeit – etwa Schulen, Kitas, Kliniken", "Untersuchung auf Legionellen", "mindestens jährlich; Verlängerung bis 3 Jahre durch das Gesundheitsamt möglich, nicht für Kliniken und Pflegeeinrichtungen", "§ 31 Abs. 2 Nr. 2 Buchst. b, Abs. 3 TrinkwV"],
];
