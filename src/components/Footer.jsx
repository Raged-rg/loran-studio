import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageSquare, ArrowUp, Send } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';

export default function Footer() {
  const [btnX, setBtnX] = useState(0);
  const [btnY, setBtnY] = useState(0);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setBtnX((clientX - centerX) * 0.35);
    setBtnY((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    setBtnX(0);
    setBtnY(0);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="w-full bg-[#2B1A12] border-t border-[#C89B5B]/15 text-white py-16 px-6 relative overflow-hidden select-none z-10">
      
      {/* Ambient Radial Lighting Overlay */}
      <div className="absolute top-0 left-[20%] w-[300px] h-[300px] rounded-full bg-[#C89B5B]/3 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] rounded-full bg-[#7A4A2A]/4 blur-[110px] pointer-events-none" />

      {/* Floating Golden Dust Particles Rising */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-tr from-[#C89B5B] to-[#EADCCB]/40 pointer-events-none"
          style={{
            width: Math.random() * 3 + 2 + 'px',
            height: Math.random() * 3 + 2 + 'px',
            left: Math.random() * 100 + '%',
            bottom: Math.random() * 30 + '%',
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 relative z-10">
        
        {/* Animated Brand Emblem & Logo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="w-12 h-12 rounded-full overflow-hidden border border-white/10 hover:border-[#C89B5B]/30 flex items-center justify-center transition-all bg-[#FFFBF7]/5 shadow-sm"
          >
            <img src={logoIcon} className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity" alt="LORAN STUDIO Logo" />
          </motion.div>
          
          <h3 className="font-marcellus text-xl font-black tracking-wider text-white">LORAN STUDIO</h3>
          <p className="text-white/60 text-xs font-bold leading-relaxed max-w-lg text-center px-4">
            لوران ستوديو - فخامة التقنية والتميز البصري في العالم الرقمي. نصنع هويات ومواقع بروح عربية راقية ومعايير أداء عالمية.
          </p>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-[#C89B5B]/10 py-6 w-full max-w-2xl text-xs font-bold">
          <button onClick={() => handleScrollToTop()} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">الرئيسية</button>
          <button onClick={() => handleNavClick('services')} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">الخدمات</button>
          <button onClick={() => handleNavClick('why-loran')} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">لماذا لوران</button>
          <button onClick={() => handleNavClick('portfolio')} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">أعمالنا</button>
          <button onClick={() => handleNavClick('pricing')} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">الباقات</button>
          <button onClick={() => handleNavClick('contact')} className="text-white/70 hover:text-[#C89B5B] transition-colors cursor-pointer">تواصل معنا</button>
        </div>

        {/* Social Badges and Back To Top Button */}
        <div className="flex items-center justify-between w-full max-w-xl border-b border-[#C89B5B]/8 pb-8">
          
          {/* Social Badges */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/9647701234567" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/75 hover:text-[#C89B5B] hover:border-[#C89B5B]/40 hover:bg-white/10 transition-all shadow-soft"
            >
              <MessageSquare size={16} />
            </a>
            <a 
              href="https://instagram.com/loran_studio" 
              target="_blank" 
              rel="noreferrer" 
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/75 hover:text-[#C89B5B] hover:border-[#C89B5B]/40 hover:bg-white/10 transition-all shadow-soft"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="mailto:info@loranstudio.com" 
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/75 hover:text-[#C89B5B] hover:border-[#C89B5B]/40 hover:bg-white/10 transition-all shadow-soft"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Magnetic Back to Top button */}
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleScrollToTop}
            animate={{ x: btnX, y: btnY }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EADCCB] to-[#C89B5B] text-[#2B1A12] border border-[#C89B5B]/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </motion.button>

        </div>

        {/* Moving divider line and copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-[10px] text-white/40 font-bold gap-3 text-center">
          <span>لوران ستوديو • كافة الحقوق محفوظة © {new Date().getFullYear()}</span>
          <span className="flex items-center gap-1">
            صنع بشغف في العراق 
            <span className="text-red-500">♥</span>
            لأجل التميز الرقمي المطلق
          </span>
        </div>

      </div>
    </footer>
  );
}
