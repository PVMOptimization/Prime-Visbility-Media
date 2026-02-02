import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, Phone, Mail, User, Sparkles, Calendar } from 'lucide-react';

export default function BookCall() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    needs: {
      leads: false,
      website: false
    }
  });

  const [submitted, setSubmitted] = useState(false);

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call, email service)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        needs: { leads: false, website: false }
      });
    }, 3000);
  };

  const handleCheckbox = (field: 'leads' | 'website') => {
    setFormData(prev => ({
      ...prev,
      needs: {
        ...prev.needs,
        [field]: !prev.needs[field]
      }
    }));
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'Outfit', sans-serif; }

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
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

        .input-glow:focus {
          box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);
        }

        .checkbox-glow:checked {
          background: linear-gradient(135deg, #00F0FF 0%, #B026FF 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] floating" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] floating" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div 
            className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm opacity-0 animate-fadeInUp">
            <span className="font-body text-sm tracking-[0.3em] text-cyan-400 uppercase font-light">
              Let's Get Started
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-[0.9] opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">Ready to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Dominate?
            </span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Fill out the form below or book a call directly. No pitch, no pressure—just real talk about growing your business.
          </p>

          {/* Quick CTA */}
          <a
            href="tel:2145060806"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(0,240,255,0.3)] opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.6s' }}
          >
            <Phone className="w-5 h-5" />
            Call Now: (214) 506-0806
          </a>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-zinc-950 border border-white/10 p-8 sm:p-12 relative overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/30" />
                
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-white">
                  Send Us a Message
                </h2>
                <p className="font-body text-gray-400 mb-8">
                  We'll get back to you within 24 hours
                </p>

                {submitted ? (
                  <div className="py-20 text-center animate-fadeInUp">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="font-body text-gray-400">We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="font-body text-sm text-gray-400 uppercase tracking-wider block mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-none pl-12 pr-4 py-4 text-white font-body focus:outline-none input-glow transition-all duration-300"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="font-body text-sm text-gray-400 uppercase tracking-wider block mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-none pl-12 pr-4 py-4 text-white font-body focus:outline-none input-glow transition-all duration-300"
                          placeholder="(214) 555-0123"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-body text-sm text-gray-400 uppercase tracking-wider block mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-none pl-12 pr-4 py-4 text-white font-body focus:outline-none input-glow transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div>
                      <label className="font-body text-sm text-gray-400 uppercase tracking-wider block mb-4">
                        What Do You Need?
                      </label>
                      <div className="space-y-4">
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={formData.needs.leads}
                              onChange={() => handleCheckbox('leads')}
                              className="peer sr-only"
                            />
                            <div className="w-6 h-6 border-2 border-white/20 bg-black peer-checked:bg-gradient-to-br peer-checked:from-cyan-500 peer-checked:to-violet-500 peer-checked:border-transparent transition-all duration-300 flex items-center justify-center">
                              {formData.needs.leads && <Check className="w-4 h-4 text-black" />}
                            </div>
                          </div>
                          <span className="font-body text-white text-lg group-hover:text-cyan-400 transition-colors">
                            More Leads & Customers
                          </span>
                        </label>

                        <label className="flex items-center gap-4 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={formData.needs.website}
                              onChange={() => handleCheckbox('website')}
                              className="peer sr-only"
                            />
                            <div className="w-6 h-6 border-2 border-white/20 bg-black peer-checked:bg-gradient-to-br peer-checked:from-cyan-500 peer-checked:to-violet-500 peer-checked:border-transparent transition-all duration-300 flex items-center justify-center">
                              {formData.needs.website && <Check className="w-4 h-4 text-black" />}
                            </div>
                          </div>
                          <span className="font-body text-white text-lg group-hover:text-cyan-400 transition-colors">
                            Beautiful Professional Website
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-body font-bold text-lg rounded-none hover:shadow-[0_10px_40px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      <Sparkles className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info Cards - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* What We'll Cover */}
              <div className="bg-zinc-950 border border-white/10 p-6">
                <h3 className="font-display text-xl font-bold text-cyan-400 mb-6">
                  What We'll Cover:
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Quick Audit', desc: 'Review your current online presence' },
                    { title: 'Honest Talk', desc: 'No BS, just real solutions' },
                    { title: 'Custom Plan', desc: 'Roadmap built for your business' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-white text-sm">{item.title}</p>
                        <p className="font-body text-gray-500 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 p-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-1">
                      &lt;24hrs
                    </div>
                    <div className="font-body text-sm text-gray-400">Response Time</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-1">
                      100%
                    </div>
                    <div className="font-body text-sm text-gray-400">Free Consultation</div>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-black border-2 border-cyan-500/30 p-6">
                <p className="font-body text-sm text-gray-400 mb-4 uppercase tracking-wider">
                  Prefer Direct Contact?
                </p>
                <a
                  href="tel:2145060806"
                  className="block font-display text-2xl font-bold text-cyan-400 hover:text-violet-400 transition-colors mb-3"
                >
                  (214) 506-0806
                </a>
                <a
                  href="https://www.instagram.com/primevisibilitymedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  @primevisibilitymedia
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 backdrop-blur-sm">
              <span className="font-body text-sm tracking-[0.3em] text-violet-400 uppercase font-light">
                Book Directly
              </span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              <span className="text-white">Schedule Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                Free Strategy Call
              </span>
            </h2>
            
            <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto">
              Pick a time that works for you. We'll audit your current setup and show you exactly what's missing.
            </p>
          </div>

          {/* Calendly Widget Container */}
          <div className="bg-black border border-white/10 p-6 sm:p-8 lg:p-12 relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-violet-500/30" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500/30" />
            
            <div 
              className="calendly-inline-widget relative z-10" 
              data-url="https://calendly.com/optimization-primivisibilitymedia/10min"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          {/* Call Option Below Calendly */}
          <div className="mt-8 text-center">
            <p className="font-body text-gray-400 mb-4">Can't find a good time?</p>
            <a
              href="tel:2145060806"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-body font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(176,38,255,0.3)]"
            >
              <Phone className="w-5 h-5" />
              Call Us Directly: (214) 506-0806
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-4 sm:px-6">
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
