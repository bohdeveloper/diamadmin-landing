import { NextRequest, NextResponse } from "next/server";
import { transporter, FROM, getBrevoListContacts, buildUnsubscribeUrl } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const headers = { "Content-Type": "application/json" };

  // Verificar token secreto
  const auth = request.headers.get("Authorization") ?? "";
  const secret = process.env.BROADCAST_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const body = await request.json() as { subject?: string; html?: string };
    const { subject, html } = body;

    if (!subject?.trim() || !html?.trim()) {
      return NextResponse.json({ error: "Faltan subject y html" }, { status: 400 });
    }

    const contacts = await getBrevoListContacts();
    if (contacts.length === 0) {
      return NextResponse.json({ error: "No hay suscriptores en la lista" }, { status: 400 });
    }

    let sent = 0;
    let errors = 0;

    for (const contact of contacts) {
      const unsubUrl = buildUnsubscribeUrl(contact.email, secret);
      const personalHtml = html.trim().replace(/\{\{unsubscribe_url\}\}/g, unsubUrl);

      try {
        await transporter.sendMail({
          from: FROM,
          to: contact.email,
          subject: subject.trim(),
          html: personalHtml,
        });
        sent++;
      } catch (err) {
        console.error(`[broadcast] error enviando a ${contact.email}:`, err);
        errors++;
      }
    }

    console.log(`[broadcast] enviado — ${sent} ok, ${errors} errores`);
    return NextResponse.json({ success: true, sent, errors }, { headers });
  } catch (err) {
    console.error("[broadcast] unexpected error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
