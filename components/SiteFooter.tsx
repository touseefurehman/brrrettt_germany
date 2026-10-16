import Link from "next/link";
import Brand from "./Brand";
import { MoveUpRight } from "./icons";
import { areas } from "@/lib/content";
import { emailLink, fullCompanyName, hasAddress, hasPhone, phoneLink, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <Brand />
        <p>Betreiberpflichten. Zentral organisiert.</p>
        <a href="#" className="back-top" aria-label="Zurück nach oben">
          <MoveUpRight size={20} />
        </a>
      </div>
      <div className="page-width footer-columns">
        <address>
          <strong>{fullCompanyName}</strong>
          {hasAddress && (
            <span>
              {site.street} · {site.postalCode} {site.city}
            </span>
          )}
          <span>
            {hasPhone && (
              <>
                Telefon <a href={phoneLink}>{site.phoneDisplay}</a> ·{" "}
              </>
            )}
            <a href={emailLink}>{site.email}</a>
          </span>
        </address>
        <nav aria-label="Prüfbereiche">
          <strong>Prüfbereiche</strong>
          {areas.map((a) => (
            <Link key={a.slug} href={`/pruefbereiche/${a.slug}`}>
              {a.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Unternehmen">
          <strong>Unternehmen</strong>
          <Link href="/prueffristen">Prüffristen</Link>
          <Link href="/ueber-uns">Über uns</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
      <div className="page-width footer-bottom">
        <span>© 2026 betreibermanager.de – Partner für Betreiberpflichten und Anlagenbetrieb</span>
        <span>
          <Link href="/impressum">Impressum</Link> · <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </div>
    </footer>
  );
}
