'use client';

import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const TIMELINE = [
  {
    year: '2019',
    title: 'Founding Vision',
    desc: 'Founded by Muhammad Ali Zaheer to revolutionize how businesses adopt modern software and digital solutions.'
  },
  {
    year: '2021',
    title: 'Custom Enterprise Engineering',
    desc: 'Expanded into full-scale custom web, mobile app development, and enterprise ERP/CRM integrations globally.'
  },
  {
    year: '2023',
    title: 'AI Transformation Lab',
    desc: 'Pioneered early AI integration models, automated workflow tools, and machine learning analytics for high-growth clients.'
  },
  {
    year: '2025',
    title: 'Global MoU & Sponsor Expansion',
    desc: 'Crossed 1,800+ happy clients globally, securing 20+ strategic MoUs and 9 official corporate sponsors.'
  },
  {
    year: '2026',
    title: 'Autonomous Ecosystem Leadership',
    desc: 'Solidified position as a top-tier corporate powerhouse operating across AI agents, executive growth, and startup acceleration.'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO BANNER WITH CORPORATE LEADERSHIP IMAGE */}
      <section className="relative pt-32 pb-24 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[380px]">
        {/* Background Visual */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/about-hero.jpg"
            alt="Bros Group LLC Executive Technology Leadership"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-125 scale-105"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/60 z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-20 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
          >
            Our Journey & <span className="text-[#D97706]">Leadership Vision</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg sm:text-xl max-w-3xl font-light leading-relaxed"
          >
            Chronicle of our enterprise evolution from 2019 to 2026 and our commitment to powering global tech ecosystems.
          </motion.p>
        </div>
      </section>

      {/* 2. EXECUTIVE FOUNDER PROFILE & RECOGNITION — CLEAN LUXURY CONTRAST */}
      <section className="py-20 bg-white text-[#0F172A] border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97706]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header Title Badge */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-bold uppercase tracking-widest border border-[#D97706]/20 inline-block">
              Executive Leadership & Perspective
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Driving Digital Excellence & Global Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Portrait Image Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xl aspect-[4/5] max-w-sm mx-auto lg:max-w-none group">
                <img
                  src="/images/muhammad-ali.jpg"
                  alt="Muhammad Ali Zaheer - Founder & CEO Bros Group LLC"
                  className="w-full h-full object-cover object-[center_5%] filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex flex-col justify-end p-6 space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Muhammad Ali Zaheer</h3>
                  <p className="text-xs font-semibold text-[#D97706]">Founder & Chief Executive Officer (CEO)</p>
                  <p className="text-[11px] text-slate-300">Bros Group LLC (2019 – Present)</p>
                  <div className="pt-2">
                    <a
                      href="https://www.linkedin.com/in/muhammadali0fficial/?isSelfProfile=false"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#004182] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Vision, Narrative & Stats (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Featured Quote Box */}
              <div className="relative bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-3 border-l-4 border-l-[#D97706]">
                <div className="text-4xl text-[#D97706] font-serif leading-none">“</div>
                <blockquote className="text-lg sm:text-xl font-serif text-[#0F172A] italic leading-relaxed">
                  Technology is not merely a tool; it is the ultimate lever for human potential and business advancement. My vision for Bros Group LLC is to build an ecosystem where innovation meets execution seamlessly.
                </blockquote>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Founded in 2019 by CEO Muhammad Ali Zaheer, Bros Group LLC has grown into a corporate technology powerhouse operating across software engineering, digital transformation, brand strategic development, and venture acceleration.
                </p>
              </div>

              {/* High-Impact Stat Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-1 hover:border-[#D97706]/50 transition-all">
                  <span className="text-2xl font-black text-[#D97706] block">1,800+</span>
                  <span className="font-bold text-[#0F172A] block">Global Clients</span>
                  <span className="text-slate-500 text-[11px]">Enterprise software delivered</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-1 hover:border-[#D97706]/50 transition-all">
                  <span className="text-2xl font-black text-[#D97706] block">20+</span>
                  <span className="font-bold text-[#0F172A] block">Strategic MoUs</span>
                  <span className="text-slate-500 text-[11px]">Global corporate alliances</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-1 hover:border-[#D97706]/50 transition-all">
                  <span className="text-2xl font-black text-[#D97706] block">9</span>
                  <span className="font-bold text-[#0F172A] block">Official Sponsors</span>
                  <span className="text-slate-400 text-[11px]">Ecosystem backing</span>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <Link
                  href="/consultancy"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
                >
                  <span>Book Executive Strategy Session</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. EDITORIAL JOURNEY & TIMELINE PROGRESSION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Journey Overview Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-2 border-[#D97706] pl-6 sm:pl-8 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              The Journey (2019 – 2026)
            </h2>
            <blockquote className="text-xl sm:text-2xl font-serif text-[#0F172A] leading-relaxed italic">
              "Founded in 2019, Bros Group LLC started as a vision to revolutionize how businesses adopt technology and digital solutions. Over seven years of continuous growth (2019–2026), we have evolved from a tech consultancy into a full-scale corporate powerhouse operating across software engineering, digital transformation, brand strategic development, and startup acceleration."
            </blockquote>
          </motion.div>

          {/* Left-Aligned Single Vertical Line Timeline Progression */}
          <div className="relative border-t border-slate-200/80 pt-16">
            <div className="max-w-2xl mb-12 space-y-2">
              <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                2019–2026 Strategic Milestones
              </h3>
              <p className="text-slate-600 text-sm">
                Chronological evolution of our enterprise technology framework.
              </p>
            </div>

            <div className="relative max-w-3xl">
              {/* Left Timeline Vertical Line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-slate-200 pointer-events-none z-0" />

              <div className="space-y-10">
                {TIMELINE.map((t, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="relative pl-10 group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[12px] top-1.5 -translate-x-1/2 z-10 w-3.5 h-3.5 rounded-full bg-[#0F172A] border-2 border-[#D97706] group-hover:scale-125 transition-transform duration-200" />

                    {/* Milestone Content */}
                    <div className="space-y-1.5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-[#D97706]/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-mono font-bold text-[#D97706]">
                          {t.year}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Milestone 0{idx + 1}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-[#0F172A] group-hover:text-[#D97706] transition-colors">
                        {t.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
