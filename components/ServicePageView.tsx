import Link from "next/link";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import ContentBlocks, { NormList, RelatedLinks } from "./ContentBlocks";
import FaqList from "./FaqList";
import { ArrowUpRight, Check, ShieldCheck } from "./icons";
import JsonLd, { faqSchema, serviceSchema } from "./JsonLd";
import { PageIntro } from "./Subpage";
import { btnPrimary } from "./ui";
import type { ServicePage } from "@/lib/pages";

/** Landingpage für Leistung oder Zielgruppe: Inhalt, Regelwerke, FAQ, Fachartikel, Anfrageformular. */
export default function ServicePageView({
  page,
  path,
  crumbs,
}: {
  page: ServicePage;
  path: string;
  crumbs: [name: string, path: string][];
}) {
  return (
    <>
      <JsonLd data={serviceSchema(page.serviceType, page.description, path, page.name)} />
      <JsonLd data={faqSchema(page.faqs)} />
      <PageIntro crumbs={crumbs} kicker={page.kicker} title={page.h1}>
        {page.lead.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        <ul className="intro-highlights">
          {page.highlights.map((h) => (
            <li key={h}>
              <Check size={15} /> {h}
            </li>
          ))}
        </ul>
        <div>
          <a href="#anfrage" className={btnPrimary}>
            Unverbindlich anfragen <ArrowUpRight />
          </a>
        </div>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <ContentBlocks blocks={page.blocks} />
      </section>

      <section className="section page-width section-tight">
        <h2>Rechtsgrundlagen und Regelwerke</h2>
        <NormList keys={page.norms} />
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={page.faqs} />
      </section>

      {page.related.length > 0 && (
        <section className="section page-width section-tight">
          <h2>Weiterführend</h2>
          <RelatedLinks links={page.related} />
        </section>
      )}

      <section id="anfrage" className="section page-width contact-grid">
        <div>
          <div className="section-label">ANFRAGE</div>
          <h2>{page.cta}</h2>
          <p>
            Beschreiben Sie Ihre Liegenschaften, Anlagen und den aktuellen Prüfstatus. Wir melden uns mit einem Vorschlag
            für die nächsten Schritte – als Einstieg auch mit einer Bestandsaufnahme für einen Standort.{" "}
            <Link href="/externer-betreibermanager">So arbeiten wir</Link>
          </p>
          <ContactDetails />
          <div className="contact-assurance">
            <ShieldCheck size={22} />
            <div>
              Vertraulich. Persönlich. Unverbindlich.
              <small>Das Erstgespräch ist kostenfrei.</small>
            </div>
          </div>
        </div>
        <ContactForm source={path} />
      </section>
    </>
  );
}
