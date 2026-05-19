import nodemailer from "nodemailer";
import crypto from "crypto";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export const FROM    = process.env.MAIL_FROM            ?? "Diamadmin <ohb.seven@gmail.com>";
export const NOTIFY  = process.env.CONTACT_NOTIFY_EMAIL ?? "ohb.seven@gmail.com";
export const TEST_TO = process.env.MAIL_TEST_TO?.trim()  || null;

const SITE_URL = "https://www.diamadmin.com";
const BREVO_API = "https://api.brevo.com/v3";

// ── HMAC helpers ──────────────────────────────────────────────────
export function hmacHex(message: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export function verifyHmac(message: string, token: string, secret: string): boolean {
  try {
    const expected = Buffer.from(hmacHex(message, secret), "hex");
    const provided  = Buffer.from(token, "hex");
    if (expected.length !== provided.length) return false;
    return crypto.timingSafeEqual(expected, provided);
  } catch {
    return false;
  }
}

// ── URL builders ──────────────────────────────────────────────────
export function buildConfirmUrl(email: string, ts: string, secret: string): string {
  const token = hmacHex(`${email}|${ts}`, secret);
  return `${SITE_URL}/api/confirm?email=${encodeURIComponent(email)}&ts=${ts}&token=${token}`;
}

export function buildUnsubscribeUrl(email: string, secret: string): string {
  const token = hmacHex(email, secret);
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export function buildDeleteDataUrl(email: string, secret: string): string {
  const token = hmacHex(email, secret);
  return `${SITE_URL}/api/delete-data?email=${encodeURIComponent(email)}&token=${token}`;
}

// ── Brevo Contacts API ────────────────────────────────────────────
async function brevoRequest(path: string, method: string, body?: unknown): Promise<Response> {
  return fetch(`${BREVO_API}${path}`, {
    method,
    headers: {
      "api-key": process.env.BREVO_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export async function isInBrevoList(email: string): Promise<boolean> {
  const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null;
  if (!process.env.BREVO_API_KEY || !listId) return false;
  const res = await brevoRequest(`/contacts/${encodeURIComponent(email)}`, "GET");
  if (!res.ok) return false;
  const data = (await res.json()) as { listIds?: number[] };
  return data.listIds?.includes(listId) ?? false;
}

export async function addToBrevoList(email: string, nombre: string): Promise<void> {
  const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null;
  if (!process.env.BREVO_API_KEY || !listId) return;
  const [firstName, ...rest] = nombre.split(" ");
  await brevoRequest("/contacts", "POST", {
    email,
    listIds: [listId],
    updateEnabled: true,
    attributes: { FIRSTNAME: firstName, LASTNAME: rest.join(" ") || undefined },
  });
}

export async function removeFromBrevoList(email: string): Promise<boolean> {
  const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null;
  if (!process.env.BREVO_API_KEY || !listId) return true;
  const res = await brevoRequest("/contacts/removeFromList", "POST", {
    emails: [email],
    listId,
  });
  return res.ok;
}

export async function deleteFromBrevo(email: string): Promise<boolean> {
  if (!process.env.BREVO_API_KEY) return true;
  const res = await brevoRequest(`/contacts/${encodeURIComponent(email)}`, "DELETE");
  return res.ok || res.status === 404;
}

export async function getBrevoListContacts(): Promise<Array<{ email: string; firstName: string }>> {
  const listId = process.env.BREVO_LIST_ID;
  if (!process.env.BREVO_API_KEY || !listId) return [];

  const contacts: Array<{ email: string; firstName: string }> = [];
  let offset = 0;
  const limit = 500;

  while (true) {
    const res = await brevoRequest(
      `/contacts/lists/${listId}/contacts?limit=${limit}&offset=${offset}&sort=asc`,
      "GET"
    );
    if (!res.ok) break;
    const data = (await res.json()) as {
      contacts?: Array<{ email: string; attributes?: { FIRSTNAME?: string } }>;
    };
    const batch = data.contacts ?? [];
    for (const c of batch) {
      contacts.push({ email: c.email, firstName: c.attributes?.FIRSTNAME ?? "" });
    }
    if (batch.length < limit) break;
    offset += limit;
  }

  return contacts;
}
