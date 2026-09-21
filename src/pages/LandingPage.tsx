import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Zap, Users, Clock, 
  MessageSquare, Calendar, DollarSign, ArrowRight, 
  ShieldCheck, CheckCircle2, ChevronDown, Calculator, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import assets
import roofingImg from '../assets/SanAntonioRoofer-Results.jpg';
import dashboardImg from '../assets/DashboardB_ACOMP.png';
import reviewsImg from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import leadSystemImg from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

// 1. Navigation Header
const HeaderNav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#02050A]/80 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            P
          </div>
          <span className="font-bold text-white tracking-tight text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Prime Visibility Media
          </span>
        </div>
        <Link to="/growth-pipeline">
          <button className="relative group overflow-hidden rounded-full p-[1px] font-medium text-xs">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative block px-5 py-2 rounded-full bg-[#02050A] text-white transition-all group-hover:bg-transparent">
              Get System
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
};

// 2. Interactive Calculator Component (Added Cool Feature)
const RoiCalculator = () => {
  const [avgTicket, setAvgTicket] = useState(8000);
  const [closeRate, setCloseRate] = useState(25);

  const appointments = 15;
  const closedDeals = Math.round((appointments * (closeRate / 100)) * 10) / 10;
  const estimatedRevenue = Math.round(closedDeals * avgTicket);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-blue-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-cyan-400" />
        <h3 className="text-white text-lg font-semibold">Interactive Revenue Predictor</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Average Job Value:</span>
            <span className="text-cyan-400 font-bold">${avgTicket.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="2500" 
            max="25000" 
            step="500" 
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value))}
            className="w-full accent-blue-500 bg-white/10 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Estimate Close Rate:</span>
            <span className="text-cyan-400 font-bold">{closeRate}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="50" 
            step="5" 
            value={closeRate}
            onChange={(e) => setCloseRate(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-white/10 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/[0.03]">
            <p className="text-slate-400 text-xs">Projected Deals Closed</p>
            <p className="text-white font-extrabold text-xl mt-1">{closedDeals} Deals</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-blue-400 text-xs">Estimated New Revenue</p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-extrabold text-xl mt-1">
              ${estimatedRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#02050A] pt-32 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.18),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Prime Visibility Media Guarantee
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-4xl leading-[1.1]">
          Your Calendar. Booked With 15 Qualified Appointments{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            in 30 Days.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-400 font-medium mb-4 tracking-tight">
          Or Prime Visibility Media refunds every dollar.
        </p>

        <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl font-normal leading-relaxed">
          Built specifically for contractors doing $200k–$1M/year who want predictable pipeline growth without wasting time chasing cold leads.
        </p>

        {/* Video Frame */}
        <div className="w-full max-w-4xl mb-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#090D16] shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/txX-mx9YMLU?vq=hd1080"
              title="System Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Dynamic ROI Predictor Widget */}
        <RoiCalculator />

        {/* Primary Call To Action */}
        <Link to="/growth-pipeline">
          <button className="relative group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-lg px-9 py-4 rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <span>Get Your Pipeline Built</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
};

// 4. Interactive Glass Grid Features
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "Targeted Ads Engine",
      description: "Stop wasting budgets on unqualified leads. We deploy hyper-targeted campaigns designed to attract ready-to-buy homeowners."
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      title: "2-Phase Lead Qualification",
      description: "Tire-kickers are filtered out before reaching your calendar. Only qualified leads with real budget enter your pipeline."
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      title: "Instant Speed-to-Lead",
      description: "Our system contacts new inquiries in under 60 seconds, eliminating lead decay and beating competitors to the punch."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
      title: "Automated 14-Touch Nurture",
      description: "Multi-channel automated follow-up sequences across SMS & Email that continuously nurture cold leads into booked jobs."
    },
    {
      icon: <Calendar className="w-5 h-5 text-blue-400" />,
      title: "Direct Calendar Booking",
      description: "Prospects choose an available slot directly on your calendar. Wake up to pre-scheduled estimates without playing phone tag."
    },
    {
      icon: <DollarSign className="w-5 h-5 text-cyan-400" />,
      title: "Invoice Collection System",
      description: "Automated payment tracking and reminders cut accounts receivable cycles down to 12 days, boosting working capital."
    }
  ];

  return (
    <section className="bg-[#02050A] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            THE SYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6 mb-4">
            How Prime Visibility Media Scales You
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Six interconnected engines engineered to automate lead capture, booking, and cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl bg-white/[0.02] border border-white/10 p-8 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Accordion FAQ Component
const InteractiveFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const objections = [
    {
      q: "I've been burned by marketing companies before.",
      a: "Most agencies sell shared lead lists and leave you to do all the work. Prime Visibility Media manages everything—from initial ad click to final calendar booking and payment collection. Plus, we guarantee 15 qualified appointments in 30 days or refund 100% of your fee."
    },
    {
      q: "What if I can't close the appointments?",
      a: "Our system pre-qualifies leads on budget, timeline, and decision-making power before they get on your schedule. You aren't talking to tire-kickers—you are presenting to serious homeowners ready to buy."
    },
    {
      q: "What happens after the initial 30 days?",
      a: "Once we fulfill your initial guarantee, you shift to a performance model: $150 per qualified appointment delivered. No monthly retainers or long-term lock-ins."
    },
    {
      q: "How fast can we launch?",
      a: "Your custom pipeline and automation setup go live within 7 days. Most clients start receiving qualified calendar bookings within 14 days."
    }
  ];

  return (
    <section className="bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6 mb-4">
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-4">
          {objections.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`cursor-pointer rounded-2xl bg-white/[0.02] border transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-500/50 bg-white/[0.04]' : 'border-white/10 hover:border-white/20'}`}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isOpen ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.q}</span>
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </div>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 6. Testimonial Carousel Section
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      title: "$70k Revenue Collected",
      subtitle: "San Antonio Contractor Results",
      image: roofingImg,
      stat: "$70,000"
    },
    {
      title: "Real-Time Pipeline Tracking",
      subtitle: "Live Automated Dashboard",
      image: dashboardImg,
      stat: "Live Data"
    },
    {
      title: "Automated Review Engine",
      subtitle: "5-Star Google Reputation",
      image: reviewsImg,
      stat: "+50 Reviews"
    },
    {
      title: "Lead Retention Flow",
      subtitle: "Zero Missed Opportunities",
      image: leadSystemImg,
      stat: "24/7 Active"
    }
  ];

  return (
    <section className="bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            PROVEN PROOF
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6">
            Real Contractor Outcomes
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="flex-1 flex justify-center w-full">
                <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#090D16]">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].title}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">
                  CASE STUDY {currentIndex + 1} OF {testimonials.length}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                  {testimonials[currentIndex].title}
                </h3>
                <p className="text-slate-400 text-base mb-6">
                  {testimonials[currentIndex].subtitle}
                </p>
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight">
                  {testimonials[currentIndex].stat}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentIndex(i)} 
                  className={`h-1.5 rounded-full cursor-pointer transition-all ${i === currentIndex ? 'bg-blue-400 w-6' : 'bg-white/20 w-1.5'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)} 
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. Footer / CTA Section
const FinalCTASection = () => {
  return (
    <section className="bg-[#02050A] py-28 px-6 border-t border-white/5 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          Ready To Scale With Prime Visibility Media?
        </h2>
        <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          15 booked appointments in 30 days or you don't pay a single cent.
        </p>
        <Link to="/growth-pipeline">
          <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white px-9 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Book Your Strategy Call
          </button>
        </Link>
      </div>
    </section>
  );
};

// Main Component Assembly
export default function LandingPage() {
  return (
    <div className="bg-[#02050A] text-slate-100 min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <HeaderNav />
      <HeroSection />
      <FeaturesSection />
      <InteractiveFaqSection />
      <TestimonialsCarousel />
      <FinalCTASection />
    </div>
  );
}
