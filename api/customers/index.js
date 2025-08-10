import { withCors } from '../../lib/cors';

// --- mock data ---
let customers = [
  {
    id: 1,
    type: 'landlord',
    name: 'Bob Johnson',
    phone: '(209) 555-3322',
    email: 'bob.j@gmail.com',
    notes: '',
    addresses: [
      {
        id: 101,
        label: 'Main Home',
        street: '1234 Maple St',
        city: 'Stockton',
        state: 'CA',
        zip: '95204',
        sitePoc: { name: 'Bob Johnson', phone: '(209) 555-3322', email: 'bob.j@gmail.com' },
        notes: ''
      },
      {
        id: 103,
        label: 'Rental #2',
        street: '1098 Adams Blvd',
        city: 'Stockton',
        state: 'CA',
        zip: '95209',
        sitePoc: { name: 'Sarah Mendez', phone: '(925) 555-2011', email: 'sarah@example.com' },
        notes: 'Call ahead. Two dogs on site.'
      }
    ]
  }
];

function nextCustomerId() {
  return customers.reduce((m, c) => Math.max(m, c.id), 0) + 1;
}
function nextAddressId() {
  const all = customers.flatMap(c => c.addresses || []);
  return all.reduce((m, a) => Math.max(m, a.id), 0) + 1;
}

function handler(req, res) {
  if (req.method === 'GET') {
    if (req.method === 'GET') {
  return res.status(200).json({ customers, supportsPost: true });
}

    return res.status(200).json({ customers });
  }

  if (req.method === 'POST') {
    const { type, name, phone = '', email = '', notes = '', addresses = [] } = req.body || {};
    if (!type || !name) return res.status(400).json({ error: 'type and name are required' });

    const preparedAddresses = (addresses || []).map(a => ({
      id: nextAddressId(),
      label: a.label || '',
      street: a.street || '',
      city: a.city || '',
      state: a.state || '',
      zip: a.zip || '',
      sitePoc: a.sitePoc || { name: '', phone: '', email: '' },
      notes: a.notes || ''
    }));

    const newCustomer = {
      id: nextCustomerId(),
      type,
      name,
      phone,
      email,
      notes,
      addresses: preparedAddresses
    };

    customers.push(newCustomer);
    return res.status(201).json({ customer: newCustomer });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withCors(handler);
export { customers, nextAddressId };
