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
      // Forceful bypass of WebGL rendering for mobile in-app browsers
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
      
      // Force FULL_3D on desktop browsers by checking isMobileDevice first
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
      
      // Instagram & Facebook webview bypass ONLY on mobile devices
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

      // Camera
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.2;

      // Performance adjustment based on device class (LOD)
      const isMobile = isMobileDevice;
      const torusRadial = isMobile ? 6 : 8;
      const torusTubular = isMobile ? 16 : 32;
      const cylinderSegments = isMobile ? 8 : 16;
      
      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: !isMobile, // Turn off antialiasing on mobile for huge fillrate speedups
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = false; // Never use shadow maps on small card icons to save huge resources

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

      // Common Premium Materials
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xC89B5B,
        metalness: 0.95,
        roughness: 0.12,
        bumpScale: 0.05
      });

      const copperMaterial = new THREE.MeshStandardMaterial({
        color: 0xB87333,
        metalness: 0.95,
        roughness: 0.18
      });

      const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x7A4A2A,
        metalness: 0.1,
        roughness: 0.55
      });

      const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x2B1A12,
        metalness: 0.25,
        roughness: 0.35
      });

      // Create Geometries based on type
      if (type === 'bag') {
        // 1. تصميم المتاجر الإلكترونية: Luxury bronze shopping bag + cart
        const bagBodyGeom = new THREE.BoxGeometry(0.8, 1.0, 0.45);
        const bagBody = new THREE.Mesh(bagBodyGeom, copperMaterial);
        bagBody.position.y = -0.15;
        iconGroup.add(bagBody);

        // Handles
        const handleGeom = new THREE.TorusGeometry(0.24, 0.04, torusRadial, torusTubular, Math.PI);
        const handle1 = new THREE.Mesh(handleGeom, goldMaterial);
        handle1.position.set(0, 0.35, 0.08);
        const handle2 = handle1.clone();
        handle2.position.z = -0.08;
        iconGroup.add(handle1);
        iconGroup.add(handle2);

        // Cart Ring Base (Procedural Cart)
        const ringGeom = new THREE.TorusGeometry(0.7, 0.04, torusRadial, torusTubular);
        const ring = new THREE.Mesh(ringGeom, goldMaterial);
        ring.position.y = -0.7;
        ring.rotation.x = Math.PI / 2;
        iconGroup.add(ring);

      } else if (type === 'monitor') {
        // 2. تصميم المواقع: Wooden monitor with glowing interface
        const frameGeom = new THREE.BoxGeometry(1.4, 0.9, 0.12);
        const frame = new THREE.Mesh(frameGeom, woodMaterial);
        iconGroup.add(frame);

        // Glowing screen face
        const screenGeom = new THREE.BoxGeometry(1.26, 0.76, 0.05);
        const screen = new THREE.Mesh(screenGeom, goldMaterial);
        screen.position.z = 0.06;
        iconGroup.add(screen);

        // Core stand
        const standGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.4, cylinderSegments);
        const stand = new THREE.Mesh(standGeom, copperMaterial);
        stand.position.y = -0.65;
        iconGroup.add(stand);

        // Base
        const baseGeom = new THREE.CylinderGeometry(0.3, 0.35, 0.04, cylinderSegments);
        const base = new THREE.Mesh(baseGeom, darkMaterial);
        base.position.y = -0.85;
        iconGroup.add(base);

      } else if (type === 'social') {
        // 3. إدارة السوشيال ميديا: Floating social media cubes
        // Main Center Cube
        const cube1Geom = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const cube1 = new THREE.Mesh(cube1Geom, goldMaterial);
        iconGroup.add(cube1);

        // Orbit Cube 1 (Wood)
        const cube2Geom = new THREE.BoxGeometry(0.35, 0.35, 0.35);
        const cube2 = new THREE.Mesh(cube2Geom, woodMaterial);
        cube2.position.set(0.75, 0.4, -0.2);
        iconGroup.add(cube2);

        // Orbit Cube 2 (Copper)
        const cube3Geom = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const cube3 = new THREE.Mesh(cube3Geom, copperMaterial);
        cube3.position.set(-0.75, -0.4, 0.2);
        iconGroup.add(cube3);

        // Orbit paths
        const path1Geom = new THREE.TorusGeometry(0.85, 0.015, torusRadial, torusTubular + 10);
        const path1 = new THREE.Mesh(path1Geom, copperMaterial);
        path1.rotation.x = Math.PI / 3;
        iconGroup.add(path1);

      } else if (type === 'megaphone') {
        // 4. الحملات الإعلانية: Luxury megaphone + analytics graph
        const coneGeom = new THREE.CylinderGeometry(0.45, 0.18, 0.9, cylinderSegments * 2);
        const cone = new THREE.Mesh(coneGeom, woodMaterial);
        cone.rotation.z = Math.PI / 3.5;
        iconGroup.add(cone);

        const ringGeom = new THREE.TorusGeometry(0.45, 0.05, torusRadial, torusTubular);
        const ring = new THREE.Mesh(ringGeom, goldMaterial);
        ring.position.set(-0.38, 0.22, 0);
        ring.rotation.y = Math.PI / 6;
        iconGroup.add(ring);

        const handleGeom = new THREE.BoxGeometry(0.12, 0.35, 0.12);
        const handle = new THREE.Mesh(handleGeom, copperMaterial);
        handle.position.set(0.12, -0.2, 0);
        iconGroup.add(handle);

        // Backdrop analytics grid
        const gridGeom = new THREE.TorusGeometry(0.8, 0.02, torusRadial, torusTubular, Math.PI);
        const grid = new THREE.Mesh(gridGeom, copperMaterial);
        grid.position.set(0, -0.3, -0.4);
        grid.rotation.x = Math.PI / 2;
        iconGroup.add(grid);

      } else if (type === 'content') {
        // 5. كتابة المحتوى: Luxury paper + premium pen
        // Luxury rolled Paper Cylinder/Box
        const paperGeom = new THREE.BoxGeometry(0.8, 1.1, 0.08);
        const paper = new THREE.Mesh(paperGeom, goldMaterial);
        paper.rotation.y = -Math.PI / 8;
        paper.rotation.z = Math.PI / 12;
        iconGroup.add(paper);

        // Premium Pen Feather
        const penGeom = new THREE.CylinderGeometry(0.04, 0.01, 1.2, cylinderSegments);
        const pen = new THREE.Mesh(penGeom, copperMaterial);
        pen.position.set(0.2, 0.1, 0.15);
        pen.rotation.z = -Math.PI / 5;
        iconGroup.add(pen);

        const nibGeom = new THREE.ConeGeometry(0.05, 0.15, cylinderSegments);
        const nib = new THREE.Mesh(nibGeom, woodMaterial);
        nib.position.set(0.2 - 0.35, 0.1 - 0.5, 0.15);
        nib.rotation.z = -Math.PI / 5;
        iconGroup.add(nib);

      } else if (type === 'branding') {
        // 6. تصميم الهوية البصرية: Golden geometric branding symbol
        // Outer beautiful 8-point geometric star
        const shape = new THREE.Shape();
        const outerRadius = 0.95;
        const innerRadius = 0.45;
        const pointsNum = 8;
        for (let i = 0; i < pointsNum * 2; i++) {
          const angle = (i * Math.PI) / pointsNum;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        shape.closePath();

        const extrudeSettings = { 
          depth: 0.15, 
          bevelEnabled: true, 
          bevelSegments: isMobile ? 1 : 3, 
          steps: 1, 
          bevelSize: 0.03, 
          bevelThickness: 0.03 
        };
        const starGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        starGeom.center();
        const star = new THREE.Mesh(starGeom, goldMaterial);
        iconGroup.add(star);

        // Inner copper ring
        const ringGeom = new THREE.TorusGeometry(0.35, 0.04, torusRadial, torusTubular);
        const ring = new THREE.Mesh(ringGeom, copperMaterial);
        ring.position.z = 0.1;
        iconGroup.add(ring);

      } else if (type === 'script') {
        // 7. إنشاء سكربتات خاصة: Floating code blocks in copper style
        const block1Geom = new THREE.BoxGeometry(0.7, 0.3, 0.3);
        const block1 = new THREE.Mesh(block1Geom, copperMaterial);
        block1.position.set(-0.25, 0.3, 0);
        iconGroup.add(block1);

        const block2Geom = new THREE.BoxGeometry(0.7, 0.3, 0.3);
        const block2 = new THREE.Mesh(block2Geom, goldMaterial);
        block2.position.set(0.25, -0.3, 0);
        iconGroup.add(block2);

        const gearGeom = new THREE.TorusGeometry(0.4, 0.06, torusRadial, torusTubular);
        const gear = new THREE.Mesh(gearGeom, darkMaterial);
        gear.rotation.x = Math.PI / 2;
        iconGroup.add(gear);

      } else if (type === 'sales') {
        // 8. إدارة المبيعات بالكامل: Luxury dashboard analytics panel
        const basePlateGeom = new THREE.BoxGeometry(1.3, 0.9, 0.06);
        const basePlate = new THREE.Mesh(basePlateGeom, darkMaterial);
        iconGroup.add(basePlate);

        // Charts inside dashboard
        const screenChartGeom = new THREE.BoxGeometry(0.7, 0.4, 0.05);
        const screenChart = new THREE.Mesh(screenChartGeom, copperMaterial);
        screenChart.position.set(-0.15, 0.15, 0.05);
        iconGroup.add(screenChart);

        const smallBar1Geom = new THREE.BoxGeometry(0.15, 0.5, 0.05);
        const smallBar1 = new THREE.Mesh(smallBar1Geom, goldMaterial);
        smallBar1.position.set(0.4, -0.1, 0.05);
        iconGroup.add(smallBar1);

        const smallBar2Geom = new THREE.BoxGeometry(0.15, 0.3, 0.05);
        const smallBar2 = new THREE.Mesh(smallBar2Geom, copperMaterial);
        smallBar2.position.set(0.2, -0.2, 0.05);
        iconGroup.add(smallBar2);
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(0xFFFAF5, 1.2);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.0);
      dirLight.position.set(2, 4, 3);
      scene.add(dirLight);

      // Reduced motion respect
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
          iconGroup.rotation.y += 0.012;
          iconGroup.rotation.x = Math.sin(performance.now() * 0.001) * 0.15;
        } else {
          iconGroup.rotation.y = 0.5;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

    } catch (err) {
      console.warn("Loran Studio - ThreeDIcons error caught in initialization:", err);
      setHas3DError(true);
    }

    // Cleanup
    return () => {
      try {
        if (animId) cancelAnimationFrame(animId);
        if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (renderer) renderer.dispose();
      } catch (e) {
        console.warn("Loran Studio - ThreeDIcons cleanup warning:", e);
      }
    };
  }, [isInViewport, type]);

  // Fallback visual design if WebGL is off or failed
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
        className="w-[120px] h-[120px] flex items-center justify-center bg-gradient-to-tr from-[#7A4A2A]/5 to-[#2B1A12]/5 rounded-3xl border border-[#7A4A2A]/10 shadow-soft transition-all select-none mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border border-[#C89B5B]/30 flex items-center justify-center text-[#C89B5B] shadow-md">
          <Icon size={26} className="animate-float" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-[120px] h-[120px] mx-auto relative select-none overflow-visible"
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
