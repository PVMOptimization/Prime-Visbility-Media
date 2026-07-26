import { GlowCard } from "../components/ui/spotlight-card";

interface PricingFeature {
  name: string;
  description?: string;
}

interface PricingTier {
  name: string;
  price: string | { upfront: string; per: string };
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  glowColor: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  badge?: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Visibility Foundation",
    price: "$500",
    period: "+ $150/month",
    description: "Get visible, get found, get leads",
    glowColor: 'blue',
    features: [
      { name: "Google Business Profile Optimization" },
      { name: "Automated Speed to Lead (2 min response)" },
      { name: "Follow-up to Booking Automation" },
    ],
    cta: "Get Started",
  },
  {
    name: "Local Growth Engine",
    price: "$1,500",
    period: "+ $150 per qualified appointment",
    description: "Consistent inbound leads without chasing",
    glowColor: 'purple',
    badge: "Most Popular",
    highlighted: true,
    features: [
      { name: "Everything in Visibility Foundation" },
      { name: "Professional Ad Management" },
      { name: "Review Automation Engine" },
      { name: "Conversion-Focused Website (1 page)" },
      { name: "Monthly Growth Reporting" },
    ],
    cta: "Start Growing",
  },
  {
    name: "4Nexus Full Domination",
    price: "$6,500",
    period: "+ $100 per qualified appointment",
    description: "Complete infrastructure to scale",
    glowColor: 'orange',
    badge: "15 Appointments in 30 Days or Your Money Back",
    highlighted: true,
    features: [
      { name: "Complete Lead Capture & Revenue Automation" },
      { name: "Professional Ad Management & Optimization" },
      { name: "24/7 AI Talking Website + Smart FAQ Bot" },
      { name: "Automated Appointment Setting & Lead Nurture" },
      { name: "Automated Invoice Collection System" },
      { name: "Integrated Quoting & Job Pipeline System" },
      { name: "Review Automation Engine" },
      { name: "Ongoing Growth Management" },
    ],
    cta: "Own Your Market",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to stop chasing leads and start owning your market
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`relative ${tier.highlighted ? 'md:scale-105' : ''}`}>
              {tier.badge && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              <GlowCard
                glowColor={tier.glowColor}
                customSize={true}
                className="h-full"
                width="100%"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Tier Header */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-slate-300 text-sm mb-6">
                      {tier.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">
                          {typeof tier.price === 'string' ? tier.price : tier.price.upfront}
                        </span>
                        {tier.period && (
                          <span className="text-slate-400 text-sm">
                            {tier.period}
                          </span>
                        )}
                      </div>
                      {typeof tier.price === 'object' && (
                        <p className="text-xs text-slate-500">
                          One-time setup + recurring
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-3 items-start">
                          <div className="text-green-400 mt-1 flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-snug">
                              {feature.name}
                            </p>
                            {feature.description && (
                              <p className="text-slate-500 text-xs mt-1">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/50'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-400 mb-6">
            Not sure which tier is right for you? Let's talk.
          </p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  );
}
