const DEFAULT_ALLOWED = [
  'https://app.compliancemattersca.com',
  'http://localhost:3000',
  /\.vercel\.app$/
];

export function withCors(handler, options = {}) {
  const allowed = options.allowedOrigins || DEFAULT_ALLOWED;

  return async (req, res) => {
    const origin = req.headers.origin || '';

    let isAllowed = false;
    for (const rule of allowed) {
      if (typeof rule === 'string' && origin === rule) { isAllowed = true; break; }
      if (rule instanceof RegExp && rule.test(origin)) { isAllowed = true; break; }
    }

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      // res.setHeader('Access-Control-Allow-Credentials', 'true'); // enable later if needed
    }

    const reqHeaders = req.headers['access-control-request-headers'];
    const reqMethod  = req.headers['access-control-request-method'];

    res.setHeader('Access-Control-Allow-Headers', reqHeaders || 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', reqMethod || 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    // inside if (req.method === 'GET') ...
    return res.status(200).json({ customers, supportsPost: true });

    res.setHeader('Access-Control-Max-Age', '600');
    
    // echo preflight requests if provided, else fall back to defaults
    const reqHeaders = req.headers['access-control-request-headers'];
    const reqMethod  = req.headers['access-control-request-method'];

    res.setHeader('Access-Control-Allow-Headers', reqHeaders || 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', reqMethod || 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Max-Age', '600');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return handler(req, res);
  };
}
