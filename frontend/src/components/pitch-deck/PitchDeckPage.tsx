'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitPitchDeck } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessModal from '@/components/common/SuccessModal';

const BACKGROUND_OPTIONS = ['Student', 'Working Professional', 'Existing Startup Founder'];
const INDUSTRY_CATEGORIES = ['FinTech', 'HealthTech', 'AI/SaaS', 'EdTech', 'E-Commerce', 'Other'];

export default function PitchDeckPage() {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    background: 'Student',
    startupName: '',
    category: 'AI/SaaS',
    briefIdea: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedStartup, setSubmittedStartup] = useState<{ founder: string; startup: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        setErrorMessage('Invalid file format. Only PDF and PPTX documents are allowed.');
        setFile(null);
        return;
      }

      if (selectedFile.size > 15 * 1024 * 1024) {
        setErrorMessage('File size exceeds the 15MB maximum limit.');
        setFile(null);
        return;
      }

      setErrorMessage('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.founderName || !formData.email || !formData.phone || !formData.startupName || !formData.briefIdea) {
      setErrorMessage('Please complete all required form fields.');
      return;
    }

    if (!file) {
      setErrorMessage('Please upload your pitch deck document (PDF or PPTX).');
      return;
    }

    const words = formData.briefIdea.trim().split(/\s+/).filter(Boolean).length;
    if (words > 500) {
      setErrorMessage(`Brief idea explanation exceeds 500 words limit (Current count: ${words} words).`);
      return;
    }

    setStatus('submitting');

    try {
      const payload = new FormData();
      payload.append('founderName', formData.founderName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('background', formData.background);
      payload.append('startupName', formData.startupName);
      payload.append('category', formData.category);
      payload.append('briefIdea', formData.briefIdea);
      payload.append('pitchDeck', file);

      const res = await submitPitchDeck(payload);
      if (res && res.success !== false) {
        setSubmittedStartup({ founder: formData.founderName, startup: formData.startupName });
        setShowSuccessModal(true);
        setStatus('idle');
        setFormData({
          founderName: '',
          email: '',
          phone: '',
          background: 'Student',
          startupName: '',
          category: 'AI/SaaS',
          briefIdea: ''
        });
        setFile(null);
      } else {
        throw new Error(res?.message || 'Failed to submit pitch deck application.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit pitch deck application.');
    }
  };

  const wordCount = formData.briefIdea.trim().split(/\s+/).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Pitch Deck Submitted Successfully!"
        message={`Thank you ${submittedStartup?.founder ? submittedStartup.founder : ''}. Your pitch deck proposal for ${submittedStartup?.startup ? submittedStartup.startup : 'your startup'} has been received and saved.`}
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-[#0F172A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight flex items-center space-x-3"
          >
            <span>Startup Pitch Deck <span className="text-[#D97706]">Submission</span></span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-lg max-w-3xl"
          >
            Allowing students, young professionals, and startup founders to submit business proposals for evaluation and technical partnership.
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
                  <h3 className="text-xl font-bold text-[#0F172A]">Pitch Submission Form Architecture</h3>
                  <p className="text-slate-500 text-xs mt-1">Fill out proposal specifications and attach your document.</p>
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
                  
                  {/* 1. Founder Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      1. Founder / Applicant Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.founderName}
                      onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>

                  {/* 2. Contact Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      2. Contact Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>

                  {/* 2b. Contact Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      Contact Phone / Tel <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 555 019 2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>

                  {/* 3. Professional Background */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      3. Professional Background <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.background}
                      onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                    >
                      {BACKGROUND_OPTIONS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Startup / Project Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      4. Startup / Project Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI Workflow Engine"
                      value={formData.startupName}
                      onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>

                  {/* 5. Industry Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      5. Industry Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                    >
                      {INDUSTRY_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* 6. Brief Idea Explanation */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-[#0F172A]">
                      6. Brief Idea Explanation <span className="text-rose-500">*</span>
                    </label>
                    <span className={`text-xs ${wordCount > 500 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                      {wordCount} / 500 words
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe the problem solved, market size, and required technical/business support..."
                    value={formData.briefIdea}
                    onChange={(e) => setFormData({ ...formData, briefIdea: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                  />
                </div>

                {/* 7. Upload Pitch Deck Document */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#0F172A]">
                    7. Upload Pitch Deck Document <span className="text-rose-500">*</span> (PDF / PPTX, Max 15MB)
                  </label>
                  
                  <div className="border-2 border-dashed border-slate-300 hover:border-[#D97706] rounded-2xl p-6 text-center cursor-pointer bg-slate-50 hover:bg-amber-500/5 transition-all duration-200 relative group">
                    <input
                      type="file"
                      required
                      accept=".pdf,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-2 pointer-events-none">
                      <Upload className="w-8 h-8 text-[#D97706] group-hover:scale-110 transition-transform duration-200 mx-auto" />
                      {file ? (
                        <div className="text-sm font-bold text-emerald-600 flex items-center justify-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Selected File: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-slate-700">Click or drag pitch deck document to upload</div>
                          <div className="text-xs text-slate-400">Supports PDF or PPTX formats up to 15MB</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-xl shadow-amber-900/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Uploading Pitch Deck & Notifying Committee...</span>
                      </>
                    ) : (
                      <span>Submit Startup Proposal to Committee</span>
                    )}
                  </button>
                </div>

              </form>
        </motion.div>
      </section>
    </main>
  );
}
