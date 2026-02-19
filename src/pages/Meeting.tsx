import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Play, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

const faqs = [
   {
    q: "My business runs on word of mouth. Do I really need this?",
    a: "Word of mouth is powerful — until the person who would've referred you googles you first and finds nothing. A strong online presence amplifies your referrals, doesn't replace them. Every job you close could be two if your digital presence backs it up."
  },
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
    a: "We only work with local service businesses and we go deep, not wide. You're not getting a cookie-cutter package. You get a custom system built for your specific business, your market, and your goals. And we show you proof before you pay a dime."
  },
  {
    q: "What if I sign up and it doesn't work?",
    a: "We start with a free demo so you can see the work before you commit. No long contracts, no hidden fees. If we're not delivering, we want to know about it. Our reputation is built on results, not retainers."
  }
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
      if (heroRef.current) {
        setShowStickyCTA(heroRef.current.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        [data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        [data-reveal].in-view { opacity: 1; transform: translateY(0); }
        [data-reveal-delay="1"] { transition-delay: 0.1s; }
        [data-reveal-delay="2"] { transition-delay: 0.2s; }
        [data-reveal-delay="3"] { transition-delay: 0.3s; }
        [data-reveal-delay="4"] { transition-delay: 0.4s; }

        .hover-lift { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .hover-lift:hover { transform: translateY(-6px); }

        @keyframes illuminate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .text-illuminate {
          background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: illuminate 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,240,255,0.4); }
          50% { text-shadow: 0 0 50px rgba(0,240,255,0.8), 0 0 80px rgba(176,38,255,0.5); }
        }
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        @keyframes borderShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .border-shimmer {
          background: linear-gradient(90deg, #00F0FF, #B026FF, #00F0FF);
          background-size: 200% auto;
          animation: borderShimmer 3s linear infinite;
        }

        .video-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,240,255,0.15), 0 0 160px rgba(176,38,255,0.1);
        }
        .video-frame::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          background: linear-gradient(135deg, #00F0FF44, #B026FF44, #00F0FF44);
          background-size: 200% 200%;
          animation: borderShimmer 4s linear infinite;
          z-index: -1;
        }

        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .faq-item:hover { border-bottom-color: rgba(0,240,255,0.3); }

        .tab-pill {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
        }

        .picture-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #111;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .picture-card:hover { transform: scale(1.02); }
        .picture-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
          pointer-events: none;
        }

        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          20% { transform: translate(-5%,-10%); }
          40% { transform: translate(-10%,5%); }
          60% { transform: translate(5%,-5%); }
          80% { transform: translate(10%,10%); }
        }
        .grain { animation: grain 8s steps(10) infinite; }
      `}</style>

      <Navigation showStickyCTA={showStickyCTA} />

      {/* ── HERO: STOP LOSING LEADS ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-4">
        {/* Mouse-tracked gradient */}
        <div className="absolute inset-0 opacity-40 pointer-events-none transition-all duration-1000"
          style={{ background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.18) 0%, transparent 55%), radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(176,38,255,0.18) 0%, transparent 55%)` }} />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grain w-[200%] h-[200%]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div data-reveal className="inline-block mb-8">
            <div className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs tracking-[0.3em] text-cyan-400 uppercase">AI-Powered Lead Capture</span>
            </div>
          </div>

          <h1 data-reveal data-reveal-delay="1" className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] mb-8">
            <span className="block text-white">Stop Losing</span>
            <span className="block text-white">Leads.</span>
            <span className="block text-illuminate glow-pulse">Start Capturing</span>
            <span className="block text-white">Revenue 24/7.</span>
          </h1>

          <p data-reveal data-reveal-delay="2" className="font-body text-lg sm:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Every missed call is a job that went to your competitor. Watch how we turn that around — completely on autopilot.
          </p>

          {/* MAIN VIDEO */}
          <div data-reveal data-reveal-delay="3" className="relative max-w-4xl mx-auto">
            {/* Tab above video */}
            <div className="flex items-center gap-3 mb-4">
              <span className="tab-pill border-shimmer text-black" style={{ background: 'linear-gradient(90deg,#00F0FF,#B026FF)', color: '#000' }}>
                ★ Watch First
              </span>
              <span className="font-body text-xs text-gray-500 tracking-widest uppercase">2 min overview</span>
            </div>

            <div className="video-frame aspect-video bg-zinc-950 flex items-center justify-center cursor-pointer group">
              {/* Replace src with your actual video URL */}
              <video
                className="w-full h-full object-cover"
                controls
                poster=""
                preload="none"
              >
                <source src="/videos/hero-overview.mp4" type="video/mp4" />
              </video>

              {/* Overlay play button (shows before video loads) */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>

            {/* Glow under video */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
          </div>

          {/* CTAs */}
          <div data-reveal data-reveal-delay="4" className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16">
            <Link to="/book-call">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-lg rounded-none overflow-hidden hover-lift">
                <span className="relative z-10 flex items-center gap-3">
                  Book Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link to="/portfolio">
              <button className="px-10 py-5 border-2 border-white/20 text-white font-body font-semibold text-lg rounded-none hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
                View Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ / OBJECTION HANDLING ── */}
      <section className="relative py-24 lg:py-36 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div data-reveal className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="tab-pill bg-violet-500/20 text-violet-400 border border-violet-500/30">Common Questions</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black leading-none">
              <span className="text-white">You're Probably</span>
              <br />
              <span className="text-illuminate">Thinking This.</span>
            </h2>
            <p className="font-body text-gray-400 text-lg mt-6 max-w-2xl">
              We've heard every objection. Here's the honest answer to each one.
            </p>
          </div>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} data-reveal className="faq-item" style={{ transitionDelay: `${i * 0.05}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                >
                  <span className="font-body text-lg sm:text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 mt-1 text-gray-500 group-hover:text-cyan-400 transition-all duration-300 ${openFaq === i ? 'rotate-180 text-cyan-400' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 pb-7' : 'max-h-0'}`}>
                  <p className="font-body text-gray-400 text-base sm:text-lg leading-relaxed border-l-2 border-cyan-500/40 pl-5">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI BOT SHOWCASE VIDEO ── */}
      <section className="relative py-24 lg:py-36 px-4 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.3) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="tab-pill bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Live Demo</span>
              <span className="font-body text-xs text-gray-500 tracking-widest uppercase">AI in action</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-none">
              <span className="text-white">Capturing Every</span>
              <br />
              <span className="text-illuminate glow-pulse">Lead.</span>
            </h2>
            <p className="font-body text-xl text-gray-400 max-w-2xl mx-auto">
              Watch our AI appointment setter qualify, book, and confirm — without a single human touching the phone.
            </p>
          </div>

          <div data-reveal className="relative max-w-5xl mx-auto">
            {/* Tabs row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="tab-pill border border-cyan-500/50 text-cyan-400 bg-cyan-500/10">📞 Voice Call Demo</span>
              <span className="tab-pill border border-violet-500/50 text-violet-400 bg-violet-500/10">🗓️ Live Booking</span>
              <span className="tab-pill border border-white/20 text-gray-400 bg-white/5">24/7 Availability</span>
            </div>

            <div className="video-frame aspect-video bg-zinc-950 cursor-pointer group relative">
              {/* Replace with your actual bot demo video */}
              <video
                className="w-full h-full object-cover"
                controls
                poster=""
                preload="none"
              >
                <source src="/videos/ai-bot-demo.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:opacity-0 transition-opacity pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
                <span className="font-body text-sm text-gray-400 uppercase tracking-widest">Watch the AI work</span>
              </div>
            </div>

            {/* Stats below bot video */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { val: '24/7', label: 'Always answering' },
                { val: '< 30s', label: 'Response time' },
                { val: '100%', label: 'Leads captured' },
              ].map((s, i) => (
                <div key={i} className="bg-zinc-950 border border-white/8 p-5 text-center rounded-lg">
                  <div className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 mb-1">{s.val}</div>
                  <div className="font-body text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT RESULTS — PICTURE SECTION 1 ── */}
      <section className="relative py-24 lg:py-36 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="tab-pill bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Client Results</span>
                <span className="tab-pill bg-white/5 text-gray-400 border border-white/10">Before & After</span>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-none">
                <span className="text-white">What We've</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Built.</span>
              </h2>
            </div>
            <p className="font-body text-gray-400 text-lg max-w-sm">Real work. Real businesses. Real revenue growth.</p>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {/* Large left */}
            <div data-reveal className="col-span-12 sm:col-span-7 row-span-2 picture-card hover-lift">
              {/* Replace with actual client image */}
              <img src="/images/client-1-main.jpg" alt="Client result 1"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="tab-pill bg-emerald-500/90 text-black mb-3 inline-block">+340% Leads</span>
                <h3 className="font-display text-2xl font-bold text-white">Precision Roofing DFW</h3>
                <p className="font-body text-gray-300 text-sm mt-1">Google Business overhaul + website launch</p>
              </div>
              {/* Placeholder when no image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 -z-10">
                <div className="text-center">
                  <div className="font-display text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 mb-2">+340%</div>
                  <div className="font-body text-gray-400">Precision Roofing DFW</div>
                </div>
              </div>
            </div>

            {/* Top right */}
            <div data-reveal data-reveal-delay="1" className="col-span-12 sm:col-span-5 row-span-1 picture-card hover-lift">
              <img src="/images/client-2.jpg" alt="Client result 2"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/80 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-4xl font-black text-violet-400 mb-1">15x</div>
                  <div className="font-body text-gray-300 text-sm">More Inbound Calls</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill bg-violet-500/80 text-white mb-2 inline-block">15x Calls</span>
                <h3 className="font-display text-lg font-bold text-white">Luxe Lash & Brow</h3>
              </div>
            </div>

            {/* Bottom right */}
            <div data-reveal data-reveal-delay="2" className="col-span-12 sm:col-span-5 row-span-1 picture-card hover-lift">
              <img src="/images/client-3.jpg" alt="Client result 3"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900/80 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-4xl font-black text-cyan-400 mb-1">$23K</div>
                  <div className="font-body text-gray-300 text-sm">Revenue in One Month</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill bg-cyan-500/80 text-black mb-2 inline-block">$23K Month</span>
                <h3 className="font-display text-lg font-bold text-white">DFW Landscape Pros</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT RESULTS — PICTURE SECTION 2 ── */}
      <section className="relative py-24 lg:py-36 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="tab-pill bg-orange-500/20 text-orange-400 border border-orange-500/30">More Wins</span>
                <span className="tab-pill bg-white/5 text-gray-400 border border-white/10">DFW Service Businesses</span>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-none">
                <span className="text-white">Proof In</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Every Market.</span>
              </h2>
            </div>
            <Link to="/portfolio">
              <button className="group flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-body font-semibold rounded-none hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300">
                Full Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Different layout — 3 columns + 1 wide */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[180px]">
            {/* Wide bottom */}
            <div data-reveal className="col-span-12 sm:col-span-4 row-span-1 picture-card hover-lift">
              <img src="/images/client-4.jpg" alt="Client 4"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-900/80 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-4xl font-black text-rose-400 mb-1">+40%</div>
                  <div className="font-body text-gray-300 text-sm">Revenue Growth</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill bg-rose-500/80 text-white mb-2 inline-block">+40% Revenue</span>
                <h3 className="font-display text-base font-bold text-white">Elite Plumbing Solutions</h3>
              </div>
            </div>

            <div data-reveal data-reveal-delay="1" className="col-span-12 sm:col-span-4 row-span-1 picture-card hover-lift">
              <img src="/images/client-5.jpg" alt="Client 5"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-900/80 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-4xl font-black text-amber-400 mb-1">6 Wks</div>
                  <div className="font-body text-gray-300 text-sm">Booked Solid</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill bg-amber-500/80 text-black mb-2 inline-block">Fully Booked</span>
                <h3 className="font-display text-base font-bold text-white">Texas Premier HVAC</h3>
              </div>
            </div>

            <div data-reveal data-reveal-delay="2" className="col-span-12 sm:col-span-4 row-span-1 picture-card hover-lift">
              <img src="/images/client-6.jpg" alt="Client 6"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900/80 to-zinc-900 -z-10">
                <div className="text-center p-4">
                  <div className="font-display text-4xl font-black text-pink-400 mb-1">8</div>
                  <div className="font-body text-gray-300 text-sm">Contracts in 3 Weeks</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <span className="tab-pill bg-pink-500/80 text-white mb-2 inline-block">8 New Contracts</span>
                <h3 className="font-display text-base font-bold text-white">Modern Med Spa Dallas</h3>
              </div>
            </div>

            {/* Full width */}
            <div data-reveal className="col-span-12 row-span-1 picture-card hover-lift">
              <img src="/images/client-wide.jpg" alt="Client results overview"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 -z-10">
                <div className="flex gap-12 text-center">
                  {[
                    { val: '350%', label: 'Avg Growth' },
                    { val: '$2.4M', label: 'Client Revenue' },
                    { val: '50+', label: 'Businesses Served' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="font-display text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400">{s.val}</div>
                      <div className="font-body text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="tab-pill border-shimmer text-black inline-block" style={{ background: 'linear-gradient(90deg,#00F0FF,#B026FF)', color: '#000' }}>
                  Combined Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 px-4 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 data-reveal className="font-display text-6xl sm:text-8xl lg:text-9xl font-black mb-8 leading-none">
            <span className="text-white">READY TO</span>
            <br />
            <span className="text-illuminate glow-pulse">DOMINATE?</span>
          </h2>
          <p data-reveal className="font-body text-xl text-gray-300 mb-14 max-w-2xl mx-auto">
            Book a free 15-minute strategy call. We'll show you exactly what's costing you business and how to fix it fast.
          </p>
          <div data-reveal className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/book-call">
              <button className="group relative px-12 py-6 bg-white text-black font-body font-bold text-xl rounded-none overflow-hidden hover-lift">
                <span className="relative z-10 flex items-center gap-3">
                  Book Your Free Call <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </Link>
            <a href="tel:2145060806">
              <button className="px-12 py-6 border-2 border-cyan-500/50 text-cyan-400 font-body font-bold text-xl rounded-none hover:bg-cyan-500/10 transition-all duration-300">
                (214) 506-0806
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
