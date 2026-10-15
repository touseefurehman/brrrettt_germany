import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone } from "./icons";
import JsonLd, { breadcrumbSchema } from "./JsonLd";
import { btnHero } from "./ui";
import type { DeadlineRow } from "@/lib/content";
import { phoneLink, site } from "@/lib/site";

export function PageIntro({
  crumbs,
  kicker,
  title,
  children,
}: {
  /** Pfad ohne Startseite, letzter Eintrag ist die aktuelle Seite */
  crumbs: [name: string, path: string][];
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="page-width">
        <nav className="breadcrumb" aria-label="Brotkrumen">
          <Link href="/">Startseite</Link>
          {crumbs.map(([name, path], i) =>
            i === crumbs.length - 1 ? (
              <span key={path} aria-current="page">
                {name}
              </span>
            ) : (
              <Link key={path} href={path}>
                {name}
              </Link>
            ),
          )}
        </nav>
        <div className="section-label">{kicker}</div>
        <h1>{title}</h1>
        {children && <div className="page-lead">{children}</div>}
      </div>
    </section>
  );
}

export function DeadlineTable({ rows, caption }: { rows: DeadlineRow[]; caption?: string }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">Anlagenart</th>
            <th scope="col">Prüfung</th>
            <th scope="col">Richtfrist</th>
            <th scope="col">Rechtsgrundlage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([asset, check, interval, basis]) => (
            <tr key={asset + check}>
              <th scope="row">{asset}</th>
              <td>{check}</td>
              <td>{interval}</td>
              <td>{basis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Jede Seite endet mit einem Angebotspfad. */
export function CtaBand({ title = "Prüfpflichten klären, Angebot erhalten." }: { title?: string }) {
  return (
    <section className="cta-band">
      <div className="page-width cta-inner">
        <div>
          <h2>{title}</h2>
          <p>
            Beschreiben Sie Ihre Anlagen und Ihren aktuellen Prüfstatus. {site.responseTime} – vertraulich und
            unverbindlich.
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/kontakt" className={`${btnHero} h-10 rounded-md px-6`}>
            Angebot anfragen <ArrowUpRight />
          </Link>
          <a href={phoneLink} className="hero-secondary">
            <Phone size={17} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
