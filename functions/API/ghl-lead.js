const GHL = 'https://services.leadconnectorhq.com';

// Custom field IDs from GHL (see setup step 3)
const FIELDS = {
  trade: process.env.GHL_FIELD_TRADE,
  owner: process.env.GHL_FIELD_OWNER,
  leadSources: process.env.GHL_FIELD_LEAD_SOURCES,
  revenue: process.env.GHL_FIELD_REVENUE,
};

const headers = () => ({
  Authorization: `Bearer ${process.env.GHL_TOKEN}`,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let b = req.body;
  if (typeof b === 'string') {
    try { b = JSON.parse(b); } catch { b = {}; }
  }
  b = b || {};

  if (b.hp) return res.status(200).json({ ok: true }); // bot filled the honeypot

  const email = clean(b.email, 120).toLowerCase();
  const phone = /^\+1\d{10}$/.test(b.phone || '') ? b.phone : '';
  if (!email && !phone) return res.status(400).json({ error: 'Email or phone required' });

  const customFields = Object.entries(FIELDS).flatMap(([key, id]) => {
    if (!id) return [];
    const v = b[key];
    if (Array.isArray(v)) {
      const arr = v.map((x) => clean(x)).filter(Boolean).slice(0, 10);
      return arr.length ? [{ id, field_value: arr }] : [];
    }
    const s = clean(v);
    return s ? [{ id, field_value: s }] : [];
  });

  const contact = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: clean(b.firstName, 60) || undefined,
    lastName: clean(b.lastName, 60) || undefined,
    email: email || undefined,
    phone: phone || undefined,
    companyName: clean(b.companyName, 120) || undefined,
    source: 'Growth Pipeline Funnel',
    customFields: customFields.length ? customFields : undefined,
  };

  try {
    const r = await fetch(`${GHL}/contacts/upsert`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(contact),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('GHL upsert failed', r.status, data);
      return res.status(502).json({ error: 'Upsert failed' });
    }

    const id = data?.contact?.id;
    if (id) {
      const complete = b.stage === 'complete';
      await fetch(`${GHL}/contacts/${id}/tags`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ tags: [complete ? 'funnel-complete' : 'funnel-partial'] }),
      });
      if (complete) {
        await fetch(`${GHL}/contacts/${id}/tags`, {
          method: 'DELETE',
          headers: headers(),
          body: JSON.stringify({ tags: ['funnel-partial'] }),
        });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
