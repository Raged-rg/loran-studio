import React from 'react';
import { Home, Briefcase, FolderOpen, Calendar, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav({ activeSection, setActiveSection, onOpenWizard }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'services', icon: Briefcase, label: 'خدماتنا' },
    { id: 'wizard', icon: Calendar, label: 'طلب مشروع' },
    { id: 'portfolio', icon: FolderOpen, label: 'أعمالنا' },
    { id: 'contact', icon: HelpCircle, label: 'اتصل بنا' }
  ];

  const handleNavClick = (id) => {
    if (id === 'wizard') {
      if (onOpenWizard) onOpenWizard();
      return;
    }

    if (id === 'contact') {
      const element = document.getElementById('cta');
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
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe pt-2 md:hidden">
      
      {/* Dock container */}
      <div 
        className="mx-auto max-w-md h-[68px] glass-card rounded-2xl flex items-center justify-around px-3 border border-[#C8A97E]/15 shadow-premium"
        style={{
          background: 'rgba(255, 253, 249, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative flex flex-col items-center justify-center w-14 h-14 rounded-xl active:scale-90 transition-transform duration-200 select-none cursor-pointer"
              aria-label={item.label}
            >
              {/* Active Golden Background Indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottomActive"
                  className="absolute inset-0.5 bg-gradient-to-tr from-[#C8A97E]/12 to-[#3A2B24]/5 rounded-xl border border-[#C8A97E]/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#C8A97E]' : 'text-[#3A2B24]/60'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>

              {/* Text Label */}
              <span 
                className={`relative z-10 text-[9px] font-semibold mt-1 select-none transition-colors duration-300 ${
                  isActive ? 'text-[#3A2B24]' : 'text-[#3A2B24]/50'
                }`}
              >
                {item.label}
              </span>

              {/* Glowing Top Active Dot */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#C8A97E] shadow-lg shadow-[#C8A97E]/50" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
