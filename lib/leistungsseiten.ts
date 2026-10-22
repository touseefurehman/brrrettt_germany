import type { ServicePage } from "./pages";

// Leistungsseiten auf die Keywords der Anlage A (Lastenheft 6.1). URL = `/${slug}` (T-01).
// Fristen geprüft am 22.10.2026: Gesetze am Volltext auf gesetze-im-internet.de, DGUV-Vorschriften an den
// Abdrucken der Unfallversicherungsträger, Normen anhand der Ausgabeangaben bei DIN Media.
// Links nur auf Seiten, die mit diesem Branch existieren – Fachartikel-Links folgen mit 06-fachartikel.

export const leistungsseiten: ServicePage[] = [
  {
    slug: "dguv-v3-pruefung",
    keyword: "dguv v3 prüfung",
    secondary: [
      "dguv v3 prüfung pflicht",
      "dguv vorschrift 3 prüfung",
      "elektroprüfung gewerbe",
      "prüfung ortsfester elektrischer anlagen",
      "dguv v4 prüfung",
    ],
    name: "DGUV V3 Prüfung",
    title: "DGUV V3 Prüfung: Fristen, Prüfer, Kosten",
    description:
      "DGUV V3 Prüfung elektrischer Anlagen und Geräte: wer verpflichtet ist, Richtfristen nach Tabelle 1A und 1B, wer prüfen darf, Kosten und Folgen.",
    h1: "DGUV V3 Prüfung: Pflicht, Fristen und Organisation für mehrere Standorte",
    kicker: "LEISTUNG · ELEKTROTECHNIK",
    serviceType: "Koordination der DGUV-V3-Prüfung",
    cardText: "Elektrische Anlagen und Geräte nach DGUV Vorschrift 3 prüfen lassen – Fristen, Prüfer, Nachweise.",
    highlights: [
      "Ortsfeste Anlagen und ortsveränderliche Geräte",
      "Befähigte Prüfer nach TRBS 1203",
      "Bundesweit für Organisationen mit mehreren Standorten",
    ],
    lead: [
      "Die DGUV V3 Prüfung ist die nach § 5 DGUV Vorschrift 3 vorgeschriebene Prüfung elektrischer Anlagen und Betriebsmittel auf ihren ordnungsgemäßen Zustand – vor der ersten Inbetriebnahme, nach Änderungen und Instandsetzungen sowie in regelmäßigen Abständen. Verpflichtet ist jeder Unternehmer, dessen Beschäftigte elektrische Anlagen oder Geräte nutzen; für Kommunen und andere Mitglieder der Unfallkassen gilt die inhaltsgleiche DGUV Vorschrift 4.",
      "betreibermanager.de koordiniert die DGUV V3 Prüfung für Organisationen mit mehreren Standorten in ganz Deutschland: Bestand erfassen, Fristen festlegen, befähigte Prüfer beauftragen, Protokolle und Mängel zentral führen.",
    ],
    blocks: [
      { type: "h2", text: "Was die DGUV V3 Prüfung umfasst" },
      {
        type: "definition",
        term: "DGUV V3 Prüfung",
        text: "Prüfung elektrischer Anlagen und Betriebsmittel nach § 5 DGUV Vorschrift 3 „Elektrische Anlagen und Betriebsmittel“. Sie stellt fest, ob Schutzmaßnahmen wirksam sind und ob Mängel vorliegen, die zu einem Stromunfall oder Brand führen können.",
      },
      {
        type: "p",
        text: "Geprüft werden drei Gruppen, die sich in Frist und Prüfverfahren unterscheiden. **Ortsfeste elektrische Anlagen** wie Verteilungen, Installation und fest angeschlossene Maschinen werden nach DIN VDE 0105-100 geprüft. **Ortsveränderliche Betriebsmittel** – Geräte mit Stecker, Verlängerungsleitungen, Mehrfachsteckdosen – nach DIN EN 50699 (VDE 0702), nach einer Reparatur nach DIN EN 50678 (VDE 0701). **Fehlerstrom-Schutzeinrichtungen** (RCD) werden zusätzlich durch Betätigen der Prüftaste kontrolliert.",
      },
      { type: "h2", text: "Wer zur DGUV V3 Prüfung verpflichtet ist" },
      {
        type: "p",
        text: "Die Pflicht trifft den Unternehmer bzw. Arbeitgeber (§ 5 Abs. 1 DGUV Vorschrift 3). Parallel verlangt die Betriebssicherheitsverordnung, dass er Art, Umfang und Fristen der Prüfungen in der Gefährdungsbeurteilung festlegt (§ 3 Abs. 6 BetrSichV) und die Ergebnisse aufzeichnet (§ 14 Abs. 7 BetrSichV). Für Kommunen, Schulträger und andere öffentliche Arbeitgeber gilt die DGUV Vorschrift 4 der Unfallkassen mit denselben Anforderungen.",
      },
      {
        type: "p",
        text: "In Mietobjekten gilt die Aufteilung: Der Vermieter ist für die Gebäudeinstallation verantwortlich, soweit er sie betreibt; der Mieter als Arbeitgeber für die Geräte seiner Beschäftigten. Wohnungsunternehmen sind für Geschäftsstellen, Hausmeisterwerkstätten und Regiebetriebe selbst Arbeitgeber und damit prüfpflichtig. Mehr zur Abgrenzung der Pflichten: [Betreiberpflichten](/betreiberpflichten).",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      {
        type: "table",
        caption: "Richtwerte nach den Durchführungsanweisungen zu § 5 DGUV Vorschrift 3",
        head: ["Anlage / Betriebsmittel", "Richtwert", "Prüfer", "Fundstelle"],
        rows: [
          ["Elektrische Anlagen und ortsfeste Betriebsmittel", "4 Jahre", "Elektrofachkraft", "DGUV V3, DA zu § 5, Tabelle 1A"],
          ["Anlagen in Räumen besonderer Art (DIN VDE 0100 Gruppe 700)", "1 Jahr", "Elektrofachkraft", "DGUV V3, DA zu § 5, Tabelle 1A"],
          ["Ortsveränderliche Betriebsmittel", "6 Monate, auf Baustellen 3 Monate", "Elektrofachkraft; mit geeigneten Messgeräten auch elektrotechnisch unterwiesene Person", "DGUV V3, DA zu § 5, Tabelle 1B"],
          ["… bei Fehlerquote unter 2 %", "höchstens 1 Jahr (Werkstatt, Fertigung, Baustelle) bzw. 2 Jahre (Büro)", "wie oben", "DGUV V3, DA zu § 5, Tabelle 1B"],
          ["RCD in stationären Anlagen", "Prüftaste alle 6 Monate", "Benutzer", "DGUV V3, DA zu § 5, Tabelle 1A"],
          ["RCD in nichtstationären Anlagen", "Prüftaste arbeitstäglich", "Benutzer", "DGUV V3, DA zu § 5, Tabelle 1A"],
        ],
      },
      {
        type: "p",
        text: "Die Werte sind Richtwerte. Verbindlich ist die Frist, die der Arbeitgeber nach § 3 Abs. 6 BetrSichV so bemisst, dass die Betriebsmittel bis zur nächsten Prüfung sicher verwendet werden können. Eine Prüfung vor der ersten Inbetriebnahme entfällt nach § 5 Abs. 4 DGUV Vorschrift 3, wenn der Hersteller bestätigt, dass das Gerät den elektrotechnischen Regeln entspricht. Wie sich die Frist je Einsatzbereich begründen lässt, zeigt die Übersicht [Prüffristen](/prueffristen).",
      },
      { type: "h2", text: "Wer die DGUV V3 Prüfung durchführen darf" },
      {
        type: "p",
        text: "Die Prüfung verantwortet eine Elektrofachkraft. Ortsveränderliche Betriebsmittel dürfen auch elektrotechnisch unterwiesene Personen prüfen, wenn sie geeignete Mess- und Prüfgeräte verwenden und unter Leitung und Aufsicht einer Elektrofachkraft arbeiten (DGUV V3, DA zu § 5). Die Betriebssicherheitsverordnung verlangt eine zur Prüfung befähigte Person, die ihre Fachkunde durch Berufsausbildung, Berufserfahrung und zeitnahe berufliche Tätigkeit nachweist (§ 2 Abs. 6 BetrSichV, konkretisiert in TRBS 1203).",
      },
      {
        type: "checklist",
        items: [
          "Nachweis der Qualifikation als Elektrofachkraft bzw. befähigte Person nach TRBS 1203",
          "Kalibriertes Prüfgerät, im Protokoll mit Seriennummer angegeben",
          "Protokoll mit Art, Umfang und Ergebnis der Prüfung sowie Name und Unterschrift des Prüfers (§ 14 Abs. 7 BetrSichV)",
          "Mängel mit Bewertung und eindeutiger Zuordnung zum Gerät",
        ],
      },
      { type: "h2", text: "Was die DGUV V3 Prüfung kostet" },
      {
        type: "p",
        text: "Für Elektroprüfungen gibt es keine amtliche Gebührenordnung. Nach veröffentlichten Anbieterangaben (Stand Oktober 2026) liegen ortsveränderliche Geräte bei rund 3 bis 8 Euro netto je Stück, ortsfeste Anlagen wie Unterverteilungen bei 50 bis 450 Euro, dazu kommen Anfahrtspauschalen. Preisspannen, Quellen und ein Rechenbeispiel stehen auf der Seite [DGUV V3 Prüfung Kosten](/dguv-v3-pruefung-kosten). Bei mehreren Standorten bestimmen Anfahrten und Terminlogistik den Preis stärker als der Einzelpreis je Gerät.",
      },
      {
        type: "p",
        text: "Regionale Hinweise zu Unfallkassen, Aufsichtsbehörden und Landesrecht: [DGUV V3 Prüfung Berlin](/dguv-v3-pruefung-berlin) · [DGUV V3 Prüfung Hamburg](/dguv-v3-pruefung-hamburg) · [DGUV V3 Prüfung München](/dguv-v3-pruefung-muenchen).",
      },
      { type: "h2", text: "Folgen einer versäumten Prüfung" },
      {
        type: "p",
        text: "Wer vorsätzlich oder fahrlässig gegen die Prüfpflichten aus § 5 DGUV Vorschrift 3 verstößt, handelt nach § 9 der Vorschrift ordnungswidrig im Sinne von § 209 Abs. 1 Nr. 1 SGB VII; die Geldbuße kann nach § 209 Abs. 3 SGB VII bis zu 10.000 Euro betragen. Schwerer wiegt im Schadensfall der fehlende Nachweis: Nach einem Brand oder Stromunfall prüfen Unfallversicherungsträger, Versicherer und gegebenenfalls Ermittlungsbehörden, ob ordnungsgemäß geprüft wurde. Mehr dazu unter [Betreiberverantwortung](/betreiberverantwortung).",
      },
      {
        type: "example",
        title: "Kommunale Wohnungsgesellschaft mit 38 Liegenschaften",
        text: [
          "Geprüft werden müssen die Geräte in drei Geschäftsstellen, zwei Hausmeisterwerkstätten und einem Bauhof sowie die ortsfesten Anlagen dieser Gebäude. Bisher beauftragte jede Stelle selbst – mit unterschiedlichen Fristen und ohne gemeinsamen Überblick.",
          "Nach der Bestandsaufnahme werden Bürogeräte mit belegter Fehlerquote unter 2 % im Zwei-Jahres-Turnus, Werkstattgeräte halbjährlich geprüft; alle Termine liegen in zwei Prüfwochen pro Jahr. Die Protokolle laufen zentral zusammen, offene Mängel werden bis zur Behebung verfolgt. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Ist die DGUV V3 Prüfung Pflicht?",
        "Ja, für jeden Unternehmer, dessen Beschäftigte elektrische Anlagen oder Betriebsmittel verwenden. Grundlage ist § 5 DGUV Vorschrift 3, für Mitglieder der Unfallkassen die inhaltsgleiche DGUV Vorschrift 4, ergänzt durch §§ 3 und 14 BetrSichV.",
      ],
      [
        "Wie oft muss die DGUV V3 Prüfung durchgeführt werden?",
        "Es gibt keine pauschale Frist. Die Durchführungsanweisungen nennen Richtwerte: vier Jahre für ortsfeste Anlagen, ein Jahr in Räumen besonderer Art, sechs Monate für ortsveränderliche Geräte, bei belegter Fehlerquote unter 2 % bis zu zwei Jahre in Büros. Verbindlich ist die Frist aus der Gefährdungsbeurteilung nach § 3 Abs. 6 BetrSichV.",
      ],
      [
        "Wer darf die DGUV V3 Prüfung durchführen?",
        "Eine Elektrofachkraft. Ortsveränderliche Geräte dürfen auch elektrotechnisch unterwiesene Personen mit geeigneten Messgeräten unter Leitung und Aufsicht einer Elektrofachkraft prüfen. Die Qualifikation als befähigte Person richtet sich nach § 2 Abs. 6 BetrSichV und TRBS 1203.",
      ],
      [
        "Müssen neue Geräte vor der ersten Nutzung geprüft werden?",
        "Nach § 5 Abs. 4 DGUV Vorschrift 3 entfällt die Prüfung vor der ersten Inbetriebnahme, wenn der Hersteller bestätigt, dass das Gerät den elektrotechnischen Regeln entspricht. Danach wird es in den regulären Prüfzyklus aufgenommen.",
      ],
    ],
    sources: [
      ["DGUV V3", "§ 5 Abs. 1, 2 und 4, § 9; Durchführungsanweisungen zu § 5, Tabellen 1A und 1B"],
      ["DGUV V4", "§ 5 (inhaltsgleich zu DGUV Vorschrift 3)"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 14 Abs. 7"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen, elektrische Gefährdungen"],
      ["SGB VII", "§ 209 Abs. 1 Nr. 1, Abs. 3"],
      ["DIN VDE 0105-100", "Wiederkehrende Prüfung ortsfester Anlagen"],
      ["DIN EN 50699", "Wiederholungsprüfung ortsveränderlicher Geräte"],
      ["DIN EN 50678", "Prüfung nach Instandsetzung"],
    ],
    related: [
      ["DGUV V3 Prüfung: wie oft", "/wissen/dguv-v3-pruefung-wie-oft", "Fristen und Fehlerquote"],
      ["Ortsveränderliche Geräte", "/wissen/dguv-v3-ortsveraenderliche-geraete", "Abgrenzung und Prüfung"],
      ["DGUV V3 Prüfung selber machen", "/wissen/dguv-v3-pruefung-selber-machen", "Eigenprüfung"],
      ["DGUV V3 Prüfung Kosten", "/dguv-v3-pruefung-kosten", "Preisspannen und Rechenbeispiel"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
      ["UVV-Prüfung", "/uvv-pruefung", "Fahrzeuge, Stapler, Krane, Tore"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "DGUV Vorschrift 4 in der Praxis"],
    ],
    cta: "DGUV V3 Prüfung für alle Standorte organisieren.",
  },
  {
    slug: "uvv-pruefung",
    keyword: "uvv prüfung",
    secondary: ["uvv prüfung pflicht", "uvv prüfung fristen", "sachkundigenprüfung", "wiederkehrende prüfung arbeitsmittel", "uvv prüfung kran"],
    name: "UVV-Prüfung",
    title: "UVV-Prüfung: Fristen für Fahrzeuge, Stapler, Krane",
    description:
      "UVV-Prüfung nach DGUV-Vorschriften und BetrSichV: Fristen für Fahrzeuge, Stapler, Krane, Hebebühnen und Tore, wer prüfen darf und was bei Versäumnis droht.",
    h1: "UVV-Prüfung: Was geprüft wird, wie oft und durch wen",
    kicker: "LEISTUNG · ARBEITSMITTEL",
    serviceType: "Koordination von UVV-Prüfungen",
    cardText: "Fahrzeuge, Flurförderzeuge, Krane, Hebebühnen und Tore nach Unfallverhütungsvorschriften prüfen lassen.",
    highlights: [
      "Fahrzeuge, Stapler, Krane, Hebebühnen, Tore",
      "Sachkundige und befähigte Personen",
      "Fristen über alle Standorte in einem Plan",
    ],
    lead: [
      "Die UVV-Prüfung ist die wiederkehrende Prüfung von Arbeitsmitteln nach den Unfallverhütungsvorschriften (UVV) der Berufsgenossenschaften und Unfallkassen, ergänzt durch die Betriebssicherheitsverordnung. Typische Beispiele sind die jährliche Prüfung von Firmenfahrzeugen nach § 57 DGUV Vorschrift 70 und von Gabelstaplern nach § 37 DGUV Vorschrift 68 durch einen Sachkundigen.",
      "betreibermanager.de koordiniert UVV-Prüfungen für Organisationen mit mehreren Standorten in ganz Deutschland – vom Fuhrpark über Stapler und Hebebühnen bis zu kraftbetätigten Toren.",
    ],
    blocks: [
      { type: "h2", text: "Was eine UVV-Prüfung ist" },
      {
        type: "definition",
        term: "UVV-Prüfung",
        text: "Umgangssprachlicher Sammelbegriff für Prüfungen, die Unfallverhütungsvorschriften der DGUV vorschreiben. Rechtlich handelt es sich um Prüfungen nach der jeweiligen DGUV Vorschrift und um wiederkehrende Prüfungen von Arbeitsmitteln nach § 14 BetrSichV. Auch die Elektroprüfung nach DGUV Vorschrift 3 ist eine UVV-Prüfung.",
      },
      { type: "h2", text: "Wer zur UVV-Prüfung verpflichtet ist" },
      {
        type: "p",
        text: "Verpflichtet ist der Unternehmer bzw. Arbeitgeber, der die Arbeitsmittel seinen Beschäftigten bereitstellt. Er legt Art, Umfang und Fristen der Prüfungen in der Gefährdungsbeurteilung fest (§ 3 Abs. 6 BetrSichV) und sorgt dafür, dass Arbeitsmittel vor jeder Verwendung auf offensichtliche Mängel kontrolliert werden (§ 4 Abs. 5 BetrSichV). Das gilt für Bauhöfe von Kommunen ebenso wie für Regiebetriebe von Wohnungsunternehmen oder die Haustechnik einer Klinik.",
      },
      { type: "h2", text: "Fristen der wichtigsten UVV-Prüfungen" },
      {
        type: "table",
        caption: "Wiederkehrende Prüfungen nach Unfallverhütungsvorschriften und Arbeitsschutzrecht",
        head: ["Arbeitsmittel", "Prüfung durch", "Frist", "Fundstelle"],
        rows: [
          ["Fahrzeuge (Pkw, Transporter, Lkw im Betrieb)", "Sachkundigen", "bei Bedarf, mindestens einmal jährlich", "§ 57 DGUV Vorschrift 70"],
          ["Flurförderzeuge (Gabelstapler, Hubwagen mit Fahrantrieb) inkl. Anbaugeräte", "Sachkundigen", "in Abständen von längstens einem Jahr", "§ 37 Abs. 1 DGUV Vorschrift 68"],
          ["Krane", "Sachkundigen", "mindestens einmal jährlich", "§ 26 DGUV Vorschrift 52"],
          ["Hebebühnen", "Sachkundigen", "mindestens einmal jährlich", "DGUV Regel 100-500, Kapitel 2.10"],
          ["Lastaufnahmeeinrichtungen (Anschlagmittel, Traversen)", "Sachkundigen", "mindestens einmal jährlich", "DGUV Regel 100-500, Kapitel 2.8"],
          ["Kraftbetätigte Türen und Tore", "Sachkundigen", "vor der ersten Inbetriebnahme und mindestens jährlich", "ASR A1.7"],
          ["Leitern und Tritte", "zur Prüfung befähigte Person", "keine pauschale Frist – nach Gefährdungsbeurteilung", "§ 3 Abs. 6, § 14 BetrSichV; DGUV Information 208-016"],
          ["Elektrische Anlagen und Geräte", "Elektrofachkraft", "siehe [DGUV V3 Prüfung](/dguv-v3-pruefung)", "§ 5 DGUV Vorschrift 3"],
        ],
      },
      {
        type: "p",
        text: "Wo eine Unfallverhütungsvorschrift „mindestens jährlich“ vorgibt, ist das eine Höchstfrist: Bei hoher Beanspruchung, Schichtbetrieb oder Mängeln aus früheren Prüfungen muss die Gefährdungsbeurteilung kürzere Abstände festlegen. Für Leitern nennt keine Vorschrift eine feste Frist; der Arbeitgeber bestimmt sie selbst und dokumentiert die Begründung. Ergänzend gelten die Kontrollen vor jeder Verwendung nach § 4 Abs. 5 BetrSichV.",
      },
      { type: "h2", text: "Wer die UVV-Prüfung durchführen darf" },
      {
        type: "p",
        text: "Die Vorschriften verlangen einen **Sachkundigen**, die Betriebssicherheitsverordnung eine **zur Prüfung befähigte Person** (§ 2 Abs. 6 BetrSichV). Gemeint ist in beiden Fällen jemand, der durch Ausbildung, Erfahrung und zeitnahe Tätigkeit den arbeitssicheren Zustand des Arbeitsmittels beurteilen kann; die Anforderungen konkretisiert TRBS 1203. Bei Fahrzeugen deckt eine mängelfreie Sachverständigenprüfung nach StVZO den verkehrssicheren Teil ab, nicht aber den arbeitssicheren Zustand (DGUV Vorschrift 70, Durchführungsanweisung zu § 57). Das Ergebnis jeder Prüfung ist schriftlich festzuhalten (§ 57 Abs. 2 DGUV Vorschrift 70, § 14 Abs. 7 BetrSichV).",
      },
      { type: "h2", text: "Was eine UVV-Prüfung kostet" },
      {
        type: "p",
        text: "Für UVV-Prüfungen gibt es keine amtliche Gebührenordnung. Der Preis hängt von Art und Zahl der Arbeitsmittel, Anfahrten und davon ab, ob die Prüfung mit der Wartung kombiniert wird. Bei Fuhrparks und Staplerflotten über mehrere Standorte ist die Bündelung zu festen Prüfterminen der wirksamste Hebel; belastbare Preise ergeben sich aus Angeboten für den konkreten Bestand.",
      },
      { type: "h2", text: "Folgen einer versäumten UVV-Prüfung" },
      {
        type: "p",
        text: "Verstöße gegen Unfallverhütungsvorschriften können als Ordnungswidrigkeit nach § 209 Abs. 1 Nr. 1 SGB VII mit einer Geldbuße bis zu 10.000 Euro geahndet werden, soweit die Vorschrift auf diese Bußgeldnorm verweist. Nach einem Unfall prüfen Berufsgenossenschaft und Versicherer, ob die Prüfung nachweisbar erfolgt ist. Für Leitungspersonen kommt eine Aufsichtspflichtverletzung nach § 130 OWiG in Betracht – Hintergrund unter [Betreiberverantwortung](/betreiberverantwortung).",
      },
      {
        type: "example",
        title: "Landkreis mit Bauhöfen an fünf Standorten",
        text: [
          "Im Bestand: 46 Fahrzeuge, 9 Gabelstapler, 4 Hebebühnen, 2 Hallenkrane und 31 kraftbetätigte Tore an Bauhöfen, Feuerwehrgerätehäusern und Schulen. Die Prüfungen wurden bisher je Standort beauftragt; für die Tore an Schulen fühlte sich niemand zuständig.",
          "Nach der Bestandsaufnahme liegt jede Prüfung mit Frist, Prüfer und Zuständigem in einem Plan. Fahrzeuge werden zur Hauptuntersuchung mitgeprüft, Stapler und Hebebühnen in einer Prüfwoche je Standort, die Tore gebündelt mit der Wartung. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Was bedeutet UVV-Prüfung?",
        "UVV steht für Unfallverhütungsvorschrift. Gemeint sind Prüfungen von Arbeitsmitteln, die eine DGUV Vorschrift vorschreibt, etwa für Fahrzeuge (DGUV Vorschrift 70), Flurförderzeuge (DGUV Vorschrift 68) oder Krane (DGUV Vorschrift 52), ergänzt durch die Prüfpflichten der Betriebssicherheitsverordnung.",
      ],
      [
        "Wie oft muss die UVV-Prüfung bei Firmenfahrzeugen erfolgen?",
        "Nach § 57 DGUV Vorschrift 70 bei Bedarf, mindestens jedoch einmal jährlich durch einen Sachkundigen. Das Ergebnis ist schriftlich festzuhalten und mindestens bis zur nächsten Prüfung aufzubewahren.",
      ],
      [
        "Ersetzt die Hauptuntersuchung beim TÜV die UVV-Prüfung?",
        "Nur teilweise. Eine mängelfreie Hauptuntersuchung nach StVZO deckt den verkehrssicheren Zustand ab, die UVV-Prüfung umfasst zusätzlich den arbeitssicheren Zustand, etwa Ladungssicherung, Aufbauten und Ausrüstung.",
      ],
      [
        "Wer darf UVV-Prüfungen durchführen?",
        "Ein Sachkundiger bzw. eine zur Prüfung befähigte Person nach § 2 Abs. 6 BetrSichV, die durch Ausbildung, Erfahrung und zeitnahe Tätigkeit den arbeitssicheren Zustand beurteilen kann. Die Anforderungen konkretisiert die TRBS 1203.",
      ],
    ],
    sources: [
      ["DGUV V70", "§ 57 Abs. 1 und 2 mit Durchführungsanweisungen"],
      ["DGUV V68", "§ 37 Abs. 1"],
      ["DGUV V52", "§ 26"],
      ["DGUV R 100-500", "Kapitel 2.8 und 2.10"],
      ["ASR A1.7", "Prüfung kraftbetätigter Türen und Tore"],
      ["DGUV I 208-016", "Prüfung von Leitern und Tritten"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 4 Abs. 5, § 14 Abs. 2 und 7"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["SGB VII", "§ 209 Abs. 1 Nr. 1, Abs. 3"],
      ["OWiG", "§ 130"],
    ],
    related: [
      ["UVV-Prüfung Fahrzeuge", "/wissen/uvv-pruefung-fahrzeuge", "Fuhrpark nach DGUV V70"],
      ["UVV-Prüfung Stapler", "/wissen/uvv-pruefung-stapler", "Flurförderzeuge nach DGUV V68"],
      ["DGUV V3 Prüfung", "/dguv-v3-pruefung", "Elektrische Anlagen und Geräte"],
      ["Regalprüfung", "/regalpruefung", "Lagereinrichtungen nach DIN EN 15635"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Bauhöfe, Feuerwehren, Schulen"],
    ],
    cta: "UVV-Prüfungen über alle Standorte bündeln.",
  },
  {
    slug: "legionellenpruefung",
    keyword: "legionellenprüfung",
    secondary: ["legionellenprüfung pflicht", "trinkwasseruntersuchung legionellen", "legionellenprüfung wie oft", "großanlage trinkwassererwärmung", "§ 31 trinkwv"],
    name: "Legionellenprüfung",
    title: "Legionellenprüfung: Pflicht und Fristen nach TrinkwV",
    description:
      "Legionellenprüfung nach § 31 TrinkwV: wann sie Pflicht ist, alle 3 Jahre oder jährlich, wer die Proben nimmt, was bei 100 KBE/100 ml zu tun ist.",
    h1: "Legionellenprüfung: Pflicht, Intervalle und Maßnahmen nach der Trinkwasserverordnung",
    kicker: "LEISTUNG · TRINKWASSER",
    serviceType: "Koordination der Legionellenprüfung",
    cardText: "Trinkwasser-Großanlagen nach § 31 TrinkwV auf Legionellen untersuchen lassen – Fristen und Maßnahmen.",
    highlights: [
      "Pflichtprüfung nach § 31 TrinkwV",
      "Zugelassene Untersuchungsstellen",
      "Maßnahmenplan bei Erreichen des Maßnahmenwerts",
    ],
    lead: [
      "Die Legionellenprüfung ist die Untersuchung des Trinkwassers auf Legionella spec. nach § 31 TrinkwV. Pflicht ist sie, wenn eine Großanlage zur Trinkwassererwärmung und Duschen oder andere vernebelnde Entnahmestellen vorhanden sind, das Wasser gewerblich oder öffentlich abgegeben wird und es sich nicht um ein Ein- oder Zweifamilienhaus handelt – bei Vermietung mindestens alle drei Jahre, bei öffentlicher Tätigkeit mindestens jährlich.",
      "betreibermanager.de koordiniert Legionellenprüfungen für Wohnungsunternehmen, Kommunen und Pflegeeinrichtungen mit vielen Objekten in ganz Deutschland – von der Prüfung der Pflicht je Gebäude bis zur Maßnahme nach einem Befund.",
    ],
    blocks: [
      { type: "h2", text: "Wann die Legionellenprüfung Pflicht ist" },
      {
        type: "p",
        text: "§ 31 Abs. 1 TrinkwV verlangt die Untersuchung, wenn **alle drei** Voraussetzungen zusammentreffen:",
      },
      {
        type: "steps",
        items: [
          "In der Anlage befindet sich eine **Großanlage zur Trinkwassererwärmung**: ein Speicher- oder zentraler Durchfluss-Trinkwassererwärmer mit mehr als 400 Litern Inhalt oder mehr als 3 Liter Inhalt in mindestens einer Leitung zwischen Erwärmer und Entnahmestelle (Zirkulationsleitung nicht mitgerechnet).",
          "Es gibt **Duschen oder andere Einrichtungen, in denen Trinkwasser vernebelt wird**.",
          "Die Anlage befindet sich **nicht in einem Ein- oder Zweifamilienhaus**.",
        ],
      },
      {
        type: "p",
        text: "Zusätzlich muss das Trinkwasser im Rahmen einer gewerblichen oder öffentlichen Tätigkeit abgegeben werden. Vermietung gilt als gewerbliche Tätigkeit; Schulen, Kitas, Sporthallen, Krankenhäuser und Pflegeeinrichtungen fallen unter die öffentliche Tätigkeit. Verpflichtet ist der **Betreiber der Wasserversorgungsanlage** – in der Regel der Eigentümer, bei Wohnungseigentum die Gemeinschaft der Wohnungseigentümer.",
      },
      { type: "h2", text: "Wie oft untersucht werden muss" },
      {
        type: "table",
        caption: "Untersuchungshäufigkeit nach § 31 Abs. 2 und 3 TrinkwV",
        head: ["Tätigkeit", "Beispiele", "Häufigkeit", "Fundstelle"],
        rows: [
          ["Gewerblich, nicht öffentlich", "Vermietete Mehrfamilienhäuser, Wohnanlagen", "mindestens alle 3 Jahre", "§ 31 Abs. 2 Nr. 2 Buchst. a TrinkwV"],
          ["Öffentlich", "Schulen, Kitas, Sporthallen, Kliniken, Pflegeheime", "mindestens jährlich", "§ 31 Abs. 2 Nr. 2 Buchst. b TrinkwV"],
          ["Öffentlich, drei Jahre ohne Beanstandung", "wie oben, ohne Kliniken und Pflegeeinrichtungen", "auf Festlegung des Gesundheitsamts bis zu 3 Jahre", "§ 31 Abs. 3 TrinkwV"],
        ],
      },
      {
        type: "p",
        text: "Die Verlängerung nach § 31 Abs. 3 TrinkwV setzt voraus, dass drei aufeinanderfolgende Jahresuntersuchungen ohne Beanstandung waren und Anlage und Betriebsweise unverändert den allgemein anerkannten Regeln der Technik entsprechen. Für Krankenhäuser, Pflegeeinrichtungen und vergleichbare Einrichtungen gilt sie nicht.",
      },
      { type: "h2", text: "Wer die Proben nimmt und untersucht" },
      {
        type: "p",
        text: "Untersuchung und Probennahme erfolgen durch eine **zugelassene Untersuchungsstelle** (§ 40 TrinkwV). Die Proben werden als systemische Untersuchung an mehreren repräsentativen Stellen genommen; der Betreiber muss dafür geeignete Probennahmestellen vorhalten (§ 41 TrinkwV). Fehlen sie, ist ihr Einbau der erste Kostenpunkt – häufig am Austritt des Trinkwassererwärmers, am Zirkulationseintritt und an den entferntesten Strängen.",
      },
      { type: "h2", text: "Was bei einem Befund zu tun ist" },
      {
        type: "definition",
        term: "Technischer Maßnahmenwert",
        text: "100 koloniebildende Einheiten Legionella spec. je 100 Milliliter (Anlage 3 Teil II TrinkwV). Er ist kein gesundheitlicher Grenzwert, sondern löst Handlungspflichten des Betreibers aus.",
      },
      {
        type: "steps",
        items: [
          "Unverzüglich dem Gesundheitsamt anzeigen, sofern die Untersuchungsstelle das nicht nachweislich bereits getan hat (§ 51 Abs. 1 Nr. 1, § 53 TrinkwV).",
          "Ursachen klären – mit Ortsbesichtigung und Prüfung der Anlage auf die allgemein anerkannten Regeln der Technik (§ 51 Abs. 1 Nr. 2 TrinkwV).",
          "Schriftliche Risikoabschätzung nach der Empfehlung des Umweltbundesamts erstellen (§ 51 Abs. 1 Nr. 3, Abs. 2 TrinkwV).",
          "Erforderliche Maßnahmen zum Schutz der Verbraucher durchführen (§ 51 Abs. 1 Nr. 4 TrinkwV) und die Verbraucher nach § 52 TrinkwV informieren, soweit gefordert.",
        ],
      },
      { type: "h2", text: "Was die Legionellenprüfung kostet" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Die Kosten bestimmen vor allem die Zahl der Probennahmestellen je Anlage, die Anfahrt der Untersuchungsstelle und gegebenenfalls der Einbau fehlender Probennahmeventile. Wohnungsunternehmen mit vielen Objekten senken den Aufwand, wenn sie Probennahmen je Quartier bündeln und die Prüfpflicht vorab je Gebäude klären – nicht jede zentrale Warmwasserbereitung ist eine Großanlage.",
      },
      { type: "h2", text: "Folgen einer versäumten Untersuchung" },
      {
        type: "p",
        text: "Wer eine Untersuchung nach § 31 TrinkwV nicht oder nicht rechtzeitig durchführt, handelt ordnungswidrig (§ 72 Abs. 1 Nr. 10 TrinkwV in Verbindung mit § 73 Abs. 1a Nr. 24 IfSG). Gravierender ist das Haftungsrisiko: Erkrankt ein Bewohner an einer Legionellose, wird geprüft, ob Untersuchungen und Maßnahmen ordnungsgemäß erfolgt sind. Wie Wohnungsunternehmen diese Pflicht über den Bestand organisieren: [Betreiberpflichten Wohnungsunternehmen](/betreiberpflichten/wohnungsunternehmen).",
      },
      {
        type: "example",
        title: "Genossenschaft mit 52 Mehrfamilienhäusern",
        text: [
          "Die Genossenschaft lässt 31 Anlagen untersuchen, weil sie zentral Warmwasser bereiten. Die Prüfung je Gebäude ergibt: 24 sind Großanlagen mit Duschen, 7 bleiben unter den Schwellen von 400 Litern bzw. 3 Litern Leitungsinhalt. In 5 der 24 Anlagen fehlen Probennahmeventile.",
          "Die Ventile werden nachgerüstet, die Untersuchungen auf einen Drei-Jahres-Plan nach Quartieren verteilt. Bei einem Befund über dem Maßnahmenwert liegt der Ablauf nach § 51 TrinkwV bereits schriftlich vor. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Ist eine Legionellenprüfung für Vermieter Pflicht?",
        "Ja, wenn das Mehrfamilienhaus eine Großanlage zur Trinkwassererwärmung (Speicher über 400 Liter oder mehr als 3 Liter Leitungsinhalt bis zur Entnahmestelle) und Duschen hat. Dann ist nach § 31 TrinkwV mindestens alle drei Jahre zu untersuchen. Ein- und Zweifamilienhäuser sind ausgenommen.",
      ],
      [
        "Wie oft muss eine Legionellenprüfung durchgeführt werden?",
        "Bei gewerblicher Abgabe wie Vermietung mindestens alle drei Jahre, bei öffentlicher Tätigkeit wie in Schulen, Kliniken oder Pflegeheimen mindestens jährlich (§ 31 Abs. 2 TrinkwV). Das Gesundheitsamt kann bei öffentlicher Tätigkeit nach drei beanstandungsfreien Jahren bis zu drei Jahre festlegen, nicht aber für Kliniken und Pflegeeinrichtungen.",
      ],
      [
        "Was passiert, wenn Legionellen gefunden werden?",
        "Wird der technische Maßnahmenwert von 100 KBE je 100 ml erreicht, muss der Betreiber nach § 51 TrinkwV unverzüglich das Gesundheitsamt informieren, die Ursachen klären, eine schriftliche Risikoabschätzung erstellen und die erforderlichen Maßnahmen umsetzen.",
      ],
      [
        "Wer darf die Proben für die Legionellenprüfung nehmen?",
        "Eine nach § 40 TrinkwV zugelassene Untersuchungsstelle bzw. deren Probennehmer. Der Betreiber muss geeignete Probennahmestellen an repräsentativen Stellen der Anlage bereitstellen.",
      ],
    ],
    sources: [
      ["TrinkwV", "§ 31 Abs. 1–3 (Untersuchungspflicht und Häufigkeit)"],
      ["TrinkwV", "§§ 40, 41 (Untersuchungsstellen, Probennahme)"],
      ["TrinkwV", "§§ 51–53, Anlage 3 Teil II (Maßnahmenwert, Handlungspflichten, Information, Anzeige)"],
      ["TrinkwV", "§ 72 Abs. 1 Nr. 10 (Ordnungswidrigkeiten)"],
      ["UBA Legionellen", "Risikoabschätzung nach § 51 Abs. 1 Nr. 3 TrinkwV"],
    ],
    related: [
      ["Legionellenprüfung für Vermieter", "/wissen/legionellenpruefung-vermieter", "Pflicht und Ablauf"],
      ["Legionellenprüfung Kosten", "/wissen/legionellenpruefung-kosten", "Preise mit Quellen"],
      ["Legionellen-Maßnahmenwert", "/wissen/legionellen-massnahmenwert", "Pflichten bei Befund"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Trinkwasser im Bestand"],
      ["Prüffristen Trinkwasser", "/prueffristen#trinkwasser", "Übersicht"],
      ["Betreiberverantwortung Krankenhäuser", "/betreiberpflichten/krankenhaeuser", "Jährliche Untersuchung"],
      ["VDI 6022", "/vdi-6022", "Hygiene raumlufttechnischer Anlagen"],
    ],
    cta: "Legionellenprüfung für Ihren Bestand planen.",
  },
  {
    slug: "vdi-6022",
    keyword: "vdi 6022",
    secondary: ["vdi 6022 prüfung", "rlt anlage hygiene", "raumlufttechnische anlage prüfung", "vdi 6022 intervalle", "hygienekontrolle lüftungsanlage"],
    name: "VDI 6022",
    title: "VDI 6022: Hygieneinspektion von RLT-Anlagen",
    description:
      "VDI 6022: Hygieneinspektion von RLT-Anlagen alle 2 bzw. 3 Jahre, Hygienekontrollen, Qualifikation der Prüfer und Pflichten des Betreibers.",
    h1: "VDI 6022: Hygieneanforderungen und Inspektion raumlufttechnischer Anlagen",
    kicker: "LEISTUNG · LÜFTUNG & KLIMA",
    serviceType: "Koordination der Hygieneinspektion nach VDI 6022",
    cardText: "Hygieneinspektion raumlufttechnischer Anlagen nach VDI 6022 – alle zwei bzw. drei Jahre.",
    highlights: [
      "Hygieneinspektion und Hygienekontrollen",
      "Prüfer mit Qualifikation nach VDI 6022 Blatt 4",
      "Energetische Inspektion nach GEG mitgedacht",
    ],
    lead: [
      "VDI 6022 Blatt 1 ist die Richtlinie für die Hygiene raumlufttechnischer Anlagen (RLT-Anlagen). Sie verlangt regelmäßige Hygienekontrollen und eine Hygieneinspektion durch qualifiziertes Personal – nach den Richtwerten der Richtlinie alle drei Jahre bei Anlagen ohne Luftbefeuchtung und alle zwei Jahre bei Anlagen mit Befeuchtung.",
      "betreibermanager.de koordiniert Hygieneinspektionen nach VDI 6022 für Kliniken, Verwaltungen, Schulen und Unternehmen mit mehreren Standorten in ganz Deutschland.",
    ],
    blocks: [
      { type: "h2", text: "Was VDI 6022 regelt" },
      {
        type: "definition",
        term: "VDI 6022",
        text: "Richtlinienreihe des Vereins Deutscher Ingenieure zu Hygieneanforderungen an raumlufttechnische Anlagen und Geräte. Blatt 1 beschreibt Planung, Bau, Betrieb und Instandhaltung einschließlich Hygienekontrollen und -inspektionen; Blatt 4 regelt die Qualifizierung des Personals.",
      },
      {
        type: "p",
        text: "VDI 6022 ist kein Gesetz, gilt aber als allgemein anerkannte Regel der Technik. Die rechtliche Pflicht ergibt sich aus § 4 Abs. 3 ArbStättV: Der Arbeitgeber hat raumlufttechnische Anlagen instand zu halten und in regelmäßigen Abständen auf ihre Funktionsfähigkeit prüfen zu lassen. Wer die Richtlinie einhält, kann diese Pflicht nachvollziehbar belegen.",
      },
      { type: "h2", text: "Wer verpflichtet ist" },
      {
        type: "p",
        text: "Verpflichtet ist der Betreiber der Anlage – bei Arbeitsstätten der Arbeitgeber nach ArbStättV, in vermieteten Gebäuden in der Regel der Vermieter für die zentrale Gebäudetechnik. In Krankenhäusern kommen die besonderen Anforderungen an raumlufttechnische Anlagen im Gesundheitswesen hinzu; Hygiene, Technik und Medizintechnik müssen die Zuständigkeit dort schriftlich klären. Siehe [Betreiberverantwortung Krankenhäuser](/betreiberpflichten/krankenhaeuser).",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      {
        type: "table",
        caption: "Hygieneinspektion und weitere Pflichten für RLT- und Klimaanlagen",
        head: ["Prüfung", "Anlage", "Intervall", "Fundstelle"],
        rows: [
          ["Hygieneinspektion", "RLT-Anlage ohne Luftbefeuchtung", "3 Jahre (Richtwert)", "VDI 6022 Blatt 1"],
          ["Hygieneinspektion", "RLT-Anlage mit Luftbefeuchtung", "2 Jahre (Richtwert)", "VDI 6022 Blatt 1"],
          ["Hygienekontrollen", "alle RLT-Anlagen", "in kürzeren Abständen nach den Checklisten der Richtlinie, je nach Bauteil", "VDI 6022 Blatt 1"],
          ["Prüfung der Funktionsfähigkeit", "RLT-Anlagen in Arbeitsstätten", "in regelmäßigen Abständen – keine feste Frist im Gesetz", "§ 4 Abs. 3 ArbStättV"],
          ["Energetische Inspektion", "Klimaanlagen über 12 kW Nennleistung für den Kältebedarf", "erstmals im 10. Jahr nach Inbetriebnahme, dann spätestens alle 10 Jahre", "§§ 74, 76 GEG"],
        ],
      },
      {
        type: "p",
        text: "Die Intervalle der VDI 6022 sind Richtwerte für den bestimmungsgemäßen Betrieb. Bei Auffälligkeiten aus Hygienekontrollen, nach Umbauten oder bei Beschwerden der Nutzer sind zusätzliche Inspektionen angezeigt. Das GEG schreibt die energetische Inspektion unabhängig von der Hygieneinspektion vor; beide lassen sich im selben Termin vorbereiten.",
      },
      { type: "h2", text: "Wer die Hygieneinspektion durchführen darf" },
      {
        type: "p",
        text: "VDI 6022 Blatt 4 beschreibt Schulungskategorien: Hygieneinspektionen führt Personal mit der höchsten Qualifikationsstufe (Kategorie A) durch, Hygienekontrollen und Instandhaltung Personal mit Kategorie B. Lassen Sie sich die Schulungsnachweise vor der Beauftragung vorlegen. Zur Inspektion gehören in der Regel Sichtprüfung der Komponenten, Messungen und mikrobiologische Probennahmen; die Ergebnisse werden mit Bewertung und Maßnahmen dokumentiert.",
      },
      { type: "h2", text: "Was die Hygieneinspektion kostet" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Der Aufwand hängt von Zahl und Größe der Anlagen, Befeuchtung, Zugänglichkeit der Komponenten und Zahl der Probennahmen ab. Bei mehreren Liegenschaften senkt eine gemeinsame Ausschreibung mit einheitlicher Anlagenliste den Preis und macht Angebote vergleichbar.",
      },
      { type: "h2", text: "Folgen einer fehlenden Hygieneinspektion" },
      {
        type: "p",
        text: "Die VDI 6022 selbst ist nicht bußgeldbewehrt. Eine nicht instand gehaltene RLT-Anlage verstößt aber gegen § 4 Abs. 3 ArbStättV. Bei Gesundheitsbeschwerden von Beschäftigten, Hygieneauffälligkeiten in Kliniken oder Streit mit Mietern fehlt ohne Inspektionsbericht der Nachweis, dass die Anlage dem Stand der Technik entsprach.",
      },
      {
        type: "example",
        title: "Klinikverbund mit drei Häusern",
        text: [
          "Die 41 RLT-Anlagen des Verbunds werden je Haus von unterschiedlichen Dienstleistern gewartet. Hygieneinspektionen liegen nur für die OP-Bereiche vor; für die Anlagen in Verwaltung, Küche und Bettenhäusern fehlen sie.",
          "Wir erfassen alle Anlagen mit Befeuchtung und Baujahr, legen Intervalle fest, schreiben die Inspektionen gebündelt aus und führen Berichte, Laborbefunde und Mängel zentral. Die energetische Inspektion nach GEG wird für die Kälteanlagen im selben Plan geführt. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Ist VDI 6022 gesetzlich vorgeschrieben?",
        "VDI 6022 ist eine technische Richtlinie, kein Gesetz. Die Pflicht zur Instandhaltung und Prüfung raumlufttechnischer Anlagen ergibt sich aus § 4 Abs. 3 ArbStättV; die VDI 6022 gilt als allgemein anerkannte Regel der Technik, mit der diese Pflicht erfüllt wird.",
      ],
      [
        "Wie oft muss eine Hygieneinspektion nach VDI 6022 erfolgen?",
        "Nach den Richtwerten der VDI 6022 Blatt 1 alle drei Jahre bei Anlagen ohne Luftbefeuchtung und alle zwei Jahre bei Anlagen mit Befeuchtung. Dazwischen finden Hygienekontrollen in kürzeren Abständen statt.",
      ],
      [
        "Wer darf eine Hygieneinspektion nach VDI 6022 durchführen?",
        "Personal mit Schulung nach VDI 6022 Blatt 4 in der Kategorie A. Hygienekontrollen und Instandhaltung führt Personal mit Kategorie B durch.",
      ],
      [
        "Ist die energetische Inspektion dasselbe wie die Hygieneinspektion?",
        "Nein. Die energetische Inspektion nach §§ 74 bis 76 GEG betrifft Klimaanlagen über 12 kW und ist spätestens alle zehn Jahre fällig. Die Hygieneinspektion nach VDI 6022 betrifft die Hygiene aller RLT-Anlagen.",
      ],
    ],
    sources: [
      ["VDI 6022", "Hygienekontrollen und Hygieneinspektionen, Intervalle"],
      ["VDI 6022-4", "Schulungskategorien A, B, C"],
      ["ArbStättV", "§ 4 Abs. 3"],
      ["GEG", "§ 74 Abs. 1, § 76 Abs. 1 und 2"],
      ["BetrSichV", "§ 3 Abs. 6 (Gefährdungsbeurteilung)"],
    ],
    related: [
      ["VDI 6022 Hygieneinspektion", "/wissen/vdi-6022-hygieneinspektion", "Ablauf und Bericht"],
      ["VDI 6022 Kategorien", "/wissen/vdi-6022-kategorien", "Qualifikation der Prüfer"],
      ["Betreiberverantwortung Krankenhäuser", "/betreiberpflichten/krankenhaeuser", "RLT im Gesundheitswesen"],
      ["Legionellenprüfung", "/legionellenpruefung", "Trinkwasserhygiene"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
      ["Betreiberpflichten", "/betreiberpflichten", "Übersicht"],
    ],
    cta: "Hygieneinspektionen nach VDI 6022 bündeln.",
  },
  {
    slug: "feuerloescher-pruefung",
    keyword: "feuerlöscher prüfung",
    secondary: ["feuerlöscher wartung", "feuerlöscherprüfung pflicht", "din 14406-4", "asr a2.2 feuerlöscher", "feuerlöscher prüfplakette"],
    name: "Feuerlöscher-Prüfung",
    title: "Feuerlöscher-Prüfung: alle 2 Jahre nach ASR A2.2",
    description:
      "Feuerlöscher-Prüfung nach ASR A2.2 und DIN 14406-4: Instandhaltung mindestens alle zwei Jahre durch Sachkundige, Pflichten, Nachweis und Folgen.",
    h1: "Feuerlöscher-Prüfung: Pflicht, Frist und Nachweis",
    kicker: "LEISTUNG · BRANDSCHUTZ",
    serviceType: "Koordination der Feuerlöscher-Instandhaltung",
    cardText: "Tragbare Feuerlöscher nach ASR A2.2 und DIN 14406-4 mindestens alle zwei Jahre instand halten lassen.",
    highlights: [
      "Instandhaltung nach DIN 14406-4",
      "Bestand je Standort erfasst",
      "Termine mit Brandschutzprüfungen gebündelt",
    ],
    lead: [
      "Tragbare Feuerlöscher müssen in Arbeitsstätten regelmäßig, mindestens alle zwei Jahre, durch einen Sachkundigen instand gehalten und auf Funktionsfähigkeit geprüft werden. Grundlage sind § 4 Abs. 3 ArbStättV, die Technische Regel ASR A2.2 „Maßnahmen gegen Brände“ und die Instandhaltungsnorm DIN 14406-4.",
      "betreibermanager.de koordiniert die Feuerlöscher-Prüfung für Organisationen mit vielen Standorten in ganz Deutschland – zusammen mit Brandmeldeanlagen, Sicherheitsbeleuchtung und Rauchabzug.",
    ],
    blocks: [
      { type: "h2", text: "Was bei der Feuerlöscher-Prüfung geschieht" },
      {
        type: "definition",
        term: "Instandhaltung von Feuerlöschern",
        text: "Prüfung und Wartung tragbarer Feuerlöscher durch einen Sachkundigen nach DIN 14406-4: äußere Kontrolle, Prüfung von Löschmittel, Treibmittel und Bauteilen, Austausch verschlissener Teile, Kennzeichnung mit einem Instandhaltungsnachweis am Gerät.",
      },
      {
        type: "p",
        text: "Umgangssprachlich wird das als Feuerlöscher-Prüfung oder -Wartung bezeichnet. Der Instandhaltungsnachweis – meist eine Prüfplakette mit Datum und nächstem Termin – zeigt jedem Nutzer, ob das Gerät einsatzbereit ist. Daneben bleiben die Feuerlöscher Teil der Brandschutzausstattung, deren Umfang die ASR A2.2 nach Grundfläche und Brandgefährdung bemisst.",
      },
      { type: "h2", text: "Wer verpflichtet ist" },
      {
        type: "p",
        text: "Der Arbeitgeber hat Feuerlöscheinrichtungen instand zu halten und in regelmäßigen Abständen auf ihre Funktionsfähigkeit prüfen zu lassen (§ 4 Abs. 3 ArbStättV); die ASR A2.2 konkretisiert das. In Wohngebäuden besteht keine allgemeine Pflicht, Feuerlöscher vorzuhalten. Pflichten können sich dort aus dem Bauordnungsrecht der Länder für bestimmte Bauten wie Garagen, aus Auflagen der Baugenehmigung oder aus Versicherungsverträgen ergeben – wer Feuerlöscher bereitstellt, muss sie auch instand halten lassen.",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      {
        type: "table",
        caption: "Fristen für tragbare Feuerlöscher",
        head: ["Maßnahme", "Durch", "Frist", "Fundstelle"],
        rows: [
          ["Instandhaltung und Funktionsprüfung", "Sachkundigen", "regelmäßig, mindestens alle 2 Jahre", "ASR A2.2; DIN 14406-4; § 4 Abs. 3 ArbStättV"],
          ["Kürzere Instandhaltungsintervalle", "Sachkundigen", "bei erhöhter Beanspruchung, z. B. Witterung, Verschmutzung, Fahrzeugeinsatz – nach Gefährdungsbeurteilung", "ASR A2.2; § 3 BetrSichV"],
          ["Instandhaltung nach Gebrauch oder Beschädigung", "Sachkundigen", "unverzüglich", "DIN 14406-4"],
          ["Druckgeräte-Prüfungen bei Dauerdrucklöschern", "zur Prüfung befähigte Person", "nach Einstufung des Druckgeräts – keine einheitliche Frist", "BetrSichV, Anhang 2 Abschnitt 4"],
        ],
      },
      {
        type: "p",
        text: "Die Zwei-Jahres-Frist ist eine Höchstfrist. Verschmutzte Werkstätten, Außenbereiche oder Tiefgaragen können kürzere Intervalle erfordern. Die übrigen Brandschutzanlagen haben eigene Fristen: [Brandschutzprüfung](/pruefbereiche/brandschutz).",
      },
      { type: "h2", text: "Wer Feuerlöscher prüfen darf" },
      {
        type: "p",
        text: "Die Instandhaltung führt ein **Sachkundiger** nach DIN 14406-4 durch – eine Person, die durch Ausbildung und Unterweisung des Herstellers die Geräte sicher instand halten kann und Zugang zu den nötigen Ersatzteilen und Unterlagen hat. Eigene Hausmeister dürfen Sichtkontrollen übernehmen, nicht aber die Instandhaltung.",
      },
      {
        type: "checklist",
        items: [
          "Instandhaltungsnachweis mit Datum, Prüfer und nächstem Termin an jedem Gerät",
          "Bestandsliste je Standort mit Standort, Typ, Löschmittel und Baujahr",
          "Geräte frei zugänglich und gekennzeichnet",
          "Beschäftigte unterwiesen, Brandschutzhelfer in ausreichender Zahl benannt (ASR A2.2)",
        ],
      },
      { type: "h2", text: "Was die Feuerlöscher-Prüfung kostet" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Abgerechnet wird meist je Gerät, zuzüglich Anfahrt sowie Ersatzteilen und Löschmittel bei Bedarf. Bei verteilten Standorten machen Anfahrten einen großen Teil der Kosten aus; ein Termin je Standort und Jahr für alle Brandschutzgeräte senkt den Aufwand.",
      },
      { type: "h2", text: "Folgen einer versäumten Prüfung" },
      {
        type: "p",
        text: "Ein nicht instand gehaltener Feuerlöscher verstößt gegen § 4 Abs. 3 ArbStättV. Im Brandfall kann ein nicht funktionsfähiges Gerät Personen- und Sachschäden vergrößern; Sachversicherer prüfen, ob vertragliche Sicherheitsvorschriften eingehalten wurden, und können die Leistung kürzen. Feuerlöscher ohne gültigen Instandhaltungsnachweis werden bei Begehungen durch Berufsgenossenschaft oder Brandschau regelmäßig beanstandet.",
      },
      {
        type: "example",
        title: "Kommune mit 23 Schulen und Kitas",
        text: [
          "In den Gebäuden hängen rund 640 Feuerlöscher; geprüft wurde je Hausmeisterbezirk zu unterschiedlichen Zeitpunkten. Bei der Brandschau einer Grundschule fehlen an elf Geräten gültige Nachweise.",
          "Die Bestandsaufnahme erfasst alle Geräte mit Standort. Die Instandhaltung läuft jetzt in einem festen Zwei-Jahres-Turnus je Stadtteil, gebündelt mit der Prüfung von Sicherheitsbeleuchtung und Feststellanlagen in den Ferien. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Wie oft müssen Feuerlöscher geprüft werden?",
        "Regelmäßig, mindestens alle zwei Jahre durch einen Sachkundigen. Grundlage sind § 4 Abs. 3 ArbStättV, die ASR A2.2 und DIN 14406-4. Bei erhöhter Beanspruchung legt die Gefährdungsbeurteilung kürzere Intervalle fest.",
      ],
      [
        "Wer darf Feuerlöscher prüfen?",
        "Ein Sachkundiger im Sinne der DIN 14406-4, der für die Instandhaltung der jeweiligen Geräte ausgebildet ist. Sichtkontrollen dürfen auch eigene Beschäftigte übernehmen.",
      ],
      [
        "Müssen Vermieter Feuerlöscher in Wohnhäusern prüfen lassen?",
        "In Wohngebäuden gibt es keine allgemeine Pflicht, Feuerlöscher vorzuhalten. Wo Feuerlöscher aufgrund von Bauordnungsrecht, Baugenehmigung oder Versicherungsvertrag vorhanden sind – etwa in Tiefgaragen –, müssen sie instand gehalten werden.",
      ],
      [
        "Was bedeutet die Prüfplakette am Feuerlöscher?",
        "Sie ist der Instandhaltungsnachweis: Sie zeigt, wann und durch wen das Gerät zuletzt instand gehalten wurde und wann die nächste Instandhaltung fällig ist.",
      ],
    ],
    sources: [
      ["ArbStättV", "§ 4 Abs. 3"],
      ["ASR A2.2", "Instandhaltung von Feuerlöschern, Ausstattung, Brandschutzhelfer"],
      ["DIN 14406-4", "Instandhaltung tragbarer Feuerlöscher"],
      ["BetrSichV", "§ 3 Abs. 6; Anhang 2 Abschnitt 4 (Druckgeräte)"],
    ],
    related: [
      ["Feuerlöscher-Prüfung: wie oft", "/wissen/feuerloescher-pruefung-wie-oft", "Fristen"],
      ["Feuerlöscher-Prüfung Kosten", "/wissen/feuerloescher-pruefung-kosten", "Preise mit Quellen"],
      ["Brandschutzprüfung", "/pruefbereiche/brandschutz", "BMA, Sicherheitsbeleuchtung, RWA"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Schulen und Kitas"],
      ["UVV-Prüfung", "/uvv-pruefung", "Weitere Arbeitsmittel"],
    ],
    cta: "Feuerlöscher aller Standorte in einen Plan bringen.",
  },
  {
    slug: "regalpruefung",
    keyword: "regalprüfung",
    secondary: ["regalinspektion", "din en 15635 prüfung", "regalprüfung pflicht", "lagerregal prüfung", "regalprüfer"],
    name: "Regalprüfung",
    title: "Regalprüfung nach DIN EN 15635: Pflicht und Frist",
    description:
      "Regalprüfung nach DIN EN 15635 und BetrSichV: jährliche Experteninspektion durch eine befähigte Person, Sichtkontrollen, Schadensbewertung, Kosten.",
    h1: "Regalprüfung: jährliche Inspektion nach DIN EN 15635 und Betriebssicherheitsverordnung",
    kicker: "LEISTUNG · LAGER",
    serviceType: "Koordination der Regalprüfung",
    cardText: "Lagerregale jährlich durch eine befähigte Person inspizieren lassen – nach DIN EN 15635 und BetrSichV.",
    highlights: [
      "Experteninspektion mindestens alle 12 Monate",
      "Sichtkontrollen organisiert und dokumentiert",
      "Schäden nach Gefährdungsstufe verfolgt",
    ],
    lead: [
      "Die Regalprüfung ist die wiederkehrende Inspektion ortsfester Lagerregale. Nach DIN EN 15635 ist mindestens alle zwölf Monate eine Experteninspektion durch eine fachkundige Person durchzuführen; arbeitsschutzrechtlich ist das die wiederkehrende Prüfung durch eine zur Prüfung befähigte Person nach § 14 Abs. 2 BetrSichV. Dazwischen finden regelmäßige Sichtkontrollen statt.",
      "betreibermanager.de koordiniert Regalprüfungen für Lager, Werkstätten, Bauhöfe und Archive an mehreren Standorten in ganz Deutschland.",
    ],
    blocks: [
      { type: "h2", text: "Was die Regalprüfung umfasst" },
      {
        type: "definition",
        term: "Regalprüfung",
        text: "Inspektion von Regalsystemen auf Beschädigungen, Verformungen, fehlende Sicherungen, korrekte Montage und Einhaltung der zulässigen Lasten. Grundlage sind DIN EN 15635 für Stahlregale und die Prüfpflicht für Arbeitsmittel nach § 14 BetrSichV.",
      },
      {
        type: "p",
        text: "Geprüft werden Ständer, Traversen, Verankerungen, Anfahrschutz, Durchschubsicherungen und die Belastungsschilder mit den zulässigen Fach- und Feldlasten. Die DGUV Information 208-061 „Lagereinrichtungen und -geräte“ (früher DGUV Regel 108-007) ergänzt die Anforderungen aus Sicht der Unfallversicherung.",
      },
      { type: "h2", text: "Wer zur Regalprüfung verpflichtet ist" },
      {
        type: "p",
        text: "Verpflichtet ist der Arbeitgeber, der die Regale als Arbeitsmittel bereitstellt. Er legt Art, Umfang und Fristen der Prüfung in der Gefährdungsbeurteilung fest (§ 3 Abs. 6 BetrSichV) und lässt Arbeitsmittel, die schädigenden Einflüssen ausgesetzt sind, wiederkehrend durch eine befähigte Person prüfen (§ 14 Abs. 2 BetrSichV). Regale sind solchen Einflüssen typischerweise durch Anfahrschäden mit Flurförderzeugen und Überladung ausgesetzt. Betroffen sind nicht nur Logistiker: auch Bauhöfe, Hausmeisterwerkstätten, Archive in Verwaltungen und Lager von Kliniken.",
      },
      { type: "h2", text: "Wie oft geprüft werden muss" },
      {
        type: "table",
        caption: "Prüfungen und Kontrollen an Lagerregalen",
        head: ["Maßnahme", "Durch", "Frist", "Fundstelle"],
        rows: [
          ["Experteninspektion", "fachkundige Person (befähigte Person nach BetrSichV)", "mindestens alle 12 Monate", "DIN EN 15635; § 14 Abs. 2 BetrSichV"],
          ["Sichtkontrolle", "unterwiesene Beschäftigte", "regelmäßig, in der Praxis meist wöchentlich – nach Gefährdungsbeurteilung", "DIN EN 15635; § 4 Abs. 5 BetrSichV"],
          ["Kontrolle auf offensichtliche Mängel", "Benutzer", "vor jeder Verwendung", "§ 4 Abs. 5 Satz 3 BetrSichV"],
          ["Prüfung nach Umbau oder außergewöhnlichem Ereignis", "befähigte Person", "vor der nächsten Verwendung", "§ 14 Abs. 3 BetrSichV"],
        ],
      },
      {
        type: "p",
        text: "Die zwölf Monate sind eine Obergrenze. Bei intensivem Staplerverkehr, hoher Umschlagsrate oder wiederholten Anfahrschäden legt die Gefährdungsbeurteilung kürzere Abstände fest. Für die Sichtkontrollen schreibt kein Gesetz eine feste Frist vor; der Betreiber bestimmt sie und dokumentiert die Begründung.",
      },
      { type: "h2", text: "Wer Regale prüfen darf" },
      {
        type: "p",
        text: "Die Experteninspektion führt eine zur Prüfung befähigte Person durch, die durch Berufsausbildung, Berufserfahrung und zeitnahe Tätigkeit über die nötigen Kenntnisse verfügt (§ 2 Abs. 6 BetrSichV, TRBS 1203). In der Praxis sind das Regalinspekteure mit Schulung zu DIN EN 15635. Für die laufenden Sichtkontrollen benennt der Betreiber eine verantwortliche Person für die Sicherheit der Lagereinrichtung.",
      },
      {
        type: "table",
        caption: "Schadensbewertung bei der Regalinspektion (Ampelsystem nach DIN EN 15635, sinngemäß)",
        head: ["Stufe", "Bedeutung", "Maßnahme"],
        rows: [
          ["Grün", "Schaden innerhalb der Toleranz", "beobachten, bei nächster Inspektion erneut bewerten"],
          ["Gelb", "Schaden erfordert Instandsetzung", "Bereich nicht neu beladen, Instandsetzung zeitnah veranlassen"],
          ["Rot", "Schwerer Schaden", "Bereich sofort entladen und sperren, Instandsetzung vor Wiederinbetriebnahme"],
        ],
      },
      { type: "h2", text: "Was die Regalprüfung kostet" },
      {
        type: "p",
        text: "Eine Gebührenordnung gibt es nicht. Abgerechnet wird je nach Anbieter nach laufenden Regalmetern, Regalfeldern oder Zeitaufwand, dazu die Anfahrt. Eine aktuelle Regalliste mit Typ, Feldzahl und Standort je Lager macht Angebote vergleichbar und verkürzt die Inspektion.",
      },
      { type: "h2", text: "Folgen einer versäumten Prüfung" },
      {
        type: "p",
        text: "Ein Regaleinsturz kann Beschäftigte schwer verletzen. Fehlt der Nachweis der wiederkehrenden Prüfung, stellen Berufsgenossenschaft, Versicherer und gegebenenfalls Ermittlungsbehörden die Frage nach einer Organisationspflichtverletzung. Wie die Haftung im Unternehmen verteilt ist, beschreibt die Seite [Betreiberverantwortung](/betreiberverantwortung).",
      },
      {
        type: "example",
        title: "Wohnungsunternehmen mit Regiebetrieb und Zentrallager",
        text: [
          "Im Zentrallager und in vier Hausmeisterstützpunkten stehen rund 180 Regalfelder, teils Schwerlastregale für Ersatzteile. Geprüft wurde bisher nicht, weil die Regale „schon immer da“ waren.",
          "Die erste Experteninspektion stuft sechs Felder als rot ein; sie werden sofort entladen. Seitdem gibt es eine jährliche Inspektion aller Standorte in einer Woche und wöchentliche Sichtkontrollen mit Checkliste im Zentrallager. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Ist die Regalprüfung Pflicht?",
        "Ja. Regale sind Arbeitsmittel; der Arbeitgeber muss sie nach § 14 Abs. 2 BetrSichV wiederkehrend durch eine befähigte Person prüfen lassen, wenn sie schädigenden Einflüssen wie Anfahrschäden ausgesetzt sind. DIN EN 15635 konkretisiert das mit einer Experteninspektion mindestens alle zwölf Monate.",
      ],
      [
        "Wie oft müssen Regale geprüft werden?",
        "Mindestens alle zwölf Monate durch eine fachkundige Person nach DIN EN 15635, dazwischen regelmäßige Sichtkontrollen, in der Praxis meist wöchentlich. Die konkreten Abstände legt die Gefährdungsbeurteilung fest.",
      ],
      [
        "Wer darf eine Regalprüfung durchführen?",
        "Eine zur Prüfung befähigte Person nach § 2 Abs. 6 BetrSichV und TRBS 1203, in der Praxis ein geschulter Regalinspekteur. Sichtkontrollen übernehmen unterwiesene Beschäftigte.",
      ],
      [
        "Was ist bei einem roten Schaden zu tun?",
        "Der betroffene Regalbereich ist sofort zu entladen und zu sperren und darf erst nach Instandsetzung wieder genutzt werden.",
      ],
    ],
    sources: [
      ["DIN EN 15635", "Experteninspektion, Sichtkontrollen, Schadensbewertung"],
      ["BetrSichV", "§ 2 Abs. 6, § 3 Abs. 6, § 4 Abs. 5, § 14 Abs. 2 und 3"],
      ["TRBS 1203", "Anforderungen an zur Prüfung befähigte Personen"],
      ["DGUV I 208-061", "Lagereinrichtungen und -geräte"],
    ],
    related: [
      ["Regalprüfung: wie oft", "/wissen/regalpruefung-wie-oft", "Inspektion und Sichtkontrollen"],
      ["UVV-Prüfung", "/uvv-pruefung", "Stapler und weitere Arbeitsmittel"],
      ["Prüffristen im Überblick", "/prueffristen#weitere-anlagen", "Weitere Anlagen"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Regiebetriebe"],
      ["Betreiberverantwortung", "/betreiberverantwortung", "Haftung und Organisation"],
    ],
    cta: "Regalprüfung an allen Standorten organisieren.",
  },
  {
    slug: "betreiberverantwortung",
    keyword: "betreiberverantwortung",
    secondary: ["betreiberverantwortung definition", "betreiberverantwortung gebäude", "betreiberverantwortung delegieren", "betreiberverantwortung haftung"],
    name: "Betreiberverantwortung",
    title: "Betreiberverantwortung: Definition, Pflichten, Haftung",
    description:
      "Betreiberverantwortung für Gebäude und Anlagen: Definition, Rechtsgrundlagen, wer Betreiber ist, was sich delegieren lässt, wer bei Versäumnissen haftet.",
    h1: "Betreiberverantwortung: Definition, Rechtsgrundlagen und Haftung",
    kicker: "LEISTUNG · GRUNDLAGEN",
    serviceType: "Organisation der Betreiberverantwortung",
    cardText: "Was Betreiberverantwortung umfasst, was sich delegieren lässt und wie die Organisation nachweisbar wird.",
    highlights: [
      "Pflichten ermitteln und schriftlich delegieren",
      "Kontrolle nachweisbar dokumentiert",
      "Für Organisationen mit mehreren Standorten",
    ],
    lead: [
      "Betreiberverantwortung ist die Pflicht des Eigentümers oder Betreibers eines Gebäudes oder einer Anlage, für deren sicheren und rechtskonformen Betrieb zu sorgen und dies nachweisen zu können. Sie folgt nicht aus einem einzelnen Gesetz, sondern aus der Verkehrssicherungspflicht nach § 823 BGB, dem Arbeitsschutzrecht, dem Bauordnungsrecht der Länder, der Trinkwasserverordnung und den Unfallverhütungsvorschriften.",
      "betreibermanager.de übernimmt die Aufgaben hinter der Betreiberverantwortung – Pflichten ermitteln, Prüfungen beauftragen, Fristen überwachen, Nachweise führen – für Organisationen mit mehreren Standorten in ganz Deutschland. Die Verantwortung selbst bleibt beim Betreiber.",
    ],
    blocks: [
      { type: "h2", text: "Was Betreiberverantwortung bedeutet" },
      {
        type: "definition",
        term: "Betreiberverantwortung",
        text: "Gesamtheit der rechtlichen Pflichten, die einer natürlichen oder juristischen Person aus dem Betrieb von Gebäuden, Anlagen und Einrichtungen erwachsen, um Gefahren für Leben, Gesundheit, Umwelt und Sachwerte abzuwenden. Betreiber ist, wer die tatsächliche und rechtliche Verfügungsgewalt über die Anlage hat – in der Regel der Eigentümer.",
      },
      {
        type: "definition",
        term: "Betreiberpflichten",
        text: "Die Einzelpflichten, aus denen sich die Betreiberverantwortung zusammensetzt: prüfen, warten, instand halten, unterweisen, dokumentieren, organisieren und kontrollieren. Eine Übersicht nach Anlagen gibt die Seite [Betreiberpflichten](/betreiberpflichten).",
      },
      { type: "h2", text: "Woraus sich Betreiberverantwortung ergibt" },
      {
        type: "table",
        head: ["Rechtsquelle", "Beispiele", "Was sie verlangt"],
        rows: [
          ["Zivilrecht", "§§ 823, 831, 836 BGB", "Gefahrenquellen beherrschen, Verrichtungsgehilfen sorgfältig auswählen, Gebäudeteile sichern"],
          ["Arbeitsschutzrecht", "§ 5 ArbSchG, § 3 BetrSichV, § 4 ArbStättV", "Gefährdungsbeurteilung, Prüfung von Arbeitsmitteln, Instandhaltung von Sicherheitseinrichtungen"],
          ["Unfallverhütungsvorschriften", "DGUV Vorschrift 3, 68, 70", "Prüfung elektrischer Anlagen, Flurförderzeuge, Fahrzeuge"],
          ["Bauordnungsrecht der Länder", "Prüfverordnungen, Landesbauordnungen", "Prüfung sicherheitstechnischer Anlagen in Sonderbauten, Rauchwarnmelder"],
          ["Gesundheitsrecht", "§ 31 TrinkwV", "Legionellenuntersuchung von Großanlagen zur Trinkwassererwärmung"],
          ["Technische Regeln", "TRBS, ASR, DIN-Normen, VDI 6022", "Stand der Technik für Prüfverfahren und Qualifikation"],
        ],
      },
      { type: "h2", text: "Wer Betreiber ist" },
      {
        type: "p",
        text: "Betreiber ist zunächst der Eigentümer. In Unternehmen trifft die Verantwortung die Organe – Geschäftsführung, Vorstand –, in Kommunen die Verwaltungsleitung, bei Wohnungseigentum die Gemeinschaft der Wohnungseigentümer. Durch Vertrag kann die Betreiberrolle teilweise übergehen, etwa auf einen Mieter, der ein Gebäude vollständig nutzt. Entscheidend ist, wer die Anlage tatsächlich beherrscht; unklare Zuordnungen sind die häufigste Ursache für Lücken.",
      },
      { type: "h2", text: "Was sich delegieren lässt" },
      {
        type: "p",
        text: "Delegierbar sind **Aufgaben**, nicht die **Verantwortung**. Arbeitgeberpflichten können nach § 13 Abs. 2 ArbSchG schriftlich auf zuverlässige und fachkundige Personen übertragen werden. Wer delegiert, behält drei Pflichten:",
      },
      {
        type: "table",
        head: ["Pflicht des Delegierenden", "Inhalt", "Nachweis"],
        rows: [
          ["Auswahl", "nur zuverlässige und fachkundige Personen oder Firmen beauftragen", "Qualifikationsnachweise, z. B. nach TRBS 1203"],
          ["Anweisung", "Aufgaben, Befugnisse und Mittel klar festlegen", "schriftliche Pflichtenübertragung, Leistungsbeschreibung"],
          ["Kontrolle", "prüfen, ob Aufgaben erfüllt werden", "Statusberichte, Stichproben, Prüfberichte"],
        ],
      },
      { type: "h2", text: "Wer bei Versäumnissen haftet" },
      {
        type: "p",
        text: "Zivilrechtlich haftet der Betreiber für Schäden aus verletzter Verkehrssicherungspflicht (§ 823 BGB). Leitungspersonen handeln ordnungswidrig, wenn sie erforderliche Aufsichtsmaßnahmen unterlassen; dazu gehören ausdrücklich Bestellung, sorgfältige Auswahl und Überwachung von Aufsichtspersonen. Ist die zugrunde liegende Pflichtverletzung mit Strafe bedroht, beträgt die Geldbuße bis zu einer Million Euro (§ 130 Abs. 1 und 3 OWiG). Nach einem Unfall kommen strafrechtliche Ermittlungen gegen verantwortliche Personen hinzu. Ausführlich: [Haftung bei fehlenden Prüfungen](/wissen/haftung-fehlende-pruefungen).",
      },
      {
        type: "example",
        title: "Pflegeheimträger mit vier Einrichtungen",
        text: [
          "Die Geschäftsführung hat die Prüfungen mündlich den Hausleitungen übertragen. Bei einer Begehung der Heimaufsicht fehlen in zwei Häusern Nachweise der Brandschutzprüfungen und der jährlichen Legionellenuntersuchung.",
          "Lösung: schriftliche Pflichtenübertragung je Haus mit Anlagenliste und Budget, ein gemeinsames Kataster und ein quartalsweiser Statusbericht an die Geschäftsführung – damit ist auch deren Kontrollpflicht dokumentiert. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
      { type: "h2", text: "Was die Organisation kostet" },
      {
        type: "p",
        text: "Die Kosten der Betreiberorganisation setzen sich aus der einmaligen Bestandsaufnahme mit Pflichtenkataster und der laufenden Koordination zusammen; die Kosten der Prüfungen selbst kommen hinzu. Das Leistungs- und Kostenmodell beschreibt die Seite [Externer Betreibermanager](/externer-betreibermanager).",
      },
    ],
    faqs: [
      [
        "Was versteht man unter Betreiberverantwortung?",
        "Die Pflicht des Eigentümers oder Betreibers, Gebäude und Anlagen so zu betreiben, dass niemand zu Schaden kommt, und dies nachzuweisen. Sie setzt sich aus vielen Einzelpflichten wie Prüfen, Warten, Dokumentieren und Kontrollieren zusammen.",
      ],
      [
        "Ist Betreiberverantwortung gesetzlich geregelt?",
        "Es gibt kein einzelnes Gesetz zur Betreiberverantwortung. Die Pflichten ergeben sich aus BGB, ArbSchG, BetrSichV, ArbStättV, Unfallverhütungsvorschriften, Bauordnungsrecht der Länder, Trinkwasserverordnung sowie technischen Regeln.",
      ],
      [
        "Kann Betreiberverantwortung auf einen Dienstleister übertragen werden?",
        "Übertragen lassen sich die Aufgaben, nicht die Verantwortung. Der Betreiber muss den Dienstleister sorgfältig auswählen, klar beauftragen und regelmäßig kontrollieren.",
      ],
      [
        "Wer trägt bei einer GmbH die Betreiberverantwortung?",
        "Die Geschäftsführung als Organ der Gesellschaft. Sie kann Aufgaben übertragen, muss die Organisation aber so gestalten und überwachen, dass die Pflichten erfüllt werden.",
      ],
    ],
    sources: [
      ["BGB", "§§ 823, 831, 836"],
      ["ArbSchG", "§ 5, § 13 Abs. 2"],
      ["BetrSichV", "§ 3, § 14"],
      ["ArbStättV", "§ 4"],
      ["OWiG", "§ 130 Abs. 1 und 3"],
      ["TrinkwV", "§ 31"],
      ["GEFMA 190", "Pflichtenermittlung, Delegation, Wirksamkeitskontrolle"],
    ],
    related: [
      ["Betreiberpflichten", "/betreiberpflichten", "Übersicht nach Anlagen"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Aufgaben auslagern"],
      ["Haftung bei fehlenden Prüfungen", "/wissen/haftung-fehlende-pruefungen", "Zivil-, Straf- und Bußgeldrecht"],
      ["Betreiberpflichten im Facility Management", "/wissen/betreiberpflichten-facility-management", "GEFMA 190"],
    ],
    cta: "Betreiberverantwortung nachweisbar organisieren.",
  },
  {
    slug: "betreiberpflichten",
    keyword: "betreiberpflichten",
    secondary: ["betreiberpflichten gebäude", "betreiberpflichten vermieter", "betreiberpflichten technische anlagen", "betreiberpflichten übersicht"],
    name: "Betreiberpflichten",
    title: "Betreiberpflichten: Übersicht für Gebäude und Anlagen",
    description:
      "Betreiberpflichten für Gebäude und technische Anlagen im Überblick: Prüf-, Wartungs- und Dokumentationspflichten mit Fristen und Rechtsgrundlage je Anlage.",
    h1: "Betreiberpflichten: Prüf-, Wartungs- und Dokumentationspflichten im Überblick",
    kicker: "LEISTUNG · ÜBERSICHT",
    serviceType: "Ermittlung und Organisation von Betreiberpflichten",
    cardText: "Welche Prüf- und Wartungspflichten für Gebäude und Anlagen gelten – mit Fristen und Rechtsgrundlagen.",
    highlights: [
      "Pflichten je Anlage mit Rechtsgrundlage",
      "Betreiberpflichtenkataster je Standort",
      "Fristen zentral überwacht",
    ],
    lead: [
      "Betreiberpflichten sind die Pflichten, die Eigentümer und Betreiber von Gebäuden und technischen Anlagen erfüllen müssen: wiederkehrende Prüfungen, Wartung und Instandhaltung, Kontrollen, Unterweisungen und die Dokumentation aller Ergebnisse. Welche Pflichten gelten, hängt von Anlage, Nutzung des Gebäudes und Bundesland ab.",
      "betreibermanager.de ermittelt die Betreiberpflichten je Anlage und Standort und organisiert ihre Erfüllung – für Wohnungsunternehmen, Kommunen, Kliniken und Unternehmen mit mehreren Standorten in ganz Deutschland.",
    ],
    blocks: [
      { type: "h2", text: "Welche Arten von Betreiberpflichten es gibt" },
      {
        type: "table",
        head: ["Pflichtart", "Beispiel", "Rechtsgrundlage (Auswahl)"],
        rows: [
          ["Prüfen", "Elektroprüfung, Aufzugsprüfung, Legionellenuntersuchung", "§ 14 BetrSichV, § 5 DGUV Vorschrift 3, § 31 TrinkwV"],
          ["Instand halten", "Wartung von Feuerlöschern und RLT-Anlagen", "§ 4 Abs. 1 und 3 ArbStättV"],
          ["Kontrollieren", "Sichtkontrolle von Regalen und Arbeitsmitteln vor Verwendung", "§ 4 Abs. 5 BetrSichV"],
          ["Unterweisen", "Unterweisung der Beschäftigten, Brandschutzhelfer", "§ 12 ArbSchG, ASR A2.2"],
          ["Dokumentieren", "Prüfprotokolle aufbewahren", "§ 14 Abs. 7 BetrSichV"],
          ["Organisieren", "Zuständigkeiten festlegen, Aufgaben schriftlich übertragen", "§ 13 Abs. 2 ArbSchG, § 130 OWiG"],
        ],
      },
      { type: "h2", text: "Betreiberpflichten nach Anlage" },
      {
        type: "table",
        caption: "Wichtige wiederkehrende Prüfungen (Richtwerte)",
        head: ["Anlage", "Pflicht", "Frist", "Grundlage"],
        rows: [
          ["Elektrische Anlagen und Geräte", "[DGUV V3 Prüfung](/dguv-v3-pruefung)", "4 Jahre ortsfest; Geräte nach Gefährdungsbeurteilung, Richtwert 6 Monate", "DGUV Vorschrift 3, DA zu § 5"],
          ["Trinkwasser-Großanlagen", "[Legionellenprüfung](/legionellenpruefung)", "3 Jahre bei Vermietung, jährlich bei öffentlicher Tätigkeit", "§ 31 TrinkwV"],
          ["Raumlufttechnische Anlagen", "[Hygieneinspektion nach VDI 6022](/vdi-6022)", "2 bzw. 3 Jahre", "VDI 6022 Blatt 1, § 4 Abs. 3 ArbStättV"],
          ["Feuerlöscher", "[Feuerlöscher-Prüfung](/feuerloescher-pruefung)", "mindestens alle 2 Jahre", "ASR A2.2, DIN 14406-4"],
          ["Lagerregale", "[Regalprüfung](/regalpruefung)", "mindestens alle 12 Monate", "DIN EN 15635, § 14 BetrSichV"],
          ["Fahrzeuge, Stapler, Krane, Tore", "[UVV-Prüfung](/uvv-pruefung)", "mindestens jährlich", "DGUV Vorschriften 52, 68, 70; ASR A1.7"],
          ["Aufzüge", "[Haupt- und Zwischenprüfung durch ZÜS](/pruefbereiche/aufzugsanlagen)", "Hauptprüfung spätestens alle 2 Jahre, dazwischen Zwischenprüfung", "BetrSichV Anhang 2 Abschnitt 2"],
          ["Brandschutzanlagen in Sonderbauten", "[Prüfung durch Prüfsachverständige](/pruefbereiche/brandschutz)", "nach Landesrecht, häufig 3 Jahre", "Prüfverordnung des Landes"],
        ],
      },
      {
        type: "p",
        text: "Die vollständige Liste mit allen Prüfbereichen steht unter [Prüffristen im Überblick](/prueffristen). Welche Zeile für Ihr Gebäude gilt, ergibt sich aus Nutzung und Ausstattung – ein Bürogebäude ohne Aufzug und zentrale Warmwasserbereitung hat andere Pflichten als ein Pflegeheim.",
      },
      { type: "h2", text: "Wer Betreiberpflichten erfüllen muss" },
      {
        type: "p",
        text: "Verpflichtet ist der Betreiber, in der Regel der Eigentümer; für Arbeitsmittel und Arbeitsstätten der Arbeitgeber. Bei Vermietung teilen sich Vermieter und Mieter die Pflichten: Gebäudetechnik beim Vermieter, Arbeitsmittel der Beschäftigten beim Mieter. Was sich davon delegieren lässt, erklärt die Seite [Betreiberverantwortung](/betreiberverantwortung).",
      },
      {
        type: "table",
        caption: "Typische Aufteilung der Betreiberpflichten bei Vermietung (vertraglich abweichend regelbar)",
        head: ["Bereich", "Vermieter / Eigentümer", "Mieter / Nutzer"],
        rows: [
          ["Gebäudetechnik (Aufzug, Heizung, Trinkwasser, RLT)", "Prüfung und Wartung", "Mängel melden"],
          ["Elektrische Gebäudeinstallation", "Prüfung, soweit er sie betreibt", "Prüfung der eigenen Geräte nach DGUV Vorschrift 3"],
          ["Brandschutzanlagen des Gebäudes", "Prüfung und Instandhaltung", "Fluchtwege freihalten, Unterweisung der eigenen Beschäftigten"],
          ["Arbeitsmittel und Arbeitsplätze", "–", "Gefährdungsbeurteilung und Prüfungen als Arbeitgeber"],
        ],
      },
      { type: "h2", text: "Was gilt, wenn keine feste Frist vorgeschrieben ist" },
      {
        type: "p",
        text: "Für viele Arbeitsmittel nennt keine Vorschrift eine feste Frist – etwa für Leitern oder die Sichtkontrollen an Regalen. Dann legt der Arbeitgeber Art, Umfang und Fristen der Prüfungen selbst fest, und zwar so, dass das Arbeitsmittel bis zur nächsten Prüfung sicher verwendet werden kann (§ 3 Abs. 6 BetrSichV). Die Begründung gehört in die Gefährdungsbeurteilung. Wer hier nur Richtwerte aus Herstellerunterlagen übernimmt, sollte prüfen, ob Beanspruchung und Umgebung im eigenen Betrieb vergleichbar sind.",
      },
      { type: "h2", text: "Betreiberpflichten in Ihrer Branche" },
      {
        type: "checklist",
        items: [
          "[Wohnungsunternehmen](/betreiberpflichten/wohnungsunternehmen): Trinkwasser, Aufzüge, Rauchwarnmelder, Spielplätze, Regiebetriebe",
          "[Kommunen](/betreiberpflichten/kommunen): Schulen, Kitas, Sporthallen, Bauhöfe, Feuerwehren",
          "[Krankenhäuser und Pflege](/betreiberpflichten/krankenhaeuser): medizinisch genutzte Bereiche, Notstrom, RLT, jährliche Legionellenuntersuchung",
        ],
      },
      { type: "h2", text: "So werden Betreiberpflichten organisiert" },
      {
        type: "steps",
        items: [
          "**Bestand erfassen:** Gebäude und prüfpflichtige Anlagen je Standort.",
          "**Pflichten zuordnen:** Rechtsgrundlage, Frist und Prüferqualifikation je Anlage im [Betreiberpflichtenkataster](/wissen/betreiberpflichtenkataster-erstellen).",
          "**Zuständigkeiten festlegen:** schriftliche Übertragung an interne Stellen und Dienstleister.",
          "**Fristen überwachen:** alle Termine in einem Plan, Prüfungen rechtzeitig beauftragen.",
          "**Nachweise führen:** Prüfberichte je Anlage ablegen, Mängel bis zur Behebung verfolgen.",
        ],
      },
      {
        type: "example",
        title: "Kommunales Wohnungsunternehmen nach Fusion",
        text: [
          "Zwei Gesellschaften mit zusammen 4.100 Wohnungen werden zusammengelegt. Beide führten Prüfungen in eigenen Listen mit unterschiedlicher Systematik; für Tiefgaragen und Spielplätze war die Zuständigkeit ungeklärt.",
          "Ein gemeinsames Kataster ordnet jeder Wirtschaftseinheit ihre Pflichten zu. Doppelte Wartungsverträge werden gekündigt, fehlende Prüfungen nachgeholt, die Fristen in einem Plan überwacht. (Beispiel zur Veranschaulichung typischer Ausgangslagen.)",
        ],
      },
    ],
    faqs: [
      [
        "Was sind Betreiberpflichten?",
        "Die Pflichten von Eigentümern und Betreibern, Gebäude und Anlagen sicher zu betreiben: wiederkehrende Prüfungen, Wartung, Kontrollen, Unterweisungen und die Dokumentation. Sie ergeben sich aus Gesetzen, Verordnungen, Unfallverhütungsvorschriften und technischen Regeln.",
      ],
      [
        "Welche Betreiberpflichten haben Vermieter?",
        "Je nach Ausstattung unter anderem die Legionellenuntersuchung von Großanlagen zur Trinkwassererwärmung, die Prüfung von Aufzügen durch eine ZÜS, die Wartung von Rauchwarnmeldern nach Landesrecht und die Verkehrssicherung von Wegen, Bäumen und Gebäudeteilen.",
      ],
      [
        "Wie behält man den Überblick über alle Betreiberpflichten?",
        "Mit einem Betreiberpflichtenkataster: einer Liste aller Pflichten je Anlage mit Rechtsgrundlage, Frist, Zuständigkeit und Nachweisstatus, die laufend fortgeschrieben wird.",
      ],
    ],
    sources: [
      ["BetrSichV", "§ 3 Abs. 6, § 4 Abs. 5, § 14, Anhang 2 Abschnitt 2"],
      ["ArbStättV", "§ 4 Abs. 1 und 3"],
      ["ArbSchG", "§ 12, § 13 Abs. 2"],
      ["DGUV V3", "§ 5, Durchführungsanweisungen"],
      ["TrinkwV", "§ 31"],
      ["VDI 6022", "Hygieneinspektion"],
      ["ASR A2.2", "Feuerlöscher, Unterweisung"],
      ["DIN EN 15635", "Experteninspektion"],
      ["OWiG", "§ 130"],
      ["PrüfVO", "wiederkehrende Prüfungen in Sonderbauten"],
    ],
    related: [
      ["Prüffristen festlegen", "/wissen/prueffristen-festlegen", "Gefährdungsbeurteilung"],
      ["Betreiberverantwortung", "/betreiberverantwortung", "Definition und Haftung"],
      ["Prüffristen im Überblick", "/prueffristen", "Alle Prüfbereiche"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Organisation auslagern"],
      ["Betreiberpflichtenkataster erstellen", "/wissen/betreiberpflichtenkataster-erstellen", "Anleitung"],
    ],
    cta: "Betreiberpflichten Ihrer Standorte ermitteln lassen.",
  },
];

export const leistungsseiteBySlug = (slug: string) => leistungsseiten.find((p) => p.slug === slug);
