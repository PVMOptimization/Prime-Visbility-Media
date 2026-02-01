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
  Sparkles
} from 'lucide-react';
import TabletShowcase from './TabletShowcase';

// Simple motion div component
const motion = {
  a: ({ initial, animate, transition, className, href, children }: any) => {
    const ref = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = `translateX(${initial.x}px)`;
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = `all ${transition.duration}s ease-out`;
            ref.current.style.opacity = String(animate.opacity);
            ref.current.style.transform = `translateX(${animate.x}px)`;
          }
        }, transition.delay * 1000);
      }
    }, []);
    return <a ref={ref} href={href} className={className}>{children}</a>;
  },
  div: ({ initial, animate, transition, className, children }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.transform = `translateX(${initial.x}px)`;
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = `all ${transition.duration}s ease-out`;
            ref.current.style.opacity = String(animate.opacity);
            ref.current.style.transform = `translateX(${animate.x}px)`;
          }
        }, transition.delay * 1000);
      }
    }, []);
    return <div ref={ref} className={className}>{children}</div>;
  }
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  const problems = [
    {
      icon: Search,
      title: 'Invisible Online',
      description: "Customers Google you and find nothing—or worse, an outdated site that screams 'unprofessional.'"
    },
    {
      icon: PhoneOff,
      title: 'No Trust = No Calls',
      description: "Without a credible online presence, potential customers choose your competitors who look more legitimate."
    },
    {
      icon: TrendingDown,
      title: 'Wasted Marketing Budget',
      description: "Every dollar spent on ads or referrals is wasted if your online presence doesn't convert visitors into customers."
    }
  ];

  const services = [
    {
      icon: Monitor,
      title: 'Premium Websites',
      description: 'Custom-coded, mobile-responsive websites built to convert visitors into paying customers. No templates. Pure conversion',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: MapPin,
      title: 'Google Business Optimization',
      description: 'Optimized Google Business Profiles that dominate local search and drive 3x more calls and directions.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Done-For-You Management',
      description: 'Full hosting, maintenance, and updates so you never think about your website again. We handle everything.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const testimonials = [
    {
      text: "Within 2 weeks of launching our new site, we got 5 new customer calls. Prime Visibility delivered exactly what they promised.",
      author: "Mike R.",
      business: "Elite Roofing DFW"
    },
    {
      text: "Our Google Business Profile went from invisible to #1 in local search. The phone hasn't stopped ringing.",
      author: "Sarah M.",
      business: "Luxe Beauty Studio"
    },
    {
      text: "Finally, a web company that actually answers the phone and gets things done fast. Worth every penny.",
      author: "David T.",
      business: "Apex HVAC Services"
    },
    {
      text: "Went from losing customers to Google to dominating my local area. Best investment I've made in my business.",
      author: "Jennifer L.",
      business: "Premier Plumbing Co."
    }
  ];

  const steps = [
    { number: "01", title: "Free Demo", description: "We build a free demo site with your business info. No cost, no commitment." },
    { number: "02", title: "You Review", description: "Check it out on your phone. If you love it, we move forward. If not, no hard feelings." },
    { number: "03", title: "We Launch", description: "We finalize, launch, and optimize. You start getting more calls within days." },
    { number: "04", title: "We Maintain", description: "Ongoing hosting, updates, and support. You run your business. We handle the tech." }
  ];

  const industries = [
    'Roofing Contractors', 'HVAC Companies', 'Plumbers', 'Electricians',
    'Landscapers', 'Salons & Med Spas', 'Real Estate Agents', 'And more...'
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

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
        
        .grain {
          animation: grain 8s steps(10) infinite;
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.15) 0%, transparent 50%),
                         radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(176,38,255,0.15) 0%, transparent 50%)`
          }}
        />
        
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div 
            className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 text-center">
          {/* Eyebrow */}
          <div className="inline-block mb-6 sm:mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 uppercase font-light">
                Digital Dominance Starts Here
              </span>
            </div>
          </div>

          {/* Main headline - ULTRA BOLD */}
          <h1 className="font-display font-black text-[2.75rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] mb-6 sm:mb-8 px-2">
            <div className="overflow-visible">
              <span className="block text-white opacity-0 animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>PRIME</span>
            </div>
            <div className="relative overflow-visible">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-0 animate-fadeInRight whitespace-nowrap" style={{ animationDelay: '0.6s' }}>
                VISIBILITY
              </span>
              {/* Decorative line */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 opacity-0 animate-fadeInUp" style={{ animationDelay: '1s' }} />
            </div>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 mb-12 sm:mb-16 max-w-4xl mx-auto font-light leading-relaxed opacity-0 animate-fadeInUp px-4" style={{ animationDelay: '1.2s' }}>
            We don't just build websites. We architect digital experiences that turn invisible businesses into 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-semibold"> local powerhouses</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center opacity-0 animate-fadeInUp px-4" style={{ animationDelay: '1.4s' }}>
            <Link to="/book-call">
              <button className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-base sm:text-lg rounded-none overflow-hidden hover-lift w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Strategy Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link to="/portfolio">
              <button className="group px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white font-body font-semibold text-base sm:text-lg rounded-none hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 w-full sm:w-auto">
                View Our Work
              </button>
            </Link>
          </div>

          {/* Floating stats */}
          <div className="mt-16 sm:mt-24 grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 max-w-3xl mx-auto opacity-0 animate-fadeInUp px-4" style={{ animationDelay: '1.6s' }}>
            {[
              { value: '350%', label: 'Avg Growth' },
              { value: '24/7', label: 'Support' },
              { value: '2.4M', label: 'Total Reach' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-[0.65rem] sm:text-xs lg:text-sm text-gray-500 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeInUp hidden sm:flex" style={{ animationDelay: '1.8s' }}>
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
            <div className="w-[2px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
          </div>
        </div>

        {/* Floating Phone CTA - Top Right */}
        <motion.a
          href="tel:2145060806"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="hidden lg:flex fixed top-24 right-6 xl:right-12 z-40 items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-body text-xs text-gray-400 uppercase tracking-wider">Call Now</span>
            <span className="font-display text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
              (214) 506-0806
            </span>
          </div>
        </motion.a>

        {/* Floating Audit CTA - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="hidden lg:block fixed top-24 left-6 xl:left-12 z-40"
        >
          <Link to="/book-call">
            <button className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-violet-600/80 to-blue-600/80 backdrop-blur-md rounded-full hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.5)] hover:scale-105">
              <Sparkles className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-body font-semibold text-white text-sm">Free Audit Call</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        {/* Mobile Quick Actions - Fixed at bottom of screen on mobile only */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-3 opacity-0 animate-fadeInUp" style={{ animationDelay: '2s' }}>
          <a
            href="tel:2145060806"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-body font-bold text-black text-sm">Call</span>
          </a>
          <Link to="/book-call" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full shadow-lg active:scale-95 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="font-body font-bold text-white text-sm">Free Audit</span>
            </button>
          </Link>
        </div>
      </section>

      {/* TABLET 3D SHOWCASE - Between hero and problems */}
      <TabletShowcase 
        screenImagePath="/models/images/screen-modern.png"
      />

      {/* PROBLEMS SECTION - BRUTALIST CARDS */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6">
              <span className="text-white">You're </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Bleeding
              </span>
              <br />
              <span className="text-white">Customers</span>
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="group relative hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-zinc-900 p-6 sm:p-8 lg:p-10 border-2 border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
                  <problem.icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-cyan-400 mb-4 sm:mb-6" strokeWidth={1.5} />
                  <h3 className="font-display text-2xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">{problem.title}</h3>
                  <p className="font-body text-gray-400 leading-relaxed text-base sm:text-lg">{problem.description}</p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - BENTO GRID */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8">
              <span className="text-white">Your Digital</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                Arsenal
              </span>
            </h2>
            <p className="font-body text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Premium websites and Google Business profiles that turn browsers into buyers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative hover-lift cursor-pointer">
                {/* Gradient border effect */}
                <div className={`absolute -inset-[2px] bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                
                <div className="relative bg-zinc-900 p-8 sm:p-10 lg:p-12 border border-white/10 group-hover:border-transparent transition-all duration-300">
                  <div className={`inline-block p-3 sm:p-4 bg-gradient-to-br ${service.gradient} mb-4 sm:mb-6`}>
                    <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-black" strokeWidth={2} />
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="font-body text-gray-400 leading-relaxed mb-4 sm:mb-6 text-base sm:text-base">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-cyan-400 font-body font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Learn More
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - STAGGERED LAYOUT */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black">
              <span className="text-white">Real Results.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                Real Businesses.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group hover-lift"
                style={{ marginTop: index % 2 === 0 ? '0' : '0' }}
              >
                <div className="relative bg-zinc-900 p-6 sm:p-8 lg:p-10 border-l-4 border-cyan-500 group-hover:border-violet-500 transition-all duration-300">
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-cyan-400 text-xl sm:text-2xl">★</span>
                    ))}
                  </div>
                  <p className="font-body text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-display font-bold text-white text-base sm:text-lg">{testimonial.author}</p>
                    <p className="font-body text-gray-500 text-sm sm:text-base">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - DIAGONAL TIMELINE */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8">
              <span className="text-white">Simple Process.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                Fast Results.
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-12 md:left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 opacity-20" />

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-12 mb-12 sm:mb-16 lg:mb-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Number badge */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center border-2 sm:border-4 border-black">
                    <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-black">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-900 p-6 sm:p-8 border border-white/10 hover-lift w-full">
                  <h3 className="font-display text-2xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">{step.title}</h3>
                  <p className="font-body text-gray-400 text-base sm:text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES - GRID */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 sm:mb-12">
            <span className="text-white">Built For</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              DFW Service Businesses
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {industries.map((industry, index) => (
              <div key={index} className="group relative overflow-hidden hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-zinc-900 p-4 sm:p-6 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
                  <p className="font-body text-sm sm:text-base lg:text-lg font-semibold text-white">{industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-violet-500/20" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse 3s ease-in-out ${Math.random() * 2}s infinite`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-6 sm:mb-8 leading-none">
            <span className="text-white">READY TO</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              DOMINATE?
            </span>
          </h2>

          <p className="font-body text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto font-light px-4">
            Book a free 15-minute strategy call. We'll show you exactly what's costing you business and how to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link to="/book-call">
              <button className="group relative px-10 sm:px-12 py-5 sm:py-6 bg-white text-black font-body font-bold text-lg sm:text-xl rounded-none overflow-hidden hover-lift w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Book Your Free Call Now
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-gray-400 font-body text-base sm:text-lg">
            <span>Or call us:</span>
            <a
              href="tel:2145060806"
              className="text-cyan-400 text-xl sm:text-2xl font-bold hover:text-violet-400 transition-colors duration-300"
            >
              (214) 506-0806
            </a>
          </div>
        </div>
      </section>

      {/* STICKY CTA - Appears after hero (Desktop only) */}
      <div
        className={`hidden lg:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showStickyCTA ? 'animate-slideUp' : 'pointer-events-none opacity-0'
        }`}
      >
        <Link to="/book-call">
          <button className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-body font-bold text-base sm:text-lg rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,240,255,0.3)] hover:shadow-[0_15px_60px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Glowing border effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-300 -z-10" />
            
            <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Book a Free Audit Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </Link>
      </div>

      {/* FOOTER - MINIMAL */}
      <footer className="bg-black border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                <span className="text-cyan-400">PRIME</span>
                <br />
                <span className="text-white">VISIBILITY</span>
              </div>
              <p className="font-body text-gray-500 text-sm sm:text-base">Digital dominance for DFW businesses</p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 font-body">
              <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-base sm:text-lg">
                Home
              </Link>
              <Link to="/book-call" className="text-gray-400 hover:text-cyan-400 transition-colors text-base sm:text-lg">
                Book a Call
              </Link>
              <Link to="/portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors text-base sm:text-lg">
                Portfolio
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-base sm:text-lg">
                Contact
              </Link>
            </div>

            <div className="sm:text-left lg:text-right">
              <a
                href="tel:2145060806"
                className="block font-display text-xl sm:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4 hover:text-violet-400 transition-colors"
              >
                (214) 506-0806
              </a>
              <a
                href="https://www.instagram.com/primevisibilitymedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
              >
                @primevisibilitymedia
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
            <p className="font-body text-gray-600 text-sm sm:text-base">© 2025 Prime Visibility Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
