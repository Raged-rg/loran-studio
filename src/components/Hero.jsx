import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Users, FolderCheck, Clock, Heart, Award } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';
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
      className="relative min-h-[92vh] md:min-h-screen pt-24 pb-16 flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden select-none"
    >
      
      {/* Background Animated Gradient Blobs with smooth Parallax shifts */}
      <div 
        className="absolute top-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#2563EB]/8 blur-[85px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px), 0)'
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#1D4ED8]/6 blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: 'translate3d(calc(var(--mouse-x, 0) * -18px), calc(var(--mouse-y, 0) * -18px), 0)'
        }}
      />

      {/* Main Grid: Left Typography (visually left/order-last in RTL), Right Scene (visually right/order-first in RTL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-6">
        
        {/* Right Area Visually (Reception desk scene - placed first in HTML to float to the right) */}
        <div 
          className="lg:col-span-6 flex justify-center items-center select-none transition-transform duration-700 ease-out"
          style={{
            transform: 'translate3d(calc(var(--mouse-x, 0) * -12px), calc(var(--mouse-y, 0) * -12px), 0)'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="w-full flex justify-center items-center"
          >
            <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
              
              {/* Outer Rotating Dotted Borders for architectural depth */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#2563EB]/25 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-blue-500/10 animate-[spin_45s_linear_infinite_reverse]" />
              
              {/* Soft Ambient Blue Glow behind the visual */}
              <div className="absolute inset-16 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />
 
              {/* Premium Creative Workspace Mockup Card */}
              <div className="relative w-[92%] h-[92%] rounded-[48px] border border-blue-500/20 bg-[#030B1A]/35 backdrop-blur-md p-3.5 shadow-premium animate-float overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 rounded-[48px] border border-white/10 pointer-events-none z-10" />
                
                {/* Luxury Mockup Image with smooth zoom interaction on hover */}
                <div className="w-full h-full rounded-[36px] overflow-hidden shadow-inner relative">
                  <img 
                    src={heroWorkspace} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out select-none" 
                    alt="LORAN STUDIO Reception Desk" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/40 via-transparent to-transparent pointer-events-none" />
                </div>
 
                {/* Minimal Luxury Monogram Badge floating over the mockup */}
                <div className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full border border-blue-500/25 bg-[#030B1A]/90 backdrop-blur-md shadow-premium p-1.5 flex items-center justify-center animate-[float_4s_ease-in-out_infinite_reverse] hover:scale-105 transition-all">
                  <img src={logoIcon} className="w-full h-full object-cover rounded-full" alt="L Monogram" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Left Area Visually (Arabic Typography centered on mobile, right-aligned on desktop for premium look) */}
        <div 
          className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-right items-center lg:items-start transition-transform duration-700 ease-out"
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
              نصنع حضوراً رقمياً
              <br />
              <span className="text-[#3B82F6]">يصنع فرقاً استثنائياً</span>
            </h1>
 
            {/* Luxury Subtitle with fluid scaling */}
            <p className="max-w-lg text-[#94A3B8] font-normal text-fluid-body text-center lg:text-right mx-auto lg:mx-0">
              في لوران ستوديو، نبتكر منصات رقمية فاخرة وهويات بصرية متكاملة تجسد وقار علامتك التجارية وتخلق أثراً بليغاً يعيش مع الزمن.
            </p>
 
            {/* CTA Actions with responsive flex wrapping */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2 w-full">
              <button
                onClick={() => handleNavClick('wizard')}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_22px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-500 cursor-pointer clickable-hover animate-pulse-glow"
              >
                احجز استشارتك الآن
                <span className="text-white font-medium">✦</span>
              </button>
 
              <button
                onClick={() => handleNavClick('portfolio')}
                className="inline-flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-[#94A3B8] hover:text-[#60A5FA] transition-colors cursor-pointer clickable-hover border-b border-transparent hover:border-[#60A5FA] duration-500"
              >
                اكتشف أعمالنا المميزة
                <span className="text-xs">➔</span>
              </button>
            </div>
 
            {/* Client stats with lazy loading and high accessibility */}
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
                <span className="text-xs font-semibold text-white">120+ عميل سعيد</span>
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
