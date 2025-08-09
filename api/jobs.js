import { withCors } from '../lib/cors';

// Mock data (resets on deploy). We'll swap for a DB later.
let jobs = [
  { id: 124, customerId: 1, addressId: 101, title: 'AC Repair',     status: 'Completed',     tech: 'Gigi C.', createdAt: '2025-07-10T09:35:00Z', notes: 'Blower replaced' },
  { id: 130, customerId: 1, addressId: 103, title: 'No Cooling',     status: 'Awaiting Part', tech: 'Luis M.', createdAt: '2025-07-29T10:00:00Z', notes: 'Fan board on order' },
  { id: 135, customerId: 2, addressId: 201, title: 'PM Visit',       status: 'Scheduled',     tech: 'Gigi C.', createdAt: '2025-08-08T14:00:00Z', notes: 'Routine check' },
];

function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // Optional filters: ?status=Completed&customerId=1
    const { status, customerId } = req.query || {};
    let out = jobs;
    if (status) out = out.filter(j => j.status === status);
    if (customerId) out = out.filter(j => String(j.customerId) === String(customerId));
    return res.status(200).json({ jobs: out });
  }

  if (method === 'POST') {
    const body = req.body || {};
    const nextId = (jobs.length ? Math.max(...jobs.map(j => j.id)) : 100) + 1;
    const newJob = {
      id: nextId,
      customerId: body.customerId ?? 1,
      addressId: body.addressId ?? 101,
      title: body.title ?? 'Untitled Job',
      status: body.status ?? 'Scheduled',
      tech: body.tech ?? 'Unassigned',
      notes: body.notes ?? '',
      createdAt: new Date().toISOString(),
    };
    jobs.push(newJob);
    return res.status(201).json({ job: newJob });
  }

  if (method === 'PATCH') {
    const { id, status, notes, tech } = req.body || {};
    const job = jobs.find(j => j.id === Number(id));
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (status) job.status = status;
    if (typeof notes === 'string') job.notes = notes;
    if (typeof tech === 'string') job.tech = tech;
    return res.status(200).json({ job });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withCors(handler);
