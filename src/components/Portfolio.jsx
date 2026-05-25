import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ArrowUpRight, ShieldCheck, Cpu, Laptop, Star } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'stores', label: 'متاجر إلكترونية' },
    { id: 'web', label: 'موقع ويب' },
    { id: 'branding', label: 'هوية بصرية' },
    { id: 'marketing', label: 'تسويق' }
  ];

  const projects = [
    {
      id: 1,
      category: 'stores',
      title: 'متجر عبايات فاخر',
      desc: 'تجربة تسوق راقية لعلامة أزياء راقية، مع واجهة بلورية وبوابة دفع سريعة.',
      tags: ['تصميم متجر', 'تجربة مستخدم', 'سلة'],
      color: 'linear-gradient(135deg, #FAF5EF 0%, #EADCCB 100%)',
      textDark: true,
      colSpan: 'md:col-span-7', // Asymmetrical col span
      details: {
        scope: 'بناء منصة تسوق رقمية فاخرة تليق بأزياء العبايات الراقية، مع التركيز على سهولة الانتقال واللمسات المذهبة.',
        outcome: 'زيادة مبيعات المتجر بنسبة 180% خلال الشهر الأول وتحقيق زمن تحميل فائق يبلغ 0.7 ثانية.',
        metrics: ['معدل التحويل: +4.2%', 'زمن التحميل: 0.7ث', 'نسبة المرتجعات: -12%'],
        techs: ['React', 'Tailwind CSS', 'Framer Motion', 'Salla API']
      },
      previewType: 'abayas'
    },
    {
      id: 2,
      category: 'web',
      title: 'لوحة تحكم احترافية',
      desc: 'لوحة إدارة ومتابعة مبيعات ذكية بنظام أتمتة كامل ورسوم بيانية نحاسية تفاعلية.',
      tags: ['برمجة مواقع', 'نظام إدارة', 'رسم بياني'],
      color: 'linear-gradient(135deg, #2B1A12 0%, #3D251A 100%)',
      textDark: false,
      colSpan: 'md:col-span-5',
      details: {
        scope: 'برمجة وتصميم لوحة تحكم ذكية للشركات لمتابعة سلوك المشتري وحركة المنتجات والمخازن آلياً وبدون أخطاء بشرية.',
        outcome: 'أتمتة العمليات الداخلية بالكامل وتوفير ما يزيد عن 45 ساعة عمل أسبوعية لفريق الإدارة.',
        metrics: ['كفاءة الأتمتة: 100%', 'سرعة المعالجة: فورية', 'وفر الوقت: 45 ساعة/أسبوع'],
        techs: ['Vite', 'Three.js', 'GSAP', 'Tailwind CSS', 'Node.js']
      },
      previewType: 'dashboard'
    },
    {
      id: 3,
      category: 'stores',
      title: 'متجر إلكترونيات حديث',
      desc: 'منصة بيع هواتف وأجهزة ذكية بتجربة شراء فائقة السرعة ومتوافقة مع Apple Pay.',
      tags: ['متجر مخصص', 'أتمتة دفع', 'جوال'],
      color: 'linear-gradient(135deg, #7A4A2A 0%, #2B1A12 100%)',
      textDark: false,
      colSpan: 'md:col-span-5',
      details: {
        scope: 'تصميم وبناء متجر إلكتروني مخصص لبيع المنتجات التقنية والهواتف الذكية مع إدماج بوابات الدفع اللمسية الفورية.',
        outcome: 'تسهيل عملية الشراء لتنتهي بنقرة واحدة عبر أبل باي، مما رفع معدل الشراء المباشر بنسبة 60%.',
        metrics: ['مبيعات أبل باي: +60%', 'سلاسة الدفع: نقرة واحدة', 'التحويل العام: +3.8%'],
        techs: ['React', 'Zustand', 'Stripe', 'Tailwind CSS', 'Vite']
      },
      previewType: 'tech'
    },
    {
      id: 4,
      category: 'branding',
      title: 'هوية بصرية لمقهى عود',
      desc: 'تصميم شعار، دليل هوية، تعبئة وتغليف كلاسيكي يجمع بين التراث وجمال التصميم العصري.',
      tags: ['شعار', 'Brand Book', 'تغليف'],
      color: 'linear-gradient(135deg, #EADCCB 0%, #C89B5B 100%)',
      textDark: true,
      colSpan: 'md:col-span-7',
      details: {
        scope: 'ابتكار وبناء الهوية البصرية الكلية لبراند مقهى عود الفاخر، بدءاً من الشعار وتطبيقات التغليف الفاخرة للعلب والأكواب.',
        outcome: 'ترسيخ طابع الفخامة العربي والتراثي في أذهان الزوار، ومساعدة البراند في افتتاح 3 فروع جديدة بنجاح.',
        metrics: ['قيمة البراند البصرية: +120%', 'الفروع الجديدة: 3 فروع', 'ولاء العملاء: +85%'],
        techs: ['Adobe Illustrator', '3D Packaging', 'Brand Strategy', 'Typography Design']
      },
      previewType: 'branding'
    },
    {
      id: 5,
      category: 'marketing',
      title: 'حملة إعلانية لعطور فاخرة',
      desc: 'استراتيجية تسويق رقمية وحملات مبيعات ممولة على تيك توك وسناب شات حققت عائد 8x.',
      tags: ['Snap Ads', 'مبيعات', 'استهداف'],
      color: 'linear-gradient(135deg, #F4ECE3 0%, #EADCCB 100%)',
      textDark: true,
      colSpan: 'md:col-span-6',
      details: {
        scope: 'إطلاق وإدارة الحملة التسويقية لبراند العطور الكبرى، وتوزيع ميزانيات الاستهداف بدقة عبر سناب شات وإنستغرام وتيك توك.',
        outcome: 'تحقيق عائد استثماري خيالي يبلغ 8 أضعاف الميزانية المرصودة (ROAS: 8.4) وزيادة الوعي الكلي بالبراند.',
        metrics: ['العائد على الإعلان: 8.4x', 'المبيعات المحققة: +250%', 'الوصول الكلي: +1.5M'],
        techs: ['Snapchat Pixel', 'TikTok Ads Manager', 'Targeting Strategies', 'Copywriting']
      },
      previewType: 'marketing'
    },
    {
      id: 6,
      category: 'web',
      title: 'سكربت أتمتة الطلبات الذكي',
      desc: 'برمجة أنظمة سحب بيانات وربط APIs لأتمتة معالجة الطلبات لشركة الشحن.',
      tags: ['أنظمة مخصصة', 'أتمتة APIs', 'Node.js'],
      color: 'linear-gradient(135deg, #2B1A12 0%, #7A4A2A 100%)',
      textDark: false,
      colSpan: 'md:col-span-6',
      details: {
        scope: 'بناء وتطوير سكربت برمجيات مخصص لربط وجلب بيانات طلبات المبيعات آلياً وإرسالها لشركات التوصيل بدون أي تدخل يدوي.',
        outcome: 'القضاء تماماً على الأخطاء البشرية وسرعة حجز بوالص الشحن بنسبة 99% خلال ثوان معدودة.',
        metrics: ['نسبة الأخطاء البشرية: 0%', 'زمن حجز البوليصة: 2ث', 'أتمتة العمليات: 99.8%'],
        techs: ['Node.js', 'Express', 'API Integration', 'MongoDB', 'Vite']
      },
      previewType: 'script'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Background Lights */}
      <div className="absolute top-[20%] left-[5%] w-[200px] h-[200px] rounded-full bg-[#C89B5B]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] rounded-full bg-[#7A4A2A]/4 blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="text-center flex flex-col items-center gap-3 mb-14 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold text-xs tracking-wider"
        >
          أعمالنا
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-marcellus text-3xl md:text-5xl font-extrabold text-[#2B1A12] leading-tight"
        >
          نماذج من المشاريع التي صنعناها بعناية
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-[#7A4A2A] font-bold text-sm sm:text-base leading-relaxed"
        >
          نصمم تجارب رقمية تجمع بين الجمال، الأداء، والانطباع الفاخر.
        </motion.p>
      </div>

      {/* Category Filter pills */}
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
                {isActive && (
                  <motion.div
                    layoutId="activePortfolioFilterBackdrop"
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

      {/* Cinematic Asymmetrical Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
              whileHover={{ 
                y: -6,
                rotateX: 1.5,
                rotateY: -1.5,
                transition: { duration: 0.2 }
              }}
              className={`glass-card rounded-2xl overflow-hidden border border-[#7A4A2A]/10 hover:border-[#C89B5B] shadow-soft hover:shadow-premium group flex flex-col justify-between h-full cursor-pointer min-h-[380px] md:min-h-[460px] ${proj.colSpan}`}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedProject(proj)}
            >
              
              {/* Premium Geometric Interactive Mockup Preview Backdrop */}
              <div 
                className="w-full h-[220px] md:h-[280px] flex items-center justify-center relative overflow-hidden select-none border-b border-[#7A4A2A]/10"
                style={{ background: proj.color }}
              >
                <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />

                {/* Layered luxury CSS Mockup rendering depending on type */}
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  
                  {proj.previewType === 'abayas' && (
                    <div className="w-[85%] h-[75%] rounded-xl bg-white/70 backdrop-blur-md shadow-premium border border-white/50 flex flex-col p-4 relative group-hover:scale-105 transition-transform duration-500">
                      <div className="flex items-center justify-between border-b border-black/5 pb-2 mb-2">
                        <span className="w-8 h-2 rounded bg-black/15" />
                        <span className="w-4 h-4 rounded-full bg-[#C89B5B]/30" />
                      </div>
                      <div className="flex-grow flex gap-3 mt-1">
                        <div className="w-1/2 rounded-lg bg-[#FAF5EF] border border-[#C89B5B]/20 flex items-center justify-center text-[10px] text-[#7A4A2A] font-bold">ABAYA PREVIEW</div>
                        <div className="w-1/2 flex flex-col gap-1.5 justify-center">
                          <span className="w-full h-2.5 rounded bg-black/10" />
                          <span className="w-[80%] h-2.5 rounded bg-black/10" />
                          <span className="w-[40%] h-4 rounded bg-[#7A4A2A]/30 mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {proj.previewType === 'dashboard' && (
                    <div className="w-[85%] h-[75%] rounded-xl bg-[#2B1A12] border border-[#C89B5B]/25 shadow-premium flex flex-col p-4 relative group-hover:scale-105 transition-transform duration-500">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                        <span className="w-12 h-2.5 rounded bg-white/20" />
                        <span className="w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-500" />
                      </div>
                      <div className="flex-grow grid grid-cols-3 gap-2">
                        <div className="rounded-lg bg-white/5 border border-white/5 flex flex-col justify-end p-1.5">
                          <div className="w-full h-[60%] bg-[#C89B5B] rounded-sm" />
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/5 flex flex-col justify-end p-1.5">
                          <div className="w-full h-[90%] bg-[#B87333] rounded-sm animate-pulse" />
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/5 flex flex-col justify-end p-1.5">
                          <div className="w-full h-[40%] bg-white/20 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {proj.previewType === 'tech' && (
                    <div className="w-[45%] h-[80%] rounded-2xl bg-[#FFFBF7]/85 border-2 border-[#7A4A2A]/20 shadow-premium flex flex-col p-3 relative group-hover:rotate-6 transition-transform duration-500">
                      <div className="w-10 h-3 bg-black/80 rounded-full mx-auto mb-3" />
                      <div className="flex-grow rounded-xl bg-[#FAF5EF] border border-[#7A4A2A]/8 flex flex-col items-center justify-center p-2">
                        <div className="w-12 h-12 rounded-full bg-[#C89B5B]/20 flex items-center justify-center mb-2">📱</div>
                        <span className="w-16 h-2 rounded bg-black/10" />
                        <span className="w-10 h-2.5 rounded bg-[#B87333] mt-2" />
                      </div>
                    </div>
                  )}

                  {proj.previewType === 'branding' && (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border-2 border-[#C89B5B] shadow-premium flex items-center justify-center relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="font-marcellus text-4xl text-[#C89B5B]">O</span>
                      <div className="absolute inset-1 rounded-full border border-dashed border-[#C89B5B]/30 animate-spin" />
                    </div>
                  )}

                  {proj.previewType === 'marketing' && (
                    <div className="w-[80%] h-[60%] flex items-end gap-3 justify-center">
                      <div className="w-4 h-16 bg-[#7A4A2A]/20 border border-[#7A4A2A]/30 rounded-t-lg" />
                      <div className="w-4 h-24 bg-[#C89B5B]/30 border border-[#C89B5B]/40 rounded-t-lg group-hover:h-28 transition-all duration-500" />
                      <div className="w-4 h-32 bg-[#B87333]/40 border border-[#B87333]/50 rounded-t-lg group-hover:h-36 transition-all duration-500" />
                      <div className="w-4 h-12 bg-black/10 border border-black/20 rounded-t-lg" />
                    </div>
                  )}

                  {proj.previewType === 'script' && (
                    <div className="w-[85%] h-[75%] rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-premium flex flex-col p-4 relative group-hover:scale-[1.02] transition-transform duration-500 font-mono text-[9px] text-[#2B1A12] text-left">
                      <div className="text-[#C89B5B]">&lt;script&gt;</div>
                      <div className="pl-4 opacity-75">const loran = true;</div>
                      <div className="pl-4 text-[#7A4A2A]">runWorkflow(loran);</div>
                      <div className="text-[#C89B5B]">&lt;/script&gt;</div>
                    </div>
                  )}

                </div>

                {/* Floating zoom reveal search circle */}
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#2B1A12] shadow-premium transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={18} className="text-[#C89B5B]" />
                  </div>
                </div>

              </div>

              {/* Info text box */}
              <div className="p-6 flex flex-col justify-between flex-grow" style={{ transform: 'translateZ(10px)' }}>
                <div className="flex flex-col gap-2">
                  
                  {/* Category */}
                  <span className="text-[9px] text-[#C89B5B] font-extrabold uppercase tracking-widest">
                    {proj.category === 'stores' ? 'متجر إلكتروني فاخر' : proj.category === 'web' ? 'مواقع وأنظمة' : proj.category === 'branding' ? 'هوية تجارية فاخرة' : 'تسويق وإعلانات'}
                  </span>

                  {/* Title */}
                  <h3 className={`font-marcellus text-lg font-bold transition-colors ${
                    proj.textDark ? 'text-[#2B1A12] group-hover:text-[#7A4A2A]' : 'text-[#2B1A12] group-hover:text-[#C89B5B]'
                  }`}>
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#7A4A2A]/90 font-bold leading-relaxed mb-4 text-right">
                    {proj.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {proj.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-lg bg-[#FFFBF7]/60 border border-[#7A4A2A]/8 text-[9px] font-black text-[#2B1A12]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Cinematic Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#2B1A12]/50 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-[#F7EFE6] rounded-2xl overflow-hidden border border-[#7A4A2A]/20 shadow-premium max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col text-right"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 p-2.5 rounded-xl border border-[#7A4A2A]/10 bg-[#FFFBF7]/80 text-[#2B1A12] hover:bg-[#F4ECE3] transition-all z-10"
              >
                <X size={16} />
              </button>

              {/* Large project representation banner */}
              <div 
                className="w-full h-[220px] md:h-[300px] flex items-center justify-center relative overflow-hidden select-none border-b border-[#7A4A2A]/10"
                style={{ background: selectedProject.color }}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="text-center flex flex-col items-center gap-1.5 z-10 px-6">
                  <span className="text-[10px] text-white/50 bg-black/40 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-black">
                    معرض أعمال لوران ستوديو
                  </span>
                  <h3 className="font-marcellus text-3xl font-extrabold text-white mt-1">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Details & Copywriting info box */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                
                {/* 1. Project details */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-marcellus text-sm font-black text-[#2B1A12] flex items-center gap-2">
                    <Laptop size={16} className="text-[#C89B5B]" />
                    نطاق ومفهوم المشروع:
                  </h4>
                  <p className="text-xs text-[#7A4A2A]/90 font-bold leading-relaxed pr-6">
                    {selectedProject.details.scope}
                  </p>
                </div>

                {/* 2. Project outcome */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-marcellus text-sm font-black text-[#2B1A12] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#C89B5B]" />
                    النتائج المحققة (الأرقام والمقاييس):
                  </h4>
                  <p className="text-xs text-[#7A4A2A]/90 font-bold leading-relaxed pr-6">
                    {selectedProject.details.outcome}
                  </p>
                </div>

                {/* Grid details: Technologies & metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  
                  {/* Tech stack */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-marcellus text-sm font-black text-[#2B1A12] flex items-center gap-2">
                      <Cpu size={16} className="text-[#C89B5B]" />
                      التقنيات والمكتبات المستخدمة:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pr-6">
                      {selectedProject.details.techs.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#FFFBF7]/60 border border-[#7A4A2A]/10 text-[10px] font-black rounded-lg text-[#2B1A12]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core metrics pills */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-marcellus text-sm font-black text-[#2B1A12] flex items-center gap-2">
                      <Star size={16} className="text-[#C89B5B]" />
                      إحصائيات نجاح المشروع:
                    </h4>
                    <div className="flex flex-col gap-2 pr-6">
                      {selectedProject.details.metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-black text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-700 flex-shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Modal CTA actions */}
                <div className="flex items-center gap-3 border-t border-[#7A4A2A]/10 pt-6 mt-4">
                  <a
                    href="#wizard"
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-xs font-black shadow-md border border-[#C89B5B]/20 text-center"
                  >
                    اصنع مشروعك المماثل معنا
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="hidden sm:inline-block py-3 px-6 border border-[#7A4A2A]/15 bg-[#FFFBF7]/80 rounded-xl text-xs font-black text-[#2B1A12] shadow-soft hover:bg-[#F4ECE3] transition-all"
                  >
                    رجوع للمعرض
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
