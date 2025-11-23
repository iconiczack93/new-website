
import React, { useEffect, useRef } from 'react';

interface Pill {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  width: number;
  height: number;
  color: string;
}

const skills = [
  { text: 'Cursor', color: '#ffffff' },
  { text: 'Flowith', color: '#FFD700' },
  { text: 'Google AI Studio', color: '#4285F4' },
  { text: 'Claude', color: '#D97757' },
  { text: 'LinkedIn Recruiter', color: '#0A66C2' },
  { text: 'Gem', color: '#FC5858' },
  { text: 'Greenhouse', color: '#00B26E' },
  { text: 'Lever', color: '#F78131' },
  { text: 'GitHub', color: '#ffffff' },
  { text: 'Perplexity', color: '#38BDF8' }
];

export const GravityPills: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  const handleMouseLeave = () => {
       mouseRef.current = { x: -1000, y: -1000 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize pills
    const pills: Pill[] = skills.map((skill, i) => ({
      id: i,
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 50) + 25,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      text: skill.text,
      width: 0, // Calculated later
      height: 36,
      color: skill.color
    }));

    // Pre-calculate widths
    ctx.font = '14px monospace';
    pills.forEach(p => {
      p.width = ctx.measureText(p.text).width + 32; // Padding
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      pills.forEach((p, i) => {
        // Physics
        p.x += p.vx;
        p.y += p.vy;

        // Mouse Repulsion
        const dx = p.x + p.width / 2 - mouseRef.current.x;
        const dy = p.y + p.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 150;
          p.vx += Math.cos(angle) * force * 0.5;
          p.vy += Math.sin(angle) * force * 0.5;
        }

        // Wall collisions
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x + p.width > width) { p.x = width - p.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y + p.height > height) { p.y = height - p.height; p.vy *= -1; }

        // Drag / Friction
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        // Keep them moving slightly
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.1;

        // Pill Pill Collision (Simplified AABB)
        for (let j = i + 1; j < pills.length; j++) {
            const p2 = pills[j];
            if (p.x < p2.x + p2.width && p.x + p.width > p2.x &&
                p.y < p2.y + p2.height && p.y + p.height > p2.y) {
                 // Simple elastic bounce
                 const tempVx = p.vx;
                 const tempVy = p.vy;
                 p.vx = p2.vx;
                 p.vy = p2.vy;
                 p2.vx = tempVx;
                 p2.vy = tempVy;
            }
        }

        // Draw Pill
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.width, p.height, 18);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px JetBrains Mono';
        ctx.fillText(p.text, p.x + 16, p.y + 22);
        
        // Accent Dot
        ctx.beginPath();
        ctx.arc(p.x + p.width - 12, p.y + 12, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[300px] relative overflow-hidden bg-black/20 rounded-2xl border border-white/5">
      <div className="absolute top-4 left-4 text-xs font-mono text-gray-500 z-10 pointer-events-none">
        ARSENAL_ACTIVE // INTERACTIVE
      </div>
      <canvas 
        ref={canvasRef} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full cursor-crosshair"
      />
    </div>
  );
};
