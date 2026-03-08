import { Link } from 'react-router-dom';
import { TrendingUp, Star, Zap } from 'lucide-react';
import Button from '../components/Button';

// Place these images in src/assets/
import dashboardImg from '../assets/DashboardB_ACOMP.png';
import reviewsImg from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import leadSystemImg from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

export default function Portfolio() {
  const caseStudies = [
    {
      label: 'CRM & Pipeline Results',
      headline: 'From 4 Leads to $34K in Revenue',
      stat: '+650%',
      statLabel: 'Revenue Growth',
      color: 'cyan' as const,
      icon: TrendingUp,
      img: dashboardImg,
      description:
        'Real GoHighLevel dashboard showing a service business scale from $4,539 to $24,171 in conversions and 4 opportunities to 50 appointments.'
    },
    {
      label: 'Google Reviews Strategy',
      headline: 'More Reviews = More Calls',
      stat: '5×',
      statLabel: 'More Calls/Week',
      color: 'purple' as const,
      icon: Star,
      img: reviewsImg,
      description:
        'Going from 14 to 129 reviews pushed a local plumber from 2–5 calls a week to 15–25 — and 3–7 jobs/month to 40–50.'
    },
    {
      label: 'Lead Generation Campaign',
      headline: '50 → 600 Leads in 30 Days',
      stat: '$8.33',
      statLabel: 'Cost Per Lead',
      color: 'cyan' as const,
      icon: Zap,
      img: leadSystemImg,
      description:
        'Automated lead retention system paired with a strategic ad campaign that hit page 1 of Google and generated 600 qualified leads in a single month.'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-sm font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              Verified Client Results
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Real Numbers.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B026FF]">
                Real Growth.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These aren't mock-ups. These are actual dashboards and results from businesses we've helped scale in DFW.
            </p>
          </div>

          {/* Case Study Cards */}
          <div className="space-y-20 mb-24">
            {caseStudies.map((study, index) => {
              const isEven = index % 2 === 0;
              const accentColor = study.color === 'cyan' ? '#00F0FF' : '#B026FF';
              const accentColorLight = study.color === 'cyan' ? 'rgba(0,240,255,0.15)' : 'rgba(176,38,255,0.15)';
              const accentClass = study.color === 'cyan' ? 'text-[#00F0FF]' : 'text-[#B026FF]';
              const borderClass = study.color === 'cyan' ? 'border-[#00F0FF]/30' : 'border-[#B026FF]/30';
              const glowClass = study.color === 'cyan'
                ? 'shadow-[0_0_60px_rgba(0,240,255,0.12)]'
                : 'shadow-[0_0_60px_rgba(176,38,255,0.12)]';
              const hoverGlowClass = study.color === 'cyan'
                ? 'hover:shadow-[0_0_80px_rgba(0,240,255,0.22)]'
                : 'hover:shadow-[0_0_80px_rgba(176,38,255,0.22)]';

              return (
                <div
                  key={index}
                  className={`group grid md:grid-cols-2 gap-10 items-center ${!isEven ? 'md:[&>*:first-child]:order-last' : ''}`}
                >
                  {/* Text Side */}
                  <div className="flex flex-col justify-center">
                    <div className={`inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase ${accentClass} mb-4`}>
                      <study.icon className="w-4 h-4" />
                      {study.label}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {study.headline}
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {study.description}
                    </p>

                    {/* Stat pill */}
                    <div
                      className={`inline-flex items-end gap-3 px-6 py-4 rounded-xl border ${borderClass} w-fit`}
                      style={{ background: accentColorLight }}
                    >
                      <span className={`text-5xl font-black ${accentClass}`}>{study.stat}</span>
                      <span className="text-gray-400 text-sm pb-1 font-mono">{study.statLabel}</span>
                    </div>
                  </div>

                  {/* Image Side — Framed */}
                  <div className={`relative ${glowClass} ${hoverGlowClass} transition-all duration-500`}>

                    {/* Corner bracket decorations */}
                    {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute ${pos} w-6 h-6 z-10`}
                        style={{
                          borderTop: i < 2 ? `2px solid ${accentColor}` : 'none',
                          borderBottom: i >= 2 ? `2px solid ${accentColor}` : 'none',
                          borderLeft: i % 2 === 0 ? `2px solid ${accentColor}` : 'none',
                          borderRight: i % 2 === 1 ? `2px solid ${accentColor}` : 'none',
                        }}
                      />
                    ))}

                    {/* Outer frame */}
                    <div className={`rounded-xl border ${borderClass} bg-[#111] overflow-hidden`}>

                      {/* Browser Chrome Bar */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0D0D0D] border-b border-gray-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <div className="flex-1 mx-4 bg-[#1A1A1A] rounded-md px-3 py-1 text-xs text-gray-600 font-mono">
                          primevisibilitymedia.com / results
                        </div>
                        <span className={`text-[10px] font-mono ${accentClass} opacity-60`}>VERIFIED</span>
                      </div>

                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <img
                          src={study.img}
                          alt={study.headline}
                          className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                          style={{ maxHeight: '380px', objectPosition: 'top' }}
                        />

                        {/* Subtle scan-line overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.04]"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)'
                          }}
                        />

                        {/* Bottom gradient fade */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                          style={{
                            background: 'linear-gradient(to top, #111 0%, transparent 100%)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Glow orb behind image */}
                    <div
                      className="absolute -z-10 inset-4 rounded-xl blur-2xl opacity-20"
                      style={{ background: accentColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden bg-[#0D0D0D] rounded-2xl p-12 md:p-16 text-center border border-[#00F0FF]/20">
            {/* background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00F0FF]/10 blur-3xl rounded-full pointer-events-none" />

            <h2 className="relative text-3xl md:text-5xl font-bold mb-6">
              Want Results Like{' '}
              <span className="text-[#00F0FF]">These?</span>
            </h2>
            <p className="relative text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              We'll build you a custom system that converts visitors into paying customers. No templates. No compromises.
            </p>
            <Link to="/book-call">
              <Button variant="primary" className="text-xl">
                Book Free Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-2">
                <span className="text-[#00F0FF]">Prime</span> Visibility Media
              </div>
              <p className="text-gray-400">Premium Web Visibility for DFW Businesses</p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-[#00F0FF] transition-colors">Home</Link>
              <Link to="/book-call" className="text-gray-400 hover:text-[#00F0FF] transition-colors">Book a Call</Link>
              <Link to="/portfolio" className="text-gray-400 hover:text-[#00F0FF] transition-colors">Portfolio</Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#00F0FF] transition-colors">Contact</Link>
            </div>

            <div className="text-right">
              <a href="tel:2145060806" className="block text-[#00F0FF] font-semibold mb-2 hover:text-[#B026FF] transition-colors">
                (214) 506-0806
              </a>
              <a
                href="https://www.instagram.com/primevisibilitymedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                @primevisibilitymedia
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2025 Prime Visibility Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
