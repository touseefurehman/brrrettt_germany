import type { Article } from "./pages";

// Fachartikel je Zielgruppe. Diese Begriffe (Schule, Pflegeheim, Hausverwaltung) sind bei TÜV NORD, DGWZ und
// Rödl & Partner kaum besetzt. Die kommerziellen Keywords liegen auf den Landingpages unter /betreiberpflichten –
// Artikel verlinken dorthin und zielen auf Informations-Suchanfragen, um Kannibalisierung zu vermeiden.

const published = "2026-10-22";

export const branchenArticles: Article[] = [
  {
    slug: "pruefpflichten-wohnungsbestand",
    keyword: "prüfpflichten wohnungsbestand",
    secondary: ["prüfpflichten mehrfamilienhaus", "prüfpflichten vermieter"],
    cluster: "Branchen",
    title: "Prüfpflichten im Wohnungsbestand – Checkliste je Gebäudeart",
    description:
      "Prüfpflichten im Wohnungsbestand: Checkliste für Mehrfamilienhaus, Aufzug, Tiefgarage, Spielplatz und Gewerbeeinheit – mit Fristen und Rechtsgrundlagen.",
    h1: "Prüfpflichten im Wohnungsbestand: Checkliste je Gebäudeart",
    kicker: "WOHNUNGSWIRTSCHAFT",
    teaser: "Welche Prüfungen bei Mehrfamilienhaus, Aufzug, Tiefgarage und Spielplatz anfallen – als Checkliste.",
    published,
    modified: published,
    lead: [
      "Welche Prüfpflichten ein Wohngebäude auslöst, hängt von seiner Ausstattung ab: Ein Mehrfamilienhaus mit zentraler Warmwasserbereitung braucht eine Legionellenuntersuchung, ein Gebäude mit Aufzug die ZÜS-Prüfung, eine Tiefgarage je nach Größe die Prüfung durch Prüfsachverständige. Diese Checkliste ordnet die Pflichten nach Gebäudeart und Ausstattung.",
    ],
    blocks: [
      { type: "h2", text: "Grundpflichten für jedes Wohngebäude", id: "grundpflichten" },
      {
        type: "checklist",
        items: [
          "**Rauchwarnmelder:** jährliche Inspektion und Wartung nach DIN 14676-1; Zuständigkeit nach Landesbauordnung",
          "**Feuerstätten:** Feuerstättenschau und Kehr- bzw. Überprüfungsarbeiten laut Feuerstättenbescheid",
          "**Verkehrssicherung:** Zugänge, Treppen, Beleuchtung, Winterdienst, Dach und Fassade regelmäßig kontrollieren",
          "**Bäume:** Regelkontrolle nach FLL-Baumkontrollrichtlinie, Intervall nach Alter und Zustand",
          "**Elektrische Anlage Allgemeinbereich:** keine gesetzliche Wiederholungsfrist für reine Wohnnutzung, aber Verkehrssicherungspflicht – Prüfung in angemessenen Abständen empfohlen",
        ],
      },
      { type: "h2", text: "Zusätzliche Pflichten nach Ausstattung", id: "ausstattung" },
      {
        type: "table",
        head: ["Ausstattung", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Zentrale Warmwasserbereitung als Großanlage", "Legionellenuntersuchung", "mindestens alle 3 Jahre", "§ 31 TrinkwV"],
          ["Aufzug", "Hauptprüfung / Zwischenprüfung durch ZÜS, Notrufsystem", "im Wechsel jährlich", "BetrSichV Anhang 2 Abschnitt 2"],
          ["Tiefgarage (Mittel-/Großgarage)", "Prüfung CO-Warnanlage, Lüftung, ggf. Sicherheitsbeleuchtung", "in der Regel 3 Jahre", "Prüfverordnung / Garagenverordnung des Landes"],
          ["Garagentor, kraftbetätigt", "Prüfung durch Sachkundigen", "mindestens jährlich (bei Beschäftigten ASR A1.7, sonst Herstellerangabe)", "ASR A1.7, DIN EN 12453"],
          ["Spielplatz", "Routine-, operative und Hauptinspektion", "wöchentlich bis jährlich", "DIN EN 1176-7"],
          ["Feuerlöscher (z. B. Tiefgarage)", "Instandhaltung", "2 Jahre", "DIN 14406-4"],
          ["Blitzschutzanlage", "Wiederholungsprüfung", "2–4 Jahre je nach Schutzklasse", "DIN EN 62305-3"],
          ["Rückstausicherung / Hebeanlage", "Wartung", "halbjährlich bis jährlich", "DIN EN 13564, DIN EN 12056-4"],
          ["Gewerbeeinheit mit Fettabscheider", "Wartung / Generalinspektion", "jährlich / 5 Jahre", "DIN 4040-100, DIN EN 1825-2"],
        ],
      },
      {
        type: "definition",
        term: "Großanlage zur Trinkwassererwärmung",
        text: "Eine Anlage mit einem Speicher-Trinkwassererwärmer von mehr als 400 Litern Inhalt oder mit mehr als 3 Litern Inhalt in mindestens einer Rohrleitung zwischen Erwärmer und Entnahmestelle. Anlagen in Ein- und Zweifamilienhäusern gelten nicht als Großanlage.",
      },
      { type: "h2", text: "Was Wohnungsunternehmen zusätzlich als Arbeitgeber prüfen", id: "arbeitgeber" },
      {
        type: "p",
        text: "Für Geschäftsstellen, Hausmeisterwerkstätten, Regiebetriebe und Fahrzeuge gelten die Arbeitgeberpflichten: elektrische Prüfungen nach DGUV Vorschrift 3, Prüfung von Leitern, Tritten und Arbeitsmitteln nach BetrSichV, Feuerlöscher und Sicherheitsbeleuchtung nach ArbStättV und ASR. Diese Pflichten werden in der Praxis oft von den Gebäudepflichten getrennt geführt – und dabei vergessen.",
      },
      {
        type: "example",
        title: "Quartier mit 12 Mehrfamilienhäusern",
        text: [
          "Ausstattung: 8 zentrale Warmwasseranlagen, davon 6 Großanlagen; 4 Aufzüge; 1 Tiefgarage mit 60 Stellplätzen; 2 Spielplätze; 340 Rauchwarnmelder.",
          "Ergebnis der Erfassung: 6 Legionellenuntersuchungen alle 3 Jahre, 4 ZÜS-Prüfungen jährlich, Prüfsachverständigen-Prüfung der Tiefgarage nach Landesrecht, wöchentliche Sichtkontrolle und Jahresinspektion der Spielplätze, jährliche Rauchwarnmelder-Wartung. Gebündelt nach Monaten ergeben sich sechs Prüffenster pro Jahr statt über 30 Einzelterminen.",
        ],
      },
      { type: "h2", text: "Checkliste: Ist Ihr Bestand vollständig erfasst?", id: "checkliste" },
      {
        type: "checklist",
        items: [
          "Alle Trinkwasseranlagen auf Großanlage geprüft und Untersuchungen beauftragt",
          "Prüfbescheinigungen aller Aufzüge liegen beim Eigentümer, nicht nur beim Wartungsunternehmen",
          "Garagen nach Landesrecht als Klein-, Mittel- oder Großgarage eingeordnet",
          "Spielplatzinspektionen dokumentiert",
          "Rauchwarnmelder-Zuständigkeit nach Landesrecht geklärt und Wartung nachgewiesen",
          "Gewerbeeinheiten auf eigene Pflichten (Abscheider, Lüftung) geprüft",
          "Arbeitgeberpflichten für Werkstätten und Geschäftsstellen erfasst",
        ],
      },
      {
        type: "p",
        text: "Wie wir diese Pflichten für ganze Bestände organisieren, beschreibt die Seite [Betreiberpflichten für Wohnungsunternehmen](/betreiberpflichten/wohnungsunternehmen).",
      },
      { type: "h2", text: "Prüfpflichten nach Rolle im Unternehmen", id: "rollen" },
      {
        type: "table",
        caption: "Wer im Wohnungsunternehmen typischerweise wofür zuständig ist (Beispiel)",
        head: ["Pflicht", "Typisch zuständig", "Unterstützt durch"],
        rows: [
          ["Legionellenuntersuchung", "Technisches Bestandsmanagement", "Untersuchungsstelle, Installateur"],
          ["Aufzugsprüfung", "Technisches Bestandsmanagement", "ZÜS, Wartungsunternehmen"],
          ["Rauchwarnmelder", "Bestandsmanagement bzw. Messdienstleister", "Mieter je nach Landesrecht"],
          ["Spielplatzinspektion", "Hausmeisterdienst", "externer Spielplatzprüfer für die Hauptinspektion"],
          ["Verkehrssicherung, Winterdienst", "Hausmeisterdienst", "Dienstleister"],
          ["Elektro- und UVV-Prüfung eigener Arbeitsmittel", "Arbeitsschutz bzw. Regiebetrieb", "Prüfdienste"],
        ],
      },
      {
        type: "p",
        text: "Die Aufteilung ist von Unternehmen zu Unternehmen verschieden. Entscheidend ist, dass sie schriftlich feststeht und eine Stelle den Gesamtüberblick hat. In vielen Wohnungsunternehmen kennt das Bestandsmanagement die Gebäude, der Hausmeisterdienst die Außenanlagen und der Arbeitsschutz die Werkstätten – aber niemand alle Fristen zusammen.",
      },
      { type: "h2", text: "Häufige Lücken nach Gebäudeart", id: "luecken" },
      {
        type: "checklist",
        items: [
          "Mehrfamilienhaus mit zentraler Warmwasserbereitung: Leitungsinhalt nie ermittelt, Legionellenpflicht unklar",
          "Wohnanlage mit Tiefgarage: Einordnung als Mittel- oder Großgarage fehlt, Prüfung von CO-Warnanlage und Lüftung nicht beauftragt",
          "Quartier mit Spielplatz: operative Inspektionen finden statt, sind aber nicht dokumentiert",
          "Seniorenwohnen mit Aufzug und Gemeinschaftsräumen: Brandschutzanforderungen nicht geprüft",
          "Gebäude mit Gewerbeeinheit: Fettabscheider oder Lüftung des Mieters nicht erfasst",
        ],
      },
      { type: "h2", text: "Vom Kataster zum Jahresplan", id: "jahresplan" },
      {
        type: "p",
        text: "Wenn alle Pflichten je Gebäude erfasst sind, lässt sich daraus ein Jahresplan ableiten: welche Prüfungen in welchem Monat, in welchem Quartier, durch welchen Dienstleister. Bündelung spart Anfahrten und Mieterankündigungen – etwa Rauchwarnmelder-Wartung und Legionellenprobennahme in denselben Wochen, wenn ohnehin Termine in den Wohnungen nötig sind. Der Plan zeigt auch, welche Leistungen sich gemeinsam ausschreiben lassen. Für Vorstand und Aufsichtsrat ist ein Statusbericht auf Basis dieses Plans der Nachweis, dass die Betreiberpflichten organisiert sind.",
      },
      { type: "h2", text: "Kommunikation mit den Mietern", id: "mieter" },
      {
        type: "p",
        text: "Viele Prüfungen im Wohnungsbestand brauchen Zugang zu Wohnungen: Rauchwarnmelder-Wartung, Probennahme für die Legionellenuntersuchung, gelegentlich Elektroprüfungen in Allgemeinräumen, die nur über Mieterkeller erreichbar sind. Rechtzeitige Ankündigungen, feste Terminfenster und ein Ersatztermin senken die Zahl der verpassten Zugänge. Wer mehrere Prüfungen in derselben Woche bündelt, muss die Mieter nur einmal ansprechen. Für Mieter, die Prüfungen nicht ermöglichen, sollte ein Vorgehen feststehen, das dokumentiert, dass der Vermieter seine Pflicht ernst genommen hat. Die Ergebnisse von Prüfungen, die Mieter betreffen – etwa ein Legionellenbefund –, werden nach den Vorgaben des jeweiligen Rechts mitgeteilt; für Trinkwasser regelt das § 52 Abs. 3 TrinkwV.",
      },
      {
        type: "p",
        text: "Für Genossenschaften und kommunale Wohnungsgesellschaften kommt ein weiterer Aspekt hinzu: Aufsichtsrat und Prüfungsverband fragen zunehmend nach der Organisation der Betreiberpflichten. Ein vollständiges Kataster, ein Jahresplan und ein regelmäßiger Statusbericht beantworten diese Fragen ohne zusätzlichen Aufwand und zeigen, dass der Vorstand seine Organisationspflicht wahrnimmt.",
      },
      {
        type: "p",
        text: "Für kleinere Bestandshalter ohne eigene Technikabteilung ist ein externer Betreibermanager eine Möglichkeit, Kataster, Jahresplan und Statusbericht aufzubauen und laufend zu pflegen. Die Entscheidungen über Maßnahmen und Budgets bleiben beim Unternehmen; der Dienstleister sorgt dafür, dass keine Frist übersehen wird und alle Nachweise an einer Stelle liegen. Mehr dazu auf der Seite [Externer Betreibermanager](/externer-betreibermanager). Für Bestände mit Aufzügen, zentraler Warmwasserbereitung und Tiefgaragen ist der Aufwand der Koordination meist größer als der der einzelnen Prüfungen – genau dort setzt eine solche Unterstützung an. Der Einstieg ist eine Bestandsaufnahme für einen Teil des Bestands.",
      },
    ],
    faqs: [
      [
        "Welche Prüfungen sind in einem Mehrfamilienhaus Pflicht?",
        "Je nach Ausstattung: Legionellenuntersuchung bei Großanlagen zur Trinkwassererwärmung, ZÜS-Prüfung von Aufzügen, Wartung von Rauchwarnmeldern, Feuerstättenschau, Inspektion von Spielplätzen, Prüfung von Garagen nach Landesrecht sowie die laufende Verkehrssicherung von Wegen, Bäumen und Gebäudeteilen.",
      ],
      [
        "Muss die Elektroanlage in einem Wohnhaus regelmäßig geprüft werden?",
        "Für reine Wohnnutzung gibt es keine gesetzliche Wiederholungsfrist wie in Arbeitsstätten. Der Eigentümer muss aber im Rahmen der Verkehrssicherungspflicht für eine sichere Anlage sorgen; viele Wohnungsunternehmen lassen Allgemeinbereiche deshalb in festen Abständen prüfen. In Werkstätten und Geschäftsstellen gilt die DGUV Vorschrift 3.",
      ],
      [
        "Wie oft muss ein Spielplatz im Wohnquartier kontrolliert werden?",
        "DIN EN 1176-7 empfiehlt eine visuelle Routineinspektion je nach Nutzung bis zu täglich bzw. wöchentlich, eine operative Inspektion alle ein bis drei Monate und eine jährliche Hauptinspektion durch eine qualifizierte Person.",
      ],
      [
        "Wer ist für Rauchwarnmelder in Mietwohnungen zuständig?",
        "Das regelt die jeweilige Landesbauordnung. Der Einbau obliegt in allen Ländern dem Eigentümer; die Sicherstellung der Betriebsbereitschaft liegt je nach Land beim Eigentümer oder bei den unmittelbaren Besitzern, also den Mietern.",
      ],
      [
        "Wie behält ein Wohnungsunternehmen den Überblick über alle Prüfpflichten?",
        "Mit einem Kataster je Gebäude oder Wirtschaftseinheit, das alle Pflichten mit Rechtsgrundlage, Frist und Zuständigkeit enthält, und einem daraus abgeleiteten Jahresplan mit regelmäßigem Statusbericht an die Leitung.",
      ],
    ],
    sources: [
    ["TrinkwV", "§ 31, § 51"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["DIN 14676", "Inspektion und Wartung"],
    ["DIN EN 1176", "Inspektion und Wartung"],
    ["BGB", "§§ 823, 831, 836"],
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
  ],
    related: [
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Bestände organisieren lassen"],
      ["Betreiberpflichten für Hausverwaltungen", "/wissen/betreiberpflichten-hausverwaltung", "WEG und Mietverwaltung"],
      ["Prüffristen im Überblick", "/prueffristen", "Inkl. Trinkwasser"],
    ],
    cta: "Prüfpflichten Ihres Wohnungsbestands erfassen lassen.",
  },
  {
    slug: "betreiberpflichten-schulen",
    keyword: "betreiberpflichten schule",
    secondary: ["prüfpflichten schulträger"],
    cluster: "Branchen",
    areas: ["brandschutz", "dguv-v3-pruefung"],
    title: "Betreiberpflichten Schule – Prüfpflichten für Schulträger",
    description:
      "Betreiberpflichten für Schulen: Prüfpflichten von Schulträgern für Sonderbau, Elektro, Trinkwasser, Fachräume, Sporthallen und Spielplätze – mit Tabelle.",
    h1: "Betreiberpflichten für Schulen: Was Schulträger prüfen lassen müssen",
    kicker: "KOMMUNEN",
    teaser: "Sonderbau, Fachräume, Sporthallen, Trinkwasser – Prüfpflichten von Schulträgern im Überblick.",
    published,
    modified: published,
    lead: [
      "Die Betreiberpflichten für Schulgebäude liegen beim Schulträger – meist der Kommune oder dem Kreis. Schulen sind in der Regel Sonderbauten: Sicherheitstechnische Anlagen werden durch Prüfsachverständige nach Landesrecht geprüft, elektrische Anlagen nach DGUV Vorschrift 4, Trinkwasser-Großanlagen jährlich auf Legionellen. Dazu kommen Fachräume, Werkräume, Sporthallen und Schulhöfe mit eigenen Anforderungen.",
    ],
    blocks: [
      { type: "h2", text: "Wer ist zuständig: Schulträger oder Schulleitung?", id: "zustaendigkeit" },
      {
        type: "definition",
        term: "Äußere und innere Schulangelegenheiten",
        text: "Der Schulträger ist für die äußeren Schulangelegenheiten zuständig – Gebäude, Ausstattung, Haustechnik und damit die Betreiberpflichten. Das Land bzw. die Schulleitung verantwortet die inneren Angelegenheiten wie Unterricht und Aufsicht, einschließlich der sicheren Verwendung von Geräten und Gefahrstoffen im Unterricht.",
      },
      {
        type: "p",
        text: "Die Schnittstelle muss schriftlich geregelt sein: Wer meldet Mängel? Wer prüft Geräte, die Lehrkräfte mitbringen? Wer kontrolliert Fachräume vor Unterrichtsbeginn? Ohne Regelung fühlt sich jede Seite auf die andere verwiesen.",
      },
      { type: "h2", text: "Prüfpflichten in Schulen", id: "pruefpflichten" },
      {
        type: "table",
        caption: "Typische Prüfpflichten (Richtwerte, Landesrecht beachten)",
        head: ["Bereich", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Sicherheitsbeleuchtung, BMA, Alarmierung, RWA, Lüftung", "Prüfung durch Prüfsachverständige", "in der Regel 3 Jahre", "Prüfverordnung des Landes"],
          ["Elektrische Anlagen", "Wiederholungsprüfung", "4 Jahre; Räume besonderer Art 1 Jahr", "DGUV Vorschrift 4"],
          ["Ortsveränderliche Geräte", "Wiederholungsprüfung", "nach Gefährdungsbeurteilung, in Schulen häufig 12 Monate", "DGUV Vorschrift 4"],
          ["Trinkwasser-Großanlagen (Duschen Sporthalle)", "Legionellenuntersuchung", "mindestens jährlich", "§ 31 TrinkwV"],
          ["Sportgeräte Sporthalle", "Inspektion und Wartung", "jährlich", "DIN EN 913, DIN 7910"],
          ["Schulhof- und Kita-Spielgeräte", "Routine-, operative und Hauptinspektion", "wöchentlich bis jährlich", "DIN EN 1176-7"],
          ["Laborabzüge in naturwissenschaftlichen Fachräumen", "Funktionsprüfung", "jährlich", "DIN EN 14175, DGUV Regel 113-018"],
          ["Gasanlagen in Fachräumen", "Prüfung der Dichtheit und Absperreinrichtungen", "nach Gefährdungsbeurteilung, üblich jährlich", "DGUV Regel 113-018, DVGW G 600"],
          ["Maschinen in Werkräumen", "Prüfung als Arbeitsmittel", "nach Gefährdungsbeurteilung", "BetrSichV, DGUV Vorschrift 4"],
          ["Feuerlöscher", "Instandhaltung", "2 Jahre", "ASR A2.2"],
        ],
      },
      {
        type: "note",
        text: "Konkrete Intervalle für Fachräume, Gasanlagen und Werkmaschinen ergeben sich aus der Gefährdungsbeurteilung und den Regelungen des jeweiligen Landes; die DGUV Regel 113-018 „Unterricht in Schulen mit gefährlichen Stoffen“ ist dafür eine zentrale Grundlage.",
      },
      { type: "h2", text: "Besondere Risiken im Schulbetrieb", id: "risiken" },
      {
        type: "checklist",
        items: [
          "Mitgebrachte Geräte von Lehrkräften (Wasserkocher, Kaffeemaschinen) sind nicht im Prüfbestand",
          "Turnhallen werden abends von Vereinen genutzt – Zuständigkeit für Duschen und Geräte ungeklärt",
          "Mängel aus der Brandverhütungsschau bleiben wegen Haushaltsfragen offen",
          "Nach Umbauten oder Containerlösungen fehlen Prüfungen vor Nutzungsaufnahme",
          "Prüfberichte liegen beim Hausmeister, nicht beim Schulträger",
        ],
      },
      {
        type: "example",
        title: "Schulzentrum mit Gymnasium, Realschule und Dreifachhalle",
        text: [
          "Der Schulträger lässt Elektro- und Brandschutzprüfungen über das Gebäudemanagement laufen, die Fachräume betreut die Schule selbst. Bei einer Begehung fehlen die Prüfnachweise für zwei Laborabzüge und die Legionellenuntersuchung der Hallenduschen, die der Verein nutzt.",
          "Lösung: ein gemeinsames Kataster für Schulträger und Schule, eine schriftliche Schnittstellenregelung und die Aufnahme der Hallenduschen in den jährlichen Untersuchungsplan.",
        ],
      },
      {
        type: "p",
        text: "Wie Kommunen die Betreiberpflichten aller Liegenschaften bündeln, beschreibt die Seite [Betreiberpflichten für Kommunen](/betreiberpflichten/kommunen).",
      },
      { type: "h2", text: "Ferienzeiten nutzen", id: "ferien" },
      {
        type: "p",
        text: "Schulen haben einen Vorteil, den kaum ein anderes Gebäude bietet: planbare Zeiten ohne Unterricht. Prüfungen, die den Betrieb stören, gehören in die Ferien – Elektroprüfungen in Klassen- und Fachräumen, Prüfungen der Sicherheitsbeleuchtung, Inspektion von Sportgeräten. Für Legionellenprobennahmen in Sporthallen sind die Wochen nach den Ferien heikel, weil das Wasser lange stand; sinnvoll ist dort ein Spülplan für die Ferienzeit, damit die Anlage bei Unterrichtsbeginn ordnungsgemäß betrieben wird. Ein Ferienkalender je Schulträger, in dem alle Prüfungen eingetragen sind, verhindert, dass sich Dienstleister gegenseitig im Weg stehen oder eine Prüfung mangels Zugang ausfällt.",
      },
      {
        type: "table",
        caption: "Beispiel eines Ferienplans für einen Schulträger",
        head: ["Ferien", "Prüfungen"],
        rows: [
          ["Osterferien", "Sportgeräte, Spielgeräte Schulhof, Laborabzüge"],
          ["Sommerferien", "Elektroprüfung ortsfeste Anlagen und Geräte, Sicherheitsbeleuchtung, RLT-Hygieneinspektion"],
          ["Herbstferien", "Feuerlöscher, Feststellanlagen, Nachprüfungen aus dem Sommer"],
          ["Laufend", "Legionellenuntersuchung nach Plan, Spülungen in Ferienzeiten"],
        ],
      },
      { type: "h2", text: "Vergabe von Prüfleistungen", id: "vergabe" },
      {
        type: "p",
        text: "Schulträger vergeben Prüfleistungen nach Vergaberecht. Eine Ausschreibung in Losen nach Gewerk oder Region, mit einheitlicher Anlagenliste je Schule, macht Angebote vergleichbar. Wichtig ist, die Qualifikation der Prüfer und das Protokollformat in die Leistungsbeschreibung aufzunehmen. Für kleinere Schulträger kann eine gemeinsame Ausschreibung mit Nachbarkommunen sinnvoll sein. Grundlage jeder Ausschreibung ist eine vollständige Erfassung der Anlagen je Schule.",
      },
      { type: "h2", text: "Typischer Jahresablauf für einen Schulträger", id: "jahresablauf" },
      {
        type: "steps",
        items: [
          "**Januar:** Prüfplan des Jahres aus dem Kataster ableiten, Leistungen ausschreiben oder abrufen.",
          "**Osterferien:** Sport- und Spielgeräte, Fachräume, Nachprüfungen aus dem Vorjahr.",
          "**Sommerferien:** Elektroprüfung, Sicherheitsbeleuchtung, RLT-Inspektionen, größere Mängelbeseitigung.",
          "**Herbstferien:** Feuerlöscher, Feststellanlagen, Tore.",
          "**Dezember:** Statusbericht an die Verwaltungsleitung mit erledigten, offenen und überfälligen Prüfungen.",
        ],
      },
      {
        type: "p",
        text: "Ein solcher Ablauf entlastet Hausmeister und Schulleitungen, weil Termine vorhersehbar werden. Er schafft außerdem eine feste Grundlage für die Haushaltsplanung: Die Kosten der Prüfungen und der typischen Mängelbeseitigung sind im Voraus bekannt und können im Haushalt des Schulträgers eingeplant werden.",
      },
      { type: "h2", text: "Häufige Fehler", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Prüfungen je Schule einzeln beauftragt, ohne gemeinsamen Plan",
          "Fachräume und Schulküchen nicht in die Elektroprüfung einbezogen",
          "Sporthallenduschen bei der Legionellenuntersuchung übersehen",
          "Mängel aus der Brandverhütungsschau ohne Verantwortlichen und Frist",
          "Containerklassen und Interimsbauten nicht im Kataster",
        ],
      },
      {
        type: "p",
        text: "Interimsbauten verdienen besondere Aufmerksamkeit: Während Sanierungen werden Klassen oft für Jahre in Containeranlagen ausgelagert. Diese haben eigene Elektroinstallationen, Sicherheitsbeleuchtung und Feuerlöscher, die in keiner Liste stehen, wenn sie nicht ausdrücklich erfasst werden.",
      },
      { type: "h2", text: "Schulen als Teil des kommunalen Gebäudebestands", id: "kommune" },
      {
        type: "p",
        text: "Schulen sind für die meisten Kommunen die größte Gruppe öffentlicher Gebäude. Es lohnt sich deshalb, die Organisation der Betreiberpflichten an den Schulen zu beginnen und das Ergebnis auf Kitas, Verwaltungsgebäude, Sporthallen und Bauhöfe zu übertragen. Ein Kataster mit einheitlicher Struktur, ein gemeinsamer Fristenplan und Rahmenverträge für Prüfleistungen schaffen Übersicht für alle Liegenschaften. Die Verantwortung bleibt bei der Kommune als Schulträger; Gebäudemanagement, Schulverwaltung und Hausmeister erhalten klar beschriebene Aufgaben. Wie das für alle Liegenschaften einer Kommune aussieht, beschreibt die Seite [Betreiberpflichten Kommunen](/betreiberpflichten/kommunen). Für kleinere Kommunen ohne eigenes Gebäudemanagement kann die Zusammenarbeit mit Nachbarkommunen oder einem externen Betreibermanager sinnvoll sein. Entscheidend ist in jedem Fall, dass eine Stelle den Gesamtüberblick über alle Schulgebäude hat, Fristen überwacht und der Verwaltungsleitung regelmäßig berichtet, welche Prüfungen erledigt, offen oder überfällig sind. Der Bericht ist zugleich der Nachweis, dass die Kommune ihrer Organisationspflicht nachkommt. Er sollte schriftlich erfolgen, von der Verwaltungsleitung zur Kenntnis genommen und mit Entscheidungen zu offenen Mängeln und Budgets verbunden werden. So wird aus einer Liste eine Steuerung, und Mängel aus Begehungen bleiben nicht über Jahre offen, weil niemand über ihre Behebung entscheidet. Für die Haushaltsberatung liefert der Bericht zudem belastbare Zahlen zum Sanierungsbedarf der Schulgebäude.",
      },
    ],
    faqs: [
      [
        "Wer trägt die Betreiberverantwortung für eine Schule?",
        "Der Schulträger, in der Regel die Gemeinde, Stadt oder der Kreis, für Gebäude und technische Anlagen. Die Schulleitung ist für den sicheren Unterrichtsbetrieb zuständig. Die Schnittstellen sollten schriftlich geregelt sein.",
      ],
      [
        "Wie oft muss Trinkwasser in Schulen auf Legionellen untersucht werden?",
        "Bei Großanlagen zur Trinkwassererwärmung im Rahmen einer öffentlichen Tätigkeit mindestens jährlich nach § 31 TrinkwV. Das betrifft häufig die Duschen in Sporthallen.",
      ],
      [
        "Müssen private Geräte von Lehrkräften geprüft werden?",
        "Geräte, die im Schulbetrieb genutzt werden, müssen sicher sein. Deshalb sollte die Schule regeln, dass mitgebrachte Geräte entweder in den Prüfbestand aufgenommen oder nicht verwendet werden.",
      ],
      [
        "Sind Schulen Sonderbauten?",
        "In den meisten Ländern ja, entweder ausdrücklich nach Landesbauordnung oder über Schulbaurichtlinien. Dann gelten die Prüfverordnungen des Landes für sicherheitstechnische Anlagen wie Sicherheitsbeleuchtung, Brandmelde- und Alarmierungsanlagen.",
      ],
      [
        "Wann sollten Prüfungen in Schulen stattfinden?",
        "Prüfungen, die den Unterricht stören, gehören in die Ferien. Ein Ferienkalender je Schulträger, in dem alle Prüfungen eingetragen sind, verhindert Terminkonflikte und verpasste Zugänge.",
      ],
    ],
    sources: [
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
    ["TrinkwV", "§ 31, § 51"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["DIN EN 1176", "Inspektion und Wartung"],
    ["ArbStättV", "§ 4 Abs. 3"],
  ],
    related: [
      ["Betreiberpflichten Kommunen", "/betreiberpflichten/kommunen", "Alle Liegenschaften organisieren"],
      ["Brandschutzprüfung", "/pruefbereiche/brandschutz", "BMA, Sicherheitsbeleuchtung, RWA"],
      ["DGUV V3 Prüfung: wie oft", "/wissen/dguv-v3-pruefung-wie-oft", "Fristen und Geräteerfassung"],
    ],
    cta: "Prüfpflichten Ihrer Schulen bündeln.",
  },
  {
    slug: "betreiberpflichten-pflegeheime",
    keyword: "betreiberpflichten pflegeheim",
    secondary: ["prüfpflichten pflegeeinrichtung"],
    cluster: "Branchen",
    areas: ["lueftung-klima"],
    title: "Betreiberpflichten Pflegeheim – Prüfungen & Nachweise",
    description:
      "Betreiberpflichten für Pflegeheime: Brandschutz im Sonderbau, Pflegebetten, Medizinprodukte, Rufanlagen, Trinkwasser und Hygiene – Pflichten und Fristen.",
    h1: "Betreiberpflichten für Pflegeheime: Prüfungen, Fristen und Nachweise",
    kicker: "PFLEGE",
    teaser: "Brandschutz, Pflegebetten, Rufanlagen und Trinkwasser – was Pflegeeinrichtungen nachweisen müssen.",
    published,
    modified: published,
    lead: [
      "Pflegeheime sind Sonderbauten mit Bewohnern, die sich im Notfall oft nicht selbst retten können. Entsprechend dicht sind die Betreiberpflichten: Brandmelde- und Sicherheitstechnik mit Prüfung durch Prüfsachverständige, Pflegebetten und andere Medizinprodukte nach MPBetreibV, Rufanlagen, Trinkwasser und Hygiene nach Infektionsschutzgesetz – kontrolliert von Heimaufsicht, Gesundheitsamt und Brandschutzdienststelle.",
    ],
    blocks: [
      { type: "h2", text: "Rechtlicher Rahmen", id: "rahmen" },
      {
        type: "definition",
        term: "Betreiber einer Pflegeeinrichtung",
        text: "Der Träger der Einrichtung. Er ist zugleich Arbeitgeber, Betreiber von Medizinprodukten im Sinne der MPBetreibV, Betreiber der Trinkwasseranlage und – sofern Eigentümer – Gebäudebetreiber. Ist das Gebäude gemietet, müssen die Pflichten zwischen Träger und Eigentümer vertraglich aufgeteilt sein.",
      },
      {
        type: "p",
        text: "Neben Bundesrecht gelten die Heimgesetze der Länder (z. B. Wohn- und Teilhabegesetze), die bauliche und personelle Anforderungen enthalten und von der Heimaufsicht überwacht werden. Nach § 36 IfSG brauchen voll- und teilstationäre Pflegeeinrichtungen einen Hygieneplan.",
      },
      { type: "h2", text: "Prüfpflichten in Pflegeheimen", id: "pruefpflichten" },
      {
        type: "table",
        caption: "Typische Prüfpflichten (Richtwerte)",
        head: ["Anlage / Bereich", "Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["BMA, Sicherheitsbeleuchtung, RWA, Feststellanlagen", "Prüfung durch Prüfsachverständige", "in der Regel 3 Jahre", "Prüfverordnung des Landes"],
          ["Brandmeldeanlage", "Inspektion / Wartung", "vierteljährlich / jährlich", "DIN 14675, DIN VDE 0833"],
          ["Elektrisch verstellbare Pflegebetten", "Prüfung als elektrisches Gerät; Instandhaltung nach Herstellerangaben", "nach Gefährdungsbeurteilung und Herstellerangaben", "DGUV Vorschrift 3, § 7 MPBetreibV"],
          ["Aktive Medizinprodukte nach Anlage 1 MPBetreibV", "Sicherheitstechnische Kontrolle", "spätestens alle 2 Jahre", "§ 12 MPBetreibV"],
          ["Alle Medizinprodukte", "Einweisung der Anwender, Bestandsverzeichnis", "vor erster Anwendung / laufend", "MPBetreibV"],
          ["Rufanlage (Lichtruf)", "Inspektion und Wartung", "jährlich", "DIN VDE 0834"],
          ["Trinkwasser-Großanlagen", "Legionellenuntersuchung", "in der Regel jährlich", "§ 31 TrinkwV"],
          ["Aufzüge, Bettenaufzüge", "Haupt- und Zwischenprüfung durch ZÜS", "im Wechsel jährlich", "BetrSichV Anhang 2"],
          ["RLT-Anlagen", "Hygieneinspektion", "2–3 Jahre", "VDI 6022 Blatt 1"],
          ["Großküche: Geräte und Fettabscheider", "Elektroprüfung, Wartung", "nach Gefährdungsbeurteilung / jährlich", "DGUV Vorschrift 3, DIN EN 1825-2"],
          ["Feuerlöscher", "Instandhaltung", "2 Jahre", "ASR A2.2"],
        ],
      },
      {
        type: "note",
        text: "Ob ein Pflegeheim bei der Trinkwasserversorgung als öffentliche oder gewerbliche Tätigkeit gilt, sollte mit dem Gesundheitsamt geklärt werden; in der Praxis wird überwiegend jährlich untersucht.",
      },
      { type: "h2", text: "Schwerpunkt Pflegebetten", id: "pflegebetten" },
      {
        type: "p",
        text: "Elektrisch verstellbare Pflegebetten sind Medizinprodukte und zugleich elektrische Betriebsmittel. Für sie gelten die Herstellerangaben zu Kontrollen und Wartung, die Einweisungspflichten der MPBetreibV und die elektrische Prüfung. Typische Mängel sind beschädigte Netzkabel, eingeklemmte Leitungen und defekte Handschalter – deshalb sind kurze Intervalle und dokumentierte Sichtkontrollen bei jedem Bewohnerwechsel üblich.",
      },
      {
        type: "example",
        title: "Einrichtung mit 120 Plätzen in gemietetem Gebäude",
        text: [
          "Der Träger geht davon aus, dass der Vermieter die Brandmeldeanlage prüfen lässt; der Vermieter nimmt an, die BMA sei als Betriebseinrichtung Sache des Trägers. Bei der Brandschau fehlt der Prüfbericht des Prüfsachverständigen.",
          "Lösung: eine Pflichtenmatrix als Anlage zum Mietvertrag, ein gemeinsames Kataster und ein halbjährlicher Abgleich zwischen Hausleitung und Vermieter.",
        ],
      },
      { type: "h2", text: "Checkliste für die nächste Begehung", id: "checkliste" },
      {
        type: "checklist",
        items: [
          "Prüfberichte der Prüfsachverständigen liegen vollständig und ohne offene Mängel vor",
          "Medizinproduktebuch und Bestandsverzeichnis sind aktuell",
          "Einweisungen des Personals in Medizinprodukte sind dokumentiert",
          "Legionellenbefunde der letzten Untersuchung liegen vor",
          "Hygieneplan ist aktuell und umfasst technische Anlagen",
          "Zuständigkeiten zwischen Träger und Vermieter sind schriftlich geregelt",
        ],
      },
      {
        type: "p",
        text: "Für Kliniken mit höherer Anlagendichte siehe [Betreiberverantwortung im Krankenhaus](/betreiberpflichten/krankenhaeuser).",
      },
      { type: "h2", text: "Prüfungen im laufenden Betrieb", id: "betrieb" },
      {
        type: "p",
        text: "Anders als Schulen haben Pflegeheime keine Ferien. Prüfungen finden im Wohnbereich der Bewohner statt, oft in Zimmern, in denen Menschen schlafen oder gepflegt werden. Das erfordert Abstimmung mit der Pflegedienstleitung: feste Zeitfenster, Rücksicht auf Pflege- und Essenszeiten, Ankündigung bei Bewohnern und Angehörigen. Elektroprüfungen an Pflegebetten lassen sich mit dem Bettentausch bei Bewohnerwechsel oder mit der Reinigung koppeln. Bei Brandmeldeanlagen ist zu klären, wie Probealarme ablaufen, ohne Bewohner zu beunruhigen. Ein Jahresplan mit allen Prüfterminen, abgestimmt mit Hausleitung und Pflegedienstleitung, verhindert, dass Prüfungen an Personalengpässen oder Belegungsspitzen scheitern.",
      },
      {
        type: "table",
        caption: "Beispiel einer Abstimmung zwischen Technik und Pflege",
        head: ["Prüfung", "Zeitfenster", "Abstimmung mit"],
        rows: [
          ["Elektroprüfung Pflegebetten", "beim Bewohnerwechsel bzw. vormittags nach der Grundpflege", "Wohnbereichsleitung"],
          ["Brandmeldeanlage, Probealarm", "angekündigt, außerhalb der Ruhezeiten", "Hausleitung, Bewohner, Angehörige"],
          ["Legionellenprobennahme", "vormittags, Zugang zu Bewohnerbädern", "Wohnbereichsleitung"],
          ["Rufanlage", "zimmerweise, kurzfristig", "Pflegefachkräfte"],
        ],
      },
      { type: "h2", text: "Mehrere Einrichtungen eines Trägers", id: "traeger" },
      {
        type: "p",
        text: "Träger mit mehreren Einrichtungen – Wohlfahrtsverbände, kirchliche und kommunale Träger – profitieren von einem gemeinsamen Kataster und einheitlichen Dienstleisterverträgen. Prüffristen werden zentral festgelegt, die Hausleitungen erhalten einen Fristenplan und berichten über Erledigung und Mängel. So kann die Geschäftsführung ihre Kontrollpflicht wahrnehmen, ohne in jedem Haus selbst nachzufragen.",
      },
      { type: "h2", text: "Häufige Fehler", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Pflegebetten nur als Medizinprodukt betrachtet, Elektroprüfung vergessen",
          "Rufanlage nicht in den Wartungsplan aufgenommen",
          "Legionellenuntersuchung alle drei Jahre statt jährlich",
          "Zuständigkeit zwischen Träger und Vermieter für Brandmeldeanlage ungeklärt",
          "Prüfberichte in der Hausverwaltung, nicht beim Träger",
        ],
      },
      {
        type: "p",
        text: "Der dritte Punkt betrifft die Einstufung: Pflegeeinrichtungen gehören zu den Einrichtungen, für die § 31 Abs. 3 TrinkwV eine Verlängerung des jährlichen Untersuchungsintervalls ausschließt. Wer die Untersuchung im Drei-Jahres-Rhythmus organisiert, weil das bei vermieteten Wohngebäuden so üblich ist, verletzt die Untersuchungspflicht. Der vierte Punkt ist bei angemieteten Gebäuden der häufigste Streitpunkt – er sollte vor Mietbeginn schriftlich geregelt sein.",
      },
      {
        type: "p",
        text: "Für die Heimaufsicht und die Brandverhütungsschau lohnt eine Mappe je Einrichtung, die die aktuellen Nachweise aller sicherheitsrelevanten Prüfungen enthält: Prüfsachverständige, Brandmeldeanlage, Sicherheitsbeleuchtung, Feuerlöscher, Rufanlage, Aufzug, Legionellenbefund und Elektroprüfung. Bei einer Begehung lassen sich Fragen dann ohne Suchaufwand beantworten.",
      },
      { type: "h2", text: "Neue Einrichtungen und Umbauten", id: "neubau" },
      {
        type: "p",
        text: "Bei Neubauten und größeren Umbauten von Pflegeeinrichtungen verlangt das Bauordnungsrecht der Länder Prüfungen der sicherheitstechnischen Anlagen durch Prüfsachverständige vor der Nutzungsaufnahme. Mit der Abnahme beginnen die wiederkehrenden Fristen. Wer die Prüfberichte der Abnahme direkt in das Kataster übernimmt und die Folgetermine festlegt, vermeidet die häufige Lücke in den ersten Betriebsjahren, in denen sich niemand für die Prüftermine zuständig fühlt, weil die Gewährleistung noch läuft. Auch Medizinprodukte und Pflegebetten, die mit dem Neubau beschafft werden, gehören von Beginn an in das Bestandsverzeichnis und den Prüfplan. Bei Trägerwechseln oder der Übernahme bestehender Einrichtungen gilt dasselbe wie bei jeder Objektübernahme: Prüfnachweise, Wartungsverträge und offene Mängel vor dem Übergang anfordern, überfällige Prüfungen sofort nachholen und das Kataster in den ersten Wochen vollständig anlegen. Die Heimaufsicht prüft bei der nächsten Begehung nicht, wer die Lücke verursacht hat, sondern ob sie geschlossen ist. Ein dokumentierter Übernahmeprozess zeigt, dass der neue Träger seine Pflichten ab dem ersten Tag ernst nimmt. Das schafft auch gegenüber Bewohnern und Angehörigen Vertrauen in den Wechsel. Und es entlastet die Hausleitung.",
      },
    ],
    faqs: [
      [
        "Welche Betreiberpflichten hat ein Pflegeheim?",
        "Unter anderem Prüfungen der Brandschutz- und Sicherheitstechnik durch Prüfsachverständige, Wartung der Brandmeldeanlage, Kontrollen und Einweisungen für Medizinprodukte wie Pflegebetten nach MPBetreibV, Wartung der Rufanlage, Legionellenuntersuchungen, ZÜS-Prüfung von Aufzügen und die Hygieneinspektion von Lüftungsanlagen.",
      ],
      [
        "Wie oft müssen Pflegebetten geprüft werden?",
        "Maßgeblich sind die Herstellerangaben und die Gefährdungsbeurteilung. Elektrisch verstellbare Pflegebetten werden als elektrisches Gerät nach DGUV Vorschrift 3 geprüft; zusätzlich gelten die Instandhaltungsvorgaben des Herstellers und die Pflichten der MPBetreibV. Sichtkontrollen bei jedem Bewohnerwechsel sind üblich.",
      ],
      [
        "Wer kontrolliert die Betreiberpflichten in Pflegeheimen?",
        "Die Heimaufsicht nach Landesrecht, das Gesundheitsamt bei Hygiene und Trinkwasser, die Brandschutzdienststelle bei der Brandverhütungsschau sowie die Berufsgenossenschaft im Arbeitsschutz.",
      ],
      [
        "Ist ein Pflegeheim ein Sonderbau?",
        "Ja. Gebäude mit Nutzungseinheiten zur Pflege oder Betreuung von Personen mit Pflegebedürftigkeit sind nach den Landesbauordnungen Sonderbauten. Das führt zu erhöhten Brandschutzanforderungen und Prüfpflichten nach den Prüfverordnungen der Länder.",
      ],
      [
        "Wie lassen sich Prüfungen im Pflegeheim ohne Störung der Bewohner durchführen?",
        "Mit festen Zeitfenstern, die mit der Pflegedienstleitung abgestimmt sind, Ankündigung bei Bewohnern und Angehörigen und der Kopplung an Abläufe wie Bewohnerwechsel oder Reinigung.",
      ],
    ],
    sources: [
    ["MPBetreibV", "§§ 7, 12, 15"],
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
    ["TrinkwV", "§ 31, § 51"],
    ["DGUV V3", "§ 5 mit Durchführungsanweisungen, Tabellen 1A und 1B"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["VDI 6022", "Hygienekontrollen und Hygieneinspektionen"],
    ["ArbStättV", "§ 4 Abs. 3"],
  ],
    related: [
      ["Betreiberverantwortung Krankenhaus", "/betreiberpflichten/krankenhaeuser", "Prüfmanagement für Kliniken und Pflege"],
      ["Lüftung & Klima nach VDI 6022", "/vdi-6022", "Hygieneinspektion"],
      ["Wer haftet bei fehlenden Prüfungen?", "/wissen/haftung-fehlende-pruefungen", "Haftung des Trägers"],
    ],
    cta: "Prüfpflichten Ihrer Einrichtung organisieren lassen.",
  },
  {
    slug: "betreiberpflichten-hausverwaltung",
    keyword: "betreiberpflichten hausverwaltung",
    secondary: ["prüfpflichten weg verwalter"],
    cluster: "Branchen",
    title: "Betreiberpflichten Hausverwaltung – WEG & Mietverwaltung",
    description:
      "Betreiberpflichten für Hausverwaltungen: Wer bei WEG und Mietverwaltung für Prüfungen haftet, welche Pflichten der Verwalter organisiert – mit Checkliste.",
    h1: "Betreiberpflichten für Hausverwaltungen: Rollen, Haftung und Organisation bei WEG und Mietverwaltung",
    kicker: "HAUSVERWALTUNG",
    teaser: "Wer bei WEG und Mietverwaltung für Prüfungen zuständig ist – und wie Verwalter sich absichern.",
    published,
    modified: published,
    lead: [
      "Hausverwaltungen tragen die Betreiberverantwortung nicht selbst – sie liegt bei der Gemeinschaft der Wohnungseigentümer bzw. beim Eigentümer. Der Verwalter organisiert aber die Erfüllung der Pflichten und haftet aus dem Verwaltervertrag, wenn er Prüfungen nicht veranlasst oder Mängel nicht weitergibt. Klare Pflichtenlisten je Objekt schützen beide Seiten.",
    ],
    blocks: [
      { type: "h2", text: "WEG-Verwaltung und Mietverwaltung im Vergleich", id: "vergleich" },
      {
        type: "table",
        head: ["", "WEG-Verwaltung", "Mietverwaltung"],
        rows: [
          ["Betreiber / verkehrssicherungspflichtig", "Gemeinschaft der Wohnungseigentümer (GdWE) für das Gemeinschaftseigentum", "Eigentümer"],
          ["Rolle des Verwalters", "Organ der GdWE (§ 9b WEG), führt Beschlüsse durch und trifft Maßnahmen untergeordneter Bedeutung (§ 27 WEG)", "Beauftragter nach Verwaltervertrag"],
          ["Rechtsgrundlage der Aufgaben", "WEG, Beschlüsse, Verwaltervertrag", "Verwaltervertrag"],
          ["Haftung des Verwalters", "gegenüber der GdWE aus dem Verwaltervertrag", "gegenüber dem Eigentümer aus dem Verwaltervertrag"],
          ["Sondereigentum", "Pflichten der einzelnen Eigentümer bzw. ihrer Mieter", "–"],
        ],
      },
      {
        type: "definition",
        term: "Verkehrssicherungspflicht der GdWE",
        text: "Seit der WEG-Reform 2020 obliegt die Verwaltung des Gemeinschaftseigentums der Gemeinschaft der Wohnungseigentümer (§ 18 Abs. 1 WEG). Sie ist damit für Prüfungen und Verkehrssicherung am Gemeinschaftseigentum verantwortlich und handelt dabei durch den Verwalter.",
      },
      { type: "h2", text: "Typische Pflichten, die der Verwalter organisiert", id: "pflichten" },
      {
        type: "table",
        head: ["Pflicht", "Intervall", "Grundlage"],
        rows: [
          ["Legionellenuntersuchung bei Großanlage", "mindestens alle 3 Jahre", "§ 31 TrinkwV"],
          ["Aufzugsprüfung durch ZÜS", "im Wechsel jährlich", "BetrSichV Anhang 2"],
          ["Rauchwarnmelder (sofern Gemeinschaft zuständig)", "jährlich", "Landesbauordnung, DIN 14676-1"],
          ["Spielplatzinspektion", "wöchentlich bis jährlich", "DIN EN 1176-7"],
          ["Tiefgarage: CO-Warnanlage, Lüftung, Tore", "nach Landesrecht / jährlich", "Prüfverordnung, ASR A1.7"],
          ["Baumkontrolle", "1–3 Jahre", "Verkehrssicherungspflicht"],
          ["Feuerstättenschau, Abgasanlagen", "laut Feuerstättenbescheid", "SchfHwG"],
          ["Winterdienst, Treppenhausbeleuchtung, Wege", "laufend", "§ 823 BGB, Ortssatzung"],
        ],
      },
      { type: "h2", text: "Wie sich Verwalter absichern", id: "absichern" },
      {
        type: "steps",
        items: [
          "**Pflichtenliste je Objekt** bei Übernahme der Verwaltung erstellen und der Gemeinschaft bzw. dem Eigentümer vorlegen.",
          "**Fehlende Prüfungen** sofort melden und – bei der WEG – Beschlussfassung über Beauftragung und Kosten herbeiführen; dringende Maßnahmen nach § 27 WEG selbst veranlassen.",
          "**Delegation an Dienstleister** schriftlich und konkret vereinbaren (Hausmeister, Wartungsfirmen, Winterdienst).",
          "**Fristen überwachen** und Prüfberichte objektbezogen ablegen.",
          "**Mängel weitergeben** und Behebung beschließen bzw. beauftragen lassen – dokumentiert.",
          "**Jahresbericht** zum Prüfstatus in der Eigentümerversammlung oder an den Eigentümer.",
        ],
      },
      {
        type: "example",
        title: "Verwaltungsübernahme einer WEG mit 64 Einheiten",
        text: [
          "Der neue Verwalter erhält vom Vorgänger Ordner ohne Prüfberichte für Aufzug und Warmwasser. Nachfrage beim Wartungsunternehmen ergibt: Die Zwischenprüfung des Aufzugs ist seit vier Monaten überfällig, eine Legionellenuntersuchung wurde nie beauftragt.",
          "Der Verwalter veranlasst die Aufzugsprüfung als dringende Maßnahme, informiert die Eigentümer schriftlich, lässt die Legionellenuntersuchung in der nächsten Versammlung beschließen und legt eine Pflichtenliste als Anlage zum Protokoll an.",
        ],
      },
      { type: "h2", text: "Checkliste bei Verwaltungsübernahme", id: "checkliste" },
      {
        type: "checklist",
        items: [
          "Prüfberichte und Bescheinigungen aller Anlagen des Gemeinschaftseigentums angefordert",
          "Laufende Wartungs- und Dienstleistungsverträge gesichtet",
          "Beschlüsse zu Rauchwarnmeldern, Wartung und Verkehrssicherung geprüft",
          "Offene Mängel und behördliche Auflagen erfasst",
          "Pflichtenliste mit Fristen angelegt und kommuniziert",
        ],
      },
      {
        type: "p",
        text: "Für Verwaltungen mit vielen Objekten übernehmen wir Kataster und Fristenüberwachung als [externer Betreibermanager](/externer-betreibermanager) – die Abstimmung mit Eigentümern bleibt beim Verwalter.",
      },
      { type: "h2", text: "Pflichtenliste im Verwaltervertrag", id: "vertrag" },
      {
        type: "p",
        text: "Der Verwaltervertrag regelt, welche Aufgaben der Verwalter übernimmt und wofür er haftet. Je klarer die Betreiberpflichten darin beschrieben sind, desto geringer ist das Streitrisiko. Bewährt hat sich eine Anlage zum Vertrag, die für jedes Objekt die prüfpflichtigen Anlagen, die Intervalle und die Aufgabe des Verwalters auflistet – etwa „Beauftragung und Überwachung der Legionellenuntersuchung“ oder „Information der Eigentümer über Prüfergebnisse“. Bei Wohnungseigentum sollten Beschlüsse der Eigentümerversammlung die laufenden Prüfungen und ihr Budget abdecken, damit der Verwalter handeln kann, ohne für jede Prüfung einen eigenen Beschluss herbeizuführen.",
      },
      {
        type: "table",
        caption: "Beispiel einer Aufgabenzuordnung in der WEG-Verwaltung",
        head: ["Aufgabe", "Verwalter", "Eigentümergemeinschaft"],
        rows: [
          ["Pflichtenliste je Objekt erstellen und aktuell halten", "ja", "zur Kenntnis"],
          ["Laufende gesetzliche Prüfungen beauftragen", "ja, im Rahmen des Beschlusses", "Beschluss über Budget"],
          ["Mängelbeseitigung bis zu einer Wertgrenze", "ja", "Beschluss über Wertgrenze"],
          ["Größere Sanierungen nach Befund", "vorbereiten, Angebote einholen", "Beschluss"],
          ["Jahresbericht zum Prüfstatus", "ja", "Kenntnisnahme in der Versammlung"],
        ],
      },
      { type: "h2", text: "Viele Objekte, ein System", id: "system" },
      {
        type: "p",
        text: "Hausverwaltungen betreuen oft Dutzende oder Hunderte Objekte mit unterschiedlichen Eigentümern. Ohne einheitliches System entstehen je Objekt eigene Listen, die bei Personalwechsel verloren gehen. Ein zentrales Kataster für alle verwalteten Objekte – mit Anlagen, Fristen, Dienstleistern und Nachweisen – macht die Verwaltung unabhängig von einzelnen Mitarbeitern und erlaubt, Prüfungen über Objekte hinweg zu bündeln. Für die Übergabe an einen neuen Verwalter ist es zugleich die vollständige Dokumentation.",
      },
      { type: "h2", text: "Häufige Fehler in der Verwaltung", id: "fehler" },
      {
        type: "checklist",
        items: [
          "Pflichtenliste existiert nur im Kopf eines Mitarbeiters",
          "Legionellenuntersuchung beschlossen, aber nie beauftragt",
          "Prüfberichte beim Wartungsunternehmen, nicht in der Objektakte",
          "Rauchwarnmelder-Zuständigkeit nicht nach dem jeweiligen Landesrecht geprüft",
          "Spielplatz und Bäume ohne dokumentierte Kontrollen",
        ],
      },
      {
        type: "p",
        text: "Die meisten dieser Fehler haben dieselbe Ursache: Prüfungen werden als Einzelaufträge behandelt statt als wiederkehrende Pflicht mit Frist. Eine Fristenübersicht je Objekt, die bei jeder Objektbesprechung durchgegangen wird, beseitigt die Ursache. Für die Eigentümerversammlung genügt daraus ein kurzer Bericht: welche Prüfungen erfolgt sind, welche Mängel offen sind und welche Beschlüsse für das kommende Jahr nötig werden.",
      },
      {
        type: "p",
        text: "Bei Mietverwaltungen ist der Eigentümer der Ansprechpartner. Auch hier schützt eine schriftliche Information über anstehende Prüfungen und offene Mängel beide Seiten: Der Eigentümer weiß, wofür er Kosten tragen muss, und der Verwalter kann belegen, dass er auf die Pflicht hingewiesen hat.",
      },
      { type: "h2", text: "Übergabe bei Verwalterwechsel", id: "wechsel" },
      {
        type: "p",
        text: "Ein Verwalterwechsel ist der Moment, in dem Prüfnachweise am häufigsten verloren gehen. Der neue Verwalter sollte vom Vorgänger nicht nur Ordner, sondern eine Liste aller prüfpflichtigen Anlagen mit letztem Prüfdatum, nächstem Termin und laufenden Verträgen verlangen. Fehlt sie, ist die Erstellung der Pflichtenliste die erste Aufgabe nach der Übernahme – noch vor der ersten Eigentümerversammlung, damit dort notwendige Beschlüsse gefasst werden können. Überfällige sicherheitsrelevante Prüfungen, etwa an Aufzügen, sollte der Verwalter als dringende Maßnahme sofort veranlassen und die Eigentümer darüber informieren. Die Information sollte schriftlich erfolgen und festhalten, welche Prüfungen fehlten, was veranlasst wurde und welche Kosten entstehen. So ist für alle Beteiligten nachvollziehbar, ab wann der neue Verwalter Verantwortung für die Organisation übernommen hat. Diese Klarheit schützt auch den Verwalter: Lücken aus der Zeit vor der Übernahme sind dokumentiert und nicht ihm anzulasten, solange er nach der Übernahme unverzüglich gehandelt hat. Legen Sie die Information deshalb zur Objektakte und nehmen Sie sie in das Protokoll der nächsten Eigentümerversammlung auf. So ist der Stand für alle Eigentümer dauerhaft nachvollziehbar.",
      },
    ],
    faqs: [
      [
        "Ist die Hausverwaltung für Prüfungen verantwortlich?",
        "Die Verantwortung liegt bei der Gemeinschaft der Wohnungseigentümer bzw. beim Eigentümer. Die Hausverwaltung muss die Erfüllung organisieren: Pflichten kennen, Prüfungen veranlassen oder beschließen lassen und Mängel weitergeben. Verletzt sie diese Pflichten, haftet sie aus dem Verwaltervertrag.",
      ],
      [
        "Darf der WEG-Verwalter Prüfungen ohne Beschluss beauftragen?",
        "Für Maßnahmen untergeordneter Bedeutung, die nicht zu erheblichen Verpflichtungen führen, und für dringende Maßnahmen zur Abwendung eines Nachteils ist der Verwalter nach § 27 WEG berechtigt und verpflichtet. Laufende gesetzliche Prüfungen fallen häufig darunter; der Umfang kann per Beschluss erweitert werden.",
      ],
      [
        "Wer haftet bei einem Unfall im Gemeinschaftseigentum?",
        "Gegenüber dem Geschädigten haftet in erster Linie die Gemeinschaft der Wohnungseigentümer als Verkehrssicherungspflichtige. Hat der Verwalter seine Pflichten verletzt, kann die Gemeinschaft ihn in Regress nehmen.",
      ],
      [
        "Welche Prüfungen fallen in einer WEG an?",
        "Je nach Ausstattung Legionellenuntersuchung, Aufzugsprüfung, Rauchwarnmelder-Wartung, Spielplatzinspektion, Prüfungen in Tiefgaragen, Baumkontrolle, Feuerstättenschau sowie die laufende Verkehrssicherung von Wegen und Treppenhäusern.",
      ],
      [
        "Sollten Betreiberpflichten im Verwaltervertrag geregelt sein?",
        "Ja. Eine Anlage mit den prüfpflichtigen Anlagen je Objekt und den Aufgaben des Verwalters schafft Klarheit über Zuständigkeit und Haftung und erleichtert die Übergabe bei einem Verwalterwechsel.",
      ],
    ],
    sources: [
    ["BGB", "§§ 823, 831, 836"],
    ["TrinkwV", "§ 31, § 51"],
    ["BetrSichV", "§ 3 Abs. 6, § 14, Anhang 2"],
    ["DIN 14676", "Inspektion und Wartung"],
    ["DIN EN 1176", "Inspektion und Wartung"],
    ["PrüfVO", "wiederkehrende Prüfungen sicherheitstechnischer Anlagen"],
  ],
    related: [
      ["Prüfpflichten im Wohnungsbestand", "/wissen/pruefpflichten-wohnungsbestand", "Checkliste je Gebäudeart"],
      ["Betreiberpflichten Wohnungsunternehmen", "/betreiberpflichten/wohnungsunternehmen", "Für Bestandshalter"],
      ["Externer Betreibermanager", "/externer-betreibermanager", "Fristenüberwachung für Verwaltungen"],
    ],
    cta: "Prüfstatus Ihrer verwalteten Objekte klären.",
  },
];
