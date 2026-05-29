import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeftRight, MoveLeft } from 'lucide-react';
import portfolioLuxora from '../assets/portfolio-luxora.jpg';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="before-after" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[30%] left-[-5%] w-[250px] h-[250px] rounded-full bg-[#2563EB]/4 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[200px] h-[200px] rounded-full bg-[#1D4ED8]/3 blur-[80px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side (Desktop): Interactive Draggable Before/After Slider Container */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div 
            ref={containerRef}
            className="relative w-full max-w-2xl aspect-[16/10] rounded-[28px] overflow-hidden border border-blue-500/20 bg-[#030B1A]/40 shadow-premium select-none touch-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover select-none pointer-events-none" 
                alt="After Redesign" 
              />
              <span className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#030B1A]/85 text-white text-[10px] font-medium border border-blue-500/30 backdrop-blur-md">
                بعد التطوير
              </span>
            </div>
 
            {/* Before Image (Clipped Overlay) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover select-none pointer-events-none filter grayscale contrast-[1.1]" 
                alt="Before Redesign" 
              />
              <span className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[#020817]/90 text-white text-[10px] font-medium border border-blue-500/20 backdrop-blur-md">
                قبل التطوير
              </span>
            </div>
 
            {/* Draggable Divider Handle Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#2563EB] cursor-ew-resize select-none pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Central Glowing Icon Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#030B1A] text-white border-2 border-[#2563EB] flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-transform duration-300 pointer-events-auto cursor-ew-resize">
                <ArrowLeftRight size={14} className="text-[#60A5FA]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Desktop): Text */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-right lg:text-right">
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] text-[10px] font-medium tracking-widest uppercase">
              <Sparkles size={10} />
              مقارنة الجودة والأداء
            </span>
          </div>
 
          <h2 className="font-marcellus text-3xl md:text-5xl font-semibold text-white leading-tight">
            قبل / بعد
          </h2>
 
          <p className="text-[#94A3B8] font-normal text-xs sm:text-sm leading-relaxed">
            تحسينات فنية ملموسة تصنع فارقاً في سرعة الأداء والمظهر العام للمنصة. نحن لا نعدل المظاهر فحسب، بل نحول المواقع التقليدية البطيئة إلى واجهات سريعة تستجيب لمتطلبات عملائك وتزيد من قوة علامتك التجارية.
          </p>
 
          <div className="flex flex-col gap-3.5 pr-2 mt-2">
            <div className="flex items-center gap-3 justify-end text-xs font-medium text-white">
              <span>سرعة استجابة فائقة وتحميل خلال أقل من ثانية</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            </div>
            <div className="flex items-center gap-3 justify-end text-xs font-medium text-white">
              <span>واجهات مستوحاة من فلسفة آبل وتقليلات أسوب الجمالية</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            </div>
            <div className="flex items-center gap-3 justify-end text-xs font-medium text-white">
              <span>تحسين بنسبة 180% في التفاعل ومعدل التحويل المالي</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            </div>
          </div>
 
          <div className="mt-4 flex justify-end">
            <a 
              href="https://wa.me/9647842272224?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D9%88%D8%AA%D8%AD%D8%B3%D9%8A%D9%86%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9%20%D9%84%D8%AF%D9%89%20%D9%84%D9%88%D8%B1%D8%A7%D9%86%20%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-[#030B1A] text-xs font-medium text-white hover:bg-blue-950 hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all duration-500 shadow-soft"
            >
              <span>عرض المزيد من دراسات الحالة</span>
              <MoveLeft size={14} className="text-white" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
