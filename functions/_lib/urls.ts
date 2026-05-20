const SITE_URL = "https://www.diamadmin.com";

export function buildConfirmUrl(email: string, ts: string, token: string): string {
  return `${SITE_URL}/api/confirm?email=${encodeURIComponent(email)}&ts=${ts}&token=${token}`;
}

export function buildUnsubscribeUrl(email: string, token: string): string {
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export function buildDeleteDataUrl(email: string, token: string): string {
  return `${SITE_URL}/api/delete-data?email=${encodeURIComponent(email)}&token=${token}`;
}
