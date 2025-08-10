// A tiny, safe CORS wrapper to reuse on every API route.

const DEFAULT_ALLOWED = [
  'https://app.compliancemattersca.com',
  'http://localhost:3000',   // for local dev; remove later if you like
  /\.vercel\.app$/           // any Vercel preview domain
];

export function withCors(handler, options = {}) {
  const allowed = options.allowedOrigins || DEFAULT_ALLOWED;

  return async (req, res) => {
    const origin = req.headers.origin || '';

    // check if origin is allowed (string exact match or regex test)
    const isAllowed = allowed.some(rule =>
      (typeof rule === 'string' && origin === rule) ||
      (rule instanceof RegExp && rule.test(origin))
    );

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      // If you ever need cookies/auth across origins, also set:
      // res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Echo preflight asks if present; otherwise fall back to defaults
    const reqHeaders = req.headers['access-control-request-headers'];
    const reqMethod  = req.headers['access-control-request-method'];

    res.setHeader('Access-Control-Allow-Headers', reqHeaders || 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', reqMethod || 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Max-Age', '600');

    // Short-circuit preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return handler(req, res);
  };
}
