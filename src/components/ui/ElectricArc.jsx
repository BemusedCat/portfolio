import { useEffect, useRef } from 'react';
import useViewMode from '../../hooks/useViewMode';

export default function ElectricArc({ height = 100, className = '' }) {
  const { isModernView } = useViewMode();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isModernView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const drawLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const segments = 15;
      const segmentHeight = canvas.height / segments;

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);

      for (let i = 1; i <= segments; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * 20;
        const y = i * segmentHeight;
        ctx.lineTo(x, y);
      }

      // Main bolt
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00f2fe';
      ctx.stroke();

      // Glow
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Occasional bright flash
      if (Math.random() > 0.95) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    };

    // Throttle to ~20fps for performance
    const interval = setInterval(() => {
      drawLightning();
    }, 50);

    return () => {
      clearInterval(interval);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isModernView]);

  if (!isModernView) {
    return (
      <div
        className={`w-0.5 bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={40}
      height={height}
      className={className}
      style={{ width: '40px', height }}
    />
  );
}
