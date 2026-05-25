import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThreeDLogo() {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if on iOS WKWebView / Instagram / FB in-app browser to forcefully bypass WebGL
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const isMobileInApp = ua.includes('instagram') || ua.includes('fbav') || ua.includes('fb_iab') || /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

    if (isMobileInApp) {
      setWebglSupported(false);
      return;
    }

    // Check WebGL availability
    let gl;
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

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF7EFE6, 0.05);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      containerRef.current.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("Failed to create WebGLRenderer:", err);
      setWebglSupported(false);
      return;
    }

    // Group for Rotation and Parallax
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC89B5B,
      metalness: 0.9,
      roughness: 0.15,
      bumpScale: 0.05,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xB87333,
      metalness: 0.95,
      roughness: 0.2,
    });

    const darkWoodMaterial = new THREE.MeshStandardMaterial({
      color: 0x2B1A12,
      metalness: 0.1,
      roughness: 0.6,
    });

    // Create 3D LORAN Logo Geometries (Procedural Luxury Architecture)
    // Core Wood Base
    const baseGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.25, 32);
    const baseMesh = new THREE.Mesh(baseGeom, darkWoodMaterial);
    baseMesh.position.y = -2;
    baseMesh.receiveShadow = true;
    logoGroup.add(baseMesh);

    // Golden Core Star/Pentagon (Arabic inspired geometric pattern)
    const shape = new THREE.Shape();
    const outerRadius = 1.0;
    const innerRadius = 0.5;
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

    const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const coreGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    coreGeom.center();
    const coreMesh = new THREE.Mesh(coreGeom, goldMaterial);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    logoGroup.add(coreMesh);

    // Surrounding Copper Orbital Rings
    const ringGeom1 = new THREE.TorusGeometry(1.7, 0.06, 16, 100);
    const ringMesh1 = new THREE.Mesh(ringGeom1, copperMaterial);
    ringMesh1.rotation.x = Math.PI / 2.5;
    logoGroup.add(ringMesh1);

    const ringGeom2 = new THREE.TorusGeometry(2.1, 0.04, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeom2, copperMaterial);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 4;
    logoGroup.add(ringMesh2);

    // Floating micro golden spheres
    const sphereGeom = new THREE.SphereGeometry(0.06, 16, 16);
    const spheres = [];
    for (let i = 0; i < 12; i++) {
      const sp = new THREE.Mesh(sphereGeom, goldMaterial);
      const angle = (i * Math.PI * 2) / 12;
      const radius = 1.5 + Math.random() * 0.8;
      sp.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.5, Math.sin(angle) * radius);
      logoGroup.add(sp);
      spheres.push({ mesh: sp, speed: 0.01 + Math.random() * 0.02, angle });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFAF5, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    dirLight1.position.set(5, 5, 5);
    dirLight1.castShadow = true;
    logoGroup.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xC89B5B, 1.0);
    dirLight2.position.set(-5, 2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xFFFFFF, 0.8, 10);
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth rotate
      logoGroup.rotation.y += 0.007;
      coreMesh.rotation.z -= 0.004;
      
      // Floating spheres orbit
      spheres.forEach(sp => {
        sp.angle += sp.speed;
        sp.mesh.position.x = Math.cos(sp.angle) * 1.8;
        sp.mesh.position.z = Math.sin(sp.angle) * 1.8;
        sp.mesh.position.y += Math.sin(performance.now() * 0.001 + sp.angle) * 0.005;
      });

      // Mouse Parallax smooth lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      logoGroup.rotation.x = mouseY;
      logoGroup.rotation.y += mouseX * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    // Beautiful Premium CSS 3D Fallback (For platforms with disabled WebGL)
    return (
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
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[320px] md:h-[450px] cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
