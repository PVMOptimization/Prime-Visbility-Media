const GHL = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'C9a6CIjRfnX4Lz0ROLD8';

// Your GHL custom field IDs
const FIELD_IDS = {
  trade: 'pAzBIGpFf8OzSIBtKkcm',
  companyName: 'cc7OT5KrOD2dvyqBla6h',
  owner: '6IxDOTFp1OSMwxS2U3fz',
  leadSources: 'HKGOApQZ98W9Mf6YJxBS',
  revenue: 'tMSwHtciMmbkUlewQgKN',
};

// Match GHL's exact characters: curly apostrophes and en dashes
const toGhlOption = (s) =>
  s.replace(/'/g, '\u2019').replace(/(\$\d+K)-(\$\d+K)/g, '$1\u2013$2');

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const ghlHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

// Status check: open /api/ghl-lead in your browser
export async function onRequestGet({ env }) {
  const status = { deployed: true, tokenSet: Boolean(env.GHL_TOKEN), ghlAcceptsToken: false };
  if (!env.GHL_TOKEN) return json(status);

  try {
    const r = await fetch(`${GHL}/locations/${LOCATION_ID}/customFields`, {
      headers: ghlHeaders(env.GHL_TOKEN),
    });
    status.ghlAcceptsToken = r.ok;
    if (!r.ok) status.ghlStatus = r.status;
  } catch {
    status.ghlStatus = 'unreachable';
  }
  return json(status);
}

export async function onRequestPost({ request, env }) {
  if (!env.GHL_TOKEN) {
    console.error('GHL_TOKEN is not set');
    return json({ error: 'Server not configured' }, 500);
  }

  let b = {};
  try {
    b = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  if (b.hp) return json({ ok: true }); // bot filled the honeypot

  const email = clean(b.email, 120).toLowerCase();
  const phone = /^\+1\d{10}$/.test(b.phone || '') ? b.phone : '';
  if (!email && !phone) return json({ error: 'Email or phone required' }, 400);

  const values = {
    trade: clean(b.trade),
    companyName: clean(b.companyName, 120),
    owner: b.owner ? toGhlOption(clean(b.owner)) : '',
    revenue: b.revenue ? toGhlOption(clean(b.revenue)) : '',
    leadSources: Array.isArray(b.leadSources)
      ? b.leadSources.map((x) => toGhlOption(clean(x))).filter(Boolean).slice(0, 10)
      : [],
  };

  const customFields = Object.entries(FIELD_IDS).flatMap(([key, id]) => {
    const v = values[key];
    if (Array.isArray(v)) return v.length ? [{ id, field_value: v }] : [];
    return v ? [{ id, field_value: v }] : [];
  });

  const contact = {
    locationId: LOCATION_ID,
    firstName: clean(b.firstName, 60) || undefined,
    lastName: clean(b.lastName, 60) || undefined,
    email: email || undefined,
    phone: phone || undefined,
    companyName: values.companyName || undefined,
    source: 'Growth Pipeline Funnel',
    customFields: customFields.length ? customFields : undefined,
  };

  const headers = ghlHeaders(env.GHL_TOKEN);

  try {
    const r = await fetch(`${GHL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contact),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('GHL upsert failed', r.status, JSON.stringify(data));
      return json({ error: 'Upsert failed', ghlStatus: r.status, ghlMessage: data?.message }, 502);
    }

    const id = data?.contact?.id;
    if (id) {
      const complete = b.stage === 'complete';
      const tags = [complete ? 'funnel-complete' : 'funnel-partial'];
      if (b.smsTransactional === true) tags.push('sms-consent-transactional');
      if (b.smsMarketing === true) tags.push('sms-consent-marketing');

      const tagRes = await fetch(`${GHL}/contacts/${id}/tags`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ tags }),
      });
      if (!tagRes.ok) console.error('GHL add tags failed', tagRes.status);

      if (complete) {
        await fetch(`${GHL}/contacts/${id}/tags`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({ tags: ['funnel-partial'] }),
        });
      }
    }

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: 'Server error' }, 500);
  }
}
