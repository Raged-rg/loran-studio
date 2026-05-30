import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

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
          <div className="relative flex flex-col items-center gap-4 select-none">
            {/* Brand Logo centerpiece */}
            <div className="relative h-12 md:h-16 flex items-center justify-center animate-float">
              {/* Subtle blue backglow */}
              <div className="absolute inset-0 bg-[#2563EB]/10 blur-[40px] rounded-full pointer-events-none" />
              <img 
                src={logo} 
                className="h-full w-auto object-contain" 
                alt="SADEEM | سديم" 
              />
            </div>

            {/* Typography */}
            <div className="text-center flex flex-col gap-1 mt-4">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#60A5FA] font-bold text-xs tracking-widest uppercase"
              >
                الفخامة الرقمية • Digital Experiences
              </motion.p>
            </div>
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

