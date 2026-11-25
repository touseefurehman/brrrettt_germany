import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import JsonLd from "./JsonLd";
import { PageIntro } from "./Subpage";
import { LegalNotice } from "./PageParts";
import { b2bAll, b2bPublished } from "@/lib/b2b";
import { b2bSchemas, crumbsFor } from "@/lib/b2b-schema";
import { MARKER, type B2bPage } from "@/lib/b2b-core";
import { formatDate, parseMarkdown, type Inline } from "@/lib/rank-rent";
import { site } from "@/lib/site";

// Seitenaufbau (Reihenfolge verbindlich, siehe SECTION_ORDER in lib/b2b-core.ts):
// H1 + Kurzantwort → 2–8 Abschnitte (Zielgruppe … Kosten) → FAQ → Quellen → Anfrage-CTA.
// In der Vorschau (`preview`) werden [PRÜFEN: …]-Marker gelb hinterlegt und ein Entwurfsbanner angezeigt.

/** Zerlegt Text an [PRÜFEN …]-Markern; im Vorschaumodus gelb hervorgehoben, sonst unverändert */
function Marked({ text, preview }: { text: string; preview: boolean }): ReactNode {
  if (!preview) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(MARKER)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <mark key={m.index} style={{ background: "#fde047", color: "#1c1917", padding: "0 3px", borderRadius: 3 }}>
        {m[0]}
      </mark>,
    );
    last = m.index + m[0].length;
  }
  if (parts.length === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

function Inlines({ items, preview }: { items: Inline[]; preview: boolean }) {
  return (
    <>
      {items.map((it, i) => {
        if (it.kind === "bold")
          return (
            <strong key={i}>
              <Marked text={it.text} preview={preview} />
            </strong>
          );
        if (it.kind === "link")
          return it.href.startsWith("/") ? (
            <Link key={i} href={it.href}>
              {it.text}
            </Link>
          ) : (
            <a key={i} href={it.href} rel="noopener">
              {it.text}
            </a>
          );
        return <Marked key={i} text={it.text} preview={preview} />;
      })}
    </>
  );
}

function Md({ source, preview }: { source: string; preview: boolean }) {
  return (
    <>
      {parseMarkdown(source).map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inlines items={b.inline} preview={preview} />
              </p>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Inlines items={b.inline} preview={preview} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inlines items={item} preview={preview} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return null; // Tabellen stehen strukturiert in `tables`
        }
      })}
    </>
  );
}

function DataTable({ table, preview }: { table: B2bPage["tables"][number]; preview: boolean }) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={`${table.caption} (waagerecht scrollbar)`}>
      <table className="data-table">
        <caption>{table.caption}</caption>
        <thead>
          <tr>
            {table.head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    <Marked text={cell} preview={preview} />
                  </th>
                ) : (
                  <td key={j}>
                    <Marked text={cell} preview={preview} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function B2bPageView({ page, preview = false }: { page: B2bPage; preview?: boolean }) {
  const crumbs = crumbsFor(page, b2bAll);
  const draft = page.status !== "published";
  const contactHref = `/kontakt?thema=${encodeURIComponent(page.ctaTopic)}`;
  return (
    <>
      {/* Die BreadcrumbList erzeugt PageIntro aus denselben crumbs (crumbsFor); hier nur die übrigen Typen */}
      {b2bSchemas(page, b2bAll, site.url)
        .filter((node) => node["@type"] !== "BreadcrumbList")
        .map((node, i) => (
          <JsonLd key={i} data={node} />
        ))}

      {preview && draft && (
        <div
          role="note"
          style={{
            background: "#b91c1c",
            color: "#fff",
            textAlign: "center",
            padding: "10px 16px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          ENTWURF – nicht veröffentlicht <span style={{ fontWeight: 400 }}>· Status: {page.status} · noindex</span>
        </div>
      )}

      {/* Kurzantwort: eigenständiger Absatz direkt unter der H1 (40–60 Wörter), kein Kasten, nicht eingeklappt */}
      <PageIntro crumbs={crumbs} kicker={`PRÜFMANAGEMENT · ${page.objekt.toUpperCase()}`} title={<Marked text={page.h1} preview={preview} />}>
        <p className="b2b-kurzantwort">
          <Marked text={page.kurzantwort} preview={preview} />
        </p>
        <p>
          <a href="#anfrage" className="rr-btn">
            B2B-Anfrage stellen
          </a>
        </p>
      </PageIntro>

      {page.sections.map((s) => (
        <section key={s.id} id={s.id} className="section page-width section-tight prose">
          <h2>{s.heading}</h2>
          <Md source={s.content} preview={preview} />
          {s.table !== undefined && <DataTable table={page.tables[s.table]} preview={preview} />}
          {s.id === "fristen" && <LegalNotice />}
        </section>
      ))}

      <section className="section page-width section-tight">
        <h2>Häufige Fragen</h2>
        <div className="faq-list">
          {page.faq.map((f, i) => (
            <details key={f.question} className="faq-item" open={i === 0}>
              <summary className="faq-trigger">
                <h3>
                  <Marked text={f.question} preview={preview} />
                </h3>
              </summary>
              <p className="faq-answer">
                <Marked text={f.answer} preview={preview} />
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="section page-width section-tight prose" id="quellen">
        <h2>Quellen</h2>
        <ul>
          {page.sources.map((s) => (
            <li key={s.url + s.label}>
              <a href={s.url} rel="noopener">
                {s.label}
              </a>
              {s.note ? ` – ${s.note}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="section page-width section-tight">
        <h2>Weiterführende Seiten</h2>
        <div className="link-cards three">
          {/* Links auf noch nicht veröffentlichte B2B-Seiten bleiben in den Daten, werden aber nicht ausgegeben */}
          {page.internalLinks
            .filter((l) => !l.href.startsWith("/pruefmanagement/") || b2bPublished.some((x) => x.url === l.href))
            .map((l) => (
            <Link key={l.href} href={l.href}>
              <strong>{l.label}</strong>
              <span>{l.note}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="anfrage" className="section page-width section-tight prose">
        <h2>B2B-Anfrage: {page.ctaTopic}</h2>
        <p>
          Beschreiben Sie Ihre Standorte, Anlagen und den aktuellen Prüfstatus. Das Anfrageformular ist mit dem Thema
          „{page.ctaTopic}“ vorbelegt. {site.responseTime}.
        </p>
        <p>
          <Link href={contactHref} className="rr-btn">
            Zum Anfrageformular
          </Link>
        </p>
      </section>

      <section className="section page-width section-tight">
        <aside className="author-box">
          <strong>Redaktion {site.domain}</strong>
          <span>
            Zuletzt inhaltlich geprüft: <time dateTime={page.lastReviewed}>{formatDate(page.lastReviewed)}</time>
            {page.reviewedBy ? ` · Fachliche Prüfung: ${page.reviewedBy}` : ""}
          </span>
        </aside>
      </section>
    </>
  );
}

