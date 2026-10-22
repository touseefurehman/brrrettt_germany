// Regelwerke, auf die Landingpages und Fachartikel verweisen. Jede Seite listet ihre Regelwerke am Ende
// mit Kurzbeschreibung – klare, zitierfähige Bezüge sind für Google und KI-Systeme ein Qualitätssignal.
// URLs nur dort, wo eine amtliche oder herausgebereigene Fundstelle stabil erreichbar ist.

export type NormKey =
  | "BetrSichV"
  | "DGUV V3"
  | "ArbStättV"
  | "TRBS 1203"
  | "VDI 6022"
  | "GEFMA 190"
  | "ArbSchG"
  | "BGB"
  | "OWiG"
  | "TrinkwV"
  | "MPBetreibV"
  | "PrüfVO"
  | "DIN EN 1176"
  | "DIN 14676";

export type Norm = { name: string; title: string; text: string; url?: string };

export const norms: Record<NormKey, Norm> = {
  BetrSichV: {
    name: "BetrSichV",
    title: "Betriebssicherheitsverordnung",
    text: "Regelt Gefährdungsbeurteilung (§ 3), Prüfung von Arbeitsmitteln (§ 14) und überwachungsbedürftigen Anlagen (§§ 15, 16, Anhang 2) wie Aufzügen und Druckanlagen.",
    url: "https://www.gesetze-im-internet.de/betrsichv_2015/",
  },
  "DGUV V3": {
    name: "DGUV Vorschrift 3",
    title: "Unfallverhütungsvorschrift „Elektrische Anlagen und Betriebsmittel“",
    text: "Verpflichtet zur Prüfung elektrischer Anlagen und Betriebsmittel vor der ersten Inbetriebnahme und in bestimmten Zeitabständen (§ 5). Für Mitglieder der Unfallkassen gilt die inhaltsgleiche DGUV Vorschrift 4.",
    url: "https://cdn.vbg.de/media/4d4d9675222842eb908cfe7c27afad8b/dld:attachment/DGUV_Vorschrift_3_Elektrische_Anlagen_und_Betriebsmittel.pdf",
  },
  "ArbStättV": {
    name: "ArbStättV",
    title: "Arbeitsstättenverordnung",
    text: "Verlangt, dass Arbeitsstätten instand gehalten und Sicherheitseinrichtungen wie Sicherheitsbeleuchtung, Feuerlöscheinrichtungen und raumlufttechnische Anlagen regelmäßig gewartet und auf Funktion geprüft werden (§ 4). Konkretisiert durch die ASR.",
    url: "https://www.gesetze-im-internet.de/arbst_ttv_2004/",
  },
  "TRBS 1203": {
    name: "TRBS 1203",
    title: "Technische Regel für Betriebssicherheit „Zur Prüfung befähigte Personen“",
    text: "Beschreibt, welche Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit eine Person braucht, um Arbeitsmittel und Anlagen prüfen zu dürfen.",
  },
  "VDI 6022": {
    name: "VDI 6022 Blatt 1",
    title: "Hygieneanforderungen an raumlufttechnische Anlagen und Geräte",
    text: "Legt Hygienekontrollen und Hygieneinspektionen für RLT-Anlagen fest – in der Regel alle drei Jahre, bei Anlagen mit Befeuchtung alle zwei Jahre.",
  },
  "GEFMA 190": {
    name: "GEFMA 190",
    title: "Betreiberverantwortung im Facility Management",
    text: "Richtlinie des Deutschen Verbands für Facility Management. Beschreibt, wie Betreiberpflichten ermittelt, an Personen und Dienstleister delegiert und kontrolliert werden.",
  },
  ArbSchG: {
    name: "ArbSchG",
    title: "Arbeitsschutzgesetz",
    text: "Grundpflichten des Arbeitgebers, Gefährdungsbeurteilung (§ 5) und schriftliche Übertragung von Arbeitgeberpflichten auf zuverlässige und fachkundige Personen (§ 13 Abs. 2).",
    url: "https://www.gesetze-im-internet.de/arbschg/",
  },
  BGB: {
    name: "BGB §§ 823, 831, 836",
    title: "Bürgerliches Gesetzbuch – Deliktshaftung",
    text: "Grundlage der Verkehrssicherungspflicht: Haftung für schuldhaft verursachte Schäden (§ 823), für Verrichtungsgehilfen (§ 831) und für Schäden durch Einsturz oder Ablösen von Gebäudeteilen (§ 836).",
    url: "https://www.gesetze-im-internet.de/bgb/__823.html",
  },
  OWiG: {
    name: "OWiG § 130",
    title: "Gesetz über Ordnungswidrigkeiten – Verletzung der Aufsichtspflicht",
    text: "Inhaber und Leitungsorgane handeln ordnungswidrig, wenn sie erforderliche Aufsichtsmaßnahmen unterlassen und es dadurch zu Pflichtverstößen im Unternehmen kommt.",
    url: "https://www.gesetze-im-internet.de/owig_1968/__130.html",
  },
  TrinkwV: {
    name: "TrinkwV",
    title: "Trinkwasserverordnung",
    text: "Verpflichtet Betreiber von Großanlagen zur Trinkwassererwärmung zur Untersuchung auf Legionellen (§ 31) – bei gewerblicher Tätigkeit wie Vermietung mindestens alle drei Jahre, bei öffentlicher Tätigkeit jährlich.",
    url: "https://www.gesetze-im-internet.de/trinkwv_2023/",
  },
  MPBetreibV: {
    name: "MPBetreibV",
    title: "Medizinprodukte-Betreiberverordnung",
    text: "Regelt Betrieb, Einweisung, sicherheitstechnische Kontrollen (§ 12, für Produkte nach Anlage 1 spätestens alle zwei Jahre) und messtechnische Kontrollen (§ 15) von Medizinprodukten in Kliniken, Praxen und Pflegeeinrichtungen.",
    url: "https://www.gesetze-im-internet.de/mpbetreibv_2025/",
  },
  "PrüfVO": {
    name: "Prüfverordnungen der Länder",
    title: "Landesrechtliche Prüfverordnungen (PrüfVO, TPrüfVO, SPrüfV u. a.)",
    text: "Schreiben in Sonderbauten wie Schulen, Krankenhäusern, Versammlungsstätten und Garagen wiederkehrende Prüfungen sicherheitstechnischer Anlagen durch Prüfsachverständige vor, in der Regel alle drei Jahre.",
  },
  "DIN EN 1176": {
    name: "DIN EN 1176-7",
    title: "Spielplatzgeräte – Anleitung für Installation, Inspektion, Wartung und Betrieb",
    text: "Empfiehlt visuelle Routineinspektionen, operative Inspektionen alle ein bis drei Monate und eine jährliche Hauptinspektion von Spielplätzen.",
  },
  "DIN 14676": {
    name: "DIN 14676-1",
    title: "Rauchwarnmelder für Wohnhäuser – Einbau, Betrieb und Instandhaltung",
    text: "Sieht eine jährliche Inspektion und Wartung von Rauchwarnmeldern vor. Wer zuständig ist – Eigentümer oder Bewohner –, regelt die jeweilige Landesbauordnung.",
  },
};
