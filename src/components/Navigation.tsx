import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A] bg-opacity-95 backdrop-blur-lg shadow-lg shadow-[#00F0FF]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[#00F0FF]">Prime</span>
              <span className="text-white"> Visibility</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-[#00F0FF]'
                    : 'text-gray-300 hover:text-[#00F0FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:2145060806"
              className="px-6 py-2 bg-[#00F0FF] text-black rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300"
            >
              (214) 506-0806
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-[#00F0FF]'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:2145060806"
              className="block w-full text-center px-6 py-2 bg-[#00F0FF] text-black rounded-lg font-semibold"
            >
              (214) 506-0806
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
