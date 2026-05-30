import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
    if (start === end) return;

    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Hero({ setActiveSection, onOpenWizard }) {
  const sectionRef = useRef(null);

  // Luxury high-performance GPU-friendly mouse parallax capture
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
      className="relative min-h-[92vh] md:min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden select-none"
    >
      
      {/* Background Animated Gradient Blobs with smooth Parallax shifts */}
      <div 
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#2563EB]/5 blur-[95px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px), 0)'
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#1D4ED8]/4 blur-[110px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * -18px), calc(var(--mouse-y, 0) * -18px), 0)'
        }}
      />

      {/* Main Grid: Left Typography, Right Scene */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-6">
        
        {/* Right Area Visually (Floating Laptop Visual - placed first in HTML to float to the right in RTL) */}
        <div 
          className="lg:col-span-7 flex justify-center items-center select-none transition-transform duration-700 ease-out z-10 gpu-accelerated"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * -12px), calc(var(--mouse-y, 0) * -12px), 0)'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="w-full flex justify-center items-center relative"
          >
            {/* Soft Ambient Cyber Blue Glows behind the visual - Layered Depth */}
            <div className="absolute w-[95%] h-[80%] rounded-full bg-gradient-to-tr from-[#3B82F6]/18 to-[#2563EB]/15 blur-[100px] pointer-events-none" />
            <div className="absolute w-[75%] h-[60%] rounded-full bg-[#1D4ED8]/10 blur-[80px] pointer-events-none" />

            {/* Seamless Cinematic Laptop Presentation - Fully Frame-Free & Floating */}
            <div 
              className="relative w-full max-w-3xl lg:max-w-[130%] xl:max-w-[140%] h-auto overflow-hidden group flex items-center justify-center pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 96%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 96%)'
              }}
            >
              <img 
                src={heroWorkspace} 
                className="w-full h-auto object-contain transform scale-100 group-hover:scale-[1.01] transition-transform duration-1000 ease-out select-none pointer-events-none" 
                alt="SADEEM Workspace Scene" 
              />
            </div>
          </motion.div>
        </div>

        {/* Left Area Visually (Arabic Typography) */}
        <div 
          className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-right items-center lg:items-start transition-transform duration-700 ease-out gpu-accelerated"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * 6px), calc(var(--mouse-y, 0) * 6px), 0)'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-6 w-full items-center lg:items-start"
          >
            {/* Elegant Luxury Badge */}
            <div className="flex justify-center lg:justify-start w-full">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] text-[10px] font-medium tracking-widest uppercase select-none">
                ✦ تصميم مبتكر ، تجربة استثنائية
              </span>
            </div>
 
            {/* Main Title matching reference layout exactly with fluid typography */}
            <h1 className="text-fluid-h1 font-semibold text-white text-center lg:text-right">
              نحول الأفكار إلى
              <br />
              <span className="text-[#3B82F6] font-bold">تجارب رقمية استثنائية</span>
            </h1>
 
            {/* Luxury Subtitle with fluid scaling */}
            <p className="max-w-lg text-[#94A3B8] font-normal text-fluid-body text-center lg:text-right mx-auto lg:mx-0 leading-relaxed">
              نحن سديم. نصمم ونطور حلولاً رقمية ذكية تساعد العلامات التجارية على النمو في العالم الرقمي.
            </p>
 
            {/* CTA Actions with responsive flex wrapping */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2 w-full">
              <button
                onClick={() => handleNavClick('wizard')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_22px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-500 cursor-pointer clickable-hover animate-pulse-glow"
              >
                ابدأ مشروعك
                <span className="text-white font-medium">✦</span>
              </button>
 
              <button
                onClick={() => handleNavClick('portfolio')}
                className="inline-flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer clickable-hover border-b border-transparent hover:border-[#60A5FA] duration-500"
              >
                استكشف أعمالنا
                <span className="text-xs">➔</span>
              </button>
            </div>
 
            {/* Client stats with lazy loading */}
            <div className="flex flex-row items-center gap-3.5 mt-8 border-t border-blue-500/10 pt-6 justify-center lg:justify-start w-full">
              <div className="flex -space-x-3 rtl:space-x-reverse select-none">
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client Avatar 1" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client Avatar 2" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client Avatar 3" 
                />
                <img 
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80" 
                  className="w-9 h-9 rounded-full border-2 border-[#020817] object-cover" 
                  alt="Client Avatar 4" 
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

      </div>

      {/* Elegant Bouncing Mouse Indicator */}
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

