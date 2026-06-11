import { sendEmail, removeFromBrevoList } from "../_lib/brevo";
import { hmacHex, verifyHmac } from "../_lib/security";
import { buildDeleteDataUrl } from "../_lib/urls";
import { bajaConfirmadaEmailHtml } from "../_lib/emails";
import { isValidEmail } from "../_lib/validate";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
  MAIL_TEST_TO?: string;
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const url   = new URL(request.url);
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");

  if (!email || !token) return Response.redirect("https://www.diamadmin.com/baja?error=1", 302);

  const decodedEmail = decodeURIComponent(email).toLowerCase().trim();

  if (!isValidEmail(decodedEmail)) return Response.redirect("https://www.diamadmin.com/baja?error=1", 302);

  const secret = env.BROADCAST_SECRET;
  if (!secret) return Response.redirect("https://www.diamadmin.com/baja?error=1", 302);

  const valid = await verifyHmac(decodedEmail, token, secret);
  if (!valid) return Response.redirect("https://www.diamadmin.com/baja?error=1", 302);

  const listId = parseInt(env.BREVO_LIST_ID ?? "0");
  const ok = await removeFromBrevoList(env.BREVO_API_KEY, listId, decodedEmail).catch(() => false);
  if (!ok) return Response.redirect("https://www.diamadmin.com/baja?error=1", 302);

  const deleteToken  = await hmacHex(decodedEmail, secret);
  const deleteDataUrl = buildDeleteDataUrl(decodedEmail, deleteToken);

  const from   = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
  const testTo = env.MAIL_TEST_TO?.trim() || null;

  await sendEmail({
    apiKey: env.BREVO_API_KEY,
    from,
    to: testTo ?? decodedEmail,
    subject: "Has sido dado de baja del newsletter · Diamadmin",
    html: bajaConfirmadaEmailHtml(deleteDataUrl),
  }).catch(console.error);

  return Response.redirect("https://www.diamadmin.com/baja?ok=1", 302);
}
