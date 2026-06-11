import { sendEmail, getBrevoListContacts } from "../_lib/brevo";
import { hmacHex } from "../_lib/security";
import { buildUnsubscribeUrl } from "../_lib/urls";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
}

const MAX_SUBJECT = 200;
const MAX_HTML    = 100_000; // 100 KB

// Timing-safe string comparison to prevent timing-based secret enumeration
function timingSafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const secret = env.BROADCAST_SECRET;
  const auth   = request.headers.get("Authorization") ?? "";

  if (!secret || !timingSafeCompare(auth, `Bearer ${secret}`)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const body = await request.json() as { subject?: string; html?: string };
    const { subject, html } = body;

    if (!subject?.trim() || !html?.trim()) {
      return Response.json({ error: "Faltan subject y html" }, { status: 400 });
    }

    if (subject.trim().length > MAX_SUBJECT) {
      return Response.json({ error: "Subject demasiado largo" }, { status: 400 });
    }
    if (html.trim().length > MAX_HTML) {
      return Response.json({ error: "HTML demasiado largo" }, { status: 400 });
    }

    const contacts = await getBrevoListContacts(env.BREVO_API_KEY, env.BREVO_LIST_ID);
    if (contacts.length === 0) {
      return Response.json({ error: "No hay suscriptores en la lista" }, { status: 400 });
    }

    const from = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
    let sent = 0, errors = 0;

    for (const contact of contacts) {
      const unsubToken = await hmacHex(contact.email, secret);
      const unsubUrl   = buildUnsubscribeUrl(contact.email, unsubToken);
      const personalHtml = html.trim().replace(/\{\{unsubscribe_url\}\}/g, unsubUrl);
      try {
        await sendEmail({ apiKey: env.BREVO_API_KEY, from, to: contact.email, subject: subject.trim(), html: personalHtml });
        sent++;
      } catch (err) {
        console.error(`[broadcast] error enviando a ${contact.email}:`, err);
        errors++;
      }
    }

    return Response.json({ success: true, sent, errors });
  } catch (err) {
    console.error("[broadcast]", err);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
