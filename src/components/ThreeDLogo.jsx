import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThreeDLogo() {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    let renderer = null;
    let animId = null;
    let handleMouseMove = null;
    let handleResize = null;
    let handleVisibilityChange = null;

    try {
      if (!containerRef.current) return;

      // Check if on iOS WKWebView / Instagram / FB in-app browser to forcefully bypass WebGL
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
      
      // Force FULL_3D on desktop browsers by checking isMobileDevice first
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
      
      // Instagram & Facebook webview bypass ONLY on mobile devices
      const isInstagramOrFB = isMobileDevice && (ua.includes('instagram') || ua.includes('fbav') || ua.includes('fb_iab'));
      const isIOSWKWebView = isMobileDevice && /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

      if (isInstagramOrFB || isIOSWKWebView) {
        setWebglSupported(false);
        return;
      }

      // Check WebGL availability
      let gl = null;
      try {
        const canvas = document.createElement('canvas');
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      } catch (e) {
        setWebglSupported(false);
        return;
      }

      if (!gl) {
        setWebglSupported(false);
        return;
      }

      const isMobile = isMobileDevice;

      // Resilient layout size resolver (fixes 0x0 dynamic hidden canvas bug)
      let width = containerRef.current.clientWidth;
      let height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) {
        width = 450;
        height = 450;
      }

      // Adjust geometric subdivisions, lights and shadows based on device type (Safe Hybrid LOD)
      const baseRadialSegments = isMobile ? 16 : 32;
      const coreStarPoints = 8;
      const ringTorusSegments = isMobile ? 8 : 16;
      const ringTorusRadialSegments = isMobile ? 32 : 100;
      const spheresCount = isMobile ? 6 : 16; // Visual boost: 16 glowing golden spheres on desktop
      const sphereSubdivisions = isMobile ? 8 : 16;

      // Scene
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0xF7EFE6, 0.04); // Softer fog for atmospheric depth

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 8;

      // Renderer creation
      renderer = new THREE.WebGLRenderer({ 
        antialias: !isMobile, // Crisp resolution on desktop
        alpha: true, 
        powerPreference: "high-performance" 
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2));
      
      // Shadow maps configuration (Softer, less aggressive shadows)
      renderer.shadowMap.enabled = !isMobile;
      if (!isMobile) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.bias = -0.0005; // Softer shadow alignment
      }
      
      // Absolute positioning to avoid parent dynamic overflow clipping
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.zIndex = '10';
      renderer.domElement.style.opacity = '1';
      renderer.domElement.style.pointerEvents = 'auto'; // allow mouse dragging
      
      containerRef.current.appendChild(renderer.domElement);

      // Group for Rotation and Parallax
      const logoGroup = new THREE.Group();
      
      // PREMIUM SCALE ADJUSTMENT (Reduced scale by 40% to 0.75 for elegant breathing space)
      const scaleFactor = isMobile ? 0.65 : 0.75;
      logoGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
      scene.add(logoGroup);

      // Materials
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xC89B5B,
        metalness: 0.95,
        roughness: 0.12,
        bumpScale: 0.05,
      });

      const copperMaterial = new THREE.MeshStandardMaterial({
        color: 0xB87333,
        metalness: 0.95,
        roughness: 0.18,
      });

      const darkWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0x2B1A12,
        metalness: 0.1,
        roughness: 0.6,
      });

      // ELEGANT CORE SPHERE: Reduced size (0.55) for premium, balanced look
      const testSphereGeom = new THREE.SphereGeometry(0.55, 32, 32);
      const testSphereMesh = new THREE.Mesh(testSphereGeom, goldMaterial);
      testSphereMesh.position.set(0, 0.3, 0);
      if (!isMobile) {
        testSphereMesh.castShadow = true;
        testSphereMesh.receiveShadow = true;
      }
      logoGroup.add(testSphereMesh);

      // ELEGANT PLATFORM BASE: Reduced size (1.0 width, 0.15 height) and moved closer for cinematic balance
      const baseGeom = new THREE.CylinderGeometry(1.0, 1.1, 0.15, baseRadialSegments);
      const baseMesh = new THREE.Mesh(baseGeom, darkWoodMaterial);
      baseMesh.position.y = -1.2;
      if (!isMobile) {
        baseMesh.receiveShadow = true;
      }
      logoGroup.add(baseMesh);

      // Golden Core Star/Pentagon (Arabic inspired geometric pattern)
      const shape = new THREE.Shape();
      const outerRadius = 1.0;
      const innerRadius = 0.5;
      for (let i = 0; i < coreStarPoints * 2; i++) {
        const angle = (i * Math.PI) / coreStarPoints;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      const extrudeSettings = { 
        depth: 0.25, 
        bevelEnabled: true, 
        bevelSegments: isMobile ? 1 : 3,
        steps: 1, 
        bevelSize: 0.05, 
        bevelThickness: 0.05 
      };
      const coreGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      coreGeom.center();
      const coreMesh = new THREE.Mesh(coreGeom, goldMaterial);
      coreMesh.position.y = 0.3; // Mount on top of wood base
      if (!isMobile) {
        coreMesh.castShadow = true;
        coreMesh.receiveShadow = true;
      }
      logoGroup.add(coreMesh);

      // Surrounding Copper Orbital Rings
      const ringGeom1 = new THREE.TorusGeometry(1.7, 0.06, ringTorusSegments, ringTorusRadialSegments);
      const ringMesh1 = new THREE.Mesh(ringGeom1, copperMaterial);
      ringMesh1.position.y = 0.3;
      ringMesh1.rotation.x = Math.PI / 2.5;
      logoGroup.add(ringMesh1);

      const ringGeom2 = new THREE.TorusGeometry(2.1, 0.04, ringTorusSegments, ringTorusRadialSegments);
      const ringMesh2 = new THREE.Mesh(ringGeom2, copperMaterial);
      ringMesh2.position.y = 0.3;
      ringMesh2.rotation.x = -Math.PI / 3;
      ringMesh2.rotation.y = Math.PI / 4;
      logoGroup.add(ringMesh2);

      // Floating micro golden spheres (Glowing Orbs)
      const sphereGeom = new THREE.SphereGeometry(0.06, sphereSubdivisions, sphereSubdivisions);
      const spheres = [];
      for (let i = 0; i < spheresCount; i++) {
        const sp = new THREE.Mesh(sphereGeom, goldMaterial);
        const angle = (i * Math.PI * 2) / spheresCount;
        const radius = 1.6 + Math.random() * 0.8;
        sp.position.set(Math.cos(angle) * radius, 0.3 + (Math.random() - 0.5) * 1.5, Math.sin(angle) * radius);
        logoGroup.add(sp);
        spheres.push({ mesh: sp, speed: 0.01 + Math.random() * 0.02, angle });
      }

      // Softer luxury Awwwards lighting
      const ambientLight = new THREE.AmbientLight(0xFFFAF5, 1.2); // Warm luxury bounce
      scene.add(ambientLight);

      // Softer top Spotlight for metallic gloss (intensity reduced to 2.5, penumbra increased to 0.8)
      const spotLight = new THREE.SpotLight(0xFFFFFF, 2.5);
      spotLight.position.set(6, 8, 6);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.8;
      if (!isMobile) {
        spotLight.castShadow = true;
      }
      scene.add(spotLight);

      // Bottom-Right Copper fill light (softer 1.5)
      const dirLight2 = new THREE.DirectionalLight(0xB87333, 1.5);
      dirLight2.position.set(-6, -4, -4);
      scene.add(dirLight2);

      // Central glowing gold light (softer 1.8)
      const corePointLight = new THREE.PointLight(0xC89B5B, 1.8, 15);
      corePointLight.position.set(0, 0.3, 1.5);
      scene.add(corePointLight);

      // Animation variables
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      handleMouseMove = (event) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 1.5;
        targetY = y * 1.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Visibility controls to pause loop when tab is hidden
      let isTabVisible = true;
      handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Reduced motion respect
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Animation Loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isTabVisible) return;

        if (!prefersReducedMotion) {
          // Elegant Y-axis zero-gravity floating (Subtle elegant floating motion)
          const elapsedTime = performance.now() * 0.0012;
          logoGroup.position.y = Math.sin(elapsedTime) * 0.2;

          // Elegant continuous luxury rotation
          logoGroup.rotation.y += 0.005; // Slightly slower for luxury look
          coreMesh.rotation.z -= 0.003;
          
          // Extra rotating speed for the giant test sphere
          testSphereMesh.rotation.y += 0.01;
          testSphereMesh.rotation.x += 0.005;

          // Floating spheres orbit
          spheres.forEach(sp => {
            sp.angle += sp.speed;
            sp.mesh.position.x = Math.cos(sp.angle) * 1.8;
            sp.mesh.position.z = Math.sin(sp.angle) * 1.8;
            sp.mesh.position.y += Math.sin(elapsedTime + sp.angle) * 0.005;
          });

          // Mouse Parallax smooth lerp
          mouseX += (targetX - mouseX) * 0.05;
          mouseY += (targetY - mouseY) * 0.05;
          logoGroup.rotation.x = mouseY;
          logoGroup.rotation.y += mouseX * 0.02;
        } else {
          // Minimal luxury static drift
          logoGroup.rotation.y = 0.5;
          coreMesh.rotation.z = 0.2;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

      // Resize Handler
      handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const w = containerRef.current.clientWidth || 450;
        const h = containerRef.current.clientHeight || 450;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

    } catch (err) {
      console.warn("Loran Studio - ThreeDLogo error caught in initialization:", err);
      setWebglSupported(false);
    }

    // Cleanup
    return () => {
      try {
        if (animId) cancelAnimationFrame(animId);
        if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
        if (handleResize) window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
      } catch (e) {
        console.warn("Loran Studio - ThreeDLogo cleanup warning:", e);
      }
    };
  }, []);

  return (
    <>
      {!webglSupported ? (
        // Beautiful Premium CSS 3D Fallback (For platforms with disabled WebGL)
        <div className="w-full h-[320px] md:h-[450px] flex items-center justify-center select-none">
          <div className="relative w-44 h-44 flex items-center justify-center animate-float">
            {/* Outer glowing mounded rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-double border-[#B87333]/30 animate-[spin_20s_linear_infinite_reverse]" />
            
            {/* Metallic golden central shield with wood styling */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7A4A2A] to-[#2B1A12] border-2 border-[#C89B5B] shadow-premium flex items-center justify-center">
              <span className="font-marcellus text-5xl font-extrabold text-[#C89B5B] select-none">L</span>
            </div>
            
            {/* Mini orbit circles */}
            <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#B87333] border border-[#C89B5B]/30" />
            <div className="absolute bottom-6 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#EADCCB] border border-[#C89B5B]/30" />
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef} 
          className="relative w-full h-[320px] md:h-[450px] cursor-grab active:cursor-grabbing select-none overflow-visible"
          style={{ 
            touchAction: 'none', 
            zIndex: 10, 
            opacity: 1,
            filter: 'drop-shadow(0 25px 50px rgba(200, 155, 91, 0.06))' // Subtle premium depth shadow
          }}
        />
      )}
    </>
  );
}
