import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface StatusBadgeProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isDark, toggleTheme }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles', // Adelanto, CA timezone
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-6 right-6 z-50 hidden md:flex flex-col items-end"
    >
      <div className="flex items-center gap-4 mb-1">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors pointer-events-auto"
        >
          {isDark ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-zinc-900" />}
        </button>

        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-emerald-600 dark:text-emerald-500 uppercase">Online</span>
        </div>
      </div>
      
      <div className="font-mono text-xs text-zinc-400 dark:text-gray-400">
        CA, USA <span className="text-zinc-900 dark:text-white/80 ml-1">[{time}]</span>
      </div>
    </motion.div>
  );
};