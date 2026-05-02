import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body   { font-family: 'Outfit', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="font-display text-2xl sm:text-3xl font-bold mb-3">
              <span className="text-cyan-400">PRIME</span>
              <br />
              <span className="text-white">VISIBILITY</span>
            </div>
            <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xs">
              Full-system growth for service businesses — maps, leads, automation, results.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3 font-body">
            <p className="font-display text-xs text-gray-600 uppercase tracking-widest mb-1">Navigation</p>
            <Link to="/"            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Home</Link>
            <Link to="/book-call"   className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Book a Call</Link>
            <Link to="/portfolio"   className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Portfolio</Link>
            <Link to="/pricing"     className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Pricing</Link>
            <Link to="/contact"     className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display text-xs text-gray-600 uppercase tracking-widest mb-4">Get In Touch</p>
            <a
              href="tel:2145060806"
              className="block font-display text-xl font-bold text-cyan-400 hover:text-violet-400 transition-colors mb-3"
            >
              (214) 506-0806
            </a>
            <a
              href="https://www.instagram.com/primevisibilitymedia/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              @primevisibilitymedia
            </a>
            <div className="mt-6">
              <Link
                to="/book-call"
                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-sm hover:from-blue-600 hover:to-violet-600 transition-all duration-300"
              >
                Book a Free Call →
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-body text-gray-600 text-xs leading-relaxed">
            © 2024 Prime Visibility Media. Prime Visibility Media is a brand operated by{' '}
            <span className="text-gray-500">Kennedy Success.</span>
          </p>
          <div className="flex items-center gap-4 font-body text-xs text-gray-700">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms"   className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
