import { sendEmail } from "../_lib/brevo";
import { contactoEmailHtml, adminContactoEmailHtml } from "../_lib/emails";

interface Env {
  BREVO_API_KEY: string;
  MAIL_FROM: string;
  CONTACT_NOTIFY_EMAIL: string;
  MAIL_TEST_TO?: string;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  try {
    const body = await request.json() as Record<string, string>;
    const { nombre, empresa, email, sector, mensaje, website } = body;

    if (website?.trim()) return Response.json({ success: true });

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n  = nombre.trim();
    const em = empresa?.trim() ?? "";
    const e  = email.trim();
    const s  = sector?.trim() ?? "";
    const m  = mensaje.trim();

    const from   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
    const notify = env.CONTACT_NOTIFY_EMAIL ?? "info@diamadmin.com";
    const testTo = env.MAIL_TEST_TO?.trim() || null;

    await sendEmail({
      apiKey: env.BREVO_API_KEY,
      from,
      to: testTo ?? e,
      replyTo: notify,
      subject: "Hemos recibido tu mensaje · Diamadmin",
      html: contactoEmailHtml(n, em, s, m),
    });

    await sendEmail({
      apiKey: env.BREVO_API_KEY,
      from,
      to: testTo ?? notify,
      replyTo: e,
      subject: `[Contacto] ${n}${em ? ` — ${em}` : ""}`,
      html: adminContactoEmailHtml(n, e, em, s, m),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contacto]", err);
    return Response.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
