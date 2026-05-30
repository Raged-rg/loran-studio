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
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020817]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, transparent 60%)'
          }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated Golden Rings */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#2563EB]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-double border-[#3B82F6]/40"
              />
              {/* Central Premium Seal */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border border-blue-500/20 bg-[#030B1A]/40 backdrop-blur-md shadow-sm">
                <img src={logoIcon} className="w-[200%] h-[200%] max-w-none object-cover object-[15%_15%]" alt="SADEEM Seal" />
              </div>
            </div>
 
            {/* Typography */}
            <div className="text-center flex flex-col gap-2">
              <motion.h1 
                initial={{ letterSpacing: '4px', opacity: 0 }}
                animate={{ letterSpacing: '2px', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="font-sans text-3xl font-extrabold text-white uppercase tracking-[2px]"
              >
                SADEEM
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#60A5FA] font-bold text-sm tracking-wide"
              >
                سديم • الفخامة الرقمية
              </motion.p>
            </div>
 
            {/* Progress line */}
            <div className="w-40 h-[2px] bg-blue-950/20 rounded-full overflow-hidden mt-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-transparent via-[#2563EB] to-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

