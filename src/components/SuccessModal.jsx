import React from 'react';
import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuccessModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#020817]/60 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md glass-card rounded-2xl p-8 border border-blue-500/20 bg-[#030B1A]/85 backdrop-blur-md shadow-premium flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-xl border border-blue-500/10 text-white hover:bg-blue-950/40 transition-all"
            >
              <X size={16} />
            </button>

            {/* Glowing Blue Circle Check */}
            <div className="relative w-20 h-20 bg-gradient-to-tr from-[#071224] to-[#020817] rounded-full border-2 border-blue-500 flex items-center justify-center shadow-lg mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
              >
                <Check size={22} strokeWidth={3} />
              </motion.div>
              
              {/* Outer Pulsing Glow */}
              <span className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-60" />
            </div>

            {/* Message Header */}
            <h2 className="font-marcellus text-2xl font-bold text-white mb-3">تم إرسال رسالتك بنجاح!</h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 font-bold">
              شكراً لتواصلك مع سديم. سيقوم مستشارونا بمراجعة طلبك والتواصل معك عبر الواتساب أو البريد الإلكتروني خلال أقل من 24 ساعة.
            </p>

            {/* Timings or Additional Note */}
            <div className="w-full bg-[#020817]/50 rounded-xl p-4 border border-blue-500/8 mb-6 text-xs text-[#94A3B8] flex flex-col gap-1.5 font-bold">
              <div>• أوقات العمل: من الأحد إلى الخميس (9 ص - 6 م)</div>
              <div>• سنقدم لك استشارتك المجانية الأولى بالكامل</div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold shadow-md border border-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              حسناً، فهمت
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
