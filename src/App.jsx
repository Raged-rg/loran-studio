import React, { useState, useEffect } from 'react';
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
      
      {/* Luxury Loading Intro Screen */}
      <Loader />

      {/* Header Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Structural Page Sections Wrapper */}
      <main className="max-w-7xl mx-auto overflow-hidden">
        
        {/* 1. Cinematic Hero Area */}
        <Hero setActiveSection={setActiveSection} />

        {/* 2. Services Section */}
        <Services />

        {/* 3. Why Loran Section */}
        <WhyLoran />

        {/* 4. Portfolio Showcase */}
        <Portfolio />

        {/* 5. Steps / Timeline Process */}
        <Process />

        {/* 6. Pricing & Packages */}
        <Pricing />

        {/* 7. Interactive Project Scheduler Wizard */}
        <ProjectWizard />

        {/* 8. Contact & FAQs */}
        <Contact />

      </main>

      {/* Premium Studio Brand Footer */}
      <Footer />

      {/* Floating iPhone-like Bottom Navigation Dock for Mobile view */}
      <BottomNav activeSection={activeSection} setActiveSection={setActiveSection} />

    </div>
  );
}
