import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';

export default function GlobalStaticFallback() {
  return (
    <div className="min-h-screen bg-[#020817] text-[#E5E7EB] flex flex-col justify-between p-6 select-none relative overflow-hidden" dir="rtl">
      
      {/* Decorative Ambient Blur spots */}
      <div className="absolute top-[10%] left-[10%] w-[180px] h-[180px] bg-[#2563EB]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-[#1D4ED8]/4 rounded-full blur-[90px] pointer-events-none" />

      {/* Premium Header */}
      <header className="flex justify-between items-center py-4 border-b border-blue-500/10 max-w-4xl mx-auto w-full relative z-10">
        <div className="flex items-center select-none">
          <img 
            src={logo} 
            className="h-6 w-auto object-contain" 
            alt="SADEEM | سديم" 
          />
        </div>
        <span className="text-[9px] sm:text-[10px] px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-[#60A5FA] font-extrabold tracking-wide">
          النسخة السريعة والمحسنة
        </span>
      </header>

      {/* Cinematic Main Body */}
      <main className="max-w-xl mx-auto flex flex-col items-center justify-center gap-6 text-center py-16 relative z-10 my-auto">
        <span className="text-[10px] font-extrabold text-[#60A5FA] tracking-widest uppercase flex items-center gap-1 justify-center">
          <Sparkles size={11} className="text-[#60A5FA]" />
          سديم • الفخامة الرقمية
        </span>
        
        <h1 className="font-marcellus text-4xl sm:text-5xl font-black text-white leading-tight">
          SADEEM | سديم
          <br />
          <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent font-extrabold text-2xl sm:text-3xl">
            الفخامة والإبداع الرقمي
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm font-bold text-[#94A3B8] leading-relaxed max-w-md">
          نصنع تجارب رقمية فاخرة تجمع بين التصميم المبتكر والتقنية الصلبة والأداء الفائق. مرحباً بك في النسخة المباشرة والسريعة المخصصة لمتصفحات الهواتف الذكية.
        </p>

        {/* Action WhatsApp direct button */}
        <a
          href={`https://wa.me/9647842272224?text=${encodeURIComponent(
            "مرحباً، أرغب بالاستفسار عن خدمات SADEEM وتنفيذ مشروع احترافي."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all w-full select-none"
        >
          <span>تواصل معنا عبر WhatsApp مباشرة</span>
          <MessageSquare size={16} />
        </a>

        {/* Detailed Premium services highlights */}
        <div className="w-full bg-[#030B1A]/60 rounded-2xl border border-blue-500/10 p-5 mt-6 text-right flex flex-col gap-2 font-bold text-[11px] text-white shadow-soft">
          <div className="border-b border-blue-500/10 pb-2 text-center text-xs font-black text-[#60A5FA]">خدماتنا المتميزة</div>
          <div className="flex justify-between mt-1">
            <span>• المتاجر الإلكترونية الفاخرة</span>
            <span className="text-[#60A5FA] font-extrabold">تصميم UI/UX مخصص</span>
          </div>
          <div className="flex justify-between">
            <span>• المواقع التعريفية للشركات</span>
            <span className="text-[#60A5FA] font-extrabold">أداء Apple-smooth فائق</span>
          </div>
          <div className="flex justify-between">
            <span>• إدارة السوشيال ميديا والتسويق</span>
            <span className="text-[#60A5FA] font-extrabold">نمو ومبيعات حقيقية</span>
          </div>
          <div className="flex justify-between">
            <span>• أنظمة برمجية وسكربتات مخصصة</span>
            <span className="text-[#60A5FA] font-extrabold">أتمتة وحلول برمجية خاصة</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-[#94A3B8]/60 font-bold border-t border-blue-500/10 py-4 max-w-4xl mx-auto w-full relative z-10">
        © {new Date().getFullYear()} سديم • كافة الحقوق محفوظة
      </footer>

    </div>
  );
}
