import React, { useState, useEffect } from 'react';
import { GradientMesh } from './components/ui/GradientMesh';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { Work } from './components/sections/Work';
import { ExperienceSection } from './components/sections/Experience';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { ProjectDrawer } from './components/ui/ProjectDrawer';
import { ConstellationCanvas } from './components/ui/ConstellationCanvas';
import { Project } from './types';

const App: React.FC = () => {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Theme Toggle Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Blueprint Mode Listener (Shift key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setBlueprintMode(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setBlueprintMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className={`relative min-h-screen w-full ${blueprintMode ? 'blueprint-grid' : ''}`}>
      <GradientMesh />
      <ConstellationCanvas isDark={isDark} />
      
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* UI Overlays */}
      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Blueprint Mode Indicator */}
      {blueprintMode && (
         <div className="fixed top-4 left-4 z-[10000] bg-accent text-white px-3 py-1 font-mono text-xs rounded-md border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            BLUEPRINT MODE: ACTIVE
         </div>
      )}

      <main className="relative z-10 flex flex-col pb-24">
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <Work onOpenProject={setSelectedProject} />
        <div id="experience"><ExperienceSection /></div>
        <div id="contact"><Contact /></div>
      </main>
    </div>
  );
};

export default App;