import React, { useEffect, useMemo } from 'react';
import { CalendarPlus, Check, MessageSquareText, PlayCircle } from 'lucide-react';
import { getUser, shouldFireSchedule, trackEvent } from '../lib/tracking';
import caseStudyImg from '../assets/san-antonio-roofer-results.webp';

const inFrame = typeof window !== 'undefined' && window.top !== window.self;

// Optional: a 60-90 second "what happens on the call" video. Paste its Wistia media ID here
// (e.g. 'abc123xyz') and it appears on this page. Leave empty to hide it.
const PREP_VIDEO_ID = '';

const CALL_MINUTES = 30;
const CALL_TITLE = 'Prime Visibility Media: Strategy Call';

const css = `
.pv-root{font-family:'Switzer',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
@keyframes pv-check-in{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}
.pv-check{animation:pv-check-in .55s cubic-bezier(.2,.7,.2,1) both}
@keyframes pv-ring{0%{transform:scale(.8);opacity:.7}100%{transform:scale(1.9);opacity:0}}
.pv-ring{animation:pv-ring 1.6s ease-out 2 both}
@keyframes pv-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.pv-up{animation:pv-up .45s cubic-bezier(.2,.7,.2,1) both}
@media (prefers-reduced-motion:reduce){.pv-check,.pv-ring,.pv-up{animation:none}}
`;

// If the booking redirect passes the appointment time (e.g. ?start=2026-11-02T15:00:00Z),
// we can offer a one-tap "Add to calendar". Otherwise the button is hidden.
const TIME_PARAMS = ['start', 'start_time', 'startTime', 'appointment_start', 'appointment_time', 'selected_slot'];
function bookingStart() {
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of TIME_PARAMS) {
      const v = q.get(k);
      if (!v) continue;
      const d = /^\d{10,13}$/.test(v) ? new Date(Number(v.length === 10 ? v + '000' : v)) : new Date(v);
      if (!Number.isNaN(d.getTime())) return d;
    }
  } catch {
    /* ignore */
  }
  return null;
}

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function googleCalUrl(start) {
  const end = new Date(start.getTime() + CALL_MINUTES * 60000);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: CALL_TITLE,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: 'Your strategy call with Prime Visibility Media. The join link is in your confirmation text and email.',
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function icsHref(start) {
  const end = new Date(start.getTime() + CALL_MINUTES * 60000);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Prime Visibility Media//EN', 'BEGIN:VEVENT',
    `UID:${stamp(start)}@primevisibilitymedia.com`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${CALL_TITLE}`,
    'DESCRIPTION:The join link is in your confirmation text and email.',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export default function ThankYou() {
  const start = useMemo(() => (inFrame ? null : bookingStart()), []);

  useEffect(() => {
    // If GHL opened this inside the calendar iframe, jump straight to full page
    if (inFrame) {
      try {
        window.top.location.replace(window.location.href);
      } catch {
        /* ignore */
      }
      return;
    }
    window.scrollTo(0, 0);

    // Meta: booking confirmed (once per booking, even if the page is refreshed)
    if (shouldFireSchedule()) {
      const user = getUser() || {};
      trackEvent('Schedule', { user, custom: { content_name: 'Strategy Call' } });
    }
  }, []);

  useEffect(() => {
    if (!PREP_VIDEO_ID || inFrame) return;
    [['https://fast.wistia.com/player.js'], [`https://fast.wistia.com/embed/${PREP_VIDEO_ID}.js`, 'module']].forEach(
      ([src, type]) => {
        if (document.querySelector(`script[src="${src}"]`)) return;
        const el = document.createElement('script');
        el.src = src;
        el.async = true;
        if (type) el.type = type;
        document.body.appendChild(el);
      }
    );
  }, []);

  // Don't render anything inside the iframe; the full page is about to load
  if (inFrame) return null;

  const when = start
    ? start.toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : '';

  return (
    <div
      className="pv-root flex min-h-screen items-start justify-center px-4 py-10 text-white antialiased sm:items-center sm:py-12"
      style={{
        background:
          'radial-gradient(520px circle at 50% 28%, rgba(34,211,238,0.13), transparent 65%), #02050A',
      }}
    >
      <style>{css}</style>

      <div className="w-full max-w-[560px] rounded-[24px] border border-white/10 bg-[#0a0f1a] p-6 text-center shadow-[0_24px_60px_-28px_rgba(37,99,235,0.5)] sm:p-10">
        <div className="relative mx-auto mb-6 h-16 w-16">
          <span className="pv-ring absolute inset-0 rounded-full border-2 border-cyan-300/60" />
          <div className="pv-check relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_36px_-8px_#22d3ee]">
            <Check className="h-8 w-8 text-[#02050A]" strokeWidth={3} />
          </div>
        </div>

        <p className="pv-up text-xs font-semibold uppercase tracking-[0.18em] text-amber-300" style={{ animationDelay: '80ms' }}>
          One step left
        </p>
        <h1 className="pv-up mt-2 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl" style={{ animationDelay: '120ms' }}>
          Your call is tentatively scheduled
        </h1>
        {when && (
          <p className="pv-up mt-2 font-medium text-cyan-200" style={{ animationDelay: '160ms' }}>
            {when}
          </p>
        )}
        <p className="pv-up mt-3 text-white/60" style={{ animationDelay: '200ms' }}>
          Lock it in by replying <span className="font-semibold text-white">YES</span> to the text we just sent you.
        </p>

        <div className="mt-7 grid gap-3 text-left">
          <div className="pv-up flex items-start gap-4 rounded-2xl border border-amber-300/30 bg-amber-300/[0.06] p-4" style={{ animationDelay: '260ms' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10">
              <MessageSquareText className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <p className="font-semibold">1. Reply YES to our text</p>
              <p className="mt-0.5 text-sm text-white/60">It comes from our team within a minute. Replying confirms you're still coming.</p>
            </div>
          </div>

          <div className="pv-up flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4" style={{ animationDelay: '340ms' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10">
              <CalendarPlus className="h-5 w-5 text-cyan-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">2. Put it on your calendar</p>
              {start ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <a href={googleCalUrl(start)} target="_blank" rel="noreferrer" className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#02050A] hover:bg-cyan-100">
                    Google Calendar
                  </a>
                  <a href={icsHref(start)} download="strategy-call.ics" className="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-semibold text-white hover:border-white/40">
                    Apple / Outlook
                  </a>
                </div>
              ) : (
                <p className="mt-0.5 text-sm text-white/60">Open the confirmation email we sent and tap "Add to calendar".</p>
              )}
            </div>
          </div>

          <div className="pv-up flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4" style={{ animationDelay: '420ms' }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10">
              <PlayCircle className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="font-semibold">3. Know what to expect</p>
              <p className="mt-0.5 text-sm text-white/60">
                A short, no-pressure call. We look at how you get jobs now and show you exactly how we'd fill your
                calendar with homeowners who already approved your price range.
              </p>
            </div>
          </div>
        </div>

        {PREP_VIDEO_ID && (
          <div className="pv-up mt-6 overflow-hidden rounded-2xl border border-white/10" style={{ animationDelay: '480ms' }}>
            <wistia-player media-id={PREP_VIDEO_ID} aspect="1.7777777777777777" />
          </div>
        )}

        <div className="pv-up mt-8 text-left" style={{ animationDelay: '520ms' }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Before your call</p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img src={caseStudyImg} alt="San Antonio contractor results" loading="lazy" decoding="async" className="w-full" />
            <div className="p-4">
              <p className="font-semibold">$70K collected for a San Antonio contractor</p>
              <p className="mt-1 text-sm text-white/60">The same system we'll walk you through on the call.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
