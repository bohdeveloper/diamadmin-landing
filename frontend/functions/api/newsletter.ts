import { sendEmail, isInBrevoList } from "../_lib/brevo";
import { hmacHex } from "../_lib/security";
import { buildConfirmUrl, buildUnsubscribeUrl } from "../_lib/urls";
import { confirmacionHtml, yaSubscritoHtml } from "../_lib/emails";
import { isValidEmail, checkLength, LIMITS } from "../_lib/validate";
import { rateLimit, getClientIp, type KVBinding } from "../_shared/rateLimit";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
  MAIL_TEST_TO?: string;
  RATE_LIMIT_KV: KVBinding;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const ip = getClientIp(request);
  const { ok } = await rateLimit(env.RATE_LIMIT_KV, ip, "newsletter", 3);
  if (!ok) return Response.json({ error: "Demasiadas peticiones. Inténtalo en unos minutos." }, { status: 429 });

  try {
    const body = await request.json() as Record<string, string>;
    const { nombre, email, website } = body;

    if (website?.trim()) return Response.json({ success: true });

    if (!nombre?.trim() || !email?.trim()) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n = nombre.trim();
    const e = email.trim().toLowerCase();

    if (!isValidEmail(e))               return Response.json({ error: "Email inválido" },           { status: 400 });
    if (!checkLength(n, LIMITS.nombre))  return Response.json({ error: "Nombre demasiado largo" }, { status: 400 });

    const from   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
    const testTo = env.MAIL_TEST_TO?.trim() || null;
    const secret = env.BROADCAST_SECRET;
    const listId = parseInt(env.BREVO_LIST_ID ?? "0");

    const alreadySubscribed = await isInBrevoList(env.BREVO_API_KEY, listId, e).catch(() => false);
    if (alreadySubscribed) {
      const unsubToken = secret ? await hmacHex(e, secret) : "";
      const unsubUrl   = secret
        ? buildUnsubscribeUrl(e, unsubToken)
        : "mailto:info@diamadmin.com?subject=Baja%20newsletter";
      await sendEmail({
        apiKey: env.BREVO_API_KEY,
        from,
        to: testTo ?? e,
        subject: "¡Sigues siendo de los nuestros! ◆ · Diamadmin",
        html: yaSubscritoHtml(n, unsubUrl),
      });
      return Response.json({ success: true });
    }

    const ts           = Date.now().toString();
    const confirmToken = secret ? await hmacHex(`${e}|${ts}`, secret) : "";
    const confirmUrl   = secret
      ? buildConfirmUrl(e, ts, confirmToken)
      : "mailto:info@diamadmin.com?subject=Confirmar%20suscripción";

    await sendEmail({
      apiKey: env.BREVO_API_KEY,
      from,
      to: testTo ?? e,
      subject: "Confirma tu suscripción a Diamadmin 📬",
      html: confirmacionHtml(n, confirmUrl),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return Response.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
