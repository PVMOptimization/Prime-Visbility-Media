import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CornerDownLeft, Lock, ShieldCheck, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const LEAD_ENDPOINT = '/api/ghl-lead';
const CALENDAR_SRC = 'https://api.leadconnectorhq.com/widget/booking/XYCZxuPXEBa1m4bgduDQ';
const CALENDAR_IFRAME_ID = 'XYCZxuPXEBa1m4bgduDQ_1792367936138';
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

// These labels must match the GHL custom field options exactly
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
    id: 'phone', kind: 'input', type: 'tel', inputMode: 'tel', autoComplete: 'tel',
    placeholder: '(555) 555-5555',
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
  companyName: '', owner: '', leadSources: [], revenue: '', hp: '',
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

const buildPayload = (d, stage) => {
  const p = normPhone(d.phone);
  return {
    stage,
    hp: d.hp,
    firstName: d.firstName.trim(),
    lastName: d.lastName.trim(),
    email: d.email.trim().toLowerCase(),
    phone: p.length === 10 ? `+1${p}` : '',
    trade: d.trade.trim(),
    companyName: d.companyName.trim(),
    owner: d.owner,
    leadSources: d.leadSources,
    revenue: d.revenue,
  };
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
  .pv-step,.pv-step-back,.pv-opt,.pv-pop,.pv-shake,.pv-reward,.pv-ready,.pv-orb,.pv-lock,.pv-bar::after{animation:none!important}
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

const Field = forwardRef(({ label, value, onChange, valid, ...rest }, ref) => (
  <div className="relative">
    <input
      ref={ref}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={120}
      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-lg text-white outline-none transition-all placeholder:text-white/25 focus:border-cyan-300/70 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]"
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

const CalendarEmbed = ({ data }) => {
  useEffect(() => {
    if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.src = EMBED_SCRIPT;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Prefill the booking form with what they already entered
  const params = new URLSearchParams();
  if (data.firstName) params.set('first_name', data.firstName.trim());
  if (data.lastName) params.set('last_name', data.lastName.trim());
  if (data.email) params.set('email', data.email.trim());
  const p = normPhone(data.phone);
  if (p.length === 10) params.set('phone', `+1${p}`);

  return (
    <iframe
      id={CALENDAR_IFRAME_ID}
      title="Book your call"
      src={`${CALENDAR_SRC}?${params.toString()}`}
      allow="payment"
      scrolling="no"
      style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: 700 }}
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

  const queue = useRef(Promise.resolve());
  const busy = useRef(false);
  const inputRef = useRef(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const ready = isValid(current, data);
  const progress = progressFor(phase, step);
  const firstName = data.firstName.trim();

  useEffect(() => { window.scrollTo(0, 0); }, []);
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
    // Step 0 is name only. From email onward, every answer is saved to GHL.
    if (step >= 1) submit(d, isLast ? 'complete' : 'partial');
    celebrate(isLast);

    if (isLast) {
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
            onChange={(v) => set(current.id, current.type === 'tel' ? formatPhone(v) : v)}
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
    <div className="pv-root relative min-h-screen overflow-hidden bg-[#02050A] text-white antialiased selection:bg-blue-500">
      <style>{css}</style>

      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pv-orb absolute -left-32 top-[-10%] h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pv-orb absolute -right-24 bottom-[-10%] h-[380px] w-[380px] rounded-full bg-cyan-400/15 blur-[120px]" style={{ animationDelay: '-7s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02050A_85%)]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 font-bold shadow-lg shadow-blue-500/30">P</div>
          <span className="hidden text-base font-bold tracking-tight text-white/90 sm:inline">Prime Visibility Media</span>
        </Link>
        <span className="flex items-center gap-2 text-xs font-medium text-white/55">
          <ShieldCheck className="h-4 w-4 text-cyan-300" />
          15 leads in 30 days or a full refund
        </span>
      </header>

      <main className="relative z-10 flex flex-col items-center px-4 pb-16 pt-4 sm:pt-10">
        <div
          className="w-full transition-[max-width] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ maxWidth: phase === 'calendar' ? 820 : 560 }}
        >
          <div
            className={`relative rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[inset_0_12px_31px_-2px_rgba(255,255,255,0.06),0_30px_80px_-30px_rgba(37,99,235,0.45)] backdrop-blur-xl transition-[padding] duration-500 ${
              phase === 'calendar' ? 'p-4 sm:p-6' : 'p-6 sm:p-9'
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

            {phase === 'calendar' && (
              <div className="pv-step">
                <div className="mb-5 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-200">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} /> Calendar unlocked
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Pick a time that works{firstName ? `, ${firstName}` : ''}.
                  </h2>
                  <p className="mt-2 text-sm text-white/55">Spots are limited each week.</p>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <CalendarEmbed data={data} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
