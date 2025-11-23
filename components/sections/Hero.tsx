import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative h-[95vh] w-full flex flex-col justify-center items-center px-6 overflow-hidden">
      
      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="text-center z-10 max-w-7xl"
      >
        <motion.div
           initial={{ y: 100, opacity: 0, rotateX: -20 }}
           animate={{ y: 0, opacity: 1, rotateX: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-[12vw] leading-[0.9] font-bold text-zinc-900 dark:text-white mb-8 tracking-tighter mix-blend-difference flex flex-col md:block">
            <span>ZACK</span>
            <br className="hidden md:block" />
            <span className="md:ml-4">STEVENS</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="font-mono text-accent text-lg md:text-xl tracking-widest uppercase">
            Technical Sourcer // Tool Builder
          </p>
          <p className="text-zinc-500 dark:text-gray-400 text-lg font-light max-w-md mx-auto leading-relaxed">
            Building the AI-powered tools that find the talent others miss.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-white/20"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};