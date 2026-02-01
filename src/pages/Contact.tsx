import { Link } from 'react-router-dom';
import { Phone, Instagram, MapPin, Clock } from 'lucide-react';
import Button from '../components/Button';

export default function Contact() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B026FF]">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your online presence? Let's talk about your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-gray-800 group-hover:border-[#00F0FF]/50 transition-all duration-300">
                  <Phone className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <a
                    href="tel:2145060806"
                    className="text-gray-400 hover:text-[#00F0FF] transition-colors text-xl"
                  >
                    (214) 506-0806
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Click to call on mobile</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-gray-800 group-hover:border-[#B026FF]/50 transition-all duration-300">
                  <Instagram className="w-6 h-6 text-[#B026FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Instagram</h3>
                  <a
                    href="https://www.instagram.com/primevisibilitymedia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#B026FF] transition-colors"
                  >
                    @primevisibilitymedia
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Follow us for updates</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-gray-800 group-hover:border-[#00F0FF]/50 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Service Area</h3>
                  <p className="text-gray-400">Fort Worth & Greater DFW</p>
                  <p className="text-sm text-gray-500 mt-1">Serving all of North Texas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-gray-800 group-hover:border-[#B026FF]/50 transition-all duration-300">
                  <Clock className="w-6 h-6 text-[#B026FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Hours</h3>
                  <p className="text-gray-400">Monday - Saturday</p>
                  <p className="text-gray-400">9:00 AM - 7:00 PM CST</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-6">Prefer to Schedule?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Book a free 15-minute strategy call and we'll show you exactly what's holding your
                business back online—and how to fix it.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#00F0FF] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">No commitment, no cost</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#00F0FF] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">Honest assessment of your online presence</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#00F0FF] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    ✓
                  </div>
                  <p className="text-gray-300">Clear roadmap for getting more customers</p>
                </div>
              </div>

              <Link to="/book-call">
                <Button variant="primary" className="w-full">
                  Book Your Free Call
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#B026FF]/10 rounded-xl p-12 text-center border-2 border-[#00F0FF]/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to{' '}
              <span className="text-[#00F0FF]">Get Started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We respond to all inquiries within 24 hours. Usually much faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:2145060806">
                <Button variant="primary">Call Now: (214) 506-0806</Button>
              </a>
              <Link to="/portfolio">
                <Button variant="outline">View Our Work</Button>
              </Link>
            </div>
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
