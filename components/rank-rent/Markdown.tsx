import Link from "next/link";
import { Fragment } from "react";
import { type Inline, parseMarkdown } from "@/lib/rank-rent";

function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((it, i) => {
        if (it.kind === "bold") return <strong key={i}>{it.text}</strong>;
        if (it.kind === "link") {
          return it.href.startsWith("/") ? (
            <Link key={i} href={it.href}>
              {it.text}
            </Link>
          ) : (
            <a key={i} href={it.href} rel="noopener">
              {it.text}
            </a>
          );
        }
        return <Fragment key={i}>{it.text}</Fragment>;
      })}
    </>
  );
}

/** Rendert die Markdown-Teilmenge aus den Landingpage-Daten als React-Knoten (kein rohes HTML). Tabellen scrollen waagerecht. */
export default function Markdown({ source }: { source: string }) {
  return (
    <>
      {parseMarkdown(source).map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inlines items={b.inline} />
              </p>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Inlines items={b.inline} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inlines items={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="table-wrap" tabIndex={0} role="region" aria-label="Tabelle, waagerecht scrollbar">
                <table className="data-table">
                  <thead>
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j} scope="col">
                          <Inlines items={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((c, k) => (
                          <td key={k}>
                            <Inlines items={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
