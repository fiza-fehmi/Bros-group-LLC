'use client';

import { useState } from 'react';
import { Calendar, User, Mail, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitConsultancy } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessModal from '@/components/common/SuccessModal';

const PURPOSES = [
  'Startup Scalability',
  'AI Infrastructure',
  'Business Strategy',
  'Marketing Strategy',
  'Tech Stack Advisory'
];

export default function ConsultancyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    consultant: 'Muhammad Ali (Founder & CEO — Tech Strategy, AI Integration & Business Vision)',
    purpose: 'Startup Scalability',
    preferredDate: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.consultant || !formData.purpose) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await submitConsultancy(formData);
      if (res && res.success !== false) {
        setSubmittedData({ name: formData.fullName, email: formData.email });
        setShowSuccessModal(true);
        setStatus('idle');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          consultant: 'Muhammad Ali (Founder & CEO — Tech Strategy, AI Integration & Business Vision)',
          purpose: 'Startup Scalability',
          preferredDate: ''
        });
      } else {
        throw new Error(res?.message || 'Failed to submit consultancy request.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit consultancy request.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Consultancy Request Received!"
        message={`Thank you ${submittedData?.name ? submittedData.name : ''}. Your consultancy request has been submitted successfully and received by our executive team.`}
      />

      {/* Header with Hero Image Background */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[320px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/company-architecture.jpg"
            alt="Bros Group LLC Strategic Consultancy"
            className="w-full h-full object-cover filter brightness-[0.32] contrast-125 scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/60 z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-20 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            Book Strategic <span className="text-[#D97706]">Consultancy Session</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg max-w-3xl font-light leading-relaxed"
          >
            Schedule a dedicated session with executive leadership to accelerate your technical and strategic vision.
          </motion.p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-[#0F172A]">Consultancy Form Architecture</h3>
                  <p className="text-slate-500 text-xs mt-1">Please provide accurate contact details for scheduling.</p>
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 1. Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      1. Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* 2. Email Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      2. Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. Phone / WhatsApp Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      3. Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 555 0192 834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* 4. Select Consultant */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      4. Select Consultant <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.consultant}
                      onChange={(e) => setFormData({ ...formData, consultant: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                    >
                      <option value="Muhammad Ali (Founder & CEO — Tech Strategy, AI Integration & Business Vision)">
                        Muhammad Ali (Founder & CEO — Tech Strategy, AI Integration & Business Vision)
                      </option>
                      <option value="Anus Ahmed Khan (Senior Consultant — Operations, Execution & Growth)">
                        Anus Ahmed Khan (Senior Consultant — Operations, Execution & Growth)
                      </option>
                    </select>
                  </div>

                </div>

                {/* 5. Purpose of Consultancy */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#0F172A]">
                    5. Purpose of Consultancy <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                    {PURPOSES.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setFormData({ ...formData, purpose: p })}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 text-left cursor-pointer active:scale-95 ${
                          formData.purpose === p
                            ? 'bg-[#D97706] text-white border-[#D97706] shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your specific requirements or discussion goals..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                  />
                </div>

                {/* 6. Preferred Date & Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#0F172A]">
                    6. Preferred Date & Time <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="datetime-local"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-xl shadow-amber-900/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Request & Dispatching Notifications...</span>
                      </>
                    ) : (
                      <span>Submit Strategic Consultancy Request</span>
                    )}
                  </button>
                </div>

              </form>
        </motion.div>
      </section>
    </main>
  );
}
