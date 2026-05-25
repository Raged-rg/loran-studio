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
      <div className="absolute top-1/4 bottom-1/4 right-[38px] md:right-1/2 w-[2px] bg-gradient-to-b from-[#C89B5B]/10 via-[#7A4A2A]/40 to-[#C89B5B]/10 pointer-events-none hidden md:block" />

      {/* Headings */}
      <div className="text-center flex flex-col items-center gap-3 mb-16">
        <span className="px-4 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold text-xs tracking-wider">
          خارطة الطريق للإبداع
        </span>
        <h2 className="font-marcellus text-3xl md:text-4xl font-extrabold text-[#2B1A12]">خطوات عملنا الإستراتيجية</h2>
        <p className="max-w-xl text-[#7A4A2A] font-bold text-sm leading-relaxed">
          نتبع منهجية علمية وفنية صارمة في تنفيذ مشروعك، لنضمن لك تجربة إطلاق فاخرة خالية تماماً من العقبات أو الأخطاء.
        </p>
      </div>

      {/* Vertical Timeline Steps */}
      <div className="flex flex-col gap-10 relative">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
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
              <div className="absolute right-[16px] md:right-1/2 md:translate-x-1/2 top-4 w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border-2 border-[#C89B5B] flex items-center justify-center text-white shadow-lg z-10 select-none">
                <StepIcon size={14} className="text-[#C89B5B]" />
              </div>

              {/* Grid block placeholders */}
              <div className="w-full md:w-1/2" />

              {/* Step content card */}
              <div className="w-full md:w-1/2 pr-12 md:pr-0 md:px-8">
                <div className="glass-card rounded-2xl p-6 border border-[#7A4A2A]/10 hover:border-[#C89B5B] hover:shadow-soft transition-all duration-300 group relative">
                  
                  {/* Glowing micro dot */}
                  <span className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-[#C89B5B]/30 group-hover:bg-[#C89B5B]" />

                  <h3 className="font-marcellus text-lg font-bold text-[#2B1A12] mb-3 group-hover:text-[#C89B5B] transition-colors text-right">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#7A4A2A]/90 font-bold leading-relaxed text-right">
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
