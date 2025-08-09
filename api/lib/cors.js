// A tiny CORS wrapper you can reuse on every API route.

const DEFAULT_ALLOWED = [
  'https://app.compliancemattersca.com',
  'http://localhost:3000',            // dev; remove later if you want
  /vercel\.app$/                      // your Vercel preview domains
];

export function withCors(handler, options = {}) {
  const allowed = options.allowedOrigins || DEFAULT_ALLOWED;

  return async (req, res) => {
    const origin = req.headers.origin || '';

    // Is the request origin allowed?
    let isAllowed = false;
    for (const rule of allowed) {
      if (typeof rule === 'string' && origin === rule) { isAllowed = true; break; }
      if (rule instanceof RegExp && rule.test(origin)) { isAllowed = true; break; }
    }

    // Reflect the calling Origin only if allowed (safest pattern)
    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }

    // Baseline CORS headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

    // Preflight short‑circuit
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Hand off to the real handler
    return handler(req, res);
  };
}
