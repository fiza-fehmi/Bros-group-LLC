'use client';

import { Building2 } from 'lucide-react';

const SPONSORS = [
  { name: 'Apex Enterprise Tech', category: 'Cloud Infrastructure' },
  { name: 'Global AI Ventures', category: 'Artificial Intelligence' },
  { name: 'Indus Capital Partners', category: 'Venture Capital' },
  { name: 'Nexus Cyber Systems', category: 'Security' },
  { name: 'Synergy Digital Group', category: 'Digital Transformation' },
  { name: 'Vanguard Software Alliance', category: 'Enterprise Tech' },
  { name: 'OmniCloud Networks', category: 'Cloud Systems' },
  { name: 'Horizon Innovation Labs', category: 'Emerging Tech' },
  { name: 'Quantum Analytics Co', category: 'Data Science' }
];

export default function SponsorsCarousel() {
  return (
    <section className="py-16 bg-[#0F172A] border-y border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-2xl font-bold text-white tracking-tight">Strategic Corporate Partnerships & Alliances</h3>
      </div>

      {/* Looping Marquee with Hover Pause */}
      <div className="relative w-full overflow-hidden">
        <div className="flex space-x-6 animate-marquee whitespace-nowrap py-2">
          {[...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-3.5 px-6 py-3.5 bg-slate-800/90 border border-slate-700/80 hover:border-[#D97706]/60 rounded-lg shrink-0 transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <div className="w-8 h-8 rounded bg-amber-500/10 group-hover:bg-[#D97706] group-hover:text-white flex items-center justify-center text-[#D97706] font-bold text-sm transition-colors duration-200">
                {sponsor.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {sponsor.name}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {sponsor.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
