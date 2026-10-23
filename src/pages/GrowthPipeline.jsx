import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CornerDownLeft, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { getAttribution, saveUser, trackEvent } from '../lib/tracking';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const LEAD_ENDPOINT = '/api/ghl-lead';
const CALENDAR_BASE = 'https://api.leadconnectorhq.com/widget/booking/XYCZxuPXEBa1m4bgduDQ';
const CALENDAR_IFRAME_ID = 'XYCZxuPXEBa1m4bgduDQ_1792367936138';
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';
const PRECONNECT_HOSTS = ['https://api.leadconnectorhq.com', 'https://link.msgsndr.com'];
const GHL_ORIGINS = ['leadconnectorhq.com', 'msgsndr.com', 'gohighlevel.com', 'highlevel.com'];
const DEFAULT_CAL_HEIGHT = 950;
const MIN_CAL_HEIGHT = 700;

const BUSINESS_NAME = 'Prime Visibility Media';
const FUNNEL_NAME = 'Growth Pipeline Funnel';
const GUARANTEE_TEXT = '15 qualified appointments in 30 days or a full refund';
const PRIVACY_URL = '/privacy-policy';
const TERMS_URL = '/terms';

const OWNER_OPTIONS = ["Yes, I'm the owner", "I'm a partner / co-owner", 'No, I manage marketing or sales'];
const LEAD_OPTIONS = [
  'Word of mouth / referrals',
  'Google (Ads or Maps)',
  'Facebook / Instagram ads',
  'Lead services (Angi, HomeAdvisor, Thumbtack, etc.)',
  'Door knocking / canvassing',
  'Another marketing agency',
  'Other',
];
const REVENUE_OPTIONS = ['Under $25K', '$25K-$50K', '$50K-$100K', '$100K-$250K', '$250K+'];

const STEPS = [
  { id: 'name', kind: 'name', title: () => "First things first. What's your name?", sub: 'Takes about 60 seconds.' },
  {
    id: 'email', kind: 'input', type: 'email', inputMode: 'email', autoComplete: 'email',
    placeholder: 'you@company.com',
    title: (d) => `Nice to meet you, ${d.firstName.trim() || 'there'}. What's your best email?`,
  },
  {
    id: 'phone', kind: 'phone', type: 'tel', inputMode: 'tel', autoComplete: 'tel-national',
    placeholder: '(817) 555-1234',
    title: () => "What's the best number to reach you?",
    sub: "We'll text you a confirmation and reminder.",
  },
  { id: 'trade', kind: 'input', type: 'text', placeholder: 'e.g. Roofing, HVAC, Remodeling', title: () => 'What trade are you in?' },
  {
    id: 'companyName', kind: 'input', type: 'text', autoComplete: 'organization', placeholder: 'Company name',
    title: (d) => `What's your company name${d.firstName.trim() ? `, ${d.firstName.trim()}` : ''}?`,
  },
  { id: 'owner', kind: 'single', options: OWNER_OPTIONS, title: () => 'Are you the owner or decision maker?' },
  { id: 'leadSources', kind: 'multi', options: LEAD_OPTIONS, title: () => 'How are you getting leads right now?', sub: 'Select all that apply.' },
  { id: 'revenue', kind: 'single', options: REVENUE_OPTIONS, title: () => 'How much revenue is your company doing per month?', sub: 'Last one!' },
];

const ERRORS = {
  name: 'Add your first and last name.',
  email: "That email doesn't look right.",
  phone: 'Enter a 10-digit phone number.',
  trade: 'Tell us your trade.',
  companyName: 'Add your company name.',
  owner: 'Pick one.',
  leadSources: 'Pick at least one.',
  revenue: 'Pick one.',
};

const REWARDS = ['Nice!', 'Locked in', 'Great answer', 'Perfect', 'Got it', "You're flying"];

const INITIAL = {
  firstName: '', lastName: '', email: '', phone: '', trade: '',
  companyName: '', owner: '', leadSources: [], revenue: '',
  smsTransactional: false, smsMarketing: false, hp: '',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const digits = (s) => String(s || '').replace(/\D/g, '');
const normPhone = (s) => {
  let d = digits(s);
  if (d.length === 11 && d[0] === '1') d = d.slice(1);
  return d;
};
const formatPhone = (v) => {
  let d = digits(v);
  if (d.length > 10 && d[0] === '1') d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};
const e164 = (s) => {
  const p = normPhone(s);
  return p.length === 10 ? `+1${p}` : '';
};
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s).trim());

const isValid = (step, d) => {
  switch (step.id) {
    case 'name': return d.firstName.trim().length > 0 && d.lastName.trim().length > 0;
    case 'email': return isEmail(d.email);
    case 'phone': return normPhone(d.phone).length === 10;
    case 'leadSources': return d.leadSources.length > 0;
    default: return String(d[step.id] || '').trim().length > 0;
  }
};

const userFrom = (d) => ({
  email: d.email.trim().toLowerCase(),
  phone: e164(d.phone),
  firstName: d.firstName.trim(),
  lastName: d.lastName.trim(),
});

const buildPayload = (d, stage) => ({
  stage,
  hp: d.hp,
  firstName: d.firstName.trim(),
  lastName: d.lastName.trim(),
  email: d.email.trim().toLowerCase(),
  phone: e164(d.phone),
  trade: d.trade.trim(),
  companyName: d.companyName.trim(),
  owner: d.owner,
  leadSources: d.leadSources,
  revenue: d.revenue,
  smsTransactional: d.smsTransactional,
  smsMarketing: d.smsMarketing,
  attribution: getAttribution(),
});

const buildCalendarSrc = (d) => {
  const params = new URLSearchParams();
  if (d.firstName.trim()) params.set('first_name', d.firstName.trim());
  if (d.lastName.trim()) params.set('last_name', d.lastName.trim());
  if (d.email.trim()) params.set('email', d.email.trim());
  const phone = e164(d.phone);
  if (phone) params.set('phone', phone);
  const qs = params.toString();
  return qs ? `${CALENDAR_BASE}?${qs}` : CALENDAR_BASE;
};

// Pulls a height value out of whatever message format GHL's widget sends
const findHeight = (raw) => {
  let d = raw;
  if (typeof d === 'string') {
    try { d = JSON.parse(d); } catch { return null; }
  }
  const pick = (v) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return typeof n === 'number' && Number.isFinite(n) && n > 200 && n < 6000 ? n : null;
  };
  if (Array.isArray(d)) {
    for (const item of d) {
      const h = pick(item) ?? (item && typeof item === 'object' ? pick(item.height) : null);
      if (h) return h;
    }
    return null;
  }
  if (d && typeof d === 'object') {
    return pick(d.height) ?? pick(d.data?.height) ?? pick(d.iframeHeight) ?? pick(d.frameHeight) ?? null;
  }
  return null;
};

const sendLead = (payload) =>
  fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});

const progressFor = (phase, step) => {
  if (phase === 'calendar') return 94;
  if (phase === 'unlocking') return 90;
  return Math.round(12 + (step / (STEPS.length - 1)) * 72);
};

const labelFor = (phase, step) => {
  if (phase === 'calendar') return 'Final step: pick your time';
  if (phase === 'unlocking') return 'Unlocking your calendar';
  if (step === 0) return "Let's go";
  if (step >= STEPS.length - 2) return 'Almost there';
  return 'Checking your fit';
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const css = `
.pv-root{font-family:'Switzer',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}

@keyframes pv-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes pv-in-r{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}
@keyframes pv-in-l{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}
.pv-step{animation:pv-in-r .45s cubic-bezier(.2,.7,.2,1) both}
.pv-step-back{animation:pv-in-l .45s cubic-bezier(.2,.7,.2,1) both}

@keyframes pv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.pv-opt{animation:pv-in .45s cubic-bezier(.2,.7,.2,1) both,pv-float 4.5s ease-in-out infinite}

@keyframes pv-pop{0%{transform:scale(1)}40%{transform:scale(1.04)}100%{transform:scale(1)}}
.pv-pop{animation:pv-pop .32s cubic-bezier(.2,.7,.2,1)}

@keyframes pv-check-pop{0%{transform:scale(.5)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
.pv-check-pop{animation:pv-check-pop .28s cubic-bezier(.2,.7,.2,1)}

@keyframes pv-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
.pv-shake{animation:pv-shake .35s}

.pv-bar{background:linear-gradient(90deg,#3b82f6,#22d3ee);box-shadow:0 0 18px rgba(34,211,238,.55);transition:width .7s cubic-bezier(.2,.7,.2,1)}
.pv-bar::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);transform:translateX(-100%);animation:pv-shimmer 2.2s ease-in-out infinite}
@keyframes pv-shimmer{to{transform:translateX(100%)}}

@keyframes pv-confetti{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--x),calc(var(--y) + 60px)) rotate(var(--r))}}
.pv-confetti{animation:pv-confetti .9s cubic-bezier(.15,.6,.3,1) both}

@keyframes pv-reward{0%{opacity:0;transform:translateY(8px) scale(.9)}20%{opacity:1;transform:translateY(0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-14px)}}
.pv-reward{animation:pv-reward 1.1s ease-out both}

@keyframes pv-breathe{0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,.45)}50%{box-shadow:0 0 0 8px rgba(34,211,238,0)}}
.pv-ready{animation:pv-breathe 1.8s ease-in-out infinite}

@keyframes pv-orb{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-20px)}}
.pv-orb{animation:pv-orb 14s ease-in-out infinite}

@keyframes pv-lock{0%,100%{transform:scale(1) rotate(0)}30%{transform:scale(1.12) rotate(-8deg)}60%{transform:scale(1.12) rotate(8deg)}}
.pv-lock{animation:pv-lock 1.1s ease-in-out infinite}

@media (prefers-reduced-motion:reduce){
  .pv-step,.pv-step-back,.pv-opt,.pv-pop,.pv-check-pop,.pv-shake,.pv-reward,.pv-ready,.pv-orb,.pv-lock,.pv-bar::after{animation:none!important}
  .pv-confetti{display:none}
}
`;

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

const CONFETTI_COLORS = ['#22d3ee', '#3b82f6', '#4f46e5', '#ffffff', '#67e8f9'];

const ConfettiBurst = ({ seed, big }) => {
  const parts = useMemo(() => {
    const n = big ? 34 : 16;
    return Array.from({ length: n }, (_, i) => {
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const r = (big ? 140 : 80) + Math.random() * 60;
      return {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r - 30,
        rot: Math.random() * 540 - 270,
        c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 4 + Math.random() * 5,
        d: Math.random() * 80,
      };
    });
  }, [seed, big]);

  if (!seed) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-28 z-20">
      {parts.map((p, i) => (
        <span
          key={i}
          className="pv-confetti absolute block rounded-[2px]"
          style={{
            '--x': `${p.x}px`, '--y': `${p.y}px`, '--r': `${p.rot}deg`,
            width: p.w, height: p.w * 0.6, background: p.c, animationDelay: `${p.d}ms`,
          }}
        />
      ))}
    </div>
  );
};

const Field = forwardRef(({ label, value, onChange, valid, prefix, ...rest }, ref) => (
  <div className="relative">
    {prefix && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 flex h-8 -translate-y-1/2 items-center border-r border-white/10 pl-4 pr-3 text-lg font-semibold text-cyan-300"
      >
        {prefix}
      </span>
    )}
    <input
      ref={ref}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={120}
      className={`h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-12 text-lg text-white outline-none transition-all placeholder:text-white/25 focus:border-cyan-300/70 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)] ${
        prefix ? 'pl-[4.25rem]' : 'pl-4'
      }`}
      {...rest}
    />
    <span
      aria-hidden="true"
      className={`absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-400 text-[#02050A] transition-all duration-300 ${
        valid ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}
    >
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  </div>
));
Field.displayName = 'Field';

const ConsentBox = ({ checked, onChange, children }) => (
  <label
    className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
      checked
        ? 'border-cyan-300/50 bg-cyan-400/[0.07]'
        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="peer sr-only"
    />
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-300 ${
        checked ? 'border-cyan-300 bg-cyan-400' : 'border-white/25 group-hover:border-blue-400/60'
      }`}
    >
      {checked && <Check key="on" className="pv-check-pop h-3.5 w-3.5 text-[#02050A]" strokeWidth={3.5} />}
    </span>
    <span className="text-[12.5px] leading-relaxed text-white/60">{children}</span>
  </label>
);

const OptionButton = ({ letter, label, selected, index, onClick }) => (
  <div className="pv-opt" style={{ animationDelay: `${index * 60}ms, ${0.45 + index * 0.3}s` }}>
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${
        selected
          ? 'pv-pop border-cyan-300/80 bg-cyan-400/10 text-white shadow-[0_0_30px_-8px_rgba(34,211,238,0.7)]'
          : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white hover:shadow-[0_10px_30px_-12px_rgba(59,130,246,0.6)]'
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors ${
          selected
            ? 'border-cyan-300 bg-cyan-400 text-[#02050A]'
            : 'border-white/15 text-white/50 group-hover:border-blue-400/60 group-hover:text-blue-300'
        }`}
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : letter}
      </span>
      <span className="flex-1">{label}</span>
    </button>
  </div>
);

// Sizes itself from GHL's height messages; scrolls internally as a fallback
const CalendarEmbed = ({ src, hidden }) => {
  const [height, setHeight] = useState(DEFAULT_CAL_HEIGHT);

  useEffect(() => {
    const onMessage = (e) => {
      if (!GHL_ORIGINS.some((o) => String(e.origin || '').includes(o))) return;
      const h = findHeight(e.data);
      if (h) setHeight(Math.max(MIN_CAL_HEIGHT, Math.ceil(h) + 32));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <iframe
      id={CALENDAR_IFRAME_ID}
      title="Book your call"
      src={src}
      allow="payment"
      scrolling="auto"
      tabIndex={hidden ? -1 : 0}
      style={{
        display: 'block',
        width: '100%',
        height: `${height}px`,
        minHeight: `${MIN_CAL_HEIGHT}px`,
        border: 'none',
        borderRadius: 16,
        transition: 'height .3s ease',
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GrowthPipeline() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [phase, setPhase] = useState('form'); // form | unlocking | calendar
  const [data, setData] = useState(INITIAL);
  const [error, setError] = useState('');
  const [reward, setReward] = useState(null);
  const [burst, setBurst] = useState({ n: 0, big: false });
  const [picked, setPicked] = useState(null);
  const [calSrc, setCalSrc] = useState('');

  const queue = useRef(Promise.resolve());
  const busy = useRef(false);
  const leadFired = useRef(false);
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const ready = isValid(current, data);
  const progress = progressFor(phase, step);
  const firstName = data.firstName.trim();
  const calendarVisible = phase === 'calendar';

  // On page load: scroll to top, warm up connections to GHL, load the embed script early
  useEffect(() => {
    window.scrollTo(0, 0);

    const links = PRECONNECT_HOSTS.map((href) => {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      l.crossOrigin = 'anonymous';
      document.head.appendChild(l);
      return l;
    });

    if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.src = EMBED_SCRIPT;
      s.async = true;
      document.body.appendChild(s);
    }

    return () => links.forEach((l) => l.remove());
  }, []);

  // Bring the calendar into view when it's revealed
  useEffect(() => {
    if (!calendarVisible) return undefined;
    const t = setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(t);
  }, [calendarVisible]);

  useEffect(() => { busy.current = false; }, [step]);

  useEffect(() => {
    if (phase !== 'form') return undefined;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 320);
    return () => clearTimeout(t);
  }, [step, phase]);

  useEffect(() => {
    if (!reward) return undefined;
    const t = setTimeout(() => setReward(null), 1100);
    return () => clearTimeout(t);
  }, [reward]);

  const set = (key, value) => {
    setData((d) => ({ ...d, [key]: value }));
    setError('');
  };

  // Requests go out one at a time so later answers never land before earlier ones
  const submit = (d, stage) => {
    const payload = buildPayload(d, stage);
    queue.current = queue.current.then(() => sendLead(payload));
  };

  const celebrate = (big = false) => {
    setReward({ id: Date.now(), text: REWARDS[Math.floor(Math.random() * REWARDS.length)] });
    setBurst((b) => ({ n: b.n + 1, big }));
    if (navigator.vibrate) navigator.vibrate(big ? [20, 40, 20] : 12);
  };

  const advance = (d = data) => {
    if (!isValid(current, d)) {
      setError(ERRORS[current.id]);
      return;
    }

    // From the email step onward, every answer is saved to GHL
    if (step >= 1) {
      submit(d, isLast ? 'complete' : 'partial');
      saveUser(userFrom(d));
    }

    // Meta: Lead fires once, as soon as we have their email
    if (step === 1 && !leadFired.current) {
      leadFired.current = true;
      trackEvent('Lead', { user: userFrom(d), custom: { content_name: FUNNEL_NAME } });
    }

    celebrate(isLast);

    // Start loading the calendar in the background once we have name, email and phone
    if (current.id === 'phone') setCalSrc(buildCalendarSrc(d));

    if (isLast) {
      // Meta: all questions answered
      trackEvent('CompleteRegistration', {
        user: userFrom(d),
        custom: { content_name: FUNNEL_NAME, status: d.revenue },
      });

      // Only reloads the calendar if they went back and changed their contact info
      const fresh = buildCalendarSrc(d);
      setCalSrc((s) => (s === fresh ? s : fresh));
      setPhase('unlocking');
      setTimeout(() => setPhase('calendar'), 1500);
      return;
    }
    setDir(1);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) return;
    setDir(-1);
    setError('');
    setPicked(null);
    setStep((s) => s - 1);
  };

  const choose = (opt) => {
    if (busy.current) return;
    busy.current = true;
    const d = { ...data, [current.id]: opt };
    setData(d);
    setPicked(opt);
    setError('');
    setTimeout(() => advance(d), 380);
  };

  const toggle = (opt) => {
    const arr = data[current.id];
    set(current.id, arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
    if (navigator.vibrate) navigator.vibrate(8);
  };

  // Keyboard shortcuts for choice questions: A, B, C... and Enter
  useEffect(() => {
    if (phase !== 'form') return undefined;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.metaKey || e.ctrlKey || e.altKey) return;
      const s = STEPS[step];
      if (s.kind !== 'single' && s.kind !== 'multi') return;
      const i = e.key.length === 1 ? e.key.toUpperCase().charCodeAt(0) - 65 : -1;
      if (i >= 0 && i < s.options.length) {
        e.preventDefault();
        if (s.kind === 'single') choose(s.options[i]);
        else toggle(s.options[i]);
      } else if (e.key === 'Enter' && s.kind === 'multi') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const renderBody = () => {
    switch (current.kind) {
      case 'name':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              ref={inputRef} label="First name" placeholder="First name" autoComplete="given-name"
              enterKeyHint="next" value={data.firstName} valid={data.firstName.trim().length > 0}
              onChange={(v) => set('firstName', v)}
            />
            <Field
              label="Last name" placeholder="Last name" autoComplete="family-name"
              enterKeyHint="next" value={data.lastName} valid={data.lastName.trim().length > 0}
              onChange={(v) => set('lastName', v)}
            />
          </div>
        );
      case 'phone':
        return (
          <div className="grid gap-3">
            <Field
              ref={inputRef}
              label="Phone number"
              prefix="+1"
              type="tel"
              inputMode="tel"
              autoComplete={current.autoComplete}
              placeholder={current.placeholder}
              enterKeyHint="next"
              value={data.phone}
              valid={ready}
              onChange={(v) => set('phone', formatPhone(v))}
            />
            <div className="mt-2 grid gap-2.5">
              <ConsentBox checked={data.smsTransactional} onChange={(v) => set('smsTransactional', v)}>
                I consent to receive non-marketing text messages from {BUSINESS_NAME} about my appointment and account. Message frequency varies. Message &amp; data rates may apply. Reply HELP for help or STOP to opt out.
              </ConsentBox>
              <ConsentBox checked={data.smsMarketing} onChange={(v) => set('smsMarketing', v)}>
                I consent to receive marketing text messages from {BUSINESS_NAME}, including offers and updates. Message frequency varies. Message &amp; data rates may apply. Reply HELP for help or STOP to opt out.
              </ConsentBox>
              <p className="px-1 text-[11.5px] text-white/40">
                Consent is not a condition of booking. See our{' '}
                <a href={PRIVACY_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white/70">Privacy Policy</a>
                {' '}and{' '}
                <a href={TERMS_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white/70">Terms</a>.
              </p>
            </div>
          </div>
        );
      case 'input':
        return (
          <Field
            ref={inputRef}
            label={current.title(data)}
            type={current.type}
            inputMode={current.inputMode}
            autoComplete={current.autoComplete}
            placeholder={current.placeholder}
            enterKeyHint="next"
            value={data[current.id]}
            valid={ready}
            onChange={(v) => set(current.id, v)}
          />
        );
      default:
        return (
          <div className="grid gap-3">
            {current.options.map((opt, i) => (
              <OptionButton
                key={opt}
                index={i}
                letter={String.fromCharCode(65 + i)}
                label={opt}
                selected={
                  current.kind === 'single'
                    ? picked === opt || data[current.id] === opt
                    : data[current.id].includes(opt)
                }
                onClick={() => (current.kind === 'single' ? choose(opt) : toggle(opt))}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="pv-root relative min-h-screen overflow-x-hidden bg-[#02050A] text-white antialiased selection:bg-blue-500">
      <style>{css}</style>

      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pv-orb absolute -left-32 top-[-10%] h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pv-orb absolute -right-24 bottom-[-10%] h-[380px] w-[380px] rounded-full bg-cyan-400/15 blur-[120px]" style={{ animationDelay: '-7s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02050A_85%)]" />
      </div>


      {/* No header here: the site-wide nav (logo, menu, Call / Free Audit bar) is fixed on top of this page.
          pt-24 / pb-28 keep the content clear of that top nav and the bottom call bar on phones. */}
      <main className="relative z-10 flex flex-col items-center px-4 pb-28 pt-24 sm:pb-16 sm:pt-28">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/[0.06] px-3.5 py-1.5 text-center text-xs font-medium text-white/70">
          <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-300" />
          {GUARANTEE_TEXT}
        </p>
        <div
          className="w-full transition-[max-width] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ maxWidth: calendarVisible ? 820 : 560 }}
        >
          <div
            ref={cardRef}
            className={`relative scroll-mt-6 rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[inset_0_12px_31px_-2px_rgba(255,255,255,0.06),0_30px_80px_-30px_rgba(37,99,235,0.45)] backdrop-blur-xl transition-[padding] duration-500 ${
              calendarVisible ? 'p-3 sm:p-6' : 'p-6 sm:p-9'
            }`}
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-white/50">{labelFor(phase, step)}</span>
                <span className="tabular-nums text-cyan-300">{progress}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
                role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
              >
                <div className="pv-bar relative h-full overflow-hidden rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ConfettiBurst key={burst.n} seed={burst.n} big={burst.big} />

            {reward && (
              <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center">
                <span key={reward.id} className="pv-reward inline-flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-[#02050A]/80 px-3 py-1 text-xs font-bold text-cyan-200 shadow-[0_0_24px_-6px_#22d3ee]">
                  <Sparkles className="h-3.5 w-3.5" /> +1 {reward.text}
                </span>
              </div>
            )}

            {phase === 'form' && (
              <form onSubmit={(e) => { e.preventDefault(); advance(); }} noValidate>
                {/* Honeypot for bots: hidden from people */}
                <input
                  type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  className="absolute left-[-9999px] h-px w-px opacity-0"
                  value={data.hp} onChange={(e) => set('hp', e.target.value)}
                />

                <div key={step} className={dir > 0 ? 'pv-step' : 'pv-step-back'}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                    Question {step + 1} of {STEPS.length}
                  </p>
                  <h1 className="text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[28px]" style={{ textWrap: 'balance' }}>
                    {current.title(data)}
                  </h1>
                  {current.sub && <p className="mt-2 text-sm text-white/50">{current.sub}</p>}

                  <div className="mt-7">{renderBody()}</div>

                  {error && <p key={error + step} role="alert" className="pv-shake mt-3 text-sm text-rose-300">{error}</p>}

                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <button
                        type="button" onClick={back}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-white/45 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : <span />}

                    {current.kind !== 'single' && (
                      <div className="flex items-center gap-3">
                        <span className="hidden items-center gap-1 text-xs text-white/35 sm:inline-flex">
                          press Enter <CornerDownLeft className="h-3.5 w-3.5" />
                        </span>
                        <button
                          type="submit"
                          style={ready ? { background: 'linear-gradient(135deg,#2563eb 0%,#4f46e5 45%,#0891b2 100%)' } : undefined}
                          className={`group inline-flex h-12 items-center gap-2 rounded-xl border px-6 font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
                            ready ? 'pv-ready border-white/40 text-white hover:scale-[1.03]' : 'border-white/10 bg-white/5 text-white/50'
                          }`}
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}

            {phase === 'unlocking' && (
              <div className="pv-step flex flex-col items-center py-12 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_50px_-10px_#22d3ee]">
                  <Lock className="pv-lock h-9 w-9 text-cyan-300" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">You're in{firstName ? `, ${firstName}` : ''}!</h2>
                <p className="mt-2 text-white/55">Unlocking your calendar...</p>
              </div>
            )}

            {/* Calendar: loads in the background after the phone step, revealed at the end */}
            {calSrc && (
              <div
                aria-hidden={!calendarVisible}
                className={
                  calendarVisible
                    ? 'pv-step'
                    : 'pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden opacity-0'
                }
              >
                {calendarVisible && (
                  <div className="mb-5 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-200">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} /> Calendar unlocked
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                      Pick a time that works{firstName ? `, ${firstName}` : ''}.
                    </h2>
                    <p className="mt-2 text-sm text-white/55">Spots are limited each week.</p>
                  </div>
                )}
                <CalendarEmbed src={calSrc} hidden={!calendarVisible} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
