// Web3Forms (web3forms.com) – einziger E-Mail-Versand der Website. Zustellung an das Postfach dieses Access Keys.
// Der Versand läuft immer im Browser: Der kostenlose Tarif nimmt keine serverseitigen Anfragen an.
// Der Access Key ist öffentlich (er erlaubt nur das Senden an das eigene Postfach) und darf im Client stehen.

export const WEB3FORMS_ACCESS_KEY = "faef2fdb-f4c6-40c8-ac8c-a551a003e1b6";

/** Felder einer Web3Forms-Nachricht (ohne access_key); weitere Schlüssel erscheinen als Zeilen in der E-Mail */
export type Web3FormsPayload = {
  subject: string;
  from_name?: string;
  replyto?: string;
  ccemail?: string;
  [field: string]: string | boolean | undefined;
};

/** Sendet aus dem Browser an Web3Forms. Wirft mit verständlicher Meldung, wenn die Zustellung scheitert. */
export async function sendViaWeb3Forms(payload: Web3FormsPayload, fallbackEmail: string): Promise<void> {
  let ok = false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, botcheck: false, ...payload }),
    });
    const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    ok = res.ok && Boolean(result.success);
    if (!ok) console.error("Web3Forms-Fehler", res.status, result.message);
  } catch (err) {
    console.error("Web3Forms nicht erreichbar", err);
  }
  if (!ok) throw new Error(`Der Versand ist fehlgeschlagen. Bitte schreiben Sie an ${fallbackEmail}.`);
}
