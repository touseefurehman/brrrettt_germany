// Web3Forms (web3forms.com) – einziger E-Mail-Versand der Website. Zustellung an das Postfach des jeweiligen Access Keys.
// Der Versand läuft immer im Browser: Der kostenlose Tarif nimmt keine serverseitigen Anfragen an.
// Access Keys sind öffentlich (sie erlauben nur das Senden an das eigene Postfach) und dürfen im Client stehen.
// Bestätigungs-E-Mails an Absender laufen ausschließlich über den Web3Forms-Autoresponder (Pro, im Web3Forms-Dashboard eingerichtet).

/** Access Key für Kontaktformular, Nullmessung, Fachpartner- und Rank-&-Rent-Anfragen */
export const WEB3FORMS_ACCESS_KEY = "faef2fdb-f4c6-40c8-ac8c-a551a003e1b6";

/** Felder einer Web3Forms-Nachricht (ohne access_key); weitere Schlüssel erscheinen als Zeilen in der E-Mail */
export type Web3FormsPayload = {
  subject: string;
  from_name?: string;
  replyto?: string;
  ccemail?: string;
  [field: string]: string | boolean | undefined;
};

/** Sendet aus dem Browser an Web3Forms; true bei Erfolg. Wirft nie. */
export async function submitWeb3Forms(payload: Web3FormsPayload, accessKey: string = WEB3FORMS_ACCESS_KEY): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, botcheck: false, ...payload }),
    });
    const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    const ok = res.ok && Boolean(result.success);
    if (!ok) console.error("Web3Forms-Fehler", res.status, result.message);
    return ok;
  } catch (err) {
    console.error("Web3Forms nicht erreichbar", err);
    return false;
  }
}

/** Wie submitWeb3Forms, wirft aber mit verständlicher Meldung, wenn die Zustellung scheitert. */
export async function sendViaWeb3Forms(payload: Web3FormsPayload, fallbackEmail: string, accessKey?: string): Promise<void> {
  if (!(await submitWeb3Forms(payload, accessKey))) throw new Error(`Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${fallbackEmail}.`);
}
