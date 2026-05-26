import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import logoIcon from '../assets/logo-icon.png';

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
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
      
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

      // Resilient layout size resolver
      let width = containerRef.current.clientWidth;
      let height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) {
        width = 450;
        height = 450;
      }

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 8;

      // Renderer creation
      renderer = new THREE.WebGLRenderer({ 
        antialias: !isMobile, 
        alpha: true, 
        powerPreference: "high-performance" 
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.zIndex = '10';
      renderer.domElement.style.opacity = '1';
      renderer.domElement.style.pointerEvents = 'auto';
      
      containerRef.current.appendChild(renderer.domElement);

      // Group for Rotation and Parallax
      const logoGroup = new THREE.Group();
      const scaleFactor = isMobile ? 0.78 : 0.95;
      logoGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
      scene.add(logoGroup);

      // --- BRAND MATERIALS ---
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xC89B5B,
        metalness: 0.95,
        roughness: 0.12,
      });

      const copperMaterial = new THREE.MeshStandardMaterial({
        color: 0xB87333,
        metalness: 0.9,
        roughness: 0.18,
      });

      // --- 3D HYBRID BRAND MEDALLION PLAQUE ---
      // Medallion main disk
      const baseGeom = new THREE.CylinderGeometry(2.0, 2.0, 0.1, 64);
      const baseMesh = new THREE.Mesh(baseGeom, copperMaterial);
      baseMesh.rotation.x = Math.PI / 2; // Flat facing the camera
      logoGroup.add(baseMesh);

      // Elegant Golden Rim
      const rimGeom = new THREE.TorusGeometry(2.0, 0.04, 16, 64);
      const rimMesh = new THREE.Mesh(rimGeom, goldMaterial);
      logoGroup.add(rimMesh);

      // Load official brand icon texture
      const textureLoader = new THREE.TextureLoader();
      const logoTexture = textureLoader.load(logoIcon);
      logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // Front plate circular face mapping our luxury brand emblem
      const faceGeom = new THREE.CircleGeometry(1.96, 64);
      const faceMaterial = new THREE.MeshStandardMaterial({
        map: logoTexture,
        roughness: 0.14,
        metalness: 0.85,
      });
      const faceMesh = new THREE.Mesh(faceGeom, faceMaterial);
      faceMesh.position.z = 0.06;
      logoGroup.add(faceMesh);

      // Solid copper back plate so it looks realistic when angled
      const backGeom = new THREE.CircleGeometry(1.96, 64);
      const backMesh = new THREE.Mesh(backGeom, copperMaterial);
      backMesh.position.z = -0.06;
      backMesh.rotation.y = Math.PI;
      logoGroup.add(backMesh);

      // --- LIGHTING SYSTEM (CINEMATIC STUDIO FEEL) ---
      const ambientLight = new THREE.AmbientLight(0xFFFAF5, 1.3);
      scene.add(ambientLight);

      // Top spotlight catching gold metallic highlights
      const spotLight = new THREE.SpotLight(0xFFFFFF, 2.5);
      spotLight.position.set(4, 7, 5);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.8;
      scene.add(spotLight);

      // Back fill gold rim light
      const dirLight2 = new THREE.DirectionalLight(0xC89B5B, 1.2);
      dirLight2.position.set(-4, -4, -3);
      scene.add(dirLight2);

      // Mouse Parallax handlers
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      handleMouseMove = (event) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 0.8;
        targetY = y * 0.8;
      };

      window.addEventListener('mousemove', handleMouseMove);

      let isTabVisible = true;
      handleVisibilityChange = () => {
        isTabVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Animation loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isTabVisible) return;

        if (!prefersReducedMotion) {
          const elapsedTime = performance.now() * 0.0012;

          // Zero-gravity slow vertical float
          logoGroup.position.y = Math.sin(elapsedTime) * 0.12;

          // Majestic slow left-to-right sway instead of spinning (keeping logo readable!)
          logoGroup.rotation.y = Math.sin(elapsedTime * 0.45) * 0.35;

          // Mouse Parallax smooth lerp
          mouseX += (targetX - mouseX) * 0.05;
          mouseY += (targetY - mouseY) * 0.05;
          logoGroup.rotation.x = mouseY * 0.3;
          logoGroup.rotation.y += mouseX * 0.3;
        } else {
          logoGroup.rotation.y = 0;
          logoGroup.position.y = 0;
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
        // Beautiful Premium CSS 3D Fallback
        <div className="w-full h-[320px] md:h-[450px] flex items-center justify-center select-none">
          <div className="relative w-44 h-44 flex items-center justify-center animate-float">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-double border-[#B87333]/30 animate-[spin_20s_linear_infinite_reverse]" />
            
            <div className="w-20 h-20 rounded-full overflow-hidden border border-[#C89B5B]/20 shadow-premium flex items-center justify-center bg-[#FFFBF7]/30 backdrop-blur-sm">
              <img src={logoIcon} className="w-full h-full object-cover" alt="LORAN Logo Icon" />
            </div>
            
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
            filter: 'drop-shadow(0 20px 40px rgba(122, 74, 42, 0.05))'
          }}
        />
      )}
    </>
  );
}
