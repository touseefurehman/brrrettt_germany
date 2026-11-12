import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import JsonLd, { editorialArticleSchema, faqSchema } from "./JsonLd";
import { rich } from "./ContentBlocks";
import { LegalNotice } from "./PageParts";
import { CtaBand, PageIntro } from "./Subpage";
import {
  type ExpansionBlock,
  expansionFor,
  expansionText,
  legalBasisParts,
  modifiedFor,
  parseExpansion,
  PUBLISHED_DATE,
  type Partner,
} from "@/lib/elektropruefung";
import { site } from "@/lib/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const paragraphs = (text: string) => text.split(/\n\s*\n/).filter((p) => p.trim());

const isQuestion = (heading: string) => heading.trim().endsWith("?");

function ExpansionBlocks({ blocks }: { blocks: ExpansionBlock[] }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "p":
        return <p key={i}>{rich(block.text)}</p>;
      case "ul":
      case "ol": {
        const List = block.type;
        return (
          <List key={i} className="qa-list">
            {block.items.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </List>
        );
      }
      case "table":
        return (
          // Auf schmalen Bildschirmen horizontal scrollbar (.table-wrap)
          <div key={i} className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map(([first, ...rest]) => (
                  <tr key={first}>
                    <th scope="row">{rich(first)}</th>
                    {rest.map((cell, j) => (
                      <td key={j}>{rich(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  });
}

export type QaLink = [title: string, path: string, note: string];

/**
 * Frage-Antwort-Seite (Antwortseite unter /elektropruefung-dguv-v3 oder Wissensseite unter /wissen/elektropruefung):
 * H1 = Frage → Kurzantwort (erster Absatz, wird von KI-Suchen zitiert) → Einordnung der Redaktion →
 * Rechtsgrundlagen → ggf. Anzeige → verwandte Fragen → Autorenbox.
 */
export default function ElektroQaView({
  item,
  path,
  crumbs,
  kicker,
  description,
  partner,
  children,
}: {
  item: { slug: string; question: string; shortAnswer: string; expertText: string; legalBasis: string };
  path: string;
  crumbs: [name: string, path: string][];
  kicker: string;
  description: string;
  partner?: Partner | null;
  /** Abschnitte mit weiterführenden Links */
  children: ReactNode;
}) {
  const modified = modifiedFor(item.slug);
  // Zusatzabschnitte: als Frage formulierte Überschriften gehen ins FAQPage-Schema, die übrigen in den Article-Text
  const sections = expansionFor(item.slug);
  const faqSections = sections.filter((s) => isQuestion(s.heading));
  const bodySections = sections.filter((s) => !isQuestion(s.heading));

  return (
    <>
      <JsonLd
        data={faqSchema([
          [item.question, `${item.shortAnswer} ${item.expertText}`],
          ...faqSections.map((s): [string, string] => [s.heading, expansionText(s.content)]),
        ])}
      />
      <JsonLd
        data={editorialArticleSchema({
          title: item.question,
          description,
          path,
          published: PUBLISHED_DATE,
          modified,
          ...(bodySections.length > 0 && {
            body: [
              item.shortAnswer,
              item.expertText,
              ...bodySections.map((s) => `${s.heading}. ${expansionText(s.content)}`),
            ].join("\n\n"),
          }),
        })}
      />
      <PageIntro crumbs={crumbs} kicker={kicker} title={item.question}>
        <div className="short-answer">
          <span className="short-answer-label">Kurzantwort</span>
          <p>{item.shortAnswer}</p>
        </div>
      </PageIntro>

      <section className="section page-width section-tight prose">
        <h2>Einordnung der Redaktion</h2>
        {paragraphs(item.expertText).map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        {sections.map((s) => (
          <Fragment key={s.heading}>
            <h2>{s.heading}</h2>
            <ExpansionBlocks blocks={parseExpansion(s.content)} />
          </Fragment>
        ))}
      </section>

      <section className="section page-width section-tight prose">
        <h2>Rechtsgrundlagen</h2>
        <p className="legal-basis">
          {legalBasisParts(item.legalBasis).map((part, i) =>
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

      {partner && (
        // Bezahlte Partnernennung – nach § 5a UWG deutlich als Anzeige gekennzeichnet
        <section className="section page-width section-tight">
          <aside className="partner-box" aria-label="Anzeige">
            <span className="partner-label">Anzeige</span>
            <strong>{partner.name}</strong>
            {partner.text.trim() && <p>{partner.text}</p>}
            {partner.url.trim() && (
              <a href={partner.url} rel="sponsored noopener">
                Zum Anbieter
              </a>
            )}
          </aside>
        </section>
      )}

      {children}

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Zuletzt aktualisiert: <time dateTime={modified}>{formatDate(modified)}</time>
          </span>
        </aside>
      </section>

      <CtaBand title="Elektroprüfung für alle Standorte organisieren lassen." />
    </>
  );
}

/** Linkkarten wie im übrigen Wissensbereich */
export function QaLinks({ title, links }: { title: string; links: QaLink[] }) {
  if (links.length === 0) return null;
  return (
    <section className="section page-width section-tight">
      <h2>{title}</h2>
      <div className="link-cards three">
        {links.map(([label, href, note]) => (
          <Link key={href} href={href}>
            <strong>{label}</strong>
            <span>{note}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
