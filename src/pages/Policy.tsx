import { Shield, Lock, Eye, MessageSquare } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white min-h-screen font-body pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl sm:text-6xl font-black mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Effective Date: April 2024</p>
        </div>

        <div className="space-y-12 bg-zinc-950 border border-white/10 p-8 sm:p-12 rounded-2xl relative overflow-hidden">
          {/* CRITICAL SECTION: SMS COMPLIANCE */}
          <section className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-cyan-400">
              <MessageSquare className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display">SMS & Mobile Messaging</h2>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-lg">
              <p className="text-gray-300 leading-relaxed mb-4">
                We value your privacy. By opting into our SMS service, you agree to receive automated messages from Prime Visibility Media.
              </p>
              {/* MANDATORY TWILIO/CARRIER LANGUAGE */}
              <p className="text-white font-semibold italic border-l-2 border-cyan-500 pl-4">
                "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
              </p>
            </div>
          </section>

          {/* Standard Sections */}
          <section>
            <h2 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
              <Eye className="w-5 h-5 text-violet-400" /> Information Collection
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We collect information you provide directly to us, including your name, email address, and phone number when you fill out our "Book Call" form. We also collect message delivery and interaction data to ensure your requests are handled efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
              <Lock className="w-5 h-5 text-violet-400" /> Data Security
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We implement robust security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-400" /> Your Rights
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You have the right to access, update, or delete the personal information we have on you. 
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-2">
              <li><strong>SMS Opt-out:</strong> Reply "STOP" to any message to immediately unsubscribe.</li>
              <li><strong>Support:</strong> Reply "HELP" for more information or contact us at (214) 506-0806.</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            © 2024 Prime Visibility Media. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
