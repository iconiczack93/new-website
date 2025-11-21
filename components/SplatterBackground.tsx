import React, { useMemo } from 'react';
import { m } from 'framer-motion';

interface SplatterBackgroundProps {
  mouseX: number;
  mouseY: number;
  isPaused?: boolean;
}

const SplatterBackground: React.FC<SplatterBackgroundProps> = React.memo(({ mouseX, mouseY, isPaused = false }) => {
  
  const splatters = [
    { color: "#E0C3FC", x: 10, y: 20, scale: 1.2, delay: 0, parallaxFactor: 2 },
    { color: "#8EC5FC", x: 80, y: 15, scale: 1.5, delay: 2, parallaxFactor: -1.5 },
    { color: "#FBC2EB", x: 30, y: 80, scale: 1.3, delay: 4, parallaxFactor: 1 },
    { color: "#A18CD1", x: 70, y: 70, scale: 1.4, delay: 1, parallaxFactor: -2 },
  ];

  // Calculate parallax offset based on mouse position
  // We normalize mouseX/Y from 0..1 to -1..1 range approximately for the effect
  const xOffset = (mouseX / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5) * 40;
  const yOffset = (mouseY / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5) * 40;

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#F2F0EF]"
      style={{ display: isPaused ? "none" : "block" }}
    >
      {/* Performance: Static noise filter instead of dynamic to save GPU */}
      <svg className="w-full h-full opacity-60 blur-3xl absolute inset-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.15" />
      </svg>

      {splatters.map((s, i) => (
        <m.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          style={{
            backgroundColor: s.color,
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: '40vw',
            height: '40vw',
            willChange: isPaused ? 'auto' : 'transform',
          }}
          animate={isPaused ? {} : {
            x: [0, 30, -20, 0], // Organic movement
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
            // Parallax shift
            translateX: xOffset * s.parallaxFactor,
            translateY: yOffset * s.parallaxFactor,
          }}
          transition={isPaused ? {} : {
            // Organic transitions
            x: { duration: 20, repeat: Infinity, ease: "easeInOut", delay: s.delay },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: s.delay + 1 },
            scale: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: s.delay },
            // Parallax is snappy
            translateX: { type: "spring", stiffness: 50, damping: 20 },
            translateY: { type: "spring", stiffness: 50, damping: 20 },
          }}
        />
      ))}
      
      {/* Overlay texture for paper feel - Rendered once */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
});

export default SplatterBackground;