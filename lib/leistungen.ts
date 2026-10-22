import type { ServicePage } from "./pages";

// Leistungs- und Zielgruppen-Landingpages. Zielgruppenseiten liegen unter /betreiberpflichten/<slug>,
// die Kernleistung unter /externer-betreibermanager.
// Strategie: nicht auf generische Begriffe gegen TÜV NORD, DGWZ und Rödl & Partner antreten, sondern
// Zielgruppen-Keywords besetzen (Betreiberpflichten Wohnungsunternehmen, Kommune, Krankenhaus …).

// TODO: Kostenmodell mit dem Inhaber abgleichen und, sobald belastbar, Preisspannen ergänzen
// (z. B. „Bestandsaufnahme ab … € je Standort“) – konkrete Zahlen erhöhen die Anfragequote deutlich.
export const externerBetreibermanager: ServicePage = {
  slug: "externer-betreibermanager",
  name: "Externer Betreibermanager",
  title: "Externer Betreibermanager – Betreiberpflichten auslagern",
  description:
    "Externer Betreibermanager: Wir ermitteln Ihre Betreiberpflichten, koordinieren Prüfungen, überwachen Fristen und sichern Nachweise. Kostenmodell und Anfrage.",
  h1: "Externer Betreibermanager: Betreiberpflichten organisieren lassen",
  kicker: "LEISTUNG",
  serviceType: "Externes Betreibermanagement",
  cardText:
    "Pflichtenermittlung, Prüfkoordination, Fristenüberwachung und Nachweisführung als ausgelagerte Funktion – ohne eigene Stelle.",
  highlights: [
    "Betreiberpflichtenkataster je Standort",
    "Fristenüberwachung über alle Gewerke",
    "Nachweise prüfungssicher abgelegt",
    "Erstgespräch kostenfrei",
  ],
  lead: [
    "Ein externer Betreibermanager übernimmt die Aufgaben hinter der Betreiberverantwortung: Er ermittelt, welche Prüf- und Wartungspflichten für Ihre Gebäude und Anlagen gelten, beauftragt qualifizierte Prüfer, überwacht Fristen, verfolgt Mängel und führt die Nachweise zusammen. Die gesetzliche Verantwortung bleibt beim Betreiber – die Organisation liegt bei uns.",
    "Das lohnt sich für Organisationen mit mehreren Standorten und vielen prüfpflichtigen Anlagen, in denen Prüfungen bisher auf Hausmeister, Technik, Einkauf und Verwaltung verteilt sind und niemand den Gesamtstand kennt.",
  ],
  blocks: [
    { type: "h2", text: "Was ist ein externer Betreibermanager?" },
    {
      type: "definition",
      term: "Externer Betreibermanager",
      text: "Ein Dienstleister, der für Eigentümer und Betreiber von Gebäuden die Organisation der Betreiberpflichten übernimmt: Pflichtenermittlung, Prüf- und Wartungsplanung, Beauftragung, Fristenüberwachung, Mängelverfolgung und Dokumentation. Grundlage ist eine schriftliche Aufgabenübertragung im Sinne der GEFMA 190; die Betreiberverantwortung selbst ist nicht übertragbar.",
    },
    {
      type: "p",
      text: "Im Unterschied zum Prüfdienstleister prüft der Betreibermanager nicht selbst. Er steht zwischen Betreiber und den vielen Prüf- und Wartungsfirmen und sorgt dafür, dass keine Pflicht übersehen, keine Frist versäumt und kein Nachweis verloren wird. Was dazu gehört, beschreibt der Artikel [Was ist Betreiberverantwortung?](/wissen/was-ist-betreiberverantwortung).",
    },
    { type: "h2", text: "Aufgaben eines Betreibermanagers" },
    {
      type: "table",
      caption: "Aufgaben und Ergebnisse im Überblick",
      head: ["Aufgabe", "Was konkret passiert", "Ergebnis für Sie"],
      rows: [
        ["Bestand aufnehmen", "Gebäude, technische Anlagen und vorhandene Prüfberichte je Standort erfassen", "Vollständige Anlagenliste"],
        ["Pflichten ermitteln", "Jeder Anlage die geltenden Vorschriften, Prüfarten, Fristen und Prüferqualifikation zuordnen", "[Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen)"],
        ["Zuständigkeiten klären", "Festlegen, wer intern und extern welche Aufgabe übernimmt; Delegation schriftlich dokumentieren", "Klare Verantwortungsmatrix"],
        ["Prüfungen beauftragen", "Qualifizierte Prüfpartner auswählen, Angebote einholen, Termine mit dem Betrieb abstimmen", "Prüfungen ohne eigenen Koordinationsaufwand"],
        ["Fristen überwachen", "Alle Prüf- und Wartungstermine zentral führen und rechtzeitig anstoßen", "Keine überschrittenen Fristen"],
        ["Mängel verfolgen", "Mängel aus Prüfberichten erfassen, Behebung beauftragen und bis zum Abschluss nachhalten", "Geschlossene Mängelliste"],
        ["Nachweise führen", "Prüfberichte, Bescheinigungen und Protokolle je Anlage ablegen", "Prüfungssichere Dokumentation für Behörde, BG und Versicherer"],
        ["Berichten", "Regelmäßiger Statusbericht an Geschäftsführung bzw. Verwaltungsleitung", "Nachweis der eigenen Kontrollpflicht"],
      ],
    },
    { type: "h2", text: "Haftungsrisiken ohne organisierte Betreiberpflichten" },
    {
      type: "p",
      text: "Wer Gebäude und Anlagen betreibt, muss so organisieren, dass niemand zu Schaden kommt. Kommt es zu einem Unfall oder Brand, wird geprüft, ob Prüfungen durchgeführt, Mängel behoben und Zuständigkeiten geregelt waren. Fehlt dieser Nachweis, steht schnell der Vorwurf des **Organisationsverschuldens** im Raum.",
    },
    {
      type: "table",
      caption: "Haftungsebenen bei verletzten Betreiberpflichten",
      head: ["Ebene", "Rechtsgrundlage (Auswahl)", "Mögliche Folge"],
      rows: [
        ["Zivilrecht", "§§ 823, 831, 836 BGB", "Schadensersatz und Schmerzensgeld gegenüber Geschädigten"],
        ["Ordnungswidrigkeit", "§ 22 BetrSichV, § 25 ArbSchG, § 209 SGB VII, § 130 OWiG", "Bußgelder gegen Unternehmen und Leitungspersonen"],
        ["Strafrecht", "§§ 222, 229 StGB", "Ermittlungen wegen fahrlässiger Tötung oder Körperverletzung gegen verantwortliche Personen"],
        ["Versicherung", "Obliegenheiten im Versicherungsvertrag, § 28 VVG", "Leistungskürzung bis Leistungsfreiheit"],
      ],
    },
    {
      type: "p",
      text: "Ausführlich mit Fallbeispielen: [Wer haftet bei fehlenden Prüfungen?](/wissen/haftung-fehlende-pruefungen)",
    },
    { type: "h2", text: "So organisieren wir Ihre Betreiberpflichten" },
    {
      type: "steps",
      items: [
        "**Erstgespräch:** Standorte, Gebäudearten, Anlagen und bekannte Lücken besprechen – kostenfrei.",
        "**Bestandsaufnahme:** Anlagen und vorhandene Nachweise je Standort erfassen, Prüfstatus bewerten.",
        "**Betreiberpflichtenkataster:** Pflichten, Fristen, Prüferqualifikation und Zuständigkeiten je Anlage festlegen.",
        "**Übergabe oder laufende Betreuung:** Sie erhalten das Kataster mit Maßnahmenliste – oder wir übernehmen Beauftragung, Fristenüberwachung, Mängelverfolgung und Dokumentation dauerhaft.",
      ],
    },
    {
      type: "checklist",
      items: [
        "Ein Ansprechpartner für Elektro, Brandschutz, Aufzüge, Lüftung, Druckanlagen und Trinkwasser",
        "Prüfpartner mit Befähigung nach TRBS 1203 bzw. Zulassung als ZÜS, wo vorgeschrieben",
        "Arbeitsweise nach der Systematik der GEFMA 190",
        "Statusbericht für Geschäftsführung, Vorstand oder Verwaltungsleitung",
      ],
    },
    {
      type: "example",
      title: "Mittelständischer Bestandshalter mit 14 Liegenschaften",
      text: [
        "Ausgangslage: Prüfungen wurden je Objekt vom Hausmeister beauftragt, Berichte lagen in E-Mail-Postfächern. Für drei Aufzüge war die Zwischenprüfung überfällig, für zwei Großanlagen zur Trinkwassererwärmung fehlte die Legionellenuntersuchung.",
        "Vorgehen: Bestandsaufnahme aller 14 Objekte, Kataster mit rund 400 prüfpflichtigen Positionen, Bündelung der Elektro- und Brandschutzprüfungen nach Region, Nachholung der überfälligen Prüfungen innerhalb von sechs Wochen.",
        "Ergebnis: ein Fristenplan für alle Objekte, eine zentrale Nachweisablage und ein quartalsweiser Statusbericht an die Geschäftsführung. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
      ],
    },
    { type: "h2", text: "Kostenmodell" },
    {
      type: "p",
      text: "Wir trennen konsequent zwischen unserer Koordinationsleistung und den Kosten der eigentlichen Prüfungen. So sehen Sie jederzeit, was die Organisation kostet und was die Prüfung selbst.",
    },
    {
      type: "table",
      caption: "Leistungsbausteine und Abrechnung",
      head: ["Baustein", "Umfang", "Abrechnung"],
      rows: [
        ["Erstgespräch", "Bedarf, Standorte, Prüfstatus", "kostenfrei"],
        ["Bestandsaufnahme und Betreiberpflichtenkataster", "Anlagenerfassung, Pflichtenmatrix, Maßnahmenliste je Standort", "Festpreis je Standort nach Anlagenumfang; abgeschlossene Leistung ohne Jahresbindung"],
        ["Laufendes Betreibermanagement", "Beauftragung, Fristenüberwachung, Mängelverfolgung, Dokumentation, Statusbericht", "Pauschale nach Zahl der Standorte und Anlagen, im Angebot festgelegt"],
        ["Prüfungen und Wartungen", "Durchführung durch qualifizierte Prüfpartner bzw. ZÜS", "nach Angebot des Prüfpartners, getrennt ausgewiesen"],
        ["Projekte", "z. B. Objektübernahme, Ausschreibung von Prüfleistungen", "Festpreis oder nach Aufwand"],
      ],
    },
    {
      type: "p",
      text: "Was einzelne Prüfungen kosten, zeigt beispielhaft die Seite [DGUV V3 Prüfung Kosten](/pruefbereiche/dguv-v3-pruefung/kosten). Durch Bündelung von Terminen und Standorten sinken die Prüfkosten häufig spürbar – oft genug, um einen Teil der Koordination zu finanzieren.",
    },
    { type: "h2", text: "Für wen sich ein externer Betreibermanager lohnt" },
    {
      type: "checklist",
      items: [
        "[Wohnungsunternehmen](/betreiberpflichten/wohnungsunternehmen) und Genossenschaften mit verteiltem Bestand",
        "[Kommunen](/betreiberpflichten/kommunen) mit Schulen, Kitas, Verwaltungsgebäuden und Sportstätten",
        "[Krankenhäuser und Pflegeeinrichtungen](/betreiberpflichten/krankenhaeuser) mit hoher Anlagendichte",
        "Unternehmen mit mehreren Standorten ohne eigene FM-Abteilung",
        "Eigentümer nach einer [Objektübernahme](/wissen/betreiberpflichten-objektuebernahme) oder einem Neubau",
      ],
    },
  ],
  faqs: [
    [
      "Kann ich die Betreiberverantwortung an einen externen Betreibermanager abgeben?",
      "Nein. Die Betreiberverantwortung bleibt immer beim Eigentümer bzw. Betreiber. Übertragbar sind die Aufgaben: Pflichten ermitteln, Prüfungen beauftragen, Fristen überwachen, Nachweise führen. Der Betreiber behält eine Auswahl- und Kontrollpflicht, die er mit einem regelmäßigen Statusbericht erfüllt.",
    ],
    [
      "Worin unterscheidet sich ein Betreibermanager von einem Prüfdienstleister?",
      "Ein Prüfdienstleister prüft einzelne Anlagen. Ein Betreibermanager organisiert alle Prüf- und Wartungspflichten über Gewerke und Standorte hinweg, beauftragt die Prüfer, überwacht Fristen und führt die Nachweise zusammen.",
    ],
    [
      "Was kostet ein externer Betreibermanager?",
      "Die Bestandsaufnahme mit Betreiberpflichtenkataster rechnen wir als Festpreis je Standort ab, das laufende Betreibermanagement als Pauschale nach Zahl der Standorte und Anlagen. Die Kosten der Prüfungen selbst weisen wir getrennt aus. Das Erstgespräch ist kostenfrei.",
    ],
    [
      "Muss ich einen Vertrag über mehrere Jahre abschließen?",
      "Nein. Die Bestandsaufnahme mit Kataster ist eine abgeschlossene Leistung ohne Jahresbindung. Ob danach eine laufende Betreuung sinnvoll ist, entscheiden Sie auf Basis des Ergebnisses.",
    ],
    [
      "Welche Anlagen umfasst das Betreibermanagement?",
      "Alle prüfpflichtigen technischen Anlagen und Gebäudeteile, insbesondere elektrische Anlagen nach DGUV Vorschrift 3, Brandschutztechnik, Aufzüge, Lüftungs- und Klimaanlagen nach VDI 6022, Druckanlagen, Trinkwasseranlagen sowie Verkehrssicherungsthemen wie Spielplätze und Außenanlagen.",
    ],
  ],
  norms: ["GEFMA 190", "BetrSichV", "DGUV V3", "ArbStättV", "TRBS 1203", "VDI 6022", "ArbSchG"],
  related: [
    ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Anleitung mit Vorlage"],
    ["Wer haftet bei fehlenden Prüfungen?", "/wissen/haftung-fehlende-pruefungen", "Haftung und Delegation"],
    ["Betreiberpflichten im Facility Management", "/wissen/betreiberpflichten-facility-management", "GEFMA 190 in der Praxis"],
    ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
  ],
  cta: "Betreiberpflichten auslagern – Angebot anfordern.",
};

export const audiences: ServicePage[] = [
  {
    slug: "wohnungsunternehmen",
    name: "Wohnungsunternehmen",
    title: "Betreiberpflichten Wohnungsunternehmen – Prüfpflichten im Bestand",
    description:
      "Betreiberpflichten für Wohnungsunternehmen und Genossenschaften: Prüfpflichten im Wohnungsbestand, Fristen, Haftung und Organisation – mit Checkliste.",
    h1: "Betreiberpflichten für Wohnungsunternehmen: Prüfpflichten im Wohnungsbestand organisieren",
    kicker: "WOHNUNGSWIRTSCHAFT",
    serviceType: "Betreibermanagement für Wohnungsunternehmen",
    cardText:
      "Trinkwasser, Aufzüge, Rauchwarnmelder, Spielplätze, Allgemeinstrom: Prüfpflichten im Wohnungsbestand vollständig erfasst und überwacht.",
    highlights: [
      "Für Wohnungsbaugesellschaften, Genossenschaften und Bestandshalter",
      "Kataster je Wirtschaftseinheit",
      "Termine nach Quartieren gebündelt",
    ],
    lead: [
      "Wohnungsunternehmen tragen als Eigentümer die Betreiberverantwortung für jedes Gebäude im Bestand: Sie müssen Trinkwasseranlagen auf Legionellen untersuchen, Aufzüge durch eine ZÜS prüfen, Rauchwarnmelder warten, Spielplätze inspizieren und Verkehrswege sichern lassen. Die Pflichten ergeben sich aus Bundesrecht, Landesbauordnungen, Normen und der allgemeinen Verkehrssicherungspflicht.",
      "Die Herausforderung ist nicht die einzelne Prüfung, sondern die Menge: hunderte Objekte, verteilte Zuständigkeiten zwischen Bestandsmanagement, Technik und Hausmeisterdienst – und Prüfberichte, die selten an einer Stelle zusammenlaufen.",
    ],
    blocks: [
      { type: "h2", text: "Was Betreiberverantwortung in der Wohnungswirtschaft bedeutet" },
      {
        type: "definition",
        term: "Betreiberverantwortung in der Wohnungswirtschaft",
        text: "Die Pflicht des Eigentümers, Wohngebäude, Außenanlagen und gebäudetechnische Anlagen so zu betreiben, dass Mieter, Besucher und Beschäftigte nicht zu Schaden kommen. Sie umfasst gesetzliche Prüfpflichten, die Verkehrssicherungspflicht nach § 823 BGB und die Haftung für Gebäudeteile nach § 836 BGB.",
      },
      {
        type: "p",
        text: "Viele Pflichten gelten unabhängig davon, ob im Gebäude Beschäftigte arbeiten. Aufzüge sind überwachungsbedürftige Anlagen, Trinkwasseranlagen unterliegen der Trinkwasserverordnung, Rauchwarnmelder der jeweiligen Landesbauordnung. Für Hausmeisterwerkstätten, Geschäftsstellen und Regiebetriebe kommen die Arbeitgeberpflichten aus ArbStättV, BetrSichV und DGUV Vorschrift 3 hinzu.",
      },
      { type: "h2", text: "Prüfpflichten im Wohnungsbestand: Übersicht" },
      {
        type: "table",
        caption: "Typische Prüf- und Kontrollpflichten im Wohnungsbestand (Richtwerte)",
        head: ["Anlage / Bereich", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Großanlagen zur Trinkwassererwärmung", "Untersuchung auf Legionellen", "mindestens alle 3 Jahre", "§ 31 TrinkwV"],
          ["Aufzüge", "Haupt- und Zwischenprüfung durch ZÜS", "im Wechsel jährlich", "BetrSichV Anhang 2 Abschnitt 2"],
          ["Rauchwarnmelder", "Inspektion und Wartung", "jährlich", "Landesbauordnung, DIN 14676-1"],
          ["Spielplätze", "Routine-, operative und Hauptinspektion", "wöchentlich bis jährlich", "DIN EN 1176-7"],
          ["Feuerstätten und Abgasanlagen", "Feuerstättenschau, Kehr- und Überprüfungsarbeiten", "zweimal in 7 Jahren bzw. laut Feuerstättenbescheid", "SchfHwG, KÜO"],
          ["Feuerlöscher (Tiefgarage, Gewerbe, Werkstatt)", "Instandhaltung durch Sachkundigen", "2 Jahre", "ASR A2.2, DIN 14406-4"],
          ["Garagen (Mittel- und Großgaragen)", "Prüfung CO-Warnanlage und Lüftung durch Prüfsachverständige", "in der Regel 3 Jahre", "Prüfverordnung bzw. Garagenverordnung des Landes"],
          ["Elektrische Anlagen in Werkstätten und Geschäftsstellen", "Wiederholungsprüfung", "4 Jahre (ortsfest), Geräte nach Gefährdungsbeurteilung", "DGUV Vorschrift 3"],
          ["Bäume auf dem Grundstück", "Regelkontrolle", "je nach Zustand 1–3 Jahre", "Verkehrssicherungspflicht, FLL-Baumkontrollrichtlinie"],
          ["Dach, Fassade, Balkone", "Begehung auf Standsicherheit und lose Teile", "nach Gebäudezustand", "§ 836 BGB, VDI 6200"],
        ],
      },
      {
        type: "note",
        text: "Die Intervalle sind Richtwerte. Abweichungen ergeben sich aus Landesrecht, Herstellerangaben und dem Zustand der Anlage. Alle Fristen je Prüfbereich: [Prüffristen im Überblick](/prueffristen).",
      },
      { type: "h2", text: "Typische Lücken in Wohnungsbeständen" },
      {
        type: "checklist",
        items: [
          "Großanlagen zur Trinkwassererwärmung sind nicht als solche erkannt – die Legionellenuntersuchung fehlt",
          "Rauchwarnmelder-Wartung ist an Mieter übertragen, ohne dass die Landesregelung das zulässt oder es kontrolliert wird",
          "Spielplatzinspektionen finden statt, sind aber nicht dokumentiert",
          "Prüfberichte von Aufzügen liegen beim Wartungsunternehmen, nicht beim Eigentümer",
          "Nach Zukäufen sind Prüfstatus und Unterlagen der übernommenen Objekte unbekannt",
          "Mängel aus Prüfberichten werden nicht nachverfolgt",
        ],
      },
      {
        type: "example",
        title: "Genossenschaft mit 2.300 Wohnungen in 48 Wirtschaftseinheiten",
        text: [
          "Die Bestandsaufnahme ergibt: 31 Großanlagen zur Trinkwassererwärmung, 22 Aufzüge, 17 Spielplätze, 4 Tiefgaragen. Die Legionellenuntersuchung war für 9 Anlagen nicht beauftragt, für 2 Tiefgaragen fehlte die Prüfung der CO-Warnanlage.",
          "Wir legen ein Kataster je Wirtschaftseinheit an, beauftragen die fehlenden Untersuchungen, bündeln Rauchwarnmelder-Wartung und Spielplatzinspektionen quartiersweise und richten einen Fristenplan für das Bestandsmanagement ein. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
      { type: "h2", text: "Was wir für Wohnungsunternehmen übernehmen" },
      {
        type: "steps",
        items: [
          "Bestand je Wirtschaftseinheit erfassen und Prüfpflichten zuordnen – auch für Zukäufe und Neubauten",
          "Zuständigkeiten zwischen Bestandsmanagement, Technik, Hausmeisterdienst und Dienstleistern festlegen",
          "Prüfungen und Wartungen quartiersweise bündeln und beauftragen, Mieterankündigungen koordinieren",
          "Prüfberichte zentral ablegen, Mängel verfolgen und dem Vorstand bzw. der Geschäftsführung berichten",
        ],
      },
      {
        type: "p",
        text: "Eine ausführliche Checkliste je Gebäudeart finden Sie im Fachartikel [Prüfpflichten im Wohnungsbestand](/wissen/pruefpflichten-wohnungsbestand). Für WEG- und Mietverwaltungen gilt eine eigene Rollenverteilung: [Betreiberpflichten für Hausverwaltungen](/wissen/betreiberpflichten-hausverwaltung).",
      },
    ],
    faqs: [
      [
        "Welche Betreiberpflichten hat ein Wohnungsunternehmen?",
        "Zu den wichtigsten gehören die Legionellenuntersuchung von Großanlagen zur Trinkwassererwärmung nach § 31 TrinkwV, die Prüfung von Aufzügen durch eine ZÜS, die Wartung von Rauchwarnmeldern nach Landesbauordnung, die Inspektion von Spielplätzen nach DIN EN 1176, die Verkehrssicherung von Wegen, Bäumen und Gebäudeteilen sowie die Arbeitgeberpflichten für Werkstätten und Geschäftsstellen.",
      ],
      [
        "Wie oft muss Trinkwasser in Mehrfamilienhäusern auf Legionellen untersucht werden?",
        "Bei Großanlagen zur Trinkwassererwärmung im Rahmen einer gewerblichen Tätigkeit wie der Vermietung mindestens alle drei Jahre (§ 31 TrinkwV). Großanlage bedeutet vereinfacht: Speicher über 400 Liter oder mehr als 3 Liter Inhalt in einer Leitung zwischen Erwärmer und Entnahmestelle – Ein- und Zweifamilienhäuser sind ausgenommen.",
      ],
      [
        "Können Wohnungsunternehmen Betreiberpflichten an Mieter übertragen?",
        "Nur in engen Grenzen. Bei Rauchwarnmeldern regeln einige Landesbauordnungen, dass Mieter die Betriebsbereitschaft sicherstellen; der Eigentümer bleibt aber für Einbau und oft auch Wartung zuständig. Prüfpflichten aus TrinkwV oder BetrSichV lassen sich nicht auf Mieter verlagern.",
      ],
      [
        "Haftet der Vorstand einer Genossenschaft für fehlende Prüfungen?",
        "Vorstand und Geschäftsführung müssen die Organisation so gestalten, dass Pflichten erfüllt werden. Fehlt eine solche Organisation, kommt neben der Haftung des Unternehmens auch eine persönliche Verantwortung wegen Organisations- oder Aufsichtspflichtverletzung in Betracht, etwa nach § 130 OWiG.",
      ],
      [
        "Lohnt sich ein externer Betreibermanager für kleinere Bestände?",
        "Ab etwa zehn Objekten mit Aufzügen, zentraler Warmwasserbereitung oder Tiefgaragen wird die Koordination aufwendig. Als Einstieg eignet sich eine Bestandsaufnahme mit Kataster als abgeschlossene Leistung ohne laufenden Vertrag.",
      ],
    ],
    norms: ["TrinkwV", "BetrSichV", "DIN 14676", "DIN EN 1176", "BGB", "DGUV V3", "ArbStättV", "GEFMA 190"],
    related: [
      ["Prüfpflichten im Wohnungsbestand", "/wissen/pruefpflichten-wohnungsbestand", "Checkliste je Gebäudeart"],
      ["Betreiberpflichten für Hausverwaltungen", "/wissen/betreiberpflichten-hausverwaltung", "WEG und Mietverwaltung"],
      ["Betreiberpflichten bei Objektübernahmen", "/wissen/betreiberpflichten-objektuebernahme", "Zukäufe sicher übernehmen"],
      ["Aufzugsprüfung durch die ZÜS", "/pruefbereiche/aufzugsanlagen", "Haupt- und Zwischenprüfung"],
    ],
    cta: "Prüfpflichten im Bestand klären – Angebot anfordern.",
  },
  {
    slug: "kommunen",
    name: "Kommunen",
    title: "Betreiberpflichten Kommune – öffentliche Gebäude & Schulen",
    description:
      "Betreiberpflichten für Kommunen: Schulen, Kitas, Verwaltungsgebäude und Sportstätten. Prüfpflichten, Sonderbauten, Haftung und Organisation im Überblick.",
    h1: "Betreiberpflichten für Kommunen: Betreiberverantwortung für öffentliche Gebäude",
    kicker: "KOMMUNEN & ÖFFENTLICHE AUFTRAGGEBER",
    serviceType: "Betreibermanagement für Kommunen und öffentliche Gebäude",
    cardText:
      "Schulen, Kitas, Verwaltungsgebäude, Sporthallen: Prüfpflichten nach Sonderbaurecht, DGUV und TrinkwV zentral organisiert.",
    highlights: [
      "Schulen, Kitas, Verwaltung, Sportstätten, Bauhöfe",
      "Sonderbauten und Prüfverordnungen der Länder",
      "Vergabefähige Leistungsbeschreibungen",
    ],
    lead: [
      "Kommunen sind Betreiber einer Vielzahl unterschiedlicher Gebäude – Schulen, Kitas, Rathäuser, Turnhallen, Feuerwehrhäuser, Bauhöfe und Bürgerhäuser. Für jedes gelten eigene Prüfpflichten: Sonderbauten nach den Prüfverordnungen der Länder, elektrische Anlagen nach DGUV Vorschrift 4, Trinkwasser jährlich auf Legionellen, Spiel- und Sportgeräte nach DIN-Normen.",
      "Die Betreiberverantwortung liegt bei der Kommune als Eigentümerin und wird durch Bürgermeister bzw. Verwaltungsleitung wahrgenommen. In der Praxis verteilen sich die Aufgaben auf Gebäudemanagement, Schulverwaltung, Hausmeister und Fachämter – genau dort entstehen die Lücken.",
    ],
    blocks: [
      { type: "h2", text: "Welche Betreiberpflichten Kommunen haben" },
      {
        type: "definition",
        term: "Betreiberverantwortung öffentlicher Gebäude",
        text: "Die Pflicht des öffentlichen Gebäudeeigentümers, Gebäude und Anlagen sicher zu betreiben und dies nachzuweisen. Sie folgt aus Arbeitsschutzrecht, Bauordnungsrecht der Länder, Trinkwasserverordnung, Unfallverhütungsvorschriften der Unfallkassen und der Verkehrssicherungspflicht; Pflichtverletzungen können zur Amtshaftung nach § 839 BGB in Verbindung mit Art. 34 GG führen.",
      },
      {
        type: "p",
        text: "Eine Besonderheit: Für Kommunen ist nicht die Berufsgenossenschaft, sondern die Unfallkasse zuständig. Statt DGUV Vorschrift 3 gilt die inhaltsgleiche **DGUV Vorschrift 4**. Zudem sind viele kommunale Gebäude **Sonderbauten** – Schulen, Versammlungsstätten, große Verwaltungsgebäude –, für die die Prüfverordnungen der Länder wiederkehrende Prüfungen durch Prüfsachverständige vorschreiben.",
      },
      { type: "h2", text: "Prüfpflichten nach Gebäudetyp" },
      {
        type: "table",
        caption: "Typische Prüfpflichten in kommunalen Gebäuden (Richtwerte, Landesrecht beachten)",
        head: ["Gebäude / Anlage", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Schulen, Versammlungsstätten: Sicherheitsbeleuchtung, BMA, RWA, Lüftung", "Prüfung durch Prüfsachverständige", "in der Regel 3 Jahre", "Prüfverordnung des Landes"],
          ["Alle Gebäude: elektrische Anlagen", "Wiederholungsprüfung", "4 Jahre, Räume besonderer Art 1 Jahr", "DGUV Vorschrift 4 (inhaltsgleich V3)"],
          ["Ortsveränderliche Geräte in Verwaltung, Schule, Bauhof", "Wiederholungsprüfung", "nach Gefährdungsbeurteilung, Richtwerte 6–24 Monate", "DGUV Vorschrift 4"],
          ["Schulen, Kitas, Sporthallen: Trinkwasser-Großanlagen", "Untersuchung auf Legionellen", "mindestens jährlich", "§ 31 TrinkwV (öffentliche Tätigkeit)"],
          ["Kita- und Schulhofspielplätze", "Routine-, operative und Hauptinspektion", "wöchentlich bis jährlich", "DIN EN 1176-7"],
          ["Sporthallen: Sportgeräte", "Inspektion und Wartung", "jährlich", "DIN EN 913, DIN 7910"],
          ["Feuerlöscher", "Instandhaltung durch Sachkundigen", "2 Jahre", "ASR A2.2"],
          ["Aufzüge", "Haupt- und Zwischenprüfung durch ZÜS", "im Wechsel jährlich", "BetrSichV Anhang 2"],
          ["RLT-Anlagen", "Hygieneinspektion", "2–3 Jahre", "VDI 6022 Blatt 1"],
          ["Kraftbetätigte Türen und Tore (Feuerwehr, Bauhof)", "Prüfung durch Sachkundigen", "mindestens jährlich", "ASR A1.7"],
        ],
      },
      {
        type: "note",
        text: "Details zu Schulen mit Fachräumen, Werkräumen und Sporthallen: [Betreiberpflichten für Schulen](/wissen/betreiberpflichten-schulen).",
      },
      { type: "h2", text: "Typische Schwachstellen in Kommunen" },
      {
        type: "checklist",
        items: [
          "Zuständigkeit zwischen Schulträger, Schulleitung und Hausmeister ist nicht schriftlich geregelt",
          "Prüfsachverständigen-Prüfungen nach Prüfverordnung sind nicht im Fristenplan, weil sie im Bauamt geführt werden",
          "Legionellenuntersuchung in Turnhallen-Duschen wird als „Mietersache“ des Vereins betrachtet",
          "Mängel aus Brandverhütungsschauen werden nicht nachverfolgt",
          "Geräte, die Lehrkräfte oder Vereine mitbringen, sind nicht erfasst",
          "Prüfleistungen werden einzeln je Gebäude vergeben, Preise und Qualität sind nicht vergleichbar",
        ],
      },
      {
        type: "example",
        title: "Mittelstadt mit 63 Liegenschaften",
        text: [
          "Das Gebäudemanagement führt Prüfungen in Tabellen je Hausmeisterbezirk. Bei einer Brandverhütungsschau fallen in zwei Schulen überfällige Prüfungen der Sicherheitsbeleuchtung auf.",
          "Wir erstellen ein liegenschaftsübergreifendes Kataster, ordnen Pflichten nach Prüfverordnung, DGUV Vorschrift 4 und TrinkwV zu, regeln die Zuständigkeiten per Dienstanweisung und bereiten die Ausschreibung der Elektroprüfungen in Losen nach Stadtteilen vor. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
      { type: "h2", text: "Was wir für Kommunen übernehmen" },
      {
        type: "steps",
        items: [
          "Liegenschaften erfassen, Sonderbauten identifizieren und Prüfpflichten je Gebäude zuordnen",
          "Zuständigkeiten zwischen Gebäudemanagement, Schulträger, Hausmeistern und Nutzern dokumentieren",
          "Vergabefähige Leistungsverzeichnisse für Prüf- und Wartungsleistungen vorbereiten",
          "Fristen überwachen, Prüfberichte und Mängel zentral führen, der Verwaltungsleitung berichten",
        ],
      },
    ],
    faqs: [
      [
        "Wer trägt in einer Kommune die Betreiberverantwortung?",
        "Die Kommune als Eigentümerin, vertreten durch Bürgermeister bzw. Verwaltungsleitung. Aufgaben werden per Organisationsverfügung oder Dienstanweisung an Gebäudemanagement, Fachämter und Hausmeister übertragen. Die Leitung muss Auswahl und Kontrolle sicherstellen.",
      ],
      [
        "Gilt für Kommunen die DGUV Vorschrift 3?",
        "Für Kommunen als Mitglieder der Unfallkassen gilt die DGUV Vorschrift 4. Sie ist inhaltsgleich mit der DGUV Vorschrift 3, auch bei den Prüffristen für elektrische Anlagen und Betriebsmittel.",
      ],
      [
        "Welche Betreiberpflichten gelten für Schulen?",
        "Unter anderem Prüfungen sicherheitstechnischer Anlagen durch Prüfsachverständige nach der Prüfverordnung des Landes, Elektroprüfungen nach DGUV Vorschrift 4, jährliche Legionellenuntersuchung bei Großanlagen zur Trinkwassererwärmung, Inspektion von Spiel- und Sportgeräten sowie Prüfungen in Fachräumen wie Abzügen und Gasanlagen.",
      ],
      [
        "Wie oft muss in öffentlichen Gebäuden auf Legionellen untersucht werden?",
        "Bei Großanlagen zur Trinkwassererwärmung im Rahmen einer öffentlichen Tätigkeit – etwa in Schulen, Kitas und Sporthallen – mindestens jährlich nach § 31 TrinkwV.",
      ],
      [
        "Können Kommunen das Betreibermanagement extern vergeben?",
        "Ja, die organisatorischen Aufgaben können als Dienstleistung vergeben werden, abhängig vom Auftragswert nach dem jeweiligen Vergaberecht. Die Betreiberverantwortung bleibt bei der Kommune.",
      ],
    ],
    norms: ["PrüfVO", "DGUV V3", "TrinkwV", "BetrSichV", "ArbStättV", "DIN EN 1176", "VDI 6022", "GEFMA 190"],
    related: [
      ["Betreiberpflichten für Schulen", "/wissen/betreiberpflichten-schulen", "Fachräume, Sporthallen, Sonderbau"],
      ["Was ist Betreiberverantwortung?", "/wissen/was-ist-betreiberverantwortung", "Definition und Grundlagen"],
      ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Anleitung mit Vorlage"],
      ["Brandschutzprüfung", "/pruefbereiche/brandschutz", "BMA, Löschtechnik, Sicherheitsbeleuchtung"],
    ],
    cta: "Betreiberpflichten Ihrer Liegenschaften klären.",
  },
  {
    slug: "krankenhaeuser",
    name: "Krankenhäuser",
    title: "Betreiberpflichten Krankenhaus – Prüfmanagement Klinik",
    description:
      "Betreiberverantwortung im Krankenhaus: Prüfmanagement für Medizintechnik, Elektro, Notstrom, RLT, Trinkwasser und Brandschutz. Pflichten, Fristen, Organisation.",
    h1: "Betreiberverantwortung im Krankenhaus: Prüfmanagement für Kliniken und Pflegeeinrichtungen",
    kicker: "KLINIKEN & PFLEGE",
    serviceType: "Prüfmanagement für Krankenhäuser und Pflegeeinrichtungen",
    cardText:
      "Medizinisch genutzte Bereiche, Notstrom, RLT, Trinkwasser und Brandschutz: Prüfmanagement für Kliniken und Pflegeeinrichtungen.",
    highlights: [
      "Krankenhäuser, Reha-Kliniken, Pflegeeinrichtungen",
      "Abgestimmt mit Medizintechnik und Hygiene",
      "Prüfungen im laufenden Betrieb geplant",
    ],
    lead: [
      "Krankenhäuser gehören zu den Gebäuden mit der höchsten Dichte an Betreiberpflichten: medizinisch genutzte Bereiche mit jährlicher Elektroprüfung, Sicherheitsstromversorgung, raumlufttechnische Anlagen mit Hygieneanforderungen, Trinkwasser mit jährlicher Legionellenuntersuchung, Brandschutz im Sonderbau – und daneben die Medizinprodukte nach MPBetreibV.",
      "Ein fehlender Nachweis wiegt hier besonders schwer, weil Patienten sich nicht selbst in Sicherheit bringen können. Prüfmanagement im Krankenhaus heißt deshalb: alle Pflichten erfasst, Prüfungen ohne Störung der Versorgung geplant, Mängel nachweisbar behoben.",
    ],
    blocks: [
      { type: "h2", text: "Was Betreiberverantwortung in Kliniken umfasst" },
      {
        type: "definition",
        term: "Prüfmanagement im Krankenhaus",
        text: "Die systematische Planung, Beauftragung, Überwachung und Dokumentation aller wiederkehrenden Prüfungen an Gebäude, technischen Anlagen und Medizinprodukten einer Klinik – mit klarer Zuordnung zwischen Technik, Medizintechnik, Hygiene und externen Prüfern.",
      },
      {
        type: "p",
        text: "Krankenhäuser sind Sonderbauten. Neben den Arbeitgeberpflichten aus BetrSichV, ArbStättV und DGUV Vorschrift 3 gelten die Prüfverordnungen der Länder für sicherheitstechnische Anlagen, besondere Normen für medizinisch genutzte Bereiche und die Medizinprodukte-Betreiberverordnung. Viele Pflichten liegen an der Schnittstelle zwischen Haustechnik und Medizintechnik – dort entstehen Doppelbeauftragungen und Lücken zugleich.",
      },
      { type: "h2", text: "Prüfpflichten im Krankenhaus" },
      {
        type: "table",
        caption: "Typische Prüfpflichten in Krankenhäusern und Pflegeeinrichtungen (Richtwerte)",
        head: ["Anlage / Bereich", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Elektrische Anlagen in medizinisch genutzten Bereichen", "Wiederholungsprüfung (Räume besonderer Art)", "1 Jahr", "DGUV Vorschrift 3 Tabelle 1A, DIN VDE 0100-710"],
          ["Sicherheitsstromversorgung / Ersatzstromaggregat", "Funktionsprüfung unter Last, Wartung", "monatlich / jährlich", "DIN VDE 0100-710, Herstellerangaben"],
          ["Medizinprodukte nach Anlage 1 MPBetreibV", "Sicherheitstechnische Kontrolle", "spätestens alle 2 Jahre, früher bei absehbaren Mängeln", "§ 12 MPBetreibV"],
          ["Medizinprodukte mit Messfunktion nach Anlage 2", "Messtechnische Kontrolle", "nach Anlage 2", "§ 15 MPBetreibV"],
          ["RLT-Anlagen, OP-Bereiche", "Hygieneinspektion, Abnahme- und Wiederholungsprüfungen", "2–3 Jahre bzw. nach DIN 1946-4", "VDI 6022, DIN 1946-4"],
          ["Trinkwasser-Großanlagen", "Untersuchung auf Legionellen", "mindestens jährlich", "§ 31 TrinkwV (öffentliche Tätigkeit)"],
          ["BMA, Sicherheitsbeleuchtung, RWA", "Prüfung durch Prüfsachverständige", "in der Regel 3 Jahre", "Prüfverordnung des Landes"],
          ["Brandmeldeanlage", "Inspektion / Wartung", "vierteljährlich / jährlich", "DIN 14675, DIN VDE 0833"],
          ["Aufzüge, Bettenaufzüge", "Haupt- und Zwischenprüfung durch ZÜS", "im Wechsel jährlich", "BetrSichV Anhang 2"],
          ["Medizinische Gasversorgung", "Wiederkehrende Prüfung", "nach Hersteller und Gefährdungsbeurteilung", "DIN EN ISO 7396-1, BetrSichV"],
        ],
      },
      {
        type: "note",
        text: "Medizinprodukte selbst koordiniert in der Regel die Medizintechnik. Wir stimmen uns mit ihr ab, damit Prüfungen nicht doppelt beauftragt werden. Für Pflegeheime gelten teils abweichende Schwerpunkte: [Betreiberpflichten für Pflegeheime](/wissen/betreiberpflichten-pflegeheime).",
      },
      { type: "h2", text: "Typische Schwachstellen im Klinikbetrieb" },
      {
        type: "checklist",
        items: [
          "Unklare Grenze zwischen Haustechnik und Medizintechnik bei elektrischen Prüfungen",
          "Notstrom-Probeläufe werden durchgeführt, aber nicht dokumentiert",
          "Mängel aus Prüfsachverständigen-Berichten bleiben wegen Budgetfragen offen",
          "Prüftermine kollidieren mit OP- und Stationsbetrieb und werden verschoben",
          "Nach Umbauten fehlen Prüfungen vor Wiederinbetriebnahme",
        ],
      },
      {
        type: "example",
        title: "Klinik mit 380 Betten an zwei Standorten",
        text: [
          "Prüfungen werden von Technik, Medizintechnik und Hygiene getrennt geführt. Bei einer Begehung durch die Aufsichtsbehörde fehlt für einen Standort der Nachweis der wiederkehrenden Prüfung der Sicherheitsbeleuchtung.",
          "Wir führen die drei Listen in einem Kataster zusammen, legen Schnittstellen schriftlich fest, planen Prüfungen in Abstimmung mit OP-Plan und Stationsleitungen und berichten der Geschäftsführung quartalsweise über offene Mängel. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
      { type: "h2", text: "Was wir für Kliniken übernehmen" },
      {
        type: "steps",
        items: [
          "Anlagen und Räume erfassen, medizinisch genutzte Bereiche und Sonderbau-Anforderungen zuordnen",
          "Schnittstellen zwischen Technik, Medizintechnik, Hygiene und Brandschutzbeauftragten festlegen",
          "Prüfungen mit Betriebsabläufen abstimmen und qualifizierte Prüfpartner beauftragen",
          "Nachweise für Aufsichtsbehörde, Gesundheitsamt und Versicherer prüfungssicher führen",
        ],
      },
    ],
    faqs: [
      [
        "Welche Betreiberpflichten hat ein Krankenhaus?",
        "Neben den allgemeinen Arbeitgeberpflichten insbesondere: jährliche Elektroprüfung in medizinisch genutzten Bereichen, Prüfung der Sicherheitsstromversorgung, Prüfungen durch Prüfsachverständige nach Landesrecht, Hygieneinspektion der RLT-Anlagen, jährliche Legionellenuntersuchung, Aufzugsprüfungen durch die ZÜS und die Kontrollen von Medizinprodukten nach MPBetreibV.",
      ],
      [
        "Wie oft müssen elektrische Anlagen im Krankenhaus geprüft werden?",
        "Medizinisch genutzte Bereiche gehören zu den Räumen besonderer Art. Für sie nennt Tabelle 1A der Durchführungsanweisungen zur DGUV Vorschrift 3 eine Prüffrist von einem Jahr statt vier Jahren.",
      ],
      [
        "Wer ist im Krankenhaus für die Betreiberverantwortung zuständig?",
        "Der Krankenhausträger, vertreten durch die Geschäftsführung. Sie überträgt Aufgaben an Technische Leitung, Medizintechnik, Hygiene und Brandschutzbeauftragte und muss die Erfüllung kontrollieren.",
      ],
      [
        "Was ist der Unterschied zwischen STK und DGUV-V3-Prüfung?",
        "Die sicherheitstechnische Kontrolle (STK) nach § 12 MPBetreibV betrifft bestimmte aktive Medizinprodukte und ist spätestens alle zwei Jahre fällig. Die DGUV-V3-Prüfung betrifft elektrische Anlagen und Betriebsmittel allgemein. Für Medizinprodukte sollte geklärt sein, welche Prüfung was abdeckt, damit nicht doppelt beauftragt wird.",
      ],
    ],
    norms: ["MPBetreibV", "DGUV V3", "BetrSichV", "PrüfVO", "VDI 6022", "TrinkwV", "ArbStättV", "GEFMA 190"],
    related: [
      ["Betreiberpflichten für Pflegeheime", "/wissen/betreiberpflichten-pflegeheime", "Pflegeeinrichtungen im Detail"],
      ["Lüftung & Klima nach VDI 6022", "/pruefbereiche/lueftung-klima", "Hygieneinspektion"],
      ["Elektroprüfung nach DGUV V3", "/pruefbereiche/dguv-v3-pruefung", "Fristen und Ablauf"],
      ["Wer haftet bei fehlenden Prüfungen?", "/wissen/haftung-fehlende-pruefungen", "Haftung und Delegation"],
    ],
    cta: "Prüfmanagement für Ihre Klinik anfragen.",
  },
];

export const audienceBySlug = (slug: string) => audiences.find((a) => a.slug === slug);
