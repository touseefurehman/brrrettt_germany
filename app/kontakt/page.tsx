import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageIntro } from "@/components/Subpage";
import { emailLink, fullCompanyName, phoneLink, site } from "@/lib/site";

const title = "Kontakt – Beratung zu Betreiberpflichten";
const description =
  "Beschreiben Sie Ihre Anlagen und Ihren aktuellen Prüfstatus. Wir melden uns innerhalb eines Werktags – vertraulich und unverbindlich.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kontakt" },
  openGraph: { url: "/kontakt", title, description },
};

export default function KontaktPage() {
  return (
    <>
      <PageIntro crumbs={[["Kontakt", "/kontakt"]]} kicker="KONTAKT" title="Beratung zu Betreiberpflichten anfragen">
        <p>
          Beschreiben Sie Ihre Standorte, Anlagen und den aktuellen Prüfstatus. {site.responseTime} – vertraulich
          und unverbindlich. Das Erstgespräch ist kostenfrei.
        </p>
      </PageIntro>
      <section className="section page-width contact-grid">
        <div>
          <h2>Direkter Kontakt</h2>
          <address className="contact-details">
            <strong>{fullCompanyName}</strong>
            <span>
              {site.street}, {site.postalCode} {site.city}
            </span>
            <a href={phoneLink}>Telefon {site.phoneDisplay}</a>
            <a href={emailLink}>{site.email}</a>
          </address>
          <p className="muted-note">Eine Vertraulichkeitsvereinbarung ist auf Anfrage möglich.</p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
