import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIcon from '../assets/logo-icon.png';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'why-loran', label: 'لماذا لوران' },
    { id: 'portfolio', label: 'أعمالنا' },
    { id: 'process', label: 'خطواتنا' },
    { id: 'pricing', label: 'الباقات' },
    { id: 'contact', label: 'اتصل بنا' }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
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
            ? 'bg-[#F7EFE6]/80 backdrop-blur-xl border-b border-[#7A4A2A]/10 shadow-soft py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Menu Hamburger Button (Mobile & Tablet) */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-xl border border-[#7A4A2A]/12 bg-[#FFFBF7]/60 shadow-soft text-[#2B1A12] hover:bg-[#F4ECE3] transition-all"
            aria-label="فتح القائمة"
          >
            <Menu size={22} />
          </button>

          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 select-none cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#7A4A2A]/15 flex items-center justify-center shadow-sm bg-[#FFFBF7]/80 group-hover:scale-105 group-hover:border-[#C89B5B]/40 transition-all duration-300">
              <img src={logoIcon} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" alt="LORAN STUDIO" />
            </div>
            <div className="flex flex-col">
              <span className="font-marcellus text-[16px] font-bold tracking-widest text-[#2B1A12] leading-none group-hover:text-[#C89B5B] transition-colors duration-300">LORAN STUDIO</span>
              <span className="text-[9px] text-[#7A4A2A]/70 font-extrabold mt-[3px] leading-none">لوران ستوديو</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFBF7]/50 backdrop-blur-md px-2 py-1 rounded-2xl border border-[#7A4A2A]/10 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-[#7A4A2A] text-white shadow-md'
                    : 'text-[#2B1A12] hover:text-[#C89B5B] hover:bg-[#F4ECE3]/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Premium Call To Action Button (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-2 px-4 py-2 border border-[#7A4A2A]/15 bg-[#FFFBF7]/80 rounded-xl text-xs font-black text-[#2B1A12] shadow-soft hover:bg-[#F4ECE3] transition-all"
            >
              <MessageSquare size={14} className="text-[#C89B5B]" />
              استشارة مجانية
            </button>
            
            <button
              onClick={() => handleLinkClick('wizard')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-xs font-black shadow-md border border-[#C89B5B]/20 hover:scale-[1.03] transition-all duration-300"
            >
              ابدأ مشروعك
              <ArrowUpRight size={14} className="text-[#C89B5B]" />
            </button>
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
            className="fixed inset-0 z-[100] bg-[#2B1A12]/40 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[280px] h-full bg-[#F7EFE6] shadow-premium flex flex-col p-6 border-l border-[#7A4A2A]/10"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close & Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#7A4A2A]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#7A4A2A]/15 flex items-center justify-center bg-[#FFFBF7]/80 shadow-sm">
                    <img src={logoIcon} className="w-full h-full object-cover" alt="LORAN STUDIO" />
                  </div>
                  <span className="font-marcellus font-bold text-xs tracking-widest text-[#2B1A12]">LORAN STUDIO</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-[#7A4A2A]/10 text-[#2B1A12] hover:bg-[#F4ECE3] transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 py-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-extrabold text-right border transition-all ${
                      activeSection === link.id
                        ? 'bg-[#7A4A2A] text-white border-[#7A4A2A] shadow-md'
                        : 'bg-[#FFFBF7]/60 text-[#2B1A12] border-[#7A4A2A]/8 hover:bg-[#F4ECE3] hover:text-[#C89B5B]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-[10px] ${activeSection === link.id ? 'text-[#C89B5B]' : 'text-[#7A4A2A]/50'}`}>‹</span>
                  </button>
                ))}
              </nav>

              {/* Drawer Footer Call to action */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#7A4A2A]/10">
                <button
                  onClick={() => handleLinkClick('wizard')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-sm font-black shadow-md border border-[#C89B5B]/20"
                >
                  ابدأ مشروعك
                  <ArrowUpRight size={14} className="text-[#C89B5B]" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
