import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhySadeem from './components/WhySadeem';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import BeforeAfter from './components/BeforeAfter';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Contact from './components/Contact';
import ProjectWizard from './components/ProjectWizard';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Handle Automatic Section Tracking on Scroll (IntersectionObserver)
  useEffect(() => {
    const sections = ['home', 'services', 'portfolio', 'why-sadeem', 'process', 'testimonials', 'pricing', 'before-after', 'stats', 'cta', 'contact'];
    
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
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onOpenWizard={() => setIsWizardOpen(true)} 
      />

      {/* Main Structural Page Sections Wrapper */}
      <main className="max-w-7xl mx-auto overflow-hidden">
        
        {/* 1. Cinematic Hero Area */}
        <Hero 
          setActiveSection={setActiveSection} 
          onOpenWizard={() => setIsWizardOpen(true)} 
        />

        {/* 2. Services Section with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Services />
        </motion.div>

        {/* 3. Portfolio Showcase with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Portfolio />
        </motion.div>

        {/* 3.5. Why Sadeem / About Us Section with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <WhySadeem />
        </motion.div>

        {/* 3.6. Process / Way of Work Roadmap Timeline with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Process />
        </motion.div>

        {/* 3.7. Testimonials Review Carousel with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Testimonials />
        </motion.div>

        {/* 3.8. Premium Pricing Packages with Cinematic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Pricing />
        </motion.div>

        {/* 4. Before / After Interactive Draggable Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <BeforeAfter />
        </motion.div>

        {/* 5. Stats Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <Stats />
        </motion.div>

        {/* 6. CTA / Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <CTA setActiveSection={setActiveSection} onOpenWizard={() => setIsWizardOpen(true)} />
        </motion.div>

        {/* 7. Contact / FAQ Section with Cinematic Reveal */}
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
      <BottomNav 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onOpenWizard={() => setIsWizardOpen(true)} 
      />

      {/* Full-screen Interactive Project Scheduler Wizard Modal Overlay */}
      <AnimatePresence>
        {isWizardOpen && (
          <ProjectWizard 
            isOpen={isWizardOpen} 
            onClose={() => setIsWizardOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
