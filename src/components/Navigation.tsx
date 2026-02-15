import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Simple motion component for floating CTAs
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

interface NavigationProps {
  showStickyCTA?: boolean;
}

export default function Navigation({ showStickyCTA = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/book-call', label: 'Book a Call' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <style>{`
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

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .glass {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .font-display { 
          font-family: 'Syne', sans-serif; 
        }
        
        .font-body { 
          font-family: 'Outfit', sans-serif; 
        }
      `}</style>

      {/* Main Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-cyan-500/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="font-display text-xl sm:text-2xl font-bold">
                <span className="text-cyan-400">PRIME</span>
                <span className="text-white ml-2">VISIBILITY</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-base transition-colors duration-300 ${
                    location.pathname === link.to
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:2145060806"
                className="font-body font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                (214) 506-0806
              </a>
              <Link to="/book-call">
                <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                  Free Audit
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-body text-lg transition-colors duration-300 ${
                    location.pathname === link.to
                      ? 'text-cyan-400'
                      : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:2145060806"
                className="block font-body text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                (214) 506-0806
              </a>
              <Link to="/book-call">
                <button 
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Free Audit
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Phone CTA - Top Right (Desktop) */}
      <motion.a
        href="tel:2145060806"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="hidden lg:flex fixed top-24 right-6 xl:right-12 z-40 items-center gap-3 px-6 py-3 glass rounded-full hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group"
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

      {/* Floating Audit CTA - Top Left (Desktop) */}
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

      {/* Mobile Quick Actions - Fixed at bottom (Mobile Only) */}
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

      {/* Sticky Bottom CTA - Appears after scrolling (Desktop Only) */}
      {showStickyCTA && (
        <div className="hidden lg:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
          <Link to="/book-call">
            <button className="group relative px-8 sm:px-10 py-4 sm:py-5 glass border border-cyan-500/30 text-white font-body font-bold text-base sm:text-lg rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,240,255,0.3)] hover:shadow-[0_15px_60px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
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
      )}
    </>
  );
}