'use client';

import { useState, useEffect } from 'react';
import { Code, Bot, TrendingUp, Globe, Share2, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchTeamMembers } from '@/lib/api';
import { TeamMemberItem } from '@/types';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers()
      .then((data) => {
        setTeamMembers(data || []);
      })
      .catch((err) => {
        console.error('Error fetching team members:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getDepartmentMembers = (deptName: string) => {
    return teamMembers.filter((m) => m.department === deptName);
  };

  const executiveMembers = getDepartmentMembers('Executive Leadership');
  const softwareMembers = getDepartmentMembers('Software & AI Engineering');
  const designMembers = getDepartmentMembers('Graphic Designing & Creative');
  const marketingMembers = getDepartmentMembers('Digital Marketing & Growth');
  const otherMembers = teamMembers.filter(
    (m) =>
      !['Executive Leadership', 'Software & AI Engineering', 'Graphic Designing & Creative', 'Digital Marketing & Growth'].includes(
        m.department
      )
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header with Hero Image Background */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[320px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/about-hero.jpg"
            alt="Bros Group LLC Executive Team & Tech Leadership"
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
            Our Team & <span className="text-[#D97706]">Leadership</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg max-w-3xl font-light leading-relaxed"
          >
            Executive leadership, engineering department leads, creative visual creators, and technology specialists powering Bros Group LLC.
          </motion.p>
        </div>
      </section>

      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="inline-block w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium">Loading team profiles...</p>
        </div>
      ) : (
        <>
          {/* SECTION 1: EXECUTIVE LEADERSHIP */}
          {executiveMembers.length > 0 && (
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Executive Leadership</h2>
                  <p className="text-slate-500 text-xs mt-1">Strategic vision, enterprise steering, and corporate execution.</p>
                </div>
                <span className="px-3 py-1 bg-[#D97706]/10 text-[#D97706] text-xs font-semibold rounded-full border border-[#D97706]/20">
                  Tier 1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {executiveMembers.map((mem, idx) => (
                  <TeamCard key={mem._id || idx} mem={mem} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: SOFTWARE & AI ENGINEERING */}
          {softwareMembers.length > 0 && (
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Software & AI Engineering</h2>
                  <p className="text-slate-500 text-xs mt-1">Full-stack software engineering, AI agent pipelines, and cloud architecture.</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                  Engineering
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {softwareMembers.map((mem, idx) => (
                  <TeamCard key={mem._id || idx} mem={mem} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: GRAPHIC DESIGNING & CREATIVE */}
          {designMembers.length > 0 && (
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Graphic Designing & Creative Team</h2>
                  <p className="text-slate-500 text-xs mt-1">UI/UX visual architecture, design systems, and corporate branding.</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                  Creative
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designMembers.map((mem, idx) => (
                  <TeamCard key={mem._id || idx} mem={mem} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 4: DIGITAL MARKETING & GROWTH */}
          {marketingMembers.length > 0 && (
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Digital Marketing & Growth</h2>
                  <p className="text-slate-500 text-xs mt-1">Brand positioning, market expansion, and executive thought leadership.</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                  Marketing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketingMembers.map((mem, idx) => (
                  <TeamCard key={mem._id || idx} mem={mem} idx={idx} />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 5: OTHER DEPARTMENTS */}
          {otherMembers.length > 0 && (
            <section className="py-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Operations & Department Specialists</h2>
                <p className="text-slate-500 text-xs mt-1">Key operational leadership and cross-functional team members.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherMembers.map((mem, idx) => (
                  <TeamCard key={mem._id || idx} mem={mem} idx={idx} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

function TeamCard({ mem, idx }: { mem: TeamMemberItem; idx: number }) {
  let fallbackImage = '/images/about-hero.jpg';
  let linkedinUrl = mem.linkedinUrl;

  if (mem.name?.includes('Muhammad Ali') || mem.name?.includes('Zaheer')) {
    fallbackImage = '/images/muhammad-ali.jpg';
    if (!linkedinUrl || linkedinUrl.trim() === '' || linkedinUrl === 'https://linkedin.com') {
      linkedinUrl = 'https://www.linkedin.com/in/muhammadali0fficial/?isSelfProfile=false';
    }
  } else if (mem.name?.includes('Anus') || mem.name?.includes('Ahmad') || mem.name?.includes('Ahmed')) {
    fallbackImage = '/images/anus-ahmed-khan.jpg';
    if (!linkedinUrl || linkedinUrl.trim() === '' || linkedinUrl === 'https://linkedin.com') {
      linkedinUrl = 'https://www.linkedin.com/in/anus-ahmed-khan';
    }
  }

  const isApiUpload = mem.photoUrl?.startsWith('/uploads/');
  const backendBase = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000')).replace(/\/api\/?$/, '');
  const displayImage = isApiUpload ? `${backendBase}${mem.photoUrl}` : mem.photoUrl || fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#D97706]/60 transition-all duration-300 flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <img
          src={displayImage}
          alt={mem.name}
          className="w-full h-full object-cover object-[center_5%] group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#D97706] transition-colors">
            {mem.name}
          </h3>
          <p className="text-sm font-semibold text-[#D97706] leading-snug">
            {mem.role}
          </p>
          <p className="text-xs text-slate-400 font-medium">{mem.department}</p>
        </div>

        {mem.bio && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3">
              {mem.bio}
            </p>
          </div>
        )}

        {linkedinUrl && (
          <div className="pt-2 flex items-center text-slate-400">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0A66C2] hover:text-[#004182] bg-blue-50 px-2.5 py-1 rounded-md transition-colors"
              title="LinkedIn Profile"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
