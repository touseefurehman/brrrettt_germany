"use client";

import { useEffect, useRef, useState } from "react";
import { emailLink, site } from "@/lib/site";

const to = encodeURIComponent(site.email);
const options: [label: string, href: string][] = [
  ["In Gmail schreiben", `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`],
  ["In Outlook schreiben", `https://outlook.live.com/mail/0/deeplink/compose?to=${to}`],
  ["Mailprogramm öffnen", emailLink],
];

/**
 * E-Mail-Adresse mit Auswahlmenü. Ein reiner mailto:-Link tut nichts, wenn auf dem Rechner kein Mailprogramm
 * eingerichtet ist (häufig unter Windows und bei Webmail-Nutzern). Deshalb öffnet der Klick ein Menü mit Gmail,
 * Outlook im Browser, dem Mailprogramm und „Adresse kopieren“. Ohne JavaScript bleibt es ein normaler mailto-Link.
 */
export default function EmailLink({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const copy = () => {
    navigator.clipboard
      ?.writeText(site.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setOpen(false);
        }, 1500);
      })
      .catch(() => {});
  };

  return (
    <span className="email-link" ref={ref}>
      <a
        href={emailLink}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
      >
        {children ?? site.email}
      </a>
      {open && (
        <span className="email-menu" role="menu">
          {options.map(([label, href]) => (
            <a
              key={label}
              role="menuitem"
              href={href}
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener" })}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy}>
            {copied ? "Adresse kopiert ✓" : "Adresse kopieren"}
          </button>
        </span>
      )}
    </span>
  );
}
