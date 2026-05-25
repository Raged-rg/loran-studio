import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import ThreeDLogo from './ThreeDLogo';
import ErrorBoundary from './ErrorBoundary';

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
      // Dynamic increment step to count up seamlessly in ~60 frames
      start += Math.ceil(end / 60);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// High-fidelity CSS-3D fallback used if WebGL/Three.js fails
function ThreeDLogoFallback() {
  return (
    <div className="w-full h-[320px] md:h-[450px] flex items-center justify-center select-none">
      <div className="relative w-44 h-44 flex items-center justify-center animate-float">
        <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-double border-[#B87333]/30 animate-[spin_20s_linear_infinite_reverse]" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border-2 border-[#C89B5B] shadow-premium flex items-center justify-center">
          <span className="font-marcellus text-5xl font-extrabold text-[#C89B5B] select-none">L</span>
        </div>
        <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#B87333] border border-[#C89B5B]/30" />
        <div className="absolute bottom-6 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#EADCCB] border border-[#C89B5B]/30" />
      </div>
    </div>
  );
}

export default function Hero({ setActiveSection }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Luxury mouse parallax capture
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Get normalized cursor coordinates (-0.5 to 0.5)
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (id) => {
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
      id="home" 
      className="relative min-h-[90vh] md:min-h-screen pt-28 md:pt-36 pb-12 flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden select-none"
    >
      
      {/* Background Animated Gradient Blobs with smooth Parallax shifts */}
      <div 
        className="absolute top-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#C89B5B]/6 blur-[85px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#7A4A2A]/4 blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)`
        }}
      />

      {/* Main Grid: Left 3D Logo, Right Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Right Area (Arabic Typography with soft parallax drift) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col gap-6 text-right order-2 md:order-1 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`
          }}
        >
          {/* Badge */}
          <div className="flex justify-start">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C89B5B]/35 bg-[#C89B5B]/8 text-[#C89B5B] text-xs font-black select-none animate-pulse">
              ✨ استشارة مجانية متوفرة الآن
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-marcellus text-4xl sm:text-5xl md:text-6xl font-black text-[#2B1A12] leading-[1.15]">
            لوران ستوديو
            <br />
            <span className="metallic-gold font-extrabold text-3xl sm:text-4xl md:text-5xl">الفخامة والإبداع الرقمي</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-[#7A4A2A] font-bold text-sm sm:text-base leading-relaxed">
            حلول احترافية متكاملة لنمو وتطوير علامتك التجارية. نجمع بين سلاسة الأداء وفخامة الهوية لنصنع لك حضوراً رقمياً استثنائياً.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={() => handleNavClick('wizard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-sm font-black border border-[#C89B5B]/20 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 clickable-hover"
            >
              ابدأ مشروعك
              <ArrowLeft size={16} className="text-[#C89B5B]" />
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 border border-[#7A4A2A]/15 bg-[#FFFBF7]/80 rounded-xl text-sm font-black text-[#2B1A12] shadow-soft hover:bg-[#F4ECE3] transition-all clickable-hover"
            >
              <Play size={14} className="fill-[#C89B5B] text-[#C89B5B]" />
              شاهد أعمالنا
            </button>
          </div>

          {/* Bullet achievements summary (Counters animate on scroll) */}
          <div className="grid grid-cols-3 gap-4 border-t border-[#7A4A2A]/10 pt-6 mt-4 text-[#2B1A12] font-black text-xs sm:text-sm">
            <div className="flex flex-col">
              <span className="text-sm sm:text-base text-[#C89B5B]">
                <AnimatedCounter value={300} suffix="+" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#7A4A2A] mt-0.5">مشروع مكتمل</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base text-[#C89B5B]">
                <AnimatedCounter value={98} suffix="%" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#7A4A2A] mt-0.5">رضا العملاء</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base text-[#C89B5B]">
                <AnimatedCounter value={5} suffix="+" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#7A4A2A] mt-0.5">سنوات خبرة</span>
            </div>
          </div>

        </motion.div>

        {/* Left Area (rotating Three.js logo with parallax reaction) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="flex justify-center items-center order-1 md:order-2 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
          }}
        >
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            
            {/* Outer Rotating Dotted Border */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-[#C89B5B]/10 animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* 3D Canvas element wrapped with ErrorBoundary */}
            <ErrorBoundary fallback={<ThreeDLogoFallback />}>
              <ThreeDLogo />
            </ErrorBoundary>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
