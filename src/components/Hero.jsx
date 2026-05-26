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

export default function Hero({ setActiveSection }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Luxury mouse parallax capture
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
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

      {/* Main Grid: Left Workspace Visual, Right Typography */}
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
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C89B5B]/35 bg-[#C89B5B]/8 text-[#C89B5B] text-xs font-black select-none">
              ✨ استشارة مجانية متوفرة الآن
            </span>
          </div>

          {/* Main Title inspired by reference image */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2B1A12] leading-[1.2]">
            نصمم علامات تجارية
            <br />
            <span className="bg-gradient-to-tr from-[#EADCCB] via-[#C89B5B] to-[#B87333] bg-clip-text text-transparent font-extrabold filter drop-shadow-sm">تترك أثراً</span>
            {" "}وتحدث فرقاً
          </h1>

          {/* Subtitle inspired by reference image */}
          <p className="max-w-lg text-[#7A4A2A]/90 font-bold text-sm sm:text-base leading-relaxed">
            في لوران ستوديو نحول الأفكار إلى تصاميم احترافية تعبر عن هوية علامتك التجارية بأفضل صورة.
          </p>

          {/* Luxury Rounded Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={() => handleNavClick('wizard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-full text-sm font-black border border-[#C89B5B]/20 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 clickable-hover"
            >
              احجز استشارة مجانية
              <Calendar size={16} className="text-[#C89B5B]" />
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 border border-[#7A4A2A]/15 bg-[#FFFBF7]/80 rounded-full text-sm font-black text-[#2B1A12] shadow-soft hover:bg-[#F4ECE3] transition-all clickable-hover"
            >
              <Play size={14} className="fill-[#C89B5B] text-[#C89B5B]" />
              شاهد أعمالنا
            </button>
          </div>

          {/* Refined Horizontal Stats Card matching reference image */}
          <div className="grid grid-cols-5 gap-1 md:gap-2 bg-[#FFFBF7]/85 border border-[#C89B5B]/20 rounded-3xl p-3 md:p-4 mt-6 shadow-soft text-center text-[#2B1A12]">
            <div className="flex flex-col items-center gap-1 border-l border-[#7A4A2A]/10 last:border-0 pl-0.5">
              <Users size={18} strokeWidth={1.5} className="text-[#C89B5B]" />
              <span className="text-xs sm:text-sm font-black text-[#7A4A2A] mt-0.5">
                <AnimatedCounter value={150} suffix="+" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#7A4A2A]/80 font-bold leading-tight">عميل سعيد</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-l border-[#7A4A2A]/10 last:border-0 pl-0.5">
              <FolderCheck size={18} strokeWidth={1.5} className="text-[#C89B5B]" />
              <span className="text-xs sm:text-sm font-black text-[#7A4A2A] mt-0.5">
                <AnimatedCounter value={300} suffix="+" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#7A4A2A]/80 font-bold leading-tight">مشروع مكتمل</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-l border-[#7A4A2A]/10 last:border-0 pl-0.5">
              <Clock size={18} strokeWidth={1.5} className="text-[#C89B5B]" />
              <span className="text-xs sm:text-sm font-black text-[#7A4A2A] mt-0.5">
                <AnimatedCounter value={5} suffix="+" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#7A4A2A]/80 font-bold leading-tight">سنوات خبرة</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-l border-[#7A4A2A]/10 last:border-0 pl-0.5">
              <Heart size={18} strokeWidth={1.5} className="text-[#C89B5B]" />
              <span className="text-xs sm:text-sm font-black text-[#7A4A2A] mt-0.5">
                <AnimatedCounter value={98} suffix="%" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#7A4A2A]/80 font-bold leading-tight">رضا العملاء</span>
            </div>

            <div className="flex flex-col items-center gap-1 pl-0.5">
              <Award size={18} strokeWidth={1.5} className="text-[#C89B5B]" />
              <span className="text-xs sm:text-sm font-black text-[#7A4A2A] mt-0.5">
                <AnimatedCounter value={20} suffix="+" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-[#7A4A2A]/80 font-bold leading-tight">جوائز محلية</span>
            </div>
          </div>

        </motion.div>

        {/* Left Area (gorgeous floating interactive creative agency workspace visual) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="flex justify-center items-center order-1 md:order-2 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
          }}
        >
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            
            {/* Outer Rotating Dotted Borders for architectural depth */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/25 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-[#C89B5B]/8 animate-[spin_45s_linear_infinite_reverse]" />
            <div className="absolute -inset-4 rounded-full border border-[#7A4A2A]/5 animate-[spin_80s_linear_infinite]" />
            
            {/* Soft Ambient Gold Glow behind the visual */}
            <div className="absolute inset-16 rounded-full bg-[#C89B5B]/8 blur-3xl pointer-events-none" />

            {/* Premium Creative Workspace Mockup Card with Glassmorphic Framing */}
            <div className="relative w-[85%] h-[85%] rounded-[48px] border border-[#C89B5B]/20 bg-[#FFFBF7]/45 backdrop-blur-md p-3.5 shadow-premium animate-float overflow-hidden flex items-center justify-center group">
              {/* Internal border highlight */}
              <div className="absolute inset-0 rounded-[48px] border border-white/40 pointer-events-none z-10" />
              
              {/* Luxury Mockup Image with smooth zoom interaction on hover */}
              <div className="w-full h-full rounded-[36px] overflow-hidden shadow-inner relative">
                <img 
                  src={heroWorkspace} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-1000 ease-out select-none" 
                  alt="LORAN STUDIO Workspace" 
                />
                {/* Elegant overlay gradient to blend with the background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF7]/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Minimal Luxury Monogram Badge floating over the mockup */}
              <div className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full border border-[#C89B5B]/20 bg-[#FFFBF7]/90 backdrop-blur-md shadow-premium p-1.5 flex items-center justify-center animate-[float_4s_ease-in-out_infinite_reverse] hover:scale-105 transition-all">
                <img src={logoIcon} className="w-full h-full object-cover rounded-full" alt="L Monogram" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
