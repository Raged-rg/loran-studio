import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, MapPin, Mail, Phone, MessageSquare, Instagram, 
  HelpCircle, ChevronDown, Check, Sparkles, Clock, ArrowLeft
} from 'lucide-react';

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
    
    // Smooth magnetic pull
    setPosition({
      x: (clientX - centerX) * 0.35,
      y: (clientY - centerY) * 0.35
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
}

// 3D Card Hover Tilt component
function LuxuryContactCard({ title, value, label, icon: Icon, href, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // subtle 8deg maximum tilt
    setRotateX((mouseY / height) * 8);
    setRotateY(-(mouseX / width) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      animate={{
        y: [0, -6, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5
      }}
      className={`glass-card rounded-2xl p-6 border border-[#7A4A2A]/10 text-right flex items-start gap-4 hover:border-[#C89B5B]/60 transition-colors select-none shadow-soft ${
        href ? 'cursor-pointer group' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
        <Icon size={18} className="text-[#C89B5B]" />
      </div>
      <div className="flex-1" style={{ transform: 'translateZ(20px)' }}>
        <h4 className="font-marcellus text-sm font-black text-[#2B1A12] mb-1 transition-colors duration-200 group-hover:text-[#C89B5B]">
          {title}
        </h4>
        <p className="text-xs text-[#7A4A2A] font-bold leading-relaxed">{value}</p>
        {label && <p className="text-[10px] text-[#7A4A2A]/60 font-semibold mt-1">{label}</p>}
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block w-full">
      {content}
    </a>
  ) : content;
}

// Floating Label input field for contact form
function FloatingInput({ label, id, value, onChange, type = 'text', required = false, placeholder = '' }) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value.toString().trim() !== '';

  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        className={`w-full h-14 px-4 pt-4 rounded-xl border bg-[#FFFBF7]/40 text-xs sm:text-sm font-bold text-[#2B1A12] focus:outline-none transition-all duration-300 shadow-soft ${
          isFocused 
            ? 'border-[#C89B5B] ring-2 ring-[#C89B5B]/10 bg-[#FFFBF7]/80' 
            : 'border-[#7A4A2A]/12 hover:border-[#7A4A2A]/25'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute right-4 pointer-events-none transition-all duration-300 font-bold ${
          isFocused || hasValue
            ? 'top-1 text-[9px] text-[#C89B5B]'
            : 'top-4 text-xs text-[#2B1A12]/40'
        }`}
      >
        {label} {required && '*'}
      </label>
    </div>
  );
}

// Floating Label select field for contact form
function FloatingSelect({ label, id, value, onChange, options, required = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '';

  return (
    <div className="relative w-full mb-6 text-right">
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-14 px-4 pt-4 rounded-xl border bg-[#FFFBF7]/40 text-xs sm:text-sm font-bold text-[#2B1A12] focus:outline-none appearance-none transition-all duration-300 shadow-soft ${
          isFocused 
            ? 'border-[#C89B5B] ring-2 ring-[#C89B5B]/10 bg-[#FFFBF7]/80' 
            : 'border-[#7A4A2A]/12 hover:border-[#7A4A2A]/25'
        }`}
      >
        <option value="" className="bg-[#FFFBF7] text-[#2B1A12]">اختر الخدمة المطلوبة...</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt} className="bg-[#FFFBF7] text-[#2B1A12]">{opt}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute right-4 pointer-events-none transition-all duration-300 font-bold ${
          isFocused || hasValue
            ? 'top-1 text-[9px] text-[#C89B5B]'
            : 'top-4 text-xs text-[#2B1A12]/40'
        }`}
      >
        {label} {required && '*'}
      </label>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7A4A2A]/50">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

// Floating Label textarea for contact form
function FloatingTextarea({ label, id, value, onChange, required = false, rows = 4, maxLength = 500 }) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value.toString().trim() !== '';

  return (
    <div className="relative w-full mb-6">
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        maxLength={maxLength}
        className={`w-full p-4 pt-6 rounded-xl border bg-[#FFFBF7]/40 text-xs sm:text-sm font-bold text-[#2B1A12] focus:outline-none transition-all duration-300 shadow-soft resize-none ${
          isFocused 
            ? 'border-[#C89B5B] ring-2 ring-[#C89B5B]/10 bg-[#FFFBF7]/80' 
            : 'border-[#7A4A2A]/12 hover:border-[#7A4A2A]/25'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute right-4 pointer-events-none transition-all duration-300 font-bold ${
          isFocused || hasValue
            ? 'top-1.5 text-[9px] text-[#C89B5B]'
            : 'top-4 text-xs text-[#2B1A12]/40'
        }`}
      >
        {label} {required && '*'}
      </label>
      <span className="absolute bottom-2 left-4 text-[9px] text-[#7A4A2A]/50 font-bold">
        {value.length}/{maxLength}
      </span>
    </div>
  );
}

export default function Contact() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isWaHovered, setIsWaHovered] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    msg: ''
  });

  const magneticCta1 = useMagnetic();
  const magneticCta2 = useMagnetic();
  const magneticCta3 = useMagnetic();
  const magneticFormSubmit = useMagnetic();
  const magneticWaFloat = useMagnetic();

  const services = [
    'متجر إلكتروني متكامل',
    'موقع شركة احترافي',
    'إدارة السوشيال ميديا والتسويق',
    'إطلاق حملات إعلانية ممولة',
    'سكربت خاص وأتمتة برمجية',
    'تصميم هوية بصرية مخصصة'
  ];

  const faqs = [
    {
      q: 'هل تقدمون استشارات أولية مجانية؟',
      a: 'نعم بالكامل، نقدّم استشارة هاتفية أو عبر الواتساب مجانية مدتها 30 دقيقة لتحليل متطلباتك ورسم خارطة الطريق الأمثل لمشروعك.'
    },
    {
      q: 'كم تستغرق مدة تنفيذ وتصميم المشروع؟',
      a: 'تختلف المدة حسب الحجم؛ تتطلب الهويات وتجهيز المتاجر عادة من 10 إلى 20 يوماً، بينما تتطلب المشاريع والأنظمة الخاصة المتقدمة من شهر إلى 3 أشهر.'
    },
    {
      q: 'ما هي بوابات الدفع وطرق الدفع التي تدعمونها؟',
      a: 'نقبل الدفع عبر التحويلات البنكية المباشرة، وبوابات الدفع الإلكتروني (مدى، الفيزا، الكارد، Apple Pay) ونوفر تسهيلات دفع مرنة على دفعات مجدولة.'
    },
    {
      q: 'هل تقدمون الدعم والتحديثات الفنية بعد الإطلاق؟',
      a: 'بالتأكيد، تشمل جميع باقاتنا دعماً مجانياً يمتد من أسبوع إلى 3 أشهر للتحقق من خلو الموقع من أي مشاكل وأتمتة خوادم النسخ الاحتياطي وحماية البيانات.'
    }
  ];

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setFormData({ name: '', email: '', phone: '', service: '', msg: '' });
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
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

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 relative select-none">
      
      {/* Background Animated Lights overlay */}
      <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#C89B5B]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#7A4A2A]/4 blur-[100px] pointer-events-none" />

      {/* FINAL CTA AREA */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full relative py-20 px-6 sm:px-12 overflow-hidden rounded-[36px] bg-gradient-to-b from-[#FFFBF7]/50 to-[#EADCCB]/25 border border-[#7A4A2A]/10 mb-28 shadow-premium text-center flex flex-col items-center justify-center gap-6"
      >
        {/* Soft floating gold particles inside final CTA */}
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-[#C89B5B] to-[#EADCCB]/40 pointer-events-none"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
          <span className="text-[10px] font-extrabold text-[#C89B5B] tracking-widest uppercase flex items-center gap-1">
            <Sparkles size={11} className="animate-pulse" />
            البداية الذكية لمستقبل مشروعك
          </span>
          
          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2B1A12] leading-tight">
            جاهز لنقل مشروعك إلى مستوى آخر؟
          </h2>
          
          <p className="text-xs sm:text-sm font-bold text-[#7A4A2A] leading-relaxed max-w-lg">
            دع لوران تبني لك تجربة رقمية فاخرة تجمع بين التصميم المبتكر، التقنية الصلبة، والتسويق الاستراتيجي الفعال لضمان النجاح المطلق.
          </p>
        </div>

        {/* Cinematic magnetic CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 relative z-10 w-full sm:w-auto">
          
          <motion.button
            ref={magneticCta1.ref}
            onMouseMove={magneticCta1.handleMouseMove}
            onMouseLeave={magneticCta1.handleMouseLeave}
            onClick={() => handleNavClick('wizard')}
            animate={{ x: magneticCta1.position.x, y: magneticCta1.position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className="w-full sm:w-auto px-8 py-4 bg-[#7A4A2A] hover:bg-[#2B1A12] text-white border border-[#7A4A2A] font-black rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>ابدأ مشروعك</span>
            <Sparkles size={11} className="text-[#C89B5B]" />
          </motion.button>

          <motion.button
            ref={magneticCta2.ref}
            onMouseMove={magneticCta2.handleMouseMove}
            onMouseLeave={magneticCta2.handleMouseLeave}
            onClick={() => handleNavClick('contact-form-anchor')}
            animate={{ x: magneticCta2.position.x, y: magneticCta2.position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFFBF7]/60 hover:bg-[#7A4A2A] text-[#2B1A12] hover:text-white border border-[#7A4A2A]/10 hover:border-[#7A4A2A] font-black rounded-xl text-xs shadow-soft transition-all cursor-pointer active:scale-95"
          >
            تواصل معنا
          </motion.button>

          <motion.a
            ref={magneticCta3.ref}
            onMouseMove={magneticCta3.handleMouseMove}
            onMouseLeave={magneticCta3.handleMouseLeave}
            href={`https://wa.me/9647842272224?text=${encodeURIComponent(
              "مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي."
            )}`}
            target="_blank"
            rel="noreferrer"
            animate={{ x: magneticCta3.position.x, y: magneticCta3.position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#EADCCB] to-[#C89B5B] hover:from-[#C89B5B] hover:to-[#B87333] text-[#2B1A12] font-black rounded-xl text-xs shadow-md border border-[#C89B5B]/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>واتساب مباشر</span>
            <MessageSquare size={12} className="text-[#2B1A12]" />
          </motion.a>

        </div>
      </motion.div>

      {/* CONTACT SECTION HEADER */}
      <div id="contact-form-anchor" className="text-center flex flex-col items-center gap-3 mb-16 relative z-10">
        <span className="px-4 py-1.5 rounded-full border border-[#C89B5B]/30 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold text-xs tracking-wider">
          جسور التواصل الفاخرة
        </span>
        <h2 className="font-marcellus text-3xl md:text-4xl font-extrabold text-[#2B1A12]">دعنا نحقق الريادة معاً</h2>
        <p className="max-w-xl text-[#7A4A2A] font-bold text-sm leading-relaxed">
          نحن هنا للإجابة عن استفساراتك وتصميم الحلول المناسبة لتطلعاتك. ابدأ المراسلة وسنرد فوراً.
        </p>
      </div>

      {/* CONTACT GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 relative z-10 items-stretch">
        
        {/* Left Side (Subtle Staggered Floating Cards) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          <LuxuryContactCard
            title="موقعنا الرئيسي"
            value="شارع المنصور الرئيسي، بغداد، العراق"
            icon={MapPin}
            index={0}
          />

          <LuxuryContactCard
            title="البريد الإلكتروني للوكالة"
            value="info@loranstudio.com"
            icon={Mail}
            href="mailto:info@loranstudio.com"
            index={1}
          />

          <LuxuryContactCard
            title="محادثة واتساب سريعة"
            value="تواصل فوري للحجز والاستفسار الفني المباشر"
            label="+9647842272224"
            icon={MessageSquare}
            href={`https://wa.me/9647842272224?text=${encodeURIComponent(
              "مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي."
            )}`}
            index={2}
          />

          <LuxuryContactCard
            title="حساب الإنستغرام"
            value="تابع أعمالنا وكواليس استوديوهاتنا الإبداعية"
            label="@loran_studio"
            icon={Instagram}
            href="https://instagram.com/loran_studio"
            index={3}
          />

          <LuxuryContactCard
            title="أوقات العمل والاستقبال"
            value="السبت - الخميس: 9:00 صباحاً - 8:00 مساءً"
            label="الجمعة مغلق بالكامل للاستراحة"
            icon={Clock}
            index={4}
          />

        </div>

        {/* Right Side (Luxury Contact Form with Floating Labels) */}
        <div className="lg:col-span-2">
          <form onSubmit={handleFormSubmit} className="glass-card rounded-3xl p-6 md:p-8 border border-[#7A4A2A]/12 shadow-premium flex flex-col justify-between h-full text-right">
            <div>
              <h3 className="font-marcellus text-lg font-bold text-[#2B1A12] border-b border-[#7A4A2A]/10 pb-3 mb-6 flex items-center justify-start gap-2">
                <Sparkles size={14} className="text-[#C89B5B]" />
                أرسل لنا رسالة مباشرة
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="الاسم الكامل"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="أدخل اسمك الكريم"
                />
                
                <FloatingInput
                  label="البريد الإلكتروني"
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="name@domain.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="رقم الهاتف"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="مثال: 009665xxxxxxxx"
                />

                <FloatingSelect
                  label="نوع الخدمة أو المشروع"
                  id="service"
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  options={services}
                />
              </div>

              <FloatingTextarea
                label="اكتب تفاصيل استفسارك أو رسالتك هنا..."
                id="msg"
                required
                value={formData.msg}
                onChange={(e) => handleInputChange('msg', e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4">
              <motion.button
                ref={magneticFormSubmit.ref}
                onMouseMove={magneticFormSubmit.handleMouseMove}
                onMouseLeave={magneticFormSubmit.handleMouseLeave}
                type="submit"
                animate={{ x: magneticFormSubmit.position.x, y: magneticFormSubmit.position.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7A4A2A] to-[#2B1A12] text-white rounded-xl text-xs font-black shadow-md border border-[#C89B5B]/20 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>إرسال الرسالة للمستشارين</span>
                <Send size={12} className="text-[#C89B5B] ml-0.5 animate-pulse" />
              </motion.button>
            </div>

          </form>
        </div>

      </div>

      {/* LUXURY FAQ SECTION Accordion */}
      <div className="max-w-4xl mx-auto mb-20 relative z-10">
        
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <HelpCircle size={30} className="text-[#C89B5B] animate-bounce-slow" />
          <h3 className="font-marcellus text-2xl font-bold text-[#2B1A12]">الأسئلة الشائعة</h3>
          <p className="text-xs text-[#7A4A2A] font-bold">كل ما يدور في ذهنك حول خدماتنا، تفاصيل باقاتنا، ونظام عملنا المالي.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl border border-[#7A4A2A]/10 overflow-hidden text-right transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#2B1A12] hover:bg-[#F4ECE3]/50 transition-colors cursor-pointer select-none"
                >
                  <span className="text-right pl-4 leading-relaxed">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#C89B5B] flex-shrink-0"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pt-1 text-xs text-[#7A4A2A]/90 font-bold leading-relaxed border-t border-[#7A4A2A]/6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>

      {/* WHATSAPP FLOAT QUICK-CONTACT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        
        {/* Floating Bubble Tooltip on Hover */}
        <AnimatePresence>
          {isWaHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="absolute bottom-16 right-0 bg-[#EADCCB] text-[#2B1A12] border border-[#C89B5B]/30 px-4 py-2 rounded-xl text-[10px] font-black tracking-wide whitespace-nowrap shadow-lg flex items-center gap-1.5"
            >
              <span>تواصل مع لوران مباشرة</span>
              <Sparkles size={10} className="text-[#C89B5B]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse expanding ring animation */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-600/30 animate-ping pointer-events-none scale-105" />

        {/* Magnetic Floating WA badge */}
        <motion.a
          ref={magneticWaFloat.ref}
          onMouseMove={magneticWaFloat.handleMouseMove}
          onMouseLeave={() => {
            magneticWaFloat.handleMouseLeave();
            setIsWaHovered(false);
          }}
          onMouseEnter={() => setIsWaHovered(true)}
          href={`https://wa.me/9647842272224?text=${encodeURIComponent(
            "مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي."
          )}`}
          target="_blank"
          rel="noreferrer"
          animate={{ x: magneticWaFloat.position.x, y: magneticWaFloat.position.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg border border-emerald-400/20 active:scale-95 transition-transform"
        >
          <MessageSquare size={20} />
        </motion.a>

      </div>

      {/* CINEMATIC SUCCESS MODAL OVERLAY */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#2B1A12]/80 backdrop-blur-xl"
            onClick={handleCloseSuccess}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 110, damping: 16 }}
              className="relative max-w-md w-full glass-card rounded-3xl p-8 border border-[#C89B5B]/30 shadow-premium text-center flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Gold check animated bubble */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] flex items-center justify-center border-2 border-[#C89B5B] shadow-lg mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                >
                  <Check className="text-[#C89B5B]" size={36} strokeWidth={3.5} />
                </motion.div>
              </div>

              <h3 className="font-marcellus text-2xl font-black text-[#2B1A12] mb-3">تم إرسال طلبك بنجاح</h3>
              <p className="text-xs sm:text-sm font-bold text-[#7A4A2A] leading-relaxed mb-8">
                أهلاً بك في عالم لوران ستوديو الفاخر. لقد سجلنا رسالتك واهتمامك بنجاح. سيقوم مستشار الهوية بالاتصال بك عبر الواتساب أو البريد الإلكتروني خلال 12 ساعة كحد أقصى.
              </p>

              {/* Dynamic prepared WhatsApp contact button */}
              <div className="flex flex-col gap-3 w-full">
                <a
                  href={`https://wa.me/9647842272224?text=${encodeURIComponent(
                    `مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي.

* تفاصيل الاتصال والاستفسار:
- الاسم: ${formData.name || 'غير مدخل'}
- الخدمة المطلوبة: ${formData.service || 'غير محددة'}
- نص الرسالة: ${formData.msg || 'بدون تفاصيل إضافية'}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-[#7A4A2A] hover:bg-[#2B1A12] text-white border border-[#7A4A2A] rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>تواصل فوري عبر الواتساب</span>
                  <MessageCircle size={16} />
                </a>
                
                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-3.5 border border-[#7A4A2A]/15 bg-[#FFFBF7]/60 hover:bg-[#F4ECE3] rounded-xl text-xs font-black text-[#2B1A12] shadow-soft transition-all"
                >
                  الرجوع للموقع
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
