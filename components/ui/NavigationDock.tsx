import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Home, Layers, User, Mail } from 'lucide-react';

const links = [
  { icon: Home, label: 'Home', id: 'hero' },
  { icon: Layers, label: 'Work', id: 'work' },
  { icon: User, label: 'Experience', id: 'experience' },
  { icon: Mail, label: 'Contact', id: 'contact' },
];

interface AppIconProps {
  mouseX: MotionValue<number>;
  icon: React.ElementType;
  id: string;
}

const AppIcon: React.FC<AppIconProps> = ({ mouseX, icon: Icon, id }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={handleClick}
      className="aspect-square w-10 rounded-full bg-zinc-200/50 dark:bg-white/10 border border-black/5 dark:border-white/5 flex items-center justify-center hover:bg-zinc-300/50 dark:hover:bg-white/20 cursor-pointer backdrop-blur-md transition-colors relative group"
    >
      <Icon className="text-zinc-900 dark:text-white w-5 h-5 group-hover:text-zinc-700 dark:group-hover:text-white/90" />
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-100/80 dark:bg-black/80 text-zinc-900 dark:text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/10 dark:border-white/10 font-mono uppercase whitespace-nowrap">
        {id}
      </span>
    </motion.div>
  );
};

export const NavigationDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showDock = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Auto hide after 2 seconds of no activity
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleHover = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show on any scroll
      showDock();
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Show initially
    showDock();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
         onMouseEnter={handleHover}
         onMouseLeave={handleLeave}
    >
      <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-zinc-100/50 dark:bg-black/50 border border-white/20 dark:border-white/10 px-4 pb-3 pt-3 backdrop-blur-xl shadow-xl dark:shadow-none"
            >
                {links.map((link) => (
                <AppIcon key={link.id} mouseX={mouseX} icon={link.icon} id={link.id} />
                ))}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};