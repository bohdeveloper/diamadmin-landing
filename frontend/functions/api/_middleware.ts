const BODY_LIMIT = 50_000; // 50 KB

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options":  "nosniff",
  "Cache-Control":           "no-store",
  "Content-Security-Policy": "default-src 'none'",
};

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> {
  const { request, next } = context;

  // CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin":  "https://www.diamadmin.com",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age":       "86400",
      },
    });
  }

  // Body size guard via Content-Length header
  const contentLength = parseInt(request.headers.get("content-length") ?? "0", 10);
  if (!isNaN(contentLength) && contentLength > BODY_LIMIT) {
    return Response.json({ error: "Payload demasiado grande" }, { status: 413 });
  }

  const response = await next();

  // Attach security headers to every API response
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status:  response.status,
    headers: newHeaders,
  });
}
