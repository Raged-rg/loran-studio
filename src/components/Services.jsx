import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Check, Star, ShieldAlert } from 'lucide-react';
import ThreeDIcons from './ThreeDIcons';

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'design', label: 'تصميم' },
    { id: 'code', label: 'برمجة' },
    { id: 'marketing', label: 'تسويق' },
    { id: 'management', label: 'إدارة' },
    { id: 'content', label: 'محتوى' }
  ];

  const servicesList = [
    {
      id: 'store',
      type: 'bag',
      category: 'code',
      title: 'تصميم المتاجر الإلكترونية',
      desc: 'تصميم متاجر إلكترونية احترافية بتجربة مستخدم سلسة وربط كامل بوسائل الدفع.',
      details: {
        accent: 'منصات تسوق مرنة ومحسنة تزيد من معدل التحويل والمبيعات.',
        includes: ['ربط بوابات الدفع الإلكتروني الكبرى', 'ربط شركات الشحن والتوصيل المتكاملة', 'تصميم لوحة إدارة منتجات مبسطة وسهلة', 'تحسين سرعة التصفح والتجاوب الفائق', 'توافق كامل مع السلات والمتاجر العالمية'],
        why: 'تصاميم جذابة تجبر الزائر على التفاعل والشراء من أول وهلة.'
      }
    },
    {
      id: 'web',
      type: 'monitor',
      category: 'design',
      title: 'تصميم المواقع',
      desc: 'تصميم مواقع حديثة وسريعة تعكس هوية علامتك التجارية باحترافية.',
      details: {
        accent: 'واجهات مستخدم (UI/UX) احترافية تحكي قصة نجاح علامتك بدقة.',
        includes: ['تصميم واجهات مستخدم حصرية بالكامل', 'تطوير بلغات برمجية حديثة وسريعة', 'تهيئة محركات البحث (SEO) بالكامل', 'لوحات تحكم ذكية باللغة العربية', 'دعم كامل للهواتف والأجهزة اللوحية'],
        why: 'كل تفصيل مصمم بدقة ليمنح العميل شعوراً بالفخامة والاحترافية.'
      }
    },
    {
      id: 'social',
      type: 'social',
      category: 'management',
      title: 'إدارة السوشيال ميديا',
      desc: 'إدارة حساباتك وصناعة محتوى احترافي يزيد التفاعل وينمّي جمهورك.',
      details: {
        accent: 'نبض مستمر يعكس فخامة واحترافية علامتك أمام المتابعين.',
        includes: ['كتابة وتصميم المنشورات الدورية', 'جدولة النشر وإدارة الردود والتفاعل', 'تصميم الهوية البصرية للشبكات الاجتماعية', 'صناعة محتوى الفيديو القصير (Reels)', 'تقارير أداء دورية وتحليل للتفاعل'],
        why: 'نصنع محتوى لا يُمرر مرور الكرام، بل يعلق بالذهن ويثير النقاش.'
      }
    },
    {
      id: 'ads',
      type: 'megaphone',
      category: 'marketing',
      title: 'الحملات الإعلانية',
      desc: 'إطلاق حملات إعلانية مدروسة تحقق نتائج فعليّة وعائد استثماري قوي.',
      details: {
        accent: 'استهداف دقيق للمهتمين يعود بنتائج ملموسة وأرقام مبيعات حقيقية.',
        includes: ['إعلانات سناب شات وإنستغرام وتيك توك', 'إعلانات محركات البحث (Google Ads)', 'إعادة استهداف الزوار وبناء الشرائح', 'تحسين التكلفة والحصول على أقل سعر نقرة', 'تقارير أسبوعية تفصيلية بالعوائد'],
        why: 'لا نهدر ميزانيتك، بل نوجهها بدقة متناهية لمن يبحث عن خدمتك فعلياً.'
      }
    },
    {
      id: 'content',
      type: 'content',
      category: 'content',
      title: 'كتابة المحتوى',
      desc: 'صياغة محتوى احترافي يعكس هوية علامتك التجارية بأسلوب إبداعي.',
      details: {
        accent: 'الكلمة هي السلاح الأقوى لإقناع العميل، ونحن نجيد صياغتها بنبرة فاخرة.',
        includes: ['كتابة نصوص المواقع والصفحات الكبرى', 'كتابة نصوص الإعلانات والفيديوهات التسويقية', 'صياغة المحتوى التعليمي والمقالات الطويلة', 'تهيئة الكلمات المفتاحية لـ SEO', 'صياغة الملفات التعريفية للشركات (Profiles)'],
        why: 'محتوى أصيل وجذاب يخاطب عاطفة وعقل قارئك ويوجهه للشراء.'
      }
    },
    {
      id: 'branding',
      type: 'branding',
      category: 'design',
      title: 'تصميم الهوية البصرية',
      desc: 'بناء هوية متكاملة تعبر عن فخامة مشروعك وتميزه.',
      details: {
        accent: 'نبني براند يعيش لأجيال، يبدأ من الشعار ويمتد لكل تعاملاتك.',
        includes: ['تصميم الشعار الأساسي والرموز الملحقة', 'تحديد الخطوط ونظام الألوان المتكامل', 'تصميم كروت الأعمال والمطبوعات الإدارية', 'دليل استخدام الهوية البصرية (Brand Book)', 'تصاميم التغليف والعلب الفاخرة للبراند'],
        why: 'نعطي مشروعك هيبة البصمة الفاخرة التي تميزه عن آلاف المنافسين.'
      }
    },
    {
      id: 'script',
      type: 'script',
      category: 'code',
      title: 'إنشاء سكربتات خاصة',
      desc: 'برمجة حلول مخصصة وأنظمة ذكية تناسب احتياجات مشروعك.',
      details: {
        accent: 'حلول برمجية مخصصة تجعل أداء شركتك أسرع وبدون أخطاء بشرية.',
        includes: ['برمجة سكربتات الربط وسحب البيانات API', 'أتمتة إدخال الطلبات والردود التلقائية', 'بناء روبوتات الفحص الذكي للبيانات', 'تطوير برامج إدارة المهام الداخلية المخصصة', 'صيانة وأمان وحماية البيانات الكلية'],
        why: 'كود نظيف، سريع، وآمن صُمم خصيصاً ليلبي احتياجاتك الفريدة.'
      }
    },
    {
      id: 'sales',
      type: 'sales',
      category: 'management',
      title: 'إدارة المبيعات بالكامل',
      desc: 'إدارة عمليات البيع والمتابعة وخدمة العملاء باحترافية كاملة.',
      details: {
        accent: 'فريق كامل ومتدرب يغلق صفقاتك ويرد على عملائك باحترافية.',
        includes: ['تأكيد الطلبات عبر الهاتف والواتساب', 'إدارة خدمة العملاء والرد على الاستفسارات', 'تطبيق تقنيات البيع الإضافي (Upselling)', 'تقليل نسب إلغاء الطلبات ومرتجعات الشحن', 'تحليل فني دوري لسلوك المشتري والعقبات'],
        why: 'نحول الاستفسارات المهملة إلى مبيعات وأموال حقيقية في حسابك التجاري.'
      }
    }
  ];

  const filteredServices = activeFilter === 'all'
    ? servicesList
    : servicesList.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Soft Luxury Decorative Particles */}
      <div className="absolute top-[10%] right-[5%] w-[180px] h-[180px] rounded-full bg-[#C89B5B]/6 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[220px] h-[220px] rounded-full bg-[#7A4A2A]/4 blur-[90px] pointer-events-none" />

      {/* TOP Header Area */}
      <div className="text-center flex flex-col items-center gap-3 mb-14 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold text-xs tracking-wider"
        >
          خدماتنا
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-marcellus text-3xl md:text-5xl font-extrabold text-[#2B1A12] leading-tight"
        >
          حلول رقمية متكاملة لنمو علامتك التجارية
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-[#7A4A2A] font-bold text-sm sm:text-base leading-relaxed"
        >
          نقدّم خدمات احترافية تجمع بين التصميم، التقنية، والتسويق لبناء حضور رقمي استثنائي.
        </motion.p>
      </div>

      {/* Luxury Category Filter Buttons */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-12 select-none relative z-10">
        <div className="flex gap-2 p-1.5 rounded-2xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/8 shadow-inner backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#2B1A12] hover:text-[#C89B5B]'
                }`}
              >
                {/* Active Capsule Backdrop Glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBackdrop"
                    className="absolute inset-0 bg-[#7A4A2A] rounded-xl border border-[#C89B5B]/20 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Experience Grid (Desktop: 4-cols, Tablet: 2-cols, Mobile: 1-col) */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, idx) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
              whileHover={{ 
                y: -8, 
                rotateX: 2, 
                rotateY: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-[#7A4A2A]/12 hover:border-[#C89B5B] shadow-soft hover:shadow-premium transition-all group relative overflow-hidden cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedService(service)}
            >
              
              {/* Subtle glass reflection glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Decorative Corner Light Spot */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#C89B5B]/5 group-hover:bg-[#C89B5B]/12 blur-xl transition-all" />

              <div style={{ transform: 'translateZ(20px)' }}>
                {/* 3D Realistic Procedural Icon */}
                <div className="mb-4 flex justify-center items-center h-[130px] w-full select-none">
                  <ThreeDIcons type={service.type} />
                </div>
                
                {/* Title */}
                <h3 className="font-marcellus text-lg font-bold text-[#2B1A12] mb-3 text-center group-hover:text-[#C89B5B] transition-colors">
                  {service.title}
                </h3>
                
                {/* Elegant Desc */}
                <p className="text-xs text-[#7A4A2A] text-center font-bold leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Action magnetic trigger button */}
              <div style={{ transform: 'translateZ(10px)' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#FFFBF7]/60 group-hover:bg-[#7A4A2A] text-[#2B1A12] group-hover:text-white rounded-xl text-xs font-black border border-[#7A4A2A]/10 group-hover:border-[#7A4A2A] shadow-soft transition-all duration-300"
                >
                  <span>اعرف المزيد</span>
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Premium Service Dialog Overlay */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#2B1A12]/40 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-[#F7EFE6] rounded-2xl p-6 md:p-8 border border-[#7A4A2A]/20 shadow-premium max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col text-right"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 left-4 p-2 rounded-xl border border-[#7A4A2A]/10 text-[#2B1A12] hover:bg-[#F4ECE3] transition-all"
              >
                <X size={16} />
              </button>

              {/* Service header */}
              <div className="flex flex-col md:flex-row items-center gap-4 border-b border-[#7A4A2A]/10 pb-6 mb-6">
                <div className="w-[120px] h-[120px] flex items-center justify-center select-none">
                  <ThreeDIcons type={selectedService.type} />
                </div>
                <div className="text-center md:text-right flex flex-col gap-1">
                  <span className="text-[10px] text-[#C89B5B] font-extrabold tracking-wider uppercase">لوران ستوديو • تفاصيل المنتج الرقمي</span>
                  <h3 className="font-marcellus text-2xl font-bold text-[#2B1A12]">{selectedService.title}</h3>
                  <p className="text-xs text-[#7A4A2A]/80 font-bold leading-relaxed">{selectedService.details.accent}</p>
                </div>
              </div>

              {/* Includes checklist */}
              <div className="flex flex-col gap-3 mb-6">
                <h4 className="font-marcellus text-sm font-bold text-[#2B1A12] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B5B]" />
                  ماذا تشمل هذه الخدمة الاستثنائية؟
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedService.details.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFBF7]/60 border border-[#7A4A2A]/6 text-xs text-[#2B1A12] font-bold">
                      <span className="w-4 h-4 rounded-full bg-[#C89B5B]/15 flex items-center justify-center text-[#C89B5B] text-[9px] font-bold">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Loran block */}
              <div className="p-4 bg-[#7A4A2A]/6 rounded-xl border border-[#7A4A2A]/12 text-xs font-bold text-[#2B1A12] leading-relaxed mb-8">
                <span className="text-[#C89B5B] block font-black mb-1">لماذا لوران ستوديو في هذه الخدمة؟</span>
                {selectedService.details.why}
              </div>

              {/* CTA button */}
              <div className="flex items-center gap-3">
                <a
                  href="#wizard"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-xs font-black shadow-md border border-[#C89B5B]/20 text-center"
                >
                  احجز استشارة مجانية للمشروع
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="hidden sm:inline-block py-3 px-6 border border-[#7A4A2A]/15 bg-[#FFFBF7]/80 rounded-xl text-xs font-black text-[#2B1A12] shadow-soft hover:bg-[#F4ECE3] transition-all"
                >
                  الرجوع للخدمات
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
