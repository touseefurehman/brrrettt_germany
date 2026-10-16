"use client";

import { useState } from "react";
import Link from "next/link";
import Brand from "./Brand";
import { ArrowUpRight, Menu, Phone, X } from "./icons";
import { btnGhost, btnPrimary } from "./ui";
import { hasPhone, phoneLink, site } from "@/lib/site";

const navItems: [string, string][] = [
  ["Leistungen", "/#leistungen"],
  ["Prüfbereiche", "/#pruefbereiche"],
  ["Prüffristen", "/prueffristen"],
  ["Über uns", "/ueber-uns"],
  ["Kontakt", "/kontakt"],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        {hasPhone && (
          <a href={phoneLink} className="header-phone">
            <Phone size={15} /> {site.phoneDisplay}
          </a>
        )}
        <Link href="/kontakt" className={`${btnPrimary} nav-cta`}>
          Beratung anfragen <ArrowUpRight />
        </Link>
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
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          {hasPhone && (
            <a href={phoneLink}>
              {site.phoneDisplay} anrufen
              <Phone size={16} />
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
