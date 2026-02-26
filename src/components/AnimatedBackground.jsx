import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class for ambient particles
    class Star {
      constructor() {
        this.reset();
        this.visibleInLight = true; // All stars visible in light mode
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8; // Balanced size for both modes
        this.speedY = Math.random() * 0.1 + 0.05;
        this.opacity = Math.random() * 0.35 + 0.45; // Balanced opacity
        this.pulseSpeed = Math.random() * 0.02 + 0.01; // Smooth, gentle twinkle
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;
        this.y += this.speedY;
        
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx) {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Use persistent visibility flag for light mode (no flickering)
        if (!isDark && !this.visibleInLight) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7; // Smooth, gentle pulse
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (isDark) {
          // Elegant glowing stars in dark mode
          ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * pulse * 0.7})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(139, 92, 246, ${this.opacity * pulse * 0.5})`;
        } else {
          // Subtle, professional stars in light mode
          ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * pulse * 0.4})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(59, 130, 246, ${this.opacity * 0.3})`;
        }
        
        ctx.fill();
        
        // Subtle double glow for depth
        ctx.shadowBlur = isDark ? 20 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create ambient stars
    const starCount = 70; // More stars for better effect
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(new Star());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 dark:opacity-50"
      style={{ zIndex: 0, mixBlendMode: 'normal' }}
    />
  );
};

export default AnimatedBackground;
