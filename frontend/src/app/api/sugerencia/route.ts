import { NextRequest, NextResponse } from "next/server";
import { transporter, FROM, NOTIFY, TEST_TO } from "@/lib/mailer";
import { sugerenciaEmailHtml, adminSugerenciaEmailHtml } from "@/lib/emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, tipo, idea, website } = body as Record<string, string>;

    if (website?.trim()) return NextResponse.json({ success: true });

    if (!tipo?.trim() || !idea?.trim()) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const e = email?.trim() ?? "";
    const t = tipo.trim();
    const i = idea.trim();

    // 1. Confirmación al usuario (solo si dejó email)
    if (e) {
      await transporter.sendMail({
        from: FROM,
        to: TEST_TO ?? e,
        subject: "Sugerencia recibida · Diamadmin",
        html: sugerenciaEmailHtml(t, i),
      });
    }

    // 2. Notificación interna (siempre)
    await transporter.sendMail({
      from: FROM,
      to: TEST_TO ?? NOTIFY,
      replyTo: e || undefined,
      subject: `[Sugerencia] ${t}${e ? ` — ${e}` : " (anónimo)"}`,
      html: adminSugerenciaEmailHtml(e, t, i),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sugerencia]", err);
    return NextResponse.json({ error: "Error al procesar tu sugerencia" }, { status: 500 });
  }
}
