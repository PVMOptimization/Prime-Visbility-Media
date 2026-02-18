import { useEffect } from "react";

const tiers = [
  {
    label: "Tier 1",
    name: "Foundation",
    price: "$997",
    sub: "One-Time",
    color: "#c97d2e",
    bg: "linear-gradient(145deg, #0d1a2a, #0a1520)",
    border: "linear-gradient(135deg, #c97d2e, #7a4d1a)",
    features: [
      "Google Business profile optimization",
      "Map pack authority (Top 5)",
      "Review automation system",
      "Mobile first 1-page website",
    ],
    purpose: "Fix visibility, trust, and missed calls",
    stripeLink: "https://buy.stripe.com/6oU00jbQl6xw1Wge124ko0b",
  },
  {
    label: "Tier 2",
    name: "Growth",
    price: "$2,500",
    sub: "One-time + $599/month",
    color: "#2ea8c9",
    bg: "linear-gradient(145deg, #0d1f2e, #091828)",
    border: "linear-gradient(135deg, #2ea8c9, #1a6a7a)",
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
  },
  {
    label: "4Nexus™",
    name: "System",
    price: "$4,499",
    sub: "Installation + $1,000/month",
    color: "#a87fff",
    bg: "linear-gradient(145deg, #0d1a30, #070f24)",
    border: "linear-gradient(135deg, #8250ff, #4a1fa8, #00d4ff)",
    badge: "★ Done For You",
    features: [
      "Full automation eco system",
      "24/7 Talking website bot",
      "24/7 Appointment setting",
      "24/7 Lead follow up",
      "24/7 Quoting system",
      "24/7 FAQ's bot",
      "Google + Meta ads infrastructure",
      "Ongoing optimization & monitoring",
    ],
    purpose: "Done-For-You Growth Infrastructure",
    stripeLink: "https://buy.stripe.com/3cI5kD8E9f4244obSU4ko0a",
  },
];

export default function TieredGrowth() {
  return (
    <div style={{
      background: "#050a14",
      minHeight: "100vh",
      padding: "60px 20px",
      fontFamily: "'Rajdhani', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}>Tiered Growth Systems</h1>
        <p style={{ marginTop: 12, color: "#6b8aaa", fontSize: 15, letterSpacing: 1 }}>
          Your complete path to scalable growth and automation
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        {tiers.map((tier) => (
          <div key={tier.name} style={{
            background: tier.bg,
            borderRadius: 16,
            padding: "28px 24px",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}>
            {tier.badge && (
              <div style={{
                position: "absolute", top: 20, right: 20,
                background: "linear-gradient(135deg, #8250ff, #00d4ff)",
                color: "#fff", fontSize: 9, fontWeight: 700,
                letterSpacing: 1, padding: "4px 8px", borderRadius: 4,
                fontFamily: "'Orbitron', monospace",
              }}>{tier.badge}</div>
            )}

            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 3,
              textTransform: "uppercase", padding: "5px 12px",
              borderRadius: 4, display: "inline-block", marginBottom: 14,
              background: `${tier.color}22`, color: tier.color,
              border: `1px solid ${tier.color}44`, width: "fit-content",
              fontFamily: "'Orbitron', monospace",
            }}>{tier.label}</div>

            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 18,
              fontWeight: 900, color: tier.color, marginBottom: 4,
            }}>{tier.name}</div>

            <div style={{ fontSize: 24, fontWeight: 700, color: tier.color, marginBottom: 20 }}>
              {tier.price}
              <div style={{ fontSize: 12, color: "#4a6a8a", fontWeight: 500, letterSpacing: 1, marginTop: 2 }}>
                {tier.sub}
              </div>
            </div>

            <hr style={{ border: "none", height: 1, background: `${tier.color}33`, marginBottom: 18 }} />

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, flexGrow: 1 }}>
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

            
              href={tier.stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block", textAlign: "center", padding: "14px",
                borderRadius: 8, fontFamily: "'Orbitron', monospace",
                fontSize: 12, fontWeight: 700, letterSpacing: 2,
                textDecoration: "none", textTransform: "uppercase",
                background: `linear-gradient(135deg, ${tier.color}33, ${tier.color}11)`,
                color: tier.color, border: `1px solid ${tier.color}66`,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => e.target.style.background = `${tier.color}44`}
              onMouseLeave={e => e.target.style.background = `linear-gradient(135deg, ${tier.color}33, ${tier.color}11)`}
            >
              Get Started →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
