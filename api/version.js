import { withCors } from '../lib/cors';

function handler(req, res) {
  res.status(200).json({ version: 'v0.1', env: 'production' });
}

export default withCors(handler);
