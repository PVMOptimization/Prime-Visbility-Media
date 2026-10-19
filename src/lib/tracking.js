// Meta Pixel + Conversions API helpers, and ad attribution capture

const ATTR_KEY = 'pv_attr';
const USER_KEY = 'pv_user';
const SCHEDULE_KEY = 'pv_schedule_fired';
const ATTR_TTL = 30 * 24 * 60 * 60 * 1000; // keep ad attribution for 30 days
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const read = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};

const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked */
  }
};

const readCookie = (name) => {
  if (typeof document === 'undefined') return '';
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!m) return '';
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
};

// Run on every page: saves UTMs and the Facebook click ID when they're in the URL
export function captureAttribution() {
  if (typeof window === 'undefined') return;
  const q = new URLSearchParams(window.location.search);
  const found = {};

  UTM_KEYS.forEach((k) => {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 200);
  });

  const fbclid = q.get('fbclid');
  if (fbclid) {
    found.fbclid = fbclid.slice(0, 500);
    found.fbclidAt = Date.now();
  }

  if (!Object.keys(found).length) return;

  const prev = read(ATTR_KEY) || {};
  write(ATTR_KEY, {
    ...prev,
    ...found,
    landingPage: window.location.pathname,
    capturedAt: Date.now(),
  });
}

export function getAttribution() {
  const a = read(ATTR_KEY);
  if (!a || !a.capturedAt || Date.now() - a.capturedAt > ATTR_TTL) return {};
  const out = {};
  [...UTM_KEYS, 'fbclid', 'landingPage'].forEach((k) => {
    if (a[k]) out[k] = a[k];
  });
  return out;
}

// Facebook click cookie, rebuilt from the saved click ID if the pixel was blocked
function getFbc() {
  const cookie = readCookie('_fbc');
  if (cookie) return cookie;
  const a = read(ATTR_KEY);
  if (a && a.fbclid && a.capturedAt && Date.now() - a.capturedAt <= ATTR_TTL) {
    return `fb.1.${a.fbclidAt || a.capturedAt}.${a.fbclid}`;
  }
  return '';
}

const newEventId = (name) =>
  `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export function trackPageView() {
  try {
    if (window.fbq) window.fbq('track', 'PageView');
  } catch {
    /* ignore */
  }
}

// Sends the event from the browser (Pixel) and the server (Conversions API)
// with the same ID so Meta counts it once
export function trackEvent(name, { user = {}, custom = {} } = {}) {
  const eventId = newEventId(name);

  try {
    if (window.fbq) window.fbq('track', name, custom, { eventID: eventId });
  } catch {
    /* ignore */
  }

  const body = {
    eventName: name,
    eventId,
    eventSourceUrl: window.location.href,
    fbp: readCookie('_fbp'),
    fbc: getFbc(),
    user: {
      email: user.email || '',
      phone: user.phone || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
    custom,
  };

  fetch('/api/meta-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});

  return eventId;
}

// Remembers who filled out the form so the thank-you page can match the booking
export const saveUser = (u) => write(USER_KEY, { ...u, savedAt: Date.now() });
export const getUser = () => read(USER_KEY);

// Prevents counting the same booking twice if the thank-you page is refreshed
export function shouldFireSchedule() {
  const last = read(SCHEDULE_KEY);
  if (last && Date.now() - last < 30 * 60 * 1000) return false;
  write(SCHEDULE_KEY, Date.now());
  return true;
}
