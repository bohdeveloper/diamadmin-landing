import { NextRequest, NextResponse } from "next/server";
import {
  transporter, FROM, NOTIFY, TEST_TO,
  verifyHmac, addToBrevoList, isInBrevoList,
  buildUnsubscribeUrl,
} from "@/lib/mailer";
import { chispaHtml, adminNewsletterEmailHtml } from "@/lib/emails";

const TTL_MS = 48 * 60 * 60 * 1000;

function page(ok: boolean): NextResponse {
  const year = new Date().getFullYear();
  const html = ok
    ? `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Suscripción confirmada · Diamadmin</title></head>
<body style="margin:0;padding:0;background:#EAF4FB;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1B75BB,#3DB5E6);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">DIAMADMIN</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">🎉</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">¡Suscripción confirmada!</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Ya formas parte de Diamadmin. Recibirás las próximas novedades y actualizaciones directamente en tu bandeja de entrada.</p>
      <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;box-shadow:0 4px 14px rgba(27,117,187,0.35);">Explorar Diamadmin</a>
    </div>
    <div style="background:#0A2540;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Diamadmin</p>
    </div>
  </div>
</body></html>`
    : `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Enlace inválido · Diamadmin</title></head>
<body style="margin:0;padding:0;background:#EAF4FB;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#FF8781,#ff6b63);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">DIAMADMIN</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">❌</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Enlace inválido o expirado</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Este enlace de confirmación no es válido o ha expirado (48 horas). Vuelve a suscribirte desde la web para recibir un nuevo enlace.</p>
      <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Diamadmin</a>
    </div>
    <div style="background:#0A2540;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Diamadmin</p>
    </div>
  </div>
</body></html>`;

  return new NextResponse(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html;charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const email = url.searchParams.get("email");
  const ts    = url.searchParams.get("ts");
  const token = url.searchParams.get("token");

  if (!email || !ts || !token) return page(false);

  const decodedEmail = decodeURIComponent(email).toLowerCase();

  // Verificar expiración (48h)
  const tsNum = parseInt(ts, 10);
  if (isNaN(tsNum) || Date.now() - tsNum > TTL_MS) return page(false);

  // Verificar HMAC
  const secret = process.env.BROADCAST_SECRET;
  if (secret) {
    const valid = verifyHmac(`${decodedEmail}|${ts}`, token, secret);
    if (!valid) return page(false);
  }

  // Idempotente: ya confirmado
  const already = await isInBrevoList(decodedEmail).catch(() => false);
  if (already) return page(true);

  // Añadir a la lista de Brevo
  const firstName = decodedEmail.split("@")[0];
  addToBrevoList(decodedEmail, firstName).catch((err) =>
    console.error("[confirm] brevo error:", err)
  );

  // Generar URL de baja
  const unsubscribeUrl = secret
    ? buildUnsubscribeUrl(decodedEmail, secret)
    : "mailto:info@diamadmin.com?subject=Baja%20newsletter";

  // Email de bienvenida (chispa)
  transporter.sendMail({
    from: FROM,
    to: TEST_TO ?? decodedEmail,
    subject: "Tu primera cápsula Diamadmin ◆",
    html: chispaHtml(unsubscribeUrl),
  }).catch((err) => console.error("[confirm] welcome email error:", err));

  // Notificación admin (no bloqueante)
  transporter.sendMail({
    from: FROM,
    to: TEST_TO ?? NOTIFY,
    subject: `[Newsletter] Nueva suscripción confirmada — ${decodedEmail}`,
    html: adminNewsletterEmailHtml(firstName, decodedEmail),
  }).catch((err) => console.error("[confirm] admin notification error:", err));

  console.log(`[confirm] suscripción confirmada: ${decodedEmail}`);
  return page(true);
}
