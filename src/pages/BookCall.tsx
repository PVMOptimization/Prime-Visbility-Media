import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import React from 'react';

const useWistiaScripts = () => {
  useEffect(() => {
    const scripts = [
      { src: 'https://fast.wistia.com/player.js', type: undefined },
      { src: 'https://fast.wistia.com/embed/pvt6x4gsui.js', type: 'module' },
      { src: 'https://fast.wistia.com/embed/lzk313rj1u.js', type: 'module' },
    ];
    const added = scripts.map(({ src, type }) => {
      if (document.querySelector(`script[src="${src}"]`)) return null;
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      if (type) el.type = type;
      document.body.appendChild(el);
      return el;
    });
    return () => {
      added.forEach((el) => el && document.body.contains(el) && document.body.removeChild(el));
    };
  }, []);
};

export default function BookCall() {
  useWistiaScripts();
  const bookingRef = useRef(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .floating { animation: float 6s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .bounce-slow { animation: bounce-slow 1.8s ease-in-out infinite; }

        wistia-player[media-id='pvt6x4gsui']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/pvt6x4gsui/swatch');
          display: block;
          filter: blur(5px);
        }
        wistia-player[media-id='lzk313rj1u']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/lzk313rj1u/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 177.78%;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 pb-16">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/20 rounded-full blur-[150px] floating" />
          <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-violet-500/20 rounded-full blur-[120px] floating" style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="grain w-[200%] h-[200%]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")` }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm opacity-0 animate-fadeInUp">
            <span className="font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 uppercase font-light">
              Prime Visibility Media
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[0.95] sm:leading-[0.9] opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-white">15 Qualified Appointments.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              30 Days. Or Full Refund.
            </span>
          </h1>

          <p
            className="font-body text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 px-2 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.4s' }}
          >
            Built for contractors doing $200k–$1M/year who are tired of chasing leads, missing calls, and leaving money on the table.
          </p>

          {/* Main VSL 16:9 */}
          <div
            className="group relative mb-10 w-full opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-400/35 to-transparent opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-90" />
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
                  media-id="pvt6x4gsui"
                  aspect="1.7777777777777777"
                  className="h-full w-full"
                ></wistia-player>
              </div>
            </div>
          </div>

          {/* FAQ vertical video */}
          <div
            className="flex flex-col items-center mb-10 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.6s' }}
          >
            <p className="font-body text-sm text-gray-500 uppercase tracking-widest mb-4">Common Questions Answered</p>
            <div className="group relative w-full max-w-[320px]">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-violet-400/35 to-transparent opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-90" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090D16] shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                </div>
                <div className="relative w-full" style={{ aspectRatio: '0.5625' }}>
                  <wistia-player
                    media-id="lzk313rj1u"
                    aspect="0.5625"
                    className="h-full w-full"
                  ></wistia-player>
                </div>
              </div>
            </div>
          </div>

          {/* BOOK NOW CTA */}
          <div
            className="flex flex-col items-center gap-4 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.7s' }}
          >
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-display font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(0,240,255,0.3)]"
            >
              <Calendar className="w-5 h-5" />
              BOOK NOW
            </button>
            <button
              onClick={scrollToBooking}
              aria-label="Scroll to booking"
              className="mt-2 flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <span className="font-body text-xs tracking-widest uppercase">Pick a time</span>
              <ChevronDown className="w-5 h-5 bounce-slow" />
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION — calendar only */}
      <section ref={bookingRef} className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/30 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs tracking-[0.3em] text-cyan-400 uppercase font-light">
                Schedule Your Call
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
              Pick a Time That Works
            </h2>
            <p className="font-body text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              15 minutes. No pitch. Just a real conversation about growing your pipeline.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <iframe
              src="https://cal.com/prime-media-shogdp/30min"
              width="100%"
              height="700"
              style={{ border: 'none', display: 'block' }}
              title="Book a call with Prime Visibility Media"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
