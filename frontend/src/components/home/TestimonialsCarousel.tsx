'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Bros Group LLC transformed our legacy architecture into an AI-enabled automated ecosystem in under 4 months. Their strategic execution is unmatched.",
    author: "David Vance",
    role: "CTO, FinTech Holdings",
    metrics: "+300% Operational Throughput",
    stars: 5
  },
  {
    quote: "The strategic consultancy from Founder Muhammad Ali provided us with clear AI adoption roadmaps and investor pitch clarity that helped us secure Series-A funding.",
    author: "Elena Rostova",
    role: "Founder, HealthTech AI",
    metrics: "$2.4M Capital Raised",
    stars: 5
  },
  {
    quote: "Exceptional engineering rigor and design standards. Their full-stack team delivered our enterprise web application on time with zero downtime.",
    author: "Marcus Thorne",
    role: "VP Engineering, OmniCloud Systems",
    metrics: "100% SLA Uptime Achieved",
    stars: 5
  },
  {
    quote: "Working with Anus Ahmed Khan and the execution team gave us unprecedented speed to market. Outstanding professionalism and tech advisory.",
    author: "Sophia Martinez",
    role: "Managing Director, Global Logistics Tech",
    metrics: "45% Cost Reduction",
    stars: 5
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="mb-12 border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Verified Feedback
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Direct insights from corporate leaders and executive clients.
            </p>
          </div>

          <div className="text-sm font-mono font-medium text-slate-400">
            0{currentIndex + 1} / 0{TESTIMONIALS.length}
          </div>
        </div>

        {/* Editorial Quote Presentation */}
        <div
          className="relative min-h-[220px] flex flex-col justify-between py-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="border-l-2 border-[#D97706] pl-6 sm:pl-8 space-y-4">
                <blockquote className="text-xl sm:text-2xl font-serif text-[#0F172A] leading-relaxed italic">
                  "{TESTIMONIALS[currentIndex].quote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-[#0F172A] text-lg">
                    {TESTIMONIALS[currentIndex].author}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {TESTIMONIALS[currentIndex].role}
                  </div>
                </div>

                <div className="text-xs font-mono font-semibold text-[#D97706] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded inline-block">
                  {TESTIMONIALS[currentIndex].metrics}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Controls */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-between">
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#D97706]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-colors duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-colors duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
