import { withCors } from '../lib/cors';

function handler(req, res) {
  res.status(200).json({ service: 'Compliance API', ok: true });
}

export default withCors(handler);
