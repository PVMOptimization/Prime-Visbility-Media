import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CornerDownLeft, Lock, ShieldCheck, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const LEAD_ENDPOINT = '/api/ghl-lead';
const CALENDAR_BASE = 'https://api.leadconnectorhq.com/widget/booking/XYCZxuPXEBa1m4bgduDQ';
const CALENDAR_IFRAME_ID = 'XYCZxuPXEBa1m4bgduDQ_1792367936138';
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';
const PRECONNECT_HOSTS = ['https://api.leadconnectorhq.com', 'https://link.msgsndr.com'];

const BUSINESS_NAME = 'Prime Visibility Media';
const PRIVACY_URL = '/privacy';
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
@import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap');
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
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2
