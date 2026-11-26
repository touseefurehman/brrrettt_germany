"use client";

import { useState } from "react";

/** Kopiert einen Link in die Zwischenablage (Admin-Bereich) */
export default function CopyLink({ url, label = "Link kopieren" }: { url: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          window.prompt("Link kopieren:", url);
        }
      }}
    >
      {done ? "Kopiert ✓" : label}
    </button>
  );
}
