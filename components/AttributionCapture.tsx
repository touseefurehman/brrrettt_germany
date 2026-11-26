"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Merkt UTM-Parameter und externen Referrer beim ersten Seitenaufruf der Sitzung (siehe lib/attribution.ts) */
export default function AttributionCapture() {
  useEffect(() => captureAttribution(), []);
  return null;
}
