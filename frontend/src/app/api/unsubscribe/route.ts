import { NextRequest, NextResponse } from "next/server";
import {
  transporter, FROM, TEST_TO,
  verifyHmac, removeFromBrevoList,
  buildDeleteDataUrl,
} from "@/lib/mailer";
import { bajaConfirmadaEmailHtml } from "@/lib/emails";

function page(ok: boolean, deleteDataUrl?: string): NextResponse {
  const year = new Date().getFullYear();
  const deleteLink = deleteDataUrl
    ? `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? <a href="${deleteDataUrl}" style="color:#3DB5E6;text-decoration:none;">Eliminar mis datos</a></p>`
    : `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? Escríbenos a <a href="mailto:info@diamadmin.com?subject=Eliminar%20mis%20datos" style="color:#3DB5E6;text-decoration:none;">info@diamadmin.com</a></p>`;

  const html = ok
    ? `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Baja confirmada · Diamadmin</title></head>
<body style="margin:0;padding:0;background:#EAF4FB;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1B75BB,#3DB5E6);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">DIAMADMIN</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">✅</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Baja confirmada</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Te has dado de baja correctamente del newsletter de Diamadmin. No recibirás más emails de nuestra parte.</p>
      <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Diamadmin</a>
      ${deleteLink}
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
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Enlace inválido</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Este enlace no es válido o ya fue utilizado. Si quieres darte de baja escríbenos a <a href="mailto:info@diamadmin.com" style="color:#3DB5E6;">info@diamadmin.com</a>.</p>
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
  const token = url.searchParams.get("token");

  if (!email || !token) return page(false);

  const decodedEmail = decodeURIComponent(email).toLowerCase();

  const secret = process.env.BROADCAST_SECRET;
  if (secret) {
    const valid = verifyHmac(decodedEmail, token, secret);
    if (!valid) return page(false);
  }

  const ok = await removeFromBrevoList(decodedEmail).catch(() => false);
  if (!ok) return page(false);

  // URL de eliminación de datos
  let deleteDataUrl: string | undefined;
  if (secret) {
    deleteDataUrl = buildDeleteDataUrl(decodedEmail, secret);
  }

  // Email de confirmación (no bloqueante)
  transporter.sendMail({
    from: FROM,
    to: TEST_TO ?? decodedEmail,
    subject: "Has sido dado de baja del newsletter · Diamadmin",
    html: bajaConfirmadaEmailHtml(deleteDataUrl),
  }).catch((err) => console.error("[unsubscribe] confirmation email error:", err));

  console.log(`[unsubscribe] baja procesada: ${decodedEmail}`);
  return page(true, deleteDataUrl);
}
