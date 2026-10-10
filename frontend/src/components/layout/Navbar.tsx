'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Consultancy', href: '/consultancy' },
  { name: 'Pitch Deck', href: '/pitch-deck' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Careers', href: '/careers' },
  { name: 'Our Team', href: '/team' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-4 sm:py-4.5'
          : 'bg-[#0F172A] border-b border-slate-800/60 py-5 sm:py-5.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img src="/images/bros-logo-transparent.png" alt="Bros Group LLC Logo" className="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans leading-none">
                BROS GROUP <span className="text-[#D97706]">LLC</span>
              </span>
              <span className="text-[9px] text-slate-400 font-medium tracking-widest uppercase mt-1">
                Enterprise & Tech Innovation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer group/nav ${
                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Clean thin underline for active / hover */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D97706] transition-transform duration-300 ease-out origin-left ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover/nav:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/consultancy"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group"
            >
              <span>Get in Touch</span>
              <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#D97706] bg-amber-500/10 font-semibold border border-amber-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.2 }}
              className="pt-4 border-t border-slate-800"
            >
              <Link
                href="/consultancy"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md cursor-pointer active:scale-98"
              >
                <span>Get in Touch</span>
                <ChevronRight className="w-5 h-5 ml-1.5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
