import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, Phone, Mail, User, Sparkles, Calendar } from 'lucide-react';

export default function BookCall() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    smsOptIn: false // NEW: Track SMS consent
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

    // Verification requirement: Ensure they checked the box if they provided a phone number
    if (!formData.smsOptIn && formData.phone) {
      alert('Please confirm you agree to receive SMS communications to proceed.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xbdkkrzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          sms_consent: formData.smsOptIn ? 'Accepted' : 'Declined', // Send consent status to Formspree
          source: 'PrimeVisibilityMedia.com',
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          smsOptIn: false
        });
      }, 3000);

    } catch (error) {
      console.error('Formspree error:', error);
      alert('Something went wrong. Please try again.');
    }
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
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/20 rounded-full blur-[150px] floating" />
          <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-violet-500/20 rounded-full blur-[120px] floating" style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div 
            className="grain w-[200%] h-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm opacity-0 animate-fadeInUp">
            <span className="font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 uppercase font-light">
              Let's Get Started
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 leading-[0.95] sm:leading-[0.9] opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">Ready to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Dominate?
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Fill out the form below or book a call directly. No pitch, no pressure—just real talk about growing your business.
          </p>

          <a
            href="tel:2145060806"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold text-base sm:text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(0,240,255,0.3)] opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.6s' }}
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">Call Now: (214) 506-0806</span>
          </a>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="bg-zinc-950 border border-white/10 p-8 sm:p-12 relative overflow-hidden">
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
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="font-body text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-4 h-4 text-cyan-400" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg font-body focus:outline-none focus:border-cyan-500/50 transition-colors input-glow"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="font-body text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Mail className="w-4 h-4 text-cyan-400" /> Email
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg font-body focus:outline-none focus:border-cyan-500/50 transition-colors input-glow"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      {/* Phone Input */}
                      <div className="space-y-2">
                        <label className="font-body text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Phone className="w-4 h-4 text-cyan-400" /> Phone
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg font-body focus:outline-none focus:border-cyan-500/50 transition-colors input-glow"
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="font-body text-sm text-gray-400 uppercase tracking-widest">Message</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg font-body focus:outline-none focus:border-cyan-500/50 transition-colors input-glow resize-none"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    {/* SMS OPT-IN SECTION (Critical for Verification) */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="smsOptIn"
                          required
                          className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                          checked={formData.smsOptIn}
                          onChange={(e) => setFormData({...formData, smsOptIn: e.target.checked})}
                        />
                        <label htmlFor="smsOptIn" className="font-body text-sm text-gray-400 leading-tight">
                          I agree to receive automated marketing and informational text messages from Prime Visibility Media at the number provided. Consent is not a condition of purchase. Message and data rates may apply.
                        </label>
                      </div>
                      
                      <p className="font-body text-[10px] text-gray-500 uppercase tracking-tighter">
                        By clicking below, you also agree to our Privacy Policy. Reply STOP to cancel at any time.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black font-body font-bold text-lg rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group"
                    >
                      <span>Send Message</span>
                      <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar info (unchanged) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <Calendar className="w-10 h-10 text-violet-400 mb-6" />
                <h3 className="font-display text-2xl font-bold mb-4">Prefer a direct booking?</h3>
                <p className="font-body text-gray-400 mb-6">
                  Skip the form and pick a time that works best for you on our official calendar.
                </p>
                <a 
                  href="https://calendly.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-4 border border-violet-500/50 text-violet-400 font-body font-bold text-center rounded-lg hover:bg-violet-500 hover:text-white transition-all"
                >
                  Book on Calendly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
