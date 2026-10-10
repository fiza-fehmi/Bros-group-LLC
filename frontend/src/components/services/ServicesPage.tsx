'use client';

import Link from 'next/link';
import { Code, Bot, TrendingUp, Layout, Cloud, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES_CATALOG = [
  {
    category: 'Custom Software & App Engineering',
    icon: Code,
    deliverables: [
      'Full-stack Web Development (React, Next.js, Node.js, Python)',
      'Mobile App Development (iOS & Android Native / Cross-Platform)',
      'Enterprise Resource Planning (ERP) & Custom CRM Solutions'
    ]
  },
  {
    category: 'AI & Emerging Tech Integration',
    icon: Bot,
    deliverables: [
      'Enterprise AI Agent Integration & Workflow Automation',
      'Machine Learning Models, NLP & Predictive Data Analytics',
      'AI Consultation, Adoption Roadmaps & Systems Modernization'
    ]
  },
  {
    category: 'Digital Marketing & Executive Growth',
    icon: TrendingUp,
    deliverables: [
      'Executive Personal Branding (LinkedIn Thought Leadership & Audience Growth)',
      'Performance Marketing, SEO Strategy & Paid Acquisition Campaigns',
      'Social Media Management & Brand Positioning'
    ]
  },
  {
    category: 'UI/UX Design & Media Production',
    icon: Layout,
    deliverables: [
      'Product UI/UX Architecture, Wireframing & Design Systems (Figma)',
      'Visual Asset Generation, Motion Graphics & Visual FX',
      'Corporate Branding Collaterals, Pitch Decks & Marketing Kits'
    ]
  },
  {
    category: 'IT Advisory & Cloud Infrastructure',
    icon: Cloud,
    deliverables: [
      'Cloud Architecture & DevOps Support (AWS, Google Cloud, Azure)',
      'Cybersecurity Audits, Compliance & Infrastructure Scaling',
      'IT Talent Sourcing & Dedicated Software Engineering Teams'
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header with Hero Image Background */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[320px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/system-operation.jpg"
            alt="Bros Group LLC Enterprise Engineering Services"
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
            Full-Stack IT, AI & <span className="text-[#D97706]">Digital Strategy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg max-w-3xl font-light leading-relaxed"
          >
            Complete architectural catalog of enterprise offerings and technical deliverables.
          </motion.p>
        </div>
      </section>

      {/* SERVICES CATALOG GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES_CATALOG.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-[#D97706]/60 hover:bg-slate-50/50 transition-all duration-200 group shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200">
                      <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#D97706] transition-colors leading-snug">
                      {item.category}
                    </h3>
                  </div>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.deliverables[0]}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {item.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                        <span className="leading-tight">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/consultancy"
                    className="inline-flex items-center text-xs font-bold text-[#D97706] group-hover:text-amber-700 transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white text-center space-y-5 border border-slate-800 shadow-md"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Require a Custom Enterprise Solution?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a session with senior consultant Anus Ahmed Khan or CEO Muhammad Ali to discuss customized SLAs and architectural specifications.
          </p>
          <div>
            <Link
              href="/consultancy"
              className="inline-flex items-center px-7 py-3.5 rounded-xl font-bold bg-[#D97706] hover:bg-amber-600 text-white text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer group shadow-sm"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </section>
    </main>
  );
}
