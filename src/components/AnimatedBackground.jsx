import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let scrollY = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Star class for ambient particles
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.1 + 0.05;
        this.opacity = Math.random() * 0.5 + 0.2;
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity * pulse})`;
        ctx.fill();
      }
    }

    // Particle class for geometric shapes
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.size = Math.random() * 80 + 30;
        this.speedY = Math.random() * 0.3 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.25 + 0.1;
        this.shape = Math.floor(Math.random() * 5);
        this.glowIntensity = Math.random() * 0.5 + 0.5;
        
        const colors = [
          { r: 59, g: 130, b: 246, name: 'blue' },
          { r: 139, g: 92, b: 246, name: 'purple' },
          { r: 236, g: 72, b: 153, name: 'pink' },
          { r: 6, g: 182, b: 212, name: 'cyan' },
          { r: 168, g: 85, b: 247, name: 'neon-purple' }
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * 3;
          this.y -= (dy / distance) * force * 3;
        }

        this.y += this.speedY + scrollY * 0.0008;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 150) this.reset();
        if (this.x < -150) this.x = canvas.width + 150;
        if (this.x > canvas.width + 150) this.x = -150;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.2);
        glowGradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${0.3 * this.glowIntensity})`);
        glowGradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${0.1 * this.glowIntensity})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Shape gradient
        const shapeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size / 2);
        shapeGradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`);
        shapeGradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.1)`);

        ctx.fillStyle = shapeGradient;
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`;
        ctx.lineWidth = 1.5;

        switch (this.shape) {
          case 0:
            this.drawCube(ctx);
            break;
          case 1:
            this.drawCircle(ctx);
            break;
          case 2:
            this.drawTriangle(ctx);
            break;
          case 3:
            this.drawHexagon(ctx);
            break;
          case 4:
            this.drawDiamond(ctx);
            break;
        }

        ctx.restore();
      }

      drawCube(ctx) {
        const s = this.size / 2.5;
        const offset = s * 0.35;

        ctx.fillRect(-s, -s, s * 2, s * 2);
        ctx.strokeRect(-s, -s, s * 2, s * 2);

        ctx.globalAlpha = this.opacity * 0.7;
        ctx.beginPath();
        ctx.moveTo(-s, -s);
        ctx.lineTo(-s + offset, -s - offset);
        ctx.lineTo(s + offset, -s - offset);
        ctx.lineTo(s, -s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s, -s);
        ctx.lineTo(s + offset, -s - offset);
        ctx.lineTo(s + offset, s - offset);
        ctx.lineTo(s, s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      drawTriangle(ctx) {
        const s = this.size / 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, s);
        ctx.lineTo(-s, s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawHexagon(ctx) {
        const s = this.size / 2.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = s * Math.cos(angle);
          const y = s * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawDiamond(ctx) {
        const s = this.size / 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Create ambient stars
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(new Star());
    }

    // Create particles
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      // Draw connecting lines
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 300) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 180, 255, ${0.1 * (1 - distance / 300)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
    />
  );
};

export default AnimatedBackground;
