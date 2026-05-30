import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Award, Settings, Sparkles, HelpCircle, ArrowLeft } from 'lucide-react';

// Custom Hook to manage Magnetic Button Effect
function useMagnetic() {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull (strength factor 0.3)
    const pullX = (clientX - centerX) * 0.3;
    const pullY = (clientY - centerY) * 0.3;
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
}

// Sub-Component for individual pricing card with 3D Tilt, magnetic button, and dynamic animations
function PricingCard({ 
  id, 
  name, 
  price, 
  period = '/ للمشروع ككل',
  bestFor, 
  features, 
  ctaText, 
  isHighlighted, 
  badge, 
  index, 
  onCtaClick 
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const magneticCta = useMagnetic();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation: Max 8 degrees for clean minimal look
    const rX = (mouseY / height) * 12;
    const rY = -(mouseX / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        type: 'spring', 
        stiffness: 70, 
        damping: 18, 
        delay: index * 0.12 
      }}
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        isHighlighted
          ? 'bg-gradient-to-b from-[#030B1A]/95 to-[#020817]/95 text-white border-2 border-blue-500 shadow-premium scale-100 lg:scale-[1.04] z-10 btn-glow'
          : 'glass-card text-white border border-blue-500/10 hover:border-blue-500/40 shadow-soft'
      }`}
    >
      {/* Soft Blue Ambient Glow inside Business card */}
      {isHighlighted && (
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />
      )}

      {/* Dynamic Rotating Blue Border overlay */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 rounded-[22px] border-2 border-transparent bg-[linear-gradient(120deg,#3B82F6,#60A5FA,#1D4ED8,#3B82F6)] bg-[length:300%_300%] -m-[2px] pointer-events-none"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Premium Badge */}
      {isHighlighted && badge && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500 text-white rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-md z-20">
          <Award size={10} className="text-white" />
          {badge}
        </div>
      )}

      <div style={{ transform: 'translateZ(30px)' }} className="transition-transform duration-200">
        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isHighlighted ? 'text-[#60A5FA]' : 'text-[#94A3B8]'}`}>
          {name}
        </span>
        
        <div className="flex items-baseline gap-1 mt-3 mb-2">
          <span className={`font-marcellus text-4xl sm:text-5xl font-black text-white`}>
            {price}
          </span>
          <span className={`text-[10px] font-bold ${isHighlighted ? 'text-white/50' : 'text-[#94A3B8]/60'}`}>
            {period}
          </span>
        </div>
        
        <p className={`text-[11px] font-bold leading-relaxed mb-6 border-b pb-4 ${isHighlighted ? 'text-white/70 border-white/10' : 'text-[#94A3B8]/80 border-blue-500/10'}`}>
          {bestFor}
        </p>
        
        <ul className="flex flex-col gap-3.5 mb-8">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs font-bold leading-relaxed text-right">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isHighlighted ? 'bg-blue-500/20 text-[#60A5FA]' : 'bg-blue-500/10 text-[#60A5FA]'
              }`}>
                <Check size={10} strokeWidth={3} />
              </div>
              <span className={isHighlighted ? 'text-white/90' : 'text-white/90'}>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Magnetic CTA Button */}
      <motion.button
        ref={magneticCta.ref}
        onMouseMove={magneticCta.handleMouseMove}
        onMouseLeave={magneticCta.handleMouseLeave}
        onClick={onCtaClick}
        animate={{ x: magneticCta.position.x, y: magneticCta.position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ transform: 'translateZ(20px)' }}
        className={`w-full py-4 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 shadow-md flex items-center justify-center gap-1.5 ${
          isHighlighted
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-500/20 font-semibold'
            : 'bg-[#030B1A]/60 hover:bg-blue-950/40 text-[#60A5FA] border border-blue-500/10 hover:border-blue-500'
        }`}
      >
        <span>{ctaText}</span>
        <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
      </motion.button>
    </motion.div>
  );
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('web'); // 'web' | 'store' | 'marketing'
  const customQuoteBtn = useMagnetic();

  const pricingTabs = [
    { id: 'web', label: 'موقع' },
    { id: 'store', label: 'متجر' },
    { id: 'marketing', label: 'تسويق' }
  ];

  // Complete data-driven structure containing precise features requested by the USER
  const getPackageData = (pkgId) => {
    if (activeTab === 'web') {
      if (pkgId === 'starter') {
        return {
          price: '$499',
          period: '/ للمشروع ككل',
          bestFor: 'للمشاريع الصغيرة والبدايات الذكية للشركات والمستقلين',
          features: [
            'صفحة تعريفية أو موقع بسيط ورائد',
            'تصميم متجاوب للموبايل بنسبة 100%',
            'ألوان وهوية بصرية أساسية فاخرة',
            'ربط واتساب فوري وتكاملي',
            'تحسين سرعة أساسي فائق للأداء',
            'دعم وصيانة فنية لمدة 7 أيام'
          ]
        };
      }
      if (pkgId === 'business') {
        return {
          price: '$1299',
          period: '/ للمشروع ككل',
          bestFor: 'للشركات والمؤسسات التي تريد حضوراً احترافياً فخماً',
          features: [
            'موقع متكامل متعدد الصفحات وتفاعلي',
            'تصميم UI/UX احترافي عالي الفخامة',
            'لوحة تحكم حسب الحاجة لإدارة المحتوى',
            'ربط واتساب ووسائل التواصل بالكامل',
            'تحسين SEO أساسي لظهور محركات البحث',
            'تحسين سرعة وأداء Apple-smooth',
            'دعم وصيانة فنية لمدة 30 يوم',
            'إعداد حملات إعلانية أولية للموقع'
          ]
        };
      }
      return {
        price: '$2499',
        period: '/ للمشروع ككل',
        bestFor: 'للمشاريع الجادة التي تحتاج نظاماً متكاملاً وحلولاً خاصة',
        features: [
          'موقع ويب فاخر متعدد الصفحات والمهام',
          'تحريكات تفاعلية 3D animations حسب الحاجة',
          'برمجة سكربتات خاصة وأتمتة متطورة',
          'لوحة تحكم متقدمة لإدارة الموقع بالكامل',
          'نظام طلبات أو مبيعات متكامل وحجوزات',
          'تحسين SEO وأداء متقدم ومدروس بدقة',
          'خطة تسويق أولية استراتيجية من الخبراء',
          'دعم متواصل لمدة 60 يوم متكاملة',
          'متابعة وتطوير مستمر لرفع كفاءة الأمان'
        ]
      };
    }

    if (activeTab === 'marketing') {
      if (pkgId === 'starter') {
        return {
          price: '$299',
          period: '/ شهرياً',
          bestFor: 'لإدارة الحسابات الفردية والبدايات الذكية في السوق',
          features: [
            'إدارة حساب سوشيال ميديا واحد بنجاح',
            'تصميم متجاوب لـ 8 منشورات شهرياً',
            'ألوان وهوية إعلانية أساسية فخمة',
            'ربط واتساب لسهولة التواصل السريع',
            'تحسين سرعة أساسي وتفاعل مع الجمهور',
            'دعم لمدة 7 أيام لمتابعة الإحصائيات'
          ]
        };
      }
      if (pkgId === 'business') {
        return {
          price: '$899',
          period: '/ شهرياً',
          bestFor: 'للشركات والمتاجر التي تريد حضوراً احترافياً ونمواً متسارعاً',
          features: [
            'إدارة حسابين على منصات التواصل الاجتماعي',
            'تصميم UI/UX احترافي لـ 16 منشوراً',
            'لوحة تحكم حسب الحاجة لمتابعة الأداء',
            'ربط واتساب ووسائل التواصل بالكامل',
            'تحسين SEO أساسي للحسابات والمحتوى',
            'تحسين سرعة وأداء حملات الإعلان',
            'دعم لمدة 30 يوم متواصل وتقارير تحليلية',
            'إعداد حملات إعلانية أولية ممولة متكاملة'
          ]
        };
      }
      return {
        price: '$1899',
        period: '/ شهرياً',
        bestFor: 'للمشاريع الكبرى الجادة التي تحتاج نظام تسويق متكامل بالكامل',
        features: [
          'إدارة شاملة لكافة شبكات التواصل الاجتماعي',
          'تحريكات وفيديوهات 3D animations حسب الحاجة',
          'برمجة سكربتات خاصة لأتمتة الردود التلقائية',
          'لوحة تحكم متقدمة بالكامل لتحليلات الأداء',
          'نظام طلبات ومبيعات وتتبع تكلفة الاكتساب',
          'تحسين SEO وأداء متقدم لحضورك الرقمي الشامل',
          'خطة تسويق أولية واستراتيجية نمو متكاملة',
          'دعم لمدة 60 يوم متكامل واستشارات استراتيجية',
          'متابعة وتطوير مستمر لكافة النتائج الإعلانية'
        ]
      };
    }

    // Default: 'store' (المتاجر الإلكترونية)
    if (pkgId === 'starter') {
      return {
        price: '$599',
        period: '/ للمشروع ككل',
        bestFor: 'للمشاريع الصغيرة والبدايات الذكية في التجارة الإلكترونية',
        features: [
          'متجر إلكتروني بسيط (صفحة تعريفية أو متجر بسيط)',
          'تصميم متجاوب للموبايل بنسبة 100%',
          'ألوان وهوية أساسية فاخرة وجذابة',
          'ربط واتساب لطلب السلة مباشرة',
          'تحسين سرعة أساسي لتصفح سريع وسلس',
          'دعم فني وصيانة لمدة 7 أيام'
        ]
      };
    }
    if (pkgId === 'business') {
      return {
        price: '$1499',
        period: '/ للمشروع ككل',
        bestFor: 'للمتاجر والشركات التي تريد حضوراً احترافياً متكاملاً',
        features: [
          'متجر إلكتروني متكامل متعدد الأقسام',
          'تصميم UI/UX احترافي مخصص لزيادة التحويل',
          'لوحة تحكم حسب الحاجة لتتبع الطلبات والمخزون',
          'ربط واتساب ووسائل التواصل وبوابات الدفع',
          'تحسين SEO أساسي للمنتجات والأقسام',
          'تحسين سرعة وأداء فائق Apple-smooth',
          'دعم وصيانة فنية مجانية لمدة 30 يوم',
          'إعداد حملات إعلانية أولية لزيادة المبيعات'
        ]
      };
    }
    return {
      price: '$2999',
      period: '/ للمشروع ككل',
      bestFor: 'للمشاريع الجادة التي تحتاج نظاماً كاملاً وحلول تجارة متطورة',
      features: [
        'متجر أو موقع فاخر متعدد الصفحات والأنظمة',
        'تحريكات تفاعلية 3D animations حسب الحاجة للمنتجات',
        'برمجة سكربتات خاصة وأتمتة الشحن والفوترة',
        'لوحة تحكم متقدمة لإدارة العمليات والمخازن',
        'نظام طلبات أو مبيعات متكامل وبوابات دفع ذكية',
        'تحسين SEO وأداء متقدم للمتاجر الكبرى والضخمة',
        'خطة تسويق أولية استراتيجية للتوسع الشامل',
        'دعم وصيانة فنية استثنائية لمدة 60 يوم',
        'متابعة وتطوير مستمر لرفع كفاءة الأمان والأداء'
      ]
    };
  };

  const handleNavClick = (id) => {
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

  const starterData = getPackageData('starter');
  const businessData = getPackageData('business');
  const premiumData = getPackageData('premium');

  return (
    <section id="pricing" className="py-28 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-[10%] left-[2%] w-[250px] h-[250px] rounded-full bg-[#2563EB]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[2%] w-[250px] h-[250px] rounded-full bg-[#1D4ED8]/4 blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="text-center flex flex-col items-center gap-3 mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-extrabold text-xs tracking-wider"
        >
          الباقات
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-marcellus text-3xl md:text-5xl font-extrabold text-white leading-tight"
        >
          اختر الباقة المناسبة لنمو مشروعك
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-[#94A3B8] font-bold text-sm sm:text-base leading-relaxed"
        >
          باقات مرنة مصممة لتناسب مختلف مراحل المشاريع، من البداية وحتى التوسع الكامل.
        </motion.p>
      </div>

      {/* PRICE TOGGLE TABS */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-16 select-none relative z-10">
        <div className="flex gap-2 p-1.5 rounded-2xl bg-[#030B1A]/60 border border-blue-500/10 shadow-inner backdrop-blur-md">
          {pricingTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#94A3B8] hover:text-[#60A5FA]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePriceTabBackdrop"
                    className="absolute inset-0 bg-blue-600 rounded-xl border border-blue-500/20 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 PREMIUM PRICING CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 relative z-10 items-stretch">
        
        {/* Card 1: Starter Package */}
        <PricingCard
          id="starter"
          name="باقة البداية • STARTER"
          price={starterData.price}
          period={starterData.period}
          bestFor={starterData.bestFor}
          features={starterData.features}
          ctaText="ابدأ الآن"
          isHighlighted={false}
          index={0}
          onCtaClick={() => handleNavClick('wizard')}
        />

        {/* Card 2: Business Package (Highlighted) */}
        <PricingCard
          id="business"
          name="باقة الأعمال • BUSINESS"
          price={businessData.price}
          period={businessData.period}
          bestFor={businessData.bestFor}
          features={businessData.features}
          ctaText="اختر الباقة"
          isHighlighted={true}
          badge="الأكثر طلباً"
          index={1}
          onCtaClick={() => handleNavClick('wizard')}
        />

        {/* Card 3: Premium Package */}
        <PricingCard
          id="premium"
          name="باقة النخبة • PREMIUM"
          price={premiumData.price}
          period={premiumData.period}
          bestFor={premiumData.bestFor}
          features={premiumData.features}
          ctaText="احجز استشارة"
          isHighlighted={false}
          index={2}
          onCtaClick={() => handleNavClick('wizard')}
        />

      </div>

      {/* LUXURY CUSTOM QUOTE BOX */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-blue-500/25 flex flex-col lg:flex-row items-center justify-between gap-8 mb-20 relative z-10 overflow-hidden"
      >
        {/* Decorative Ambient Light overlay inside wood box */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/8 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-3 text-right max-w-xl relative z-10">
          <span className="text-[10px] font-extrabold text-[#60A5FA] tracking-wide uppercase flex items-center gap-1.5 justify-start">
            <Settings size={12} className="animate-spin-slow" />
            بناء الأنظمة المخصصة والحلول البرمجية الفاخرة
          </span>
          <h3 className="font-marcellus text-2xl md:text-3xl font-extrabold text-white">تحتاج مشروعاً مخصصاً؟</h3>
          <p className="text-white/70 text-xs sm:text-sm font-medium leading-relaxed">
            إذا كانت فكرتك تحتاج نظاماً خاصاً أو سكربتاً متقدماً، يمكننا بناء حل مخصص بالكامل حسب احتياجك وربطه بـ APIs وتلبية طموحات أعمالك الكبرى بنجاح مطلق.
          </p>
        </div>

        <motion.button
          ref={customQuoteBtn.ref}
          onMouseMove={customQuoteBtn.handleMouseMove}
          onMouseLeave={customQuoteBtn.handleMouseLeave}
          onClick={() => handleNavClick('wizard')}
          animate={{ x: customQuoteBtn.position.x, y: customQuoteBtn.position.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl text-xs text-center shadow-lg border border-blue-500/20 cursor-pointer select-none active:scale-95 transition-all flex items-center justify-center gap-2 relative z-10 shrink-0"
        >
          <span>اطلب عرض سعر مخصص</span>
          <Sparkles size={12} className="text-white" />
        </motion.button>
      </motion.div>

      {/* COMPARISON DETAILS */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/12 shadow-premium overflow-x-auto no-scrollbar relative z-10 bg-[#030B1A]/80 backdrop-blur-md"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <HelpCircle size={16} className="text-[#60A5FA]" />
          <h3 className="font-marcellus text-lg md:text-xl font-bold text-white">جدول المقارنة الفنية والخدمات</h3>
        </div>

        <table className="w-full text-right text-xs font-bold text-white min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-blue-500/15 pb-4 text-[#60A5FA]">
              <th className="pb-4 text-right font-black text-xs">تفاصيل المعايير والخدمة</th>
              <th className="pb-4 text-center font-black text-xs">باقة البداية</th>
              <th className="pb-4 text-center font-black text-xs text-[#60A5FA]">باقة الأعمال (الأكثر طلباً)</th>
              <th className="pb-4 text-center font-black text-xs">باقة النخبة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">طبيعة الهيكل والموقع</td>
              <td className="py-4 text-center text-emerald-400/80">صفحة تعريفية / متجر بسيط</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">موقع متكامل أو متجر إلكتروني</td>
              <td className="py-4 text-center text-emerald-400">متعدد الصفحات والأنظمة بالكامل</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">تصميم الواجهة الفنية والـ UI/UX</td>
              <td className="py-4 text-center text-[#94A3B8]/60">تصميم وتنسيق أساسي فاخر</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">تصميم UI/UX حصري ومبتكر</td>
              <td className="py-4 text-center text-emerald-400">واجهات إبداعية مع 3D Animations</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">تحسين سرعة التصفح والأداء</td>
              <td className="py-4 text-center text-emerald-400/80">تحسين سرعة وتصفح أساسي</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">تحسين سرعة Apple-smooth فائق</td>
              <td className="py-4 text-center text-emerald-400">تحسين سرعة وتوافقي أقصى 100%</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">لوحة التحكم وإدارة البيانات</td>
              <td className="py-4 text-center text-[#94A3B8]/40">غير متوفرة / تواصل بالواتساب</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">لوحة تحكم سهلة وسلسة</td>
              <td className="py-4 text-center text-emerald-400">لوحة تحكم مخصصة ذكية متقدمة</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">البرمجة والربط والسكربتات (APIs)</td>
              <td className="py-4 text-center text-[#94A3B8]/40">—</td>
              <td className="py-4 text-center text-[#94A3B8]/40">—</td>
              <td className="py-4 text-center text-emerald-400">برمجة سكربتات خاصة وأتمتة كاملة</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">إعداد الحملات الإعلانية</td>
              <td className="py-4 text-center text-[#94A3B8]/40">—</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">✓ إطلاق حملات إعلانية أولية</td>
              <td className="py-4 text-center text-emerald-400">✓ خطة تسويق أولية وحملات متطورة</td>
            </tr>
            <tr className="border-b border-blue-500/8 hover:bg-blue-950/20 transition-colors duration-200">
              <td className="py-4 font-extrabold text-white/95">مدة الدعم والصيانة الفنية</td>
              <td className="py-4 text-center text-emerald-400/80">دعم وصيانة لمدة 7 أيام</td>
              <td className="py-4 text-center text-[#60A5FA] font-extrabold">دعم وصيانة لمدة 30 يوم</td>
              <td className="py-4 text-center text-emerald-400">دعم متكامل وصيانة لمدة 60 يوم</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

    </section>
  );
}
