import { useEffect, useRef } from "react";

const tiers = [
  {
    label: "Tier 1",
    name: "Foundation",
    price: "$997",
    sub: "One-Time",
    color: "#c97d2e",
    bg: "linear-gradient(145deg, #0d1a2a, #0a1520)",
    features: [
      "Google Business profile optimization",
      "Map pack authority (Top 5)",
      "Review automation system",
      "Mobile first 1-page website",
    ],
    purpose: "Fix visibility, trust, and missed calls",
    stripeLink: "https://buy.stripe.com/6oU00jbQl6xw1Wge124ko0b",
    premium: false,
  },
  {
    label: "Tier 2",
    name: "Growth",
    price: "$2,500",
    sub: "One-time + $599/month",
    color: "#2ea8c9",
    bg: "linear-gradient(145deg, #0d1f2e, #091828)",
    features: [
      "Google Business profile optimization",
      "Map pack authority (Top 3)",
      "Review automation system",
      "3–5 page full conversion website",
      "Local SEO structure",
      "Monthly growth tracking + reports",
      "24/7 Appointment setting",
    ],
    purpose: "Dominate local search and automate leads",
    stripeLink: "https://buy.stripe.com/5kQ8wP8E92hggRa9KM4ko0c",
    premium: false,
  },
  {
    label: "4Nexus™",
    name: "System",
    price: "$4,499",
    sub: "Installation + $1,000/month",
    color: "#a87fff",
    bg: "linear-gradient(160deg, #0e0a2a 0%, #130a2e 40%, #0a0f28 100%)",
    badge: "MOST POWERFUL",
    features: [
      "Full automation eco system",
      "24/7 Talking website bot",
      "24/7 Appointment setting",
      "24/7 Lead follow up",
      "24/7 Quoting system",
      "24/7 FAQ's bot",
      "Google + Meta Ads (optional)",
      "Ad spend billed separately",
      "Ongoing optimization & monitoring",
    ],
    purpose: "Done-For-You Growth Infrastructure",
    stripeLink: "https://buy.stripe.com/3cI5kD8E9f4244obSU4ko0a",
    premium: true,
  },
];

export default function TieredGrowth() {
  const premiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = premiumRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div style={{
      background: "#050a14",
      minHeight: "100vh",
      padding: "60px 20px 80px",
      fontFamily: "'Rajdhani', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(130,80,255,0.3), 0 0 80px rgba(0,212,255,0.1); }
          50% { box-shadow: 0 0 80px rgba(130,80,255,0.5), 0 0 120px rgba(0,212,255,0.2); }
        }

        .standard-card {
          animation: fadeUp 0.5s ease both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          opacity: 0.85;
        }
        .standard-card:hover {
          transform: translateY(-4px);
          opacity: 1;
        }

        .premium-card {
          animation: fadeUp 0.5s ease 0.2s both, floatUp 5s ease-in-out 1s infinite, glowPulse 3s ease-in-out infinite;
          position: relative;
          isolation: isolate;
          transform: scale(1.04);
        }

        .premium-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          background: linear-gradient(135deg, #8250ff, #00d4ff, #ff6eb4, #8250ff);
          background-size: 300% 300%;
          animation: shimmer 3s linear infinite;
          z-index: -1;
        }

        .premium-card::after {
          content: '';
          position: absolute;
          inset: -30px;
          border-radius: 30px;
          background: radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), rgba(130,80,255,0.2) 0%, transparent 65%);
          z-index: -2;
          pointer-events: none;
        }

        .shimmer-text {
          background: linear-gradient(135deg, #a87fff, #00d4ff, #a87fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
        }

        .premium-badge {
          background: linear-gradient(135deg, #8250ff, #00d4ff);
          background-size: 200% 200%;
          animation: shimmer 2s linear infinite;
          font-family: 'Orbitron', monospace;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
          color: #fff;
          padding: 6px 18px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 18px;
          text-transform: uppercase;
          box-shadow: 0 0 20px rgba(130,80,255,0.6), 0 0 40px rgba(0,212,255,0.2);
        }

        .premium-btn {
          background: linear-gradient(135deg, #8250ff, #00d4ff) !important;
          color: #fff !important;
          border: none !important;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease !important;
        }
        .premium-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
        .premium-btn:hover {
          box-shadow: 0 0 40px rgba(130,80,255,0.7), 0 0 80px rgba(0,212,255,0.3) !important;
          transform: scale(1.03) !important;
        }

        .standard-btn {
          transition: all 0.2s ease;
        }
        .standard-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}>
          Tiered Growth Systems
        </h1>
        <p style={{ marginTop: 12, color: "#6b8aaa", fontSize: 15, letterSpacing: 1 }}>
          Your complete path to scalable growth and automation
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 28,
        maxWidth: 1150,
        margin: "0 auto",
        alignItems: "center",
      }}>
        {tiers.map((tier) => {
          if (tier.premium) {
            return (
              <div
                key={tier.name}
                ref={premiumRef}
                className="premium-card"
                style={{
                  background: tier.bg,
                  borderRadius: 18,
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="premium-badge">★ Most Powerful Plan</div>
                </div>

                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 3,
                  textTransform: "uppercase", marginBottom: 8,
                  fontFamily: "'Orbitron', monospace",
                }}>
                  <span className="shimmer-text">{tier.label}</span>
                </div>

                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 24, fontWeight: 900, marginBottom: 4 }}>
                  <span className="shimmer-text">{tier.name}</span>
                </div>

                <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 4 }}>
                  <span className="shimmer-text">{tier.price}</span>
                  <div style={{ fontSize: 12, color: "#6a5a9a", fontWeight: 500, letterSpacing: 1, marginTop: 4 }}>
                    {tier.sub}
                  </div>
                </div>

                <div style={{ fontSize: 12, color: "#6040a0", marginBottom: 22, fontStyle: "italic" }}>
                  Talking website starts immediately
                </div>

                <hr style={{ border: "none", height: 1, background: "linear-gradient(90deg, #8250ff66, #00d4ff66, transparent)", marginBottom: 22 }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 13, marginBottom: 28, flexGrow: 1, padding: 0 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, fontWeight: 600, color: "#c0a8ff", alignItems: "flex-start" }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%", display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                        fontSize: 10, marginTop: 1,
                        background: "rgba(255,215,0,0.12)",
                        color: "#ffd700",
                        border: "1px solid rgba(255,215,0,0.35)",
                      }}>★</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{
                  fontSize: 11, letterSpacing: 1, fontWeight: 700, marginBottom: 24,
                  textAlign: "center", padding: "10px 12px", borderRadius: 8,
                  background: "rgba(130,80,255,0.1)", border: "1px solid rgba(130,80,255,0.25)",
                }}>
                  <span className="shimmer-text">{tier.purpose}</span>
                </div>

                <a
                  href={tier.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-btn"
                  style={{
                    display: "block", textAlign: "center", padding: "17px",
                    borderRadius: 10, fontFamily: "'Orbitron', monospace",
                    fontSize: 13, fontWeight: 700, letterSpacing: 2,
                    textDecoration: "none", textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Get Started →
                </a>
              </div>
            );
          }

          return (
            <div
              key={tier.name}
              className="standard-card"
              style={{
                background: tier.bg,
                borderRadius: 16,
                padding: "28px 24px",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                animationDelay: tier.label === "Tier 1" ? "0s" : "0.1s",
              }}
            >
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 3,
                textTransform: "uppercase", padding: "5px 12px",
                borderRadius: 4, display: "inline-block", marginBottom: 14,
                background: `${tier.color}22`, color: tier.color,
                border: `1px solid ${tier.color}44`, width: "fit-content",
                fontFamily: "'Orbitron', monospace",
              }}>
                {tier.label}
              </div>

              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 900, color: tier.color, marginBottom: 4 }}>
                {tier.name}
              </div>

              <div style={{ fontSize: 24, fontWeight: 700, color: tier.color, marginBottom: 20 }}>
                {tier.price}
                <div style={{ fontSize: 12, color: "#4a6a8a", fontWeight: 500, letterSpacing: 1, marginTop: 2 }}>
                  {tier.sub}
                </div>
              </div>

              <hr style={{ border: "none", height: 1, background: `${tier.color}33`, marginBottom: 18 }} />

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, flexGrow: 1, padding: 0 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, fontWeight: 500, color: "#8aa8c8", alignItems: "flex-start" }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                      fontSize: 10, background: `${tier.color}22`, color: tier.color,
                      border: `1px solid ${tier.color}44`, marginTop: 1,
                    }}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ fontSize: 11, color: "#4a6a8a", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 20 }}>
                {tier.purpose}
              </div>

              <a
                href={tier.stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="standard-btn"
                style={{
                  display: "block", textAlign: "center", padding: "14px",
                  borderRadius: 8, fontFamily: "'Orbitron', monospace",
                  fontSize: 12, fontWeight: 700, letterSpacing: 2,
                  textDecoration: "none", textTransform: "uppercase",
                  background: `linear-gradient(135deg, ${tier.color}33, ${tier.color}11)`,
                  color: tier.color, border: `1px solid ${tier.color}66`,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${tier.color}44`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = `linear-gradient(135deg, ${tier.color}33, ${tier.color}11)`)}
              >
                Get Started →
              </a>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 48, fontSize: 13, color: "#3a5570", letterSpacing: 1, fontWeight: 600 }}>
        Ad spend billed separately on Tier 3 · All tiers include onboarding support
      </div>
    </div>
  );
}
