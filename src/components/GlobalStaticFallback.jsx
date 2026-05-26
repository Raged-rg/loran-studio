import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import logoIcon from '../assets/logo-icon.png';

export default function GlobalStaticFallback() {
  return (
    <div className="min-h-screen bg-[#F7EFE6] text-[#2B1A12] flex flex-col justify-between p-6 select-none relative overflow-hidden" dir="rtl">
      
      {/* Decorative Ambient Blur spots */}
      <div className="absolute top-[10%] left-[10%] w-[180px] h-[180px] bg-[#C89B5B]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-[#7A4A2A]/4 rounded-full blur-[90px] pointer-events-none" />

      {/* Premium Header */}
      <header className="flex justify-between items-center py-4 border-b border-[#7A4A2A]/10 max-w-4xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#7A4A2A]/15 flex items-center justify-center shadow-sm bg-[#FFFBF7]/80">
            <img src={logoIcon} className="w-full h-full object-cover" alt="LORAN STUDIO" />
          </div>
          <span className="font-marcellus text-[16px] font-bold tracking-widest text-[#2B1A12]">LORAN STUDIO</span>
        </div>
        <span className="text-[9px] sm:text-[10px] px-3 py-1.5 rounded-full border border-[#C89B5B]/25 bg-[#C89B5B]/8 text-[#C89B5B] font-extrabold tracking-wide">
          النسخة السريعة والمحسنة
        </span>
      </header>

      {/* Cinematic Main Body */}
      <main className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 text-center py-16 relative z-10 my-auto">
        <span className="text-[10px] font-extrabold text-[#C89B5B] tracking-widest uppercase flex items-center gap-1 justify-center">
          <Sparkles size={11} className="text-[#C89B5B]" />
          لوران ستوديو • الفخامة الرقمية
        </span>
        
        <h1 className="font-marcellus text-4xl sm:text-5xl font-black text-[#2B1A12] leading-tight">
          لوران ستوديو
          <br />
          <span className="bg-gradient-to-r from-[#C89B5B] to-[#7A4A2A] bg-clip-text text-transparent font-extrabold text-2xl sm:text-3xl">
            الفخامة والإبداع الرقمي
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm font-bold text-[#7A4A2A] leading-relaxed max-w-md">
          نصنع تجارب رقمية فاخرة تجمع بين التصميم المبتكر والتقنية الصلبة والأداء الفائق. مرحباً بك في النسخة المباشرة والسريعة المخصصة لمتصفحات الهواتف الذكية.
        </p>

        {/* Action WhatsApp direct button */}
        <a
          href={`https://wa.me/9647842272224?text=${encodeURIComponent(
            "مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 bg-[#7A4A2A] hover:bg-[#2B1A12] text-white border border-[#7A4A2A] rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all w-full select-none"
        >
          <span>تواصل معنا عبر WhatsApp مباشرة</span>
          <MessageSquare size={16} />
        </a>

        {/* Detailed Premium services highlights */}
        <div className="w-full bg-[#FFFBF7]/60 rounded-2xl border border-[#7A4A2A]/8 p-5 mt-6 text-right flex flex-col gap-2 font-bold text-[11px] text-[#2B1A12] shadow-soft">
          <div className="border-b border-[#7A4A2A]/10 pb-2 text-center text-xs font-black text-[#7A4A2A]">خدماتنا المتميزة</div>
          <div className="flex justify-between mt-1">
            <span>• المتاجر الإلكترونية الفاخرة</span>
            <span className="text-[#C89B5B] font-extrabold">تصميم UI/UX مخصص</span>
          </div>
          <div className="flex justify-between">
            <span>• المواقع التعريفية للشركات</span>
            <span className="text-[#C89B5B] font-extrabold">أداء Apple-smooth فائق</span>
          </div>
          <div className="flex justify-between">
            <span>• إدارة السوشيال ميديا والتسويق</span>
            <span className="text-[#C89B5B] font-extrabold">نمو ومبيعات حقيقية</span>
          </div>
          <div className="flex justify-between">
            <span>• أنظمة برمجية وسكربتات مخصصة</span>
            <span className="text-[#C89B5B] font-extrabold">أتمتة وحلول برمجية خاصة</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-[#7A4A2A]/60 font-bold border-t border-[#7A4A2A]/10 py-4 max-w-4xl mx-auto w-full relative z-10">
        © {new Date().getFullYear()} لوران ستوديو • كافة الحقوق محفوظة
      </footer>

    </div>
  );
}
