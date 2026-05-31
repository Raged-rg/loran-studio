import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

export default function CTA({ setActiveSection, onOpenWizard }) {
  const whatsappUrl = `https://wa.me/9647842272224?text=${encodeURIComponent('مرحباً، أرغب بالاستفسار عن خدمات SADEEM وتنفيذ مشروع احترافي.')}`;

  return (
    <section id="cta" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-indigo-600/4 blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full rounded-[40px] border border-blue-500/20 bg-[#030B1A]/80 backdrop-blur-md p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_0_50px_rgba(59,130,246,0.1)]"
      >
        <div className="absolute inset-0 rounded-[40px] border border-white/10 pointer-events-none" />

        {/* Right side visually (Arabic RTL): Text blocks */}
        <div className="flex flex-col gap-5 text-center lg:text-right lg:max-w-2xl">
          <span className="mx-auto lg:mx-0 w-fit px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-medium tracking-widest uppercase">
            ✦ لنبدأ قصة نجاح استثنائية معاً
          </span>

          <h2 className="font-marcellus text-3xl md:text-5xl font-semibold text-white leading-tight">
            هل أنت مستعد لصياغة مستقبلك الرقمي الفاخر؟
          </h2>

          <p className="text-[#94A3B8] font-medium text-xs sm:text-sm leading-relaxed">
            ندعوك لشراكة إبداعية ترتقي بحضورك الرقمي إلى آفاق غير مسبوقة. سواء كنت تنشد متجراً إلكترونياً متكاملاً أو منصة تعريفية تعكس تفرد علامتك، فنحن نصمم التفاصيل بدقة متناهية لتنسجم مع تطلعات النخبة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              تواصل معنا الآن عبر واتساب
              <MessageSquare size={14} className="text-white" />
            </a>

            <button
              onClick={() => {
                if (onOpenWizard) {
                  onOpenWizard();
                } else {
                  const btn = document.querySelector('button[aria-label="ابدأ مشروعك"]');
                  if (btn) btn.click();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-blue-500/30 bg-blue-950/40 text-xs font-semibold text-blue-300 rounded-full hover:bg-blue-900/40 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-soft"
            >
              ابدأ رحلتك الرقمية الآن
              <ArrowLeft size={14} className="text-blue-300" />
            </button>
          </div>
        </div>

        {/* Left side visually: Glowing Brand Logo centerpiece */}
        <div className="relative w-44 h-24 md:w-56 md:h-32 flex items-center justify-center select-none">
          {/* Subtle blue backglow */}
          <div className="absolute inset-0 bg-[#2563EB]/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="navbar-logo-wrapper w-full h-full justify-center">
            <img 
              src={logo} 
              className="w-auto h-auto object-contain max-w-full max-h-full animate-float" 
              alt="SADEEM" 
            />
          </div>
        </div>

      </motion.div>
    </section>
  );
}

