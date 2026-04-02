import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  'button',
  'a',
  '[data-cursor="hover"]',
  '[role="button"]',
  'input[type="submit"]',
  'input[type="button"]',
].join(',');

type CursorMode = 'default' | 'hover' | 'active';

type CursorState = {
  enabled: boolean;
  visible: boolean;
  mode: CursorMode;
  x: number;
  y: number;
  rotation: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function isTouchDevice() {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0
  );
}

export function useCursor() {
  const [state, setState] = useState<CursorState>({
    enabled: false,
    visible: false,
    mode: 'default',
    x: 0,
    y: 0,
    rotation: 0,
  });

  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pressedTimeoutRef = useRef<number | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const enabled = !isTouchDevice();
    if (!enabled) {
      setState((prev) => ({ ...prev, enabled: false, visible: false }));
      return;
    }

    setState((prev) => ({ ...prev, enabled: true }));

    // Initialize cursor near the viewport center so first render is deterministic.
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    pointerRef.current.x = startX;
    pointerRef.current.y = startY;
    currentRef.current.x = startX;
    currentRef.current.y = startY;
    setState((prev) => ({ ...prev, x: startX, y: startY }));

    const resetMagneticElement = () => {
      if (!hoveredElementRef.current) return;
      hoveredElementRef.current.style.translate = '0 0';
      hoveredElementRef.current.style.transition = 'translate 180ms ease-out';
    };

    const handleMouseMove = (event: MouseEvent) => {
      setState((prev) => (prev.visible ? prev : { ...prev, visible: true }));

      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;

      const target = event.target as Element | null;
      const interactive = target?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const magneticX = clamp(dx, -28, 28);
        const magneticY = clamp(dy, -20, 20);

        pointerRef.current.x = centerX + magneticX * 0.35;
        pointerRef.current.y = centerY + magneticY * 0.35;

        if (hoveredElementRef.current !== interactive) {
          resetMagneticElement();
          hoveredElementRef.current = interactive;
        }

        interactive.style.transition = 'translate 120ms ease-out';
        interactive.style.translate = `${magneticX * 0.12}px ${magneticY * 0.12}px`;

        setState((prev) => ({ ...prev, mode: prev.mode === 'active' ? 'active' : 'hover' }));
      } else {
        resetMagneticElement();
        hoveredElementRef.current = null;
        setState((prev) => ({ ...prev, mode: prev.mode === 'active' ? 'active' : 'default' }));
      }
    };

    const handleMouseDown = () => {
      setState((prev) => ({ ...prev, mode: 'active' }));
      if (pressedTimeoutRef.current) {
        window.clearTimeout(pressedTimeoutRef.current);
      }
      pressedTimeoutRef.current = window.setTimeout(() => {
        setState((prev) => ({ ...prev, mode: hoveredElementRef.current ? 'hover' : 'default' }));
      }, 130);
    };

    const handleMouseEnter = () => {
      setState((prev) => ({ ...prev, visible: true }));
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, visible: false, mode: 'default' }));
      resetMagneticElement();
      hoveredElementRef.current = null;
    };

    const animate = () => {
      const ease = 0.16;
      currentRef.current.x += (pointerRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (pointerRef.current.y - currentRef.current.y) * ease;

      const dx = pointerRef.current.x - currentRef.current.x;
      const dy = pointerRef.current.y - currentRef.current.y;
      const rotation = clamp(Math.atan2(dy, dx) * (180 / Math.PI), -18, 18);
      const floatOffset = Math.sin(performance.now() / 220) * 2;

      setState((prev) => ({
        ...prev,
        x: currentRef.current.x,
        y: currentRef.current.y + floatOffset,
        rotation,
      }));

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (pressedTimeoutRef.current) {
        window.clearTimeout(pressedTimeoutRef.current);
      }

      resetMagneticElement();
    };
  }, []);

  return state;
}
