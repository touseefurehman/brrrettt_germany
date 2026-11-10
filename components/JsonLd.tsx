import { type Author, authorPath } from "@/lib/autoren";
import type { FaqEntry } from "@/lib/content";
import { company, isSet, site } from "@/lib/site";

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // `<` escapen, damit Inhalte das Script-Tag nicht schließen können
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = `${site.url}/#organization`;

/** Platzhalter ("[…]") werden weggelassen, damit kein unfertiges Markup ausgeliefert wird. */
export function organizationSchema() {
  const address = {
    "@type": "PostalAddress",
    ...(isSet(site.street) && { streetAddress: site.street }),
    ...(isSet(site.postalCode) && { postalCode: site.postalCode }),
    ...(isSet(site.city) && { addressLocality: site.city }),
    addressCountry: "DE",
  };
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": orgId,
    name: isSet(site.companyName) ? `${site.companyName} ${isSet(site.legalForm) ? site.legalForm : ""}`.trim() : site.domain,
    alternateName: site.domain,
    url: `${site.url}/`,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/assets/industrial-building.jpg`,
    description:
      "Koordination von Betreiberpflichten: Pflichtenermittlung, Prüforganisation und Nachweisführung für technische Anlagen und Gebäude.",
    ...(isSet(site.phoneHref) && { telephone: site.phoneHref }),
    email: site.email,
    address,
    ...(isSet(site.companyName) && isSet(site.legalForm) && { legalName: `${site.companyName} ${site.legalForm}` }),
    ...(isSet(company.foundingYear) && { foundingDate: company.foundingYear }),
    ...(isSet(site.vatId) && { vatID: site.vatId }),
    ...(company.memberships.length > 0 && {
      memberOf: company.memberships.map((name) => ({ "@type": "Organization", name })),
    }),
    areaServed: { "@type": "Country", name: "Deutschland" },
    knowsAbout: [
      "Betreiberpflichten",
      "Betriebssicherheitsverordnung",
      "DGUV Vorschrift 3",
      "VDI 6022",
      "GEFMA 190",
      "TRBS 1203",
      "Arbeitsstättenverordnung",
      "Betreiberpflichtenkataster",
      "Prüffristen technischer Anlagen",
    ],
    ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.domain,
    inLanguage: "de-DE",
    publisher: { "@id": orgId },
  };
}

export function faqSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceSchema(serviceType: string, description: string, path: string, audience?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceType,
    serviceType,
    ...(audience && { audience: { "@type": "BusinessAudience", name: audience } }),
    url: `${site.url}${path}`,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Deutschland" },
    description,
  };
}

export function breadcrumbSchema(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Startseite", "/"] as [string, string], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site.url}${path}`,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  about: string[];
  author?: Author;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${site.url}${a.path}`,
    mainEntityOfPage: `${site.url}${a.path}`,
    datePublished: a.published,
    dateModified: a.modified,
    inLanguage: "de-DE",
    image: `${site.url}/opengraph-image`,
    // Ohne eingetragenen Autor bleibt die Organisation Autorin
    author: a.author ? { "@id": personId(a.author) } : { "@id": orgId },
    publisher: { "@id": orgId },
    isPartOf: { "@id": `${site.url}/#website` },
    about: a.about.map((name) => ({ "@type": "Thing", name })),
  };
}

/** Frage-Antwort-Seiten (Elektroprüfung DGUV V3): Autorin ist die Redaktion als Organisation, nicht eine Person. */
export function editorialArticleSchema(a: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${site.url}${a.path}`,
    mainEntityOfPage: `${site.url}${a.path}`,
    datePublished: a.published,
    dateModified: a.modified,
    inLanguage: "de-DE",
    image: `${site.url}/opengraph-image`,
    author: { "@type": "Organization", name: `Redaktion ${site.domain}`, url: `${site.url}/` },
    publisher: { "@id": orgId },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

const personId = (a: Author) => `${site.url}${authorPath(a)}#person`;

/** Vollständiges Person-Objekt auf der Autorenseite; Artikel verweisen per @id darauf. */
export function personSchema(a: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(a),
    name: a.name,
    url: `${site.url}${authorPath(a)}`,
    ...(isSet(a.role) && { jobTitle: a.role }),
    ...(a.photo && { image: `${site.url}${a.photo}` }),
    ...(isSet(a.bio) && { description: a.bio }),
    knowsAbout: a.expertise,
    ...(a.qualifications.length > 0 && {
      hasCredential: a.qualifications.map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
    }),
    worksFor: { "@id": orgId },
    ...(a.sameAs && a.sameAs.length > 0 && { sameAs: a.sameAs }),
  };
}
