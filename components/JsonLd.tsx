import type { FaqEntry } from "@/lib/content";
import { isSet, site } from "@/lib/site";

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
    areaServed: { "@type": "Country", name: "Deutschland" },
    knowsAbout: [
      "Betreiberpflichten",
      "Betriebssicherheitsverordnung",
      "DGUV Vorschrift 3",
      "VDI 6022",
      "GEFMA 190",
      "Prüffristen technischer Anlagen",
    ],
    ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
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

export function serviceSchema(serviceType: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
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
