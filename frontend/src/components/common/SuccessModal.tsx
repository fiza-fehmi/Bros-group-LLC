'use client';

import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = 'Form Submitted Successfully!',
  message = 'Your submission has been received successfully. Our team will review it and get back to you shortly.'
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-slate-200 text-center space-y-6 relative"
          >
            {/* Close Icon Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#D97706] mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {/* Title & Message */}
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {message}
              </p>
            </div>

            {/* Close Window Button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
