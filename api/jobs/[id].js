import { withCors } from '../../lib/cors';

// quick shared array to keep parity with /api/jobs during a single runtime
// (Vercel may cold start; for now this is OK for mock data)
let jobs = globalThis.__demoJobs || (globalThis.__demoJobs = [
  { id: 124, customerId: 1, addressId: 101, title: 'AC Repair', status: 'Completed', tech: 'Gigi C.', createdAt: '2025-07-10T09:35:00Z', notes: 'Blower replaced' },
  { id: 130, customerId: 1, addressId: 103, title: 'No Cooling', status: 'Awaiting Part', tech: 'Luis M.', createdAt: '2025-07-29T10:00:00Z', notes: 'Fan board on order' },
  { id: 135, customerId: 2, addressId: 201, title: 'PM Visit',   status: 'Scheduled', tech: 'Gigi C.', createdAt: '2025-08-08T14:00:00Z', notes: 'Routine check' },
]);

function handler(req, res) {
  const id = Number(req.query.id);
  const job = jobs.find(j => j.id === id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  if (req.method === 'GET') return res.status(200).json({ job });

  if (req.method === 'PATCH') {
    const { status, notes, tech } = req.body || {};
    if (status) job.status = status;
    if (typeof notes === 'string') job.notes = notes;
    if (typeof tech === 'string') job.tech = tech;
    return res.status(200).json({ job });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
export default withCors(handler);
