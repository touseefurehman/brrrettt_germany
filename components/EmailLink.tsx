"use client";

import { useState } from "react";
import { emailLink, site } from "@/lib/site";

/**
 * mailto-Link mit Rückfallebene: Ist auf dem Rechner kein Mailprogramm eingerichtet (häufig unter Windows und
 * bei Webmail-Nutzern), passiert beim Klick auf mailto: nichts. Deshalb wird die Adresse zusätzlich in die
 * Zwischenablage kopiert und das kurz angezeigt.
 */
export default function EmailLink({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard
      ?.writeText(site.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <>
      <a href={emailLink} onClick={copy}>
        {children ?? site.email}
      </a>
      {copied && (
        <span className="copy-hint" role="status">
          {" "}
          – Adresse kopiert
        </span>
      )}
    </>
  );
}
