import { sendEmail, addToBrevoList } from "../_lib/brevo";
import { listaEsperaEmailHtml, adminListaEsperaEmailHtml } from "../_lib/emails";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  MAIL_FROM?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  MAIL_TEST_TO?: string;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const body = (await request.json()) as Record<string, string>;
    const { nombre, email, website } = body;

    if (website) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (!nombre?.trim() || !email?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400, headers });
    }

    const n = nombre.trim();
    const e = email.trim().toLowerCase();

    if (!EMAIL_RE.test(e)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400, headers });
    }
    if (n.length > 100) {
      return new Response(JSON.stringify({ error: "Nombre demasiado largo" }), { status: 400, headers });
    }

    const FROM   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
    const NOTIFY = env.CONTACT_NOTIFY_EMAIL ?? "info@diamadmin.com";
    const TEST_TO = env.MAIL_TEST_TO?.trim() || null;
    const listId = parseInt(env.BREVO_LIST_ID ?? "0");

    // Añadir a la lista de Brevo
    if (listId > 0) {
      try {
        await addToBrevoList(env.BREVO_API_KEY, listId, e, n);
      } catch (err) {
        console.error("[lista-espera] brevo list error:", err);
        return new Response(JSON.stringify({ error: "Error al registrar tu solicitud" }), { status: 500, headers });
      }
    }

    // Email de confirmación al usuario
    try {
      await sendEmail({
        apiKey: env.BREVO_API_KEY,
        from: FROM,
        to: TEST_TO ?? e,
        subject: "¡Estás en la lista de espera de Diamadmin! ◆",
        html: listaEsperaEmailHtml(n),
      });
    } catch (err) {
      console.error("[lista-espera] user email error:", err);
      return new Response(JSON.stringify({ error: "Error al enviar el correo de confirmación" }), { status: 500, headers });
    }

    // Notificación al admin (no bloqueante)
    sendEmail({
      apiKey: env.BREVO_API_KEY,
      from: FROM,
      to: TEST_TO ?? NOTIFY,
      subject: `[Lista de espera] Nueva inscripción — ${n}`,
      html: adminListaEsperaEmailHtml(n, e),
    }).catch((err) => console.error("[lista-espera] admin notification error:", err));

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error("[lista-espera] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error al procesar tu solicitud" }), { status: 500, headers });
  }
}
