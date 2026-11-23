"use client";

import { useState } from "react";

export type RoleView = { role: string; problem: string; measurement: string; benefit: string[] };

/** Umschalter Geschäftsführung / Marketing / Vertrieb; alle Texte stehen im HTML, nur die Anzeige wechselt */
export default function RoleSwitcher({ views }: { views: RoleView[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Rolle wählen" className="rr-partner-actions">
        {views.map((v, i) => (
          <button
            key={v.role}
            role="tab"
            id={`role-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`role-panel-${i}`}
            className={i === active ? "rr-btn" : "rr-btn-secondary"}
            onClick={() => setActive(i)}
            type="button"
          >
            {v.role}
          </button>
        ))}
      </div>
      {views.map((v, i) => (
        <div key={v.role} role="tabpanel" id={`role-panel-${i}`} aria-labelledby={`role-tab-${i}`} hidden={i !== active} className="link-cards three">
          <div className="rr-benefit">
            <strong>Das Problem</strong>
            <span>{v.problem}</span>
          </div>
          <div className="rr-benefit">
            <strong>Was die Messung zeigt</strong>
            <span>{v.measurement}</span>
          </div>
          <div className="rr-benefit">
            <strong>Was Sie bekommen</strong>
            <ul>
              {v.benefit.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
