import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Globe, Share2, Megaphone, Code, Palette, 
  FileText, DollarSign, Phone, CheckCircle, ArrowRight, 
  ArrowLeft, Check, Sparkles, Send, MessageCircle, AlertCircle, Edit2,
  Briefcase, X
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
    
    const pullX = (clientX - centerX) * 0.35;
    const pullY = (clientY - centerY) * 0.35;
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
}

// Interactive 3D Card for Step 1
function OptionCard({ label, icon: Icon, isSelected, onClick }) {
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
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      whileTap={{ scale: 0.96 }}
      className={`relative p-6 rounded-2xl border text-right cursor-pointer select-none transition-all duration-300 flex flex-col justify-between h-36 ${
        isSelected
          ? 'bg-[#3A2B24] border-[#C8A97E] text-white shadow-premium scale-[1.02] z-10'
          : 'glass-card text-[#3A2B24] border-[#3A2B24]/12 hover:border-[#C8A97E]/60 hover:bg-[#FFFDF9]/80 shadow-soft'
      }`}
    >
      <div className="flex justify-between items-start w-full">
        <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-white/15 text-white' : 'bg-[#3A2B24]/8 text-[#3A2B24]'}`}>
          <Icon size={20} />
        </div>
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
          isSelected ? 'bg-[#C8A97E] border-[#C8A97E] text-white' : 'border-[#3A2B24]/20 bg-white/40'
        }`}>
          {isSelected && <Check size={10} strokeWidth={3} />}
        </div>
      </div>
      <span className="text-xs sm:text-sm font-semibold tracking-wide" style={{ transform: 'translateZ(20px)' }}>
        {label}
      </span>
    </motion.div>
  );
}

// Floating Label input field for Step 2 and Step 4
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
        className={`w-full h-14 px-4 pt-4 rounded-xl border bg-[#FFFDF9]/40 text-xs sm:text-sm font-medium text-[#3A2B24] focus:outline-none transition-all duration-300 shadow-soft ${
          isFocused 
            ? 'border-[#C8A97E] ring-2 ring-[#C8A97E]/10 bg-[#FFFDF9]/80' 
            : 'border-[#3A2B24]/12 hover:border-[#3A2B24]/25'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute right-4 pointer-events-none transition-all duration-300 font-medium ${
          isFocused || hasValue
            ? 'top-1 text-[9px] text-[#C8A97E]'
            : 'top-4 text-xs text-[#3A2B24]/40'
        }`}
      >
        {label} {required && '*'}
      </label>
    </div>
  );
}

// Floating Label textarea for Step 2 description
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
        className={`w-full p-4 pt-6 rounded-xl border bg-[#FFFDF9]/40 text-xs sm:text-sm font-medium text-[#3A2B24] focus:outline-none transition-all duration-300 shadow-soft resize-none ${
          isFocused 
            ? 'border-[#C8A97E] ring-2 ring-[#C8A97E]/10 bg-[#FFFDF9]/80' 
            : 'border-[#3A2B24]/12 hover:border-[#3A2B24]/25'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute right-4 pointer-events-none transition-all duration-300 font-medium ${
          isFocused || hasValue
            ? 'top-1.5 text-[9px] text-[#C8A97E]'
            : 'top-4 text-xs text-[#3A2B24]/40'
        }`}
      >
        {label} {required && '*'}
      </label>
      <span className="absolute bottom-2 left-4 text-[9px] text-[#3A2B24]/50 font-medium">
        {value.length}/{maxLength}
      </span>
    </div>
  );
}

export default function ProjectWizard({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const [formData, setFormData] = useState({
    projectType: '', 
    projectName: '', 
    projectDesc: '', 
    businessType: '', 
    pagesCount: 5, 
    hasIdentity: 'لا', 
    budget: 3000, 
    timeline: 'شهر إلى شهرين', 
    isUrgent: 'عادي', 
    clientName: '', 
    clientPhone: '', 
    clientEmail: '', 
    clientWhatsapp: '', 
    clientInstagram: ''
  });

  const steps = [
    { label: 'نوع المشروع', icon: Briefcase },
    { label: 'تفاصيل المشروع', icon: FileText },
    { label: 'الميزانية والمدة', icon: DollarSign },
    { label: 'معلومات التواصل', icon: Phone },
    { label: 'مراجعة الطلب', icon: CheckCircle }
  ];

  const projectTypes = [
    { id: 'store', label: 'متجر إلكتروني', icon: ShoppingBag },
    { id: 'company', label: 'موقع شركة', icon: Globe },
    { id: 'social', label: 'إدارة سوشيال ميديا', icon: Share2 },
    { id: 'ads', label: 'حملات إعلانية', icon: Megaphone },
    { id: 'script', label: 'سكربت خاص', icon: Code },
    { id: 'identity', label: 'هوية بصرية', icon: Palette }
  ];

  const timeframes = ['أقل من شهر', 'شهر إلى شهرين', '3 أشهر فما فوق'];
  const urgencies = ['نعم، مستعجل جداً', 'عادي', 'غير مستعجل'];
  const identityStatuses = ['نعم', 'لا', 'قيد التطوير'];

  const magneticPrev = useMagnetic();
  const magneticNext = useMagnetic();
  const magneticSubmit = useMagnetic();

  const handleInputChange = (field, value) => {
    setValidationError('');
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const scrollToWizardTop = () => {
    const el = document.getElementById('wizard');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.projectType) {
        setValidationError('يرجى اختيار نوع المشروع للمتابعة.');
        return false;
      }
    }
    if (currentStep === 1) {
      if (!formData.projectName.trim()) {
        setValidationError('يرجى إدخال اسم المشروع.');
        return false;
      }
      if (!formData.projectDesc.trim()) {
        setValidationError('يرجى كتابة وصف مختصر للمشروع.');
        return false;
      }
      if (!formData.businessType.trim()) {
        setValidationError('يرجى إدخال نوع النشاط.');
        return false;
      }
    }
    if (currentStep === 3) {
      if (!formData.clientName.trim()) {
        setValidationError('يرجى إدخال اسمك الكريم.');
        return false;
      }
      if (!formData.clientPhone.trim() && !formData.clientWhatsapp.trim()) {
        setValidationError('يرجى إدخال رقم الهاتف أو رقم الواتساب للتواصل.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      scrollToWizardTop();
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setCurrentStep(prev => Math.max(prev - 1, 0));
    scrollToWizardTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setShowSuccessModal(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // Reset wizard
    setFormData({
      projectType: '', 
      projectName: '', 
      projectDesc: '', 
      businessType: '', 
      pagesCount: 5, 
      hasIdentity: 'لا', 
      budget: 3000, 
      timeline: 'شهر إلى شهرين', 
      isUrgent: 'عادي', 
      clientName: '', 
      clientPhone: '', 
      clientEmail: '', 
      clientWhatsapp: '', 
      clientInstagram: ''
    });
    setCurrentStep(0);
    if (onClose) onClose();
  };

  // Brief dynamic text descriptor for current selected service type
  const getSelectedTypeLabel = () => {
    const matched = projectTypes.find(t => t.id === formData.projectType || t.label === formData.projectType);
    return matched ? matched.label : formData.projectType || 'غير محدد';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-[#3A2B24]/60 backdrop-blur-xl overflow-y-auto py-6 sm:py-10 px-4 sm:px-6 md:px-10 flex justify-center items-start">
      <div className="absolute inset-0 cursor-pointer fixed h-full w-full" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-[#F7F2EC] rounded-[28px] sm:rounded-[36px] border border-[#C8A97E]/20 shadow-premium p-5 sm:p-8 md:p-10 overflow-hidden select-none z-10 my-auto text-right">
        
        {/* Close Button top-left */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2.5 rounded-full border border-[#C8A97E]/15 bg-[#FFFDF9]/85 text-[#3A2B24] hover:bg-[#E8DDD0] transition-all cursor-pointer z-[20]"
          aria-label="إغلاق نافذة التخطيط"
        >
          <X size={16} />
        </button>

        {/* Background Soft Lighting Glows */}
        <div className="absolute top-[20%] right-[5%] w-[220px] h-[220px] rounded-full bg-[#C8A97E]/5 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[5%] w-[220px] h-[220px] rounded-full bg-[#3A2B24]/4 blur-[90px] pointer-events-none" />

        {/* PAGE INTRO */}
        <div className="text-center flex flex-col items-center gap-2 mb-10 relative z-10 pr-6 pl-6">
          <span className="px-4 py-1.5 rounded-full border border-[#C8A97E]/30 bg-[#C8A97E]/8 text-[#C8A97E] font-semibold text-[10px] tracking-widest uppercase">
            مخطط مشروعك الرقمي
          </span>
          
          <h2 className="font-marcellus text-2xl md:text-4xl font-semibold text-[#3A2B24] leading-tight">
            دعنا نبني مشروعك الرقمي خطوة بخطوة
          </h2>
          
          <p className="max-w-xl text-[#3A2B24]/80 font-medium text-xs sm:text-sm leading-relaxed">
            أجب عن بعض الأسئلة السريعة لنفهم احتياج مشروعك ونقدّم لك أفضل حل ممكن وبأعلى كفاءة.
          </p>
        </div>

        {/* MULTI STEP WIZARD FLOATING GLASS PANEL */}
        <div className="relative w-full z-10">
        
        {/* Step Indicator and Elegant Gold Progress Line */}
        <div className="relative flex items-center justify-between mb-16 px-4 select-none">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#3A2B24]/10 -translate-y-1/2 z-0" />
          
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] bg-[#C8A97E] -translate-y-1/2 z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />

          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <button
                  type="button"
                  disabled={!isCompleted && idx !== currentStep}
                  onClick={() => {
                    setCurrentStep(idx);
                    scrollToWizardTop();
                  }}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#3A2B24] border-[#C8A97E] text-white font-semibold shadow-md scale-110'
                      : isCompleted
                        ? 'bg-[#C8A97E] border-[#C8A97E] text-white shadow-soft'
                        : 'bg-[#FFFDF9] border-[#3A2B24]/12 text-[#3A2B24]/40 font-medium hover:border-[#3A2B24]/30'
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : idx + 1}
                </button>
                <span
                  className={`hidden md:block text-[10px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? 'text-[#3A2B24] scale-105' : 'text-[#3A2B24]/40'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Error Box */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs font-medium flex items-center gap-2"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{validationError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Main Glass Panel */}
        <motion.div
          layout
          className="glass-card rounded-3xl p-6 md:p-12 border border-[#3A2B24]/12 shadow-premium relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: نوع المشروع */}
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="mb-4">
                    <h3 className="font-marcellus text-lg sm:text-xl font-semibold text-[#3A2B24]">ما نوع المشروع الذي تحتاجه؟</h3>
                    <p className="text-xs text-[#3A2B24] font-medium mt-1">اختر إحدى الفئات التالية لنقوم بتخصيص باقي الخطوات لمشروعك.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <OptionCard
                        key={type.id}
                        label={type.label}
                        icon={type.icon}
                        isSelected={formData.projectType === type.label}
                        onClick={() => handleInputChange('projectType', type.label)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: تفاصيل المشروع */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="mb-4">
                    <h3 className="font-marcellus text-lg sm:text-xl font-semibold text-[#3A2B24]">تفاصيل مشروعك وفكرته الرئيسية</h3>
                    <p className="text-xs text-[#3A2B24] font-medium mt-1">أدخل معلومات المشروع لمساعدتنا في تصور الأبعاد الفنية والهوية.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="اسم المشروع / البراند"
                      id="projectName"
                      required
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      placeholder="مثال: لوران فاشن، نجد للمقاولات"
                    />
                    <FloatingInput
                      label="نوع النشاط التجاري"
                      id="businessType"
                      required
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      placeholder="مثال: أزياء وموضة، مطاعم فاخرة، عقارات"
                    />
                  </div>

                  <FloatingTextarea
                    label="وصف مختصر لمشروعك ورؤيتك للفكرة"
                    id="projectDesc"
                    required
                    value={formData.projectDesc}
                    onChange={(e) => handleInputChange('projectDesc', e.target.value)}
                  />

                  {/* Number of Pages range input / custom number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 items-center">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs font-medium text-[#3A2B24]">
                        <span>عدد الصفحات التقريبي المطلوب</span>
                        <span className="text-[#C8A97E] font-semibold">{formData.pagesCount} صفحات</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={formData.pagesCount}
                        onChange={(e) => handleInputChange('pagesCount', parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg bg-[#3A2B24]/10 appearance-none cursor-pointer accent-[#3A2B24] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium text-[#3A2B24]">هل لديك هوية بصرية مسبقة؟</span>
                      <div className="flex gap-2">
                        {identityStatuses.map((status) => {
                          const isSelected = formData.hasIdentity === status;
                          return (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleInputChange('hasIdentity', status)}
                              className={`flex-1 py-3 text-xs font-medium rounded-xl border transition-all ${
                                isSelected
                                  ? 'bg-[#3A2B24] border-[#C8A97E] text-white shadow-soft'
                                  : 'bg-[#FFFDF9]/60 border-[#3A2B24]/12 text-[#3A2B24]/70 hover:bg-[#E8DDD0]/50'
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: الميزانية والمدة */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="mb-4">
                    <h3 className="font-marcellus text-lg sm:text-xl font-semibold text-[#3A2B24]">الميزانية المتوقعة والخط الزمني</h3>
                    <p className="text-xs text-[#3A2B24] font-medium mt-1">حدّد النطاق الاستثماري والوقت الملائم لتسليم المشروع بنجاح.</p>
                  </div>

                  {/* Luxury Range Slider for Budget */}
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#3A2B24]">الميزانية المتوقعة للاستثمار</span>
                      <span className="text-base sm:text-lg font-marcellus font-semibold text-[#C8A97E] bg-[#3A2B24]/8 px-4 py-1.5 rounded-xl border border-[#C8A97E]/20">
                        ${formData.budget.toLocaleString()}
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="500"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg bg-[#3A2B24]/10 appearance-none cursor-pointer accent-[#3A2B24] focus:outline-none"
                    />
                    
                    <div className="flex justify-between text-[10px] text-[#3A2B24]/60 font-medium px-1">
                      <span>$500</span>
                      <span>$5,000</span>
                      <span>$10,000</span>
                      <span>$15,000+</span>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-[#E8DDD0]/50 border border-[#3A2B24]/8 text-center text-xs font-medium text-[#3A2B24] italic">
                      {formData.budget <= 1500 && "• باقة البداية: ملائمة للمشاريع التعريفية والمتاجر المبسطة."}
                      {formData.budget > 1500 && formData.budget <= 5000 && "• باقة الأعمال: مثالية للشركات والمتاجر الاحترافية التي تطمح للنمو القوي."}
                      {formData.budget > 5000 && formData.budget <= 10000 && "• باقة النخبة: أنظمة مخصصة و3D Animations مصممة للتميز الإبداعي الفاخر."}
                      {formData.budget > 10000 && "• حلول النخبة المتكاملة: برمجة سكربتات خاصة وخطط تسويقية استراتيجية للتوسع الشامل."}
                    </div>
                  </div>

                  {/* Grid for timeline & urgency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    
                    {/* Timeframe */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium text-[#3A2B24] flex items-center gap-1.5">
                        <DollarSign size={14} className="text-[#C8A97E]" />
                        المدة الزمنية المتوقعة للتسليم
                      </span>
                      <div className="flex flex-col gap-2">
                        {timeframes.map((t) => {
                          const isSelected = formData.timeline === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => handleInputChange('timeline', t)}
                              className={`w-full py-3 px-4 text-right text-xs font-medium rounded-xl border transition-all ${
                                isSelected
                                  ? 'bg-[#3A2B24] border-[#C8A97E] text-white shadow-soft'
                                  : 'bg-[#FFFDF9]/60 border-[#3A2B24]/12 text-[#3A2B24]/70 hover:bg-[#E8DDD0]/50'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Urgency */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium text-[#3A2B24]">هل إطلاق هذا المشروع مستعجل؟</span>
                      <div className="flex flex-col gap-2">
                        {urgencies.map((u) => {
                          const isSelected = formData.isUrgent === u;
                          return (
                            <button
                              key={u}
                              type="button"
                              onClick={() => handleInputChange('isUrgent', u)}
                              className={`w-full py-3 px-4 text-right text-xs font-medium rounded-xl border transition-all ${
                                isSelected
                                  ? 'bg-[#3A2B24] border-[#C8A97E] text-white shadow-soft'
                                  : 'bg-[#FFFDF9]/60 border-[#3A2B24]/12 text-[#3A2B24]/70 hover:bg-[#E8DDD0]/50'
                              }`}
                            >
                              {u}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 4: معلومات التواصل */}
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="mb-4">
                    <h3 className="font-marcellus text-lg sm:text-xl font-semibold text-[#3A2B24]">معلومات الاتصال بك</h3>
                    <p className="text-xs text-[#3A2B24] font-medium mt-1">كيف يمكن لمستشار الهوية الرقمية في لوران التواصل معك لعرض التفاصيل؟</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="الاسم الكامل"
                      id="clientName"
                      required
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      placeholder="أدخل اسمك الكريم"
                    />
                    <FloatingInput
                      label="رقم الهاتف للتواصل"
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                      placeholder="مثال: 009665xxxxxxxx"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="رقم الواتساب"
                      id="clientWhatsapp"
                      value={formData.clientWhatsapp}
                      onChange={(e) => handleInputChange('clientWhatsapp', e.target.value)}
                      placeholder="مثال: 009665xxxxxxxx"
                    />
                    <FloatingInput
                      label="حساب إنستغرام (إن وجد)"
                      id="clientInstagram"
                      value={formData.clientInstagram}
                      onChange={(e) => handleInputChange('clientInstagram', e.target.value)}
                      placeholder="مثال: username"
                    />
                  </div>

                  <FloatingInput
                    label="البريد الإلكتروني"
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    placeholder="مثال: name@domain.com"
                  />
                </motion.div>
              )}

              {/* STEP 5: مراجعة الطلب */}
              {currentStep === 4 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="mb-4">
                    <h3 className="font-marcellus text-lg sm:text-xl font-semibold text-[#3A2B24]">مراجعة وتأكيد وثيقة طلبك</h3>
                    <p className="text-xs text-[#3A2B24] font-medium mt-1">راجع كافة التفاصيل المحددة مسبقاً قبل الإرسال الرسمي للطلب.</p>
                  </div>

                  {/* Luxury Summary Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right text-xs font-medium text-[#3A2B24]">
                    
                    {/* Section 1 Type */}
                    <div className="relative p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3A2B24] text-[10px]">نوع المشروع المطلوبة:</span>
                        <span className="text-sm font-semibold text-[#3A2B24]">{getSelectedTypeLabel()}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setCurrentStep(0); scrollToWizardTop(); }}
                        className="p-2 text-[#3A2B24]/50 hover:text-[#C8A97E] transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>

                    {/* Section 2 Name */}
                    <div className="relative p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3A2B24] text-[10px]">اسم المشروع والنشاط:</span>
                        <span className="text-sm font-semibold text-[#3A2B24]">{formData.projectName} • {formData.businessType}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setCurrentStep(1); scrollToWizardTop(); }}
                        className="p-2 text-[#3A2B24]/50 hover:text-[#C8A97E] transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>

                    {/* Section 3 Budget/Timeline */}
                    <div className="relative p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3A2B24] text-[10px]">الاستثمار والمدة الزمنية:</span>
                        <span className="text-sm font-semibold text-[#3A2B24]">${formData.budget.toLocaleString()} • {formData.timeline} ({formData.isUrgent})</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setCurrentStep(2); scrollToWizardTop(); }}
                        className="p-2 text-[#3A2B24]/50 hover:text-[#C8A97E] transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>

                    {/* Section 4 Contacts */}
                    <div className="relative p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#3A2B24] text-[10px]">معلومات العميل للتواصل:</span>
                        <span className="text-sm font-semibold text-[#3A2B24]">{formData.clientName} • {formData.clientPhone || formData.clientWhatsapp}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setCurrentStep(3); scrollToWizardTop(); }}
                        className="p-2 text-[#3A2B24]/50 hover:text-[#C8A97E] transition-colors"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>

                    {/* Description Text block */}
                    <div className="relative p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 md:col-span-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[#3A2B24] text-[10px]">تفاصيل الفكرة والشرح:</span>
                        <button 
                          type="button" 
                          onClick={() => { setCurrentStep(1); scrollToWizardTop(); }}
                          className="p-2 text-[#3A2B24]/50 hover:text-[#C8A97E] transition-colors"
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                      <p className="text-[#3A2B24]/80 leading-relaxed font-medium mt-1 text-xs">{formData.projectDesc}</p>
                    </div>

                    {/* Meta stats page limits */}
                    <div className="p-4 bg-[#E8DDD0]/50 rounded-2xl border border-[#3A2B24]/8 md:col-span-2 flex justify-between items-center text-xs">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-[#3A2B24] text-[10px]">عدد صفحات المنصة: </span>
                          <span className="font-semibold text-[#3A2B24]">{formData.pagesCount}</span>
                        </div>
                        <div>
                          <span className="text-[#3A2B24] text-[10px]">الهوية البصرية مسبقاً: </span>
                          <span className="font-semibold text-[#3A2B24]">{formData.hasIdentity}</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        جاهز للمراجعة الفنية 
                        <Check size={12} />
                      </span>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between border-t border-[#3A2B24]/10 pt-6 mt-8">
                {currentStep > 0 ? (
                  <motion.button
                    ref={magneticPrev.ref}
                    onMouseMove={magneticPrev.handleMouseMove}
                    onMouseLeave={magneticPrev.handleMouseLeave}
                    type="button"
                    onClick={handlePrev}
                    animate={{ x: magneticPrev.position.x, y: magneticPrev.position.y }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="flex items-center gap-2 px-5 py-3.5 border border-[#3A2B24]/15 bg-[#FFFDF9]/80 rounded-xl text-xs font-semibold text-[#3A2B24] shadow-soft hover:bg-[#E8DDD0] transition-all cursor-pointer"
                  >
                    <ArrowRight size={14} />
                    <span>الخطوة السابقة</span>
                  </motion.button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length - 1 ? (
                  <motion.button
                    ref={magneticNext.ref}
                    onMouseMove={magneticNext.handleMouseMove}
                    onMouseLeave={magneticNext.handleMouseLeave}
                    type="button"
                    onClick={handleNext}
                    animate={{ x: magneticNext.position.x, y: magneticNext.position.y }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#3A2B24] text-white rounded-xl text-xs font-semibold shadow-md border border-[#3A2B24] hover:bg-[#3A2B24] transition-all cursor-pointer select-none"
                  >
                    <span>الخطوة التالية</span>
                    <ArrowLeft size={14} />
                  </motion.button>
                ) : (
                  <motion.button
                    ref={magneticSubmit.ref}
                    onMouseMove={magneticSubmit.handleMouseMove}
                    onMouseLeave={magneticSubmit.handleMouseLeave}
                    type="submit"
                    animate={{ x: magneticSubmit.position.x, y: magneticSubmit.position.y }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3A2B24] to-[#3A2B24] text-white rounded-xl text-xs font-semibold shadow-lg border border-[#C8A97E]/30 cursor-pointer select-none hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span>إرسال الطلب</span>
                    <Send size={14} className="text-[#C8A97E] ml-0.5" />
                  </motion.button>
                )}
              </div>

            </form>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* CINEMATIC SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#3A2B24]/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 110, damping: 16 }}
              className="relative max-w-md w-full glass-card rounded-3xl p-8 border border-[#C8A97E]/30 shadow-premium text-center flex flex-col items-center"
            >
              {/* Victory checkmark icon */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#3A2B24] to-[#3A2B24] flex items-center justify-center border-2 border-[#C8A97E] shadow-lg mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1.25, 1], rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                >
                  <Check className="text-[#C8A97E]" size={36} strokeWidth={3.5} />
                </motion.div>
              </div>

              <h3 className="font-marcellus text-2xl font-semibold text-[#3A2B24] mb-3">تم إرسال طلبك بنجاح</h3>
              <p className="text-xs sm:text-sm font-medium text-[#3A2B24] leading-relaxed mb-8">
                لقد تم تلقي مواصفات وطلبات مشروعك <strong>"{formData.projectName}"</strong> بنجاح. سيقوم مهندسو التصميم والهوية بدراسة تفاصيلك وصياغة العرض التقني المخصص لك خلال 12 ساعة كحد أقصى.
              </p>

              {/* Receipt Summary Details */}
              <div className="w-full bg-[#FFFDF9]/60 rounded-2xl border border-[#3A2B24]/8 p-4 mb-8 text-right flex flex-col gap-2 font-medium text-[11px] text-[#3A2B24]">
                <div className="border-b border-[#3A2B24]/10 pb-2 text-center text-xs font-semibold text-[#3A2B24]">إيصال التخطيط الذكي</div>
                <div className="flex justify-between mt-1">
                  <span className="text-[#3A2B24]/80 font-medium">الرقم التعريفي للطلب:</span>
                  <span className="font-semibold text-[#3A2B24]">LRN-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2B24]/80 font-medium">الخدمة المطلوبة:</span>
                  <span className="font-semibold text-[#3A2B24]">{getSelectedTypeLabel()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2B24]/80 font-medium">الميزانية الاستثمارية:</span>
                  <span className="font-semibold text-[#3A2B24]">${formData.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3A2B24]/80 font-medium">الوقت المطلوب:</span>
                  <span className="font-semibold text-[#3A2B24]">{formData.timeline}</span>
                </div>
                <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-[#3A2B24]/8">
                  <span className="text-[#3A2B24]/80 font-medium">حالة الاستشارة الأولية:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                    مؤهلة للمراجعة المجانية 
                    <Check size={10} strokeWidth={3} />
                  </span>
                </div>
              </div>

              {/* WhatsApp direct contact and return button */}
              <div className="flex flex-col gap-3 w-full">
                <a
                  href={`https://wa.me/9647842272224?text=${encodeURIComponent(
                    `مرحباً، أرغب بالاستفسار عن خدمات LORAN STUDIO وتنفيذ مشروع احترافي.

* تفاصيل الطلب المقدم:
- الاسم: ${formData.clientName || 'غير مدخل'}
- الخدمة/نوع المشروع: ${getSelectedTypeLabel()}
- الميزانية الاستثمارية: $${formData.budget ? formData.budget.toLocaleString() : 'غير محددة'}
- مدة التنفيذ المتوقعة: ${formData.timeline || 'غير محددة'}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-[#3A2B24] hover:bg-[#3A2B24] text-white border border-[#3A2B24] rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>تواصل معنا عبر WhatsApp مباشرة</span>
                  <MessageCircle size={16} />
                </a>
                
                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-3.5 border border-[#3A2B24]/15 bg-[#FFFDF9]/60 hover:bg-[#E8DDD0] rounded-xl text-xs font-semibold text-[#3A2B24] shadow-soft transition-all"
                >
                  الرجوع للموقع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
