import { sendEmail, isInBrevoList, addToBrevoList } from "../_lib/brevo";
import { hmacHex, verifyHmac } from "../_lib/security";
import { buildUnsubscribeUrl } from "../_lib/urls";
import { chispaHtml, adminNewsletterEmailHtml } from "../_lib/emails";
import { isValidEmail } from "../_lib/validate";

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BROADCAST_SECRET: string;
  MAIL_FROM: string;
  CONTACT_NOTIFY_EMAIL: string;
  MAIL_TEST_TO?: string;
}

const TTL_MS = 48 * 60 * 60 * 1000;

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const url   = new URL(request.url);
  const email = url.searchParams.get("email");
  const ts    = url.searchParams.get("ts");
  const token = url.searchParams.get("token");

  if (!email || !ts || !token) return Response.redirect("https://www.diamadmin.com/confirmar?error=1", 302);

  const decodedEmail = decodeURIComponent(email).toLowerCase().trim();

  if (!isValidEmail(decodedEmail)) return Response.redirect("https://www.diamadmin.com/confirmar?error=1", 302);

  const tsNum = parseInt(ts, 10);
  if (isNaN(tsNum) || Date.now() - tsNum > TTL_MS) return Response.redirect("https://www.diamadmin.com/confirmar?error=1", 302);

  const secret = env.BROADCAST_SECRET;
  if (!secret) return Response.redirect("https://www.diamadmin.com/confirmar?error=1", 302);

  const valid = await verifyHmac(`${decodedEmail}|${ts}`, token, secret);
  if (!valid) return Response.redirect("https://www.diamadmin.com/confirmar?error=1", 302);

  const listId  = parseInt(env.BREVO_LIST_ID ?? "0");
  const already = await isInBrevoList(env.BREVO_API_KEY, listId, decodedEmail).catch(() => false);
  if (already) return Response.redirect("https://www.diamadmin.com/confirmar?ok=1", 302);

  await addToBrevoList(env.BREVO_API_KEY, listId, decodedEmail, decodedEmail.split("@")[0]).catch(console.error);

  const from      = env.MAIL_FROM ?? "Diamadmin <info@diamadmin.com>";
  const notify    = env.CONTACT_NOTIFY_EMAIL ?? "info@diamadmin.com";
  const testTo    = env.MAIL_TEST_TO?.trim() || null;
  const firstName = decodedEmail.split("@")[0];

  const unsubToken = await hmacHex(decodedEmail, secret);
  const unsubUrl   = buildUnsubscribeUrl(decodedEmail, unsubToken);

  await sendEmail({
    apiKey: env.BREVO_API_KEY,
    from,
    to: testTo ?? decodedEmail,
    subject: "Tu primera cápsula Diamadmin ◆",
    html: chispaHtml(unsubUrl),
  }).catch(console.error);

  await sendEmail({
    apiKey: env.BREVO_API_KEY,
    from,
    to: testTo ?? notify,
    subject: `[Newsletter] Nueva suscripción confirmada — ${decodedEmail}`,
    html: adminNewsletterEmailHtml(firstName, decodedEmail),
  }).catch(console.error);

  return Response.redirect("https://www.diamadmin.com/confirmar?ok=1", 302);
}
