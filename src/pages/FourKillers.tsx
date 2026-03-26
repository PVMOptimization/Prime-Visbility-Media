import { useState, useEffect } from 'react';
import {
  Search,
  PhoneOff,
  TrendingDown,
  Monitor,
  Zap,
  Clock,
  Target,
  Star,
  MousePointer2,
  Activity,
  Phone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function FourKillers() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Determine active section
      const sections = document.querySelectorAll('[data-killer-section]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const killers = [
    {
      number: "01",
      title: "INVISIBLE ON GOOGLE",
      subtitle: "You're not in the top 3 = you don't exist",
      icon: Search,
      gradient: "from-red-500 to-orange-500",
      problem: "97% of clicks go to the top 3 Google results. If you're ranked #7, you might as well not exist.",
      secret: "Fresh reviews are worth 10-15x more than old ones. Go 7 days without a review? You start dropping.",
      stats: [
        { label: "Top 3 Clicks", value: "97%" },
        { label: "Review Value Drop", value: "10-15x" },
        { label: "Critical Window", value: "7 Days" }
      ],
      fixes: [
        "Automated review generation system",
        "Google Business Profile optimization",
        "Fresh content posted weekly",
        "Local SEO domination strategy"
      ],
      iphoneContent: {
        type: "google-search",
        title: "Google Search Results"
      }
    },
    {
      number: "02",
      title: "WEBSITE CONVERSION FAILURE",
      subtitle: "67% leave in 3 seconds - no exit popups, slow load",
      icon: Monitor,
      gradient: "from-orange-500 to-yellow-500",
      problem: "Your website is a leaky bucket. Visitors land, see a slow-loading generic site, and bounce immediately.",
      secret: "Exit-intent popups capture 30% of bouncing visitors. Sticky CTAs increase conversions by 40%.",
      stats: [
        { label: "Bounce in 3 Sec", value: "67%" },
        { label: "Exit Popup Capture", value: "30%" },
        { label: "Sticky CTA Lift", value: "+40%" }
      ],
      fixes: [
        "Exit-intent popup system",
        "Mobile-first speed optimization",
        "Sticky call-to-action buttons",
        "Live chat with instant response"
      ],
      iphoneContent: {
        type: "website",
        title: "Your Website"
      }
    },
    {
      number: "03",
      title: "AIMLESS AD SPENDING",
      subtitle: "No tracking, no landing page match, no follow-up",
      icon: TrendingDown,
      gradient: "from-yellow-500 to-green-500",
      problem: "You're throwing money at Google Ads and Facebook with zero tracking. Leads come in, then disappear into the void.",
      secret: "80% of conversions happen AFTER the click. No nurture system = wasted ad spend.",
      stats: [
        { label: "Post-Click Conversions", value: "80%" },
        { label: "Wasted Without Follow-Up", value: "$1000s" },
        { label: "ROI Improvement", value: "300%" }
      ],
      fixes: [
        "Pixel tracking & analytics setup",
        "Custom landing pages per campaign",
        "Automated lead nurture sequences",
        "Multi-touchpoint follow-up system"
      ],
      iphoneContent: {
        type: "dashboard",
        title: "Ad Performance"
      }
    },
    {
      number: "04",
      title: "24/7 REACHABILITY GAP",
      subtitle: "Calls at 8pm go to voicemail → they book your competitor",
      icon: PhoneOff,
      gradient: "from-green-500 to-cyan-500",
      problem: "Someone needs your service at 9pm. They call. Voicemail. They call your competitor. Competitor has AI. They book. You lose.",
      secret: "AI responds in 60 seconds, qualifies, books. You never miss a lead, even while sleeping.",
      stats: [
        { label: "After-Hours Calls", value: "40%" },
        { label: "AI Response Time", value: "60 sec" },
        { label: "Missed Call Cost", value: "$8K+" }
      ],
      fixes: [
        "24/7 AI call answering system",
        "Instant SMS auto-response",
        "Automated booking calendar",
        "Lead qualification while you sleep"
      ],
      iphoneContent: {
        type: "chat",
        title: "AI Assistant"
      }
    }
  ];

  const PhoneMockup = ({ killer, index }) => {
    return (
      <div className="relative w-full max-w-[280px] mx-auto">
        {/* iPhone Frame */}
        <div className="relative bg-zinc-900 rounded-[3rem] border-[12px] border-zinc-800 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-3xl z-10" />
          
          {/* Screen Content */}
          <div className="relative bg-black pt-8 pb-4 px-4 min-h-[500px]">
            {/* Different content based on killer type */}
            {killer.iphoneContent.type === 'google-search' && (
              <div className="space-y-3">
                {/* Search bar */}
                <div className="bg-zinc-800 rounded-full p-3 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">mold remediation near me</span>
                </div>
                
                {/* Search results */}
                <div className="space-y-2">
                  {[1, 2, 3].map((rank) => (
                    <div key={rank} className={`p-3 rounded-lg ${rank <= 3 ? 'bg-green-500/20 border border-green-500/30' : 'bg-zinc-800/50'}`}>
                      <div className="flex items-start gap-2">
                        <div className={`text-xs font-bold ${rank <= 3 ? 'text-green-400' : 'text-gray-600'}`}>#{rank}</div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-white mb-1">{rank === 1 ? 'Elite Mold Pros' : rank === 2 ? 'DFW Restoration' : rank === 3 ? 'Quick Mold Fix' : 'Generic Company'}</div>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>4.9 (127 reviews)</span>
                          </div>
                          {rank <= 3 && (
                            <div className="text-[10px] text-green-400 mt-1">✓ Fresh reviews this week</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {killer.iphoneContent.type === 'website' && (
              <div className="space-y-4">
                {/* Website mockup */}
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="w-full h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded mb-3 flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-700 rounded w-3/4" />
                    <div className="h-2 bg-gray-700 rounded w-full" />
                    <div className="h-2 bg-gray-700 rounded w-5/6" />
                  </div>
                </div>
                
                {/* Exit popup */}
                <div className="bg-gradient-to-br from-cyan-500 to-violet-500 p-4 rounded-lg animate-pulse">
                  <div className="text-white text-xs font-bold mb-2">WAIT! Before You Go...</div>
                  <div className="text-white text-[10px] mb-3">Get $50 off your first service</div>
                  <button className="w-full bg-white text-black text-xs font-bold py-2 rounded">
                    Claim Offer
                  </button>
                </div>

                {/* Sticky CTA */}
                <div className="fixed bottom-4 left-4 right-4 bg-green-500 text-white text-center py-3 rounded-lg shadow-lg">
                  <div className="text-xs font-bold">📞 Call Now: (214) 506-0806</div>
                </div>
              </div>
            )}

            {killer.iphoneContent.type === 'dashboard' && (
              <div className="space-y-3">
                {/* Dashboard header */}
                <div className="text-white text-sm font-bold mb-3">Ad Campaign Performance</div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <div className="text-[10px] text-gray-400 mb-1">Spent</div>
                    <div className="text-lg font-bold text-red-400">$2,500</div>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <div className="text-[10px] text-gray-400 mb-1">Leads</div>
                    <div className="text-lg font-bold text-cyan-400">47</div>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <div className="text-[10px] text-gray-400 mb-1">Closed</div>
                    <div className="text-lg font-bold text-yellow-400">3</div>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-lg">
                    <div className="text-[10px] text-gray-400 mb-1">Revenue</div>
                    <div className="text-lg font-bold text-green-400">$24K</div>
                  </div>
                </div>

                {/* Problem callout */}
                <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg">
                  <div className="text-xs text-red-400 font-bold mb-1">⚠️ 44 Leads Lost</div>
                  <div className="text-[10px] text-gray-400">No follow-up system = $176K missed revenue</div>
                </div>
              </div>
            )}

            {killer.iphoneContent.type === 'chat' && (
              <div className="space-y-3">
                {/* Chat header */}
                <div className="bg-zinc-800 p-3 rounded-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">AI Assistant</div>
                    <div className="text-[10px] text-green-400">● Active 24/7</div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-lg max-w-[70%]">
                      I need mold removal ASAP
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 text-white text-xs p-2 rounded-lg max-w-[70%]">
                      I can help! Is this an emergency or scheduled service?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white text-xs p-2 rounded-lg max-w-[70%]">
                      Emergency - found it today
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 text-white text-xs p-2 rounded-lg max-w-[70%]">
                      Perfect. I have availability tomorrow at 9am or 2pm. Which works better?
                    </div>
                  </div>
                </div>

                {/* Response time indicator */}
                <div className="bg-green-500/20 border border-green-500/30 p-2 rounded text-center">
                  <div className="text-[10px] text-green-400 font-bold">⚡ Response time: 12 seconds</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #00F0FF, #B026FF);
          z-index: 9999;
          transition: width 0.1s ease-out;
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(0,240,255,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 70% 50%, rgba(176,38,255,0.15) 0%, transparent 50%)`
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
            <span className="font-body text-sm tracking-[0.3em] text-red-400 uppercase font-light">
              Critical Revenue Leaks
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] mb-8">
            <span className="block text-white mb-4">THE 4 KILLERS</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              OF CONVERSION
            </span>
          </h1>

          <p className="font-body text-xl md:text-2xl lg:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto font-light">
            Why Your Leads Are Going to Competitors
            <br />
            <span className="text-cyan-400">(And How to Fix It Before You Lose Another One)</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group px-10 py-5 bg-gradient-to-r from-red-500 to-orange-600 text-white font-body font-bold text-lg rounded-none hover:shadow-2xl transition-all duration-300">
              <span className="flex items-center gap-3">
                See Your Leaks
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '67%', label: 'Bounce in 3 Sec' },
              { value: '97%', label: 'Top 3 Get Clicks' },
              { value: '40%', label: 'After-Hours Calls' },
              { value: '80%', label: 'Convert Post-Click' }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900/50 border border-red-500/20 p-4 rounded-lg">
                <div className="font-display text-3xl md:text-4xl font-bold text-red-400 mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="relative py-24 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
            <span className="text-white">Your Business is </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Bleeding Leads
            </span>
            <span className="text-white"> in 4 Places</span>
          </h2>
          <p className="font-body text-xl text-gray-400 max-w-3xl mx-auto">
            While you're focused on delivering great service, your competitors are capturing YOUR leads with systems you don't even know exist.
          </p>
        </div>
      </section>

      {/* Killer Sections */}
      {killers.map((killer, index) => (
        <section
          key={index}
          data-killer-section
          className={`relative py-32 px-4 ${index % 2 === 0 ? 'bg-black' : 'bg-zinc-950'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              {/* Content Side */}
              <div className={`${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right md:order-2'}`}>
                {/* Number Badge */}
                <div className="inline-block mb-6">
                  <div className={`px-6 py-2 bg-gradient-to-r ${killer.gradient} text-black font-display font-black text-2xl rounded-full`}>
                    {killer.number}
                  </div>
                </div>

                {/* Icon */}
                <div className={`inline-block p-4 bg-gradient-to-br ${killer.gradient} mb-6 rounded-lg`}>
                  <killer.icon className="w-12 h-12 text-black" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white">
                  {killer.title}
                </h3>

                {/* Subtitle */}
                <p className="font-body text-xl text-gray-400 mb-8">
                  {killer.subtitle}
                </p>

                {/* Problem */}
                <div className="bg-red-500/10 border-l-4 border-red-500 p-6 mb-8">
                  <div className="font-body text-sm text-red-400 uppercase tracking-widest mb-2">The Problem</div>
                  <p className="font-body text-gray-300 leading-relaxed">
                    {killer.problem}
                  </p>
                </div>

                {/* Secret */}
                <div className={`bg-gradient-to-r ${killer.gradient} bg-opacity-10 border-l-4 border-cyan-500 p-6 mb-8`}>
                  <div className="font-body text-sm text-cyan-400 uppercase tracking-widest mb-2">💡 The Secret</div>
                  <p className="font-body text-white font-semibold leading-relaxed">
                    {killer.secret}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {killer.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className={`font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${killer.gradient} mb-2`}>
                        {stat.value}
                      </div>
                      <div className="font-body text-xs text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fixes */}
                <div className="space-y-3">
                  <div className="font-body text-sm text-cyan-400 uppercase tracking-widest mb-4">How We Fix It:</div>
                  {killer.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="font-body text-gray-300">{fix}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* iPhone Mockup Side */}
              <div className={`${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left md:order-1'} flex justify-center`}>
                <div className="float-animation">
                  <PhoneMockup killer={killer} index={index} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Competitor Comparison */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-8">
              <span className="text-white">While You're </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Losing Leads...
              </span>
            </h2>
            <p className="font-body text-2xl text-gray-400">Your Competitors Are:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '3-5X',
                label: 'MORE VISIBLE',
                description: 'Fresh review systems',
                gradient: 'from-red-500 to-orange-500'
              },
              {
                stat: '40%',
                label: 'HIGHER CONVERSION',
                description: 'Exit popups + sticky CTAs',
                gradient: 'from-orange-500 to-yellow-500'
              },
              {
                stat: '24/7',
                label: 'ALWAYS REACHABLE',
                description: 'AI answering systems',
                gradient: 'from-yellow-500 to-green-500'
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-lg h-full">
                  <div className={`font-display text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${item.gradient} mb-4`}>
                    {item.stat}
                  </div>
                  <div className="font-display text-2xl font-bold text-white mb-3">
                    {item.label}
                  </div>
                  <p className="font-body text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 bg-black">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse 3s ease-in-out ${Math.random() * 2}s infinite`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-8">
            <span className="text-white">READY TO </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              FIX THIS?
            </span>
          </h2>

          <p className="font-body text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Every day you wait is another day your competitors are capturing YOUR leads
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group px-12 py-6 bg-gradient-to-r from-red-500 to-orange-600 text-white font-body font-bold text-xl rounded-none hover:shadow-2xl transition-all duration-300 pulse-glow">
              <span className="flex items-center gap-3">
                Book Your Free Audit
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>

          <p className="font-body text-gray-500 text-lg">
            Return to the email and book your call now
          </p>
        </div>
      </section>
    </div>
  );
}
