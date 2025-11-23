import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Linkedin, Mail, Github, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('imzackstevens@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative pt-32 pb-12 px-6 bg-zinc-200 dark:bg-black border-t border-zinc-300 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight"
        >
          Exploring the intersection of <br/> 
          AI and recruitment.
        </motion.h2>
        
        <p className="text-zinc-600 dark:text-gray-400 text-xl mb-12 font-light">
          Always open to connecting with fellow builders.
        </p>

        <div className="flex justify-center mb-20">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-4 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-display font-bold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {copied ? (
                <>
                  <Check size={20} /> Copied
                </>
              ) : (
                <>
                  <Mail size={20} /> imzackstevens@gmail.com
                </>
              )}
            </span>
            {/* Button Fill Animation */}
            <div className="absolute inset-0 bg-gray-700 dark:bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white dark:text-black">
              <Copy size={18} />
            </span>
          </motion.button>
        </div>

        <div className="flex justify-between items-end pt-12 border-t border-zinc-300 dark:border-white/10">
          <div className="text-left">
             <div className="flex gap-6 mb-4">
              <a 
                href="https://www.linkedin.com/in/zackstevens-/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/iconiczack93" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://x.com/imzackstevens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
             </div>
             <p className="text-xs text-zinc-500 dark:text-gray-600 font-mono">
               &copy; 2025 Zack Stevens.
             </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-gray-600 font-mono mb-1">
              Built with intention.
            </p>
            <p className="text-xs text-zinc-500 dark:text-gray-600 font-mono mb-2">
              *Accuracy estimates based on internal testing
            </p>
            <div className="flex items-center justify-end gap-2">
              <span className="w-2 h-2 bg-emerald-500/50 rounded-full animate-pulse"></span>
              <span className="text-xs text-zinc-500 dark:text-gray-500 font-mono">Systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};