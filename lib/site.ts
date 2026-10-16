// Zentrale Firmendaten. Alles in eckigen Klammern muss vor dem Launch ersetzt werden –
// diese Angaben erscheinen in Header, Footer, Kontakt, Impressum, Datenschutz und im JSON-LD.
// Schreibweise überall identisch halten (NAP-Konsistenz mit Google Business Profile & Verzeichnissen).

export const site = {
  url: "https://www.betreibermanager.de",
  domain: "betreibermanager.de",
  companyName: "[Firmenname]",
  legalForm: "[Rechtsform]",
  street: "[Straße und Hausnummer]",
  postalCode: "[PLZ]",
  city: "[Ort]",
  phoneDisplay: "[Telefonnummer]",
  /** E.164 ohne Leerzeichen, z. B. +494012345678 */
  phoneHref: "[+49…]",
  email: "kontakt@betreibermanager.de",
  region: "[Region]",
  representative: "[Vertretungsberechtigte Person]",
  registerCourt: "[Registergericht]",
  registerNumber: "[HRB-Nummer]",
  vatId: "[USt-IdNr.]",
  contactPerson: "[Name]",
  contactPersonRole: "[Qualifikation / Funktion]",
  responseTime: "Antwort innerhalb eines Werktags",
  /** URLs von Google Business Profile, LinkedIn, wlw etc., sobald vorhanden */
  sameAs: [] as string[],
};

/** true, sobald ein Platzhalter durch echte Daten ersetzt wurde */
export const isSet = (value: string) => value.trim() !== "" && !value.trim().startsWith("[");

export const fullCompanyName = `${site.companyName} ${site.legalForm}`;
export const phoneLink = `tel:${site.phoneHref}`;
export const emailLink = `mailto:${site.email}`;
