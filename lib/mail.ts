import { site } from "@/lib/site";

// E-Mail-Versand über Resend (RESEND_API_KEY, EMAIL_FROM). Ohne Schlüssel wird die E-Mail in der Server-Konsole ausgegeben.

export type Mail = { to: string; subject: string; text: string; unsubscribeUrl?: string };

export const baseUrl = () => (process.env.SITE_URL || site.url).replace(/\/$/, "");

export async function sendMail(mail: Mail): Promise<{ ok: boolean; console?: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.log(`[mail:console] An: ${mail.to}\nBetreff: ${mail.subject}\n\n${mail.text}\n${"-".repeat(60)}`);
    return { ok: true, console: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.unsubscribeUrl && {
        headers: { "List-Unsubscribe": `<${mail.unsubscribeUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      }),
    }),
  });
  if (!res.ok) {
    console.error("[mail] Resend-Fehler", res.status, (await res.text()).slice(0, 200));
    return { ok: false };
  }
  return { ok: true };
}
