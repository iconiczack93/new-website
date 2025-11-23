import React from 'react';

export const GradientMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-500">
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
      
      {/* Floating Orbs - Adaptive blend modes */}
      {/* In Dark Mode: mix-blend-screen/overlay to add light. In Light Mode: mix-blend-multiply to subtract light (add color) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Fog Overlay: Soft Gray in Light Mode (zinc-200), Black in Dark Mode */}
      <div className="absolute inset-0 bg-zinc-200/80 dark:bg-void/80 transition-colors duration-500"></div>
    </div>
  );
};