import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Users, Clock, MessageSquare, Calendar, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images from assets
import roofingImg from '../assets/SanAntonioRoofer-Results.jpg';
import dashboardImg from '../assets/DashboardB_ACOMP.png';
import reviewsImg from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import leadSystemImg from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

// Header / Navigation Bar
const HeaderNav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#02050A]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            A
          </div>
          <span className="font-semibold text-white tracking-tight text-lg">Apex Growth</span>
        </div>
        <Link to="/growth-pipeline">
          <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/15 backdrop-blur-md transition-all duration-300">
            Get System
          </button>
        </Link>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#02050A] pt-32 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Radial Glow & Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Guaranteed 15 Qualified Appointments
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-4xl leading-[1.1]">
          Your Calendar. Booked With 15 Qualified Appointments{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            in 30 Days.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-400 font-medium mb-4 tracking-tight">
          Or we refund every dollar.
        </p>

        <p className="text-slate-400 text-base md:text-lg mb-12 max-w-2xl font-normal leading-relaxed">
          Built for contractors doing $200k–$1M/year who are tired of chasing leads, missing calls, and leaving money on the table.
        </p>

        {/* Video Player Frame with Glass Container */}
        <div className="w-full max-w-4xl mb-12 relative group">
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

        {/* Primary Call To Action */}
        <Link to="/growth-pipeline">
          <button className="relative group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <span>See The Full System</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  );
};

// Pain Section
const PainSection = () => {
  return (
    <section className="relative bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed text-center font-normal">
            Most contractors we talk to are getting <span className="text-white font-medium">80+ leads a month</span> and closing 2–3. They're spending 3 hours a day sorting through cold calls and tire-kickers. They're driving 40 minutes for estimates that ghost them. They're floating payroll because invoices sit 50 days.
          </p>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white font-semibold text-xl md:text-2xl tracking-tight">
              Sound familiar? <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">That's exactly what this system fixes.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Grid Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "Professional Ads",
      description: "You stop paying for leads that go nowhere. Every ad is built to attract homeowners who can actually afford you."
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      title: "Lead Quality",
      description: "Phase 1 & Phase 2 qualification filters out tire-kickers before you ever see them. Only real, qualified leads reach your phone."
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      title: "Speed to Lead",
      description: "The call you missed at 2pm while you were on a job just became someone else's $15k job. This stops that."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
      title: "Follow-Up System",
      description: "Automatic follow-up sequences that touch leads 14 times over 30 days. Gets them booked while you focus on building."
    },
    {
      icon: <Calendar className="w-5 h-5 text-blue-400" />,
      title: "Automated Booking",
      description: "Leads book appointments directly on your calendar before you ever contact them. No back-and-forth. No scheduling chaos."
    },
    {
      icon: <DollarSign className="w-5 h-5 text-cyan-400" />,
      title: "Invoice Collection",
      description: "Automated payment reminders and collection system. Get paid in 12 days instead of 35. Frees up $50k+ in working capital."
    }
  ];

  return (
    <section className="bg-[#02050A] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6 mb-4">
            Your Complete Lead Generation System
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Six interconnected components that work together to generate, qualify, and close deals automatically.
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

// Objection Handles Section
const ObjectionsSection = () => {
  const objections = [
    {
      q: "I've been burned by marketing companies before.",
      a: "Fair. Most of them sell leads and disappear. We build the entire system — qualification, booking, follow-up, collection. And we back it with a full refund if you don't get 15 qualified appointments in 30 days. You're not buying ads. You're buying a guaranteed outcome."
    },
    {
      q: "What if I can't close the appointments?",
      a: "Our system pre-qualifies every lead on budget, timeline, homeowner status, and service area before they ever reach you. These aren't random inquiries. They're people who have already confirmed they can afford you and are ready to move. Your close rate goes up because you're talking to real buyers."
    },
    {
      q: "What happens after 30 days?",
      a: "After the guarantee period, you pay $150 per qualified appointment delivered. No monthly retainer. No long-term contract. You only pay for results."
    },
    {
      q: "How fast does this actually work?",
      a: "System is live within 7 days of signing. First appointments start coming in within 14 days. Most clients see results in the first week."
    }
  ];

  return (
    <section className="bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6 mb-4">
            Common Questions
          </h2>
          <p className="text-slate-400 text-base md:text-lg">Straight answers. No fluff.</p>
        </div>

        <div className="space-y-4">
          {objections.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white tracking-tight mb-3 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed pl-8">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Video Section
const FAQVideoSection = () => {
  return (
    <section className="bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            WATCH
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6 mb-4">
            Hear It Straight From Us
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Real answers to the questions contractors ask before signing on.
          </p>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="flex justify-center">
          <div className="relative w-80 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[40px] opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#090D16] rounded-[36px] overflow-hidden border-[8px] border-slate-800 shadow-2xl">
              <div className="bg-[#02050A] aspect-[9/16] overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/v9iNj1Fvaig"
                  title="FAQ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials/Results Carousel
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const testimonials = [
    {
      id: 1,
      title: "$70k Collected in 30 Days",
      subtitle: "San Antonio Contractor",
      image: roofingImg,
      stat: "$70,000"
    },
    {
      id: 2,
      title: "Dashboard Results",
      subtitle: "Real-Time Tracking",
      image: dashboardImg,
      stat: "Live Data"
    },
    {
      id: 3,
      title: "Review Generation",
      subtitle: "Social Proof Building",
      image: reviewsImg,
      stat: "+50 Reviews"
    },
    {
      id: 4,
      title: "Lead Automation",
      subtitle: "24/7 System",
      image: leadSystemImg,
      stat: "Fully Automated"
    }
  ];

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setFadeIn(true);
    }, 200);
  };

  const handlePrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setFadeIn(true);
    }, 200);
  };

  return (
    <section className="bg-[#02050A] py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            REAL RESULTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-6">
            What Your Business Could Look Like
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className={`p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="flex-1 flex justify-center w-full">
                <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-[#090D16]">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">
                  RESULT {currentIndex + 1} OF {testimonials.length}
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

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={handlePrev} 
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300" 
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-blue-400 w-6' : 'bg-white/20 w-1.5'}`}
                  onClick={() => {
                    setFadeIn(false);
                    setTimeout(() => { setCurrentIndex(index); setFadeIn(true); }, 200);
                  }}
                />
              ))}
            </div>

            <button 
              onClick={handleNext} 
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300" 
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="bg-[#02050A] py-28 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          Ready to stop leaving money on the table?
        </h2>
        <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          15 qualified appointments in 30 days. Or we refund every dollar. No retainer. No long-term contract.
        </p>
        <Link to="/growth-pipeline" className="inline-block">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-9 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Get Your Free Audit
          </button>
        </Link>
      </div>
    </section>
  );
};

// Complete Landing Page
export default function LandingPage() {
  return (
    <div className="bg-[#02050A] text-slate-100 min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <HeaderNav />
      <HeroSection />
      <PainSection />
      <FeaturesSection />
      <ObjectionsSection />
      <FAQVideoSection />
      <TestimonialsCarousel />
      <FinalCTASection />
    </div>
  );
}
