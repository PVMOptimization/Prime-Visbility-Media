import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  Bot,
  Repeat2,
  Globe,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function CaseStudy() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyCTA(heroBottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('[data-section-transition]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { before: '50', after: '600', label: 'Monthly Leads', growth: '+1100%' },
    { before: '14', after: '129', label: 'Google Reviews', growth: '+821%' },
    { before: '$6M', after: 'Scaling', label: 'Annual Revenue', growth: 'New ceiling' }
  ];

  const phases = [
    {
      number: '01',
      icon: Target,
      title: 'Winning Ad Creatives',
      description: "We deployed proven, conversion-tested ad creatives that have already moved millions in revenue across service businesses. No guessing. No A/B testing for months. Direct-to-buyer creative engineered to stop the scroll and book the call.",
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      number: '02',
      icon: Bot,
      title: 'Automated Lead Handling',
      description: "Every lead that came in got an instant AI response, a booked appointment, and a confirmed slot — all without a human lifting a finger. Speed-to-lead under 60 seconds, 24/7. No more leads slipping through the cracks while you're on a job site.",
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      number: '03',
      icon: Repeat2,
      title: '14-Touchpoint Follow-Up Engine',
      description: "Every prospect entered a 14-touchpoint nurture sequence — calls, texts, emails, retargeting — designed to convert the maximum number of leads into paying customers. Most agencies stop at one follow-up. We don't stop until they buy or unsubscribe.",
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      number: '04',
      icon: Globe,
      title: 'Long-Term Growth Infrastructure',
      description: "Once leads were flowing, we built the foundation that compounds: a conversion-focused website built to close, an enhanced Google Business Profile dominating local search, and review automation keeping the listing fresh forever. Short-term wins backed by long-term assets.",
      gradient: 'from-amber-500 to-orange-500',
    }
  ];

  const tickerItems = [
    '🚀 50 → 600 leads in 30 days',
    '⭐ 14 → 129 reviews',
    '⚡ 60-second AI response time',
    '🎯 14 follow-up touchpoints',
    '📈 1100% lead growth',
    '🔥 $6M business case study',
    '🤖 24/7 automated systems',
    '✅ Proven ad creatives'
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .grain { animation: grain 8s steps(10) infinite; }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hover-lift:hover { transform: translateY(-8px); }

        @keyframes float-kinetic {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
          50% { text-shadow: 0 0 40px rgba(0, 240, 255, 0.8), 0 0 60px rgba(176, 38, 255, 0.6); }
        }
        @keyframes letter-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .kinetic-text { animation: float-kinetic 8s ease-in-out infinite; }
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        [data-section-transition] { opacity: 0; }
        [data-section-transition].section-visible.section-transition-morph {
          animation: morphReveal 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        [data-section-transition].section-visible.section-transition-slide {
          animation: slideReveal 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        [data-section-transition].section-visible.section-transition-diagonal {
          animation: diagonalWipe 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes morphReveal {
          0% { clip-path: circle(0% at 50% 50%); opacity: 0; }
          100% { clip-path: circle(150% at 50% 50%); opacity: 1; }
        }
        @keyframes slideReveal {
          0% { clip-path: inset(0 100% 0 0); opacity: 0; }
          100% { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        @keyframes diagonalWipe {
          0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
        }

        .text-illuminate {
          background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: illuminate 3s ease-in-out infinite;
        }
        @keyframes illuminate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 25s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }

        .stat-glow {
          text-shadow: 0 0 30px rgba(0, 240, 255, 0.6);
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #00F0FF, #B026FF);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes countPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .count-pulse { animation: countPulse 4s ease-in-out infinite; }

        .dashboard-glow {
          box-shadow: 0 0 60px rgba(0, 240, 255, 0.15), 0 0 120px rgba(176, 38, 255, 0.1);
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent);
          animation: scanline 4s linear infinite;
          z-index: 5;
          pointer-events: none;
        }
      `}</style>

      <Navigation showStickyCTA={showStickyCTA} />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.15) 0%, transparent 50%),
                         radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(176,38,255,0.15) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <div className="inline-block mb-6 sm:mb-8">
            <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 uppercase font-light">
                Verified Case Study
              </span>
            </div>
          </div>

          <h1 className="font-display font-black text-[2rem] xs:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 sm:mb-8 px-2">
            <span className="block text-white">How We Took a</span>
            <span className="block text-illuminate glow-pulse my-2">$6M Business</span>
            <span className="block text-white text-[1.5rem] xs:text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl">
              from <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">50 leads</span>
              {' '}to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">600 leads</span>
            </span>
            <span className="block text-gray-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mt-4">
              with our automated lead gen system
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
            One system. Four phases. Real results from a real business.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-semibold"> The same engine we deploy for every service business client.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 mb-12">
            <a href="https://pvm-co.com/booking" target="_blank" rel="noopener noreferrer">
              <button className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-base sm:text-lg rounded-none overflow-hidden hover-lift w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Book a 15-min call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </a>
          </div>

          {/* HEADLINE STATS */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 max-w-4xl mx-auto px-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center count-pulse">
                <div className="font-display text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-2">{stat.label}</div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <span className="font-display text-lg sm:text-2xl md:text-3xl text-gray-600 line-through decoration-red-500/60">{stat.before}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                  <span className="font-display text-2xl sm:text-3xl md:text-5xl font-bold stat-number stat-glow">{stat.after}</span>
                </div>
                <div className="font-body text-[0.65rem] sm:text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                  {stat.growth}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 sm:mt-20 hidden sm:flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="font-body text-xs text-gray-500 uppercase tracking-widest">See the proof</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER TAPE */}
      <div className="relative py-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 border-y border-white/10 overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-body text-sm text-gray-300 mx-8 flex-shrink-0">
              {item} <span className="text-white/20 mx-4">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* DASHBOARD PROOF SECTION */}
      <section data-section-transition className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-950 section-transition-morph">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-6">
              <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                <span className="font-body text-xs tracking-[0.3em] text-cyan-400 uppercase font-light">
                  The Receipts
                </span>
              </div>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6">
              <span className="text-white">Real Dashboards.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Real Data.</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Pulled directly from our GoHighLevel system. No screenshots from stock libraries. This is what 30 days of execution looks like.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Dashboard 1 */}
            <div className="group hover-lift">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span className="font-body text-sm text-gray-400 uppercase tracking-widest">Dashboard 01</span>
                </div>
                <span className="font-body text-xs text-cyan-400 px-3 py-1 border border-cyan-500/30 rounded-full">Verified</span>
              </div>
              <div className="relative bg-zinc-900 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 overflow-hidden dashboard-glow">
                <div className="scanline" />
                <div className="aspect-[16/10] bg-zinc-800/50 flex items-center justify-center relative">
                  <img 
                    src="/case-study/dashboard-1.png" 
                    alt="Lead generation dashboard showing growth from baseline"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden flex-col items-center justify-center text-gray-600 font-body">
                    <TrendingUp className="w-12 h-12 mb-2 opacity-30" />
                    <span className="text-sm">Dashboard Screenshot 01</span>
                    <span className="text-xs mt-1 opacity-60">/case-study/dashboard-1.png</span>
                  </div>
                </div>
                <div className="p-6 border-t border-white/10">
                  <h3 className="font-display text-xl font-bold text-white mb-2">Lead Volume Explosion</h3>
                  <p className="font-body text-gray-400 text-sm leading-relaxed">
                    Before / after view of monthly lead volume. The system flipped the lead curve in under 30 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard 2 */}
            <div className="group hover-lift">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-violet-400" />
                  <span className="font-body text-sm text-gray-400 uppercase tracking-widest">Dashboard 02</span>
                </div>
                <span className="font-body text-xs text-violet-400 px-3 py-1 border border-violet-500/30 rounded-full">Verified</span>
              </div>
              <div className="relative bg-zinc-900 border border-white/10 group-hover:border-violet-500/50 transition-all duration-500 overflow-hidden dashboard-glow">
                <div className="scanline" />
                <div className="aspect-[16/10] bg-zinc-800/50 flex items-center justify-center relative">
                  <img 
                    src="/case-study/dashboard-2.png" 
                    alt="Revenue and conversion dashboard"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden flex-col items-center justify-center text-gray-600 font-body">
                    <TrendingUp className="w-12 h-12 mb-2 opacity-30" />
                    <span className="text-sm">Dashboard Screenshot 02</span>
                    <span className="text-xs mt-1 opacity-60">/case-study/dashboard-2.png</span>
                  </div>
                </div>
                <div className="p-6 border-t border-white/10">
                  <h3 className="font-display text-xl font-bold text-white mb-2">Revenue & Conversion Lift</h3>
                  <p className="font-body text-gray-400 text-sm leading-relaxed">
                    Pipeline conversion data showing how automated follow-up turned more leads into closed jobs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-body text-gray-500 text-sm italic">
              Client identifiers redacted for confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* THE 4 PHASES */}
      <section data-section-transition className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 section-transition-slide">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8">
              <span className="text-white">The Exact</span>
              <br />
              <span className="text-illuminate glow-pulse">4-Phase System</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              No secrets. Here's exactly what we did, in order, and what each phase contributed to the result.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="group relative hover-lift">
                <div className={`absolute -inset-[2px] bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                <div className="relative bg-zinc-900 border border-white/10 group-hover:border-transparent transition-all duration-300 p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="flex-shrink-0 flex items-center gap-4 md:flex-col md:items-center">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center`}>
                        <phase.icon className="w-8 h-8 sm:w-10 sm:h-10 text-black" strokeWidth={2} />
                      </div>
                      <span className={`font-display text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-br ${phase.gradient} bg-clip-text text-transparent`}>
                        {phase.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
                        {phase.title}
                      </h3>
                      <p className="font-body text-gray-400 text-base sm:text-lg leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section data-section-transition className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-950 section-transition-diagonal">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 sm:mb-8">
            <div className="px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5">
              <span className="font-body text-xs tracking-[0.3em] text-violet-400 uppercase font-light">
                What This Means For You
              </span>
            </div>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 sm:mb-12 leading-tight">
            <span className="text-white">We use the</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">same system</span>
            <br />
            <span className="text-white">for every service business</span>
            <br />
            <span className="text-illuminate glow-pulse">to drive booked jobs.</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12">
            {[
              'Plumbers & HVAC',
              'Roofers & Contractors',
              'Concrete & Landscaping',
              'Med Spas & Salons',
              'Auto Detailing & Pressure Washing',
              'Mold & Water Damage Restoration'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-white/10 p-4 hover-lift">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="font-body text-white text-left">{item}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Every business is different. The system is the same. We adapt the creative, the targeting, and the offer — but the engine that turns leads into booked jobs stays consistent.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-section-transition className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden section-transition-morph">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-violet-500/20" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse 3s ease-in-out ${Math.random() * 2}s infinite`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-none">
            <span className="text-white">Want the same</span>
            <br />
            <span className="text-illuminate glow-pulse">in your business?</span>
          </h2>
          <p className="font-body text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto font-light px-4">
            15 minutes. No pitch. We'll show you exactly what this would look like for you and what it would take to deploy.
          </p>
          <p className="font-body text-base sm:text-lg text-gray-500 mb-12 sm:mb-16 px-4">
            Real numbers. Real timeline. Real conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-8 sm:mb-12 px-4">
            <a href="https://pvm-co.com/booking" target="_blank" rel="noopener noreferrer">
              <button className="group relative px-10 sm:px-12 py-5 sm:py-6 bg-white text-black font-body font-bold text-lg sm:text-xl rounded-none overflow-hidden hover-lift w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                  Book a 15-min call
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-gray-400 font-body text-base sm:text-lg">
            <span>Or call us directly:</span>
            <a href="tel:2145060806" className="text-cyan-400 text-xl sm:text-2xl font-bold hover:text-violet-400 transition-colors duration-300">
              (214) 506-0806
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
