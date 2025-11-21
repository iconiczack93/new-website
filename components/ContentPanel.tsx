
import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useScroll, useSpring, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';
import { SectionType, Project, CareerItem, ThoughtItem, EducationItem, SkillCategory } from '../types';
import { PROJECTS, CAREER, THOUGHTS, EDUCATION, SKILLS } from '../constants';

const isGradient = (str: string) => str.includes('gradient');
const isVideo = (str: string) => /\.(mp4|webm|ogg)$/i.test(str);
const findPreviewImage = (images?: string[]) =>
  images?.find((asset) => asset && !isVideo(asset) && !isGradient(asset));

interface ContentPanelProps {
  activeSection: SectionType;
  onClose: () => void;
}

// Updated variants for slide transitions (Card Deck effect)
const panelVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// --- New Component: Project Modal (Lightbox Style) ---
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  layoutId?: string | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, layoutId }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = project.images || [];
  const hasGallery = images.length > 0;
  const containsVideo = images.some(isVideo);

  useEffect(() => {
    // Notify App that modal is open to pause background animations
    window.dispatchEvent(new CustomEvent('projectModalOpen'));
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Notify App that modal is closed to resume background animations
      window.dispatchEvent(new CustomEvent('projectModalClose'));
    };
  }, [onClose]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // No delayed autoplay; rely on video asset itself

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 isolate"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#F6F1EA]/95 backdrop-blur-xl" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <m.div
        layoutId={layoutId ?? undefined}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-7xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full transition-colors text-zinc-500 hover:text-black border border-zinc-200/50 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Gallery Section (Left Side) */}
        {hasGallery ? (
          <div className="relative w-full lg:w-[65%] h-64 lg:h-full bg-white shrink-0 select-none group overflow-hidden" style={{ willChange: 'auto', contain: 'layout style paint' }}>
             <AnimatePresence initial={false} custom={slideIndex}>
                <m.div
                  layoutId={`project-${project.title}-media`}
                  key={slideIndex}
                  initial={isVideo(images[slideIndex]) ? { opacity: 0 } : { x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={isVideo(images[slideIndex]) ? { opacity: 0 } : { x: -300, opacity: 0 }}
                  transition={isVideo(images[slideIndex]) ? 
                    { opacity: { duration: 0.3 } } : 
                    { 
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }
                  }
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#F6F1EA]"
                  style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
                >
                  {isVideo(images[slideIndex]) ? (
                    <video
                      key={images[slideIndex]}
                      src={images[slideIndex]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                      style={{ willChange: 'auto', backfaceVisibility: 'hidden' }}
                    />
                  ) : isGradient(images[slideIndex]) ? (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        background: images[slideIndex],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  ) : (
                    <img
                      src={images[slideIndex]}
                      alt={`${project.title} screenshot ${slideIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  )}
                </m.div>
              </AnimatePresence>
              
              {/* Navigation overlays with Arrows */}
              <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                 <button 
                   onClick={prevSlide} 
                   className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white text-zinc-600 hover:text-black transition-all hover:scale-110"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                <button 
                  onClick={nextSlide} 
                  className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white text-zinc-600 hover:text-black transition-all hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              {/* Invisible click areas for ease of use (no shadow) */}
              <div className="absolute inset-0 flex z-10">
                <div onClick={prevSlide} className="w-1/3 h-full cursor-pointer" />
                <div className="w-1/3 h-full cursor-default" />
                <div onClick={nextSlide} className="w-1/3 h-full cursor-pointer" />
              </div>

               {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 text-xs font-mono font-bold text-zinc-600 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-white/50 shadow-sm z-20">
                {slideIndex + 1} / {images.length}
              </div>
          </div>
        ) : (
          <div className="h-24 lg:h-full lg:w-[65%] bg-gradient-to-r from-zinc-100 to-zinc-50 shrink-0" />
        )}

        {/* Content Section (Right Side) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar bg-white relative">
           <div className="flex flex-col gap-4 mb-8 mt-8 lg:mt-0">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black leading-tight">{project.title}</h2>
             <div className="flex items-center gap-4">
                <span className="text-sm font-mono font-bold text-zinc-400">{project.year}</span>
                <div className="h-[1px] flex-1 bg-zinc-100" />
             </div>
           </div>

           <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
           </div>

           <p className="text-lg font-light leading-relaxed text-zinc-700 mb-12">
             {project.description}
           </p>
           
           {/* Case Study Details */}
           <div className="space-y-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-red-500 rounded-full"></span> 
                  The Challenge
                </h4>
                <p className="text-zinc-600 text-sm leading-7 font-light">
                  Navigating the complexities of modern recruitment requires tools that can adapt to rapid organizational changes. The goal was to eliminate the manual overhead of researching company structures and matching candidate profiles.
                </p>
              </div>
               <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                  The Solution
                </h4>
                <p className="text-zinc-600 text-sm leading-7 font-light">
                  By integrating dual-engine AI verification with Gemini and Claude, we achieved a level of data synthesis that previously took hours, now compressed into seconds.
                </p>
              </div>
           </div>
        </div>
      </m.div>
    </m.div>
  );
};

const ProjectItem: React.FC<{ project: Project; onClick: () => void; onPreviewClick?: () => void }> = ({ project, onClick, onPreviewClick }) => {
  const previewImage = findPreviewImage(project.images);

  return (
    <m.div 
      variants={itemVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }}
      layout
      onClick={onClick}
      className="group mb-12 cursor-pointer relative"
    >
      {previewImage && (
        <m.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewClick?.();
          }}
          layoutId={`project-preview-${project.title}`}
          className="hidden lg:block absolute top-1/2 right-[-13rem] -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/30"
          aria-label={`Open ${project.title} project`}
        >
          <div className="w-52 h-36 rounded-2xl overflow-hidden border border-white/60 shadow-lg shadow-black/10 bg-white/90 backdrop-blur">
            <img
              src={previewImage}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </m.button>
      )}
      <div className="flex flex-col gap-2 mb-3 transition-transform duration-300 group-hover:translate-x-2">
        <div className="flex items-baseline gap-4">
          <h3 className="text-3xl font-light tracking-tight text-zinc-900 group-hover:text-[#7928ca] transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
            View Project
          </span>
        </div>
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{project.year}</span>
      </div>

      <p className="text-zinc-600 mb-4 leading-relaxed text-lg font-light max-w-xl group-hover:text-zinc-900 transition-colors line-clamp-2">
        {project.description}
      </p>
      
      <div className="flex gap-2 flex-wrap">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-white/50 border border-zinc-200/50 rounded-md text-[10px] text-zinc-500 font-bold tracking-wider uppercase backdrop-blur-sm">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
           <span className="px-2 py-1 text-[10px] text-zinc-400 font-bold tracking-wider uppercase">+{project.tags.length - 3}</span>
        )}
      </div>
    </m.div>
  );
};

const ContentPanel: React.FC<ContentPanelProps> = ({ activeSection, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandingPreviewId, setExpandingPreviewId] = useState<string | null>(null);
  
  // Progress Bar Logic - only track scroll when there's content
  const { scrollYProgress } = useScroll({ 
    container: activeSection ? scrollContainerRef : undefined
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Keyboard accessibility
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, selectedProject]);

  // Smooth scrolling with Lenis
  useEffect(() => {
    if (activeSection && scrollContainerRef.current) {
      const lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        content: scrollContainerRef.current.firstElementChild as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [activeSection]);

  const openProject = (project: Project, fromPreview = false) => {
    setSelectedProject(project);
    setExpandingPreviewId(fromPreview ? project.title : null);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setExpandingPreviewId(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return (
          <div className="pt-2 pb-20">
             {PROJECTS.map((project: Project, i) => (
               <ProjectItem 
                 key={i} 
                 project={project} 
                 onClick={() => openProject(project)} 
                 onPreviewClick={() => openProject(project, true)}
               />
             ))}
          </div>
        );
      case 'career':
      case null:
        return (
          <div className="relative pl-4">
             {/* Continuous Timeline Line */}
             <div className="absolute left-0 top-2 bottom-4 w-[1px] bg-gradient-to-b from-[#7928ca] via-[#ff0080] to-zinc-200/50" />
             
             {/* Work Experience */}
            <div className="space-y-20 mb-20">
              {CAREER.map((job: CareerItem, i) => (
                <m.div 
                  key={i} 
                  variants={itemVariants} 
                  initial="hidden" 
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative pl-8 md:pl-10"
                >
                   {/* Timeline Node */}
                   <span className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-white border-[2.5px] border-[#7928ca] z-10 ring-4 ring-white/30" />
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">{job.role}</h3>
                    <span className="font-mono text-sm text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md">{job.period}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#ff0080] font-semibold text-lg">{job.company}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                    <span className="text-sm text-zinc-500 font-medium">{job.location}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-zinc-700 leading-relaxed text-lg font-light">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills with Glass Borders */}
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-3 py-1 bg-white/40 border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-md text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:border-[#0070f3] hover:text-[#0070f3] hover:bg-white transition-all duration-300 cursor-default backdrop-blur-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </m.div>
              ))}
            </div>

            {/* Skills Section */}
             <m.div 
               variants={itemVariants} 
               initial="hidden" 
               whileInView="visible" 
               viewport={{ once: true }}
               className="relative pl-8 md:pl-10 mb-20"
             >
               <span className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-white border-[2.5px] border-[#0070f3] z-10 ring-4 ring-white/30" />
               <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-widest mb-8">Skills Arsenal</h3>
               <div className="grid grid-cols-1 gap-8">
                 {SKILLS.map((skillGroup, idx) => (
                   <div key={idx}>
                     <h4 className="text-sm font-bold text-zinc-400 uppercase mb-3">{skillGroup.category}</h4>
                     <div className="flex flex-wrap gap-2">
                       {skillGroup.items.map((item, sIdx) => (
                         <span key={sIdx} className="text-zinc-700 bg-white/50 border border-white/60 shadow-sm px-3 py-1.5 rounded text-sm backdrop-blur-sm">
                           {item}
                         </span>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </m.div>

             {/* Education Section */}
             <m.div 
               variants={itemVariants} 
               initial="hidden" 
               whileInView="visible" 
               viewport={{ once: true }}
               className="relative pl-8 md:pl-10"
             >
               <span className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-white border-[2.5px] border-[#0070f3] z-10 ring-4 ring-white/30" />
               <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-widest mb-8">Education</h3>
               <div className="space-y-8">
                 {EDUCATION.map((edu, idx) => (
                   <div key={idx} className="group">
                     <h4 className="text-lg font-bold text-zinc-800">{edu.school}</h4>
                     <div className="flex justify-between items-center text-zinc-600 font-light mt-1">
                       <span>{edu.degree}</span>
                       <span className="text-sm font-mono bg-zinc-100 px-2 py-0.5 rounded">{edu.year}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </m.div>
          </div>
        );
      case 'thoughts':
        return (
          <div className="grid gap-12">
            {THOUGHTS.map((thought: ThoughtItem, i) => (
              <m.div 
                key={i} 
                variants={itemVariants} 
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true }}
                className="group cursor-pointer relative pl-6 border-l-2 border-transparent hover:border-[#0070f3]/30 transition-colors duration-500"
              >
                <span className="text-xs font-bold text-[#0070f3] uppercase tracking-widest mb-2 block">{thought.date}</span>
                <h3 className="text-3xl md:text-4xl font-serif italic mb-4 text-zinc-800 group-hover:text-[#7928ca] transition-colors duration-300">{thought.title}</h3>
                <p className="text-zinc-600 leading-relaxed text-lg md:text-xl font-light max-w-xl">{thought.preview}</p>
                <div className="mt-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#0070f3] font-medium text-sm flex items-center gap-2">
                  Read Article <span className="text-xl">→</span>
                </div>
              </m.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <LayoutGroup>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={closeProject} 
            layoutId={expandingPreviewId === selectedProject.title ? `project-preview-${selectedProject.title}` : undefined}
          />
        )}
      </AnimatePresence>

      <div 
        className={`
          pointer-events-auto
          fixed inset-0 z-50 md:z-auto
          md:static md:inset-auto
          w-full h-full
          bg-[#F2F0EF] md:bg-transparent
          flex flex-col
          /* Performance: contain paints to this element */
          contain-content
        `}
      >
        {/* Mobile Close Button Header */}
        <div className="md:hidden flex justify-end p-6 border-b border-zinc-200/50 bg-[#F2F0EF]/90 backdrop-blur-sm sticky top-0 z-10">
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-black">
            <span className="text-sm font-medium uppercase tracking-widest">Close</span>
          </button>
        </div>

        {/* Reading Progress Indicator (Desktop) */}
        <m.div 
          className="hidden md:block fixed right-[2px] top-1/4 bottom-1/4 w-[2px] bg-zinc-200 rounded-full overflow-hidden z-50"
          style={{ height: '50vh' }}
        >
          <m.div 
            className="w-full bg-gradient-to-b from-[#7928ca] to-[#0070f3]" 
            style={{ scaleY, transformOrigin: "top" }} 
          />
        </m.div>

        <AnimatePresence mode="wait">
          {activeSection && (
            <m.div
              key={activeSection}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-16 pt-4 md:pt-12 pb-24 w-full h-full"
              ref={scrollContainerRef}
            >
              {/* Section Header */}
              <m.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase mb-12 md:mb-20"
              >
                {activeSection}
              </m.h2>
              
              <div className="max-w-3xl">
                {renderContent()}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default ContentPanel;
