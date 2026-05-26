import React, { useState, useEffect, Suspense, lazy } from 'react';
import logoIcon from '../assets/logo-icon.png';

// Lazy load the official @splinetool/react-spline to keep initial bundle size light
const Spline = lazy(() => import('@splinetool/react-spline'));

// Premium glassmorphic loading experience matching the agency visual identity
function SplineLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center select-none bg-[#FFFBF7]/35 backdrop-blur-md rounded-[40px] border border-[#C89B5B]/15 transition-all duration-700 ease-out z-20">
      {/* Golden Pulsating Rings */}
      <div className="relative w-24 h-24 flex items-center justify-center animate-float">
        <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-3 rounded-full border border-double border-[#B87333]/20 animate-[spin_20s_linear_infinite_reverse]" />
        
        {/* Pulsating glowing center */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C89B5B]/25 to-[#B87333]/25 animate-pulse flex items-center justify-center shadow-[0_0_20px_rgba(200,155,91,0.15)]">
          <span className="text-xs text-[#7A4A2A] font-black">L</span>
        </div>
      </div>
      
      {/* Arabic + English elegant caption */}
      <div className="text-center mt-6 px-4">
        <p className="text-xs text-[#7A4A2A] font-black tracking-wider animate-[pulse_2s_infinite]">
          جاري تحميل التجربة ثلاثية الأبعاد الفاخرة...
        </p>
        <p className="text-[9px] text-[#7A4A2A]/60 font-bold uppercase mt-1 tracking-widest">
          Initializing 3D Experience
        </p>
      </div>
    </div>
  );
}

// High-fidelity CSS-3D fallback used if WebGL, browser restrictions, or Spline fails
export function ThreeDLogoFallback() {
  return (
    <div className="w-full h-[320px] md:h-[450px] flex items-center justify-center select-none">
      <div className="relative w-44 h-44 flex items-center justify-center animate-float">
        <div className="absolute inset-0 rounded-full border border-dashed border-[#C89B5B]/30 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-double border-[#B87333]/30 animate-[spin_20s_linear_infinite_reverse]" />
        
        <div className="w-20 h-20 rounded-full overflow-hidden border border-[#C89B5B]/20 shadow-premium flex items-center justify-center bg-[#FFFBF7]/30 backdrop-blur-sm">
          <img src={logoIcon} className="w-full h-full object-cover animate-[pulse_4s_infinite]" alt="LORAN Logo Icon" />
        </div>
        
        <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#B87333] border border-[#C89B5B]/30" />
        <div className="absolute bottom-6 left-2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#C89B5B] to-[#EADCCB] border border-[#C89B5B]/30" />
      </div>
    </div>
  );
}

export default function ThreeDLogo() {
  const [webglSupported, setWebGLSupported] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  // 1. Comprehensive environment & WebGL capability check
  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    
    // Detect mobile and weak browsers
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua) || window.innerWidth < 768;
    const isInstagramOrFB = isMobileDevice && (ua.includes('instagram') || ua.includes('fbav') || ua.includes('fb_iab'));
    const isIOSWKWebView = isMobileDevice && /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(ua);

    // Instagram, Facebook, and WebViews have notoriously unstable WebGL implementation
    if (isInstagramOrFB || isIOSWKWebView) {
      setWebGLSupported(false);
      return;
    }

    // Try creating WebGL context to detect hardware capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setWebGLSupported(false);
        return;
      }

      // Detect weak / software rendering fallbacks that crash on complex scenes
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_DEVICE_STRING) || '';
        const lowerRenderer = renderer.toLowerCase();
        
        if (
          lowerRenderer.includes('swiftshader') || 
          lowerRenderer.includes('llvmpipe') || 
          lowerRenderer.includes('software')
        ) {
          setWebGLSupported(false);
          return;
        }
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  // 2. Loading Timeout Safeguard (max 6 seconds)
  useEffect(() => {
    if (isLoaded || !webglSupported || hasError) return;

    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 6000);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, webglSupported, hasError]);

  // 3. Tab Visibility observer to pause heavy GPU loops when tab is in background
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (!webglSupported || hasError) {
    return <ThreeDLogoFallback />;
  }

  return (
    <div 
      className="relative w-full h-[320px] md:h-[450px] select-none overflow-visible flex items-center justify-center"
      style={{ 
        touchAction: 'none', 
        zIndex: 10, 
        opacity: 1,
        filter: 'drop-shadow(0 20px 40px rgba(122, 74, 42, 0.04))'
      }}
    >
      <Suspense fallback={<SplineLoader />}>
        {/* Render a custom glassmorphic loader until Spline triggers onLoad */}
        {!isLoaded && <SplineLoader />}
        
        {/* Unmount / Pause rendering when tab is hidden to save battery & prevent CPU spikes */}
        {isTabActive ? (
          <Spline 
            scene="https://prod.spline.design/ZZl4542MG0qV9SZK/scene.splinecode" 
            onLoad={() => {
              setIsLoaded(true);
            }}
            onError={(err) => {
              setHasError(true);
            }}
            className="w-full h-full object-contain scale-[1.05]"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'auto',
            }}
          />
        ) : (
          <div className="w-full h-full bg-transparent" />
        )}
      </Suspense>
    </div>
  );
}
