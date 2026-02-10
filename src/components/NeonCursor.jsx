import React, { useEffect, useRef, useState } from 'react';

const NeonCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    
    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const animateOutline = () => {
      const delay = 0.15;
      outlineX += (mouseX - outlineX) * delay;
      outlineY += (mouseY - outlineY) * delay;
      
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      
      requestAnimationFrame(animateOutline);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateOutline();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`neon-cursor-dot ${isHovering ? 'hover' : ''}`}
      />
      {/* Cursor outline */}
      <div
        ref={cursorOutlineRef}
        className={`neon-cursor-outline ${isHovering ? 'hover' : ''}`}
      />
    </>
  );
};

export default NeonCursor;
