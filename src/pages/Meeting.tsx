import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Play, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

const faqs = [
  {
    q: "We already tried digital marketing and it didn't work.",
    a: "Most agencies sell you traffic with no strategy behind it. What we build is a system — your Google presence, your website, and your AI booking bot all working together. Traffic without conversion is just noise. We fix the whole chain, not just one piece."
  },
  {
    q: "Can't I just do this myself with a website builder?",
    a: "You can. And your competitor who hired a pro will outrank you, out-convert you, and out-book you while you're still figuring out the drag and drop. We don't just build sites — we build systems that generate revenue while you sleep."
  },
  {
    q: "How do I know this will actually get me more customers?",
    a: "We don't guess. Every client goes through the same proven framework — local SEO, conversion-optimized web presence, and automated follow-up. The results speak for themselves. We can show you exactly what we've done for businesses just like yours."
  },
  {
    q: "This sounds expensive. I don't have a big budget.",
    a: "The real question is how much you're losing every month by not having this. One missed job, one lead that went to your competitor — that's money out of your pocket. Our systems pay for themselves fast. We have tiers that fit every stage of growth."
  },
  {
    q: "I don't have time to deal with this right now.",
    a: "That's exactly why you need this. Our done-for-you system means you do nothing after setup. The AI books appointments, follows up with leads, and answers questions 24/7 — while you're on the job, at home, or asleep."
  },
  {
    q: "What makes you different from every other agency?",
    a: "We only work with local service businesses in DFW and we go deep, not wide. You're not getting a cookie-cutter package. You get a custom system built for your specific business, your market, and your goals. And we show you proof before you pay a dime."
  },
  {
    q: "What if I sign up and it doesn't work?",
    a: "We start with a free demo so you can see the work before you commit. No long contracts, no hidden fees. If we're not delivering, we want to know about it. Our reputation is built on results, not retainers."
  },
  {
    q: "My business runs on word of mouth. Do I really need this?",
    a: "Word of mouth is powerful — until the person who would've referred you googles you first and finds nothing. A strong online presence amplifies your referrals, doesn't replace them. Every job you close could be two if your digital presence backs it up."
  }
];

const clients1 = [
  {
    img: '/images/client-1-main.jpg', alt: 'Precision Roofing DFW',
    bg: 'from-cyan-900/90 to-zinc-900',
    val: '+340%', valLabel: 'More Leads', valColor: 'text-cyan-400',
    pill: { bg: 'bg-emerald-500/90 text-black', label: '+340% Leads' },
    name: 'Precision Roofing DFW',
    sub: 'Google Business overhaul + website launch',
    large: true,
  },
  {
    img: '/images/client-2.jpg', alt: 'Luxe Lash & Brow',
    bg: 'from-violet-900/90 to-zinc-900',
    val: '15x', valLabel: 'More Inbound Calls', valColor: 'text-violet-400',
    pill: { bg: 'bg-violet-500/80 text-white', label: '15x Calls' },
    name: 'Luxe Lash & Brow',
    sub: '',
    large: false,
  },
  {
    img: '/images/client-3.jpg', alt: 'DFW Landscape Pros',
    bg: 'from-cyan-900/90 to-zinc-900',
    val: '$23K', valLabel: 'Revenue in One Month', valColor: 'text-cyan-400',
    pill: { bg: 'bg-cyan-500/80 text-black', label: '$23K Month' },
    name: 'DFW Landscape Pros',
    sub: '',
    large: false,
  },
];

const clients2 = [
  {
    img: '/images/client-4.jpg', alt: 'Elite Plumbing',
    bg: 'from-rose-900/90 to-zinc-900',
    val: '+40%', valLabel: 'Revenue Growth', valColor: 'text-rose-400',
    pill: { bg: 'bg-rose-500/80 text-white', label: '+40% Revenue' },
    name: 'Elite Plumbing Solutions',
  },
  {
    img: '/images/client-5.jpg', alt: 'Texas Premier HVAC',
    bg: 'from-amber-900/90 to-zinc-900',
    val: '6 Wks', valLabel: 'Booked Solid', valColor: 'text-amber-400',
    pill: { bg: 'bg-amber-500/80 text-black', label: 'Fully Booked' },
    name: 'Texas Premier HVAC',
  },
  {
    img: '/images/client-6.jpg', alt: 'Modern Med Spa',
    bg: 'from-pink-900/90 to-zinc-900',
    val: '8', valLabel: 'Contracts in 3 Weeks', valColor: 'text-pink-400',
    pill: { bg: 'bg-pink-500/80 text-white', label: '8 New Contracts' },
    name: 'Modern Med Spa Dallas',
  },
];

export default function Meeting() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) setShowStickyCTA(heroRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body   { font-family: 'Outfit', sans-serif; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        [data-reveal].in-view { opacity: 1; transform: translateY(0); }
        [data-reveal-delay="1"] { transition-delay: 0.08s; }
        [data-reveal-delay="2"] { transition-delay: 0.16s; }
        [data-reveal-delay="3"] { transition-delay: 0.24s; }
        [data-reveal-delay="4"] { transition-delay: 0.32s; }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }

        .hover-lift { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        @media (hover: hover) { .hover-lift:hover { transform: translateY(-5px); } }

        @keyframes illuminate {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .text-illuminate {
          background: linear-gradient(45deg,#00F0FF,#B026FF,#00F0FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: illuminate 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%,100% { filter: drop-shadow(0 0 12px rgba(0,240,255,0.4)); }
          50%      { filter: drop-shadow(0 0 28px rgba(0,240,255,0.7)); }
        }
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        @keyframes borderShimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .video-frame {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(0,240,255,0.12), 0 0 120px rgba(176,38,255,0.08);
        }
        .video-frame::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: linear-gradient(135deg,#00F0FF44,#B026FF44,#00F0FF44);
          background-size: 200% 200%;
          animation: borderShimmer 4s linear infinite;
          z-index: -1;
        }

        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); transition: border-color 0.3s; }
        .faq-item:hover { border-bottom-color: rgba(0,240,255,0.25); }

        .tab-pill {
          padding: 5px 13px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
          white-space: nowrap;
        }

        .picture-card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          background: #111;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @media (hover: hover) { .picture-card:hover { transform: scale(1.015); } }
        .picture-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          20% { transform: translate(-5%,-10%); }
          40% { transform: translate(-10%,5%); }
          60% { transform: translate(5%,-5%); }
          80% { transform: translate(10%,10%); }
        }
        .grain { animation: grain 8s steps(10) infinite; }

        /* Prevent text overflow on small screens */
        h1,h2,h3 { word-break: break-word; }
      `}</style>

      <Navigation showStickyCTA={showStickyCTA} />

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 px-5">
        {/* Mouse gradient — desktop only for perf */}
        <div className="absolute inset-0 opacity-30 pointer-events-none transition-all duration-1000 hidden sm:block"
          style={{ background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.18) 0%, transparent 55%), radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(176,38,255,0.18) 0%, transparent 55%)` }} />

        {/* Static mobile gradient */}
        <div className="absolute inset-0 opacity-20 pointer-events-none sm:hidden"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,240,255,0.25) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(176,38,255,0.25) 0%, transparent 60%)' }} />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <div className="grain w-[200%] h-[200%]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div data-reveal className="inline-block mb-6">
            <div className="px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-cyan-400 uppercase">AI-Powered Lead Capture</span>
            </div>
          </div>

          {/* Headline */}
          <h1 data-reveal data-reveal-delay="1"
            className="font-display font-black text-[2.4rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 sm:mb-8">
            <span className="block text-white">Stop Losing</span>
            <span className="block text-white">Leads.</span>
            <span className="block text-illuminate glow-pulse">Start Capturing</span>
            <span className="block text-white">Revenue 24/7.</span>
          </h1>

          {/* Sub */}
          <p data-reveal data-reveal-delay="2"
            className="font-body text-base sm:text-xl text-gray-400 mb-10 sm:mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            Every missed call is a job that went to your competitor. Watch how we turn that around — completely on autopilot.
          </p>

          {/* Main video */}
          <div data-reveal data-reveal-delay="3" className="relative w-full max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="tab-pill text-black" style={{ background: 'linear-gradient(90deg,#00F0FF,#B026FF)' }}>★ Watch First</span>
              <span className="font-body text-[10px] text-gray-500 tracking-widest uppercase">2 min overview</span>
            </div>
            <div className="video-frame w-full aspect-video bg-zinc-950 relative group cursor-pointer">
              <video controls preload="metadata" poster="">
                <source src="/videos/hero-overview.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Play className="w-5 h-5 sm:w-8 sm:h-8 text-white fill-white ml-0.5 sm:ml-1" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-cyan-500/15 blur-2xl rounded-full pointer-events-none" />
          </div>

          {/* CTAs */}
          <div data-reveal data-reveal-delay="4" className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-none mx-auto">
            <Link to="/book-call" className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-base sm:text-lg rounded-none overflow-hidden hover-lift">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 sm:py-5 border-2 border-white/20 text-white font-body font-semibold text-base sm:text-lg rounded-none hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
                View Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FAQ / OBJECTIONS
      ───────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-5 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div data-reveal className="mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="tab-pill bg-violet-500/20 text-violet-400 border border-violet-500/30">Common Questions</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.92] mb-4">
              <span className="text-white">You're Probably</span>
              <br />
              <span className="text-illuminate">Thinking This.</span>
            </h2>
            <p className="font-body text-gray-400 text-base sm:text-lg mt-4 max-w-xl">
              We've heard every objection. Here's the honest answer to each one.
            </p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} data-reveal className="faq-item" style={{ transitionDelay: `${i * 0.04}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left group"
                >
                  <span className="font-body text-base sm:text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-cyan-400 transition-all duration-300 ${openFaq === i ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-80 pb-5' : 'max-h-0'}`}>
                  <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed border-l-2 border-cyan-500/40 pl-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          AI BOT SHOWCASE
      ───────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-5 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.25) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto">
          <div data-reveal className="text-center mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <span className="tab-pill bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Live Demo</span>
              <span className="font-body text-[10px] text-gray-500 tracking-widest uppercase">AI in action</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-[0.92]">
              <span className="text-white">Capturing Every</span>
              <br />
              <span className="text-illuminate glow-pulse">Lead.</span>
            </h2>
            <p className="font-body text-base sm:text-xl text-gray-400 max-w-xl mx-auto">
              Watch our AI qualify, book, and confirm — without a single human touching the phone.
            </p>
          </div>

          <div data-reveal className="relative w-full">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="tab-pill border border-cyan-500/50 text-cyan-400 bg-cyan-500/10">📞 Voice Call Demo</span>
              <span className="tab-pill border border-violet-500/50 text-violet-400 bg-violet-500/10">🗓️ Live Booking</span>
              <span className="tab-pill border border-white/20 text-gray-400 bg-white/5">24/7 Availability</span>
            </div>

            <div className="video-frame w-full aspect-video bg-zinc-950 relative group cursor-pointer">
              <video className="w-full h-full object-cover" controls preload="none" poster="">
                <source src="/videos/ai-bot-demo.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3">
                  <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white fill-white ml-0.5 sm:ml-1" />
                </div>
                <span className="font-body text-xs text-gray-400 uppercase tracking-widest">Watch the AI work</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { val: '24/7', label: 'Always On' },
                { val: '<30s', label: 'Response' },
                { val: '100%', label: 'Captured' },
              ].map((s, i) => (
                <div key={i} className="bg-zinc-950 border border-white/8 p-3 sm:p-5 text-center rounded-lg">
                  <div className="font-display text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 mb-0.5">{s.val}</div>
                  <div className="font-body text-[9px] sm:text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CLIENT RESULTS 1
      ───────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-5 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="tab-pill bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Client Results</span>
              <span className="tab-pill bg-white/5 text-gray-400 border border-white/10">Before & After</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.92]">
              <span className="text-white">What We've</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Built.</span>
            </h2>
            <p className="font-body text-gray-400 text-base sm:text-lg mt-4">Real work. Real businesses. Real revenue growth.</p>
          </div>

          {/* Mobile: all stacked. sm+: large left + two right */}
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-4" style={{ minHeight: '0' }}>
            {/* Large card — spans 2 rows on sm+ */}
            <div data-reveal className="picture-card hover-lift w-full" style={{ height: '240px', gridRow: '1 / 3' }}>
              <img src={clients1[0].img} alt={clients1[0].alt} className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/90 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-5xl font-black text-cyan-400 mb-1">{clients1[0].val}</div>
                  <div className="font-body text-gray-300 text-sm">{clients1[0].valLabel}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <span className="tab-pill bg-emerald-500/90 text-black mb-2 inline-block">{clients1[0].pill.label}</span>
                <h3 className="font-display text-lg sm:text-2xl font-bold text-white">{clients1[0].name}</h3>
                <p className="font-body text-gray-300 text-xs sm:text-sm mt-1">{clients1[0].sub}</p>
              </div>
            </div>

            {/* Two smaller cards */}
            {clients1.slice(1).map((c, i) => (
              <div key={i} data-reveal data-reveal-delay={`${i + 1}` as any} className="picture-card hover-lift w-full" style={{ height: '180px' }}>
                <img src={c.img} alt={c.alt} className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${c.bg} -z-10`}>
                  <div className="text-center p-3">
                    <div className={`font-display text-4xl font-black ${c.valColor} mb-1`}>{c.val}</div>
                    <div className="font-body text-gray-300 text-xs">{c.valLabel}</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                  <span className={`tab-pill ${c.pill.bg} mb-1.5 inline-block`}>{c.pill.label}</span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{c.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CLIENT RESULTS 2
      ───────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="tab-pill bg-orange-500/20 text-orange-400 border border-orange-500/30">More Wins</span>
                <span className="tab-pill bg-white/5 text-gray-400 border border-white/10">DFW Businesses</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.92]">
                <span className="text-white">Proof In</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Every Market.</span>
              </h2>
            </div>
            <Link to="/portfolio">
              <button className="group flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/20 text-white font-body font-semibold text-sm sm:text-base rounded-none hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start">
                Full Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* 3 equal cards stacked on mobile, row on sm+ */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clients2.map((c, i) => (
                <div key={i} data-reveal data-reveal-delay={`${i}` as any} className="picture-card hover-lift" style={{ height: '210px' }}>
                  <img src={c.img} alt={c.alt} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${c.bg} -z-10`}>
                    <div className="text-center p-4">
                      <div className={`font-display text-4xl font-black ${c.valColor} mb-1`}>{c.val}</div>
                      <div className="font-body text-gray-300 text-sm">{c.valLabel}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span className={`tab-pill ${c.pill.bg} mb-2 inline-block`}>{c.pill.label}</span>
                    <h3 className="font-display text-base font-bold text-white">{c.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Full-width stats banner */}
            <div data-reveal className="picture-card" style={{ minHeight: '140px' }}>
              <img src="/images/client-wide.jpg" alt="Combined results" className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 -z-10">
                <div className="flex flex-wrap gap-6 sm:gap-12 justify-center text-center px-4 py-6">
                  {[
                    { val: '350%', label: 'Avg Growth' },
                    { val: '$2.4M', label: 'Client Revenue' },
                    { val: '50+', label: 'Businesses Served' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="font-display text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400">{s.val}</div>
                      <div className="font-body text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill inline-block" style={{ background: 'linear-gradient(90deg,#00F0FF,#B026FF)', color: '#000' }}>
                  Combined Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────── */}
      <section className="relative py-20 sm:py-32 px-5 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-display text-5xl sm:text-7xl lg:text-9xl font-black mb-6 sm:mb-8 leading-none">
            <span className="text-white">READY TO</span>
            <br />
            <span className="text-illuminate glow-pulse">DOMINATE?</span>
          </h2>
          <p data-reveal className="font-body text-base sm:text-xl text-gray-300 mb-10 sm:mb-14 max-w-xl mx-auto">
            Book a free 15-minute strategy call. We'll show you exactly what's costing you business and how to fix it fast.
          </p>
          <div data-reveal className="flex flex-col gap-3 sm:flex-row sm:gap-5 justify-center items-stretch sm:items-center w-full max-w-sm sm:max-w-none mx-auto">
            <Link to="/book-call" className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-white text-black font-body font-bold text-base sm:text-xl rounded-none overflow-hidden hover-lift">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Your Free Call <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </Link>
            <a href="tel:2145060806" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 border-2 border-cyan-500/50 text-cyan-400 font-body font-bold text-base sm:text-xl rounded-none hover:bg-cyan-500/10 transition-all duration-300">
                (214) 506-0806
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
