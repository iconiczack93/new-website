import React, { useRef, useState } from 'react';
import { m } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { SectionType } from '../types';

interface NavigationProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

// Magnetic Button Component
const MagneticItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // Magnetic strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </m.div>
  );
};

const Navigation: React.FC<NavigationProps> = React.memo(({ activeSection, setActiveSection }) => {
  return (
    <nav className="flex flex-col gap-2 mt-8">
      {NAV_ITEMS.map((item, index) => (
        <m.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          className="w-fit"
        >
          <MagneticItem>
            <button
              onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
              className={`
                text-2xl md:text-3xl font-medium transition-colors duration-300 tracking-tight block py-1 group relative w-fit text-left
                ${activeSection === item.id ? 'text-black' : 'text-zinc-500 hover:text-black'}
              `}
            >
              {item.name}
              <span 
                className={`
                  absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#7928ca] to-[#ff0080] transition-all duration-300
                  ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}
                `} 
              />
            </button>
          </MagneticItem>
        </m.div>
      ))}
    </nav>
  );
});

export default Navigation;