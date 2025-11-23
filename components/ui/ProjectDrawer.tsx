import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Activity } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

// --- SIMULATIONS ---

const FrameworkSim = () => (
    <div className="relative w-full h-[550px] bg-black rounded-lg overflow-hidden border border-white/10">
        <iframe 
            src="/framework-mockup-v3.html" 
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Framework Interface"
        />
    </div>
);

const PrismSim = () => (
    <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden border border-white/10">
        <iframe 
            src="/prism-mockup-v3.html" 
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Prism Interface"
        />
    </div>
);

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-zinc-100 dark:bg-[#0A0A0A] border-l border-zinc-300 dark:border-white/10 z-[70] shadow-2xl overflow-y-auto"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-gray-500">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   SYSTEM_READY
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-zinc-900 dark:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <h2 className="text-5xl md:text-6xl font-syne font-bold text-zinc-900 dark:text-white mb-6 uppercase break-words">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 border border-zinc-300 dark:border-white/10 rounded text-xs font-mono text-zinc-500 dark:text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-xl text-zinc-600 dark:text-gray-300 font-light leading-relaxed mb-12 border-l-2 border-zinc-900/20 dark:border-white/20 pl-6">
                {project.description}
              </p>

              {/* Interface Preview */}
              <div className="mb-12">
                  {project.id === 'framework' ? <FrameworkSim /> : <PrismSim />}
              </div>

              <div className="grid grid-cols-2 gap-6">
                  <div className="bg-zinc-200 dark:bg-white/5 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-gray-400">
                      <Cpu size={18} />
                      <span className="text-xs uppercase tracking-wider">Processing</span>
                      </div>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white font-syne">
                      {project.id === 'framework' ? 'Dual-Engine' : 'Algorithmic'}
                      </span>
                  </div>
                  <div className="bg-zinc-200 dark:bg-white/5 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4 text-zinc-500 dark:text-gray-400">
                      <Activity size={18} />
                      <span className="text-xs uppercase tracking-wider">Efficiency</span>
                      </div>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white font-syne">
                      99.9%
                      </span>
                  </div>
              </div>
              
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};