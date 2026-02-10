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
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Larger stars
        this.speedY = Math.random() * 0.15 + 0.08;
        this.opacity = Math.random() * 0.4 + 0.6; // Higher base opacity
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
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
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const isDark = document.documentElement.classList.contains('dark');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = `rgba(80, 150, 255, ${this.opacity * pulse * 0.8})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(80, 150, 255, ${this.opacity * 0.5})`;
        } else {
          // Very dark navy blue with full opacity for maximum visibility
          ctx.fillStyle = `rgba(15, 35, 90, ${Math.min(this.opacity * pulse, 1)})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(15, 35, 90, 0.8)`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create ambient stars
    const starCount = 80; // More stars for better visibility
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-100 dark:opacity-50"
      style={{ zIndex: 0, mixBlendMode: 'normal' }}
    />
  );
};

export default AnimatedBackground;
