import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, Mail, PhoneCall } from 'lucide-react';

const css = `
@import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap');
.pv-root{font-family:'Switzer',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
@keyframes pv-check-in{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}
.pv-check{animation:pv-check-in .6s cubic-bezier(.2,.7,.2,1) both}
@keyframes pv-ring{0%{transform:scale(.8);opacity:.7}100%{transform:scale(1.9);opacity:0}}
.pv-ring{animation:pv-ring 1.8s ease-out infinite}
@keyframes pv-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.pv-up{animation:pv-up .5s cubic-bezier(.2,.7,.2,1) both}
@media (prefers-reduced-motion:reduce){.pv-check,.pv-ring,.pv-up{animation:none}}
`;

const NEXT = [
  { icon: Mail, title: 'Check your email and texts', body: 'Your confirmation and calendar invite are on the way.' },
  { icon: Clock, title: 'Show up on time, somewhere quiet', body: 'The call is short and focused, so block off a few minutes.' },
  { icon: PhoneCall, title: "We'll map out your 30 days", body: "We'll look at how you get jobs now and show you exactly how we'd fill your calendar." },
];

export default function ThankYou() {
  useEffect(() => {
    // If GHL opened this inside the calendar iframe, break out to full page
    if (window.top !== window.self) {
      try {
        window.top.location.href = window.location.href;
        return;
      } catch {
        /* ignore */
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pv-root relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02050A] px-4 py-16 text-white antialiased">
      <style>{css}</style>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[120px]" />

      <div className="relative w-full max-w-[560px] rounded-[28px] border border-white/10 bg-white/[0.035] p-7 text-center shadow-[0_30px_80px_-30px_rgba(37,99,235,0.45)] backdrop-blur-xl sm:p-10">
        <div className="relative mx-auto mb-7 h-20 w-20">
          <span className="pv-ring absolute inset-0 rounded-full border-2 border-cyan-300/60" />
          <div className="pv-check relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_50px_-8px_#22d3ee]">
            <Check className="h-10 w-10 text-[#02050A]" strokeWidth={3} />
          </div>
        </div>

        <h1 className="pv-up text-3xl font-semibold tracking-[-0.02em] sm:text-4xl" style={{ animationDelay: '150ms' }}>
          You're booked!
        </h1>
        <p className="pv-up mt-3 text-white/60" style={{ animationDelay: '250ms' }}>
          Here's what happens next.
        </p>

        <div className="mt-8 grid gap-3 text-left">
          {NEXT.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="pv-up flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              style={{ animationDelay: `${350 + i * 100}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-0.5 text-sm text-white/55">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-8 inline-block text-sm font-medium text-white/45 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
