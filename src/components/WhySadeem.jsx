import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, Zap, HeartHandshake, ShieldCheck, Cpu, Layers, Trophy, Store, Sparkles, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png';

// Count-up helper component for stats
function Counter({ value, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;

    const totalSteps = 50;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-black text-white">
      +{count}{suffix}
    </span>
  );
}

export default function WhySadeem() {
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: '-100px' });

  const whyCards = [
    {
      icon: Award,
      title: 'تصميم فاخر',
      desc: 'نصمم واجهات تترك انطباعاً قوياً من أول زيارة تعبر عن رفعة ووقار البراند.'
    },
    {
      icon: Cpu,
      title: 'حلول مخصصة',
      desc: 'كل مشروع نبنيه حسب احتياج البراند وليس بقالب جاهز أو مكرر.'
    },
    {
      icon: Zap,
      title: 'سرعة وأداء',
      desc: 'نركز على سرعة التحميل وسلاسة التصفح على جميع الأجهزة ومتصفح سفاري.'
    },
    {
      icon: ShieldCheck,
      title: 'تسويق ونتائج',
      desc: 'لا نصمم فقط، بل نساعدك على تحويل الزوار إلى عملاء فعليين وزيادة مبيعاتك.'
    },
    {
      icon: HeartHandshake,
      title: 'دعم مستمر',
      desc: 'نرافقك بعد الإطلاق لضمان استقرار المشروع وأمن خوادمه وتطويره.'
    },
    {
      icon: Layers,
      title: 'تجربة مستخدم احترافية',
      desc: 'نبني تجربة سهلة، واضحة، ومريحة للزبون لشراء أو طلب الخدمة بنقرة واحدة.'
    }
  ];

  return (
    <section id="why-sadeem" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Background glow sparks */}
      <div className="absolute top-[30%] left-[-5%] w-[220px] h-[220px] rounded-full bg-[#2563EB]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-5%] w-[200px] h-[200px] rounded-full bg-[#1D4ED8]/4 blur-[80px] pointer-events-none" />

      {/* PART 1: ABOUT SECTION (من نحن) */}
      <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10">
        
        {/* Left Side: Luxury 3D Studio Mockup Backdrop (CSS-3D) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isAboutInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center items-center select-none order-2 lg:order-1"
        >
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center animate-float">
            
            {/* Outer dotted blue ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/25 animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-blue-600/10 animate-[spin_25s_linear_infinite_reverse]" />
 
              {/* Layered CSS 3D Studio Scene */}
              <div className="relative w-52 h-52 bg-gradient-to-tr from-[#071224] to-[#020817] border-2 border-blue-500 rounded-2xl shadow-premium flex items-center justify-center transform rotate-6">
                
                {/* Floating inner premium board */}
                <div className="absolute -top-6 -left-6 w-32 h-20 bg-[#030B1A]/95 backdrop-blur-md border border-blue-500/20 rounded-xl shadow-soft p-3 flex flex-col justify-between transform -rotate-12">
                  <span className="w-8 h-2 rounded bg-blue-500/40" />
                  <span className="w-16 h-2 rounded bg-white/10" />
                  <div className="flex justify-between items-center mt-1">
                    <span className="w-6 h-2 rounded bg-white/10" />
                    <span className="text-[10px] text-[#60A5FA]">★</span>
                  </div>
                </div>
 
                {/* Floating blue bar chart */}
                <div className="absolute -bottom-6 -right-6 w-28 h-24 bg-gradient-to-tr from-[#030B1A] to-[#020817] border border-blue-500/30 rounded-xl shadow-premium p-3 flex flex-col justify-between transform rotate-12">
                  <div className="flex gap-1.5 justify-center items-end flex-grow">
                    <div className="w-2.5 h-8 bg-[#2563EB] rounded-t-sm" />
                    <div className="w-2.5 h-14 bg-[#3B82F6] rounded-t-sm" />
                    <div className="w-2.5 h-10 bg-white/10 rounded-t-sm" />
                  </div>
                  <span className="w-10 h-1.5 rounded bg-white/10 mx-auto mt-2" />
                </div>
 
                {/* Central Premium Emblem */}
                <div className="w-40 h-20 flex items-center justify-center p-2 bg-transparent select-none pointer-events-none">
                  <div className="navbar-logo-wrapper w-full h-full justify-center">
                    <img 
                      src={logo} 
                      className="w-auto h-auto object-contain max-w-full max-h-full animate-[pulse_3s_infinite]" 
                      alt="SADEEM | سديم" 
                    />
                  </div>
                </div>
 
              </div>

          </div>
        </motion.div>

        {/* Right Side: Copywriting info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col gap-5 text-right order-1 lg:order-2"
        >
          <div className="flex justify-start">
            <span className="px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-black text-xs">
              من نحن
            </span>
          </div>
 
          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            سديم… حيث تتحول الأفكار إلى تجارب رقمية فاخرة
          </h2>
 
          <p className="text-[#94A3B8] font-bold text-sm sm:text-base leading-relaxed">
            نحن وكالة رقمية متخصصة في بناء المتاجر الإلكترونية، المواقع، السكربتات الخاصة، إدارة البيجات، وصناعة الحملات الإعلانية بأسلوب يجمع بين الجمال، التقنية، والنتائج الملموسة.
          </p>
 
          <p className="text-[#94A3B8]/80 text-xs font-bold leading-relaxed pr-4 border-r-2 border-blue-500/30">
            فلسفتنا تكمن في تقديم حلول رقمية استثنائية مصممة خصيصاً لتلائم متطلبات علامتك التجارية، مبتعدين بالكامل عن التصاميم المكررة والقوالب الجاهزة، لتتفوق ببراندك في فضاء المنافسة.
          </p>
        </motion.div>

      </div>

      {/* PART 2: STATS SECTION (الإحصائيات المضيئة) */}
      <div className="mb-24 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl glass-card border border-blue-500/10 shadow-soft">
          
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#030B1A]/60 border border-blue-500/5 text-center">
            <Trophy size={28} className="text-[#60A5FA] mb-2" />
            <Counter value="50" />
            <span className="text-[10px] text-[#94A3B8] font-extrabold mt-1">مشروع رقمي</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#030B1A]/60 border border-blue-500/5 text-center">
            <Store size={28} className="text-[#60A5FA] mb-2" />
            <Counter value="30" />
            <span className="text-[10px] text-[#94A3B8] font-extrabold mt-1">متجر إلكتروني</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#030B1A]/60 border border-blue-500/5 text-center">
            <Sparkles size={28} className="text-[#60A5FA] mb-2" />
            <Counter value="120" />
            <span className="text-[10px] text-[#94A3B8] font-extrabold mt-1">حملة إعلانية</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#030B1A]/60 border border-blue-500/5 text-center">
            <CheckCircle size={28} className="text-[#60A5FA] mb-2" />
            <Counter value="95" suffix="%" />
            <span className="text-[10px] text-[#94A3B8] font-extrabold mt-1">رضا العملاء</span>
          </div>
 
        </div>
      </div>

      {/* PART 3: WHY SADEEM SECTION (لماذا تختار سديم) */}
      <div className="relative z-10">
        
        {/* Headings */}
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-extrabold text-xs tracking-wider">
            بماذا ننفرد؟
          </span>
          <h2 className="font-marcellus text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">لماذا تختار سديم؟</h2>
          <p className="max-w-xl text-[#94A3B8] font-bold text-sm leading-relaxed">
            نحن نهتم بأدق التفاصيل البرمجية والفنية لنصنع لعلامتك التجارية الأصول الرقمية الأغلى والأكثر ثباتاً.
          </p>
        </div>
 
        {/* 6 Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="relative p-8 glass-card rounded-2xl border border-blue-500/10 hover:border-[#3B82F6] hover:shadow-soft group overflow-hidden transition-all duration-300"
              >
                {/* Connecting delicate lines */}
                <span className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500 group-hover:w-full transition-all duration-500" />
                <span className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-blue-500 to-transparent group-hover:w-full transition-all duration-500" />
 
                {/* Circular glowing sphere */}
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#2563EB]/4 group-hover:scale-125 blur-xl transition-all" />
 
                <div className="flex flex-col gap-4 text-right">
                  
                  {/* Icon container */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-950 to-slate-950 border border-blue-500/30 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                    <Icon size={20} className="text-[#60A5FA]" />
                  </div>
 
                  {/* Title */}
                  <h3 className="font-marcellus text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                    {feat.title}
                  </h3>
 
                  {/* Desc */}
                  <p className="text-xs text-[#94A3B8] font-bold leading-relaxed">
                    {feat.desc}
                  </p>
 
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
