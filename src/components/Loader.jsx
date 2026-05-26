import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIcon from '../assets/logo-icon.png';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const isMobileInApp = ua.includes('instagram') || ua.includes('fbav') || ua.includes('fb_iab') || /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

    // Absolute maximum timeout to guarantee loading screen is dismissed
    const targetTimeout = isMobileInApp ? 400 : 1200;

    const safetyTimeout = setTimeout(() => {
      setVisible(false);
    }, targetTimeout);

    const handleLoad = () => {
      setTimeout(() => setVisible(false), isMobileInApp ? 200 : 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F7F2EC]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(200, 169, 126, 0.08) 0%, transparent 60%)'
          }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated Golden Rings */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#C8A97E]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-double border-[#C8A97E]/40"
              />
              {/* Central Premium Golden Seal */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border border-[#C8A97E]/20 bg-[#FFFDF9]/40 backdrop-blur-md shadow-sm">
                <img src={logoIcon} className="w-full h-full object-cover" alt="LORAN Seal" />
              </div>
            </div>

            {/* Typography */}
            <div className="text-center flex flex-col gap-2">
              <motion.h1 
                initial={{ letterSpacing: '4px', opacity: 0 }}
                animate={{ letterSpacing: '2px', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="font-marcellus text-3xl font-extrabold text-[#3A2B24] uppercase tracking-[2px]"
              >
                LORAN STUDIO
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#C8A97E] font-bold text-sm tracking-wide"
              >
                لوران ستوديو • الفخامة الرقمية
              </motion.p>
            </div>

            {/* Progress line */}
            <div className="w-40 h-[2px] bg-[#3A2B24]/10 rounded-full overflow-hidden mt-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-transparent via-[#C8A97E] to-[#3A2B24]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
