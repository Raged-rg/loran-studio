import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIcon from '../assets/logo-icon.png';

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
    { id: 'home', label: 'الرئيسية' },
    { id: 'portfolio', label: 'أعمالنا' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'why-loran', label: 'من نحن' },
    { id: 'blog', label: 'المدونة' },
    { id: 'contact', label: 'تواصل معنا' }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    
    if (id === 'wizard') {
      if (onOpenWizard) onOpenWizard();
      return;
    }
    
    // Blog link simulation opening WhatsApp custom contact directly
    if (id === 'blog') {
      window.open(`https://wa.me/9647842272224?text=${encodeURIComponent("مرحباً لوران ستوديو، أود الاستفسار عن مقالات المدونة وأعمالكم الجديدة.")}`, '_blank');
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#F7F2EC]/85 backdrop-blur-xl border-b border-[#C8A97E]/15 shadow-soft py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Right Side Visually: CTA button & hamburger on mobile/tablet (appears first in RTL html flow) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-xl border border-[#C8A97E]/25 bg-[#FFFDF9]/80 shadow-soft text-[#3A2B24] hover:bg-[#E8DDD0] transition-all cursor-pointer"
              aria-label="فتح القائمة"
            >
              <Menu size={20} />
            </button>

            <button
              onClick={() => handleLinkClick('wizard')}
              className="px-6 py-2.5 bg-[#C8A97E] text-[#3A2B24] rounded-full text-xs font-medium shadow-sm hover:shadow-[0_0_22px_rgba(200,169,126,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-500 cursor-pointer"
            >
              ابدأ رحلتك الرقمية
            </button>
          </div>

          {/* Center Visually: Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFDF9]/60 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-[#C8A97E]/12 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4.5 py-2 rounded-xl text-xs font-medium transition-all duration-500 cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#3A2B24] text-white shadow-md'
                    : 'text-[#3A2B24] hover:text-[#C8A97E] hover:bg-[#E8DDD0]/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Left Side Visually: Logo brand (appears last in HTML flow) */}
          <div className="flex items-center gap-2.5 select-none cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C8A97E]/20 flex items-center justify-center shadow-sm bg-[#FFFDF9]/90 group-hover:scale-105 group-hover:border-[#C8A97E]/45 transition-all duration-500">
              <img src={logoIcon} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" alt="LORAN STUDIO" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-marcellus text-[15px] font-bold tracking-widest text-[#3A2B24] leading-none group-hover:text-[#C8A97E] transition-colors duration-500">LORAN STUDIO</span>
              <span className="text-[8px] text-[#3A2B24]/75 font-medium mt-1 leading-none">لوران ستوديو</span>
            </div>
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
            className="fixed inset-0 z-[100] bg-[#3A2B24]/40 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-[280px] h-full bg-[#F7F2EC] shadow-premium flex flex-col p-6 border-l border-[#C8A97E]/15"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close & Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#C8A97E]/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#C8A97E]/20 flex items-center justify-center bg-[#FFFDF9]/80 shadow-sm">
                    <img src={logoIcon} className="w-full h-full object-cover" alt="LORAN STUDIO" />
                  </div>
                  <span className="font-marcellus font-bold text-xs tracking-widest text-[#3A2B24]">LORAN STUDIO</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-[#C8A97E]/15 text-[#3A2B24] hover:bg-[#E8DDD0] transition-all cursor-pointer"
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
                        ? 'bg-[#3A2B24] text-white border-[#3A2B24] shadow-md'
                        : 'bg-[#FFFDF9]/70 text-[#3A2B24] border-[#C8A97E]/10 hover:bg-[#E8DDD0] hover:text-[#C8A97E]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-[10px] ${activeSection === link.id ? 'text-[#C8A97E]' : 'text-[#3A2B24]/40'}`}>‹</span>
                  </button>
                ))}
              </nav>

              {/* Drawer Footer Call to action */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#C8A97E]/15">
                <button
                  onClick={() => handleLinkClick('wizard')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#C8A97E] text-[#3A2B24] rounded-xl text-xs font-medium shadow-sm hover:shadow-[0_0_20px_rgba(200,169,126,0.35)] border border-[#C8A97E]/20 cursor-pointer"
                >
                  ابدأ رحلتك الرقمية
                  <ArrowUpRight size={12} className="text-[#3A2B24]" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
