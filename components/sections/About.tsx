import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 w-full bg-zinc-300 dark:bg-black relative overflow-hidden transition-colors duration-500">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Headshot Frame */}
          <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-200 to-gray-200 dark:from-white/20 dark:to-gray-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 bg-gray-200 dark:bg-gray-900 shadow-2xl">
                  <img 
                    src="/headshot.jpg" 
                    alt="Zack Stevens" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 hover:scale-105 transition-transform"
                    loading="eager"
                    onError={(e) => {
                        // Fallback if image is missing
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-[#111] text-gray-700 font-mono text-xs text-center p-4">ADD headshot.jpg to /public</div>';
                    }}
                  />
              </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold font-syne text-zinc-900 dark:text-white mb-6 leading-tight"
             >
                A technical sourcer who <br/>
                <span className="text-zinc-500 dark:text-gray-500">builds their own tools.</span>
             </motion.h2>
             
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="h-1 w-24 bg-accent mb-6 mx-auto md:mx-0" 
             />

             <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-zinc-700 dark:text-gray-400 text-xl font-light leading-relaxed"
             >
                4 years of high-volume technical sourcing meets custom AI engineering. The result? Tools that 10x recruiting efficiency.
             </motion.p>
          </div>
      </div>
    </section>
  );
};