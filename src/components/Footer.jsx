import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageSquare, ArrowUp, Send, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  const [btnX, setBtnX] = useState(0);
  const [btnY, setBtnY] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setBtnX((clientX - centerX) * 0.35);
    setBtnY((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    setBtnX(0);
    setBtnY(0);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const whatsappUrl = `https://wa.me/9647842272224?text=${encodeURIComponent('مرحباً، أرغب بالاستفسار عن خدمات SADEEM وتفاصيل المشاريع.')}`;

  return (
    <footer className="w-full bg-[#020817] border-t border-blue-500/15 text-[#E5E7EB] py-20 px-6 relative overflow-hidden select-none z-10">
      
      {/* Ambient Radial Lighting Overlays */}
      <div className="absolute top-0 left-[20%] w-[350px] h-[350px] rounded-full bg-[#2563EB]/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[350px] h-[350px] rounded-full bg-[#1D4ED8]/3 blur-[120px] pointer-events-none" />
 
      {/* Floating Blue Cyber Dust Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-tr from-blue-500 to-transparent pointer-events-none"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left: Math.random() * 100 + '%',
            bottom: Math.random() * 40 + '%',
          }}
          animate={{
            y: [0, -90, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
        />
      ))}
 
      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Five Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 text-right">
          
          {/* Column 1: Contact Details (lg:span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-marcellus text-sm font-semibold text-[#60A5FA] border-b border-blue-500/12 pb-3 mb-2">
              تواصل معنا
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs font-medium text-[#E5E7EB]/85">
              <li className="flex items-center justify-start gap-2.5">
                <MapPin size={14} className="text-[#3B82F6]" />
                <span>بغداد - العراق</span>
              </li>
              <li className="flex items-center justify-start gap-2.5">
                <Phone size={14} className="text-[#3B82F6]" />
                <a href="tel:+9647842272224" className="hover:text-[#60A5FA] transition-colors">07842272224</a>
              </li>
              <li className="flex items-center justify-start gap-2.5">
                <Mail size={14} className="text-[#3B82F6]" />
                <a href="mailto:info@sadeemdigital.com" className="hover:text-[#60A5FA] transition-colors">info@sadeemdigital.com</a>
              </li>
            </ul>
          </div>
 
          {/* Column 2: Information / About (lg:span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-marcellus text-sm font-semibold text-[#60A5FA] border-b border-blue-500/12 pb-3 mb-2">
              من نحن
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-medium text-[#E5E7EB]/85">
              <li>
                <button onClick={() => handleNavClick('why-sadeem')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">فريق العمل</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-sadeem')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">الرؤية والأهداف</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-sadeem')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">الأسئلة الشائعة</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-sadeem')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">سياسة الخصوصية</button>
              </li>
            </ul>
          </div>
 
          {/* Column 3: Our Services (lg:span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-marcellus text-sm font-semibold text-[#60A5FA] border-b border-blue-500/12 pb-3 mb-2">
              خدماتنا
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-medium text-[#E5E7EB]/85">
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">تصميم المواقع</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">المتاجر الإلكترونية</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">الهوية البصرية</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">واجهات UI / UX</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">التسويق الرقمي</button>
              </li>
            </ul>
          </div>
 
          {/* Column 4: Quick Links (lg:span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-marcellus text-sm font-semibold text-[#60A5FA] border-b border-blue-500/12 pb-3 mb-2">
              روابط سريعة
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-medium text-[#E5E7EB]/85">
              <li>
                <button onClick={() => handleScrollToTop()} className="hover:text-[#60A5FA] transition-colors cursor-pointer">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('portfolio')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">أعمالنا المميزة</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-[#60A5FA] transition-colors cursor-pointer">خدماتنا الإبداعية</button>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-[#60A5FA] transition-colors cursor-pointer">المدونة والمقالات</a>
              </li>
            </ul>
          </div>
 
          {/* Column 5: Newsletter Subscription (lg:span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-marcellus text-sm font-semibold text-[#60A5FA] border-b border-blue-500/12 pb-3 mb-2">
              اشترك في نشرتنا
            </h4>
            <p className="text-[10px] text-[#E5E7EB]/75 font-medium leading-relaxed mb-1">
              اشترك الآن لتصلك استراتيجيات التقنية والتسويق الحصرية.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="ادخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-blue-500/25 bg-[#030B1A]/40 text-white text-[11px] font-medium outline-none focus:border-[#3B82F6] transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-[10px] font-semibold hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {subscribed ? 'تم الاشتراك بنجاح!' : 'اشترك الآن'}
                <Send size={10} className="text-white" />
              </button>
            </form>
          </div>
 
        </div>
 
        {/* Divider and Copyright bottom segment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-blue-500/12 pt-8 text-[10px] font-medium text-[#E5E7EB]/50 text-center">
          
          {/* Logo & Brand descriptor */}
          <div className="flex items-center select-none">
            <img 
              src={logo} 
              className="h-[30px] sm:h-[34px] w-auto object-contain" 
              alt="SADEEM | سديم" 
            />
          </div>
 
          <div className="flex items-center gap-5 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5E7EB]/70 hover:text-[#60A5FA] hover:border-blue-500/30 transition-all">
              <MessageSquare size={14} />
            </a>
            <a href="https://instagram.com/sadeem_digital" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5E7EB]/70 hover:text-[#60A5FA] hover:border-blue-500/30 transition-all">
              <Instagram size={14} />
            </a>
            <a href="mailto:info@sadeemdigital.com" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5E7EB]/70 hover:text-[#60A5FA] hover:border-blue-500/30 transition-all">
              <Mail size={14} />
            </a>
          </div>
 
          <div className="flex flex-col gap-1 items-center md:items-end">
            <span>سديم • كافة الحقوق محفوظة © {new Date().getFullYear()}</span>
            <span className="text-[8px] text-[#60A5FA] font-medium flex items-center gap-1">
              صنع بشغف لأجل التميز الرقمي المطلق
              <span className="text-red-500">♥</span>
            </span>
          </div>
 
        </div>
 
      </div>
 
      {/* Floating magnetic arrow top-right (Desktop Only) */}
      <div className="absolute top-10 left-10 hidden lg:block">
        <motion.button
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleScrollToTop}
          animate={{ x: btnX, y: btnY }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#030B1A] to-[#2563EB] text-white border border-blue-500/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
 
    </footer>
  );
}

