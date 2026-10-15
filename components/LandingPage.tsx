"use client";

import { useState, type ComponentType, type ReactNode } from "react";
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
  Menu,
  Minus,
  MoveUpRight,
  Network,
  Plus,
  ShieldCheck,
  Wind,
  X,
  Zap,
} from "./icons";

const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
const btnPrimary = `${btnBase} rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2`;
const btnHero = `${btnBase} bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover`;
const btnGhost = `${btnBase} rounded-md hover:bg-accent hover:text-accent-foreground`;

const navItems: [string, string][] = [
  ["Leistungen", "leistungen"],
  ["Prüfbereiche", "pruefbereiche"],
  ["So funktioniert’s", "ablauf"],
  ["FAQ", "faq"],
];

const services: { icon: ComponentType<{ size?: number; strokeWidth?: number }>; title: string; text: string; tag: string }[] = [
  {
    icon: ClipboardList,
    title: "Pflichten ermitteln",
    text: "Wir erfassen Ihre Anlagen und identifizieren relevante Betreiberpflichten und gesetzliche Anforderungen.",
    tag: "Bestandsaufnahme & Pflichtenmatrix",
  },
  {
    icon: CalendarDays,
    title: "Prüfungen koordinieren",
    text: "Wir organisieren qualifizierte Prüfpartner, behalten Fristen im Blick und stimmen alle Termine ab.",
    tag: "Prüfplanung & Fristenmanagement",
  },
  {
    icon: FileCheckCorner,
    title: "Nachweise sichern",
    text: "Wir führen Dokumentation zusammen, verfolgen Mängel nach und sorgen für nachvollziehbare Nachweise.",
    tag: "Dokumentation & Mängelverfolgung",
  },
];

const comparison: [string, string][] = [
  ["Viele einzelne Prüfpartner", "Ein zentraler Ansprechpartner"],
  ["Unübersichtliche Prüffristen", "Strukturiertes Fristenmanagement"],
  ["Verteilte Unterlagen", "Gebündelte Dokumentation"],
  ["Offene Mängel ohne Überblick", "Konsequente Mängelverfolgung"],
];

const areas: { icon: ComponentType<{ size?: number; strokeWidth?: number }>; title: string; text: string; norm: string }[] = [
  {
    icon: Zap,
    title: "Elektrotechnik",
    text: "Ortsfeste und ortsveränderliche elektrische Anlagen und Betriebsmittel.",
    norm: "DGUV Vorschrift 3 · VDE",
  },
  {
    icon: Flame,
    title: "Brandschutz",
    text: "Brandmeldeanlagen, Feuerlöscher, Löschtechnik und Rettungswege.",
    norm: "Gebäudesicherheit",
  },
  {
    icon: ArrowUpDown,
    title: "Aufzugsanlagen",
    text: "Wiederkehrende Prüfungen durch zugelassene Überwachungsstellen.",
    norm: "BetrSichV · ZÜS",
  },
  {
    icon: Wind,
    title: "Lüftung & Klima",
    text: "Hygiene- und Funktionsprüfung Ihrer raumlufttechnischen Anlagen.",
    norm: "VDI 6022",
  },
  {
    icon: Gauge,
    title: "Druck & Gas",
    text: "Prüfung von Druckbehältern und Gasanlagen durch geeignete Prüfpartner.",
    norm: "Betriebssicherheitsverordnung",
  },
];

const steps: [string, string][] = [
  ["Bestand aufnehmen", "Wir erfassen Ihre Anlagen, Gebäude und den aktuellen Prüfstatus."],
  ["Pflichten ermitteln", "Wir identifizieren relevante Anforderungen, Fristen und Zuständigkeiten."],
  ["Prüfungen koordinieren", "Wir stimmen Prüfpartner, Termine und die Durchführung für Sie ab."],
  ["Nachweise sichern", "Ergebnisse werden dokumentiert und offene Mängel nachverfolgt."],
];

const faqs: [string, string][] = [
  [
    "Können Sie unsere gesamten Betreiberpflichten koordinieren?",
    "Ja. Wir koordinieren Pflichtenermittlung, Prüforganisation und Dokumentation – von der Bestandsaufnahme bis zur Nachweisführung. Die eigentlichen Prüfungen erfolgen über qualifizierte Prüfpartner. Die gesetzliche Betreiberverantwortung verbleibt beim Betreiber.",
  ],
  [
    "Muss ich mehrere Prüforganisationen selbst koordinieren?",
    "Nein. Sie haben bei uns einen zentralen Ansprechpartner. Wir übernehmen die Abstimmung zwischen den geeigneten Prüfpartnern, die Terminorganisation und die Zusammenführung der Nachweise.",
  ],
  [
    "Wie ermitteln Sie die für uns relevanten Pflichten?",
    "Wir betrachten Anlagenart, Nutzung, Gebäudetyp und den bestehenden Prüfstatus. Auf dieser Grundlage werden relevante Vorschriften, Prüffristen, Zuständigkeiten und Dokumentationspflichten ermittelt.",
  ],
  [
    "Können mehrere Standorte gemeinsam betreut werden?",
    "Auch für mehrere Standorte können Prüfbedarf, Termine und Dokumentation zentral koordiniert werden. Den konkreten Umfang stimmen wir individuell mit Ihnen ab.",
  ],
  [
    "Arbeiten Sie mit zugelassenen Prüfstellen?",
    "Gesetzlich vorgeschriebene Prüfungen koordinieren wir über qualifizierte Prüforganisationen und, wo erforderlich, zugelassene Überwachungsstellen. Angaben zu Zulassungen und Zertifizierungen klären wir projektbezogen.",
  ],
  [
    "Kann ich auch eine einzelne Anlagenprüfung anfragen?",
    "Ja. Beschreiben Sie Ihre Anlage und den gewünschten Prüfbereich. Wir prüfen, ob sich die Leistung über einen geeigneten Partner in unserem Netzwerk koordinieren lässt.",
  ],
];

const pad = (i: number) => `0${i + 1}`;

function Brand() {
  return (
    <a href="#" className="brand" aria-label="betreibermanager.de Startseite">
      <span className="brand-mark">
        B<span></span>
      </span>
      <span>
        betreibermanager<span className="brand-suffix">.de</span>
      </span>
    </a>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <header className="site-header">
        <div className="page-width header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className={`${btnPrimary} nav-cta`}>
            Beratung anfragen <ArrowUpRight />
          </a>
          <button
            type="button"
            className={`${btnGhost} h-9 w-9 mobile-menu-button`}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            {[...navItems, ["Beratung anfragen", "kontakt"] as [string, string]].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
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
              Betreiberpflichten
              <br />
              im Griff<span className="hero-question">?</span>
            </h1>
            <p>
              Prüfungen. Fristen. Dokumentation.
              <br />
              Wir organisieren Ihre Betreiberpflichten –
              <br className="desktop-break" /> damit Sie sich auf Ihren Betrieb konzentrieren können.
            </p>
            <div className="hero-actions">
              <a href="#kontakt" className={`${btnHero} h-10 rounded-md px-8`}>
                Beratung anfragen <ArrowUpRight />
              </a>
              <a href="#leistungen" className="hero-secondary">
                Unsere Leistungen <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-checks">
              <span>
                <Check size={15} /> Ein Ansprechpartner
              </span>
              <span>
                <Check size={15} /> Qualifizierte Prüfpartner
              </span>
              <span>
                <Check size={15} /> Klare Prozesse
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
              Anlagen und Gebäude.
            </p>
          </div>
          <div className="areas-grid">
            {areas.map(({ icon: Icon, title, text, norm }, i) => (
              <article key={title} className="area">
                <div className="area-top">
                  <Icon size={26} strokeWidth={1.4} />
                  <span>{pad(i)}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="norm-tag">{norm}</span>
              </article>
            ))}
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
                <span className="brand-mark">
                  B<span></span>
                </span>
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
            {steps.map(([title, text], i) => (
              <article key={title}>
                <div className="step-line">
                  <span>{pad(i)}</span>
                  {i < steps.length - 1 && <ArrowRight size={19} />}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="norms">
            <span>RELEVANTE GRUNDLAGEN</span>
            <strong>BetrSichV</strong>
            <strong>DGUV Vorschrift 3</strong>
            <strong>ArbStättV</strong>
            <strong>VDI 6022</strong>
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
            <div className="faq-list">
              {faqs.map(([question, answer], i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className={`${btnGhost} h-9 px-4 py-2 faq-trigger`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span>{question}</span>
                      {isOpen ? <Minus /> : <Plus />}
                    </button>
                    {isOpen && (
                      <p id={`faq-answer-${i}`} className="faq-answer">
                        {answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
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
              Ob einzelne Anlage oder mehrere Standorte: Beschreiben Sie Ihren Bedarf und lassen Sie uns die
              nächsten Schritte klären.
            </p>
            <div className="contact-assurance">
              <ShieldCheck size={22} />
              <div>
                Vertraulich. Persönlich. Unverbindlich.
                <small>Eine Vertraulichkeitsvereinbarung ist auf Anfrage möglich.</small>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>
                Name
                <input type="text" placeholder="Ihr Vor- und Nachname" autoComplete="name" />
              </label>
              <label>
                Firma
                <input type="text" placeholder="Ihr Unternehmen" autoComplete="organization" />
              </label>
            </div>
            <div className="form-row">
              <label>
                E-Mail
                <input type="email" placeholder="name@unternehmen.de" autoComplete="email" />
              </label>
              <label>
                Telefon <span>(optional)</span>
                <input type="tel" placeholder="Ihre Telefonnummer" autoComplete="tel" />
              </label>
            </div>
            <label>
              Worum geht es?
              <textarea rows={4} placeholder="Anlagen, Gebäudetyp, aktueller Prüfstatus und gewünschter Umfang …" />
            </label>
            <div className="form-footer">
              <p>Der Anfrageversand ist noch nicht freigeschaltet.</p>
              <button className={btnPrimary} disabled type="submit">
                Beratung anfragen <ArrowUpRight />
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <Brand />
          <p>Betreiberpflichten. Zentral organisiert.</p>
          <a href="#" className="back-top" aria-label="Zurück nach oben">
            <MoveUpRight size={20} />
          </a>
        </div>
        <div className="page-width footer-bottom">
          <span>© 2026 betreibermanager.de</span>
          <span>Partner für Betreiberpflichten &amp; Anlagenbetrieb</span>
        </div>
      </footer>
    </>
  );
}
