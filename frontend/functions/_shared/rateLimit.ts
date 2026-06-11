// Minimal KV binding interface — compatible with Cloudflare Pages KV
export interface KVBinding {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

// Fixed-window rate limiter backed by KV.
// Uses "diamadmin" prefix so the KV namespace can be shared with other projects.
export async function rateLimit(
  kv: KVBinding,
  ip: string,
  endpoint: string,
  limit: number,
  windowSecs = 60
): Promise<{ ok: boolean }> {
  const window = Math.floor(Date.now() / 1000 / windowSecs);
  const key = `rl:diamadmin:${endpoint}:${ip}:${window}`;

  const raw   = await kv.get(key).catch(() => null);
  const count = parseInt(raw ?? "0", 10);

  if (count >= limit) return { ok: false };

  await kv.put(key, String(count + 1), { expirationTtl: windowSecs * 2 }).catch(() => null);
  return { ok: true };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
