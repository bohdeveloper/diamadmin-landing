import { sendEmail } from "../_lib/brevo";
import { sugerenciaEmailHtml, adminSugerenciaEmailHtml } from "../_lib/emails";

interface Env {
  BREVO_API_KEY: string;
  MAIL_FROM: string;
  CONTACT_NOTIFY_EMAIL: string;
  MAIL_TEST_TO?: string;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  try {
    const body = await request.json() as Record<string, string>;
    const { email, tipo, idea, website } = body;

    if (website?.trim()) return Response.json({ success: true });

    if (!email?.trim() || !tipo?.trim() || !idea?.trim()) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const e = email.trim();
    const t = tipo.trim();
    const i = idea.trim();

    const from   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
    const notify = env.CONTACT_NOTIFY_EMAIL ?? "info@diamadmin.com";
    const testTo = env.MAIL_TEST_TO?.trim() || null;

    await sendEmail({
      apiKey: env.BREVO_API_KEY,
      from,
      to: testTo ?? e,
      subject: "Sugerencia recibida · Diamadmin",
      html: sugerenciaEmailHtml(t, i),
    });

    await sendEmail({
      apiKey: env.BREVO_API_KEY,
      from,
      to: testTo ?? notify,
      replyTo: e,
      subject: `[Sugerencia] ${t} — ${e}`,
      html: adminSugerenciaEmailHtml(e, t, i),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[sugerencia]", err);
    return Response.json({ error: "Error al procesar tu sugerencia" }, { status: 500 });
  }
}
