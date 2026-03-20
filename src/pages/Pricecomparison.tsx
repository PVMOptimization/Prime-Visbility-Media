import { useEffect, useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

  @keyframes shimmer {
    0% { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes borderRotate {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 40px rgba(130,80,255,0.5), 0 0 80px rgba(0,212,255,0.2); }
    50% { box-shadow: 0 0 80px rgba(130,80,255,0.8), 0 0 140px rgba(0,212,255,0.4); }
  }
  @keyframes textShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes redPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255,60,60,0.3); }
    50% { box-shadow: 0 0 40px rgba(255,60,60,0.6); }
  }
  @keyframes vsFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-8px) scale(1.05); }
  }
  @keyframes strikeThrough {
    from { width: 0%; }
    to { width: 100%; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes badgeShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .pc-wrapper { font-family: 'Rajdhani', sans-serif; }

  .shimmer-text {
    background: linear-gradient(90deg, #a87fff, #00d4ff, #ff9fff, #a87fff);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShimmer 2.5s linear infinite;
  }

  .them-card {
    animation: fadeUp 0.6s ease both;
    border-radius: 16px;
    padding: 28px 24px;
    border: 1px solid rgba(255,60,60,0.15);
    background: linear-gradient(160deg, #1a0a0a 0%, #120808 100%);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .them-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,60,60,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .them-card:hover { transform: translateY(-4px); animation: redPulse 2s ease-in-out infinite; }

  .us-card-wrap {
    position: relative;
    border-radius: 20px;
    padding: 3px;
    background: linear-gradient(135deg, #8250ff, #00d4ff, #ff6eb4, #8250ff);
    background-size: 400% 400%;
    animation: borderRotate 3s ease infinite, glowPulse 3s ease-in-out infinite, float 5s ease-in-out infinite;
  }
  .us-card-inner {
    background: linear-gradient(160deg, #0e0a2a 0%, #130a2e 40%, #0a0f28 100%);
    border-radius: 18px;
    padding: 32px 26px;
    position: relative;
    overflow: hidden;
  }
  .us-card-inner::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(ellipse at 60% 30%, rgba(130,80,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }

  .vs-bubble {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', monospace;
    font-size: 18px; font-weight: 900;
    background: linear-gradient(135deg, #1a0a2e, #0a0f28);
    border: 2px solid rgba(130,80,255,0.5);
    color: #fff;
    animation: vsFloat 3s ease-in-out infinite;
    box-shadow: 0 0 30px rgba(130,80,255,0.4), 0 0 60px rgba(0,212,255,0.2);
    position: relative;
    z-index: 2;
  }

  .feature-row {
    display: grid;
    grid-template-columns: 1fr 80px 1fr;
    gap: 12px;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    animation: fadeUp 0.5s ease both;
  }
  .feature-row:last-child { border-bottom: none; }

  .them-feature {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 14px; font-weight: 500; color: #7a4a4a;
    text-align: right; justify-content: flex-end;
  }
  .us-feature {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 14px; font-weight: 600; color: #b0a0ff;
  }

  .x-icon {
    width: 20px; height: 20px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,60,60,0.15); color: #ff4444;
    font-size: 11px; flex-shrink: 0;
    border: 1px solid rgba(255,60,60,0.3);
  }
  .check-icon {
    width: 20px; height: 20px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,212,100,0.15); color: #00d464;
    font-size: 11px; flex-shrink: 0;
    border: 1px solid rgba(0,212,100,0.3);
  }

  .price-badge-them {
    display: inline-block;
    padding: 5px 16px; border-radius: 30px;
    font-family: 'Orbitron', monospace;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    color: #ff6666;
    background: rgba(255,60,60,0.1);
    border: 1px solid rgba(255,60,60,0.3);
    margin-bottom: 16px;
  }

  .premium-badge {
    display: inline-block;
    padding: 7px 20px; border-radius: 30px;
    font-family: 'Orbitron', monospace;
    font-size: 9px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase;
    color: #fff;
    background: linear-gradient(90deg, #8250ff, #00d4ff, #ff6eb4, #8250ff);
    background-size: 300% auto;
    animation: badgeShimmer 2s linear infinite;
    box-shadow: 0 0 20px rgba(130,80,255,0.7), 0 0 40px rgba(0,212,255,0.3);
    margin-bottom: 16px;
  }

  .saving-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 24px; border-radius: 40px;
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    background: rgba(0,212,100,0.12);
    border: 1px solid rgba(0,212,100,0.4);
    color: #00d464;
    animation: fadeUp 0.8s ease both;
  }

  .monthly-tag {
    font-size: 11px; color: #ff6666; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
  }

  .strike {
    position: relative; display: inline-block;
  }
  .strike::after {
    content: '';
    position: absolute;
    top: 50%; left: 0;
    height: 2px;
    background: #ff4444;
    animation: strikeThrough 0.8s ease forwards;
    animation-delay: 0.5s;
    width: 0%;
  }

  .scanline-effect {
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(130,80,255,0.3), transparent);
    animation: scanline 4s linear infinite;
    pointer-events: none;
  }

  .bottom-cta {
    display: inline-block;
    padding: 18px 48px; border-radius: 10px;
    font-family: 'Orbitron', monospace;
    font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: #fff; text-decoration: none; cursor: pointer;
    background: linear-gradient(90deg, #8250ff, #00d4ff, #8250ff);
    background-size: 300% auto;
    animation: badgeShimmer 2s linear infinite;
    border: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .bottom-cta:hover {
    transform: scale(1.04);
    box-shadow: 0 0 40px rgba(130,80,255,0.8), 0 0 80px rgba(0,212,255,0.4);
  }

  .divider-label {
    display: flex; align-items: center; gap: 16px;
    margin: 0 auto;
    max-width: 900px;
  }
  .divider-line {
    flex: 1; height: 1px;
  }
`;

const competitors = [
  {
    name: "WebFX",
    label: "National SEO Agency",
    monthlyMin: 3000,
    monthlyMax: 5000,
    setupFee: "None",
    color: "#ff4444",
    what: "SEO reporting & keyword tracking only",
    missing: ["No AI call answering", "No booking automation", "No reputation system", "No pipeline", "No lead nurture", "No paid ads management"],
    included: ["SEO Reports", "Keyword Tracking", "Some content writing"],
  },
  {
    name: "Scorpion",
    label: "Home Service Specialist",
    monthlyMin: 2000,
    monthlyMax: 7000,
    setupFee: "$1,500+",
    color: "#ff6633",
    what: "Website + basic ad management",
    missing: ["No 24/7 AI answering", "No automation", "No reputation engine", "No appointment booking", "No lead follow-up"],
    included: ["Website design", "Google Ads management", "Basic analytics"],
  },
  {
    name: "Broadly",
    label: "Local Business Platform",
    monthlyMin: 350,
    monthlyMax: 600,
    setupFee: "$500",
    color: "#ff9933",
    what: "Reviews + basic texting only",
    missing: ["No website", "No SEO", "No AI answering", "No booking system", "No paid ads", "No pipeline"],
    included: ["Review requests", "Basic SMS", "Simple chat widget"],
  },
];

const comparisonRows = [
  { feature: "24/7 AI Call Answering", them: false, us: true },
  { feature: "Automated Booking & Reminders", them: false, us: true },
  { feature: "Instant Lead Follow-Up", them: false, us: true },
  { feature: "Review Generation Engine", them: false, us: true },
  { feature: "Google Map Pack Strategy", them: "Partial", us: true },
  { feature: "Conversion-Focused Website", them: "Extra cost", us: true },
  { feature: "AI Talking Website + FAQ Bot", them: false, us: true },
  { feature: "Job Pipeline System", them: false, us: true },
  { feature: "Paid Traffic (Google & Meta)", them: "Add-on", us: true },
  { feature: "Monthly Performance Reports", them: true, us: true },
];

export default function PriceComparison() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);
    setTimeout(() => setVisible(true), 100);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  const themAvgMonthly = 3500;
  const usMonthly = 1000;
  const annualSaving = (themAvgMonthly - usMonthly) * 12;

  return (
    <div className="pc-wrapper" style={{ background: "#050a14", minHeight: "100vh", padding: "60px 20px 100px", position: "relative", overflow: "hidden" }}>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(130,80,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(130,80,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 30,
            fontFamily: "'Orbitron', monospace", fontSize: 9, fontWeight: 700,
            letterSpacing: 3, textTransform: "uppercase",
            background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.3)",
            color: "#ff6666", marginBottom: 20,
          }}>
            ⚠ The Industry Price Truth
          </div>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(22px, 4vw, 42px)",
            fontWeight: 900, color: "#fff",
            letterSpacing: 2, textTransform: "uppercase",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}>
            What You Pay Elsewhere<br />
            <span className="shimmer-text">vs What You Get With Us</span>
          </h1>
          <p style={{ color: "#6b8aaa", fontSize: 16, letterSpacing: 1, maxWidth: 560, margin: "0 auto" }}>
            Most agencies charge more for one piece of the puzzle than we charge for the whole system.
          </p>
        </div>

        {/* Competitors grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {competitors.map((c, i) => (
            <div key={c.name} className="them-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="price-badge-them">{c.label}</div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, fontWeight: 900, color: "#ff5555", marginBottom: 4 }}>{c.name}</div>

              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#ff4444" }}>
                  ${c.monthlyMin.toLocaleString()}–${c.monthlyMax.toLocaleString()}
                </span>
                <span className="monthly-tag"> /month</span>
                {c.setupFee !== "None" && (
                  <div style={{ fontSize: 12, color: "#664444", marginTop: 4 }}>
                    + {c.setupFee} setup fee
                  </div>
                )}
              </div>

              <div style={{
                fontSize: 12, color: "#885555", fontWeight: 600, letterSpacing: 1,
                textTransform: "uppercase", marginBottom: 16, fontStyle: "italic",
              }}>
                "{c.what}"
              </div>

              <hr style={{ border: "none", height: 1, background: "rgba(255,60,60,0.1)", marginBottom: 16 }} />

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "#664444", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>What you get</div>
                {c.included.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: "#7a5a5a", fontSize: 13, fontWeight: 500 }}>
                    <span style={{ color: "#ff8844", fontSize: 10 }}>◆</span> {f}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 11, color: "#662222", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>What you don't get</div>
                {c.missing.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: "#553333", fontSize: 13, fontWeight: 500 }}>
                    <span className="x-icon">✕</span> {f}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 20, padding: "10px 14px", borderRadius: 8,
                background: "rgba(255,40,40,0.08)", border: "1px solid rgba(255,40,40,0.15)",
                fontSize: 12, color: "#884444", fontWeight: 600, textAlign: "center", letterSpacing: 1,
              }}>
                Annual cost: ${(c.monthlyMin * 12).toLocaleString()}–${(c.monthlyMax * 12).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* VS divider */}
        <div className="divider-label" style={{ marginBottom: 60 }}>
          <div className="divider-line" style={{ background: "linear-gradient(90deg, transparent, rgba(255,60,60,0.4))" }} />
          <div className="vs-bubble">VS</div>
          <div className="divider-line" style={{ background: "linear-gradient(90deg, rgba(130,80,255,0.4), transparent)" }} />
        </div>

        {/* Our card */}
        <div style={{ maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="us-card-wrap">
            <div className="us-card-inner">
              <div className="scanline-effect" />

              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span className="premium-badge">★ Prime Visibility Media — Full Domination Ecosystem</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
                <div style={{ textAlign: "center", padding: "20px", borderRadius: 12, background: "rgba(130,80,255,0.08)", border: "1px solid rgba(130,80,255,0.2)" }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, color: "#6a5a9a", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>One-Time Build</div>
                  <div style={{ fontSize: 32, fontWeight: 700 }}><span className="shimmer-text">$6,499</span></div>
                  <div style={{ fontSize: 11, color: "#5a4090", marginTop: 4 }}>Complete infrastructure setup</div>
                </div>
                <div style={{ textAlign: "center", padding: "20px", borderRadius: 12, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, color: "#4a8a9a", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Monthly Growth</div>
                  <div style={{ fontSize: 32, fontWeight: 700 }}><span className="shimmer-text">$1,000</span></div>
                  <div style={{ fontSize: 11, color: "#3a6070", marginTop: 4 }}>Ongoing management & scaling</div>
                </div>
              </div>

              <hr style={{ border: "none", height: 1, background: "linear-gradient(90deg, #8250ff, #00d4ff, transparent)", marginBottom: 24 }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {[
                  "24/7 AI Call Answering",
                  "Instant Lead Follow-Up",
                  "Automated Booking System",
                  "Review Generation Engine",
                  "Google Map Pack Strategy",
                  "Conversion-Focused Website",
                  "AI Talking Website + FAQ Bot",
                  "Job Pipeline System",
                  "Google & Meta Paid Ads",
                  "Monthly Performance Reports",
                  "Local SEO Structure",
                  "Reputation Automation",
                ].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, fontWeight: 500, color: "#b0a0ff" }}>
                    <span className="check-icon">✓</span> {f}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div className="saving-pill">
                  💰 Save up to ${annualSaving.toLocaleString()} per year vs agency alternatives
                </div>
              </div>

              <a
                href="https://buy.stripe.com/3cI4gzaMhaNMfN6aOQ4ko0d"
                target="_blank"
                rel="noopener noreferrer"
                className="bottom-cta"
                style={{ display: "block", textAlign: "center" }}
              >
                Get The Full System →
              </a>
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div style={{ maxWidth: 900, margin: "0 auto 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(16px, 3vw, 26px)",
              fontWeight: 900, color: "#fff",
              letterSpacing: 2, textTransform: "uppercase", margin: 0,
            }}>
              Feature-by-Feature Breakdown
            </h2>
          </div>

          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 80px 1fr",
            gap: 12, padding: "12px 0", marginBottom: 8,
          }}>
            <div style={{ textAlign: "right", fontFamily: "'Orbitron', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#ff5555", textTransform: "uppercase" }}>
              Typical Agency
            </div>
            <div />
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              <span className="shimmer-text">Prime Visibility</span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 16, padding: "8px 24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            {comparisonRows.map((row, i) => (
              <div key={row.feature} className="feature-row" style={{ animationDelay: `${i * 0.05}s` }}>
                {/* Them */}
                <div className="them-feature">
                  <span style={{ color: row.them === true ? "#664444" : row.them === false ? "#553333" : "#886633" }}>
                    {row.them === true ? "Basic version only" : row.them === false ? "Not included" : row.them}
                  </span>
                  <span className={row.them === true ? "x-icon" : row.them === false ? "x-icon" : "x-icon"} style={{
                    background: row.them === true ? "rgba(255,150,0,0.15)" : "rgba(255,60,60,0.15)",
                    color: row.them === true ? "#ff9900" : "#ff4444",
                    border: `1px solid ${row.them === true ? "rgba(255,150,0,0.3)" : "rgba(255,60,60,0.3)"}`,
                  }}>
                    {row.them === true ? "~" : "✕"}
                  </span>
                </div>

                {/* Center label */}
                <div style={{
                  textAlign: "center", fontFamily: "'Orbitron', monospace",
                  fontSize: 9, fontWeight: 700, letterSpacing: 1,
                  color: "#3a4a6a", textTransform: "uppercase",
                  lineHeight: 1.3,
                }}>
                  {row.feature}
                </div>

                {/* Us */}
                <div className="us-feature">
                  <span className="check-icon">✓</span>
                  <span>Fully included</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <div style={{
          maxWidth: 700, margin: "0 auto",
          textAlign: "center",
          padding: "48px 32px", borderRadius: 20,
          background: "linear-gradient(160deg, #0e0a2a, #0a0f28)",
          border: "1px solid rgba(130,80,255,0.2)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(130,80,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, color: "#6a5a9a", letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>
              The bottom line
            </div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#a090d0", marginBottom: 28, lineHeight: 1.6 }}>
              WebFX will charge you{" "}
              <span style={{ color: "#ff5555", fontWeight: 700 }}>$36,000–$60,000 a year</span>{" "}
              for SEO reports.<br />
              We give you the whole system for a fraction of that —{" "}
              <span className="shimmer-text" style={{ fontWeight: 700 }}>and it runs while you're on the jobsite.</span>
            </p>
            <a
              href="https://buy.stripe.com/3cI4gzaMhaNMfN6aOQ4ko0d"
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-cta"
            >
              See What We Can Build For You →
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 48, fontSize: 12, color: "#2a3a50", letterSpacing: 1, fontWeight: 600 }}>
          All competitor pricing sourced from publicly available agency rate data · Ad spend billed separately
        </div>
      </div>
    </div>
  );
}
