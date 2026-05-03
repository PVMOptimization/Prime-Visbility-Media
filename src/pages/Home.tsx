import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  PhoneOff,
  TrendingDown,
  Monitor,
  MapPin,
  Shield,
  ArrowRight,
  Zap,
  Sparkles,
  Star,
  Users,
  Bot,
  BarChart3,
  MessageSquare,
  Repeat2
} from 'lucide-react';
import TabletShowcase from './TabletShowcase';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroRef = useRef(null);

  // --- LeadConnector Chat Widget Integration ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.async = true;
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '69f6b5aebf766193af66d95c');
    script.setAttribute('data-source', 'WEB_USER');
    
    document.body.appendChild(script);

    return () => {
      // Cleanup to prevent multiple widgets on re-renders
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyCTA(heroBottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('[data-section-transition]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: Search,
      title: 'Your Competitors Are Stealing Your Calls',
      description: "Right now, someone in your city is searching for exactly what you offer. They're calling your competitor — not you. Not because they're better. Because they show up and you don't.",
      stat: '97%',
      statLabel: 'of clicks go to top 3 results'
    },
    {
      icon: Repeat2,
      title: 'You\'re One Referral Away From a Slow Month',
      description: "Word of mouth is unpredictable. When referrals dry up, so does your pipeline. A business that only grows by referral is a business one bad month away from panic.",
      stat: '$0',
      statLabel: 'cost per organic Google lead'
    },
    {
      icon: PhoneOff,
      title: 'Leads Are Calling — Nobody\'s Following Up',
      description: "Studies show 78% of customers go with the first business that responds. If you're not following up within 5 minutes automatically, you're handing jobs to whoever is.",
      stat: '78%',
      statLabel: 'of jobs go to the first responder'
    }
  ];

  const services = [
    {
      icon: MapPin,
      title: 'Google Maps Domination',
      description: 'We put you in the top 3 on Google Maps for every high-intent search in your area. Reviews, ranking signals, proximity strategy — fully handled.',
      gradient: 'from-cyan-500 to-blue-500',
      tag: 'Most Popular'
    },
    {
      icon: Bot,
      title: 'AI Lead Capture & Follow-Up',
      description: '24/7 AI that responds to every lead instantly, books appointments automatically, and follows up until they convert. Never lose a job to slow response again.',
      gradient: 'from-violet-500 to-purple-500',
      tag: 'Highest ROI'
    },
    {
      icon: Monitor,
      title: 'Conversion-Focused Websites',
      description: 'Custom-built, mobile-first websites engineered to turn visitors into booked jobs. Not pretty brochures — actual revenue machines.',
      gradient: 'from-blue-500 to-cyan-500',
      tag: null
    },
    {
      icon: Star,
      title: 'Review & Reputation Flywheel',
      description: 'Automated review generation that keeps fresh 5-star reviews flowing weekly. Google rewards recency — we keep your listing looking alive and dominant.',
      gradient: 'from-amber-500 to-orange-500',
      tag: null
    },
    {
      icon: BarChart3,
      title: 'Local SEO & Content Authority',
      description: 'Service area pages, schema markup, Google Posts, Q&A population — every signal Google uses to rank you, fully optimized and maintained monthly.',
      gradient: 'from-emerald-500 to-teal-500',
      tag: null
    },
    {
      icon: MessageSquare,
      title: 'Done-For-You Growth Management',
      description: 'Full pipeline management. Lead tracking, quote follow-up, invoice automation, and monthly reporting. You run the jobs — we run the growth engine.',
      gradient: 'from-rose-500 to-pink-500',
      tag: 'Full Domination'
    }
  ];

  const testimonials = [
    {
      text: "Started getting 3-4 qualified leads per day within the first week. Already closed two $8K jobs from Google searches alone. This actually works.",
      author: "Marcus J.",
      business: "Precision Roofing DFW",
      result: "+$16K in 2 weeks"
    },
    {
      text: "My phone literally wouldn't stop ringing after they optimized my Google Business. Went from maybe 1-2 calls a week to 15+ quality leads. Had to hire help.",
      author: "Jessica T.",
      business: "Luxe Lash & Brow Studio",
      result: "15x more calls"
    },
    {
      text: "Booked solid for the next 6 weeks. Their lead gen system is no joke. Every morning I wake up to new estimate requests. Best investment I've made.",
      author: "David R.",
      business: "Texas Premier HVAC",
      result: "6 weeks booked"
    },
    {
      text: "Finally found someone who actually delivers. Not just a pretty website—real customers calling, real jobs closing. Up 40% in revenue since we launched.",
      author: "Amanda K.",
      business: "Elite Plumbing Solutions",
      result: "+40% revenue"
    },
    {
      text: "Used to rely on word-of-mouth and Angie's List. Now my Google profile is blowing up. Closed $23K in jobs just last month from their lead system.",
      author: "Robert M.",
      business: "DFW Landscape Pros",
      result: "$23K in one month"
    },
    {
      text: "They turned my Instagram into a client machine. Getting DMs daily asking for quotes. Closed 8 new contracts in 3 weeks. This is the real deal.",
      author: "Sophia L.",
      business: "Modern Med Spa Dallas",
      result: "8 contracts in 3 weeks"
    }
  ];

  const steps = [
    { number: "01", title: "Free Audit", description: "We pull your Google listing, check your rankings, and show you exactly what's costing you jobs right now. No fluff. Real numbers." },
    { number: "02", title: "You See The Gap", description: "We show you how many calls your competitors are getting that should be yours. Most business owners are shocked at what they've been leaving on the table." },
    { number: "03", title: "We Build The System", description: "Maps ranking, website, AI follow-up, review automation — everything goes live. You start getting calls within days, not months." },
    { number: "04", title: "We Scale It", description: "Monthly optimization, reporting, and growth management. Your pipeline grows every month while you focus on doing the work." }
  ];

  const industries = [
    'Plumbers', 'Roofers', 'HVAC Companies', 'Electricians',
    'Mold Remediation', 'Water Damage Restoration', 'General Contractors', 'Landscapers',
    'Salons & Med Spas', 'Auto Detailers', 'Pressure Washing', 'And more...'
  ];

  const tickerItems = [
    '🔥 $23K closed in one month', '⚡ 15x more inbound calls', '📍 Top 3 Google Maps ranking', 
    '🤖 24/7 AI follow-up', '⭐ Automated 5-star reviews', '📈 40% revenue increase',
    '🔥 6 weeks booked out', '⚡ First lead within 48hrs'
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        
        .grain { animation: grain 8s steps(10) infinite; }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hover-lift:hover { transform: translateY(-8px); }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
          50% { text-shadow: 0 0 40px rgba(0, 240, 255, 0.8), 0 0 60px rgba(176, 38, 255, 0.6); }
        }
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        [data-section-transition] { opacity: 0; }
        .section-visible.section-transition-morph { animation: morphReveal 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .section-visible.section-transition-slide { animation: slideReveal 1s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .section-visible.section-transition-diagonal { animation: diagonalWipe 1s cubic-bezier(0.65, 0, 0.35, 1) forwards; }

        @keyframes morphReveal { 0% { clip-path: circle(0% at 50% 50%); opacity: 0; } 100% { clip-path: circle(150% at 50% 50%); opacity: 1; } }
        @keyframes slideReveal { 0% { clip-path: inset(0 100% 0 0); opacity: 0; } 100% { clip-path: inset(0 0 0 0); opacity: 1; } }
        @keyframes diagonalWipe { 0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 0; } 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; } }

        .text-illuminate {
          background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: illuminate 3s ease-in-out infinite;
        }
        @keyframes illuminate { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-track { animation: ticker 20s linear infinite; }

        .problem-stat {
          font-family: 'Syne', sans-serif;
          background: linear-gradient(135deg, #00F0FF, #B026FF);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Navigation showStickyCTA={showStickyCTA} />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.15) 0%, transparent 50%),
                         radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(176,38,255,0.15) 0%, transparent 50%)`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-8">
            <div className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs tracking-[0.3em] text-cyan-400 uppercase font-light">Digital Dominance Starts Here</span>
            </div>
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-8">
            <span className="block text-white">PRIME</span>
            <span className="block text-illuminate glow-pulse">VISIBILITY</span>
          </h1>
          <p className="font-body text-xl md:text-3xl text-gray-400 mb-16 max-w-4xl mx-auto font-light leading-relaxed">
            We don't just build websites. We build the complete system that gets your phone ringing — 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-semibold"> 15 Appointments in 30 Days. Guaranteed.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/book-call">
              <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-lg rounded-none hover-lift w-full sm:w-auto">
                Get My Free Audit <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TICKER TAPE */}
      <div className="relative py-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 border-y border-white/10 overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-body text-sm text-gray-300 mx-8 flex-shrink-0">
              {item} <span className="text-white/20 mx-4">|</span>
            </span>
          ))}
        </div>
      </div>

      <div data-section-transition className="section-transition-morph">
        <TabletShowcase screenImagePath="/models/images/screen-modern.png" />
      </div>

      {/* PROBLEMS SECTION */}
      <section data-section-transition className="relative py-24 px-6 bg-zinc-950 section-transition-diagonal">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl font-black mb-12">
            <span className="text-white">Your Pipeline </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Has Holes</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="bg-zinc-900 p-10 border-2 border-white/10 hover-lift h-full">
                <div className="problem-stat text-6xl font-black mb-2">{p.stat}</div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">{p.title}</h3>
                <p className="font-body text-gray-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section data-section-transition className="relative py-24 px-6 section-transition-slide">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-6xl md:text-8xl font-black mb-8">
              <span className="text-illuminate">The System.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="group relative bg-zinc-900 p-12 border border-white/10 hover-lift">
                <div className={`inline-block p-4 bg-gradient-to-br ${s.gradient} mb-6`}>
                  <s.icon className="w-10 h-10 text-black" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-white">{s.title}</h3>
                <p className="font-body text-gray-400 mb-6">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-section-transition className="relative py-40 px-6 overflow-hidden section-transition-morph">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="font-display text-6xl md:text-9xl font-black mb-8 leading-none">
            <span className="text-white">STOP LOSING</span>
            <br />
            <span className="text-illuminate glow-pulse">JOBS DAILY.</span>
          </h2>
          <p className="font-body text-2xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Comment <span className="text-cyan-400 font-bold">"GB"</span> on Instagram for the 47 Insider Secrets, or activate your audit below.
          </p>
          <Link to="/book-call">
            <button className="px-12 py-6 bg-white text-black font-body font-bold text-xl hover-lift">
              Get My Free Audit Now <Zap className="inline ml-3 w-6 h-6" />
            </button>
          </Link>
          <div className="mt-12 text-gray-400 font-body text-xl">
            Or call: <a href="tel:2145060806" className="text-cyan-400 font-bold">(214) 506-0806</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
