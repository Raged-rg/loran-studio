import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Navbar({ activeSection, setActiveSection, onOpenWizard }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // High performance passive scroll listener with rAF throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', hideOnTablet: false },
    { id: 'portfolio', label: 'أعمالنا', hideOnTablet: false },
    { id: 'services', label: 'خدماتنا', hideOnTablet: false },
    { id: 'why-sadeem', label: 'من نحن', hideOnTablet: false },
    { id: 'blog', label: 'المدونة', hideOnTablet: true },
    { id: 'contact', label: 'تواصل معنا', hideOnTablet: true }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    
    if (id === 'wizard') {
      if (onOpenWizard) onOpenWizard();
      return;
    }
    
    // Blog link simulation opening WhatsApp custom contact directly
    if (id === 'blog') {
      window.open(`https://wa.me/9647842272224?text=${encodeURIComponent("مرحباً سديم، أود الاستفسار عن مقالات المدونة وأعمالكم الجديدة.")}`, '_blank');
      return;
    }

    setActiveSection(id);
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
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center ${
          scrolled 
            ? 'bg-[#020817]/85 backdrop-blur-xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)] h-[52px] md:h-[60px]' 
            : 'bg-transparent h-[60px] md:h-[70px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          
          {/* Right Side Visually: CTA button & hamburger on mobile/tablet (appears first in RTL html flow) */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-blue-500/20 bg-[#030B1A]/80 shadow-md text-white hover:bg-blue-950 transition-all cursor-pointer flex items-center justify-center"
              aria-label="فتح القائمة"
            >
              <Menu size={16} />
            </button>

            <button
              onClick={() => handleLinkClick('wizard')}
              className="h-[34px] sm:h-[38px] px-3.5 sm:px-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-[10px] md:text-[11px] font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_22px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-500 cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              <span className="hidden sm:inline">ابدأ رحلتك الرقمية</span>
              <span className="inline sm:hidden">ابدأ الآن</span>
            </button>
          </div>

          {/* Center Visually: Nav Links with premium sliding framer-motion active indicator */}
          <nav className="hidden md:flex items-center gap-0.5 bg-[#030B1A]/60 backdrop-blur-md p-1 rounded-full border border-blue-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.15)] relative overflow-hidden h-[38px]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 lg:px-4.5 h-full rounded-full text-[10px] md:text-[11px] font-bold transition-all duration-500 cursor-pointer select-none active:scale-95 whitespace-nowrap flex items-center justify-center ${
                    isActive
                      ? 'text-white'
                      : 'text-[#94A3B8] hover:text-[#60A5FA]'
                  } ${link.hideOnTablet ? 'hidden lg:inline-block' : 'inline-block'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarSectionBackdrop"
                      className="absolute inset-0 bg-[#2563EB] rounded-full border border-blue-500/20 shadow-[0_0_12px_rgba(37,99,235,0.4)] z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Left Side Visually: Logo brand (appears last in HTML flow) */}
          <div className="flex items-center select-none cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <img 
              src={logo} 
              className="h-[40px] sm:h-[44px] md:h-[48px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
              alt="SADEEM | سديم" 
            />
          </div>

        </div>
      </header>

      {/* Mobile Sliding Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020817]/40 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-[280px] h-full bg-[#020817] shadow-2xl flex flex-col p-6 border-l border-blue-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close & Header */}
              <div className="flex items-center justify-between pb-6 border-b border-blue-500/10">
                <div className="flex items-center select-none cursor-pointer" onClick={() => { setIsOpen(false); handleLinkClick('home'); }}>
                  <img 
                    src={logo} 
                    className="h-[40px] w-auto object-contain" 
                    alt="SADEEM | سديم" 
                  />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-blue-500/20 text-[#94A3B8] hover:bg-[#030B1A] hover:text-white transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

               {/* Navigation Links */}
              <nav className="flex flex-col gap-3 py-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium text-right border transition-all cursor-pointer ${
                      activeSection === link.id
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10'
                        : 'bg-[#030B1A]/70 text-[#94A3B8] border-blue-500/5 hover:bg-blue-950/40 hover:text-[#60A5FA]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-[10px] ${activeSection === link.id ? 'text-[#60A5FA]' : 'text-[#94A3B8]/40'}`}>‹</span>
                  </button>
                ))}
              </nav>

              {/* Drawer Footer Call to action */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-blue-500/10">
                <button
                  onClick={() => handleLinkClick('wizard')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-xs font-medium shadow-[0_0_12px_rgba(37,99,235,0.2)] border border-blue-500/20 cursor-pointer"
                >
                  ابدأ رحلتك الرقمية
                  <ArrowUpRight size={12} className="text-white" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

