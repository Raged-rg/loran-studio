import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, MessageSquare, ArrowLeft } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "تجربة رائعة مع فريق سديم. فهموا احتياجاتنا وقدموا لنا حلاً يفوق توقعاتنا تماماً في تصميم وتطوير منصتنا الرقمية.",
      author: "أحمد القحطاني",
      role: "CEO - Techno SaaS",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      id: 2,
      text: "احترافية عالية والتزام تام بالمواعيد ودقة متناهية في التفاصيل. أنصح بالتعامل مع استوديو سديم بشدة لكل براند يبحث عن الفخامة والوقار.",
      author: "سارة محمد",
      role: "مديرة التسويق",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      
      {/* Soft Cyber Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[250px] h-[250px] rounded-full bg-[#2563EB]/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] rounded-full bg-[#1D4ED8]/3 blur-[100px] pointer-events-none" />

      {/* Header section */}
      <div className="text-center flex flex-col items-center gap-3 mb-16 relative z-10">
        <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-extrabold text-xs tracking-wider">
          آراء عملائنا
        </span>
        <h2 className="font-marcellus text-3xl md:text-5xl font-extrabold text-white leading-tight">
          ثقتكم هي دافعنا للاستمرار
        </h2>
        <p className="max-w-xl text-[#94A3B8] font-bold text-sm leading-relaxed">
          نفتخر بشراكات نجاح طويلة الأمد مع نخبة العلامات التجارية والشركات حول العالم.
        </p>
      </div>

      {/* Testimonial slider view container */}
      <div className="max-w-2xl mx-auto relative z-10 px-2">
        <div className="relative min-h-[220px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full glass-card rounded-[28px] p-8 md:p-10 border border-blue-500/10 hover:border-blue-500/20 shadow-premium flex flex-col gap-6 text-right relative overflow-hidden"
            >
              {/* Quote background blur decoration */}
              <div className="absolute -top-6 -left-6 text-blue-500/5 select-none pointer-events-none">
                <Quote size={120} strokeWidth={1} />
              </div>

              {/* Minimalist quote mark */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-950 to-slate-950 border border-blue-500/35 flex items-center justify-center text-[#60A5FA] shadow-soft">
                <Quote size={16} className="text-[#60A5FA]" />
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-white/90 font-bold leading-relaxed pr-2">
                "{reviews[activeIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pr-2 pt-2 border-t border-blue-500/5 mt-2">
                <img
                  loading="lazy"
                  src={reviews[activeIndex].avatar}
                  className="w-11 h-11 rounded-full border-2 border-blue-500/30 object-cover shadow-soft flex-shrink-0"
                  alt={reviews[activeIndex].author}
                />
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-xs sm:text-sm font-extrabold text-white">
                    {reviews[activeIndex].author}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#94A3B8] font-semibold">
                    {reviews[activeIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel control dots & arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          
          {/* Active Navigation dots */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'bg-[#2563EB] w-7 shadow-[0_0_8px_rgba(37,99,235,0.6)]' 
                      : 'bg-[#94A3B8]/30 hover:bg-[#60A5FA]/60'
                  }`}
                  aria-label={`انتقل للتقييم رقم ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>
      </div>

      {/* Carousel CTA link */}
      <div className="flex justify-center mt-12 relative z-10">
        <a
          href={`https://wa.me/9647842272224?text=${encodeURIComponent("مرحباً سديم، أود الاطلاع على كافة آراء عملائكم وقصص النجاح المميزة مع الوكالة.")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-blue-500/20 bg-[#030B1A] text-xs font-semibold text-white shadow-soft hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:bg-[#071224] transition-all duration-500"
        >
          <span>عرض جميع الآراء النخبوية</span>
          <ArrowLeft size={12} className="text-white" />
        </a>
      </div>

    </section>
  );
}
