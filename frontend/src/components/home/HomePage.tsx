'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Bot, TrendingUp, Layout, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import MetricsBar from '@/components/home/MetricsBar';
import SponsorsCarousel from '@/components/home/SponsorsCarousel';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';

const FEATURED_SERVICES = [
  {
    icon: Code2,
    title: 'Custom Software & App Engineering',
    desc: 'Full-stack Web (React, Next.js, Node.js), Native & Cross-Platform Mobile Apps, Enterprise ERP & Custom CRM Solutions.',
    link: '/services'
  },
  {
    icon: Bot,
    title: 'AI & Emerging Tech Integration',
    desc: 'Enterprise AI Agent integration, workflow automation engines, machine learning models, NLP & predictive analytics.',
    link: '/services'
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing & Executive Growth',
    desc: 'Executive LinkedIn personal branding, performance marketing, SEO strategy & audience acquisition campaigns.',
    link: '/services'
  },
  {
    icon: Layout,
    title: 'UI/UX Design & Media Production',
    desc: 'Product UI/UX architecture, wireframing, Figma design systems, motion graphics & corporate branding collaterals.',
    link: '/services'
  },
  {
    icon: Cloud,
    title: 'IT Advisory & Cloud Infrastructure',
    desc: 'Cloud architecture & DevOps (AWS, GCP, Azure), cybersecurity audits, compliance scaling & dedicated engineering teams.',
    link: '/services'
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      
      {/* 1. HERO BANNER WITH ENTERPRISE TECH VISUAL BACKGROUND & CENTERED TEXT */}
      <section className="relative pt-28 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center justify-center min-h-[75vh]">
        {/* Background Visual Poster */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/hero-poster.jpg"
            alt="Bros Group LLC Enterprise Technology Background"
            className="w-full h-full object-cover filter brightness-[0.38] contrast-125 scale-105"
          />
        </div>

        {/* Subtle Overlay for maximum background text visibility */}
        <div className="absolute inset-0 bg-[#0F172A]/50 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-transparent to-[#0F172A] z-10 pointer-events-none"></div>

        {/* Subtle bottom edge transition dissolving naturally into next section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/30 to-transparent z-15 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <div className="space-y-6 sm:space-y-8">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Empowering Digital Innovation & <span className="text-[#D97706]">Scalable Business Solutions</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg sm:text-2xl text-slate-200 font-light leading-relaxed max-w-3xl mx-auto"
            >
              Bros Group LLC bridges tech advancement, business growth, and strategic consultancy to power modern enterprises worldwide.
            </motion.p>

            {/* Centered Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5"
            >
              <Link
                href="/consultancy"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-2xl shadow-amber-900/50 transition-all duration-200 flex items-center justify-center space-x-2.5 transform hover:-translate-y-1 active:scale-[0.98] cursor-pointer group"
              >
                <span>Book Consultancy</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-100 bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 backdrop-blur-md transition-all duration-200 text-center transform hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
              >
                Explore Services
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. METRICS COUNTER BAR */}
      <MetricsBar />

      {/* 3. COMPANY OVERVIEW SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Bridging Technology Advancement & Commercial Reality
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Founded in 2019, Bros Group LLC operates at the intersection of full-stack software development, system architecture, brand positioning, and venture advisory. Over seven years of continuous growth (2019–2026), we have delivered high-value software systems to over 1,800 clients globally.
              </p>
            </div>

            {/* Structured Capability Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200/80">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0F172A]">Enterprise Software Engineering</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Design and development of reliable web applications, APIs, business systems, and digital platforms built around real operational requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0F172A]">Automation & AI Workflows</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Practical automation and AI-assisted workflows designed to reduce repetitive work, connect business systems, and improve operational efficiency.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-bold text-[#D97706] hover:text-amber-700 transition-colors group cursor-pointer"
              >
                <span>Learn more about our growth journey (2019–2026)</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image Visual Treatment */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg group">
              <img
                src="/images/company-architecture.jpg"
                alt="Bros Group LLC Enterprise Technology Architecture"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
                <p className="text-xs text-slate-300 font-medium">Cloud Infrastructure & Backend Core Topology</p>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 4. FEATURED CORPORATE & IT SERVICES GRID */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-slate-100/60 border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Featured Corporate & IT Services
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              End-to-end solutions tailored for enterprise scalability and high-impact digital adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  href={srv.link}
                  className="group bg-white rounded-xl p-6 border border-slate-200/90 hover:border-[#D97706]/60 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#D97706] transition-colors leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#D97706] group-hover:text-amber-700">
                    <span>Explore Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 5. SPONSORS & STRATEGIC PARTNERS CAROUSEL */}
      <SponsorsCarousel />

      {/* 6. TESTIMONIALS CAROUSEL */}
      <TestimonialsCarousel />

      {/* 7. DISTINCT EXECUTIVE CTA SECTION (SEAMLESS NAVY TRANSITION TO FOOTER) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-[#0B132B] text-white border-t border-slate-800"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to Accelerate Your Enterprise Strategy?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Schedule a direct executive consultation session or submit your strategic venture proposal to our advisory board.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              href="/consultancy"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold bg-[#D97706] hover:bg-amber-600 text-white transition-all cursor-pointer shadow-sm active:scale-98 text-center"
            >
              Book Consultancy Session
            </Link>
            <Link
              href="/pitch-deck"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all cursor-pointer active:scale-98 text-center"
            >
              Submit Pitch Deck
            </Link>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
