import ContentBlocks, { RelatedLinks, SourceList } from "./ContentBlocks";
import FaqList from "./FaqList";
import { ArrowUpRight, Check } from "./icons";
import JsonLd, { faqSchema, serviceSchema } from "./JsonLd";
import { CoordinationNote, InquirySection, LegalNotice } from "./PageParts";
import { PageIntro } from "./Subpage";
import { btnPrimary } from "./ui";
import type { ServicePage } from "@/lib/pages";

/**
 * Leistungsseite, Städte-Seite oder Zielgruppen-Landingpage:
 * direkte Antwort → Inhalt → FAQ → Koordination → Formular „Bestandsaufnahme anfragen“ → Quellen und Hinweise.
 */
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
            Bestandsaufnahme anfragen <ArrowUpRight />
          </a>
        </div>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <ContentBlocks blocks={page.blocks} />
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

      <CoordinationNote />
      <InquirySection title={page.cta} source={path} />

      <section className="section page-width section-tight">
        <h2>Quellen</h2>
        <SourceList sources={page.sources} />
        <LegalNotice />
      </section>
    </>
  );
}
