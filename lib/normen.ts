// Regelwerke, auf die Seiten verweisen. Jede Seite listet ihre Quellen am Ende als Tabelle mit Fundstelle und
// Fassung (Lastenheft R-02). `version` bei jeder Änderung des Regelwerks anpassen.
// Geprüft am 22.10.2026: Gesetze/Verordnungen an gesetze-im-internet.de, Technische Regeln an BAuA/BGN,
// Normen an DIN Media. TODO vor Abnahme gegen das Original (Normenzugang AG) abgleichen: alle Einträge mit
// „geltende Ausgabe“/„geltende Fassung“ – dort ist Monat/Jahr (R-02) noch nachzutragen.
// Kostenpflichtige Normen werden nur sinngemäß wiedergegeben, nie wörtlich zitiert (R-06).

export type NormKey =
  | "BetrSichV"
  | "DGUV V3"
  | "DGUV V4"
  | "DGUV V68"
  | "DGUV V70"
  | "ArbStättV"
  | "ASR A2.2"
  | "TRBS 1203"
  | "VDI 6022"
  | "GEFMA 190"
  | "ArbSchG"
  | "BGB"
  | "OWiG"
  | "SGB VII"
  | "TrinkwV"
  | "UBA Legionellen"
  | "MPBetreibV"
  | "PrüfVO"
  | "DIN EN 1176"
  | "DIN 14676"
  | "DIN 14406-4"
  | "DIN EN 15635"
  | "DGUV I 208-061"
  | "DIN EN 50699"
  | "DIN VDE 0105-100"
  | "DIN EN 50678"
  | "DGUV V52"
  | "DGUV R 100-500"
  | "ASR A1.7"
  | "DGUV I 208-016"
  | "VDI 6022-4"
  | "GEG";

export type Norm = { name: string; title: string; version: string; url?: string };

export const norms: Record<NormKey, Norm> = {
  BetrSichV: {
    name: "BetrSichV",
    title: "Betriebssicherheitsverordnung",
    version: "02/2015, zuletzt geändert 12/2025",
    url: "https://www.gesetze-im-internet.de/betrsichv_2015/",
  },
  "DGUV V3": {
    name: "DGUV Vorschrift 3",
    title: "Elektrische Anlagen und Betriebsmittel, mit Durchführungsanweisungen",
    version: "01/1997, Durchführungsanweisungen 04/1997",
    url: "https://cdn.vbg.de/media/4d4d9675222842eb908cfe7c27afad8b/dld:attachment/DGUV_Vorschrift_3_Elektrische_Anlagen_und_Betriebsmittel.pdf",
  },
  "DGUV V4": {
    name: "DGUV Vorschrift 4",
    title: "Elektrische Anlagen und Betriebsmittel (Fassung der Unfallkassen, inhaltsgleich mit DGUV Vorschrift 3)",
    version: "Fassung der jeweiligen Unfallkasse",
  },
  "DGUV V68": {
    name: "DGUV Vorschrift 68",
    title: "Flurförderzeuge",
    version: "01/1997 (Abdruck BG Verkehr)",
  },
  "DGUV V70": {
    name: "DGUV Vorschrift 70",
    title: "Fahrzeuge (ehemals BGV D29)",
    version: "geltende Fassung des zuständigen UV-Trägers",
    url: "https://vorschriften.bgn-branchenwissen.de/daten/dguv/70/57.htm",
  },
  "ArbStättV": {
    name: "ArbStättV",
    title: "Arbeitsstättenverordnung",
    version: "08/2004, zuletzt geändert 03/2024",
    url: "https://www.gesetze-im-internet.de/arbst_ttv_2004/",
  },
  "ASR A2.2": {
    name: "ASR A2.2",
    title: "Technische Regel für Arbeitsstätten „Maßnahmen gegen Brände“",
    version: "05/2018, zuletzt geändert 05/2025",
    url: "https://www.baua.de/DE/Angebote/Regelwerk/ASR/ASR-A2-2",
  },
  "TRBS 1203": {
    name: "TRBS 1203",
    title: "Technische Regel für Betriebssicherheit „Zur Prüfung befähigte Personen“",
    version: "03/2019, geändert 08/2021, berichtigt 01/2022",
  },
  "VDI 6022": {
    name: "VDI 6022 Blatt 1",
    title: "Hygieneanforderungen an raumlufttechnische Anlagen und Geräte",
    version: "01/2018, Berichtigung 04/2023",
  },
  "GEFMA 190": {
    name: "GEFMA 190",
    title: "Betreiberverantwortung im Facility Management",
    version: "06/2023",
  },
  ArbSchG: {
    name: "ArbSchG",
    title: "Arbeitsschutzgesetz",
    version: "08/1996, zuletzt geändert 12/2025",
    url: "https://www.gesetze-im-internet.de/arbschg/",
  },
  BGB: {
    name: "BGB",
    title: "Bürgerliches Gesetzbuch – Deliktshaftung",
    version: "Neufassung 01/2002, geltende Fassung",
    url: "https://www.gesetze-im-internet.de/bgb/__823.html",
  },
  OWiG: {
    name: "OWiG",
    title: "Gesetz über Ordnungswidrigkeiten",
    version: "Neufassung 02/1987, geltende Fassung",
    url: "https://www.gesetze-im-internet.de/owig_1968/__130.html",
  },
  "SGB VII": {
    name: "SGB VII",
    title: "Gesetzliche Unfallversicherung – Bußgeldvorschriften",
    version: "08/1996, geltende Fassung",
    url: "https://www.gesetze-im-internet.de/sgb_7/__209.html",
  },
  TrinkwV: {
    name: "TrinkwV",
    title: "Trinkwasserverordnung",
    version: "06/2023",
    url: "https://www.gesetze-im-internet.de/trinkwv_2023/",
  },
  "UBA Legionellen": {
    name: "UBA-Empfehlung Gefährdungsanalyse",
    title: "Empfehlung des Umweltbundesamts zur Gefährdungsanalyse bei Überschreitung des technischen Maßnahmenwerts für Legionellen",
    version: "12/2012 (in Bezug genommen durch § 51 TrinkwV)",
  },
  MPBetreibV: {
    name: "MPBetreibV",
    title: "Medizinprodukte-Betreiberverordnung",
    version: "02/2025, zuletzt geändert 10/2025",
    url: "https://www.gesetze-im-internet.de/mpbetreibv_2025/",
  },
  "PrüfVO": {
    name: "Prüfverordnungen der Länder",
    title: "z. B. PVO Hamburg, SPrüfV Bayern, PrüfVO NRW",
    version: "jeweilige Landesfassung",
  },
  "DIN EN 1176": {
    name: "DIN EN 1176-7",
    title: "Spielplatzgeräte – Installation, Inspektion, Wartung und Betrieb",
    version: "07/2020",
  },
  "DIN 14676": {
    name: "DIN 14676-1",
    title: "Rauchwarnmelder für Wohnhäuser – Einbau, Betrieb und Instandhaltung",
    version: "12/2018",
  },
  "DIN 14406-4": {
    name: "DIN 14406-4",
    title: "Tragbare Feuerlöscher – Instandhaltung",
    version: "09/2009",
  },
  "DIN EN 15635": {
    name: "DIN EN 15635",
    title: "Ortsfeste Regalsysteme aus Stahl – Anwendung und Wartung von Lagereinrichtungen",
    version: "08/2009",
  },
  "DGUV I 208-061": {
    name: "DGUV Information 208-061",
    title: "Lagereinrichtungen und -geräte (ehemals DGUV Regel 108-007)",
    version: "geltende Ausgabe",
  },
  "DIN EN 50699": {
    name: "DIN EN 50699 (VDE 0702)",
    title: "Wiederholungsprüfung für elektrische Geräte",
    version: "seit 06/2021",
  },
  "DIN VDE 0105-100": {
    name: "DIN VDE 0105-100",
    title: "Betrieb von elektrischen Anlagen",
    version: "10/2015 mit A1 06/2017",
  },
  "DIN EN 50678": {
    name: "DIN EN 50678 (VDE 0701)",
    title: "Prüfung elektrischer Geräte nach der Reparatur",
    version: "seit 02/2021",
  },
  "DGUV V52": {
    name: "DGUV Vorschrift 52",
    title: "Krane",
    version: "geltende Fassung des zuständigen UV-Trägers",
  },
  "DGUV R 100-500": {
    name: "DGUV Regel 100-500",
    title: "Betreiben von Arbeitsmitteln (Kapitel 2.8 Lastaufnahmeeinrichtungen, 2.10 Hebebühnen)",
    version: "geltende Ausgabe",
  },
  "ASR A1.7": {
    name: "ASR A1.7",
    title: "Technische Regel für Arbeitsstätten „Türen und Tore“",
    version: "geltende Ausgabe",
    url: "https://www.baua.de/DE/Angebote/Regelwerk/ASR/ASR-A1-7",
  },
  "DGUV I 208-016": {
    name: "DGUV Information 208-016",
    title: "Handlungsanleitung für den Umgang mit Leitern und Tritten",
    version: "geltende Ausgabe",
  },
  "VDI 6022-4": {
    name: "VDI 6022 Blatt 4",
    title: "Qualifizierung von Personal für Hygienekontrollen und Hygieneinspektionen",
    version: "geltende Ausgabe",
  },
  GEG: {
    name: "GEG",
    title: "Gebäudeenergiegesetz – energetische Inspektion von Klimaanlagen",
    version: "08/2020, geltende Fassung",
    url: "https://www.gesetze-im-internet.de/geg/",
  },
};
