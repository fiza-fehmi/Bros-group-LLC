'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api';
import { motion } from 'framer-motion';
import SuccessModal from '@/components/common/SuccessModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await subscribeNewsletter(email);
      setStatus('idle');
      setMessage('');
      setEmail('');
      setShowSuccessModal(true);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Subscription failed.');
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Col 1: Overview */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
                <img src="/images/bros-logo-transparent.png" alt="Bros Group LLC Logo" className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                BROS GROUP <span className="text-[#D97706]">LLC</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Bros Group LLC bridges tech advancement, business growth, and strategic consultancy to power modern enterprises worldwide. Operating across software engineering, AI adoption, and startup acceleration.
            </p>
            <div className="pt-1 text-xs text-slate-400">
              <p className="font-semibold text-slate-300">Industry Excellence Period:</p>
              <p className="text-[#D97706] font-bold text-xs mt-0.5">2019 – 2026 Ecosystem Leadership</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-[#D97706] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services Catalog', href: '/services' },
                { label: 'Book Consultancy', href: '/consultancy' },
                { label: 'Submit Pitch Deck', href: '/pitch-deck' },
                { label: 'Event Gallery', href: '/gallery' },
                { label: 'Job Openings', href: '/careers' },
                { label: 'Leadership & Team', href: '/team' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#D97706] transition-colors duration-200 inline-flex items-center group cursor-pointer"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Services */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-[#D97706] pl-2.5">
              Core Practices
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Custom Software & Web</li>
              <li className="hover:text-slate-200 transition-colors">Enterprise AI Agents</li>
              <li className="hover:text-slate-200 transition-colors">Mobile App Engineering</li>
              <li className="hover:text-slate-200 transition-colors">Executive Brand Growth</li>
              <li className="hover:text-slate-200 transition-colors">UI/UX & Product Design</li>
              <li className="hover:text-slate-200 transition-colors">Cloud & IT Advisory</li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm border-l-2 border-[#D97706] pl-2.5">
              Corporate Desk
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <a href="mailto:info@brosgroupllc.com" className="hover:text-white transition-colors cursor-pointer">
                  info@brosgroupllc.com
                </a>
              </div>
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>+1 (800) 555-BROS / +92 300 0000000</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>Enterprise Technology Tower, Suite 800, Global Business District</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">Subscribe to Insights</p>
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-1.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Submit newsletter subscription"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#D97706] hover:bg-amber-600 text-white rounded text-xs font-medium flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-400 pt-0.5"
                  >
                    {message}
                  </motion.p>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-3 md:space-y-0">
          <p>© 2019–2026 Bros Group LLC. All Rights Reserved. Enterprise Engineering Blueprint.</p>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-200 transition-colors cursor-pointer">Security Architecture</Link>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Subscribed Successfully!"
        message="Thank you for subscribing to Bros Group LLC insights and updates."
      />
    </footer>
  );
}
