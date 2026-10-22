import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Check } from "./icons";
import type { Block } from "@/lib/pages";
import { norms, type NormKey } from "@/lib/normen";

const inline = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** **fett** und [Text](/pfad) – interne Pfade werden zu <Link>, externe zu <a>. */
export function rich(text: string): ReactNode {
  return text.split(inline).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} rel="noopener">
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "h2":
        return (
          <h2 key={i} id={block.id}>
            {block.text}
          </h2>
        );
      case "p":
        return <p key={i}>{rich(block.text)}</p>;
      case "definition":
        return (
          <dl key={i} className="definition">
            <dt>{block.term}</dt>
            <dd>{rich(block.text)}</dd>
          </dl>
        );
      case "table":
        return (
          <div key={i} className="table-wrap">
            <table className="data-table">
              {block.caption && <caption>{block.caption}</caption>}
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
                  <tr key={first + rest[0]}>
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
      case "checklist":
        return (
          <ul key={i} className="check-list">
            {block.items.map((item) => (
              <li key={item}>
                <Check size={15} /> <span>{rich(item)}</span>
              </li>
            ))}
          </ul>
        );
      case "steps":
        return (
          <ol key={i} className="task-list">
            {block.items.map((item) => (
              <li key={item}>
                <span>{rich(item)}</span>
              </li>
            ))}
          </ol>
        );
      case "example":
        return (
          <aside key={i} className="example-box">
            <strong>Praxisbeispiel: {block.title}</strong>
            {block.text.map((t) => (
              <p key={t.slice(0, 40)}>{rich(t)}</p>
            ))}
          </aside>
        );
      case "note":
        return (
          <p key={i} className="muted-note">
            {rich(block.text)}
          </p>
        );
    }
  });
}

export function NormList({ keys }: { keys: NormKey[] }) {
  return (
    <dl className="norm-list">
      {keys.map((key) => {
        const { name, title, text, url } = norms[key];
        return (
          <div key={key}>
            <dt>
              {url ? (
                <a href={url} rel="noopener">
                  {name}
                </a>
              ) : (
                name
              )}
              <small>{title}</small>
            </dt>
            <dd>{text}</dd>
          </div>
        );
      })}
    </dl>
  );
}

export function RelatedLinks({ links }: { links: [title: string, path: string, note: string][] }) {
  return (
    <div className="link-cards">
      {links.map(([title, path, note]) => (
        <Link key={path} href={path}>
          <strong>{title}</strong>
          <span>{note}</span>
        </Link>
      ))}
    </div>
  );
}
