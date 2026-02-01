import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

export default function BookCall() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Talk About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B026FF]">
                Your Business
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book a free 15-minute strategy call. No pitch, no pressure—just an honest
              conversation about what's holding your business back online.
            </p>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl p-8 md:p-12 border border-gray-800 mb-16">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/optimization-primivisibilitymedia/30min"
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Prefer to call instead?</p>
              <a
                href="tel:2145060806"
                className="inline-block px-8 py-4 bg-[#00F0FF] text-black rounded-lg font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300"
              >
                Call: (214) 506-0806
              </a>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl p-8 md:p-12 border border-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What We'll{' '}
              <span className="text-[#00F0FF]">Cover:</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#00F0FF] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Audit</h3>
                  <p className="text-gray-400">
                    We'll review your current online presence (or lack thereof) and identify what's
                    costing you customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#00F0FF] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Honest Assessment</h3>
                  <p className="text-gray-400">
                    No BS sales pitch. We'll tell you straight what needs fixing and whether we're
                    the right fit for your business.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#00F0FF] rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom Game Plan</h3>
                  <p className="text-gray-400">
                    Walk away with a clear roadmap for your business—no cookie-cutter solutions,
                    just what actually works for your industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Not ready to book yet?</p>
            <Link
              to="/portfolio"
              className="text-[#00F0FF] hover:text-[#B026FF] transition-colors font-semibold"
            >
              Check out our work first →
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-2">
                <span className="text-[#00F0FF]">Prime</span> Visibility Media
              </div>
              <p className="text-gray-400">Premium Web Visibility for DFW Businesses</p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-[#00F0FF] transition-colors">
                Home
              </Link>
              <Link
                to="/book-call"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                Book a Call
              </Link>
              <Link
                to="/portfolio"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="text-right">
              <a
                href="tel:2145060806"
                className="block text-[#00F0FF] font-semibold mb-2 hover:text-[#B026FF] transition-colors"
              >
                (214) 506-0806
              </a>
              <a
                href="https://www.instagram.com/primevisibilitymedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                @primevisibilitymedia
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2025 Prime Visibility Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}