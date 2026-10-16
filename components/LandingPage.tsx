import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { preload } from "react-dom";
import {
  ArrowRight,
  ArrowUpDown,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  CircleCheck,
  ClipboardList,
  FileCheckCorner,
  Flame,
  Gauge,
  Minus,
  Network,
  Phone,
  ShieldCheck,
  Wind,
  Zap,
} from "./icons";
import { BrandMark } from "./Brand";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FaqList from "./FaqList";
import JsonLd, { faqSchema } from "./JsonLd";
import { btnHero } from "./ui";
import { areas, faqs, type AreaSlug } from "@/lib/content";
import { hasPhone, isSet, phoneLink, site } from "@/lib/site";

type IconType = ComponentType<{ size?: number; strokeWidth?: number }>;

const services: { icon: IconType; title: string; text: string; tag: string }[] = [
  {
    icon: ClipboardList,
    title: "Prüfpflichten ermitteln",
    text: "Wir erfassen Ihre Anlagen und Gebäude und leiten daraus ab, welche Prüfungen nach BetrSichV, DGUV Vorschrift 3, ArbStättV und einschlägigen Regelwerken tatsächlich für Sie gelten. Ergebnis ist eine Pflichtenmatrix je Anlage und Standort – auch einzeln als abgeschlossene Leistung mit Übergabe, ohne Jahresbindung, etwa bei der Objektübernahme nach einem Neubau.",
    tag: "Bestandsaufnahme & Pflichtenmatrix",
  },
  {
    icon: CalendarDays,
    title: "Prüfungen koordinieren und Fristen überwachen",
    text: "Wir beauftragen qualifizierte Prüfpartner, stimmen Termine mit Ihrem Betriebsablauf ab und melden anstehende Fristen rechtzeitig, bevor sie ablaufen.",
    tag: "Prüfplanung & Fristenmanagement",
  },
  {
    icon: FileCheckCorner,
    title: "Nachweise sichern und Mängel verfolgen",
    text: "Prüfberichte laufen bei uns zusammen. Festgestellte Mängel werden erfasst, nachverfolgt und bis zur Behebung dokumentiert.",
    tag: "Dokumentation & Mängelverfolgung",
  },
];

const comparison: [string, string][] = [
  ["Viele einzelne Prüfpartner", "Ein zentraler Ansprechpartner"],
  ["Unübersichtliche Prüffristen", "Strukturiertes Fristenmanagement"],
  ["Verteilte Unterlagen", "Gebündelte Dokumentation"],
  ["Offene Mängel ohne Überblick", "Konsequente Mängelverfolgung"],
];

const areaIcons: Record<AreaSlug, IconType> = {
  "dguv-v3-pruefung": Zap,
  brandschutz: Flame,
  aufzugsanlagen: ArrowUpDown,
  "lueftung-klima": Wind,
  "druck-gas": Gauge,
};

// TODO: typische Dauer je Schritt ergänzen (z. B. "ca. 1–2 Wochen"), sobald belastbar – wird dann automatisch angezeigt.
const steps: { title: string; text: string; duration?: string }[] = [
  { title: "Bestand aufnehmen", text: "Wir erfassen Ihre Anlagen, Gebäude und den aktuellen Prüfstatus." },
  { title: "Anforderungen klären", text: "Wir identifizieren relevante Vorschriften, Fristen und Zuständigkeiten." },
  { title: "Termine abstimmen", text: "Wir stimmen Prüfpartner, Termine und die Durchführung für Sie ab." },
  { title: "Ergebnisse dokumentieren", text: "Ergebnisse werden dokumentiert und offene Mängel nachverfolgt." },
];

const partnerCriteria = [
  "Befähigung nach TRBS 1203 bzw. Zulassung als ZÜS, wo vorgeschrieben",
  "Nachgewiesene Sachkunde im jeweiligen Prüfbereich",
  "Nachvollziehbare Prüfprotokolle mit Mängelbewertung",
];

const pad = (i: number) => `0${i + 1}`;

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-line"></span>
      {children}
    </div>
  );
}

export default function LandingPage() {
  preload("/assets/industrial-building.jpg", { as: "image", fetchPriority: "high" });

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-image"
          src="/assets/industrial-building.jpg"
          alt="Technische Anlagen und Lüftungssysteme in einem modernen Industriegebäude"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="hero-shade"></div>
        <div className="page-width hero-content">
          <div className="hero-eyebrow">
            <span className="status-dot"></span> IHR PARTNER FÜR BETREIBERVERANTWORTUNG
          </div>
          <h1>
            Betreiberpflichten organisieren
            <span className="hero-h1-sub">
              <span className="visually-hidden"> – </span>Prüfungen, Fristen und Nachweise aus einer Hand
            </span>
          </h1>
          <p>
            Für Organisationen mit mehreren Standorten und vielen prüfpflichtigen Anlagen: Wir ermitteln Ihre
            Prüfpflichten, koordinieren qualifizierte Prüfpartner und führen die Nachweise zusammen. Sie behalten den
            Überblick, ohne den Terminkalender zu führen.
          </p>
          <div className="hero-actions">
            <a href="#kontakt" className={`${btnHero} h-10 rounded-md px-8`}>
              Beratung anfragen <ArrowUpRight />
            </a>
            {hasPhone && (
              <a href={phoneLink} className="hero-secondary">
                <Phone size={17} /> {site.phoneDisplay} anrufen
              </a>
            )}
          </div>
          <div className="hero-checks">
            <span>
              <Check size={15} /> {areas.length} Prüfbereiche koordiniert
            </span>
            {isSet(site.region) && (
              <span>
                <Check size={15} /> Einzugsgebiet {site.region}
              </span>
            )}
            <span>
              <Check size={15} /> Erstgespräch kostenfrei
            </span>
          </div>
        </div>
        <div className="hero-caption">
          <span className="caption-line"></span> TECHNISCHE SICHERHEIT. ZENTRAL ORGANISIERT.
        </div>
      </section>

      <div className="trust-band">
        <div className="page-width trust-inner">
          <span className="trust-label">SICHERHEIT MIT SYSTEM</span>
          <span>
            <ShieldCheck /> Gesetzliche Anforderungen
          </span>
          <span>
            <CalendarDays /> Fristen im Blick
          </span>
          <span>
            <FileCheckCorner /> Lückenlose Nachweise
          </span>
          <span>
            <Network /> Starkes Partnernetzwerk
          </span>
        </div>
      </div>

      <section id="leistungen" className="section page-width">
        <SectionLabel number="01">UNSERE LEISTUNGEN</SectionLabel>
        <div className="section-heading">
          <h2>
            Viele Pflichten.
            <br />
            <span className="subtle-heading">Ein zentraler Ansprechpartner.</span>
          </h2>
          <p>
            Von der ersten Bestandsaufnahme bis zum letzten Prüfnachweis: Wir bringen Struktur in Ihre
            Betreiberverantwortung.
          </p>
        </div>
        <div className="services-grid">
          {services.map(({ icon: Icon, title, text, tag }, i) => (
            <article key={title} className="service">
              <div className="service-top">
                <span className="icon-box">
                  <Icon size={25} strokeWidth={1.5} />
                </span>
                <span className="item-number">{pad(i)}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-tag">
                <Check size={14} />
                {tag}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="problem-section">
        <div className="page-width problem-grid">
          <div>
            <SectionLabel number="02">WENIGER AUFWAND. MEHR ÜBERBLICK.</SectionLabel>
            <h2>
              Verantwortung bleibt.
              <br />
              <span className="subtle-heading">Der Koordinationsaufwand nicht.</span>
            </h2>
            <p>
              Eine Frist verpasst. Ein Nachweis fehlt. Zuständigkeiten sind unklar. Im Betriebsalltag werden
              Betreiberpflichten schnell zur Herausforderung.
            </p>
            <p className="consequence-note">
              Versäumte Prüffristen können Bußgelder, Probleme mit dem Versicherungsschutz und im Schadensfall den
              Vorwurf einer Organisationspflichtverletzung nach sich ziehen.
            </p>
            <a href="#kontakt" className="text-link">
              Bringen wir gemeinsam Ordnung hinein <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="comparison">
            <div className="comparison-row comparison-head">
              <span>Im Betriebsalltag</span>
              <span>Mit betreibermanager.de</span>
            </div>
            {comparison.map(([before, after]) => (
              <div key={before} className="comparison-row">
                <span className="comparison-before">
                  <Minus size={14} />
                  {before}
                </span>
                <span>
                  <CircleCheck size={17} />
                  {after}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pruefbereiche" className="section page-width">
        <SectionLabel number="03">PRÜF- &amp; PFLICHTBEREICHE</SectionLabel>
        <div className="section-heading">
          <h2>
            Ihre Anlagen.
            <br />
            <span className="subtle-heading">Unsere koordinierte Expertise.</span>
          </h2>
          <p>
            Wir verbinden Sie mit den passenden Prüfpartnern. Für die relevanten Bereiche Ihrer technischen
            Anlagen und Gebäude. <Link href="/prueffristen">Alle Prüffristen im Überblick</Link>
          </p>
        </div>
        <div className="areas-grid">
          {areas.map(({ slug, name, cardText, norm }, i) => {
            const Icon = areaIcons[slug];
            return (
              <Link key={slug} href={`/pruefbereiche/${slug}`} className="area">
                <div className="area-top">
                  <Icon size={26} strokeWidth={1.4} />
                  <span>{pad(i)}</span>
                </div>
                <h3>{name}</h3>
                <p>{cardText}</p>
                <span className="norm-tag">{norm}</span>
                <span className="text-link area-more">
                  Mehr erfahren <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
          <a href="#kontakt" className="area area-contact">
            <Building2 size={27} strokeWidth={1.4} />
            <h3>
              Ihre Anlage
              <br />
              ist nicht dabei?
            </h3>
            <p>Auch weitere Prüfbereiche koordinieren wir auf Anfrage.</p>
            <span className="text-link">
              Anforderungen besprechen <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
        <p className="area-note">
          Der konkrete Pflichtenumfang richtet sich nach Anlagenart, Nutzung und geltenden Vorschriften.
        </p>
      </section>

      <section className="network-section">
        <div className="page-width network-inner">
          <div>
            <SectionLabel number="04">UNSER PRÜFPARTNER-NETZWERK</SectionLabel>
            <h2>
              Die richtigen Spezialisten.
              <br />
              Ein gemeinsamer Prozess.
            </h2>
            <p>
              Elektroprüfer, Brandschutzsachverständige, ZÜS und weitere Fachpartner: Wir übernehmen die
              Abstimmung. Sie behalten den Überblick.
            </p>
            <ul className="criteria-list">
              {partnerCriteria.map((c) => (
                <li key={c}>
                  <Check size={14} /> {c}
                </li>
              ))}
            </ul>
            <a href="#kontakt" className={`${btnHero} rounded-md h-9 px-4 py-2`}>
              Passenden Prüfpartner finden <ArrowUpRight />
            </a>
          </div>
          <div className="network-diagram">
            <div className="network-client">
              <Building2 size={21} /> Ihre Anlagen &amp; Gebäude
            </div>
            <div className="diagram-connector"></div>
            <div className="network-hub">
              <BrandMark />
              <div>
                betreibermanager.de<small>Ihr zentraler Koordinationspartner</small>
              </div>
              <ShieldCheck size={22} />
            </div>
            <div className="diagram-branches">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="network-partners">
              <span>
                <Zap size={21} />
                Elektrotechnik
              </span>
              <span>
                <Flame size={21} />
                Brandschutz
              </span>
              <span>
                <Gauge size={21} />
                Technische Prüfungen
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="ablauf" className="section page-width">
        <SectionLabel number="05">SO FUNKTIONIERT’S</SectionLabel>
        <div className="section-heading">
          <h2>
            In vier Schritten
            <br />
            <span className="subtle-heading">zu klaren Prozessen.</span>
          </h2>
          <p>
            Transparent, strukturiert und auf Ihren Betrieb abgestimmt. Vom ersten Gespräch bis zur laufenden
            Betreuung.
          </p>
        </div>
        <div className="steps">
          {steps.map(({ title, text, duration }, i) => (
            <article key={title}>
              <div className="step-line">
                <span>{pad(i)}</span>
                {i < steps.length - 1 && <ArrowRight size={19} />}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              {duration && <p className="step-duration">{duration}</p>}
            </article>
          ))}
        </div>
        <div className="norms">
          <span>RELEVANTE GRUNDLAGEN</span>
          <strong>BetrSichV</strong>
          <strong>DGUV Vorschrift 3</strong>
          <strong>ArbStättV</strong>
          <strong>VDI 6022</strong>
          <strong>GEFMA 190</strong>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="page-width faq-grid">
          <div>
            <SectionLabel number="06">GUT ZU WISSEN</SectionLabel>
            <h2>
              Häufig gefragt.
              <br />
              <span className="subtle-heading">Klar beantwortet.</span>
            </h2>
            <p>
              Ihre Frage ist nicht dabei?
              <br />
              Wir besprechen sie gerne persönlich.
            </p>
            <a href="#kontakt" className="text-link">
              Kontakt aufnehmen <ArrowUpRight size={18} />
            </a>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section id="kontakt" className="section page-width contact-grid">
        <div>
          <SectionLabel number="07">LASSEN SIE UNS SPRECHEN</SectionLabel>
          <h2>
            Ihre Betreiberpflichten.
            <br />
            <span className="subtle-heading">Unser nächstes Gespräch.</span>
          </h2>
          <p>
            Beschreiben Sie Ihre Standorte, Anlagen und den aktuellen Prüfstatus. Wir klären mit Ihnen die nächsten
            Schritte – als Einstieg auch mit einer Bestandsaufnahme für einen Standort.
          </p>
          <ContactDetails />
          <div className="contact-assurance">
            <ShieldCheck size={22} />
            <div>
              Vertraulich. Persönlich. Unverbindlich.
              <small>Eine Vertraulichkeitsvereinbarung ist auf Anfrage möglich.</small>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
