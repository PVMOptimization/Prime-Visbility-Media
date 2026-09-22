import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Zap, Users, Clock,
  MessageSquare, Calendar, DollarSign, ArrowRight,
  ShieldCheck, CheckCircle2, ChevronDown, Calculator, Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Script from 'next/script';

<Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
<Script src="https://fast.wistia.com/embed/s7tem1xbry.js" strategy="lazyOnload" type="module" />

// Import assets
import roofingImg from '../assets/SanAntonioRoofer-Results.jpg';
import dashboardImg from '../assets/DashboardB_ACOMP.png';
import reviewsImg from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import leadSystemImg from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

const CTA_PATH = '/growth-pipeline';

/* ------------------------------------------------------------------ */
/*  Design tokens & shared helpers                                     */
/*  Base #02050A · Blue #3B82F6 · Cyan #22D3EE · Indigo #4F46E5        */
/* ------------------------------------------------------------------ */

// Octagonal "cut corner" outline used on the big panels
const chamfer = (c) =>
  `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`;

// Trapezoid used on the stat plates
const TRAPEZOID = 'polygon(35px 0, calc(100% - 35px) 0, 100% 100%, 0 100%)';

// [grid column, duration (s), delay (s), streak height (px)]
const DROPS = [
  [2, 17, -4, 110],
  [5, 23, -12, 80],
  [8, 19, -2, 130],
  [11, 26, -17, 90],
  [14, 21, -9, 120],
  [17, 24, -14, 100],
];

const css = `
@import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap');

.pv-root{font-family:'Switzer',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}

@keyframes pv-drop{
  0%{transform:translateY(-120%);opacity:0}
  12%{opacity:1}
  100%{transform:translateY(110vh);opacity:0}
}
.pv-drop{animation:pv-drop linear infinite}

@keyframes pv-swap{
  from{opacity:0;transform:translateY(10px)}
  to{opacity:1;transform:none}
}
.pv-swap{animation:pv-swap .45s cubic-bezier(.2,.7,.2,1) both}

.pv-range{
  -webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;
  cursor:pointer;outline:none;
  background:linear-gradient(to right,#3b82f6 0%,#22d3ee var(--pv,50%),rgba(255,255,255,.1) var(--pv,50%),rgba(255,255,255,.1) 100%);
}
.pv-range::-webkit-slider-thumb{
  -webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:4px;
  background:#02050A;border:2px solid #67e8f9;box-shadow:0 0 16px rgba(34,211,238,.65);
  transition:transform .15s;
}
.pv-range::-webkit-slider-thumb:hover{transform:scale(1.15)}
.pv-range::-moz-range-thumb{
  width:16px;height:16px;border-radius:4px;background:#02050A;border:2px solid #67e8f9;
  box-shadow:0 0 16px rgba(34,211,238,.65);
}
.pv-range::-moz-range-track{background:transparent}
.pv-range:focus-visible{outline:2px solid #67e8f9;outline-offset:8px}

@media (prefers-reduced-motion:reduce){
  .pv-drop{animation:none;opacity:0}
  .pv-swap{animation:none}
}
`;

// Global CSS + SVG pattern library (defined once, referenced by url(#id) everywhere)
const GlobalAssets = () => (
  <>
    <style>{css}</style>
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="pv-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 L 0 100" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.18" />
        </pattern>
        <pattern id="pv-grid-dark" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 L 0 100" fill="none" stroke="#02050A" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
        </pattern>
        <pattern id="pv-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </pattern>
        <pattern id="pv-hatch-l" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </pattern>
        <pattern id="pv-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.25)" />
        </pattern>
      </defs>
    </svg>
  </>
);

// Dashed blueprint grid + edge vignette, with optional falling light streaks
const GridBackdrop = ({ drops = false }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden">
    <svg width="100%" height="100%" className="absolute inset-0">
      <rect width="100%" height="100%" fill="url(#pv-grid)" />
    </svg>
    {drops &&
      DROPS.map(([col, dur, delay, h]) => (
        <div
          key={col}
          className="pv-drop absolute top-0 w-px"
          style={{
            left: `${col * 100}px`,
            height: `${h}px`,
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
            background: 'linear-gradient(to bottom, transparent, #22d3ee)',
            boxShadow: '0 0 12px 1px rgba(34,211,238,0.45)',
          }}
        />
      ))}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02050A_100%)]" />
  </div>
);

// Hatched side rails + corner blocks that frame a section (desktop only)
const Rails = ({ bottom = true }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-[calc(100%-10rem)] max-w-[1600px] -translate-x-1/2 select-none lg:block"
  >
    <div className={`absolute left-0 top-0 w-[47px] border-r border-white/10 bg-[#02050A]/60 ${bottom ? 'bottom-[47px]' : 'bottom-0'}`}>
      <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pv-hatch-l)" /></svg>
    </div>
    <div className={`absolute right-0 top-0 w-[47px] border-l border-white/10 bg-[#02050A]/60 ${bottom ? 'bottom-[47px]' : 'bottom-0'}`}>
      <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pv-hatch)" /></svg>
    </div>
    {bottom && (
      <>
        <div className="absolute bottom-0 left-[47px] right-[47px] h-[47px] border-t border-white/10 bg-[#02050A]/60">
          <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pv-hatch)" /></svg>
        </div>
        <div className="absolute bottom-0 left-0 h-[47px] w-[47px] border-r border-t border-white/20 bg-[#02050A]">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#pv-hatch)" />
            <rect width="100%" height="100%" fill="url(#pv-dots)" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 h-[47px] w-[47px] border-l border-t border-white/20 bg-[#02050A]">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#pv-hatch-l)" />
            <rect width="100%" height="100%" fill="url(#pv-dots)" />
          </svg>
        </div>
      </>
    )}
  </div>
);

// Soft blurred light column, top corners of the hero
const Beam = ({ side }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute -top-20 h-[500px] w-[150px] ${side === 'left' ? '-left-10' : '-right-10'}`}
    style={{
      background: 'linear-gradient(180deg,#22d3ee 0%,rgba(59,130,246,0.4) 50%,transparent 100%)',
      filter: 'blur(80px)',
      transform: `rotate(${side === 'left' ? -10 : 10}deg)`,
      opacity: 0.85,
    }}
  />
);

// Cut-corner panel with a 1px gradient-able outline
const Chamfer = ({ c = 24, className = '', innerClassName = '', borderClassName = 'bg-white/10', children }) => (
  <div className={`relative ${className}`} style={{ clipPath: chamfer(c) }}>
    <div aria-hidden="true" className={`absolute inset-0 ${borderClassName}`} />
    <div className={`relative m-px ${innerClassName}`} style={{ clipPath: chamfer(c) }}>
      {children}
    </div>
  </div>
);

const Pill = ({ icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-blue-300 shadow-[inset_0_10px_24px_-4px_rgba(59,130,246,0.3)] backdrop-blur-md">
    {icon}
    {children}
  </span>
);

const SectionHeader = ({ eyebrow, title, sub }) => (
  <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
    <Pill>{eyebrow}</Pill>
    <h2
      className="mb-5 mt-7 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl"
      style={{ textWrap: 'balance' }}
    >
      {title}
    </h2>
    {sub && <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">{sub}</p>}
  </div>
);

// Every call to action is a real <Link> (no <button> nested in <a>)
const CtaButton = ({ children, variant = 'primary', size = 'lg', arrow = true, className = '' }) => {
  const sizes = size === 'sm' ? 'h-11 px-5 text-sm' : 'h-[58px] px-9 text-lg';
  const look =
    variant === 'dark'
      ? {
          background: '#02050A',
          boxShadow: 'inset 0 12px 31px -2px rgba(255,255,255,0.35), 0 18px 40px -16px rgba(2,5,10,0.7)',
        }
      : {
          background: 'linear-gradient(135deg,#2563eb 0%,#4f46e5 45%,#0891b2 100%)',
          boxShadow: 'inset 0 12px 31px -2px rgba(255,255,255,0.4), 0 14px 44px -12px rgba(59,130,246,0.75)',
        };
  return (
    <Link
      to={CTA_PATH}
      style={look}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-[15px] border-2 border-white/40 font-semibold text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 active:scale-[0.98] ${sizes} ${className}`}
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/*  1. Header                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  ['Calculator', '#calculator'],
  ['The system', '#system'],
  ['Results', '#results'],
  ['FAQ', '#faq'],
];

const HeaderNav = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/[0.04] shadow-[inset_0_12px_31px_-2px_rgba(255,255,255,0.05)] backdrop-blur-xl">
    <div className="relative mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
      <a href="#top" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/30">
          P
        </div>
        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
          Prime Visibility Media
        </span>
      </a>

      <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
        {NAV_LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-[15px] font-medium text-white/65 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            {label}
          </a>
        ))}
      </nav>

      <CtaButton size="sm" arrow={false}>Get System</CtaButton>
    </div>
  </header>
);

/* ------------------------------------------------------------------ */
/*  2. Hero                                                            */
/* ------------------------------------------------------------------ */

const STATS = [
  { icon: Users, value: '15', label: 'Appointments in 30 days' },
  { icon: ShieldCheck, value: '100%', label: 'Money-back guarantee', featured: true },
  { icon: Zap, value: '7', label: 'Days to go live' },
];

const StatPlate = ({ icon: Icon, value, label, featured }) => (
  <div className="relative h-[132px] w-full drop-shadow-2xl">
    <div
      aria-hidden="true"
      className={`absolute inset-0 ${featured ? 'bg-gradient-to-b from-white/20 via-white/5 to-cyan-400' : 'bg-gradient-to-b from-white/10 to-transparent'}`}
      style={{ clipPath: TRAPEZOID }}
    />
    <div
      className="absolute inset-px flex flex-col items-center justify-center bg-[#02050A] shadow-[inset_0_12px_31px_rgba(255,255,255,0.08)]"
      style={{ clipPath: TRAPEZOID }}
    >
      {featured && <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cyan-400/10 to-transparent" />}
      <div className="relative flex flex-col items-center">
        <Icon className={`mb-1 h-6 w-6 ${featured ? 'text-cyan-300' : 'text-white/40'}`} />
        <div className="text-4xl font-bold tabular-nums tracking-tight text-white">{value}</div>
        <div className="text-sm font-medium text-white/55">{label}</div>
      </div>
      {featured && <div className="absolute bottom-0 h-[2px] w-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />}
    </div>
  </div>
);

const HeroSection = () => (
  <section id="top" className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#02050A] px-6 pb-32 pt-36 lg:px-[8.5rem]">
    <GridBackdrop drops />
    <Beam side="left" />
    <Beam side="right" />
    <Rails />

    <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center text-center">
      <Pill icon={<Sparkles className="h-4 w-4 text-cyan-300" />}>Prime Visibility Media Guarantee</Pill>

      <h1
        className="mb-8 mt-10 max-w-5xl text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5rem]"
        style={{ textWrap: 'balance' }}
      >
        Your Calendar. Booked With 15 Qualified Appointments{' '}
        <span className="relative mx-1 inline-block whitespace-nowrap px-1 align-baseline">
          <span
            aria-hidden="true"
            className="absolute inset-0 block -rotate-2 scale-105 rounded-xl border border-white/20 bg-[#0b1a3a]/70 bg-[radial-gradient(55%_210%_at_45%_-75%,#22d3ee_0%,rgba(34,211,238,0)_100%)] shadow-[inset_0_12px_31px_-2px_rgba(255,255,255,0.35)]"
          />
          <span className="relative z-10 block -rotate-2 px-4 font-bold">in 30 Days.</span>
        </span>
      </h1>

      <p className="mb-5 text-xl font-medium tracking-tight text-blue-400 md:text-2xl">
        Or Prime Visibility Media refunds every dollar.
      </p>

      <p className="mb-14 max-w-2xl text-base font-normal leading-relaxed text-white/60 md:text-lg">
        Built specifically for contractors doing $200k–$1M/year who want predictable pipeline growth without wasting time chasing cold leads.
      </p>

      {/* Video frame */}
      <div className="group relative mb-14 w-full max-w-4xl">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-400/35 to-transparent opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-90" />
        {['-left-3 -top-3 border-l border-t', '-right-3 -top-3 border-r border-t', '-bottom-3 -left-3 border-b border-l', '-bottom-3 -right-3 border-b border-r'].map((pos) => (
          <span key={pos} aria-hidden="true" className={`absolute z-10 h-6 w-6 border-cyan-300/70 ${pos}`} />
        ))}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090D16] shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="relative aspect-video w-full">
  <wistia-player
    media-id="s7tem1xbry"
    aspect="1.7777777777777777"
    className="h-full w-full"
  ></wistia-player>
</div>
        </div>
      </div>

      <div className="mb-24">
        <CtaButton>Get Your Pipeline Built</CtaButton>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
        {STATS.map((s) => (
          <StatPlate key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  3. Interactive ROI calculator                                      */
/* ------------------------------------------------------------------ */

const RoiCalculator = () => {
  const [avgTicket, setAvgTicket] = useState(8000);
  const [closeRate, setCloseRate] = useState(25);

  const appointments = 15;
  const closedDeals = Math.round(appointments * (closeRate / 100) * 10) / 10;
  const estimatedRevenue = Math.round(closedDeals * avgTicket);

  const pct = (v, min, max) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <div style={{ filter: 'drop-shadow(0 24px 48px rgba(37,99,235,0.2))' }}>
      <Chamfer
        c={28}
        borderClassName="bg-gradient-to-br from-blue-400/60 via-white/10 to-cyan-300/50"
        innerClassName="relative overflow-hidden bg-[#070b14] p-6 md:p-9"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10">
            <Calculator className="h-5 w-5 text-cyan-300" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">Interactive Revenue Predictor</h3>
        </div>

        <div className="relative space-y-8">
          <div>
            <div className="mb-3 flex items-baseline justify-between text-sm">
              <label htmlFor="pv-ticket" className="text-slate-400">Average Job Value:</label>
              <output htmlFor="pv-ticket" className="text-base font-bold tabular-nums text-cyan-300">
                ${avgTicket.toLocaleString()}
              </output>
            </div>
            <input
              id="pv-ticket"
              type="range"
              min="2500"
              max="25000"
              step="500"
              value={avgTicket}
              onChange={(e) => setAvgTicket(Number(e.target.value))}
              className="pv-range"
              style={{ '--pv': pct(avgTicket, 2500, 25000) }}
            />
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between text-sm">
              <label htmlFor="pv-close" className="text-slate-400">Estimate Close Rate:</label>
              <output htmlFor="pv-close" className="text-base font-bold tabular-nums text-cyan-300">
                {closeRate}%
              </output>
            </div>
            <input
              id="pv-close"
              type="range"
              min="10"
              max="50"
              step="5"
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="pv-range"
              style={{ '--pv': pct(closeRate, 10, 50) }}
            />
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
              <p className="text-xs text-slate-400">Projected Deals Closed</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">{closedDeals} Deals</p>
            </div>
            <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-center shadow-[0_0_32px_-10px_rgba(59,130,246,0.6)]">
              <p className="text-xs text-blue-300">Estimated New Revenue</p>
              <p className="mt-1 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-2xl font-extrabold tabular-nums text-transparent">
                ${estimatedRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-white/35">
            Illustrative estimate based on {appointments} booked appointments. Your results will vary.
          </p>
        </div>
      </Chamfer>
    </div>
  );
};

const CalculatorSection = () => (
  <section id="calculator" className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-[#02050A] px-6 py-28 lg:px-[8.5rem]">
    <GridBackdrop />
    <Rails bottom={false} />
    <div className="relative z-30 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div className="text-center lg:text-left">
        <Pill>Revenue predictor</Pill>
        <h2 className="mb-5 mt-7 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl" style={{ textWrap: 'balance' }}>
          What are 15 appointments worth to you?
        </h2>
        <p className="mx-auto max-w-md text-lg leading-relaxed text-white/60 lg:mx-0">
          Slide your average job value and close rate to see what a booked calendar could mean for your business.
        </p>
      </div>
      <RoiCalculator />
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  4. The system, as a scroll-linked pipeline                         */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: <Zap className="h-5 w-5 text-blue-400" />,
    title: 'Targeted Ads Engine',
    description: 'Stop wasting budgets on unqualified leads. We deploy hyper-targeted campaigns designed to attract ready-to-buy homeowners.',
  },
  {
    icon: <Users className="h-5 w-5 text-cyan-400" />,
    title: '2-Phase Lead Qualification',
    description: 'Tire-kickers are filtered out before reaching your calendar. Only qualified leads with real budget enter your pipeline.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-400" />,
    title: 'Instant Speed-to-Lead',
    description: 'Our system contacts new inquiries in under 60 seconds, eliminating lead decay and beating competitors to the punch.',
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-cyan-400" />,
    title: 'Automated 14-Touch Nurture',
    description: 'Multi-channel automated follow-up sequences across SMS & Email that continuously nurture cold leads into booked jobs.',
  },
  {
    icon: <Calendar className="h-5 w-5 text-blue-400" />,
    title: 'Direct Calendar Booking',
    description: 'Prospects choose an available slot directly on your calendar. Wake up to pre-scheduled estimates without playing phone tag.',
  },
  {
    icon: <DollarSign className="h-5 w-5 text-cyan-400" />,
    title: 'Invoice Collection System',
    description: 'Automated payment tracking and reminders cut accounts receivable cycles down to 12 days, boosting working capital.',
  },
];

const phases = [
  { label: 'Phase 1', n: '1', title: 'Attract & qualify', blurb: 'Ready-to-buy homeowners in. Tire-kickers out.', icon: Zap, items: [0, 1] },
  { label: 'Phase 2', n: '2', title: 'Respond & nurture', blurb: 'Every inquiry answered in seconds and followed up until it books.', icon: MessageSquare, items: [2, 3] },
  { label: 'Phase 3', n: '3', title: 'Book & collect', blurb: 'Estimates land on your calendar and payments get collected.', icon: Calendar, items: [4, 5] },
];

const FeatureCard = ({ feature }) => (
  <article className="group relative flex items-start gap-4 border border-white/5 bg-white/[0.03] p-5 text-left backdrop-blur-sm transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.06]">
    {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((pos) => (
      <span key={pos} aria-hidden="true" className={`absolute h-3 w-3 border-white/20 transition-colors group-hover:border-cyan-300/70 ${pos}`} />
    ))}
    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-transform duration-300 group-hover:scale-110">
      {feature.icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold tracking-tight text-white">{feature.title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{feature.description}</p>
    </div>
  </article>
);

const PhaseRow = ({ phase, flip, lit, nodeRef }) => {
  const Icon = phase.icon;
  return (
    <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-28">
      {/* oversized ghost numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-1/2 top-1/2 z-0 mr-16 hidden -translate-y-1/2 select-none text-[260px] font-black leading-none text-white/[0.06] md:block"
      >
        {phase.n}
      </span>

      {/* node on the center line */}
      <span
        ref={nodeRef}
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 z-30 hidden h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[3px] border transition-all duration-500 md:block ${
          lit ? 'border-cyan-200 bg-cyan-400 shadow-[0_0_18px_#22d3ee]' : 'border-white/15 bg-[#0a1020]'
        }`}
      />

      <div className={`relative z-20 flex flex-col gap-4 ${flip ? 'md:order-2' : ''}`}>
        {phase.items.map((i) => (
          <FeatureCard key={features[i].title} feature={features[i]} />
        ))}
      </div>

      <div
        className={`relative z-20 flex flex-col items-center gap-5 text-center ${
          flip ? 'md:order-1 md:items-end md:pr-10 md:text-right' : 'md:items-start md:pl-10 md:text-left'
        }`}
      >
        <span className="inline-flex h-[52px] items-center justify-center rounded-[15px] bg-blue-500/10 px-6 text-base font-bold tracking-wide text-blue-300 shadow-[inset_0_12px_31px_-2px_rgba(59,130,246,0.3)] backdrop-blur-[2.5px]">
          {phase.label}
        </span>
        <h3 className="flex items-center gap-3 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
          <Icon className="h-8 w-8 text-white/50" aria-hidden="true" />
          {phase.title}
        </h3>
        <p className="max-w-md text-lg leading-relaxed text-white/60">{phase.blurb}</p>
      </div>
    </div>
  );
};

const SystemSection = () => {
  const trackRef = useRef(null);
  const nodeRefs = useRef([]);
  const [fill, setFill] = useState(0);
  const [lit, setLit] = useState(0);

  // One scroll handler drives both the glowing line and the nodes it passes
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const head = window.innerHeight * 0.6;
      const r = track.getBoundingClientRect();
      setFill(Math.round(Math.max(0, Math.min(r.height, head - r.top))));
      let n = 0;
      nodeRefs.current.forEach((el) => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        if (b.top + b.height / 2 <= head) n += 1;
      });
      setLit(n);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="system" className="relative scroll-mt-20 overflow-hidden bg-[#02050A] px-6 py-28 lg:px-[8.5rem]">
      <GridBackdrop />
      <Rails />
      <div className="relative z-30 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The system"
          title="How Prime Visibility Media Scales You"
          sub="Six interconnected engines engineered to automate lead capture, booking, and cash flow."
        />

        <div ref={trackRef} className="relative mt-24 flex flex-col gap-20 pb-10 md:gap-36">
          <div aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 border-l-2 border-dashed border-white/15 md:block" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-20 hidden w-[2px] -translate-x-1/2 md:block"
            style={{
              height: `${fill}px`,
              background: 'linear-gradient(to bottom,#3b82f6,#22d3ee)',
              boxShadow: '0 0 14px rgba(34,211,238,0.7)',
            }}
          />
          {phases.map((p, i) => (
            <PhaseRow
              key={p.title}
              phase={p}
              flip={i % 2 === 1}
              lit={i < lit}
              nodeRef={(el) => {
                nodeRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  5. Results / case studies                                          */
/* ------------------------------------------------------------------ */

const testimonials = [
  { title: '$70k Revenue Collected', subtitle: 'San Antonio Contractor Results', image: roofingImg, stat: '$70,000' },
  { title: 'Real-Time Pipeline Tracking', subtitle: 'Live Automated Dashboard', image: dashboardImg, stat: 'Live Data' },
  { title: 'Automated Review Engine', subtitle: '5-Star Google Reputation', image: reviewsImg, stat: '+50 Reviews' },
  { title: 'Lead Retention Flow', subtitle: 'Zero Missed Opportunities', image: leadSystemImg, stat: '24/7 Active' },
];

const ResultsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[currentIndex];
  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const next = () => setCurrentIndex((i) => (i + 1) % total);

  return (
    <section id="results" className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#02050A] px-6 py-28">
      <GridBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader eyebrow="Proven proof" title="Real Contractor Outcomes" />

        <div className="mt-16" style={{ filter: 'drop-shadow(0 30px 60px rgba(37,99,235,0.16))' }}>
          <Chamfer c={36} borderClassName="bg-gradient-to-br from-white/25 via-white/10 to-blue-400/40" innerClassName="bg-[#070b14]">
            <div key={currentIndex} className="pv-swap grid items-center gap-10 p-6 md:grid-cols-[1.15fr_1fr] md:gap-14 md:p-12">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090D16]">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
                <div className="flex aspect-[4/3] items-center justify-center bg-[#070a12]">
                  <img src={current.image} alt={current.title} decoding="async" className="h-full w-full object-contain" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="mb-3 text-sm font-semibold text-blue-400">
                  Case study {currentIndex + 1} of {total}
                </p>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{current.title}</h3>
                <p className="mb-7 text-base text-slate-400">{current.subtitle}</p>
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
                  {current.stat}
                </div>

                <div className="mt-9 flex items-center justify-center gap-3 md:justify-start">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous case study"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next case study"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </Chamfer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {testimonials.map((t, i) => {
            const active = i === currentIndex;
            return (
              <button
                key={t.title}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-current={active ? 'true' : undefined}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium leading-snug transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                  active
                    ? 'border-blue-400/60 bg-blue-500/10 text-white shadow-[0_0_28px_-10px_rgba(59,130,246,0.7)]'
                    : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {t.title}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  6. FAQ                                                             */
/* ------------------------------------------------------------------ */

const objections = [
  {
    q: "I've been burned by marketing companies before.",
    a: 'Most agencies sell shared lead lists and leave you to do all the work. Prime Visibility Media manages everything—from initial ad click to final calendar booking and payment collection. Plus, we guarantee 15 qualified appointments in 30 days or refund 100% of your fee.',
  },
  {
    q: "What if I can't close the appointments?",
    a: "Our system pre-qualifies leads on budget, timeline, and decision-making power before they get on your schedule. You aren't talking to tire-kickers—you are presenting to serious homeowners ready to buy.",
  },
  {
    q: 'What happens after the initial 30 days?',
    a: 'Once we fulfill your initial guarantee, you shift to a performance model: $150 per qualified appointment delivered. No monthly retainers or long-term lock-ins.',
  },
  {
    q: 'How fast can we launch?',
    a: 'Your custom pipeline and automation setup go live within 7 days. Most clients start receiving qualified calendar bookings within 14 days.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#02050A] px-6 py-28 lg:px-[8.5rem]">
      <GridBackdrop />
      <Rails />
      <div className="relative z-30 mx-auto max-w-[1007px] pb-10">
        <SectionHeader eyebrow="Questions & answers" title="Everything You Need To Know" />

        <div className="mt-16 flex flex-col gap-4">
          {objections.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className={`rounded-[15px] border shadow-[inset_0_12px_31px_rgba(255,255,255,0.05)] backdrop-blur-[3px] transition-all duration-300 ${
                  open
                    ? 'border-blue-400/50 bg-[#0b111c] shadow-[0_0_44px_-14px_rgba(59,130,246,0.6),inset_0_12px_31px_rgba(255,255,255,0.05)]'
                    : 'border-white/10 bg-[#090C11] hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 rounded-[15px] px-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 md:px-8"
                  >
                    <span className="flex items-center gap-4">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 transition-colors ${open ? 'text-cyan-300' : 'text-slate-500'}`} />
                      <span className="text-lg font-semibold tracking-tight text-white md:text-[22px]">{item.q}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} />
                  </button>
                </h3>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  aria-hidden={!open}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-white/5 px-6 pb-7 pt-5 text-base leading-relaxed text-white/75 md:px-8 md:text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  7. Final CTA + footer                                              */
/* ------------------------------------------------------------------ */

const FinalCTASection = () => (
  <section className="relative overflow-hidden bg-[#02050A] lg:px-20">
    <div
      className="relative mx-auto flex min-h-[560px] w-full max-w-[1600px] items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#3b82f6 0%,#38bdf8 55%,#22d3ee 100%)' }}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        <rect width="100%" height="100%" fill="url(#pv-grid-dark)" />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[47px] border-r border-white/10 bg-[#02050A] lg:block">
        <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pv-hatch-l)" /></svg>
      </div>
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[47px] border-l border-white/10 bg-[#02050A] lg:block">
        <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#pv-hatch)" /></svg>
      </div>

      <div className="relative z-20 flex max-w-[960px] flex-col items-center px-6 py-24 text-center text-[#02050A]">
        <span className="mb-8 inline-flex items-center gap-2 rounded-[15px] bg-[#02050A]/35 px-6 py-2.5 text-sm font-semibold text-white shadow-[inset_0_12px_31px_-2px_rgba(255,255,255,0.25)] backdrop-blur-[3px]">
          <ShieldCheck className="h-4 w-4" />
          Risk-free guarantee
        </span>
        <h2
          className="mb-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-[4.25rem]"
          style={{ textWrap: 'balance' }}
        >
          Ready To Scale With Prime Visibility Media?
        </h2>
        <p className="mb-12 max-w-xl text-lg font-medium leading-relaxed text-[#02050A]/90 md:text-[22px]">
          15 booked appointments in 30 days or you don't pay a single cent.
        </p>
        <CtaButton variant="dark">Book Your Strategy Call</CtaButton>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#0C1014] px-6 py-8">
    <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-sm font-bold text-white">
          P
        </div>
        <span className="text-sm text-white/70">© 2026 Prime Visibility Media. All rights reserved.</span>
      </div>
      <a href="#top" className="text-sm font-medium text-white/50 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">
        Back to top
      </a>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Main assembly                                                      */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  // Smooth-scroll for the in-page nav links; restored on unmount
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="pv-root min-h-screen overflow-x-hidden bg-[#02050A] text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
      <GlobalAssets />
      <HeaderNav />
      <main>
        <HeroSection />
        <CalculatorSection />
        <SystemSection />
        <ResultsSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
