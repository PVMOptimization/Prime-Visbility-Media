import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, ArrowRight, Zap, Clock, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';

import img1 from '../assets/DashboardB_ACOMP.png';
import img2 from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import img3 from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

const TESTIMONIAL_IMAGES = [img1, img2, img3];

const VIDEO_URL = 'https://www.youtube.com/embed/XKq-T9Y9BeY';

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
    a: "We only work with local service businesses and we go deep, not wide. You're not getting a cookie-cutter package. You get a custom system built for your specific business, your market, and your goals. And we show you proof before you pay a dime."
  },
  {
    q: "What if I sign up and it doesn't work?",
    a: "We offer a 30 day period to prove our system, if it doesn't work you get a full refund. No long contracts, no hidden fees. If we're not delivering, we want to know about it. Our reputation is built on results, not retainers."
  },
  {
    q: "My business runs on word of mouth. Do I really need this?",
    a: "Word of mouth is powerful — until the person who would've referred you googles you first and finds nothing. A strong online presence amplifies your referrals, doesn't replace them. Every job you close could be two if your digital presence backs it up."
  }
];

/* ── Calendly Embed ── */
function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-[2px] bg-gradient-to-br from-cyan-500 via-violet-500 to-cyan-500 opacity-50 blur-sm" />
      <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500 via-violet-500 to-cyan-500 opacity-60" />
      <div className="relative bg-zinc-950 overflow-hidden">
        <div
          className="calendly-inline-widget"
          data-url={`${url}?hide_gdpr_banner=1&background_color=09090b&text_color=ffffff&primary_color=00F0FF`}
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </div>
  );
}

/* ── FAQ Accordion ── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-white/10 rounded-full mb-5">
            <span className="font-body text-xs text-gray-400 uppercase tracking-widest">
              Before You Book
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            You Probably Have{' '}
            <span className="text-illuminate">Questions.</span>
          </h2>
          <p className="font-body text-gray-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
            We've heard every objection. Here are straight answers — no fluff.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="group relative"
              >
                {/* Animated border on open */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 transition-opacity duration-300 ${isOpen ? 'opacity-60' : 'opacity-0'}`}
                />
                <div className="relative bg-zinc-900 border border-white/10">
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    {/* Corner accents when open */}
                    {isOpen && (
                      <>
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400 pointer-events-none" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400 pointer-events-none" />
                      </>
                    )}
                    <span
                      className={`font-display font-bold text-base sm:text-lg transition-colors duration-200 ${isOpen ? 'text-cyan-300' : 'text-white group-hover:text-cyan-200'}`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
                    />
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-transparent mb-4" />
                      <p className="font-body text-gray-300 text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below FAQ */}
        <div className="text-center mt-12">
          <p className="font-body text-gray-500 text-sm mb-4">
            Still have questions? We answer everything on the call.
          </p>
          <a
            href="https://calendly.com/optimization-primivisibilitymedia/10min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold hover:from-blue-600 hover:to-violet-600 transition-all duration-300"
          >
            Book My Free Strategy Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ── */
export default function BookCall() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body   { font-family: 'Outfit', sans-serif; }

        @keyframes warnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        .warn-pulse { animation: warnPulse 2.5s ease-in-out infinite; }

        .text-illuminate {
          background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: illuminate 3s ease-in-out infinite;
        }
        @keyframes illuminate {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hover-lift:hover { transform: translateY(-6px); }

        @keyframes borderTrace {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .border-trace {
          background: linear-gradient(90deg, #00F0FF, #B026FF, #00F0FF, #00F0FF);
          background-size: 200% 100%;
          animation: borderTrace 3s linear infinite;
        }

        @keyframes playPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,240,255,0.5); }
          50%       { transform: scale(1.06); box-shadow: 0 0 0 20px rgba(0,240,255,0); }
        }
        .play-pulse { animation: playPulse 2s ease-in-out infinite; }

        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .float-badge { animation: floatY 3s ease-in-out infinite; }

        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          25%  { transform: translate(-3%,-6%); }
          50%  { transform: translate(6%,3%); }
          75%  { transform: translate(-4%,8%); }
        }
        .grain { animation: grain 8s steps(10) infinite; }

        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-step { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>

      <Navigation showStickyCTA={false} />

      {/* ── SECTION 1: WARNING BANNER ── */}
      <section className="relative pt-24 pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black to-black pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-0">
          <div className="flex justify-center mb-8">
            <div className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] text-cyan-400 uppercase">
                You're almost there
              </span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-4">
              <span className="text-white">Thank You.</span>
              <br />
              <span className="text-illuminate">One Last Step.</span>
            </h1>
            <p className="font-body text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Please complete <strong className="text-white">every step</strong> below to finalize your booking.
              Your spot is not confirmed until the calendar invite is sent.
            </p>
          </div>

          {/* Warning card */}
          <div className="warn-pulse relative overflow-hidden border-2 border-red-500/70 bg-red-950/30 backdrop-blur-sm p-6 sm:p-8 mb-0">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-400" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-400" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-400" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="shrink-0 w-12 h-12 bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="font-display font-bold text-red-300 text-lg sm:text-xl mb-1 uppercase tracking-wide">
                  ⚠ No-Show Policy — Read Before Booking
                </p>
                <p className="font-body text-red-200/80 text-sm sm:text-base leading-relaxed">
                  We take no-shows <strong className="text-red-300">very seriously.</strong>{' '}
                  If you cannot make your scheduled time,{' '}
                  <strong className="text-white">please reschedule at least 2 hours in advance.</strong>{' '}
                  Repeated no-shows will result in being permanently{' '}
                  <strong className="text-red-300">blacklisted</strong> from all future bookings.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-0 border-x border-b border-white/10">
            {[
              { n: '01', label: 'Watch the 2-min breakdown below' },
              { n: '02', label: 'Pick a time in the calendar below' },
              { n: '03', label: 'Confirm your calendar invite'      },
            ].map((step, i) => (
              <div
                key={i}
                className="fade-step p-5 sm:p-6 border-r last:border-r-0 border-white/10 flex flex-col gap-2"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                  {step.n}
                </span>
                <p className="font-body text-gray-400 text-xs sm:text-sm leading-snug">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: VIDEO ── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-violet-500/30 bg-violet-500/5 rounded-full mb-6">
            <Clock className="w-4 h-4 text-violet-400" />
            <span className="font-body text-sm text-violet-300 tracking-widest uppercase">
              2 Minute System Breakdown
            </span>
          </div>

          {/* ── UPDATED HEADLINE ── */}
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-2 leading-tight">
            15 Qualified Appointments
          </h2>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-illuminate">In 30 Days. Guaranteed.</span>
          </h2>

          <p className="font-body text-gray-400 text-base sm:text-lg mb-12 max-w-xl mx-auto">
            Watch this before your call — clients who watch this close faster
            and get better results from day one.
          </p>

          {/* Video player */}
          <div className="relative group mx-auto max-w-3xl">
            <div className="absolute -inset-[2px] bg-gradient-to-br from-cyan-500 via-violet-500 to-cyan-500 opacity-60 blur-sm" />
            <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500 via-violet-500 to-cyan-500" />

            <div className="relative bg-zinc-950 aspect-video w-full overflow-hidden">
              {!videoPlaying ? (
                <>
                  {/* Dark grid background as thumbnail placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #0e1a2e 0%, #1a0a2e 50%, #0e1a2e 100%)' }}
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,240,255,0.2) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(0,240,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: '60px 60px',
                    }}
                  />
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                    aria-label="Play video"
                  >
                    <div className="play-pulse relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-2xl">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-black translate-x-1" viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <span className="font-body text-white/50 text-sm uppercase tracking-widest">
                      Click to play
                    </span>
                  </button>
                </>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={`${VIDEO_URL}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="System Breakdown Video"
                />
              )}
            </div>
          </div>

          <p className="font-body text-gray-600 text-sm mt-5 italic">
            Can't watch right now? Your rep will walk you through it on the call.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: CALENDLY ── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="float-badge inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-10">
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span className="font-body text-cyan-300 text-sm font-semibold uppercase tracking-widest">
              Spots fill fast — book now
            </span>
          </div>

          <h2 className="font-display font-black leading-none mb-6">
            <span className="block text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl">BOOK YOUR</span>
            <span className="block text-illuminate text-5xl sm:text-7xl md:text-8xl lg:text-9xl">CALL</span>
          </h2>

          <p className="font-body text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
            Stop worrying if your next customer will come on time.
          </p>
          <p className="font-body text-xl sm:text-2xl md:text-3xl font-bold text-white mb-12 max-w-3xl mx-auto">
            Own your lead flow.
          </p>

          <CalendlyEmbed url="https://calendly.com/optimization-primivisibilitymedia/10min" />

          <div className="mt-10">
            <span className="font-body text-gray-600 text-base">Or call us directly: </span>
            <a href="tel:2145060806" className="font-display text-cyan-400 text-xl font-bold hover:text-violet-400 transition-colors">
              (214) 506-0806
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FAQ OBJECTIONS ── */}
      <FAQ />

      {/* ── SECTION 5: TESTIMONIAL IMAGES ── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 border border-white/10 rounded-full mb-5">
              <span className="font-body text-xs text-gray-400 uppercase tracking-widest">Social Proof</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white">
              Real Clients.{' '}
              <span className="text-illuminate">Real Results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIAL_IMAGES.map((src, i) => (
              <div key={i} className="hover-lift group relative">
                <div className="absolute -inset-[2px] border-trace opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-zinc-900 overflow-hidden">
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-violet-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-violet-400 z-20 pointer-events-none" />
                  <img
                    src={src}
                    alt={`Client result ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = 'none';
                      const parent = t.parentElement;
                      if (parent) {
                        const gradients = [
                          'linear-gradient(135deg, #0e1a2e 0%, #0a1628 50%, #1a0a2e 100%)',
                          'linear-gradient(135deg, #1a0a2e 0%, #0e1a2e 50%, #0a1628 100%)',
                          'linear-gradient(135deg, #0a1628 0%, #1a0a2e 50%, #0e1a2e 100%)',
                        ];
                        parent.style.background = gradients[i % gradients.length];
                        parent.innerHTML += `
                          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;">
                            <p style="font-family:'Outfit',sans-serif;font-size:11px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.2em;text-align:center;">Testimonial Image ${i + 1}</p>
                          </div>`;
                      }
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="https://calendly.com/optimization-primivisibilitymedia/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-body font-semibold hover:bg-cyan-500/10 transition-all duration-300"
            >
              Ready to be our next result?
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-10 px-4 sm:px-6 text-center">
        <p className="font-body text-gray-600 text-sm">
          © 2025 Prime Visibility Media. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
