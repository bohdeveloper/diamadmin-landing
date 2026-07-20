import { sendEmail, getBrevoListContacts, BrevoError } from "../_lib/brevo";
import { hmacHex } from "../_lib/security";
import { buildUnsubscribeUrl } from "../_lib/urls";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
  BROADCAST_MAX_PER_RUN?: string;
}

const MAX_SUBJECT = 200;
const MAX_HTML    = 100_000; // 100 KB

// Cloudflare Workers cap outbound subrequests per invocation (50 on the free
// plan, 1000 on paid). Each recipient costs one, plus a few for list paging,
// so we send a bounded slice per call and hand back a cursor for the rest.
const DEFAULT_MAX_PER_RUN = 40;

// Sending sequentially made large runs exceed the client timeout; a small
// concurrency window cuts wall time without tripping Brevo's rate limits.
const CONCURRENCY = 5;

// Brevo is out of quota (free tier: 300/day) or throttling us. Retrying the
// remaining recipients would just burn subrequests, so we stop the run.
const isQuotaError = (err: unknown): boolean =>
  err instanceof BrevoError && (err.status === 402 || err.status === 429);

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
    const body = await request.json() as { subject?: string; html?: string; offset?: number };
    const { subject, html } = body;
    const offset = Math.max(0, Math.trunc(body.offset ?? 0));

    if (!subject?.trim() || !html?.trim()) {
      return Response.json({ error: "Faltan subject y html" }, { status: 400 });
    }

    if (subject.trim().length > MAX_SUBJECT) {
      return Response.json({ error: "Subject demasiado largo" }, { status: 400 });
    }
    if (html.trim().length > MAX_HTML) {
      return Response.json({ error: "HTML demasiado largo" }, { status: 400 });
    }

    // Throws rather than returning a partial list, so we never broadcast over
    // a truncated audience believing it was complete.
    const contacts = await getBrevoListContacts(env.BREVO_API_KEY, env.BREVO_LIST_ID);
    if (contacts.length === 0) {
      return Response.json({ error: "No hay suscriptores en la lista" }, { status: 400 });
    }
    if (offset >= contacts.length) {
      return Response.json({ error: `offset ${offset} fuera de rango (${contacts.length} suscriptores)` }, { status: 400 });
    }

    const maxPerRun = Math.max(1, parseInt(env.BROADCAST_MAX_PER_RUN ?? "", 10) || DEFAULT_MAX_PER_RUN);
    const slice     = contacts.slice(offset, offset + maxPerRun);
    const from      = env.MAIL_FROM?.trim() || "Diamadmin <info@diamadmin.com>";
    const subj      = subject.trim();
    const template  = html.trim();

    const failed: Array<{ email: string; reason: string }> = [];
    let sent = 0;
    let quotaExhausted = false;

    for (let i = 0; i < slice.length && !quotaExhausted; i += CONCURRENCY) {
      const batch = slice.slice(i, i + CONCURRENCY);
      const results = await Promise.all(batch.map(async (contact) => {
        const unsubToken   = await hmacHex(contact.email, secret);
        const unsubUrl     = buildUnsubscribeUrl(contact.email, unsubToken);
        const personalHtml = template.replace(/\{\{unsubscribe_url\}\}/g, unsubUrl);
        try {
          await sendEmail({ apiKey: env.BREVO_API_KEY, from, to: contact.email, subject: subj, html: personalHtml });
          return { email: contact.email, ok: true as const };
        } catch (err) {
          console.error(`[broadcast] error enviando a ${contact.email}:`, err);
          return { email: contact.email, ok: false as const, err };
        }
      }));

      for (const r of results) {
        if (r.ok) { sent++; continue; }
        failed.push({ email: r.email, reason: r.err instanceof Error ? r.err.message : String(r.err) });
        if (isQuotaError(r.err)) quotaExhausted = true;
      }
    }

    const attempted = sent + failed.length;
    const processed = offset + attempted;
    const remaining = contacts.length - processed;

    // The caller must be able to tell a clean run from a partial one, so
    // success is false whenever anything failed or anything is left to send.
    const complete = failed.length === 0 && remaining === 0;
    const status   = sent === 0 ? 502 : complete ? 200 : 207;

    return Response.json({
      success: complete,
      total: contacts.length,
      offset,
      sent,
      failed,
      remaining,
      nextOffset: remaining > 0 ? processed : null,
      quotaExhausted,
    }, { status });
  } catch (err) {
    console.error("[broadcast]", err);
    if (err instanceof BrevoError) {
      return Response.json({ error: `No se pudo leer la lista de suscriptores: ${err.message}` }, { status: 502 });
    }
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
