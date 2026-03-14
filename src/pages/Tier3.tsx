import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  @keyframes illuminate {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes pulseGlow {
    0%, 100% { text-shadow: 0 0 20px rgba(0,240,255,0.5); }
    50% { text-shadow: 0 0 40px rgba(0,240,255,0.8), 0 0 60px rgba(176,38,255,0.6); }
  }
  @keyframes grain {
    0%,100%{transform:translate(0,0)}
    10%{transform:translate(-5%,-10%)}
    30%{transform:translate(7%,-25%)}
    50%{transform:translate(-15%,10%)}
    70%{transform:translate(0%,15%)}
    90%{transform:translate(-10%,10%)}
  }

  .t3-wrapper { font-family: 'Outfit', sans-serif; background: #000; min-height: 100vh; color: #fff; overflow-x: hidden; }
  .t3-display { font-family: 'Syne', sans-serif; }

  .t3-illuminate {
    background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: illuminate 3s ease-in-out infinite;
  }

  .t3-grain { animation: grain 8s steps(10) infinite; }

  .t3-step-card {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.7s ease;
    background: #141414;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 24px;
    position: relative;
  }
  .t3-step-card.visible { opacity: 1; transform: translateY(0); }
  .t3-step-card:hover { transform: translateY(-4px); border-color: rgba(0,240,255,0.2); }
  .t3-step-card.optional { border-style: dashed; border-color: rgba(255,255,255,0.06); }

  .t3-connector {
    width: 2px; height: 36px;
    background: linear-gradient(to bottom, rgba(0,196,204,0.4), rgba(0,196,204,0.1));
    margin: 2px auto;
    position: relative;
  }
  .t3-connector::after {
    content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 5px solid transparent; border-right: 5px solid transparent;
    border-top: 7px solid rgba(0,196,204,0.6);
  }

  .t3-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.08); border-radius: 30px;
    font-size: 11px; font-weight: 500; color: #00c4cc;
  }

  .t3-tp-dot {
    width: 28px; height: 28px; border-radius: 50%;
    background: #1a1a2e; border: 1px solid #3a2a6a;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; color: #9b72ef; font-weight: 600; flex-shrink: 0;
  }

  .t3-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px; background: linear-gradient(90deg, #00c4cc, #3b82f6);
    color: #000; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 17px;
    border: none; cursor: pointer; text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .t3-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

  .t3-btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 36px; background: transparent; color: #fff;
    font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 17px;
    border: 2px solid rgba(255,255,255,0.2); cursor: pointer; text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .t3-btn-secondary:hover { border-color: #00c4cc; background: rgba(0,196,204,0.08); }

  .t3-btn-outcome {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 18px 40px; background: #fff; color: #000;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 18px;
    border: none; cursor: pointer; text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .t3-btn-outcome:hover { opacity: 0.9; transform: translateY(-2px); }

  .t3-nav-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 15px; transition: color 0.2s; }
  .t3-nav-link:hover { color: #00c4cc; }
`;

const steps = [
  {
    number: "01", icon: "📍",
    tag: "Lead Capture & Revenue Automation",
    title: "Your entire revenue system — built and running",
    benefit: "Every lead source, every follow-up channel, every conversion point — wired together into one automated machine that captures and closes revenue around the clock.",
    pill: "Full pipeline, zero manual work",
    gradient: "linear-gradient(135deg, #00c4cc, #3b82f6)",
    glow: "rgba(0,196,204,0.12)", optional: false, touchpoints: false,
  },
  {
    number: "02", icon: "⭐",
    tag: "Google Presence + Review Automation",
    title: "Dominate search. Stay there automatically.",
    benefit: "Fully optimized Google Business Profile with a review automation engine running weekly. Fresh 5-stars keep coming in — your ranking compounds while you're on the job.",
    pill: "Permanent top 3 position",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    glow: "rgba(245,158,11,0.12)", optional: false, touchpoints: false,
  },
  {
    number: "03", icon: "🤖",
    tag: "24/7 AI Talking Website + Smart FAQ Bot",
    title: "Your website talks, qualifies, and books — while you sleep",
    benefit: "A conversion-driven site with an AI that answers questions, handles objections, and books jobs instantly. Every visitor gets a response in seconds — day or night.",
    pill: "Zero leads lost after hours",
    gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    glow: "rgba(139,92,246,0.12)", optional: false, touchpoints: false,
  },
  {
    number: "04", icon: "⚡",
    tag: "Appointment Setting + Lead Nurture + Instant Follow-Up",
    title: "Instant response + 14 touches until they book",
    benefit: "The second a lead comes in, the system responds. Then it runs 14 automated touchpoints across text, email, and voicemail — nurturing until they book or opt out. 78% of jobs go to whoever follows up first and most.",
    pill: "14-touch automated follow-up",
    gradient: "linear-gradient(135deg, #14b8a6, #10b981)",
    glow: "rgba(20,184,166,0.12)", optional: false, touchpoints: true,
  },
  {
    number: "05", icon: "💰",
    tag: "Automated Invoice Collection",
    title: "Stop chasing money — it comes to you",
    benefit: "Invoices go out automatically after every job. Payment reminders follow up for you. Cash hits your account without a single awkward follow-up call.",
    pill: "2–3x faster cash flow",
    gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    glow: "rgba(59,130,246,0.12)", optional: false, touchpoints: false,
  },
  {
    number: "06", icon: "📋",
    tag: "Quoting & Job Pipeline System",
    title: "Every job tracked — from quote to closed",
    benefit: "Integrated quoting that sends proposals instantly and tracks every job through your pipeline. Nothing falls through the cracks. You always know what's open, what's closing, and what's paid.",
    pill: "Full visibility on every dollar",
    gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
    glow: "rgba(16,185,129,0.12)", optional: false, touchpoints: false,
  },
  {
    number: "07", icon: "🎯",
    tag: "Google & Meta Paid Traffic Infrastructure",
    title: "Turn ads into booked jobs — on demand",
    benefit: "When organic leads aren't enough, paid traffic fills the gap fast. We build and manage Google and Meta campaigns engineered to book jobs — not just generate clicks.",
    pill: "Instant pipeline on demand",
    gradient: "linear-gradient(135deg, #f43f5e, #ec4899)",
    glow: "rgba(244,63,94,0.12)", optional: true, touchpoints: false,
  },
  {
    number: "08", icon: "📈",
    tag: "Ongoing Optimization, Monitoring & Scaling",
    title: "The system gets stronger every single month",
    benefit: "Monthly performance monitoring, ranking expansion, and growth optimization. We track what's working, fix what isn't, and scale what's winning — while you focus on running the business.",
    pill: "Compounding growth, no extra effort",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    glow: "rgba(236,72,153,0.12)", optional: false, touchpoints: false,
  },
];

export default function Tier3() {
  const [visibleSteps, setVisibleSteps] = useState(new Set<number>());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setVisibleSteps((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.12 }
    );
    stepRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="t3-wrapper">

      {/* HERO */}
      <section style={{ position: "relative", padding: "120px 20px 80px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none" }}>
          <div className="t3-grain" style={{ width: "200%", height: "200%", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, rgba(0,240,255,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 60%, rgba(176,38,255,0.07) 0%, transparent 60%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ display: "inline-block", padding: "8px 22px", borderRadius: 99, border: "1px solid rgba(0,240,255,0.25)", background: "rgba(0,240,255,0.04)", fontSize: 11, letterSpacing: "0.25em", color: "#00c4cc", textTransform: "uppercase" }}>
              Full Domination Ecosystem — Tier 3
            </span>
          </div>

          <h1 className="t3-display" style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 800, lineHeight: 0.9, margin: "0 0 28px" }}>
            <span style={{ display: "block", color: "#fff" }}>Everything That</span>
            <span className="t3-illuminate" style={{ display: "block" }}>Makes You Money</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.4)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6, fontWeight: 400 }}>
            8 revenue systems. One price. Built, managed, and scaled for you — so you can focus on doing the work.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://buy.stripe.com/3cI4gzaMhaNMfN6aOQ4ko0d" target="_blank" rel="noopener noreferrer" className="t3-btn-primary">
              Get Started — $6,499 →
            </a>
            <Link to="/book-call" className="t3-btn-secondary">
              Book Free Audit First
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 64px)", marginTop: 56 }}>
            {[{ val: "8", label: "Revenue systems" }, { val: "$6,499", label: "One-time build" }, { val: "+$1k/mo", label: "Growth management" }].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="t3-display" style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, background: "linear-gradient(135deg, #00c4cc, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section style={{ padding: "40px 20px 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="t3-display" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
              How $6,499 Pays For Itself
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              Every piece of the system is tied to one thing: your revenue.
            </p>
          </div>

          {steps.map((step, i) => (
            <div key={i}>
              <div
                ref={(el) => { stepRefs.current[i] = el; }}
                className={["t3-step-card", visibleSteps.has(i) ? "visible" : "", step.optional ? "optional" : ""].join(" ").trim()}
                style={{ transitionDelay: `${i * 0.04}s`, boxShadow: visibleSteps.has(i) ? `0 0 40px ${step.glow}` : "none" }}
              >
                {step.optional && (
                  <div style={{ position: "absolute", top: -12, right: 16 }}>
                    <span style={{ display: "inline-block", padding: "3px 12px", background: "#111", border: "1px solid rgba(255,200,50,0.25)", borderRadius: 99, fontSize: 10, color: "rgba(255,200,50,0.7)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Optional add-on
                    </span>
                  </div>
                )}

                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: step.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    {step.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", margin: "0 0 4px" }}>
                      Step {step.number} — {step.tag}
                    </p>
                    <h3 className="t3-display" style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700, color: "#fff", margin: "0 0 10px", lineHeight: 1.3 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 14px" }}>
                      {step.benefit}
                    </p>
                    {step.touchpoints && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                        {Array.from({ length: 14 }, (_, n) => (
                          <div key={n} className="t3-tp-dot">{n + 1}</div>
                        ))}
                      </div>
                    )}
                    <span className="t3-pill">✓ {step.pill}</span>
                  </div>

                  <div className="t3-display" style={{ fontSize: 48, fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, flexShrink: 0, userSelect: "none" }}>
                    {step.number}
                  </div>
                </div>
              </div>

              {i < steps.length - 1 && <div className="t3-connector" />}
            </div>
          ))}

          {/* Outcome */}
          <div style={{ marginTop: 8, background: "linear-gradient(145deg, #0d1f1f, #000)", border: "1px solid rgba(0,196,204,0.2)", borderRadius: 16, padding: "40px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.12, background: "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.5) 0%, transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#00c4cc", textTransform: "uppercase", margin: "0 0 16px" }}>The Result</p>
              <h3 className="t3-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
                Fully booked. Higher margins.<br />Growing every single month.
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 auto 32px", maxWidth: 420, lineHeight: 1.7 }}>
                One closed job covers a significant portion of the setup cost. The system pays for itself — then keeps compounding.
              </p>
              <a href="https://buy.stripe.com/3cI4gzaMhaNMfN6aOQ4ko0d" target="_blank" rel="noopener noreferrer" className="t3-btn-outcome">
                Get The Full System ⚡
              </a>
              <p style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                Or call us: <a href="tel:2145060806" style={{ color: "#00c4cc", textDecoration: "none" }}>(214) 506-0806</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          <div>
            <div className="t3-display" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              <span style={{ color: "#00c4cc" }}>PRIME</span><br />
              <span style={{ color: "#fff" }}>VISIBILITY</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Full-system growth for service businesses.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([["Home", "/"], ["Book a Call", "/book-call"], ["Portfolio", "/portfolio"], ["Contact", "/contact"]] as [string, string][]).map(([label, to]) => (
              <Link key={to} to={to} className="t3-nav-link">{label}</Link>
            ))}
          </div>
          <div>
            <a href="tel:2145060806" style={{ display: "block", fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#00c4cc", textDecoration: "none", marginBottom: 8 }}>(214) 506-0806</a>
            <a href="https://www.instagram.com/primevisibilitymedia/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>@primevisibilitymedia</a>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 40, fontSize: 12, color: "rgba(255,255,255,0.15)" }}>
          © 2025 Prime Visibility Media. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
