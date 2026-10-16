import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import ContactForm from "@/components/ContactForm";
import { PageIntro } from "@/components/Subpage";
import { site } from "@/lib/site";

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
          <ContactDetails />
          <p className="muted-note">Eine Vertraulichkeitsvereinbarung ist auf Anfrage möglich.</p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
