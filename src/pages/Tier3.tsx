import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Star,
  Bot,
  Zap,
  DollarSign,
  ClipboardList,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Navigation from '../components/Navigation';

const steps = [
  {
    number: '01',
    tag: 'Lead Capture & Revenue Automation',
    title: 'Your entire revenue system — built and running',
    benefit: 'Every lead source, every follow-up channel, every conversion point — wired together into one automated machine that captures and closes revenue around the clock.',
    pill: 'Full pipeline, zero manual work',
    icon: MapPin,
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(0,240,255,0.15)',
    optional: false,
  },
  {
    number: '02',
    tag: 'Google Presence + Review Automation',
    title: 'Dominate search. Stay there automatically.',
    benefit: 'Fully optimized Google Business Profile with a review automation engine running weekly. Fresh 5-stars keep coming in — your ranking compounds while you\'re on the job.',
    pill: 'Permanent top 3 position',
    icon: Star,
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(251,191,36,0.15)',
    optional: false,
  },
  {
    number: '03',
    tag: '24/7 AI Talking Website + Smart FAQ Bot',
    title: 'Your website talks, qualifies, and books — while you sleep',
    benefit: 'A conversion-driven site with an AI that answers questions, handles objections, and books jobs instantly. Every visitor gets a response in seconds — day or night.',
    pill: 'Zero leads lost after hours',
    icon: Bot,
    gradient: 'from-violet-500 to-purple-500',
    glow: 'rgba(139,92,246,0.15)',
    optional: false,
  },
  {
    number: '04',
    tag: 'Appointment Setting + Lead Nurture + Instant Follow-Up',
    title: 'Instant response + 14 touches until they book',
    benefit: 'The second a lead comes in, the system responds. Then it runs 14 automated touchpoints across text, email, and voicemail — nurturing until they book or opt out. 78% of jobs go to whoever follows up first and most.',
    pill: '14-touch automated follow-up',
    icon: Zap,
    gradient: 'from-teal-500 to-emerald-500',
    glow: 'rgba(20,184,166,0.15)',
    optional: false,
    touchpoints: true,
  },
  {
    number: '05',
    tag: 'Automated Invoice Collection',
    title: 'Stop chasing money — it comes to you',
    benefit: 'Invoices go out automatically after every job. Payment reminders follow up for you. Cash hits your account without a single awkward follow-up call.',
    pill: '2–3x faster cash flow',
    icon: DollarSign,
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.15)',
    optional: false,
  },
  {
    number: '06',
    tag: 'Quoting & Job Pipeline System',
    title: 'Every job tracked — from quote to closed',
    benefit: 'Integrated quoting that sends proposals instantly and tracks every job through your pipeline. Nothing falls through the cracks. You always know what\'s open, what\'s closing, and what\'s paid.',
    pill: 'Full visibility on every dollar',
    icon: ClipboardList,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.15)',
    optional: false,
  },
  {
    number: '07',
    tag: 'Google & Meta Paid Traffic Infrastructure',
    title: 'Turn ads into booked jobs — on demand',
    benefit: 'When organic leads aren\'t enough, paid traffic fills the gap fast. We build and manage Google and Meta campaigns engineered to book jobs — not just generate clicks.',
    pill: 'Instant pipeline on demand',
    icon: Target,
    gradient: 'from-rose-500 to-pink-500',
    glow: 'rgba(244,63,94,0.15)',
    optional: true,
  },
  {
    number: '08',
    tag: 'Ongoing Optimization, Monitoring & Scaling',
    title: 'The system gets stronger every single month',
    benefit: 'Monthly performance monitoring, ranking expansion, and growth optimization. We track what\'s working, fix what isn\'t, and scale what\'s winning — while you focus on running the business.',
    pill: 'Compounding growth, no extra effort',
    icon: TrendingUp,
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(236,72,153,0.15)',
    optional: false,
  },
];

export default function Tier3() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleSteps((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    stepRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,240,255,0.5); }
          50% { text-shadow: 0 0 40px rgba(0,240,255,0.8), 0 0 60px rgba(176,38,255,0.6); }
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
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        .step-card {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
        }
        .step-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .step-card.optional-card {
          border-style: dashed !important;
        }
        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hover-lift:hover { transform: translateY(-4px); }

        .connector {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, #00c4cc44, #00c4cc22);
          margin: 0 auto;
          position: relative;
        }
        .connector::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 7px solid #00c4cc;
          opacity: 0.6;
        }

        .tp-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1a1a2e;
          border: 1px solid #3a2a6a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          color: #9b72ef;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
        }

        @keyframes grain {
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-5%,-10%)}
          30%{transform:translate(7%,-25%)}
          50%{transform:translate(-15%,10%)}
          70%{transform:translate(0%,15%)}
          90%{transform:translate(-10%,10%)}
        }
        .grain { animation: grain 8s steps(10) infinite; }
      `}</style>

      <Navigation showStickyCTA={showStickyCTA} />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grain w-[200%] h-[200%]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(0,240,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 60%, rgba(176,38,255,0.08) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs tracking-[0.25em] text-cyan-400 uppercase font-light">
                Full Domination Ecosystem — Tier 3
              </span>
            </div>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            <span className="block text-white">Everything That</span>
            <span className="block text-illuminate glow-pulse">Makes You Money</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            8 revenue systems. One price. Built, managed, and scaled for you — so you can focus on doing the work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book-call">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-lg rounded-none overflow-hidden hover-lift">
                <span className="relative z-10 flex items-center gap-3">
                  Get Started — $6,499
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link to="/book-call">
              <button className="px-10 py-5 border-2 border-white/20 text-white font-body font-semibold text-lg rounded-none hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
                Book Free Audit First
              </button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { val: '8', label: 'Revenue systems' },
              { val: '$6,499', label: 'One-time build' },
              { val: '+$1k/mo', label: 'Growth management' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 mb-1">{s.val}</div>
                <div className="font-body text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-3">How $6,499 Pays For Itself</h2>
            <p className="font-body text-gray-500 text-base">Every piece of the system is tied to one thing: your revenue.</p>
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i}>
                <div
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className={`step-card hover-lift ${visibleSteps.has(i) ? 'visible' : ''} ${step.optional ? 'optional-card' : ''}`}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <div
                    className={`relative bg-zinc-900 rounded-xl p-6 border ${step.optional ? 'border-dashed border-white/10' : 'border-white/10'}`}
                    style={{ boxShadow: visibleSteps.has(i) ? `0 0 40px ${step.glow}` : 'none', transition: 'box-shadow 0.7s ease' }}
                  >
                    {step.optional && (
                      <div className="absolute -top-3 right-4">
                        <span className="px-3 py-1 bg-zinc-900 border border-yellow-900/60 text-yellow-600 font-body text-xs uppercase tracking-wider rounded-full">
                          Optional add-on
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 p-3 bg-gradient-to-br ${step.gradient} rounded-lg`}>
                        <Icon className="w-6 h-6 text-black" strokeWidth={2} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Step tag */}
                        <p className="font-body text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">
                          Step {step.number} — {step.tag}
                        </p>

                        {/* Title */}
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                          {step.title}
                        </h3>

                        {/* Benefit */}
                        <p className="font-body text-gray-400 text-sm leading-relaxed mb-4">
                          {step.benefit}
                        </p>

                        {/* 14 touchpoints dots */}
                        {step.touchpoints && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Array.from({ length: 14 }, (_, n) => (
                              <div key={n} className="tp-dot">{n + 1}</div>
                            ))}
                          </div>
                        )}

                        {/* ROI pill */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-black border border-white/10 rounded-full font-body text-xs font-medium text-cyan-400`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {step.pill}
                        </span>
                      </div>

                      {/* Step number */}
                      <div className="flex-shrink-0 font-display text-4xl font-black text-white/5 select-none leading-none">
                        {step.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector between steps */}
                {i < steps.length - 1 && (
                  <div className="connector my-1" />
                )}
              </div>
            );
          })}

          {/* Outcome */}
          <div className="mt-2 relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900 to-black p-8 text-center">
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.4) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <p className="font-body text-xs tracking-[0.2em] text-cyan-400 uppercase mb-4">The result</p>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Fully booked.<br />Higher margins.<br />Growing every month.
              </h3>
              <p className="font-body text-gray-500 text-sm mb-8 max-w-md mx-auto">
                One closed job covers a significant portion of the setup cost. The system pays for itself — then keeps compounding.
              </p>
              <Link to="/book-call">
                <button className="group relative px-10 py-5 bg-white text-black font-body font-bold text-lg rounded-none overflow-hidden hover-lift">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Get The Full System
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </Link>
              <p className="font-body text-gray-600 text-xs mt-4">Or call us: <a href="tel:2145060806" className="text-cyan-500 hover:text-violet-400 transition-colors">(214) 506-0806</a></p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8">
            <div>
              <div className="font-display text-2xl font-bold mb-3">
                <span className="text-cyan-400">PRIME</span><br />
                <span className="text-white">VISIBILITY</span>
              </div>
              <p className="font-body text-gray-500 text-sm">Full-system growth for service businesses.</p>
            </div>
            <div className="flex flex-col gap-3 font-body">
              <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link>
              <Link to="/book-call" className="text-gray-400 hover:text-cyan-400 transition-colors">Book a Call</Link>
              <Link to="/portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors">Portfolio</Link>
              <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
            <div className="lg:text-right">
              <a href="tel:2145060806" className="block font-display text-xl font-bold text-cyan-400 mb-3 hover:text-violet-400 transition-colors">(214) 506-0806</a>
              <a href="https://www.instagram.com/primevisibilitymedia/" target="_blank" rel="noopener noreferrer" className="font-body text-gray-400 hover:text-cyan-400 transition-colors text-sm">@primevisibilitymedia</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-body text-gray-600 text-sm">© 2025 Prime Visibility Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
