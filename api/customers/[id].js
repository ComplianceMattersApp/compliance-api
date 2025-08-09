import { withCors } from '../../lib/cors';
import { customers, nextAddressId } from './index';

function handler(req, res) {
  const id = parseInt(req.query.id, 10);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ customer });
  }

  if (req.method === 'PATCH') {
    // Partial update of top-level fields or add an address
    const { type, name, phone, email, notes, addAddress, updateAddress } = req.body || {};

    if (typeof type === 'string') customer.type = type;
    if (typeof name === 'string') customer.name = name;
    if (typeof phone === 'string') customer.phone = phone;
    if (typeof email === 'string') customer.email = email;
    if (typeof notes === 'string') customer.notes = notes;

    // Add a new property/site
    if (addAddress && typeof addAddress === 'object') {
      const newAddr = {
        id: nextAddressId(),
        label: addAddress.label || '',
        street: addAddress.street || '',
        city: addAddress.city || '',
        state: addAddress.state || '',
        zip: addAddress.zip || '',
        sitePoc: addAddress.sitePoc || { name: '', phone: '', email: '' },
        notes: addAddress.notes || ''
      };
      customer.addresses = customer.addresses || [];
      customer.addresses.push(newAddr);
    }

    // Update an existing address by addressId
    if (updateAddress && typeof updateAddress === 'object' && updateAddress.id) {
      const idx = (customer.addresses || []).findIndex(a => a.id === updateAddress.id);
      if (idx >= 0) {
        customer.addresses[idx] = {
          ...customer.addresses[idx],
          ...updateAddress,
          // keep a sane structure if partial fields are missing
          sitePoc: {
            ...(customer.addresses[idx].sitePoc || { name: '', phone: '', email: '' }),
            ...(updateAddress.sitePoc || {})
          }
        };
      } else {
        return res.status(400).json({ error: 'updateAddress.id not found on this customer' });
      }
    }

    return res.status(200).json({ customer });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withCors(handler);
