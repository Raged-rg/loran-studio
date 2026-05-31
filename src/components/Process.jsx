import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Layout, Code2, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: Compass,
      title: '1. فهم المشروع والاستشارة',
      desc: 'نجلس معك ونستمع بعناية لرؤيتك وتطلعاتك وأهدافك. نقوم بتحليل منافسيك وسلوك جمهورك المستهدف لصياغة استراتيجية تقنية وبصرية واضحة ومثمرة لمشروعك.'
    },
    {
      icon: Palette,
      title: '2. بناء وتصميم الهوية',
      desc: 'نبدأ برسم الشعار المبدئي وصقل ملامحه الفاخرة. نختار لوحة ألوان دافئة ونوعية خطوط مخصصة، ثم ندمجها في دليل استخدام متكامل يعبر بوضوح عن علامتك.'
    },
    {
      icon: Layout,
      title: '3. هندسة وتصميم الواجهة (UI/UX)',
      desc: 'نرسم رحلة تصفح بديهية وسلسة تضمن انتقال الزائر بسلاسة نحو إتمام الطلب أو الشراء. نصمم واجهات بلورية زجاجية بنسخة مطابقة تماماً للمظهر النهائي.'
    },
    {
      icon: Code2,
      title: '4. البرمجة والتطوير الاحترافي',
      desc: 'نترجم التصاميم الفنية إلى أكواد برمجية فائقة السرعة ومتوافقة مع هواتف الآيفون ومتصفح Safari. نقوم بدمج السكربتات المخصصة، أتمتة الطلبات، وبوابات الدفع.'
    },
    {
      icon: Rocket,
      title: '5. الإطلاق والمتابعة المستمرة',
      desc: 'بعد سلسلة فحوصات واختبارات مكثفة للأمان والسرعة، نقوم بإطلاق موقعك رقمياً. نرافقك بتقارير أداء دورية، ونقدم دعماً فنياً وتعديلات لضمان التحسين والنمو.'
    }
  ];

  return (
    <section id="process" className="py-20 max-w-5xl mx-auto px-6 relative">
      
      {/* Background glowing line */}
      <div className="absolute top-1/4 bottom-1/4 right-6 md:right-1/2 w-[2px] bg-gradient-to-b from-[#2563EB]/10 via-[#3B82F6]/40 to-[#2563EB]/10 pointer-events-none z-0" />

      {/* Headings */}
      <div className="text-center flex flex-col items-center gap-3 mb-16">
        <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-extrabold text-xs tracking-wider">
          خارطة الطريق للإبداع
        </span>
        <h2 className="font-marcellus text-3xl md:text-4xl font-extrabold text-white">خطوات عملنا الإستراتيجية</h2>
        <p className="max-w-xl text-[#94A3B8] font-bold text-sm leading-relaxed">
          نتبع منهجية علمية وفنية صارمة في تنفيذ مشروعك، لنضمن لك تجربة إطلاق فاخرة خالية تماماً من العقبات أو الأخطاء.
        </p>
      </div>

      {/* Vertical Timeline Steps */}
      <div className="flex flex-col gap-10 relative">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={`flex flex-col md:flex-row items-center gap-6 relative w-full ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              
              {/* Step indicator node on central line */}
              <div className="absolute right-1.5 md:right-1/2 md:translate-x-1/2 top-4 w-9 h-9 rounded-full bg-gradient-to-tr from-blue-950 to-slate-950 border-2 border-blue-500 flex items-center justify-center text-white shadow-lg z-10 select-none font-sans text-xs font-bold text-[#60A5FA]">
                <span>0{idx + 1}</span>
              </div>

              {/* Grid block placeholders */}
              <div className="w-full md:w-1/2" />

              {/* Step content card */}
              <div className="w-full md:w-1/2 pr-12 md:pr-0 md:px-8">
                <div className="glass-card rounded-2xl p-6 border border-blue-500/10 hover:border-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 group relative">
                  
                  {/* Glowing micro dot */}
                  <span className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-blue-500/30 group-hover:bg-[#3B82F6]" />

                  <h3 className="font-marcellus text-lg font-bold text-white mb-3 group-hover:text-[#60A5FA] transition-colors text-right">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] font-bold leading-relaxed text-right">
                    {step.desc}
                  </p>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
