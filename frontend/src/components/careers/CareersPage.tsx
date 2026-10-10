'use client';

import { useState, useEffect } from 'react';
import { JobItem } from '@/types';
import { fetchJobs, submitJobApplication } from '@/lib/api';
import { Search, Briefcase, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JobSkeleton } from '@/components/common/Skeletons';
import SuccessModal from '@/components/common/SuccessModal';

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Marketing', 'Sales'];
const LOCATION_TYPES = ['All', 'On-Site', 'Hybrid', 'Remote'];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [locFilter, setLocFilter] = useState('All');

  // Application Modal
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioLink: '',
    coverNote: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [appStatus, setAppStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [appError, setAppError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs(deptFilter, locFilter, search);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [deptFilter, locFilter]);

  // Lock body scroll when modal open & attach ESC listener
  useEffect(() => {
    if (selectedJob !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedJob(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedJob]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs();
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setAppError('Resume document must be in PDF format.');
        setResumeFile(null);
        return;
      }
      setAppError('');
      setResumeFile(file);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppError('');

    if (!selectedJob) return;

    if (!appForm.fullName || !appForm.email || !appForm.phone) {
      setAppError('Please complete all required fields.');
      return;
    }

    if (!resumeFile) {
      setAppError('Please upload your Resume (PDF format).');
      return;
    }

    setAppStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob._id);
      formData.append('jobTitle', selectedJob.title);
      formData.append('fullName', appForm.fullName);
      formData.append('email', appForm.email);
      formData.append('phone', appForm.phone);
      formData.append('linkedinUrl', appForm.linkedinUrl);
      formData.append('githubUrl', appForm.githubUrl);
      formData.append('portfolioLink', appForm.portfolioLink);
      formData.append('coverNote', appForm.coverNote);
      formData.append('resume', resumeFile);

      await submitJobApplication(formData);
      
      // Reset state and show global success modal strictly after backend confirmation
      setAppForm({
        fullName: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        githubUrl: '',
        portfolioLink: '',
        coverNote: ''
      });
      setResumeFile(null);
      setSelectedJob(null);
      setAppStatus('idle');
      setShowSuccessModal(true);
    } catch (err: any) {
      setAppStatus('error');
      setAppError(err.message || 'Failed to submit application.');
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header with Hero Image Background */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[320px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/system-operation.jpg"
            alt="Bros Group LLC Enterprise Engineering Careers"
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
            Build the Future of <span className="text-[#D97706]">Enterprise Tech</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg max-w-3xl font-light leading-relaxed"
          >
            Explore active career opportunities across software engineering, AI architecture, product design, and growth.
          </motion.p>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
              />
            </div>

            {/* Dept Filter */}
            <div>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>Dept: {d}</option>
                ))}
              </select>
            </div>

            {/* Loc Filter */}
            <div>
              <select
                value={locFilter}
                onChange={(e) => setLocFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
              >
                {LOCATION_TYPES.map((l) => (
                  <option key={l} value={l}>Type: {l}</option>
                ))}
              </select>
            </div>

          </form>
        </div>
      </section>

      {/* COMPACT CLEAN CAREER CARDS GRID */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <JobSkeleton count={4} />
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0F172A]">No Matching Jobs Found</h3>
            <p className="text-slate-500 text-xs">Try clearing your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:border-[#D97706]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#D97706] bg-amber-500/10 px-2.5 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="font-semibold text-slate-500 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                      {job.locationType} • {job.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#D97706] transition-colors leading-snug">
                    {job.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setAppStatus('idle');
                      setAppError('');
                    }}
                    className="w-full py-2 rounded-lg text-xs font-bold text-white bg-[#0F172A] group-hover:bg-[#D97706] transition-colors duration-200 shadow-sm cursor-pointer active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <span>View Job & Apply</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* APPLICATION MODAL FORM WITH SMOOTH ANIMATIONS */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-2xl w-full rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-200 relative my-8"
            >
              
              <button
                onClick={() => setSelectedJob(null)}
                aria-label="Close Job Application Modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A] cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Job Application</span>
                  <h3 className="text-2xl font-extrabold text-[#0F172A]">{selectedJob.title}</h3>
                </div>

                {appError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center space-x-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{appError}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Applicant Name"
                      value={appForm.fullName}
                      onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="applicant@example.com"
                      value={appForm.email}
                      onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 555 0192 834"
                      value={appForm.phone}
                      onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={appForm.linkedinUrl}
                      onChange={(e) => setAppForm({ ...appForm, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">GitHub URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={appForm.githubUrl}
                      onChange={(e) => setAppForm({ ...appForm, githubUrl: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Portfolio Link</label>
                    <input
                      type="url"
                      placeholder="https://portfolio.com"
                      value={appForm.portfolioLink}
                      onChange={(e) => setAppForm({ ...appForm, portfolioLink: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Resume File Upload * (PDF format)</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,application/pdf"
                    onChange={handleResumeChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0F172A] file:text-white hover:file:bg-[#D97706] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Cover Note</label>
                  <textarea
                    rows={3}
                    placeholder="Brief intro or cover note..."
                    value={appForm.coverNote}
                    onChange={(e) => setAppForm({ ...appForm, coverNote: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#D97706] focus:bg-white focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={appStatus === 'submitting'}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-98 disabled:opacity-70"
                  >
                    {appStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Submitted Successfully!"
        message="Your job application has been received and logged into our HR recruitment queue."
      />
    </main>
  );
}
