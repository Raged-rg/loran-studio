import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, Zap, HeartHandshake, ShieldCheck, Cpu, Layers, Trophy, Store, Sparkles, CheckCircle } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';

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
    <span ref={ref} className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-black text-[#2B1A12]">
      +{count}{suffix}
    </span>
  );
}

export default function WhyLoran() {
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
    <section id="why-loran" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Background glow sparks */}
      <div className="absolute top-[30%] left-[-5%] w-[220px] h-[220px] rounded-full bg-[#C89B5B]/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-5%] w-[200px] h-[200px] rounded-full bg-[#7A4A2A]/4 blur-[80px] pointer-events-none" />

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
            
            {/* Outer dotted gold ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/25 animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-[#7A4A2A]/10 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Layered CSS 3D Studio Scene */}
            <div className="relative w-52 h-52 bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border-2 border-[#C89B5B] rounded-2xl shadow-premium flex items-center justify-center transform rotate-6">
              
              {/* Floating inner premium board */}
              <div className="absolute -top-6 -left-6 w-32 h-20 bg-[#F7EFE6]/90 backdrop-blur-md border border-[#7A4A2A]/20 rounded-xl shadow-soft p-3 flex flex-col justify-between transform -rotate-12">
                <span className="w-8 h-2 rounded bg-[#C89B5B]/40" />
                <span className="w-16 h-2 rounded bg-black/10" />
                <div className="flex justify-between items-center mt-1">
                  <span className="w-6 h-2 rounded bg-black/10" />
                  <span className="text-[10px] text-[#C89B5B]">★</span>
                </div>
              </div>

              {/* Floating copper bar chart */}
              <div className="absolute -bottom-6 -right-6 w-28 h-24 bg-gradient-to-tr from-[#3D251A] to-[#2B1A12] border border-[#C89B5B]/30 rounded-xl shadow-premium p-3 flex flex-col justify-between transform rotate-12">
                <div className="flex gap-1.5 justify-center items-end flex-grow">
                  <div className="w-2.5 h-8 bg-[#C89B5B] rounded-t-sm" />
                  <div className="w-2.5 h-14 bg-[#B87333] rounded-t-sm" />
                  <div className="w-2.5 h-10 bg-white/20 rounded-t-sm" />
                </div>
                <span className="w-10 h-1.5 rounded bg-white/10 mx-auto mt-2" />
              </div>

              {/* Central Premium Emblem */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#C89B5B]/40 flex items-center justify-center overflow-hidden bg-[#2B1A12] p-1.5">
                <div className="w-full h-full rounded-full overflow-hidden border border-[#C89B5B]/30 flex items-center justify-center">
                  <img src={logoIcon} className="w-full h-full object-cover animate-[pulse_2.5s_infinite]" alt="LORAN Logo Icon" />
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
            <span className="px-3.5 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-black text-xs">
              من نحن
            </span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2B1A12] leading-tight">
            لوران ستوديو… حيث تتحول الأفكار إلى تجارب رقمية فاخرة
          </h2>

          <p className="text-[#7A4A2A] font-bold text-sm sm:text-base leading-relaxed">
            نحن وكالة رقمية متخصصة في بناء المتاجر الإلكترونية، المواقع، السكربتات الخاصة، إدارة البيجات، وصناعة الحملات الإعلانية بأسلوب يجمع بين الجمال، التقنية، والنتائج الملموسة.
          </p>

          <p className="text-[#2B1A12]/80 text-xs font-bold leading-relaxed pr-4 border-r-2 border-[#C89B5B]/30">
            فلسفتنا تكمن في تقديم حلول رقمية استثنائية مصممة خصيصاً لتلائم متطلبات علامتك التجارية، مبتعدين بالكامل عن التصاميم المكررة والقوالب الجاهزة، لتتفوق ببراندك في فضاء المنافسة.
          </p>
        </motion.div>

      </div>

      {/* PART 2: STATS SECTION (الإحصائيات المضيئة) */}
      <div className="mb-24 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl glass-card border border-[#7A4A2A]/10 shadow-soft">
          
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/6 text-center">
            <Trophy size={28} className="text-[#C89B5B] mb-2" />
            <Counter value="50" />
            <span className="text-[10px] text-[#7A4A2A] font-extrabold mt-1">مشروع رقمي</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/6 text-center">
            <Store size={28} className="text-[#C89B5B] mb-2" />
            <Counter value="30" />
            <span className="text-[10px] text-[#7A4A2A] font-extrabold mt-1">متجر إلكتروني</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/6 text-center">
            <Sparkles size={28} className="text-[#C89B5B] mb-2" />
            <Counter value="120" />
            <span className="text-[10px] text-[#7A4A2A] font-extrabold mt-1">حملة إعلانية</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/6 text-center">
            <CheckCircle size={28} className="text-[#C89B5B] mb-2" />
            <Counter value="95" suffix="%" />
            <span className="text-[10px] text-[#7A4A2A] font-extrabold mt-1">رضا العملاء</span>
          </div>

        </div>
      </div>

      {/* PART 3: WHY LORAN SECTION (لماذا تختار لوران) */}
      <div className="relative z-10">
        
        {/* Headings */}
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="px-4 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold text-xs tracking-wider">
            بماذا ننفرد؟
          </span>
          <h2 className="font-marcellus text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2B1A12]">لماذا تختار لوران؟</h2>
          <p className="max-w-xl text-[#7A4A2A] font-bold text-sm leading-relaxed">
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
                className="relative p-8 glass-card rounded-2xl border border-[#7A4A2A]/10 hover:border-[#C89B5B] hover:shadow-soft group overflow-hidden transition-all duration-300"
              >
                {/* Connecting delicate lines */}
                <span className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C89B5B] group-hover:w-full transition-all duration-500" />
                <span className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-[#C89B5B] to-transparent group-hover:w-full transition-all duration-500" />

                {/* Circular glowing sphere */}
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#C89B5B]/4 group-hover:scale-125 blur-xl transition-all" />

                <div className="flex flex-col gap-4 text-right">
                  
                  {/* Icon container */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border border-[#C89B5B]/30 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                    <Icon size={20} className="text-[#C89B5B]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-marcellus text-base sm:text-lg font-bold text-[#2B1A12] group-hover:text-[#C89B5B] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs text-[#7A4A2A]/90 font-bold leading-relaxed">
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
