import { withCors } from '../lib/cors';

const customers = [
  {
    id: 1, type: 'landlord', name: 'Bob Johnson',
    phone: '(209) 555-3322', email: 'bob.j@gmail.com',
    addresses: [
      { id: 101, line1: '1234 Maple St',  city: 'Stockton', state: 'CA', zip: '95204', nickname: 'Main Home', sitePOC: { name: 'Bob Johnson', phone: '(209) 555-3322' } },
      { id: 102, line1: '1098 Adams Blvd',city: 'Stockton', state: 'CA', zip: '95209', nickname: 'Rental #2', sitePOC: { name: 'Sarah Mendez', phone: '(925) 555-2011' } },
      { id: 103, line1: '5516 Oakwood Dr',city: 'Stockton', state: 'CA', zip: '95207', nickname: 'Rental #3', sitePOC: { name: '—', phone: '' } },
    ]
  },
  {
    id: 2, type: 'business', name: 'Jack in the Box – Pacific Ave',
    phone: '(209) 555-8899', email: 'manager@jackpac.com',
    addresses: [
      { id: 201, line1: '3001 Pacific Ave', city: 'Stockton', state: 'CA', zip: '95204', nickname: 'Store #118', sitePOC: { name: 'Shift Manager', phone: '(209) 555-1180' } },
    ]
  }
];

function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ customers });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
export default withCors(handler);
