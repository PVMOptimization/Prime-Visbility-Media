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
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          15 Qualified Appointments in 30 Days
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> or Full Refund</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Complete lead generation, qualification, and automation system built for contractors who want to scale to $300k+/month
        </p>

        {/* Video Section */}
        <div className="mb-12 relative">
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-blue-500/20 bg-slate-800">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/hv0If8_hXRk"
              title="System Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl -z-10"></div>
        </div>

        {/* CTA Button */}
        <Link to="/growth-pipeline" className="inline-block">
  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
    See The Full System
  </button>
</Link>
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
      description: "Ads that have generated $12M+ for our clients in the past 4 years. We know exactly how to target contractors who can afford your services."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Quality",
      description: "Phase 1 & Phase 2 qualification process filters out tire-kickers before you ever see them. Only real, qualified leads reach your phone."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Speed to Lead",
      description: "Capture all inquiries within 5 minutes. Response time is the #1 factor in close rate. We don't miss calls while you're working."
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Complete Lead Generation System
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Six interconnected components that work together to generate, qualify, and close deals automatically.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/20">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Watch real answers to contractor questions about our system.
          </p>
        </div>

        {/* iPhone Frame */}
        <div className="flex justify-center">
          <div className="relative w-80">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>
            
            {/* iPhone Body */}
            <div className="bg-black rounded-3xl shadow-2xl overflow-hidden border-[12px] border-black">
              {/* Screen */}
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

            {/* Home Indicator */}
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-blue-400 font-semibold mb-4">REAL RESULTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Your Business Could Look Like
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className={`flex flex-col md:flex-row items-center justify-center gap-12 transition-opacity duration-300 ${
              fadeIn ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image */}
            <div className="flex-1 flex justify-center px-4">
              <div className="relative group w-full max-w-sm">
                {/* Glowing White Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-slate-200/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-white/5 rounded-2xl blur-xl opacity-40"></div>
                
                {/* Image Container */}
                <div className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            {/* Content */}
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

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-blue-500 transition-all duration-300 border border-slate-700 hover:border-blue-500"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-blue-500 transition-all duration-300 border border-slate-700 hover:border-blue-500"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-700 w-2'
                }`}
                onClick={() => {
                  setFadeIn(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setFadeIn(true);
                  }, 200);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Complete Landing Page
export default function LandingPage() {
  return (
    <div className="bg-slate-950 overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <FAQVideoSection />
      <TestimonialsCarousel />
    </div>
  );
}