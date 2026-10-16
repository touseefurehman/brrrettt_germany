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
  /** Bundesland des Firmensitzes, z. B. "Hamburg" – bestimmt die Aufsichtsbehörde in der Datenschutzerklärung */
  state: "[Bundesland]",
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

export const fullCompanyName = isSet(site.companyName)
  ? `${site.companyName}${isSet(site.legalForm) ? ` ${site.legalForm}` : ""}`
  : site.domain;
export const hasPhone = isSet(site.phoneDisplay) && isSet(site.phoneHref);
export const hasAddress = [site.street, site.postalCode, site.city].every(isSet);
export const addressLine = `${site.street}, ${site.postalCode} ${site.city}`;

/**
 * Erst wenn Firma, Anschrift und Telefon eingetragen sind, wird die Seite indexiert.
 * Bis dahin: noindex, und Platzhalter werden im Frontend nicht ausgegeben –
 * eine Seite mit „[Firmenname]“ schadet mehr als eine nicht indexierte.
 */
export const launchReady = isSet(site.companyName) && hasAddress && hasPhone;
export const phoneLink = `tel:${site.phoneHref}`;
export const emailLink = `mailto:${site.email}`;
