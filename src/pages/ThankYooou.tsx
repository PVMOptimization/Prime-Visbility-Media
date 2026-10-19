import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation';

const META_PIXEL_ID = '4447826168834056';

export default function ThankYou() {
  useEffect(() => {
    // Fire Schedule pixel event on mount — only fires when someone lands here after booking
    if (typeof window !== 'undefined') {
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Schedule');
      } else {
        // Pixel not loaded yet — inject and fire
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
          fbq('track', 'Schedule');
        `;
        document.head.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body   { font-family: 'Outfit', sans-serif; }

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

        /* Check icon pop */
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          60%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .check-pop { animation: checkPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        /* Fade up stagger */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeInUp 0.6s ease-out 0.3s both; }
        .fade-up-2 { animation: fadeInUp 0.6s ease-out 0.5s both; }
        .fade-up-3 { animation: fadeInUp 0.6s ease-out 0.7s both; }
        .fade-up-4 { animation: fadeInUp 0.6s ease-out 0.9s both; }

        /* Pulse ring around check */
        @keyframes ringPulse {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .ring-pulse {
          animation: ringPulse 2s ease-out 0.7s infinite;
        }

        /* Grain */
        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          25%  { transform: translate(-3%,-6%); }
          50%  { transform: translate(6%,3%); }
          75%  { transform: translate(-4%,8%); }
        }
        .grain { animation: grain 8s steps(10) infinite; }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hover-lift:hover { transform: translateY(-5px); }

        .section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.15), rgba(176,38,255,0.15), transparent);
        }
      `}</style>

      <Navigation showStickyCTA={false} />

      {/* ── HERO CONFIRMATION ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/8 blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-500/8 blur-[100px] pointer-events-none" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          {/* Animated check mark */}
          <div className="relative inline-flex items-center justify-center mb-10">
            {/* Pulse rings */}
            <div className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/30 ring-pulse" />
            <div className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/20 ring-pulse" style={{ animationDelay: '0.4s' }} />
            {/* Icon container */}
            <div className="check-pop relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
              <CheckCircle className="w-12 h-12 text-black" strokeWidth={2.5} />
            </div>
          </div>

          {/* Headline */}
          <div className="fade-up-1">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-body text-xs sm:text-sm tracking-[0.2em] text-cyan-400 uppercase">
                You're Officially Booked
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl leading-tight mb-5">
              <span className="text-white">You're In. </span>
              <br />
              <span className="text-illuminate">See You Soon.</span>
            </h1>

            <p className="font-body text-gray-300 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-3">
              Your strategy call is confirmed. A calendar invite is on its way to your inbox right now.
            </p>
            <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
              On this call we'll show you exactly where you're losing customers and
              build a plan to get you{' '}
              <strong className="text-white">15 qualified appointments in 30 days.</strong>
            </p>
          </div>

          {/* What to expect cards */}
          <div className="fade-up-2 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 mb-12">
            {[
              {
                icon: Clock,
                title: '10 Minutes',
                desc: 'That\'s all it takes. We respect your time.',
              },
              {
                icon: Calendar,
                title: 'Check Your Email',
                desc: 'Your calendar invite is on its way. Add it now.',
              },
              {
                icon: Phone,
                title: 'We\'ll Call You',
                desc: 'Our team reaches out 10 minutes before your slot.',
              },
            ].map((item, i) => (
              <div key={i} className="hover-lift relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/40 via-violet-500/40 to-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-zinc-900 border border-white/10 p-6 flex flex-col items-center gap-3 text-center h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <p className="font-display font-bold text-white text-base">{item.title}</p>
                  <p className="font-body text-gray-400 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* No-show reminder */}
          <div className="fade-up-3 relative overflow-hidden border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6 mb-10 text-left">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-400/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-400/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-400/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-400/50" />
            <p className="font-display font-bold text-amber-300 text-sm uppercase tracking-wide mb-1">
              📅 One Quick Reminder
            </p>
            <p className="font-body text-amber-200/70 text-sm leading-relaxed">
              If something comes up and you can't make it,{' '}
              <strong className="text-amber-200">please reschedule at least 2 hours in advance.</strong>{' '}
              No-shows are tracked and repeated no-shows result in being permanently removed from future bookings.
            </p>
          </div>

          {/* CTA row */}
          <div className="fade-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="group hover-lift">
              <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-base">
                Back to Home
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a
              href="tel:2145060806"
              className="font-body text-gray-400 text-base hover:text-cyan-400 transition-colors"
            >
              Questions? Call{' '}
              <span className="font-bold text-cyan-400">(214) 506-0806</span>
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
