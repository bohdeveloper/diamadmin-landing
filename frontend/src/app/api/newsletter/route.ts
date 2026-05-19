import { NextRequest, NextResponse } from "next/server";
import {
  transporter, FROM, TEST_TO,
  buildConfirmUrl, buildUnsubscribeUrl,
  isInBrevoList,
} from "@/lib/mailer";
import { confirmacionHtml, yaSubscritoHtml } from "@/lib/emails";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, website } = body as Record<string, string>;

    if (website?.trim()) return NextResponse.json({ success: true });

    if (!nombre?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n = nombre.trim();
    const e = email.trim().toLowerCase();

    if (!EMAIL_RE.test(e)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    if (n.length > 100) {
      return NextResponse.json({ error: "Nombre demasiado largo" }, { status: 400 });
    }

    const secret = process.env.BROADCAST_SECRET;

    // Ya suscrito: enviar email informativo
    const alreadySubscribed = await isInBrevoList(e).catch(() => false);
    if (alreadySubscribed) {
      const unsubUrl = secret
        ? buildUnsubscribeUrl(e, secret)
        : "mailto:info@diamadmin.com?subject=Baja%20newsletter";
      await transporter.sendMail({
        from: FROM,
        to: TEST_TO ?? e,
        subject: "¡Sigues siendo de los nuestros! ◆ · Diamadmin",
        html: yaSubscritoHtml(n, unsubUrl),
      });
      return NextResponse.json({ success: true });
    }

    // Double opt-in: token con timestamp (48h)
    const ts = Date.now().toString();
    const confirmUrl = secret
      ? buildConfirmUrl(e, ts, secret)
      : "mailto:info@diamadmin.com?subject=Confirmar%20suscripción";

    await transporter.sendMail({
      from: FROM,
      to: TEST_TO ?? e,
      subject: "Confirma tu suscripción a Diamadmin 📬",
      html: confirmacionHtml(n, confirmUrl),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
