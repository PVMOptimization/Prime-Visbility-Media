import { Link } from 'react-router-dom';
import { ExternalLink, Hammer, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function Portfolio() {
  const projects = [
    {
      name: 'DFW Elite Roofing',
      industry: 'Roofing Contractor',
      url: 'https://web-build-prime-visibility-media-j6rnssygg.vercel.app/',
      icon: Hammer,
      color: 'blue' as const,
      description:
        'Premium website for a roofing contractor showcasing services, expertise, and customer trust.'
    },
    {
      name: 'Luxe Beauty Studio',
      industry: 'Salon & Spa',
      url: 'https://beauty-studio-seven.vercel.app/',
      icon: Sparkles,
      color: 'purple' as const,
      description:
        'Elegant, conversion-focused website for a high-end beauty salon with booking integration.'
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Work{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B026FF]">
                Speaks For Itself
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium websites built for DFW service businesses.
            </p>
          </div>

          <div className="space-y-16 mb-20">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden hover:border-[#00F0FF]/50 transition-all duration-300 group"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <div className="mb-6">
                      <project.icon
                        className={`w-16 h-16 mb-4 ${
                          project.color === 'blue' ? 'text-[#00F0FF]' : 'text-[#B026FF]'
                        }`}
                      />
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.name}</h2>
                      <p className="text-[#00F0FF] text-lg font-semibold mb-4">
                        {project.industry}
                      </p>
                      <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <p className="text-sm text-gray-500 italic mb-6">
                        Demo site built to showcase our work. Real client sites available upon
                        request.
                      </p>
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F0FF] text-black rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 w-fit"
                    >
                      View Live Site
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        project.color === 'blue'
                          ? 'from-[#00F0FF]/20 to-transparent'
                          : 'from-[#B026FF]/20 to-transparent'
                      } rounded-lg group-hover:scale-105 transition-transform duration-300`}
                    ></div>
                    <div className="relative bg-[#0D0D0D] rounded-lg p-8 border border-gray-700 h-full flex items-center justify-center min-h-[300px]">
                      <div className="text-center">
                        <div
                          className={`text-6xl mb-4 ${
                            project.color === 'blue' ? 'text-[#00F0FF]' : 'text-[#B026FF]'
                          }`}
                        >
                          🌐
                        </div>
                        <p className="text-gray-400 text-sm">
                          Click "View Live Site" to see the full website
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#B026FF]/10 rounded-xl p-12 md:p-16 text-center border-2 border-[#00F0FF]/30">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Want This For{' '}
              <span className="text-[#00F0FF]">Your Business?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We'll build you a custom website that converts visitors into paying customers. No
              templates. No compromises.
            </p>
            <Link to="/book-call">
              <Button variant="primary" className="text-xl">
                Book Free Strategy Call
              </Button>
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
