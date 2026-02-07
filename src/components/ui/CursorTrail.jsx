import { useEffect, useRef } from 'react';
import useViewMode from '../../hooks/useViewMode';

const MAX_PARTICLES = 30;
const COLORS = ['#00f2fe', '#ff00ff', '#39ff14'];

export default function CursorTrail() {
  const { isModernView } = useViewMode();
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const lastSpawn = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isModernView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle: only spawn particles every 50ms
      if (now - lastSpawn.current < 50) return;
      lastSpawn.current = now;

      // Limit max particles
      if (particles.current.length >= MAX_PARTICLES) return;

      // Add just 1 particle
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 2,
        life: 1,
        color: COLORS[Math.floor(Math.random() * 3)],
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.life -= 0.04;
        p.size *= 0.96;

        if (p.life <= 0 || p.size < 0.5) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.6;
        ctx.fill();

        return true;
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isModernView]);

  if (!isModernView) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
