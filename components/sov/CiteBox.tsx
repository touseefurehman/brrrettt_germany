"use client";

import { useState } from "react";

/** „Zitieren“-Box: Quellenangabe und URL mit Kopier-Button. Ohne JavaScript bleiben Text und URL markierbar. */
export default function CiteBox({ text, url }: { text: string; url: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const full = `${text}, ${url}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
      setState("done");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <aside className="cite-box" aria-labelledby="zitieren-title">
      <h2 id="zitieren-title">Zitieren</h2>
      <p className="cite-text">
        {text}, <a href={url}>{url}</a>
      </p>
      <button type="button" className="rr-btn-secondary cite-btn" onClick={copy}>
        {state === "done" ? "Kopiert" : state === "error" ? "Kopieren nicht möglich" : "Quellenangabe kopieren"}
      </button>
      <span className="visually-hidden" aria-live="polite">
        {state === "done" ? "Quellenangabe in die Zwischenablage kopiert" : ""}
      </span>
    </aside>
  );
}
