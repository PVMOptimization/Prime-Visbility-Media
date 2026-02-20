import { useEffect, useRef, useState } from "react";

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
  @keyframes floatCard {
    0%, 100% { transform: scale(1.05) translateY(0px); }
    50% { transform: scale(1.05) translateY(-10px); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 40px rgba(130,80,255,0.5), 0 0 80px rgba(0,212,255,0.2), 0 0 120px rgba(130,80,255,0.1); }
    50% { box-shadow: 0 0 80px rgba(130,80,255,0.8), 0 0 140px rgba(0,212,255,0.4), 0 0 200px rgba(130,80,255,0.2); }
  }
  @keyframes badgeShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes textShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes starPulse {
    0%, 100% { color: #ffd700; text-shadow: 0 0 6px rgba(255,215,0,0.6); }
    50% { color: #fff7aa; text-shadow: 0 0 12px rgba(255,215,0,1); }
  }
  @keyframes btnSheen {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .tg-wrapper { font-family: 'Rajdhani', sans-serif; }

  .card-standard {
    animation: fadeUp 0.5s ease both;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0.8;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
  }
  .card-standard:hover {
    transform: translateY(-6px) !important;
    opacity: 1;
  }

  .card-premium-wrap {
    position: relative;
    border-radius: 20px;
    padding: 3px;
    animation: floatCard 5s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
    background: linear-gradient(135deg, #8250ff, #00d4ff, #ff6eb4, #8250ff, #00d4ff);
    background-size: 400% 400%;
    animation: borderRotate 3s ease infinite, floatCard 5s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
  }

  .card-premium-inner {
    background: linear-gradient(160deg, #0e0a2a 0%, #130a2e 40%, #0a0f28 100%);
    border-radius: 18px;
    padding: 36px 28px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .card-premium-inner::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at 60% 30%, rgba(130,80,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }

  .premium-badge {
    display: inline-block;
    padding: 7px 20px;
    border-radius: 30px;
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #fff;
    background: linear-gradient(90deg, #8250ff, #00d4ff, #ff6eb4, #8250ff);
    background-size: 300% auto;
    animation: badgeShimmer 2s linear infinite;
    box-shadow: 0 0 20px rgba(130,80,255,0.7), 0 0 40px rgba(0,212,255,0.3);
    margin-bottom: 20px;
  }

  .shimmer-text {
    background: linear-gradient(90deg, #a87fff, #00d4ff, #ff9fff, #a87fff);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShimmer 2.5s linear infinite;
  }

  .premium-feature-icon {
    animation: starPulse 2s ease-in-out infinite;
  }

  .premium-cta {
    display: block;
    text-align: center;
    padding: 17px;
    border-radius: 10px;
    font-family: 'Orbitron', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(90deg, #8250ff, #00d4ff, #8250ff);
    background-size: 300% auto;
    animation: btnSheen 2s linear infinite;
    border: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .premium-cta:hover {
    transform: scale(1.04);
    box-shadow: 0 0 40px rgba(130,80,255,0.8), 0 0 80px rgba(0,212,255,0.4);
  }

  .standard-cta {
    display: block;
    text-align: center;
    padding: 14px;
    border-radius: 8px;
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;

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
    bg: "",
    badge: "★ Most Powerful Plan",
    features: [
      "Full automation eco system",
      "Full Google business optimization + Review automation",
      "Conversion based 3-5 page 24/7 Talking website bot + FAQ's bot",
      "24/7 Appointment setting + Lead follow up + Quoting system",
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
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  return (
    <div className="tg-wrapper" style={{ background: "#050a14", minHeight: "100vh", padding: "60px 20px 80px" }}>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 900, color: "#fff",
          letterSpacing: 2, textTransform: "uppercase", margin: 0,
        }}>
          Tiered Growth Systems
        </h1>
        <p style={{ marginTop: 14, color: "#6b8aaa", fontSize: 15, letterSpacing: 1 }}>
          Your complete path to scalable growth and automation
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 32,
        maxWidth: 1150,
        margin: "0 auto",
        alignItems: "center",
      }}>
        {tiers.map((tier) => {
          if (tier.premium) {
            return (
              <div key={tier.name} className="card-premium-wrap">
                <div className="card-premium-inner">
                  <div style={{ textAlign: "center" }}>
                    <span className="premium-badge">{tier.badge}</span>
                  </div>

                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                    <span className="shimmer-text">{tier.label}</span>
                  </div>

                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 24, fontWeight: 900, marginBottom: 4 }}>
                    <span className="shimmer-text">{tier.name}</span>
                  </div>

                  <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
                    <span className="shimmer-text">{tier.price}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6a5a9a", fontWeight: 500, letterSpacing: 1, marginBottom: 6 }}>{tier.sub}</div>
                  <div style={{ fontSize: 12, color: "#5a4090", fontStyle: "italic", marginBottom: 22 }}>Talking website starts immediately</div>

                  <hr style={{ border: "none", height: 1, background: "linear-gradient(90deg, #8250ff, #00d4ff, transparent)", marginBottom: 22 }} />

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 13, flexGrow: 1 }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, fontWeight: 600, color: "#c0a8ff", alignItems: "flex-start" }}>
                        <span className="premium-feature-icon" style={{
                          width: 20, height: 20, borderRadius: "50%", display: "flex",
                          alignItems: "center", justifyContent: "center", flexShrink: 0,
                          fontSize: 11, marginTop: 1,
                          background: "rgba(255,215,0,0.12)",
                          border: "1px solid rgba(255,215,0,0.4)",
                        }}>★</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    textAlign: "center", padding: "10px 12px", borderRadius: 8, marginBottom: 24,
                    background: "rgba(130,80,255,0.12)", border: "1px solid rgba(130,80,255,0.3)",
                    fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                  }}>
                    <span className="shimmer-text">{tier.purpose}</span>
                  </div>

                  <a href={tier.stripeLink} target="_blank" rel="noopener noreferrer" className="premium-cta">
                    Get Started →
                  </a>
                </div>
              </div>
            );
          }

          return (
            <div key={tier.name} className="card-standard" style={{ background: tier.bg, animationDelay: tier.label === "Tier 1" ? "0s" : "0.15s" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                padding: "5px 12px", borderRadius: 4, display: "inline-block", marginBottom: 14,
                background: `${tier.color}22`, color: tier.color,
                border: `1px solid ${tier.color}44`, width: "fit-content",
                fontFamily: "'Orbitron', monospace",
              }}>{tier.label}</div>

              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 900, color: tier.color, marginBottom: 4 }}>{tier.name}</div>

              <div style={{ fontSize: 24, fontWeight: 700, color: tier.color, marginBottom: 4 }}>{tier.price}</div>
              <div style={{ fontSize: 12, color: "#4a6a8a", fontWeight: 500, letterSpacing: 1, marginBottom: 20 }}>{tier.sub}</div>

              <hr style={{ border: "none", height: 1, background: `${tier.color}33`, marginBottom: 18 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
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
                className="standard-cta"
                style={{
                  background: `linear-gradient(135deg, ${tier.color}33, ${tier.color}11)`,
                  color: tier.color,
                  border: `1px solid ${tier.color}66`,
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

      <div style={{ textAlign: "center", marginTop: 52, fontSize: 13, color: "#3a5570", letterSpacing: 1, fontWeight: 600 }}>
        Ad spend billed separately on Tier 3 · All tiers include onboarding support
      </div>
    </div>
  );
}
