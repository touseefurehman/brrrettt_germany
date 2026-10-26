import Link from "next/link";
import Brand from "./Brand";
import { ConsentSettingsButton } from "./CookieConsent";
import { hasAnalytics } from "@/lib/analytics";
import { MoveUpRight } from "./icons";
import { areaPath, areas, isMovedArea } from "@/lib/content";
import { audiences, externerBetreibermanager } from "@/lib/leistungen";
import { leistungsseiten } from "@/lib/leistungsseiten";

// Prüfungs-Leistungsseiten; Betreiberpflichten und Betreiberverantwortung stehen in der Spalte daneben
const inspections = leistungsseiten.filter((p) => !["betreiberpflichten", "betreiberverantwortung"].includes(p.slug));
import EmailLink from "./EmailLink";
import { fullCompanyName, hasAddress, hasPhone, phoneLink, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <Brand />
        <p>Betreiberpflichten. Zentral organisiert.</p>
        <a href="#top" className="back-top" aria-label="Zurück nach oben">
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
            <EmailLink />
          </span>
        </address>
        <nav aria-label="Prüfungen">
          <strong>Prüfungen</strong>
          {inspections.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`}>
              {p.name}
            </Link>
          ))}
          <Link href="/dguv-v3-pruefung-kosten">DGUV V3 Prüfung Kosten</Link>
          {areas
            .filter((a) => !isMovedArea(a.slug))
            .map((a) => (
              <Link key={a.slug} href={areaPath(a.slug)}>
                {a.name}
              </Link>
            ))}
        </nav>
        <nav aria-label="Branchen">
          <strong>Leistung &amp; Branchen</strong>
          <Link href="/betreiberpflichten">Betreiberpflichten</Link>
          <Link href="/betreiberverantwortung">Betreiberverantwortung</Link>
          <Link href="/externer-betreibermanager">{externerBetreibermanager.name}</Link>
          {audiences.map((a) => (
            <Link key={a.slug} href={`/betreiberpflichten/${a.slug}`}>
              Betreiberpflichten {a.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Unternehmen">
          <strong>Unternehmen</strong>
          <Link href="/wissen">Wissen</Link>
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
          {hasAnalytics && (
            <>
              {" · "}
              <ConsentSettingsButton />
            </>
          )}
        </span>
      </div>
    </footer>
  );
}
