const BREVO_API = "https://api.brevo.com/v3";

function parseFrom(mailFrom: string): { name: string; email: string } {
  const m = mailFrom.match(/^(.+?)\s*<(.+?)>$/);
  return m ? { name: m[1].trim(), email: m[2].trim() } : { name: "Diamadmin", email: mailFrom.trim() };
}

export async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const body: Record<string, unknown> = {
    sender: parseFrom(params.from),
    to: [{ email: params.to }],
    subject: params.subject,
    htmlContent: params.html,
  };
  if (params.replyTo) body.replyTo = { email: params.replyTo };

  const res = await fetch(`${BREVO_API}/smtp/email`, {
    method: "POST",
    headers: { "api-key": params.apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

async function brevoReq(apiKey: string, path: string, method: string, body?: unknown): Promise<Response> {
  return fetch(`${BREVO_API}${path}`, {
    method,
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export async function isInBrevoList(apiKey: string, listId: number, email: string): Promise<boolean> {
  const res = await brevoReq(apiKey, `/contacts/${encodeURIComponent(email)}`, "GET");
  if (!res.ok) return false;
  const data = await res.json() as { listIds?: number[] };
  return data.listIds?.includes(listId) ?? false;
}

export async function addToBrevoList(apiKey: string, listId: number, email: string, nombre: string): Promise<void> {
  const [firstName, ...rest] = nombre.split(" ");
  const res = await brevoReq(apiKey, "/contacts", "POST", {
    email,
    listIds: [listId],
    updateEnabled: true,
    attributes: { FIRSTNAME: firstName, LASTNAME: rest.join(" ") || undefined },
  });
  if (!res.ok) throw new Error(`Brevo contacts ${res.status}: ${await res.text()}`);
}

export async function removeFromBrevoList(apiKey: string, listId: number, email: string): Promise<boolean> {
  const res = await brevoReq(apiKey, "/contacts/removeFromList", "POST", { emails: [email], listId });
  return res.ok;
}

export async function deleteFromBrevo(apiKey: string, email: string): Promise<boolean> {
  const res = await brevoReq(apiKey, `/contacts/${encodeURIComponent(email)}`, "DELETE");
  return res.ok || res.status === 404;
}

export async function getBrevoListContacts(apiKey: string, listId: string): Promise<Array<{ email: string; firstName: string }>> {
  const contacts: Array<{ email: string; firstName: string }> = [];
  let offset = 0;
  const limit = 500;
  while (true) {
    const res = await brevoReq(apiKey, `/contacts/lists/${listId}/contacts?limit=${limit}&offset=${offset}&sort=asc`, "GET");
    if (!res.ok) break;
    const data = await res.json() as { contacts?: Array<{ email: string; attributes?: { FIRSTNAME?: string } }> };
    const batch = data.contacts ?? [];
    for (const c of batch) contacts.push({ email: c.email, firstName: c.attributes?.FIRSTNAME ?? "" });
    if (batch.length < limit) break;
    offset += limit;
  }
  return contacts;
}
