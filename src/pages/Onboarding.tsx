import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  MapPin,
  Palette,
  Target,
  Search,
  Facebook,
  Camera,
  FileCheck,
  Sparkles
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TOTAL_STEPS = 8;

export default function Onboarding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [state, handleSubmit] = useForm('xbdkkrzz');
  const formRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to top of form on step change
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiCheckbox = (name, value) => {
    setFormData((prev) => {
      const currentValues = prev[name] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  // ========== SUCCESS STATE ==========
  if (state.succeeded) {
    return (
      <div className="bg-black text-white min-h-screen">
        <style>{styles}</style>
        <Navigation showStickyCTA={false} />
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 mb-8 hover-lift">
              <Check className="w-12 h-12 text-black" strokeWidth={3} />
            </div>
            <h1 className="font-display text-5xl sm:text-7xl font-black mb-6">
              <span className="text-white">You're</span>{' '}
              <span className="text-illuminate glow-pulse">In.</span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              We got your onboarding submission. Your dedicated build manager will reach out within 24 hours to confirm access and kick off the build process.
            </p>
            <div className="bg-zinc-900 border border-white/10 p-8 text-left max-w-2xl mx-auto mb-12">
              <h3 className="font-display text-xl font-bold mb-4 text-cyan-400">What Happens Next</h3>
              <div className="space-y-4">
                {[
                  'Build manager reviews your submission (within 24 hrs)',
                  'Kickoff call to confirm access + answer questions (Day 1-2)',
                  'GoHighLevel verification + initial system setup (Day 3-5)',
                  'Ad creative + Google Profile work begins (Day 5-7)',
                  'Campaign goes live (Day 7-14)'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="font-body text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-body text-gray-500 text-sm">
              Questions? Text us directly at{' '}
              <a href="tel:2145060806" className="text-cyan-400 hover:text-violet-400 transition-colors">
                (214) 506-0806
              </a>
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // ========== MAIN FORM ==========
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <style>{styles}</style>

      <Navigation showStickyCTA={false} />

      {/* Mouse gradient backdrop */}
      <div
        className="fixed inset-0 opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,240,255,0.1) 0%, transparent 50%),
                       radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(176,38,255,0.1) 0%, transparent 50%)`
        }}
      />

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <section ref={formRef} className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* HEADER */}
          {currentStep === 1 && (
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm">
                  <span className="font-body text-xs tracking-[0.3em] text-cyan-400 uppercase font-light">
                    Client Onboarding
                  </span>
                </div>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl leading-[0.9] mb-6">
                <span className="block text-white">Let's Build</span>
                <span className="block text-illuminate glow-pulse">Your System.</span>
              </h1>
              <p className="font-body text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
                This form gives us everything we need to launch your Google Profile build-out and ad campaigns. Takes 10-15 minutes. Your info is encrypted and never shared.
              </p>
            </div>
          )}

          {/* PROGRESS BAR */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-xs text-gray-500 uppercase tracking-widest">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="font-body text-xs text-cyan-400 font-semibold">
                {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
              </span>
            </div>
            <div className="h-1 bg-zinc-900 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className="relative">
            <div className="bg-zinc-900 border border-white/10 p-6 sm:p-10 lg:p-12 hover-lift-subtle">

              {/* ========== STEP 1: BUSINESS BASICS ========== */}
              {currentStep === 1 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Building2}
                    label="Step 1 · Business Basics"
                    title="Tell us about your business"
                  />

                  <Field
                    label="Business name"
                    name="business_name"
                    placeholder="ABC Mold Remediation"
                    required
                    value={formData.business_name || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Owner / primary contact name"
                    name="contact_name"
                    placeholder="John Smith"
                    required
                    value={formData.contact_name || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Best phone number"
                    name="phone"
                    type="tel"
                    placeholder="(214) 555-0123"
                    required
                    value={formData.phone || ''}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* ========== STEP 2: CONTACT & LOCATION ========== */}
              {currentStep === 2 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={MapPin}
                    label="Step 2 · Contact & Location"
                    title="Where do you operate?"
                  />

                  <Field
                    label="Business email"
                    name="email"
                    type="email"
                    placeholder="you@yourbusiness.com"
                    required
                    value={formData.email || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Business street address"
                    name="address"
                    placeholder="123 Main St, Fort Worth, TX 76101"
                    required
                    value={formData.address || ''}
                    onChange={handleChange}
                    helper="This is the address that will appear on your Google Business Profile"
                  />

                  <Field
                    label="Website (if you have one)"
                    name="website"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={formData.website || ''}
                    onChange={handleChange}
                    helper="Leave blank if you don't have one yet"
                  />
                </div>
              )}

              {/* ========== STEP 3: BRAND & POSITIONING ========== */}
              {currentStep === 3 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Palette}
                    label="Step 3 · Brand & Positioning"
                    title="How do customers see you?"
                  />

                  <TextareaField
                    label="In one sentence, what does your business do?"
                    name="value_prop"
                    placeholder="We do mold remediation for residential homes in DFW with same-day response."
                    required
                    value={formData.value_prop || ''}
                    onChange={handleChange}
                  />

                  <TextareaField
                    label="What makes you different from your competitors?"
                    name="differentiator"
                    placeholder="We're TDLR-licensed, insurance-approved, and offer free thermal imaging on every inspection..."
                    required
                    value={formData.differentiator || ''}
                    onChange={handleChange}
                    helper="This will shape your ad copy and Google Profile description"
                  />

                  <Field
                    label="Years in business"
                    name="years_in_business"
                    placeholder="5"
                    value={formData.years_in_business || ''}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* ========== STEP 4: TARGET CUSTOMER & JOBS ========== */}
              {currentStep === 4 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Target}
                    label="Step 4 · Target Jobs"
                    title="What jobs do you want more of?"
                  />

                  <div>
                    <label className="block font-body text-sm font-semibold text-white mb-3">
                      What specific jobs/services do you want to focus on? <span className="text-cyan-400">*</span>
                    </label>
                    <p className="font-body text-xs text-gray-500 mb-3">
                      Select all that apply. We'll prioritize ads + Google Profile around these.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Mold remediation (residential)',
                        'Mold remediation (commercial)',
                        'Water damage restoration',
                        'Air quality testing',
                        'HVAC mold cleaning',
                        'Roofing',
                        'Emergency / 24-hr response',
                        'General Contractor',
                        'Real estate transaction work',
                        'Other (specify below)'
                      ].map((job) => (
                        <CheckboxOption
                          key={job}
                          label={job}
                          checked={(formData.target_jobs || []).includes(job)}
                          onChange={() => handleMultiCheckbox('target_jobs', job)}
                        />
                      ))}
                    </div>

                    {/* Conditional input field for Industry / Other specifier */}
                    {(formData.target_jobs || []).includes('Other (specify below)') && (
                      <div className="mt-4 step-fade-in">
                        <Field
                          label="Please specify your industry or other jobs"
                          name="target_jobs_other"
                          placeholder="e.g., Fire damage restoration, Asbestos abatement"
                          required={(formData.target_jobs || []).includes('Other (specify below)')}
                          value={formData.target_jobs_other || ''}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Hidden field to submit the array */}
                    <input type="hidden" name="target_jobs" value={(formData.target_jobs || []).join(', ')} />
                  </div>

                  <Field
                    label="Average ticket size for these jobs"
                    name="avg_ticket"
                    placeholder="$2,500 - $5,000"
                    required
                    value={formData.avg_ticket || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Service area / cities you cover"
                    name="service_area"
                    placeholder="Fort Worth, Arlington, Dallas, Plano (50-mile radius)"
                    required
                    value={formData.service_area || ''}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* ========== STEP 5: GOOGLE BUSINESS PROFILE ========== */}
              {currentStep === 5 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Search}
                    label="Step 5 · Google Business Profile"
                    title="Google access & setup"
                  />

                  <div className="bg-cyan-500/5 border-l-2 border-cyan-500 p-4 mb-4">
                    <p className="font-body text-sm text-gray-300">
                      We'll need <span className="text-cyan-400 font-semibold">Manager access</span> to your Google Business Profile (we don't need your password). After this form, we'll send you a step-by-step guide to grant access.
                    </p>
                  </div>

                  <SelectField
                    label="Do you already have a Google Business Profile?"
                    name="has_gbp"
                    required
                    value={formData.has_gbp || ''}
                    onChange={handleChange}
                    options={[
                      'Yes, it\'s verified and active',
                      'Yes, but it\'s not verified yet',
                      'I think so but I\'m not sure',
                      'No, I need one created from scratch'
                    ]}
                  />

                  <Field
                    label="Google account email used for your business profile"
                    name="google_email"
                    type="email"
                    placeholder="business@gmail.com"
                    value={formData.google_email || ''}
                    onChange={handleChange}
                    helper="If you don't have one yet, leave blank — we'll guide you through creating one"
                  />

                  <TextareaField
                    label="Current monthly review volume (rough estimate)"
                    name="review_volume"
                    placeholder="We get maybe 1-2 reviews a month right now"
                    value={formData.review_volume || ''}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* ========== STEP 6: FACEBOOK / META ADS ACCESS ========== */}
              {currentStep === 6 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Facebook}
                    label="Step 6 · Meta Ads Access"
                    title="Facebook & Instagram ads setup"
                  />

                  <div className="bg-violet-500/5 border-l-2 border-violet-500 p-4 mb-4">
                    <p className="font-body text-sm text-gray-300">
                      We'll run ads from <span className="text-violet-400 font-semibold">your Business Manager account</span> — your card, your data, your pixel. You see every dollar spent. We get <span className="text-violet-400 font-semibold">Admin or Advertiser access</span> only.
                    </p>
                  </div>

                  <SelectField
                    label="Do you have a Facebook Business Manager account?"
                    name="has_business_manager"
                    required
                    value={formData.has_business_manager || ''}
                    onChange={handleChange}
                    options={[
                      'Yes, fully set up with a pixel',
                      'Yes, but I\'m not sure about the pixel',
                      'I have a Facebook business page but no Business Manager',
                      'No, I need everything created from scratch'
                    ]}
                  />

                  <Field
                    label="Your Facebook Business Manager email"
                    name="meta_admin_email"
                    type="email"
                    placeholder="admin@yourbusiness.com"
                    value={formData.meta_admin_email || ''}
                    onChange={handleChange}
                    helper="This is the email logged into your Business Manager. We'll send you instructions to invite us."
                  />

                  <Field
                    label="Facebook page URL"
                    name="facebook_page"
                    type="url"
                    placeholder="https://facebook.com/yourbusiness"
                    value={formData.facebook_page || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Instagram handle (if applicable)"
                    name="instagram_handle"
                    placeholder="@yourbusiness"
                    value={formData.instagram_handle || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Monthly ad budget you're starting with"
                    name="ad_budget"
                    placeholder="$2,000 - $3,000"
                    required
                    value={formData.ad_budget || ''}
                    onChange={handleChange}
                    helper="Recommended: $2K-$3K/month minimum to hit the 15-appointment guarantee"
                  />
                </div>
              )}

              {/* ========== STEP 7: CREATIVE ASSETS ========== */}
              {currentStep === 7 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={Camera}
                    label="Step 7 · Creative Assets"
                    title="Photos, videos & proof"
                  />

                  <div className="bg-cyan-500/5 border-l-2 border-cyan-500 p-4 mb-4">
                    <p className="font-body text-sm text-gray-300">
                      Real photos always beat stock images. We'll send you a Google Drive folder link to upload these after this form. For now, just let us know what you have.
                    </p>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-white mb-3">
                      What creative assets do you have available?
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Logo (high-res)',
                        'Photos of completed jobs',
                        'Before/after photos',
                        'Photos of crew/trucks',
                        'Video testimonials',
                        'Written testimonials',
                        'Drone footage',
                        'Equipment / job site photos',
                        'None yet — we need to create everything'
                      ].map((asset) => (
                        <CheckboxOption
                          key={asset}
                          label={asset}
                          checked={(formData.creative_assets || []).includes(asset)}
                          onChange={() => handleMultiCheckbox('creative_assets', asset)}
                        />
                      ))}
                    </div>
                    <input type="hidden" name="creative_assets" value={(formData.creative_assets || []).join(', ')} />
                  </div>

                  <TextareaField
                    label="Brand colors (if you have any)"
                    name="brand_colors"
                    placeholder="Navy blue (#1a3a5c), white, accent gold. Or just describe them: 'blue and white with a clean look'"
                    value={formData.brand_colors || ''}
                    onChange={handleChange}
                  />

                  <TextareaField
                    label="Anything else we should know about your branding?"
                    name="brand_notes"
                    placeholder="We don't want to look corporate — we go for a family-owned, local vibe..."
                    value={formData.brand_notes || ''}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* ========== STEP 8: AUTHORIZATION & SIGN-OFF ========== */}
              {currentStep === 8 && (
                <div className="space-y-6 step-fade-in">
                  <StepHeader
                    icon={FileCheck}
                    label="Step 8 · Authorization"
                    title="Final sign-off"
                  />

                  <TextareaField
                    label="Anything else we should know? Goals, concerns, deadlines?"
                    name="additional_notes"
                    placeholder="I'm trying to hit $30K in new revenue this month. Open to anything that gets us there..."
                    value={formData.additional_notes || ''}
                    onChange={handleChange}
                  />

                  <div className="space-y-4 pt-4">
                    <CheckboxOption
                      label="I authorize Prime Visibility Media to manage my Google Business Profile and create/manage ad campaigns on my Meta Business Manager account."
                      checked={formData.authorize_management || false}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          authorize_management: !prev.authorize_management
                        }))
                      }
                      required
                    />
                    <input
                      type="hidden"
                      name="authorize_management"
                      value={formData.authorize_management ? 'Yes' : 'No'}
                    />

                    <CheckboxOption
                      label="I understand that ad spend is funded from my own ad account and is separate from PVM service fees."
                      checked={formData.understand_ad_spend || false}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          understand_ad_spend: !prev.understand_ad_spend
                        }))
                      }
                      required
                    />
                    <input
                      type="hidden"
                      name="understand_ad_spend"
                      value={formData.understand_ad_spend ? 'Yes' : 'No'}
                    />

                    <CheckboxOption
                      label="I'll provide access to my Google and Meta accounts within 48 hours of submitting this form."
                      checked={formData.provide_access || false}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          provide_access: !prev.provide_access
                        }))
                      }
                      required
                    />
                    <input
                      type="hidden"
                      name="provide_access"
                      value={formData.provide_access ? 'Yes' : 'No'}
                    />
                  </div>

                  <Field
                    label="Type your full name to sign"
                    name="signature"
                    placeholder="John Smith"
                    required
                    value={formData.signature || ''}
                    onChange={handleChange}
                  />

                  <Field
                    label="Today's date"
                    name="signature_date"
                    type="date"
                    required
                    value={formData.signature_date || ''}
                    onChange={handleChange}
                  />

                  <ValidationError errors={state.errors} className="text-red-400 text-sm" />
                </div>
              )}

              {/* ========== NAV BUTTONS ========== */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-white/10">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="group px-6 py-3 border border-white/20 text-white font-body font-semibold hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                  </button>
                )}

                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-body font-bold flex-1 sm:flex-initial sm:ml-auto hover-lift flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-body font-bold flex-1 sm:flex-initial sm:ml-auto hover-lift flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Onboarding
                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* HELPER TEXT */}
          <p className="text-center font-body text-xs text-gray-500 mt-6">
            Your information is encrypted and only used to build your system. We never share or sell client data.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ========================================================
   REUSABLE FIELD COMPONENTS
   ======================================================== */

function StepHeader({ icon: Icon, label, title }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
          <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
        </div>
        <span className="font-body text-xs tracking-[0.2em] text-cyan-400 uppercase font-semibold">
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-black text-white">{title}</h2>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder, required, value, onChange, helper }) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm font-semibold text-white mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white font-body placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
      />
      {helper && <p className="font-body text-xs text-gray-500 mt-2">{helper}</p>}
    </div>
  );
}

function TextareaField({ label, name, placeholder, required, value, onChange, helper }) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm font-semibold text-white mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white font-body placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors resize-none"
      />
      {helper && <p className="font-body text-xs text-gray-500 mt-2">{helper}</p>}
    </div>
  );
}

function SelectField({ label, name, options, required, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm font-semibold text-white mb-2">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white font-body focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300F0FF' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
          backgroundSize: '1.25em',
          paddingRight: '3rem'
        }}
      >
        <option value="" className="bg-zinc-900">Select an option...</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-zinc-900">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxOption({ label, checked, onChange, required }) {
  return (
    <label className="flex items-start gap-3 p-3 bg-black/40 border border-white/10 cursor-pointer hover:border-cyan-500/40 transition-colors group">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 transition-all flex items-center justify-center ${
            checked
              ? 'bg-gradient-to-br from-cyan-500 to-violet-500 border-transparent'
              : 'border-white/30 group-hover:border-cyan-400'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
        </div>
      </div>
      <span className="font-body text-sm text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

/* ========================================================
   GLOBAL STYLES
   ======================================================== */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  .font-display { font-family: 'Syne', sans-serif; }
  .font-body { font-family: 'Outfit', sans-serif; }

  @keyframes pulse-glow {
    0%, 100% { text-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
    50% { text-shadow: 0 0 40px rgba(0, 240, 255, 0.8), 0 0 60px rgba(176, 38, 255, 0.6); }
  }
  .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

  .text-illuminate {
    background: linear-gradient(45deg, #00F0FF, #B026FF, #00F0FF);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: illuminate 3s ease-in-out infinite;
  }
  @keyframes illuminate {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .hover-lift {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .hover-lift:hover { transform: translateY(-4px); }

  .hover-lift-subtle {
    transition: border-color 0.4s ease;
  }

  @keyframes stepFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .step-fade-in { animation: stepFadeIn 0.5s ease-out forwards; }

  /* Style date input */
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    opacity: 0.5;
    cursor: pointer;
  }
  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }
`;
