import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ShoppingBag, Globe, Share2, Megaphone, FileText, Palette, Code, CheckCircle2 } from 'lucide-react';

export default function ThreeDIcons({ type = 'bag' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [has3DError, setHas3DError] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // 1. Lazy viewport observer to prevent rendering all 3D icons at the same time
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInViewport(true);
          }
        },
        { 
          threshold: 0.05, 
          rootMargin: '100px' // Load slightly before it scrolls into view
        }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    } catch (e) {
      console.warn("IntersectionObserver not supported, rendering immediately", e);
      setIsInViewport(true);
    }
  }, []);

  // 2. Safe WebGL Rendering Engine
  useEffect(() => {
    if (!isInViewport) return; // Lazy lock: Wait until visible
    if (has3DError) return;
    if (!canvasRef.current) return;

    let renderer = null;
    let animId = null;
    let handleVisibilityChange = null;

    try {
      // Bypass WebGL rendering for mobile in-app browsers to ensure bulletproof compatibility
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
      
      const isInstagramOrFB = isMobileDevice && (ua.includes('instagram') || ua.includes('fbav') || ua.includes('fb_iab'));
      const isIOSWKWebView = isMobileDevice && /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

      if (isInstagramOrFB || isIOSWKWebView) {
        setHas3DError(true);
        return;
      }

      // Check WebGL availability
      let gl = null;
      try {
        const canvas = document.createElement('canvas');
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {
        setHas3DError(true);
        return;
      }

      if (!gl) {
        setHas3DError(true);
        return;
      }

      // Dimensions (small, performant sizes for cards)
      const size = 120;
      const scene = new THREE.Scene();

      // Camera with wide field of view for high cinematic perspective
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;

      // Performance adjustment based on device class
      const isMobile = isMobileDevice;
      const radialSegs = isMobile ? 8 : 16;
      const tubularSegs = isMobile ? 16 : 32;
      
      // WebGL Renderer settings
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: !isMobile, // Turn off antialiasing on mobile for huge performance gains
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = false; // Disable shadows on cards to save valuable resources

      // Force canvas styling to prevent dynamic overflow clipping
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.zIndex = '10';
      renderer.domElement.style.opacity = '1';

      // Root Group for smooth rotating
      const iconGroup = new THREE.Group();
      scene.add(iconGroup);

      // --- BRAND MATERIAL SYSTEM ---
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0x60A5FA, // Ice blue neon
        metalness: 0.95,
        roughness: 0.12
      });

      const copperMaterial = new THREE.MeshStandardMaterial({
        color: 0x2563EB, // Royal blue metallic
        metalness: 0.95,
        roughness: 0.18
      });

      const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x030B1A, // Obsidian cyber black
        metalness: 0.35,
        roughness: 0.25
      });

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x60A5FA, // Cyber glass
        metalness: 0.05,
        roughness: 0.08,
        transmission: 0.9,
        thickness: 0.3,
        transparent: true,
        opacity: 0.8
      });

      // --- PREMIUM MINIMAL 3D GEOMETRY SYSTEM ---
      if (type === 'bag') {
        // 1. تصميم المتاجر الإلكترونية: Luxury minimal shopping bag with orbiting orbs
        const bagBodyGeom = new THREE.BoxGeometry(0.68, 0.78, 0.38);
        const bagBody = new THREE.Mesh(bagBodyGeom, copperMaterial);
        bagBody.position.y = -0.05;
        iconGroup.add(bagBody);

        // Handles
        const handleGeom = new THREE.TorusGeometry(0.2, 0.035, radialSegs, tubularSegs, Math.PI);
        const handle1 = new THREE.Mesh(handleGeom, goldMaterial);
        handle1.position.set(0, 0.34, 0.06);
        const handle2 = handle1.clone();
        handle2.position.z = -0.06;
        iconGroup.add(handle1);
        iconGroup.add(handle2);

        // Orbiting tiny gold beads
        const orbGeom = new THREE.SphereGeometry(0.06, 12, 12);
        const orb1 = new THREE.Mesh(orbGeom, goldMaterial);
        orb1.position.set(0.6, 0.3, 0.25);
        const orb2 = new THREE.Mesh(orbGeom, copperMaterial);
        orb2.position.set(-0.6, -0.3, -0.25);
        iconGroup.add(orb1);
        iconGroup.add(orb2);

        // Ground ring
        const ringGeom = new THREE.TorusGeometry(0.65, 0.015, 6, tubularSegs);
        const ring = new THREE.Mesh(ringGeom, goldMaterial);
        ring.position.y = -0.55;
        ring.rotation.x = Math.PI / 2;
        iconGroup.add(ring);

      } else if (type === 'monitor') {
        // 2. تصميم المواقع: Elegant floating monitor with floating layout grid
        // Glass Screen Face
        const screenGeom = new THREE.BoxGeometry(1.25, 0.78, 0.04);
        const screen = new THREE.Mesh(screenGeom, glassMaterial);
        iconGroup.add(screen);

        // Minimalist gold spine & base
        const standGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.42, 8);
        const stand = new THREE.Mesh(standGeom, goldMaterial);
        stand.position.set(0, -0.55, -0.1);
        stand.rotation.x = Math.PI / 12;
        iconGroup.add(stand);

        const baseGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.03, 12);
        const base = new THREE.Mesh(baseGeom, darkMaterial);
        base.position.set(0, -0.76, -0.15);
        iconGroup.add(base);

        // Floating Gold & Copper layout UI panels hovering in front of the screen
        const barGeom = new THREE.BoxGeometry(0.85, 0.06, 0.02);
        const bar = new THREE.Mesh(barGeom, goldMaterial);
        bar.position.set(0, 0.24, 0.08);
        iconGroup.add(bar);

        const card1Geom = new THREE.BoxGeometry(0.48, 0.26, 0.02);
        const card1 = new THREE.Mesh(card1Geom, copperMaterial);
        card1.position.set(-0.22, -0.06, 0.08);
        iconGroup.add(card1);

        const card2Geom = new THREE.BoxGeometry(0.3, 0.26, 0.02);
        const card2 = new THREE.Mesh(card2Geom, goldMaterial);
        card2.position.set(0.24, -0.06, 0.08);
        iconGroup.add(card2);

      } else if (type === 'social') {
        // 3. إدارة السوشيال ميديا: Connected floating social nodes & rings (highly minimal and delicate)
        const coreGeom = new THREE.SphereGeometry(0.25, 24, 24);
        const core = new THREE.Mesh(coreGeom, goldMaterial);
        iconGroup.add(core);

        // Social Rings / Overlapping orbits
        const orbit1Geom = new THREE.TorusGeometry(0.68, 0.016, 6, tubularSegs);
        const orbit1 = new THREE.Mesh(orbit1Geom, goldMaterial);
        orbit1.rotation.x = Math.PI / 4;
        iconGroup.add(orbit1);

        const orbit2 = new THREE.Mesh(orbit1Geom, copperMaterial);
        orbit2.rotation.y = Math.PI / 4;
        iconGroup.add(orbit2);

        const orbit3 = new THREE.Mesh(orbit1Geom, goldMaterial);
        orbit3.rotation.z = Math.PI / 3;
        iconGroup.add(orbit3);

        // Embedded social node beads
        const nodeGeom = new THREE.SphereGeometry(0.06, 12, 12);
        const node1 = new THREE.Mesh(nodeGeom, copperMaterial);
        node1.position.set(0.48, 0.48, 0);
        iconGroup.add(node1);

        const node2 = new THREE.Mesh(nodeGeom, goldMaterial);
        node2.position.set(-0.48, -0.48, 0);
        iconGroup.add(node2);

      } else if (type === 'megaphone') {
        // 4. الحملات الإعلانية: Minimal megaphone broadcasting premium geometric light beams
        const coneGeom = new THREE.CylinderGeometry(0.32, 0.14, 0.65, 24);
        const cone = new THREE.Mesh(coneGeom, copperMaterial);
        cone.rotation.z = Math.PI / 4;
        iconGroup.add(cone);

        const rimGeom = new THREE.TorusGeometry(0.32, 0.032, 8, tubularSegs);
        const rim = new THREE.Mesh(rimGeom, goldMaterial);
        rim.position.set(-0.23, 0.23, 0);
        rim.rotation.z = Math.PI / 4;
        iconGroup.add(rim);

        const handleGeom = new THREE.BoxGeometry(0.08, 0.22, 0.08);
        const handle = new THREE.Mesh(handleGeom, goldMaterial);
        handle.position.set(0.1, -0.15, 0);
        iconGroup.add(handle);

        // Expanding light beams / broadcast rings
        const beam1Geom = new THREE.TorusGeometry(0.5, 0.015, 6, tubularSegs);
        const beam1 = new THREE.Mesh(beam1Geom, goldMaterial);
        beam1.position.set(-0.48, 0.48, 0.06);
        beam1.rotation.z = Math.PI / 4;
        iconGroup.add(beam1);

        const beam2Geom = new THREE.TorusGeometry(0.68, 0.01, 6, tubularSegs);
        const beam2 = new THREE.Mesh(beam2Geom, copperMaterial);
        beam2.position.set(-0.72, 0.72, 0.1);
        beam2.rotation.z = Math.PI / 4;
        iconGroup.add(beam2);

      } else if (type === 'sales') {
        // 5. إدارة المبيعات بالكامل: Floating dashboard / growing chart bars with trend line
        // Premium minimal grid base
        const gridGeom = new THREE.TorusGeometry(0.72, 0.012, 6, tubularSegs);
        const grid = new THREE.Mesh(gridGeom, copperMaterial);
        grid.position.y = -0.5;
        grid.rotation.x = Math.PI / 2;
        iconGroup.add(grid);

        // Growing cylinder bars
        const barGeom = new THREE.CylinderGeometry(0.065, 0.065, 1, 16);
        
        const bar1 = new THREE.Mesh(barGeom, goldMaterial);
        bar1.scale.y = 0.35;
        bar1.position.set(-0.35, -0.5 + 0.35/2, 0);
        iconGroup.add(bar1);

        const bar2 = new THREE.Mesh(barGeom, copperMaterial);
        bar2.scale.y = 0.6;
        bar2.position.set(0, -0.5 + 0.6/2, 0);
        iconGroup.add(bar2);

        const bar3 = new THREE.Mesh(barGeom, goldMaterial);
        bar3.scale.y = 0.88;
        bar3.position.set(0.35, -0.5 + 0.88/2, 0);
        iconGroup.add(bar3);

        // Upward trending rod
        const trendGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.95, 8);
        const trend = new THREE.Mesh(trendGeom, goldMaterial);
        trend.position.set(0, 0.08, 0.08);
        trend.rotation.z = -Math.PI / 5.2;
        iconGroup.add(trend);

        // Trend peak node
        const peakGeom = new THREE.SphereGeometry(0.075, 16, 16);
        const peak = new THREE.Mesh(peakGeom, goldMaterial);
        peak.position.set(0.42, 0.28, 0.08);
        iconGroup.add(peak);

      } else if (type === 'script') {
        // 6. إنشاء سكربتات خاصة: Layered floating code blocks in glass & gold with a central gear
        // Layered panels
        const panelGeom = new THREE.BoxGeometry(0.8, 0.44, 0.02);
        
        const panel1 = new THREE.Mesh(panelGeom, glassMaterial);
        panel1.position.set(-0.15, 0.2, -0.12);
        iconGroup.add(panel1);

        const panel2 = new THREE.Mesh(panelGeom, copperMaterial);
        panel2.position.set(0, 0, 0);
        iconGroup.add(panel2);

        const panel3 = new THREE.Mesh(panelGeom, goldMaterial);
        panel3.position.set(0.15, -0.2, 0.12);
        iconGroup.add(panel3);

        // Code syntax highlights wireframe (procedural minimal lines)
        const lineGeom = new THREE.BoxGeometry(0.3, 0.04, 0.015);
        const line1 = new THREE.Mesh(lineGeom, goldMaterial);
        line1.position.set(-0.15, 0.08, 0.015);
        const line2 = new THREE.Mesh(lineGeom, darkMaterial);
        line2.position.set(0.15, -0.08, 0.015);
        panel2.add(line1);
        panel2.add(line2);

        // Central floating mini automation cog
        const cogGeom = new THREE.TorusGeometry(0.18, 0.038, 6, 24);
        const cog = new THREE.Mesh(cogGeom, goldMaterial);
        cog.position.set(0, 0, 0.16);
        iconGroup.add(cog);

      } else if (type === 'branding') {
        // 7. تصميم الهوية البصرية: Elegant glowing geometric emblem (nested rings + diamond core)
        // Outer beautiful geometric gold ring
        const outerRingGeom = new THREE.TorusGeometry(0.68, 0.024, 8, tubularSegs);
        const outerRing = new THREE.Mesh(outerRingGeom, goldMaterial);
        iconGroup.add(outerRing);

        // Inner copper thin ring
        const innerRingGeom = new THREE.TorusGeometry(0.48, 0.014, 6, tubularSegs);
        const innerRing = new THREE.Mesh(innerRingGeom, copperMaterial);
        iconGroup.add(innerRing);

        // Central diamond core geometry (representing visual brand precision)
        const coreGeom = new THREE.OctahedronGeometry(0.32, 0);
        const core = new THREE.Mesh(coreGeom, goldMaterial);
        iconGroup.add(core);

        // Orbiting particle beads
        const nodeGeom = new THREE.SphereGeometry(0.055, 12, 12);
        const node1 = new THREE.Mesh(nodeGeom, goldMaterial);
        node1.position.set(0.5, 0.46, 0.15);
        const node2 = new THREE.Mesh(nodeGeom, copperMaterial);
        node2.position.set(-0.5, -0.46, -0.15);
        iconGroup.add(node1);
        iconGroup.add(node2);

      } else if (type === 'content') {
        // 8. كتابة المحتوى: Floating luxury quill pen & document icon
        // Curved luxury glass document sheet
        const sheetGeom = new THREE.BoxGeometry(0.76, 1.05, 0.02);
        const sheet = new THREE.Mesh(sheetGeom, glassMaterial);
        sheet.rotation.y = -Math.PI / 6;
        sheet.rotation.x = Math.PI / 12;
        iconGroup.add(sheet);

        // Gold sheet accents
        const sheetAccentGeom = new THREE.BoxGeometry(0.5, 0.03, 0.02);
        const accent1 = new THREE.Mesh(sheetAccentGeom, goldMaterial);
        accent1.position.set(0, 0.2, 0.02);
        const accent2 = new THREE.Mesh(sheetAccentGeom, copperMaterial);
        accent2.position.set(-0.05, 0, 0.02);
        const accent3 = new THREE.Mesh(sheetAccentGeom, goldMaterial);
        accent3.position.set(0.05, -0.2, 0.02);
        sheet.add(accent1);
        sheet.add(accent2);
        sheet.add(accent3);

        // Sleek modern writing quill / stylus
        const stylusGeom = new THREE.CylinderGeometry(0.025, 0.006, 0.88, 12);
        const stylus = new THREE.Mesh(stylusGeom, goldMaterial);
        stylus.position.set(0.24, 0.1, 0.16);
        stylus.rotation.z = -Math.PI / 4.5;
        stylus.rotation.x = Math.PI / 12;
        iconGroup.add(stylus);

        const tipGeom = new THREE.ConeGeometry(0.035, 0.1, 12);
        const tip = new THREE.Mesh(tipGeom, copperMaterial);
        tip.position.set(0.24 - 0.32, 0.1 - 0.32, 0.16);
        tip.rotation.z = -Math.PI / 4.5;
        iconGroup.add(tip);
      }

      // Cinematic Luxury Light System
      const ambientLight = new THREE.AmbientLight(0xE0F2FE, 1.4); // Cool ice-blue ambient
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.2); // Intense clean main light
      dirLight.position.set(2, 4, 3);
      scene.add(dirLight);

      const backlight = new THREE.DirectionalLight(0x3B82F6, 2.0); // Neon blue key rim backlight
      backlight.position.set(-2, -4, -3);
      scene.add(backlight);

      // Reduced motion support
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Visibility controls to pause loop when tab is hidden
      let isTabVisible = true;
      handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Animation loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isTabVisible) return;

        if (!prefersReducedMotion) {
          // Exquisite Apple-like slow floating movement and smooth rotation
          iconGroup.rotation.y += 0.01;
          iconGroup.rotation.x = Math.sin(performance.now() * 0.001) * 0.1;
          iconGroup.position.y = Math.sin(performance.now() * 0.0015) * 0.08;
        } else {
          iconGroup.rotation.y = 0.45;
          iconGroup.position.y = 0;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

    } catch (err) {
      console.warn("Sadeem - ThreeDIcons error caught in initialization:", err);
      setHas3DError(true);
    }

    // Cleanup
    return () => {
      try {
        if (animId) cancelAnimationFrame(animId);
        if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (renderer) renderer.dispose();
      } catch (e) {
        console.warn("Sadeem - ThreeDIcons cleanup warning:", e);
      }
    };
  }, [isInViewport, type]);

  // Fallback visual design if WebGL is off or failed (Sleek minimalist flat icons with floating shadows)
  if (has3DError || !isInViewport) {
    let Icon = ShoppingBag;
    if (type === 'monitor') Icon = Globe;
    else if (type === 'social') Icon = Share2;
    else if (type === 'megaphone') Icon = Megaphone;
    else if (type === 'content') Icon = FileText;
    else if (type === 'branding') Icon = Palette;
    else if (type === 'script') Icon = Code;
    else if (type === 'sales') Icon = CheckCircle2;

    return (
      <div 
        ref={containerRef}
        className="w-[120px] h-[120px] flex items-center justify-center bg-[#030B1A]/40 rounded-3xl border border-blue-500/10 shadow-soft transition-all select-none mx-auto relative group overflow-hidden"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#020817] to-[#071224] border border-blue-500/25 flex items-center justify-center text-[#60A5FA] shadow-md group-hover:text-[#3B82F6] group-hover:scale-105 group-hover:border-blue-500/40 transition-all duration-300 relative z-10">
          <Icon size={22} className="animate-float" />
        </div>
        
        {/* Floating shadow */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-500/10 rounded-full blur-[3px] scale-x-90 animate-pulse pointer-events-none" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-[120px] h-[120px] mx-auto relative select-none overflow-visible flex items-center justify-center"
      style={{ zIndex: 10, opacity: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-[120px] h-[120px] pointer-events-none select-none drop-shadow-md mx-auto"
        style={{ background: 'transparent', width: '120px', height: '120px', display: 'block' }}
      />
    </div>
  );
}
