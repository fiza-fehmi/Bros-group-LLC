'use client';

import { useState, useEffect } from 'react';
import { GalleryItemData } from '@/types';
import { fetchGallery } from '@/lib/api';
import { Calendar, MapPin, X, ZoomIn, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardSkeleton } from '@/components/common/Skeletons';

const CATEGORY_TABS = [
  'All Photos',
  'MoU Signings',
  'Tech Expos & Summits',
  'Corporate Events',
  'Team & Culture'
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All Photos');
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await fetchGallery(activeCategory);
        setItems(data);
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, [activeCategory]);

  // Lock body scroll when modal open & attach ESC listener
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight' && selectedIndex < items.length - 1) {
          setSelectedIndex((prev) => (prev !== null ? prev + 1 : null));
        }
        if (e.key === 'ArrowLeft' && selectedIndex > 0) {
          setSelectedIndex((prev) => (prev !== null ? prev - 1 : null));
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedIndex, items.length]);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header with Hero Visual Overlay */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden border-b border-slate-800 flex items-center min-h-[320px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img
            src="/images/hero-poster.jpg"
            alt="Bros Group LLC Official Events & Key Milestones"
            className="w-full h-full object-cover filter brightness-[0.3] contrast-125 scale-105"
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
            Official Event <span className="text-[#D97706]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-lg max-w-3xl font-light leading-relaxed"
          >
            Photographs from key enterprise milestones, MoU signings, tech expos, summits, and corporate events.
          </motion.p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                activeCategory === tab
                  ? 'bg-[#0F172A] text-[#D97706] shadow-sm border border-slate-700'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* PREMIUM EDITORIAL GALLERY GRID */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <CardSkeleton count={6} />
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0F172A]">No Gallery Photographs Found</h3>
            <p className="text-slate-500 text-xs">Try selecting another filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {items.map((item, idx) => {
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#D97706]/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={
                        item.imageUrl.startsWith('/uploads')
                          ? `${(process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000')).replace(/\/api\/?$/, '')}${item.imageUrl}`
                          : item.imageUrl
                      }
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="text-white text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#0F172A]/85 border border-slate-700 flex items-center shadow-lg transform group-hover:translate-y-0 translate-y-1 transition-all duration-300">
                        <ZoomIn className="w-3.5 h-3.5 mr-2 text-[#D97706]" /> View Photograph →
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 bg-[#0F172A]/90 text-[#D97706] text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-slate-700/60 uppercase tracking-wider backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-bold text-[#0F172A] text-base leading-snug group-hover:text-[#D97706] transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-xs text-slate-500 pt-0.5">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Dedicated Description / Caption Area */}
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL WITH SMOOTH ANIMATIONS */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Close Lightbox Modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0F172A]/80 hover:bg-[#0F172A] text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next controls inside modal */}
              {selectedIndex > 0 && (
                <button
                  onClick={() => setSelectedIndex(selectedIndex - 1)}
                  aria-label="Previous photograph"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0F172A]/80 hover:bg-[#D97706] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {selectedIndex < items.length - 1 && (
                <button
                  onClick={() => setSelectedIndex(selectedIndex + 1)}
                  aria-label="Next photograph"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0F172A]/80 hover:bg-[#D97706] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <div className="relative aspect-video bg-slate-900">
                <img
                  src={
                    selectedItem.imageUrl.startsWith('/uploads')
                      ? `${(process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000')).replace(/\/api\/?$/, '')}${selectedItem.imageUrl}`
                      : selectedItem.imageUrl
                  }
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-4 bg-white">
                <div className="inline-block px-3 py-1 rounded bg-amber-500/10 text-[#D97706] text-xs font-bold uppercase tracking-wider">
                  {selectedItem.category}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">{selectedItem.title}</h3>
                
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-[#D97706]" />
                    <span className="font-semibold">{selectedItem.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#D97706]" />
                    <span className="font-semibold">{selectedItem.location}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
