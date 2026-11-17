import Link from "next/link";
import FaqList from "../FaqList";
import JsonLd, { editorialArticleSchema, faqSchema } from "../JsonLd";
import { LegalNotice } from "../PageParts";
import { PageIntro } from "../Subpage";
import LeadForm from "./LeadForm";
import Markdown from "./Markdown";
import PartnerBox from "./PartnerBox";
import {
  activePartner,
  bereichBySlug,
  BASE_NAME,
  BASE_PATH,
  formatDate,
  isDraft,
  landingPath,
  legalBasisParts,
  markdownToText,
  objektBySlug,
  objektPath,
  relatedLandings,
  type Landingpage,
  type Objekt,
  type Pruefbereich,
} from "@/lib/rank-rent";
import { site } from "@/lib/site";

function RelatedLinks({ title, items }: { title: string; items: { label: string; href: string; note: string }[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <h3>{title}</h3>
      <div className="link-cards three">
        {items.map((i) => (
          <Link key={i.href} href={i.href}>
            <strong>{i.label}</strong>
            <span>{i.note}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

/** Landingpage Objekt × Prüfbereich (Aufbau siehe content/rank-rent/README.md) */
export default function LandingView({
  page,
  objekt,
  bereich,
}: {
  page: Landingpage;
  objekt: Objekt;
  bereich: Pruefbereich;
}) {
  const path = landingPath(page);
  const topic = `${bereich.name} für ${objekt.name}`;
  const partner = activePartner(page.partnerSlotId);
  const { sameArea, sameObject } = relatedLandings(page);
  const bereichName = (slug: string) => bereichBySlug(slug)?.name ?? "";
  const bodyText = [page.shortAnswer, ...page.sections.map((s) => `${s.heading}. ${markdownToText(s.content)}`)].join("\n\n");

  return (
    <>
      <JsonLd data={faqSchema(page.faq.map((f): [string, string] => [f.question, f.answer]))} />
      <JsonLd
        data={editorialArticleSchema({
          title: page.h1,
          description: page.metaDescription,
          path,
          published: page.published,
          modified: page.updated,
          body: bodyText,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.h1,
          serviceType: bereich.name,
          url: `${site.url}${path}`,
          description: page.metaDescription,
          areaServed: "DE",
          audience: { "@type": "BusinessAudience", name: objekt.name },
          provider: { "@id": `${site.url}/#organization` },
        }}
      />

      <PageIntro
        crumbs={[
          [BASE_NAME, BASE_PATH],
          [objekt.name, objektPath(objekt)],
          [bereich.name, path],
        ]}
        kicker={`${objekt.name.toUpperCase()} · ${bereich.name.toUpperCase()}`}
        title={page.h1}
      >
        {isDraft(page) && (
          <p className="rr-draft-note" role="note">
            ENTWURF – nur lokal sichtbar, nicht indexiert.
          </p>
        )}
        <p>{page.heroText}</p>
        <p>
          <a href="#anfrage" className="rr-btn">
            Jetzt geprüften Prüfpartner anfragen
          </a>
        </p>
      </PageIntro>

      <section className="section page-width section-tight">
        <div className="short-answer">
          <span className="short-answer-label">Kurzantwort</span>
          <p>{page.shortAnswer}</p>
        </div>
      </section>

      <section className="section page-width section-tight">
        <PartnerBox slotId={page.partnerSlotId} bereichName={bereich.name} objektName={objekt.name} />
      </section>

      <section className="section page-width section-tight prose">
        {page.sections.map((s) => (
          <div key={s.heading}>
            <h2>{s.heading}</h2>
            <Markdown source={s.content} />
          </div>
        ))}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Rechtsgrundlagen</h2>
        <p className="legal-basis">
          {legalBasisParts(page.legalBasis).map((part, i) =>
            part.url ? (
              <a key={i} href={part.url} rel="noopener">
                {part.text}
              </a>
            ) : (
              part.text
            ),
          )}
        </p>
        <LegalNotice />
      </section>

      {page.costRange && (
        <section className="section page-width section-tight prose">
          <h2>Typische Kosten</h2>
          <p>
            <strong>{page.costRange.text}</strong>
          </p>
          {page.costRange.note && <p>{page.costRange.note}</p>}
        </section>
      )}

      <section id="anfrage" className="section page-width section-tight">
        <h2>Angebot anfragen</h2>
        <LeadForm
          objekt={objekt.slug}
          seite={page.slug}
          fields={bereich.formFields}
          topic={topic}
          partnerName={partner?.name}
        />
      </section>

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <FaqList faqs={page.faq.map((f): [string, string] => [f.question, f.answer])} />
      </section>

      {(sameArea.length > 0 || sameObject.length > 0) && (
        <section className="section page-width section-tight">
          <h2>Weitere Prüfpflichten</h2>
          <RelatedLinks
            title={`${bereich.name} für andere Objekte`}
            items={sameArea.map((l) => ({
              label: l.h1,
              href: landingPath(l),
              note: objektBySlug(l.objekt)?.name ?? "",
            }))}
          />
          <RelatedLinks
            title={`Weitere Prüfungen für ${objekt.name}`}
            items={sameObject.map((l) => ({ label: l.h1, href: landingPath(l), note: bereichName(l.pruefbereich) }))}
          />
        </section>
      )}

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Zuletzt aktualisiert: <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </span>
        </aside>
      </section>
    </>
  );
}
