"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { katalogBySlug, leistungskatalog } from "@/lib/leistungskatalog";

function Select({ preselect = "" }: { preselect?: string }) {
  return (
    <label>
      Leistung <span>(optional)</span>
      {/* key: bei neuer Vorauswahl über ?leistung= neu aufbauen, damit defaultValue greift */}
      <select key={preselect} name="leistung" defaultValue={preselect}>
        <option value="">Bitte wählen …</option>
        {leistungskatalog.map((b) => (
          <optgroup key={b.slug} label={b.name}>
            {b.items.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name}
              </option>
            ))}
          </optgroup>
        ))}
        <option value="Mehrere Leistungen / Gesamtkoordination">Mehrere Leistungen / Gesamtkoordination</option>
      </select>
    </label>
  );
}

function SelectFromUrl() {
  const slug = useSearchParams().get("leistung");
  return <Select preselect={(slug && katalogBySlug(slug)) || ""} />;
}

/** Leistungsauswahl für das Formular auf /leistungen; Vorauswahl über ?leistung=<slug>. */
export default function CatalogSelect() {
  return (
    <Suspense fallback={<Select />}>
      <SelectFromUrl />
    </Suspense>
  );
}
