import { NextRequest, NextResponse } from "next/server";
import { transporter, FROM, NOTIFY, TEST_TO } from "@/lib/mailer";
import { contactoEmailHtml, adminContactoEmailHtml } from "@/lib/emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, empresa, email, sector, mensaje, website } =
      body as Record<string, string>;

    if (website?.trim()) return NextResponse.json({ success: true });

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n  = nombre.trim();
    const em = empresa?.trim() ?? "";
    const e  = email.trim();
    const s  = sector?.trim() ?? "";
    const m  = mensaje.trim();

    // 1. Auto-reply al usuario
    await transporter.sendMail({
      from: FROM,
      to: TEST_TO ?? e,
      replyTo: NOTIFY,
      subject: "Hemos recibido tu mensaje · Diamadmin",
      html: contactoEmailHtml(n, em, s, m),
    });

    // 2. Notificación interna
    await transporter.sendMail({
      from: FROM,
      to: TEST_TO ?? NOTIFY,
      replyTo: e,
      subject: `[Contacto] ${n}${em ? ` — ${em}` : ""}`,
      html: adminContactoEmailHtml(n, e, em, s, m),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contacto]", err);
    return NextResponse.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
