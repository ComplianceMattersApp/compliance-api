import { withCors } from '../lib/cors';

// in-memory placeholder so we can see end-to-end flow
const jobs = [
  { id: 124, address: '1098 Adams Blvd', status: 'Completed', tech: 'Gigi C.' },
  { id: 130, address: '5516 Oakwood Dr', status: 'Awaiting Part', tech: 'Luis M.' },
  { id: 135, address: '1234 Maple St',   status: 'Scheduled',     tech: 'Gigi C.' },
];

function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ jobs });
  }

  if (req.method === 'POST') {
    // minimal “create” just to prove POST works
    const body = req.body || {};
    const nextId = Math.max(...jobs.map(j => j.id)) + 1;
    const newJob = { id: nextId, address: body.address || 'Unknown', status: body.status || 'Scheduled', tech: body.tech || 'Unassigned' };
    jobs.push(newJob);
    return res.status(201).json({ job: newJob });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withCors(handler);
