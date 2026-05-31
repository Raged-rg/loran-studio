import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import heroWorkspace from '../assets/hero-workspace.png';

// Reusable Scroll-Triggered smooth 60FPS counter component
function AnimatedCounter({ value, duration = 1.2, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value);
    if (isNaN(end) || start === end) return;

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 1000 / 40);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Hero({ setActiveSection, onOpenWizard }) {
  const sectionRef = useRef(null);

  // Parallax mouse variables
  useEffect(() => {
    let rAFId = null;
    const handleMouseMove = (e) => {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) - 0.5;
        const y = (e.clientY / innerHeight) - 0.5;
        sectionRef.current.style.setProperty('--mouse-x', x);
        sectionRef.current.style.setProperty('--mouse-y', y);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);

  const handleNavClick = (id) => {
    if (id === 'wizard') {
      if (onOpenWizard) onOpenWizard();
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
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden select-none"
    >
      {/* Background Glows */}
      <div 
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#2563EB]/5 blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * 15px), calc(var(--mouse-y, 0) * 15px), 0)'
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#1D4ED8]/4 blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * -15px), calc(var(--mouse-y, 0) * -15px), 0)'
        }}
      />

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full" dir="ltr">
        
        {/* LEFT COLUMN: Arabic Text Typography */}
        <div 
          className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-right items-center lg:items-start transition-transform duration-700 ease-out gpu-accelerated"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * 5px), calc(var(--mouse-y, 0) * 5px), 0)'
          }}
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-6 w-full items-center lg:items-start"
          >
            {/* Elegant Luxury Badge */}
            <div className="flex justify-center lg:justify-start w-full">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] text-[10px] font-bold tracking-widest uppercase select-none">
                ✦ تصميم مبتكر ، تجربة استثنائية
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-fluid-h1 font-semibold text-white text-center lg:text-right leading-tight">
              نحول الأفكار إلى
              <br />
              <span className="text-[#3B82F6] font-bold">تجارب رقمية استثنائية</span>
            </h1>

            {/* Description */}
            <p className="max-w-lg text-[#94A3B8] font-normal text-fluid-body text-center lg:text-right leading-relaxed">
              نحن سديم. نصمم ونطور حلولاً رقمية ذكية تساعد العلامات التجارية على النمو في العالم الرقمي، وندمج أحدث الاتجاهات لتقديم مخرجات تفوق التطلعات.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 w-full">
              <button
                onClick={() => handleNavClick('wizard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_22px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer clickable-hover"
              >
                ابدأ مشروعك
                <span className="text-white font-medium">✦</span>
              </button>

              <button
                onClick={() => handleNavClick('portfolio')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer clickable-hover border-b border-transparent hover:border-[#60A5FA] duration-300"
              >
                استكشف أعمالنا
                <span className="text-xs">➔</span>
              </button>
            </div>

            {/* Client Stats */}
            <div className="flex flex-row items-center gap-3.5 mt-8 border-t border-blue-500/10 pt-6 justify-center lg:justify-start w-full">
              <div className="flex -space-x-3 rtl:space-x-reverse select-none">
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client 1" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client 2" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client 3" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client 4" 
                />
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <span className="text-xs font-semibold text-white">
                  <AnimatedCounter value="120" suffix="+" /> عميل سعيد
                </span>
                <span className="text-[9px] text-[#94A3B8] font-medium">شركات وأفراد حول العالم</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Approved Hero Workspace Image */}
        <div 
          className="lg:col-span-7 flex justify-center items-center select-none transition-transform duration-700 ease-out z-10 gpu-accelerated w-full"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * -10px), calc(var(--mouse-y, 0) * -10px), 0)'
          }}
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="w-full flex justify-center items-center relative overflow-visible"
          >
            {/* Blends naturally without card/frame/border/glass containers */}
            <img 
              src={heroWorkspace} 
              className="w-full h-auto object-contain select-none pointer-events-none max-w-4xl scale-[1.1] lg:scale-[1.15] origin-center" 
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 45%, rgba(0,0,0,0.75) 70%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, rgba(0,0,0,0.75) 70%, transparent 100%)'
              }}
              alt="SADEEM Premium Cyber Workspace" 
            />
          </motion.div>
        </div>

      </div>

      {/* Elegant Bouncing Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none cursor-pointer z-10"
        onClick={() => handleNavClick('portfolio')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8.5 rounded-full border-2 border-blue-500/65 flex justify-center p-1">
          <motion.span 
            className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[9px] text-[#94A3B8]/60 font-medium tracking-widest uppercase">اسحب للأسفل</span>
      </motion.div>
    </section>
  );
}
