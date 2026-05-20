import { sendEmail, removeFromBrevoList } from "../_lib/brevo";
import { hmacHex, verifyHmac } from "../_lib/security";
import { buildDeleteDataUrl } from "../_lib/urls";
import { bajaConfirmadaEmailHtml } from "../_lib/emails";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
  MAIL_TEST_TO?: string;
}

function page(ok: boolean, deleteDataUrl?: string): Response {
  const year = new Date().getFullYear();
  const deleteLink = deleteDataUrl
    ? `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? <a href="${deleteDataUrl}" style="color:#3DB5E6;text-decoration:none;">Eliminar mis datos</a></p>`
    : `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">Para eliminar tus datos escríbenos a <a href="mailto:info@diamadmin.com?subject=Eliminar%20mis%20datos" style="color:#3DB5E6;">info@diamadmin.com</a></p>`;
  const html = ok
    ? `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Baja confirmada · Diamadmin</title></head>
<body style="margin:0;padding:0;background:#EAF4FB;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1B75BB,#3DB5E6);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:7px 20px;margin-bottom:20px;"><span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">DIAMADMIN</span></div>
      <div style="font-size:40px;margin-bottom:12px;">✅</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Baja confirmada</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Te has dado de baja correctamente del newsletter de Diamadmin.</p>
      <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Diamadmin</a>
      ${deleteLink}
    </div>
    <div style="background:#0A2540;padding:16px 40px;text-align:center;"><p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Diamadmin</p></div>
  </div>
</body></html>`
    : `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Enlace inválido · Diamadmin</title></head>
<body style="margin:0;padding:0;background:#EAF4FB;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#FF8781,#ff6b63);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:7px 20px;margin-bottom:20px;"><span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">DIAMADMIN</span></div>
      <div style="font-size:40px;margin-bottom:12px;">❌</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Enlace inválido</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Este enlace no es válido. Para darte de baja escríbenos a <a href="mailto:info@diamadmin.com" style="color:#3DB5E6;">info@diamadmin.com</a>.</p>
      <a href="https://www.diamadmin.com" style="display:inline-block;background:linear-gradient(135deg,#1B75BB,#3DB5E6);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Diamadmin</a>
    </div>
    <div style="background:#0A2540;padding:16px 40px;text-align:center;"><p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Diamadmin</p></div>
  </div>
</body></html>`;
  return new Response(html, { status: ok ? 200 : 400, headers: { "Content-Type": "text/html;charset=utf-8" } });
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const url   = new URL(request.url);
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");

  if (!email || !token) return page(false);

  const decodedEmail = decodeURIComponent(email).toLowerCase();
  const secret = env.BROADCAST_SECRET;

  if (secret) {
    const valid = await verifyHmac(decodedEmail, token, secret);
    if (!valid) return page(false);
  }

  const listId = parseInt(env.BREVO_LIST_ID ?? "0");
  const ok = await removeFromBrevoList(env.BREVO_API_KEY, listId, decodedEmail).catch(() => false);
  if (!ok) return page(false);

  let deleteDataUrl: string | undefined;
  if (secret) {
    const deleteToken = await hmacHex(decodedEmail, secret);
    deleteDataUrl = buildDeleteDataUrl(decodedEmail, deleteToken);
  }

  const from   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
  const testTo = env.MAIL_TEST_TO?.trim() || null;

  await sendEmail({
    apiKey: env.BREVO_API_KEY,
    from,
    to: testTo ?? decodedEmail,
    subject: "Has sido dado de baja del newsletter · Diamadmin",
    html: bajaConfirmadaEmailHtml(deleteDataUrl),
  }).catch(console.error);

  return page(true, deleteDataUrl);
}
