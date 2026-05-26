import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft, Send } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';

export default function CTA({ setActiveSection }) {
  const whatsappUrl = `https://wa.me/9647842272224?text=${encodeURIComponent('مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي.')}`;

  return (
    <section id="cta" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97E]/6 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#3A2B24]/4 blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full rounded-[40px] border border-[#C8A97E]/20 bg-[#FFFDF9]/60 backdrop-blur-md p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-premium"
      >
        <div className="absolute inset-0 rounded-[40px] border border-white/40 pointer-events-none" />

        {/* Right side visually (Arabic RTL): Text blocks */}
        <div className="flex flex-col gap-5 text-center lg:text-right lg:max-w-2xl">
          <span className="mx-auto lg:mx-0 w-fit px-4 py-1.5 rounded-full border border-[#C8A97E]/30 bg-[#C8A97E]/8 text-[#C8A97E] text-[10px] font-black tracking-widest uppercase">
            ✦ لنبدأ قصة نجاح جديدة معاً
          </span>

          <h2 className="font-marcellus text-3xl md:text-5xl font-black text-[#3A2B24] leading-tight">
            هل أنت جاهز لتحويل رؤيتك الرقمية إلى حقيقة؟
          </h2>

          <p className="text-[#3A2B24]/85 font-bold text-xs sm:text-sm leading-relaxed">
            سواء كنت ترغب في تصميم متجر إلكتروني فاخر، موقع تعريفي يمثل علامتك النخبوية، أو استشارة مجانية لمشروعك، نحن هنا لنصنع الفارق البرمجي والبصري الاستثنائي.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8A97E] text-[#3A2B24] rounded-full text-xs font-black shadow-md hover:bg-[#bfa075] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300"
            >
              تواصل معنا الآن عبر واتساب
              <MessageSquare size={14} className="text-[#3A2B24]" />
            </a>

            <button
              onClick={() => {
                const btn = document.querySelector('button[aria-label="ابدأ مشروعك"]');
                if (btn) btn.click();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C8A97E]/30 bg-[#FFFDF9]/85 text-xs font-black text-[#3A2B24] rounded-full hover:bg-[#E8DDD0] transition-all duration-300 shadow-soft"
            >
              ابدأ حجز مشروعك الاستثماري
              <ArrowLeft size={14} className="text-[#3A2B24]" />
            </button>
          </div>
        </div>

        {/* Left side visually: Glowing Monogram Logo Seal */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center select-none">
          <div className="absolute inset-0 rounded-full border border-dashed border-[#C8A97E]/20 animate-[spin_50s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-[#C8A97E]/8 animate-[spin_40s_linear_infinite_reverse]" />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#3A2B24]/40 font-black tracking-widest text-[8px] fill-current">
              <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
              <text>
                <textPath href="#circlePath" spacing="auto" startOffset="0%">
                  ✦ LORAN STUDIO ✦ LUXURY AGENCY ✦ CREATIVE DEVELOPMENT
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#C8A97E]/30 bg-[#FFFDF9] shadow-premium p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <img src={logoIcon} className="w-full h-full object-cover rounded-full" alt="LORAN STUDIO SEAL" />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
