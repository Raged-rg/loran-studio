import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyLoran from './components/WhyLoran';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import ProjectWizard from './components/ProjectWizard';
import Contact from './components/Contact';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Handle Automatic Section Tracking on Scroll (IntersectionObserver)
  useEffect(() => {
    const sections = ['home', 'services', 'why-loran', 'portfolio', 'process', 'pricing', 'wizard', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the major center view
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen pb-safe">
      
      {/* 👑 Film Grain Noise Overlay (Awwwards/Cuberto luxury texture) */}
      <div className="grain-noise-overlay" />

      {/* 👑 Custom Luxury Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Luxury Loading Intro Screen */}
      <Loader />

      {/* Header Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Structural Page Sections Wrapper */}
      <main className="max-w-7xl mx-auto overflow-hidden">
        
        {/* 1. Cinematic Hero Area (Has internal parallax and counters) */}
        <Hero setActiveSection={setActiveSection} />

        {/* 2. Services Section with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Services />
        </motion.div>

        {/* 3. Why Loran Section with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <WhyLoran />
        </motion.div>

        {/* 4. Portfolio Showcase with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Portfolio />
        </motion.div>

        {/* 5. Steps / Timeline Process with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Process />
        </motion.div>

        {/* 6. Pricing & Packages with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Pricing />
        </motion.div>

        {/* 7. Interactive Project Scheduler Wizard with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <ProjectWizard />
        </motion.div>

        {/* 8. Contact & FAQs with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Contact />
        </motion.div>

      </main>

      {/* Premium Studio Brand Footer */}
      <Footer />

      {/* Floating iPhone-like Bottom Navigation Dock for Mobile view */}
      <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />

    </div>
  );
}
