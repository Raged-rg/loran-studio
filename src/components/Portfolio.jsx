import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ArrowUpRight, ShieldCheck, Cpu, Laptop, Star } from 'lucide-react';

import portfolioHiraMain from '../assets/portfolio-hira-main.jpg';
import portfolioHiraFlow from '../assets/portfolio-hira-flow.jpg';
import portfolioLuxora from '../assets/portfolio-luxora.jpg';
import portfolioJewelry from '../assets/portfolio-jewelry.jpg';
import portfolioLunae from '../assets/portfolio-lunae.jpg';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'websites', label: 'موقع ويب' },
    { id: 'stores', label: 'متاجر إلكترونية' },
    { id: 'uiux', label: 'واجهات UI/UX' },
    { id: 'branding', label: 'براندنغ' }
  ];

  const projects = [
    {
      id: 1,
      category: 'stores',
      title: 'لوكسورا - الساعات الكلاسيكية (Luxora)',
      desc: 'تصميم متجر إلكتروني فاخر يعرض أرقى مقتنيات الساعات السويسرية، بملمس ذهبي بلوري ونظام أبل باي فوري.',
      tags: ['برمجة متاجر', 'بوابة دفع', 'ساعات نادرة', 'أمن وتشفير'],
      image: portfolioLuxora,
      colSpan: 'md:col-span-6',
      details: {
        scope: 'تصميم وتطوير متجر مخصص للمقتنيات الثمينة والساعات الكلاسيكية النادرة مع التركيز الكامل على الملمس البرونزي والزجاجي وسلاسة الانتقالات.',
        outcome: 'تسهيل اقتناء السلع الثمينة ورفع معدل المبيعات بنسبة 150% خلال الشهر الأول مع تشفير كامل لكافة البيانات.',
        metrics: ['نمو المبيعات: +150%', 'التجاوب الرقمي: 100%', 'رضا المستثمرين: 98%'],
        techs: ['Vite', 'React', 'GSAP', 'Stripe API', 'Zustand']
      }
    },
    {
      id: 2,
      category: 'stores',
      title: 'حيرة - عبايات الأناقة الفاخرة (Hira)',
      desc: 'منصة تجارة إلكترونية راقية متخصصة في العبايات الفاخرة، تمزج بين البساطة الهندسية والوقار التقليلي الحديث.',
      tags: ['تصميم متجر', 'تجربة مستخدم', 'واجهة بلورية', 'أبل باي'],
      image: portfolioHiraMain,
      colSpan: 'md:col-span-6',
      details: {
        scope: 'بناء وتطوير واجهات تسوق حصرية فائقة الفخامة لعلامة العبايات والقفاطين الراقية حيرة، بالاعتماد على التصفح التقليلي والتباعد البصري لتقديم الفخامة والوقار العربي.',
        outcome: 'تسهيل تصفح المجموعات الحصرية ورفع نسبة إتمام الشراء بنسبة 180% وزيادة تصفح الصفحات بنسبة 210%.',
        metrics: ['معدل التحويل: +5.2%', 'زمن التحميل: 0.5ث', 'المبيعات المباشرة: +180%'],
        techs: ['React', 'Framer Motion', 'Salla API', 'Tailwind CSS']
      }
    },
    {
      id: 3,
      category: 'websites',
      title: 'سارتوريو - السترات الفاخرة (Sartorio)',
      desc: 'موقع إلكتروني راقٍ لعلامة الأزياء الرجالية سارتوريو، يقدم المجموعات الحصرية بتناسق تايبوغرافي وملمس إبداعي فريد.',
      tags: ['موقع تعريفي', 'أزياء فاخرة', 'مظهر سينمائي', 'تفاعل بلوري'],
      image: portfolioJewelry,
      colSpan: 'md:col-span-4',
      details: {
        scope: 'بناء وتطوير متجر ملابس رجالية كلاسيكية حائز على اهتمام واسع، يمزج بين الألوان الدافئة والبريق النحاسي والمشاهد التفاعلية للمشغولات الثمينة.',
        outcome: 'تحقيق زيادة في الطلبات الفورية بنسبة 195% وتسهيل معاينة المجموعات عبر الهواتف بمرونة مطلقة.',
        metrics: ['زيادة الطلبات: +195%', 'ثقة العملاء: 100%', 'أبل باي: نقرة واحدة'],
        techs: ['React', 'Zustand', 'Tailwind CSS', 'Apple Pay Integration', 'Vite']
      }
    },
    {
      id: 4,
      category: 'uiux',
      title: 'لوني - واجهات وتجربة مستخدم (Lunaé)',
      desc: 'تصميم تجربة مستخدم كاملة وواجهات تطبيق تسوق للهواتف الذكية بنمط لوني بلوري وردي فائق النعومة والجمال.',
      tags: ['تصميم واجهات UI', 'تجربة مستخدم UX', 'تطبيق هواتف', 'تفاعل بلوري'],
      image: portfolioLunae,
      colSpan: 'md:col-span-4',
      details: {
        scope: 'تصميم الهوية البصرية الكاملة وتجربة المستخدم المخصصة للهواتف لعلامة الملابس الفاخرة لوني، مع التركيز على انسيابية التنقل وتأثيرات التحجيم الرائعة.',
        outcome: 'خلق بصمة زهرية فريدة ورفع نسب رضا وتفاعل المتسوقات بنسبة 120% وتخفيض خطوات إتمام الطلب إلى خطوتين فقط.',
        metrics: ['ولاء العملاء: +85%', 'سرعة الدفع: خطوتين', 'زيادة التفاعل: +120%'],
        techs: ['Figma', 'UI Design System', 'Interactive Prototyping', 'User Research']
      }
    },
    {
      id: 5,
      category: 'branding',
      title: 'فيتورا - عطور النخبة (Vetora)',
      desc: 'تصميم وبناء هوية بصرية ملكية لبراند العطور الحصرية فيتورا، تستعرض خطوط الإنتاج والقصة الإبداعية بتجربة تفاعلية سلسة.',
      tags: ['هوية عطور', 'براندنغ فاخر', 'أتمتة وحجز', 'مظهر سينمائي'],
      image: portfolioHiraFlow,
      colSpan: 'md:col-span-4',
      details: {
        scope: 'تصميم وبناء موقع تعريفي سينمائي لبراند العطور الفاخرة فيتورا، مع التركيز على تصفح المجموعات العطرية وقصة العلامة بتأثيرات البارالاكس الناعمة.',
        outcome: 'خلق بصمة ذهبية راسخة تمنح العطور وقاراً ملكياً أمام المشتري وتوفير واجهات أتمتة لطلبات وكلاء التوزيع.',
        metrics: ['التحويل المالي: +90%', 'أتمتة الوكلاء: 100%', 'العائد الإعلاني: 8.4x'],
        techs: ['React', 'Framer Motion', 'SEO Opt', 'Vite']
      }
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[5%] w-[200px] h-[200px] rounded-full bg-[#C8A97E]/4 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] rounded-full bg-[#3A2B24]/3 blur-[100px] pointer-events-none" />

      {/* 👑 SECTION HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 relative z-10">
        <div className="text-right flex flex-col gap-3">
          <span className="px-4 py-1.5 rounded-full border border-[#C8A97E]/30 bg-[#C8A97E]/8 text-[#C8A97E] font-medium text-[10px] tracking-widest uppercase w-fit">
            ✦ معرض أعمالنا
          </span>
          <h2 className="font-marcellus text-3xl md:text-5xl font-semibold text-[#3A2B24] leading-tight">
            أعمال نفخر بصياغتها
          </h2>
          <p className="max-w-xl text-[#3A2B24]/75 font-normal text-xs sm:text-sm leading-relaxed">
            نخبة من المشاريع الرقمية والهويات الحصرية التي صممت لتواكب تطلعات عملائنا.
          </p>
        </div>

        <div className="self-end">
          <a 
            href="https://wa.me/9647842272224?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B7%D9%84%D8%A7%D8%B9%20%D8%B9%D9%84%D9%8A%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%20LORAN%20STUDIO%20%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%D8%A9%20%D9%88%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#3A2B24]/15 bg-[#FFFDF9] text-xs font-medium text-[#3A2B24] shadow-soft hover:shadow-[0_0_15px_rgba(200,169,126,0.2)] hover:bg-[#E8DDD0] transition-all duration-500"
          >
            <span>استكشف كافة المشاريع</span>
            <span>←</span>
          </a>
        </div>
      </div>

      {/* 👑 CATEGORY FILTERS */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-16 select-none relative z-10">
        <div className="flex gap-2 p-1.5 rounded-full bg-[#FFFDF9]/60 border border-[#C8A97E]/10 shadow-inner backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-medium transition-all duration-500 cursor-pointer select-none active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-[#3A2B24] hover:text-[#C8A97E]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePortfolioFilterBackdrop"
                    className="absolute inset-0 bg-gradient-to-r from-[#C8A97E] to-[#bfa075] rounded-full border border-[#C8A97E]/25 shadow-md"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 👑 PROJECT CARDS GRID (asymmetrical, large border radius) */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className={`rounded-[28px] overflow-hidden border border-[#C8A97E]/15 bg-[#FFFDF9] shadow-soft hover:shadow-premium group flex flex-col justify-between h-full cursor-pointer min-h-[440px] md:min-h-[500px] ${proj.colSpan}`}
              onClick={() => setSelectedProject(proj)}
            >
              {/* Image Preview Container (Zoom Reveal & Soft Gradients) */}
              <div className="w-full h-[260px] md:h-[320px] relative overflow-hidden select-none border-b border-[#C8A97E]/12">
                <img 
                  loading="lazy"
                  src={proj.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  alt={proj.title} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Hover direct action trigger */}
                <div className="absolute inset-0 bg-[#3A2B24]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 rounded-full bg-[#FFFDF9] text-[#3A2B24] text-xs font-medium shadow-premium flex items-center gap-1.5"
                  >
                    <span>عرض تفاصيل المشروع</span>
                    <Eye size={14} className="text-[#C8A97E]" />
                  </motion.div>
                </div>
              </div>

              {/* Card textual info Box */}
              <div className="p-7 flex flex-col justify-between flex-grow bg-[#FFFDF9]/40 backdrop-blur-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] text-[#C8A97E] font-medium uppercase tracking-widest">
                    {categories.find(c => c.id === proj.category)?.label || 'مشروع متميز'}
                  </span>

                  <h3 className="font-marcellus text-xl font-semibold text-[#3A2B24] transition-colors group-hover:text-[#C8A97E]">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#3A2B24]/75 font-normal leading-relaxed mb-4 text-right">
                    {proj.desc}
                  </p>
                </div>

                {/* Micro tags and arrow */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#C8A97E]/12">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-full bg-[#F7F2EC] border border-[#C8A97E]/8 text-[9px] font-medium text-[#3A2B24]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-[#C8A97E]/10 group-hover:bg-[#C8A97E] text-[#3A2B24] flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight size={14} className="text-[#3A2B24]" />
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 👑 FULLSCREEN CINEMATIC DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#3A2B24]/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-[#F7F2EC] rounded-[28px] overflow-hidden border border-[#C8A97E]/20 shadow-premium max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col text-right"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 p-2.5 rounded-full border border-[#C8A97E]/15 bg-[#FFFDF9]/80 text-[#3A2B24] hover:bg-[#E8DDD0] transition-all z-10 active:scale-95 cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Large project banner representation */}
              <div className="w-full h-[240px] md:h-[320px] relative overflow-hidden select-none border-b border-[#C8A97E]/15">
                <img 
                  src={selectedProject.image} 
                  className="w-full h-full object-cover" 
                  alt={selectedProject.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2B24]/90 via-[#3A2B24]/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-right">
                  <span className="text-[10px] text-white/75 bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit font-medium uppercase tracking-widest">
                    معرض أعمال لوران ستوديو الحصرية
                  </span>
                  <h3 className="font-marcellus text-2xl sm:text-3xl font-semibold text-white mt-2">{selectedProject.title}</h3>
                </div>
              </div>

              {/* Detail cards container */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                
                {/* 1. Project details */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-marcellus text-sm font-semibold text-[#3A2B24] flex items-center gap-2">
                    <Laptop size={16} className="text-[#C8A97E]" />
                    نطاق ومفهوم المشروع:
                  </h4>
                  <p className="text-xs text-[#3A2B24]/75 font-normal leading-relaxed pr-6">
                    {selectedProject.details.scope}
                  </p>
                </div>

                {/* 2. Project outcome */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-marcellus text-sm font-semibold text-[#3A2B24] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#C8A97E]" />
                    النتائج والمقاييس الرقمية المحققة:
                  </h4>
                  <p className="text-xs text-[#3A2B24]/75 font-normal leading-relaxed pr-6">
                    {selectedProject.details.outcome}
                  </p>
                </div>

                {/* Grid details: Technologies & metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-6 border-t border-[#C8A97E]/12">
                  
                  {/* Tech stack */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-marcellus text-sm font-semibold text-[#3A2B24] flex items-center gap-2">
                      <Cpu size={16} className="text-[#C8A97E]" />
                      التقنيات والمكتبات المستخدمة:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pr-6">
                      {selectedProject.details.techs.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#FFFDF9] border border-[#C8A97E]/10 text-[10px] font-medium rounded-lg text-[#3A2B24] shadow-soft">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core metrics pills */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-marcellus text-sm font-semibold text-[#3A2B24] flex items-center gap-2">
                      <Star size={16} className="text-[#C8A97E]" />
                      مؤشرات النجاح الإحصائية:
                    </h4>
                    <div className="flex flex-col gap-2 pr-6">
                      {selectedProject.details.metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 flex-shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Modal CTA actions */}
                <div className="flex items-center gap-3 border-t border-[#C8A97E]/15 pt-6 mt-6">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      // Trigger wizard manually or let home scroll
                      const btn = document.querySelector('button[aria-label="ابدأ رحلتك الرقمية"]');
                      if (btn) btn.click();
                    }}
                    className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#C8A97E] to-[#bfa075] text-[#3A2B24] rounded-xl text-xs font-medium shadow-sm hover:shadow-[0_0_20px_rgba(200,169,126,0.35)] border border-[#C8A97E]/20 text-center hover:scale-[1.02] active:scale-95 transition-all duration-500 cursor-pointer"
                  >
                    لنصنع نجاحك المماثل معاً
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="hidden sm:inline-block py-3.5 px-6 border border-[#C8A97E]/15 bg-[#FFFDF9]/80 rounded-xl text-xs font-medium text-[#3A2B24] shadow-soft hover:bg-[#E8DDD0] transition-all duration-500 active:scale-95 cursor-pointer"
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

