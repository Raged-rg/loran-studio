import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, X, Check, Star, ShieldAlert,
  ShoppingBag, Monitor, Share2, Megaphone, TrendingUp, Braces, Sparkles, PenLine
} from 'lucide-react';

function ServiceIcon2D({ type }) {
  let Icon = ShoppingBag;
  if (type === 'monitor') Icon = Monitor;
  else if (type === 'social') Icon = Share2;
  else if (type === 'megaphone') Icon = Megaphone;
  else if (type === 'content') Icon = PenLine;
  else if (type === 'branding') Icon = Sparkles;
  else if (type === 'script') Icon = Braces;
  else if (type === 'sales') Icon = TrendingUp;

  return (
    <div className="w-14 h-14 rounded-2xl border border-[#C89B5B]/15 bg-[#FFFBF7]/90 flex items-center justify-center text-[#7A4A2A] shadow-soft group-hover:scale-[1.03] group-hover:border-[#C89B5B]/45 transition-all duration-300 relative overflow-hidden mx-auto">
      {/* Soft background gold glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C89B5B]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <Icon size={24} strokeWidth={1.2} className="text-[#7A4A2A] group-hover:text-[#C89B5B] transition-colors duration-300" />
    </div>
  );
}

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
      title: 'تصميم المتاجر الإلكترونية الفاخرة',
      desc: 'تصميم منصات تسوق حصرية تمنح عملائك تجربة تسوق استثنائية وسلسة تضاعف مبيعاتك بنمو متسارع.',
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
      id: 'web',
      type: 'monitor',
      category: 'design',
      title: 'تطوير المواقع والمنصات الرقمية',
      desc: 'بناء مواقع ويب مخصصة وسريعة تواكب أرقى معايير واجهات المستخدم لتمثيل ريادة مؤسستك بأبهى صورة.',
      details: {
        accent: 'مواقع استثنائية فريدة تُصمم من الصفر لتعبر عن الهوية الحقيقية ومكانة علامتك التجارية.',
        includes: [
          'تصميم واجهات مستخدم مخصصة (UI/UX) بنقشات بصرية حصرية',
          'تطوير متكامل بأحدث لغات البرمجة السريعة والآمنة',
          'لوحة تحكم إدارية مرنة تُمكنك من تعديل المحتوى بسهولة',
          'توافق كامل 100% مع الهواتف الذكية والأجهزة اللوحية',
          'تأمين كامل للخوادم وشهادات حماية SSL مع نسخ احتياطي دوري'
        ],
        why: 'كل موقع نبنيه هو تحفة برمجية وبصرية فريدة، نصقل تفاصيلها لتشهد باحترافية أعمالك.'
      }
    },
    {
      id: 'social',
      type: 'social',
      category: 'management',
      title: 'إدارة شبكات التواصل الاجتماعي',
      desc: 'إدارة شاملة واستراتيجية لمنصات التواصل وصناعة محتوى سينمائي يبني ولاء حقيقياً وجمهوراً مستداماً.',
      details: {
        accent: 'تأصيل الحضور الرقمي لبراندك وبناء هيبة بصرية تليق بمكانتك في السوق.',
        includes: [
          'صياغة الهوية البصرية وشبكة التصاميم الفخمة للحسابات',
          'صناعة محتوى فيديو سينمائي قصير (Reels / TikTok)',
          'كتابة نصوص تسويقية بليغة تخاطب اهتمام ووجدان المتابع',
          'جدولة ذكية للنشر وإدارة التفاعل والردود الاحترافية',
          'تقديم تقارير تحليلية شهرية لمعدلات التفاعل والنمو'
        ],
        why: 'نعامل حساباتك كمنبر لبراند فاخر؛ نصنع محتوى يعلق بالذهن ويدفع نحو الاتصال والتفاعل.'
      }
    },
    {
      id: 'ads',
      type: 'megaphone',
      category: 'marketing',
      title: 'إطلاق الحملات الإعلانية الموجهة',
      desc: 'تخطيط وإطلاق الحملات الإعلانية الممولة بدقة واستهداف استثنائي يضمن أعلى عوائد الاستثمار وأرقام نمو ملموسة.',
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
    },
    {
      id: 'content',
      type: 'content',
      category: 'content',
      title: 'صياغة المحتوى التسويقي الإبداعي',
      desc: 'صياغة أدبية تسويقية فاخرة لنصوص المواقع، الفيديوهات الإعلانية، والملفات التعريفية تحرك المشاعر وتدفع نحو الفعل.',
      details: {
        accent: 'الكلمات البليغة هي الجسر الأقوى بين براندك وعملائك، ونحن نصيغها بنبرة واثقة وفاخرة.',
        includes: [
          'كتابة نصوص المواقع والصفحات الرئيسية الكبرى',
          'صياغة نصوص الفيديوهات الإعلانية والسيناريو التسويقي',
          'صياغة ملفات الشركات التعريفية الاحترافية (Company Profiles)',
          'تحسين المحتوى الصياغي للظهور في محركات البحث SEO',
          'كتابة الرسائل البريدية والحملات التسويقية المباشرة'
        ],
        why: 'نصيغ رسالتك بأسلوب يخاطب عقل عميلك ويمنح علامتك التجارية هيبة الكيانات الكبرى.'
      }
    },
    {
      id: 'branding',
      type: 'branding',
      category: 'design',
      title: 'تصميم العلامات التجارية والهويات',
      desc: 'تأصيل وتصميم هوية بصرية كاملة تبدأ من ابتكار الشعار الفريد وتصميم Brand Book متكامل يرسخ برستيج علامتك.',
      details: {
        accent: 'بناء أصول بصرية راسخة تعيش لأجيال وتعكس وقار وفخامة علامتك التجارية.',
        includes: [
          'ابتكار الشعار الأساسي والرموز والخطوط الملحقة المبتكرة',
          'تنسيق واختيار لوحة الألوان الفخمة التي تثير المشاعر المستهدفة',
          'تصميم كافة المطبوعات الإدارية وكروت الأعمال الفاخرة',
          'بناء كتاب قواعد العلامة التجارية وتطبيقات التغليف (Brand Book)',
          'تصميم الهوية البصرية للعلاب والعبوات للمنتجات الحصرية'
        ],
        why: 'نمنح مشروعك البصمة الفريدة التي تجعله علامة فارقة وقابلة للتعرف الفوري بين آلاف المنافسين.'
      }
    },
    {
      id: 'script',
      type: 'script',
      category: 'code',
      title: 'تطوير البرمجيات والحلول الخاصة',
      desc: 'برمجة أنظمة وأتمتة مخصصة وربط كامل لـ APIs للقضاء على الأخطاء البشرية وتسريع دورة العمليات بكفاءة مطلقة.',
      details: {
        accent: 'حلول ذكية مصممة خصيصاً لأتمتة المهام المعقدة لتفرغ فريقك للتوسع والنمو.',
        includes: [
          'برمجة سكربتات الربط التلقائي وسحب البيانات من بوابات APIs',
          'أتمتة إدخال وتحديث حالة الطلبات والفواتير والعملاء آلياً',
          'تطوير لوحات تحكم برمجية خاصة لإدارة المهام الداخلية المخصصة',
          'تصميم وبناء قواعد بيانات سريعة وآمنة ومحسنة كلياً',
          'تأمين خوادم العمل وحماية البيانات ضد الثغرات وتكامل الأمان'
        ],
        why: 'كود برمي نظيف، سريع، وآمن صُمم بمقاييس هندسية رفيعة المستوى ليلبي احتياجاتك الفريدة.'
      }
    },
    {
      id: 'sales',
      type: 'sales',
      category: 'management',
      title: 'إدارة المبيعات المتكاملة والتأكيد',
      desc: 'فريق متخصص لإدارة خدمة عملائك وعمليات البيع والمتابعة الاحترافية لإغلاق الصفقات وتحويل الاستفسارات لأرباح.',
      details: {
        accent: 'تحويل الزوار المترددين إلى مشترين حقيقيين ومتابعة سلات الشراء بدقة لرفع الأرباح.',
        includes: [
          'تأكيد الطلبات الواردة هاتفياً وبشكل فوري عبر الواتساب',
          'إدارة خدمة العملاء وحل المشكلات والاستفسارات بأسلوب لبق وفاخر',
          'تطبيق استراتيجيات البيع الإضافي (Upselling) لرفع متوسط قيمة السلة',
          'تقليل نسب إلغاء الطلبات ومتابعة التوصيل مع شركات الشحن',
          'تقديم تحليلات دورية لأداء المبيعات وسلوك المشتري والعقبات'
        ],
        why: 'نحرص على أن لا يضيع أي عميل محتمل؛ نحول الاهتمام المبدئي إلى معاملات مالية ناجحة في خزينتك.'
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
                {/* Premium 2D Minimal Icon */}
                <div className="mb-4 flex justify-center items-center h-[90px] w-full select-none">
                  <ServiceIcon2D type={service.type} />
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
                <div className="w-20 h-20 flex items-center justify-center select-none">
                  <ServiceIcon2D type={selectedService.type} />
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
