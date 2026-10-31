// Trade-specific landing pages: add ?trade=roofing (or remodeling, epoxy, courts) to any ad link.
// The trade is remembered for the visit, so /how-it-works -> /growth-pipeline keeps it.

export const TRADES = {
  roofing: {
    slug: 'roofing',
    pill: 'For Roofing Contractors Only',
    who: 'roofing contractors',
    estimate: 'Roof',
    formOption: 'Roofing',
  },
  remodeling: {
    slug: 'remodeling',
    pill: 'For Remodelers Only',
    who: 'remodelers',
    estimate: 'Remodel',
    formOption: 'Remodeling / Construction',
  },
  epoxy: {
    slug: 'epoxy',
    pill: 'For Epoxy & Floor Coating Companies',
    who: 'epoxy and floor coating companies',
    estimate: 'Garage Floor',
    formOption: 'Epoxy / floor coatings',
  },
  courts: {
    slug: 'courts',
    pill: 'For Pickleball & Tennis Court Builders',
    who: 'pickleball and tennis court builders',
    estimate: 'Court',
    formOption: 'Sport courts (pickleball / tennis)',
  },
};

const ALIASES = {
  roof: 'roofing', roofer: 'roofing', roofers: 'roofing',
  remodel: 'remodeling', remodeler: 'remodeling', remodelers: 'remodeling',
  coatings: 'epoxy', flooring: 'epoxy', floors: 'epoxy',
  court: 'courts', pickleball: 'courts', tennis: 'courts',
};

const KEY = 'pv_trade';

export function getTrade() {
  if (typeof window === 'undefined') return null;
  let slug = '';
  try {
    slug = (new URLSearchParams(window.location.search).get('trade') || '').toLowerCase().trim();
  } catch {
    slug = '';
  }
  slug = ALIASES[slug] || slug;
  if (TRADES[slug]) {
    try { sessionStorage.setItem(KEY, slug); } catch { /* storage blocked */ }
    return TRADES[slug];
  }
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved && TRADES[saved]) return TRADES[saved];
  } catch { /* storage blocked */ }
  return null;
}
