import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, Check, Globe, ShoppingBag, Edit3, Smartphone, TrendingUp
} from 'lucide-react';

function ServiceIcon2D({ type }) {
  let Icon = Globe;
  if (type === 'store') Icon = ShoppingBag;
  else if (type === 'branding') Icon = Edit3;
  else if (type === 'uiux') Icon = Smartphone;
  else if (type === 'marketing') Icon = TrendingUp;
 
  return (
    <div className="w-14 h-14 rounded-2xl border border-blue-500/15 bg-[#030B1A]/80 flex items-center justify-center text-[#E5E7EB] shadow-soft group-hover:scale-[1.03] group-hover:border-[#3B82F6]/60 transition-all duration-300 relative overflow-hidden mx-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <Icon size={24} strokeWidth={1.2} className="text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors duration-300" />
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const servicesList = [
    {
      id: 'web',
      type: 'web',
      title: 'تصميم المواقع',
      desc: 'مواقع احترافية متجاوبة تعكس هوية علامتك وتمنحك حضوراً رقمياً استثنائياً.',
      details: {
        accent: 'مواقع ويب مخصصة وسريعة تواكب أرقى معايير واجهات المستخدم لتمثيل ريادة مؤسستك بأبهى صورة.',
        includes: [
          'تصميم واجهات مستخدم مخصصة (UI/UX) بنقشات بصرية حصرية',
          'تطوير متكامل بأحدث لغات البرمجة السريعة والآمنة',
          'لوحة تحكم إدارية مرنة تُمكنك من تعديل المحتوى بسهولة',
          'توافق كامل 100% مع الهواتف الذكية والأجهزة اللوحية',
          'تأمين كامل للخوادم وشهادات حماية SSL مع نسخ احتياطي دوري'
        ],
        why: 'كل موقع نبنيه هو تحفة برمجية وبصرية فريدة، نصقل تفاصيلها لتشهد بااحترافية أعمالك.'
      }
    },
    {
      id: 'store',
      type: 'store',
      title: 'المتاجر الإلكترونية',
      desc: 'متاجر سلسة وآمنة لزيادة مبيعاتك وتوفير تجربة تسوق ممتعة لعملائك.',
      details: {
        accent: 'منصات تجارة متكاملة مصممة خصيصاً لتعظيم عوائد الاستثمار وزيادة معدل التحويل المباشر.',
        includes: [
          'دمج بوابات الدفع الإلكتروني الكبرى (Apple Pay, مدى, Visa)',
          'ربط شركات الشحن واللوجستيات آلياً بالكامل',
          'تصميم لوحة تحكم ذكية ومبسطة باللغة العربية لإدارة المخزون',
          'تحسين سرعة تصفح فائقة الأداء متوافقة مع متصفح سفاري',
          'دعم ميزة الطلب السريع بنقرة واحدة لتقليل السلات المهملة'
        ],
        why: 'نصمم واجهات تسوق آسرة تثير الرغبة في الاقتناء وتجعل تجربة الشراء متعة لا تُقاوم.'
      }
    },
    {
      id: 'branding',
      type: 'branding',
      title: 'الهوية البصرية',
      desc: 'تصميم هوية متكاملة تبني علامة قوية وتصنع شعاراً يعيش مع الزمن ويعبر عن وقار براندك.',
      details: {
        accent: 'بناء أصول بصرية راسخة تعيش لأجيال وتعكس وقار وفخامة علامتك التجارية.',
        includes: [
          'ابتكار الشعار الأساسي والرموز والخطوط الملحقة المبتكرة',
          'تنسيق واختيار لوحة الألوان الفخمة التي تثير المشاعر المستهدفة',
          'تصميم كافة المطبوعات الإدارية وكروت الأعمال الفاخرة',
          'بناء كتاب قواعد العلامة التجارية وتطبيقات التغليف (Brand Book)',
          'تصميم الهوية البصرية للعلب والعبوات للمنتجات الحصرية'
        ],
        why: 'نمنح مشروعك البصمة الفريدة التي تجعله علامة فارقة وقابلة للتعرف الفوري بين آلاف المنافسين.'
      }
    },
    {
      id: 'uiux',
      type: 'uiux',
      title: 'تصميم UI / UX',
      desc: 'تجارب مستخدم استثنائية وواجهات عصرية تضمن سلاسة الانتقال وسهولة الاستخدام.',
      details: {
        accent: 'تصميم وتخطيط رحلة المستخدم لضمان تجربة تصفح بديهية تعكس هوية علامتك التجارية.',
        includes: [
          'رسم وتخطيط هياكل رحلة العميل السلكية (Wireframing)',
          'تصميم واجهات وتطبيقات متجاوبة عالية الدقة (High-Fidelity)',
          'تطوير النماذج التفاعلية الحركية لاختبار تجربة المستخدم',
          'صياغة نظام مكونات التصميم الموحد (Design System)',
          'تحليل وفحص سلوك المستخدم لتحسين نسب التحويل المباشرة'
        ],
        why: 'ندرس حركة عين المستخدم وسلوكه الرقمي لنقدم واجهات فائقة الجاذبية تزيد من ولاء عملائك.'
      }
    },
    {
      id: 'marketing',
      type: 'marketing',
      title: 'التسويق الرقمي',
      desc: 'استراتيجيات تسويقية تزيد من انتشارك وتحقق مبيعات متسارعة بعائد استثماري فائق.',
      details: {
        accent: 'توجيه ميزانيتك الإعلانية بدقة متناهية للجمهور الباحث عن خدمتك لضمان المبيعات الفورية.',
        includes: [
          'إعلانات منصات سناب شات، إنستغرام، تيك توك، وغوغل',
          'بناء وتثبيت بكسل التتبع وقياس معدلات التحويل (Pixel Setup)',
          'إعداد حملات إعادة الاستهداف الذكية للزوار والشرائح المهتمة',
          'صياغة نصوص إعلانية محفزة للنقر والشراء المباشر',
          'تحليل يومي وتحسين مستمر للحصول على أقل تكلفة لكل طلب'
        ],
        why: 'لا نبيعك وعوداً بل أرقاماً؛ نحول ميزانيتك التسويقية إلى عوائد نمو حقيقية ملموسة في حسابك.'
      }
    }
  ];

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Soft Luxury Decorative Particles */}
      <div className="absolute top-[10%] right-[5%] w-[180px] h-[180px] rounded-full bg-[#2563EB]/5 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[220px] h-[220px] rounded-full bg-[#1D4ED8]/4 blur-[90px] pointer-events-none" />
 
      {/* TOP Header Area */}
      <div className="text-center flex flex-col items-center gap-3 mb-16 relative z-10">
        <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-[#60A5FA] font-medium text-[10px] tracking-widest uppercase">
          ✦ خدماتنا الإبداعية
        </span>
        
        <h2 className="font-marcellus text-3xl md:text-5xl font-semibold text-white leading-tight">
          حلول رقمية استراتيجية مصممة لنمو أعمالك
        </h2>
 
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent mt-2" />
      </div>

      {/* Service Experience Grid (Fluid, responsive columns matching Awwwards layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
        {servicesList.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: idx * 0.08 }}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            onClick={() => setSelectedService(service)}
            className="rounded-[24px] border border-blue-500/10 bg-[#030B1A]/70 backdrop-blur-md p-6 flex flex-col justify-between hover:border-[#3B82F6]/50 shadow-soft hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 group cursor-pointer text-center"
          >
            <div>
              {/* Premium 2D Minimal Icon */}
              <div className="mb-4 flex justify-center items-center h-[70px] w-full select-none">
                <ServiceIcon2D type={service.type} />
              </div>
              
              {/* Title */}
              <h3 className="font-marcellus text-base font-semibold text-white mb-3 group-hover:text-[#60A5FA] transition-colors">
                {service.title}
              </h3>
              
              {/* Elegant Desc */}
              <p className="text-[11px] text-[#94A3B8] font-normal leading-relaxed mb-6">
                {service.desc}
              </p>
            </div>
 
            {/* Action button */}
            <div className="mt-auto">
              <span className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#020817]/60 group-hover:bg-[#2563EB] text-[#94A3B8] group-hover:text-white rounded-xl text-[10px] font-semibold border border-blue-500/10 group-hover:border-[#2563EB] shadow-soft transition-all duration-300">
                <span>اعرف المزيد</span>
                <ArrowLeft size={10} className="transition-transform group-hover:-translate-x-1" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Left-aligned Services Link */}
      <div className="flex justify-start mt-10 relative z-10 px-2">
        <a 
          href="https://wa.me/9647842272224?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%AA%D8%B5%D8%A7%D9%84%20%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20SADEEM%20%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%D8%A9."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#60A5FA] transition-colors border-b border-transparent hover:border-[#60A5FA] pb-0.5 duration-500"
        >
          <span>عرض كافة خدماتنا النخبوية</span>
          <ArrowLeft size={12} />
        </a>
      </div>

      {/* Detailed Premium Service Dialog Overlay */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-[#020817] rounded-2xl p-6 md:p-8 border border-blue-500/20 shadow-premium max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col text-right"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 left-4 p-2 rounded-xl border border-blue-500/15 text-[#94A3B8] hover:bg-blue-950 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
 
              {/* Service header */}
              <div className="flex flex-col md:flex-row items-center gap-4 border-b border-blue-500/15 pb-6 mb-6">
                <div className="w-20 h-20 flex items-center justify-center select-none">
                  <ServiceIcon2D type={selectedService.type} />
                </div>
                <div className="text-center md:text-right flex flex-col gap-1">
                  <span className="text-[10px] text-[#60A5FA] font-medium tracking-widest uppercase">سديم • تفاصيل الخدمة النخبوية</span>
                  <h3 className="font-marcellus text-2xl font-semibold text-white">{selectedService.title}</h3>
                  <p className="text-xs text-[#94A3B8] font-normal leading-relaxed">{selectedService.details.accent}</p>
                </div>
              </div>
 
              {/* Includes checklist */}
              <div className="flex flex-col gap-3 mb-6">
                <h4 className="font-marcellus text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  ماذا تشمل هذه الخدمة الاستثنائية؟
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedService.details.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#030B1A]/60 border border-blue-500/10 text-xs text-white font-normal">
                      <span className="w-4 h-4 rounded-full bg-[#2563EB]/15 flex items-center justify-center text-[#60A5FA] text-[9px] font-medium">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Why Sadeem block */}
              <div className="p-4 bg-[#2563EB]/5 rounded-xl border border-blue-500/15 text-xs font-normal text-white leading-relaxed mb-8">
                <span className="text-[#60A5FA] block font-semibold mb-1">لماذا سديم في هذه الخدمة؟</span>
                {selectedService.details.why}
              </div>
 
              {/* CTA button */}
              <div className="flex items-center gap-3">
                <a
                  href="#home"
                  onClick={() => {
                    setSelectedService(null);
                    // trigger wizard opening manually or let home scroll
                    const btn = document.querySelector('button[aria-label="ابدأ رحلتك الرقمية"]');
                    if (btn) btn.click();
                  }}
                  className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-xs font-medium shadow-sm hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] border border-blue-500/20 text-center hover:scale-[1.02] active:scale-[0.97] transition-all duration-500"
                >
                  احجز استشارتك الاستراتيجية مجاناً
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="hidden sm:inline-block py-3 px-6 border border-blue-500/15 bg-[#030B1A]/80 rounded-xl text-xs font-medium text-white shadow-soft hover:bg-blue-950 transition-all duration-500 cursor-pointer active:scale-[0.97]"
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
