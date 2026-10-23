import type { ServicePage } from "./pages";

// Städte-Seiten auf die Keywords 11–13 der Anlage A, URL = `/${slug}` (T-01). 400–700 Wörter, auf Anfrage
// ausgerichtet (K-06). Regionale Angaben: zuständige Unfallkasse und Arbeitsschutzbehörde, Landesrecht für Sonderbauten.
// TODO (Auftraggeber): bestätigen, dass Prüfpartner für die jeweilige Region verfügbar sind; ggf. Referenz ergänzen.

const fristen = {
  type: "table" as const,
  caption: "Richtwerte nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3 – bundesweit einheitlich",
  head: ["Anlage / Betriebsmittel", "Richtwert", "Fundstelle"],
  rows: [
    ["Elektrische Anlagen und ortsfeste Betriebsmittel", "4 Jahre", "DGUV V3, DA zu § 5, Tabelle 1A"],
    ["Anlagen in Räumen besonderer Art", "1 Jahr", "DGUV V3, DA zu § 5, Tabelle 1A"],
    ["Ortsveränderliche Betriebsmittel", "6 Monate; bei Fehlerquote unter 2 % bis 1 Jahr (Werkstatt) bzw. 2 Jahre (Büro)", "DGUV V3, DA zu § 5, Tabelle 1B"],
  ],
};

export const staedteseiten: ServicePage[] = [
  {
    slug: "dguv-v3-pruefung-berlin",
    keyword: "dguv v3 prüfung berlin",
    secondary: ["elektroprüfung berlin", "dguv v3 berlin"],
    name: "DGUV V3 Prüfung Berlin",
    title: "DGUV V3 Prüfung Berlin – für mehrere Standorte",
    description:
      "DGUV V3 Prüfung in Berlin koordinieren: Fristen, zuständige Unfallkasse und Aufsicht, Prüfer nach TRBS 1203 – für Organisationen mit mehreren Standorten.",
    h1: "DGUV V3 Prüfung in Berlin: koordiniert über alle Standorte",
    kicker: "DGUV V3 · BERLIN",
    serviceType: "Koordination der DGUV-V3-Prüfung in Berlin",
    cardText: "DGUV V3 Prüfung für Berliner Standorte koordinieren.",
    highlights: ["Standorte in allen Berliner Bezirken", "Befähigte Prüfer nach TRBS 1203", "Ein Fristenplan für alle Liegenschaften"],
    lead: [
      "Für die DGUV V3 Prüfung in Berlin gelten dieselben Pflichten wie im übrigen Bundesgebiet: Elektrische Anlagen und Betriebsmittel sind nach § 5 DGUV Vorschrift 3 vor der ersten Inbetriebnahme und in regelmäßigen Abständen zu prüfen; Berliner Behörden und landeseigene Betriebe wenden die inhaltsgleiche DGUV Vorschrift 4 der Unfallkasse Berlin an.",
      "betreibermanager.de koordiniert die DGUV V3 Prüfung für Organisationen mit mehreren Standorten in Berlin: Bestand erfassen, Fristen festlegen, qualifizierte Prüfbetriebe beauftragen, Protokolle zentral führen.",
    ],
    blocks: [
      { type: "h2", text: "Wer in Berlin prüfen lassen muss" },
      {
        type: "p",
        text: "Verpflichtet ist jeder Arbeitgeber, dessen Beschäftigte elektrische Anlagen oder Geräte nutzen – vom Bürostandort über Werkstätten bis zu Kitas und Schulen. In Berlin betrifft das besonders Wohnungsgesellschaften mit Geschäftsstellen und Hausmeisterstützpunkten in mehreren Bezirken sowie Träger von Pflegeeinrichtungen und Kliniken mit verteilten Häusern. Ablauf, Prüfumfang und Prüferqualifikation beschreibt die Seite [DGUV V3 Prüfung](/dguv-v3-pruefung).",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      fristen,
      {
        type: "p",
        text: "Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Prüfen darf eine Elektrofachkraft bzw. befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203.",
      },
      { type: "h2", text: "Zuständige Stellen in Berlin" },
      {
        type: "table",
        head: ["Bereich", "Zuständig"],
        rows: [
          ["Unfallversicherung öffentlicher Arbeitgeber (Land, Bezirke, landeseigene Betriebe)", "Unfallkasse Berlin – DGUV Vorschrift 4"],
          ["Unfallversicherung privater Unternehmen", "zuständige Berufsgenossenschaft – DGUV Vorschrift 3"],
          ["Staatliche Arbeitsschutzaufsicht", "Landesamt für Arbeitsschutz, Gesundheitsschutz und technische Sicherheit Berlin (LAGetSi)"],
          ["Sicherheitstechnische Anlagen in Sonderbauten", "Prüfung durch Prüfsachverständige nach dem Bauordnungsrecht des Landes Berlin"],
        ],
      },
      { type: "h2", text: "Was die Prüfung in Berlin kostet" },
      {
        type: "p",
        text: "Die Preise je Gerät und Anlage unterscheiden sich in Berlin nicht grundsätzlich vom Bundesdurchschnitt; Preisspannen mit Quellen stehen unter [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten). Bei Standorten in mehreren Bezirken bestimmen Anfahrten und Terminlogistik den Gesamtpreis – Prüfungen nach Bezirken zu bündeln ist der größte Hebel.",
      },
      {
        type: "example",
        title: "Wohnungsgesellschaft mit Standorten in sechs Bezirken",
        text: [
          "Geprüft werden müssen Geräte in vier Kundencentern und neun Hausmeisterstützpunkten. Wir legen die Prüfungen auf zwei Wochen je Jahr, sortiert nach Bezirk, und führen die Protokolle zentral. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Gelten in Berlin andere Fristen für die DGUV V3 Prüfung?",
        "Nein. Die Richtwerte der DGUV Vorschrift 3 gelten bundesweit. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
      ],
      [
        "Welche Vorschrift gilt für Berliner Behörden und Bezirke?",
        "Die DGUV Vorschrift 4 der Unfallkasse Berlin. Sie ist inhaltsgleich mit der DGUV Vorschrift 3.",
      ],
      [
        "Können Prüfungen für mehrere Berliner Standorte gebündelt werden?",
        "Ja. Wir legen alle Standorte in einen Fristenplan und bündeln die Termine nach Bezirken, damit Anfahrten und Ausfallzeiten sinken.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5, Durchführungsanweisungen Tabellen 1A und 1B"],
      ["DGUV V4", "§ 5 (Unfallkasse Berlin)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["PrüfVO", "Bauordnungsrecht des Landes Berlin"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht, Fristen, Prüfer"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Preisspannen"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Für Bestandshalter"],
    ],
    cta: "DGUV V3 Prüfung für Ihre Berliner Standorte anfragen.",
  },
  {
    slug: "dguv-v3-pruefung-hamburg",
    keyword: "dguv v3 prüfung hamburg",
    secondary: ["elektroprüfung hamburg", "dguv v3 hamburg"],
    name: "DGUV V3 Prüfung Hamburg",
    title: "DGUV V3 Prüfung Hamburg – für mehrere Standorte",
    description:
      "DGUV V3 Prüfung in Hamburg koordinieren: Fristen, Unfallkasse Nord, Amt für Arbeitsschutz, Prüfverordnung – für Organisationen mit mehreren Standorten.",
    h1: "DGUV V3 Prüfung in Hamburg: koordiniert über alle Standorte",
    kicker: "DGUV V3 · HAMBURG",
    serviceType: "Koordination der DGUV-V3-Prüfung in Hamburg",
    cardText: "DGUV V3 Prüfung für Hamburger Standorte koordinieren.",
    highlights: ["Standorte in allen Hamburger Bezirken", "Befähigte Prüfer nach TRBS 1203", "Ein Fristenplan für alle Liegenschaften"],
    lead: [
      "Für die DGUV V3 Prüfung in Hamburg gelten die bundesweiten Pflichten: Elektrische Anlagen und Betriebsmittel sind nach § 5 DGUV Vorschrift 3 vor der ersten Inbetriebnahme und in regelmäßigen Abständen zu prüfen; die Freie und Hansestadt Hamburg und ihre Einrichtungen wenden die inhaltsgleiche DGUV Vorschrift 4 der Unfallkasse Nord an.",
      "betreibermanager.de koordiniert die DGUV V3 Prüfung für Organisationen mit mehreren Standorten in Hamburg und im Umland: Bestand erfassen, Fristen festlegen, qualifizierte Prüfbetriebe beauftragen, Protokolle zentral führen.",
    ],
    blocks: [
      { type: "h2", text: "Wer in Hamburg prüfen lassen muss" },
      {
        type: "p",
        text: "Verpflichtet ist jeder Arbeitgeber, dessen Beschäftigte elektrische Anlagen oder Geräte nutzen. In Hamburg betrifft das besonders Wohnungsgenossenschaften mit Servicebüros in mehreren Quartieren, Träger von Kitas und Pflegeeinrichtungen sowie Kliniken mit verteilten Standorten. Ablauf, Prüfumfang und Prüferqualifikation: [DGUV V3 Prüfung](/dguv-v3-pruefung).",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      fristen,
      {
        type: "p",
        text: "Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Prüfen darf eine Elektrofachkraft bzw. befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203.",
      },
      { type: "h2", text: "Zuständige Stellen in Hamburg" },
      {
        type: "table",
        head: ["Bereich", "Zuständig"],
        rows: [
          ["Unfallversicherung öffentlicher Arbeitgeber", "Unfallkasse Nord – DGUV Vorschrift 4"],
          ["Unfallversicherung privater Unternehmen", "zuständige Berufsgenossenschaft – DGUV Vorschrift 3"],
          ["Staatliche Arbeitsschutzaufsicht", "Amt für Arbeitsschutz der Freien und Hansestadt Hamburg"],
          ["Sicherheitstechnische Anlagen in Sonderbauten", "Prüfung durch Prüfsachverständige nach der Hamburger Prüfverordnung (PVO)"],
        ],
      },
      { type: "h2", text: "Was die Prüfung in Hamburg kostet" },
      {
        type: "p",
        text: "Preisspannen mit Quellen stehen unter [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten). Bei Standorten in mehreren Bezirken und im Umland bestimmen Anfahrten den Gesamtpreis; Prüfungen nach Quartieren zu bündeln senkt den Aufwand. Mit einer Geräteliste je Standort lassen sich Angebote verschiedener Prüfbetriebe direkt vergleichen.",
      },
      {
        type: "example",
        title: "Pflegeträger mit fünf Einrichtungen in Hamburg",
        text: [
          "Die Häuser liegen in drei Bezirken; medizinisch genutzte Bereiche werden als Räume besonderer Art jährlich geprüft, Bürogeräte im Zwei-Jahres-Turnus. Wir führen beide Zyklen in einem Plan und stimmen die Termine mit den Hausleitungen ab. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Gelten in Hamburg andere Fristen für die DGUV V3 Prüfung?",
        "Nein. Die Richtwerte der DGUV Vorschrift 3 gelten bundesweit. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
      ],
      [
        "Welche Unfallkasse ist für Hamburger Behörden zuständig?",
        "Die Unfallkasse Nord. Für ihre Mitglieder gilt die DGUV Vorschrift 4, inhaltsgleich mit der DGUV Vorschrift 3.",
      ],
      [
        "Können Prüfungen für Standorte in Hamburg und im Umland gebündelt werden?",
        "Ja. Alle Standorte stehen in einem Fristenplan, Termine werden nach Region gebündelt.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5, Durchführungsanweisungen Tabellen 1A und 1B"],
      ["DGUV V4", "§ 5 (Unfallkasse Nord)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["PrüfVO", "Hamburger Prüfverordnung (PVO)"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht, Fristen, Prüfer"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Preisspannen"],
      ["Betreiberverantwortung Krankenhäuser und Pflege", "/betreiberpflichten/krankenhaeuser", "Kliniken und Pflege"],
    ],
    cta: "DGUV V3 Prüfung für Ihre Hamburger Standorte anfragen.",
  },
  {
    slug: "dguv-v3-pruefung-muenchen",
    keyword: "dguv v3 prüfung münchen",
    secondary: ["elektroprüfung münchen", "dguv v3 münchen"],
    name: "DGUV V3 Prüfung München",
    title: "DGUV V3 Prüfung München – für mehrere Standorte",
    description:
      "DGUV V3 Prüfung in München koordinieren: Fristen, KUVB und Gewerbeaufsicht, Sicherheitsanlagen-Prüfverordnung – für Organisationen mit mehreren Standorten.",
    h1: "DGUV V3 Prüfung in München: koordiniert über alle Standorte",
    kicker: "DGUV V3 · MÜNCHEN",
    serviceType: "Koordination der DGUV-V3-Prüfung in München",
    cardText: "DGUV V3 Prüfung für Münchner Standorte koordinieren.",
    highlights: ["München und Umland", "Befähigte Prüfer nach TRBS 1203", "Ein Fristenplan für alle Liegenschaften"],
    lead: [
      "Für die DGUV V3 Prüfung in München gelten die bundesweiten Pflichten: Elektrische Anlagen und Betriebsmittel sind nach § 5 DGUV Vorschrift 3 vor der ersten Inbetriebnahme und in regelmäßigen Abständen zu prüfen; Kommunen in Bayern wenden die inhaltsgleiche DGUV Vorschrift 4 der Kommunalen Unfallversicherung Bayern an.",
      "betreibermanager.de koordiniert die DGUV V3 Prüfung für Organisationen mit mehreren Standorten in München und Oberbayern: Bestand erfassen, Fristen festlegen, qualifizierte Prüfbetriebe beauftragen, Protokolle zentral führen.",
    ],
    blocks: [
      { type: "h2", text: "Wer in München prüfen lassen muss" },
      {
        type: "p",
        text: "Verpflichtet ist jeder Arbeitgeber, dessen Beschäftigte elektrische Anlagen oder Geräte nutzen. In München und im Umland betrifft das besonders Kommunen mit Schulen, Bauhöfen und Feuerwehrgerätehäusern, Wohnungsunternehmen mit Hausmeisterstützpunkten sowie Kliniken. Ablauf, Prüfumfang und Prüferqualifikation: [DGUV V3 Prüfung](/dguv-v3-pruefung).",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      fristen,
      {
        type: "p",
        text: "Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV. Prüfen darf eine Elektrofachkraft bzw. befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203.",
      },
      { type: "h2", text: "Zuständige Stellen in München und Bayern" },
      {
        type: "table",
        head: ["Bereich", "Zuständig"],
        rows: [
          ["Unfallversicherung der Kommunen", "Kommunale Unfallversicherung Bayern (KUVB) – DGUV Vorschrift 4"],
          ["Unfallversicherung des Freistaats", "Bayerische Landesunfallkasse – DGUV Vorschrift 4"],
          ["Unfallversicherung privater Unternehmen", "zuständige Berufsgenossenschaft – DGUV Vorschrift 3"],
          ["Staatliche Arbeitsschutzaufsicht", "Gewerbeaufsichtsamt bei der Regierung von Oberbayern"],
          ["Sicherheitstechnische Anlagen in Sonderbauten", "Prüfung durch Prüfsachverständige nach der Sicherheitsanlagen-Prüfverordnung (SPrüfV)"],
        ],
      },
      { type: "h2", text: "Was die Prüfung in München kostet" },
      {
        type: "p",
        text: "Preisspannen mit Quellen stehen unter [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten). Bei Liegenschaften im Umland bestimmen Anfahrten den Gesamtpreis; Prüfungen nach Region zu bündeln senkt den Aufwand. Für Kommunen kommt hinzu, dass Prüfleistungen nach Vergaberecht ausgeschrieben werden; eine einheitliche Geräteliste je Liegenschaft macht die Angebote vergleichbar.",
      },
      {
        type: "example",
        title: "Landkreisgemeinde mit 14 Liegenschaften",
        text: [
          "Schulen, Kitas, Rathaus, Bauhof und zwei Feuerwehrgerätehäuser wurden bisher einzeln beauftragt. Wir legen die Elektroprüfungen der Schulen in die Ferien, Bauhof und Feuerwehr in eine gemeinsame Prüfwoche und führen die Protokolle zentral. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Gelten in München andere Fristen für die DGUV V3 Prüfung?",
        "Nein. Die Richtwerte der DGUV Vorschrift 3 gelten bundesweit. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
      ],
      [
        "Welche Vorschrift gilt für bayerische Kommunen?",
        "Die DGUV Vorschrift 4 der Kommunalen Unfallversicherung Bayern. Sie ist inhaltsgleich mit der DGUV Vorschrift 3.",
      ],
      [
        "Können Prüfungen für München und das Umland gebündelt werden?",
        "Ja. Alle Standorte stehen in einem Fristenplan, Termine werden nach Region gebündelt.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5, Durchführungsanweisungen Tabellen 1A und 1B"],
      ["DGUV V4", "§ 5 (KUVB, Bayerische Landesunfallkasse)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["PrüfVO", "Sicherheitsanlagen-Prüfverordnung Bayern (SPrüfV)"],
    ],
    related: [
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Pflicht, Fristen, Prüfer"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Preisspannen"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Schulen, Bauhöfe, Feuerwehren"],
    ],
    cta: "DGUV V3 Prüfung für Ihre Münchner Standorte anfragen.",
  },
];
