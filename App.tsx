import React, { useState, Suspense, useEffect } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import SplatterBackground from "./components/SplatterBackground";
import Navigation from "./components/Navigation";
import { SectionType } from "./types";
import { FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zackstevens-/",
    icon: FaLinkedin,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/thezackstevens",
    icon: FaXTwitter,
  },
  {
    name: "Email",
    href: "mailto:imzackstevens@gmail.com",
    icon: FaEnvelope,
  },
] as const;

// Performance: Lazy load ContentPanel
const ContentPanel = React.lazy(() => import("./components/ContentPanel"));

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track mouse for Parallax effect (disabled when modal is open)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isModalOpen) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isModalOpen]);
  
  // Listen for modal state changes
  useEffect(() => {
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    
    window.addEventListener('projectModalOpen', handleModalOpen);
    window.addEventListener('projectModalClose', handleModalClose);
    
    return () => {
      window.removeEventListener('projectModalOpen', handleModalOpen);
      window.removeEventListener('projectModalClose', handleModalClose);
    };
  }, []);
  // Dynamic Selection Color Effect
  useEffect(() => {
    const root = document.documentElement;
    let color = "rgba(121, 40, 202, 0.3)"; // Default Purple
    if (activeSection === 'career') color = "rgba(255, 0, 128, 0.3)"; // Pink
    if (activeSection === 'projects') color = "rgba(0, 112, 243, 0.3)"; // Blue
    if (activeSection === 'thoughts') color = "rgba(121, 40, 202, 0.3)"; // Purple
    
    root.style.setProperty('--selection-color', color);
  }, [activeSection]);

  const contentFocusVariants = {
    idle: { x: 0, opacity: 1 },
    active: { x: 0, opacity: 1 }
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="h-screen w-screen overflow-hidden relative font-sans bg-[#F2F0EF] text-black">
        {!isModalOpen && (
          <SplatterBackground mouseX={mousePos.x} mouseY={mousePos.y} />
        )}
        
        {/* Main Layout Grid */}
        <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
          
          {/* Left Column: Identity & Nav */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16 pointer-events-auto shrink-0 transition-all duration-500">
            <m.div
              initial="idle"
              animate={activeSection ? "active" : "idle"}
              variants={contentFocusVariants}
              transition={{ duration: 0.5 }}
            >
              {/* Headshot + Name */}
              <div className="flex items-center gap-6 mb-4">
                {/* Headshot */}
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0"
                >
                  <img
                    src="/images/headshot.png"
                    alt="Zack Stevens"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/60 shadow-lg"
                  />
                </m.div>

                {/* Name with Rainbow Wave Effect */}
                <m.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight"
                >
                  <span className="stripe-gradient-text">Zack Stevens</span>
                </m.h1>
              </div>
              
              <p className="text-zinc-500 text-lg md:text-xl max-w-md mt-2 mb-8 font-light">
                Technical Sourcer & Curious Builder of AI recruiting tools.
              </p>

              {/* Navigation Links */}
              <Navigation 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
              />
            </m.div>
            <div className="mt-12 flex items-center gap-4 text-zinc-500">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-black"
                  aria-label={name}
                >
                  <span className="inline-flex items-center text-current" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Content Display Area */}
          <div className="w-full md:w-1/2 h-full relative pointer-events-none md:pointer-events-auto">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-zinc-300 animate-pulse">Loading...</div>}>
              <ContentPanel 
                activeSection={activeSection} 
                onClose={() => setActiveSection(null)} 
              />
            </Suspense>
          </div>
        </div>

      </main>
    </LazyMotion>
  );
}