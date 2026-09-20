import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Users, Clock, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images from assets
import roofingImg from '../assets/SanAntonioRoofer-Results.jpg';
import dashboardImg from '../assets/DashboardB_ACOMP.png';
import reviewsImg from '../assets/REVIEWS_ARE_CRUCIAL__3_.png';
import leadSystemImg from '../assets/Automated-Lead-Retention-System-Google-Slides-02-28-2026_10_34_AM.png';

// Hero Section
const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Your Calendar. Booked With 15 Qualified Appointments
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> in 30 Days.</span>
        </h1>

        <p className="text-lg md:text-xl text-blue-400 font-semibold mb-4 max-w-2xl mx-auto">
          Or we refund every dollar.
        </p>

        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Built for contractors doing $200k–$1M/year who are tired of chasing leads, missing calls, and leaving money on the table.
        </p>

        {/* Video Section */}
        <div className="mb-12 relative">
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-blue-500/20 bg-slate-800">
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
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl -z-10"></div>
        </div>

        <Link to="/growth-pipeline" className="inline-block">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
            See The Full System
          </button>
        </Link>
      </div>
    </section>
  );
};

// Pain Section — added between Hero and Features
const PainSection = () => {
  return (
    <section className="bg-slate-950 py-20 px-6 border-t border-slate-800">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
          Most contractors we talk to are getting 80+ leads a month and closing 2–3. They're spending 3 hours a day sorting through cold calls and tire-kickers. They're driving 40 minutes for estimates that ghost them. They're floating payroll because invoices sit 50 days.
        </p>
        <p className="text-white font-semibold text-xl md:text-2xl mt-6">
          Sound familiar? That's exactly what this system fixes.
        </p>
      </div>
    </section>
  );
};

// Features Grid Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Professional Ads",
      description: "You stop paying for leads that go nowhere. Every ad is built to attract homeowners who can actually afford you."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Quality",
      description: "Phase 1 & Phase 2 qualification filters out tire-kickers before you ever see them. Only real, qualified leads reach your phone."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Speed to Lead",
      description: "The call you missed at 2pm while you were on a job just became someone else's $15k job. This stops that."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Follow-Up System",
      description: "Automatic follow-up sequences that touch leads 14 times over 30 days. Gets them booked while you focus on building."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Automated Booking",
      description: "Leads book appointments directly on your calendar before you ever contact them. No back-and-forth. No scheduling chaos."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Invoice Collection",
      description: "Automated payment reminders and collection system. Get paid in 12 days instead of 35. Frees up $50k+ in working capital."
    }
  ];

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Complete Lead Generation System
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Six interconnected components that work together to generate, qualify, and close deals automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Objection Handles Section — new addition
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
    <section className="bg-slate-900 py-20 px-6 border-t border-slate-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Common Questions</h2>
          <p className="text-slate-400 text-lg">Straight answers. No fluff.</p>
        </div>

        <div className="space-y-6">
          {objections.map((item, index) => (
            <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <h3 className="text-white font-semibold text-lg mb-3">{item.q}</h3>
              <p className="text-slate-400 leading-relaxed">{item.a}</p>
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
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">WATCH</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hear It Straight From Us
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real answers to the questions contractors ask before signing on.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-80">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>
            <div className="bg-black rounded-3xl shadow-2xl overflow-hidden border-[12px] border-black">
              <div className="bg-slate-900 aspect-[9/16] overflow-hidden relative">
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
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
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
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">REAL RESULTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Your Business Could Look Like
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center justify-center gap-12 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex-1 flex justify-center px-4">
              <div className="relative group w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-slate-200/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-blue-400 text-sm font-semibold tracking-widest mb-4">
                RESULT {currentIndex + 1} OF {testimonials.length}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {testimonials[currentIndex].title}
              </h3>
              <p className="text-slate-400 text-lg mb-6">
                {testimonials[currentIndex].subtitle}
              </p>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {testimonials[currentIndex].stat}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button onClick={handlePrev} className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-blue-500 transition-all duration-300 border border-slate-700 hover:border-blue-500" aria-label="Previous">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNext} className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-blue-500 transition-all duration-300 border border-slate-700 hover:border-blue-500" aria-label="Next">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-700 w-2'}`}
                onClick={() => {
                  setFadeIn(false);
                  setTimeout(() => { setCurrentIndex(index); setFadeIn(true); }, 200);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section — new addition
const FinalCTASection = () => {
  return (
    <section className="bg-slate-950 py-24 px-6 border-t border-slate-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to stop leaving money on the table?
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          15 qualified appointments in 30 days. Or we refund every dollar. No retainer. No long-term contract.
        </p>
        <Link to="/growth-pipeline" className="inline-block">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-lg font-semibold text-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
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
    <div className="bg-slate-950 overflow-hidden">
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
