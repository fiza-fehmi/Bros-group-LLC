'use client';

import { useState, useEffect, useRef } from 'react';
import { Award, Users, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricItem {
  number: number;
  suffix: string;
  label: string;
  sub: string;
  icon: any;
}

const METRICS: MetricItem[] = [
  { number: 20, suffix: '+', label: 'MOUS SIGNED', sub: 'Strategic Global Alliances', icon: Award },
  { number: 1800, suffix: '+', label: 'HAPPY CLIENTS', sub: 'Enterprise & Startup Deliveries', icon: Users },
  { number: 9, suffix: '', label: 'GLOBAL SPONSORS', sub: 'Official Corporate Partners', icon: Globe },
  { number: 2026, suffix: '', label: '2019–2026', sub: 'INDUSTRY EXCELLENCE', icon: Calendar }
];

export default function MetricsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([20, 1800, 9, 2026]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800; // 1.8 seconds
    const steps = 45;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts([
        Math.min(20, Math.floor(progress * 20)),
        Math.min(1800, Math.floor(progress * 1800)),
        Math.min(9, Math.floor(progress * 9)),
        2026
      ]);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md border border-slate-200/90 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
      >
        {METRICS.map((item, idx) => {
          const Icon = item.icon;
          const displayVal = idx === 3 ? '2019–2026' : `${counts[idx]}${item.suffix}`;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center group cursor-pointer ${
                idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-[#D97706] flex items-center justify-center mb-3 group-hover:bg-[#D97706] group-hover:text-white transition-all duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-sans group-hover:text-[#D97706] transition-colors">
                {displayVal}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {item.sub}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
