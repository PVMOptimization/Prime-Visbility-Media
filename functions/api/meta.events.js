const API_VERSION_DEFAULT = 'v23.0';
const ALLOWED_EVENTS = new Set(['Lead', 'CompleteRegistration', 'Schedule', 'ViewContent', 'Contact']);

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const str = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const sha256 = async (value) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const parseCookies = (header) => {
  const out = {};
  (header || '').split(/;\s*/).forEach((part) => {
    const i = part.indexOf('=');
    if (i < 1) return;
    const key = part.slice(0, i);
    try {
      out[key] = decodeURIComponent(part.slice(i + 1));
    } catch {
      out[key] = part.slice(i + 1);
    }
  });
  return out;
};

const cleanCustom = (c) => {
  const out = {};
  if (!c || typeof c !== 'object') return out;
  Object.entries(c).slice(0, 10).forEach(([k, v]) => {
    if (typeof v === 'number' && Number.isFinite(v)) out[k] = v;
    else if (typeof v === 'string' && v) out[k] = v.slice(0, 200);
  });
  return out;
};

// Status check: open /api/meta-event in your browser
export async function onRequestGet({ env }) {
  return json({
    deployed: true,
    pixelIdSet: Boolean(env.META_PIXEL_ID),
    tokenSet: Boolean(env.META_CAPI_TOKEN),
    testMode: Boolean(env.META_TEST_EVENT_CODE),
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.META_PIXEL_ID || !env.META_CAPI_TOKEN) {
    return json({ skipped: 'Meta Conversions API not configured' });
  }

  let b = {};
  try {
    b = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const eventName = str(b.eventName, 50);
  if (!ALLOWED_EVENTS.has(eventName)) return json({ error: 'Event not allowed' }, 400);

  const cookies = parseCookies(request.headers.get('Cookie'));
  const u = b.user && typeof b.user === 'object' ? b.user : {};

  const userData = {
    client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
    client_user_agent: request.headers.get('User-Agent') || undefined,
    fbp: str(b.fbp) || cookies._fbp || undefined,
    fbc: str(b.fbc) || cookies._fbc || undefined,
    country: [await sha256('us')],
  };

  const email = str(u.email, 120).toLowerCase();
  if (email.includes('@')) {
    const hashed = await sha256(email);
    userData.em = [hashed];
    userData.external_id = [hashed];
  }

  let phone = str(u.phone, 20).replace(/\D/g, '');
  if (phone.length === 10) phone = `1${phone}`;
  if (phone.length === 11) userData.ph = [await sha256(phone)];

  const firstName = str(u.firstName, 60).toLowerCase();
  if (firstName) userData.fn = [await sha256(firstName)];
  const lastName = str(u.lastName, 60).toLowerCase();
  if (lastName) userData.ln = [await sha256(lastName)];

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: str(b.eventId, 100) || undefined,
    action_source: 'website',
    event_source_url: str(b.eventSourceUrl, 1000) || undefined,
    user_data: userData,
    custom_data: cleanCustom(b.custom),
  };

  const payload = { data: [event] };
  if (env.META_TEST_EVENT_CODE) payload.test_event_code = env.META_TEST_EVENT_CODE;

  const version = env.META_API_VERSION || API_VERSION_DEFAULT;
  const url = `https://graph.facebook.com/${version}/${env.META_PIXEL_ID}/events?access_token=${encodeURIComponent(env.META_CAPI_TOKEN)}`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('Meta CAPI error', r.status, JSON.stringify(d));
      return json({ error: 'Meta rejected the event', metaMessage: d?.error?.message }, 502);
    }
    return json({ ok: true, received: d.events_received });
  } catch (err) {
    console.error(err);
    return json({ error: 'Server error' }, 500);
  }
}
