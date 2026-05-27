import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smile, Briefcase, Trophy, Heart } from 'lucide-react';

function StatItem({ icon: Icon, value, label, suffix = '', prefix = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value);
    if (isNaN(end) || start === end) return;

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 1000 / 40);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }}
      className="flex flex-col items-center p-6 md:p-8 rounded-[24px] border border-[#C8A97E]/12 bg-[#FFFDF9]/60 backdrop-blur-md text-center shadow-soft hover:border-[#C8A97E]/40 hover:shadow-premium transition-all duration-300 group flex-grow"
    >
      <div className="w-12 h-12 rounded-full bg-[#C8A97E]/10 flex items-center justify-center text-[#C8A97E] mb-4 group-hover:scale-105 group-hover:bg-[#C8A97E] group-hover:text-[#3A2B24] transition-all duration-300">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span className="font-marcellus text-3xl md:text-4xl font-semibold text-[#3A2B24] mb-2 leading-none">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-xs md:text-sm font-medium text-[#3A2B24]/80">{label}</span>
    </motion.div>
  );
}

export default function Stats() {
  const statsList = [
    { icon: Smile, value: '120', label: 'شراكة نجاح متميزة', suffix: '+', delay: 0 },
    { icon: Briefcase, value: '350', label: 'تحفة رقمية استثنائية', suffix: '+', delay: 0.1 },
    { icon: Trophy, value: '8', label: 'سنوات من الريادة الفنية', suffix: '+', delay: 0.2 },
    { icon: Heart, value: '98', label: 'معدل رضا وثقة شركائنا', suffix: '%', delay: 0.3 }
  ];

  return (
    <section id="stats" className="py-16 max-w-7xl mx-auto px-6 relative overflow-hidden select-none">
      {/* Background Soft Gradients */}
      <div className="absolute top-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-[#C8A97E]/4 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[180px] h-[180px] rounded-full bg-[#3A2B24]/3 blur-[75px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {statsList.map((stat, i) => (
          <StatItem
            key={i}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            suffix={stat.suffix}
            delay={stat.delay}
          />
        ))}
      </div>
    </section>
  );
}
