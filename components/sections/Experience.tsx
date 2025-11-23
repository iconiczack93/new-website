import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../../types';
import { Cpu, ScanSearch, Database, Layers } from 'lucide-react';

const experiences: Experience[] = [
  {
    id: 'startuptap',
    company: 'StartupTAP',
    role: 'Research Associate / Technical Sourcer',
    period: 'Dec 2021 — Present',
    logo: 'S',
    description: 'Technical sourcing for high-growth startups. Building pipelines for Product and Engineering roles at scale.',
    impact: [
      'Managing 30+ searches annually across Product & Eng',
      'Built pipelines of 50-100+ qualified candidates per search',
      'Developed custom tools now used across entire recruiting team'
    ]
  },
  {
    id: 'previous',
    company: 'Early Career',
    role: 'Operations & Policy',
    period: '2015 — 2021',
    logo: 'E',
    description: 'Operational and analytical experience across healthcare and government sectors.',
    impact: [
      'Claims Examiner @ Desert Valley Hospital',
      'Congressional Intern @ US Congress',
      'BA in Political Science @ UC Riverside'
    ]
  }
];

const skillCategories = [
  {
    id: 'ai',
    title: 'AI & Development',
    icon: Cpu,
    color: 'text-purple-600 dark:text-purple-400',
    skills: [
      "Claude API", 
      "Gemini API", 
      "Google AI Studio", 
      "Cursor", 
      "Flowith", 
      "Chrome Ext Dev", 
      "Prompt Eng"
    ]
  },
  {
    id: 'intel',
    title: 'Sourcing Intelligence',
    icon: ScanSearch,
    color: 'text-emerald-600 dark:text-emerald-400',
    skills: [
      "Boolean Search", 
      "Talent Mapping", 
      "Competitive Intel", 
      "Perplexity", 
      "GitHub X-Ray"
    ]
  },
  {
    id: 'stack',
    title: 'Recruiting Stack',
    icon: Database,
    color: 'text-blue-600 dark:text-blue-400',
    skills: [
      "LinkedIn Recruiter", 
      "Gem", 
      "HireEz", 
      "Apollo", 
      "Crunchbase"
    ]
  },
  {
    id: 'ops',
    title: 'ATS & Operations',
    icon: Layers,
    color: 'text-orange-600 dark:text-orange-400',
    skills: [
      "Greenhouse", 
      "Lever", 
      "Rippling"
    ]
  }
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="mb-20">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-4">
          Experience<br/>
          <span className="text-zinc-400 dark:text-gray-600">Background</span>
        </h2>
      </div>

      <div className="relative border-l border-zinc-200 dark:border-white/10 ml-4 md:ml-12 space-y-16">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-12 md:pl-24"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-accent rounded-full ring-4 ring-zinc-50 dark:ring-void" />
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
              <h3 className="font-display text-3xl font-bold text-zinc-900 dark:text-white">
                {exp.company}
              </h3>
              <span className="font-mono text-sm text-accent">
                {exp.role}
              </span>
              <span className="font-mono text-sm text-zinc-500 dark:text-gray-500 md:ml-auto">
                {exp.period}
              </span>
            </div>

            <p className="text-zinc-600 dark:text-gray-300 text-lg font-light mb-6 max-w-2xl">
              {exp.description}
            </p>

            <ul className="space-y-3">
              {exp.impact.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-500 dark:text-gray-400 font-light text-sm md:text-base">
                  <span className="mt-1.5 w-1 h-1 bg-zinc-400 dark:bg-white/30 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Technical Architecture / Skills Grid */}
      <div className="mt-32 pl-4 md:pl-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
           <div className="flex items-center gap-4 mb-12 pl-12 md:pl-24 border-l border-zinc-200 dark:border-white/10">
              <h3 className="font-mono text-sm text-zinc-400 dark:text-gray-500 uppercase tracking-wider">
                  STACK
              </h3>
              <div className="h-[1px] w-12 bg-zinc-200 dark:bg-white/10" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:pl-24 border-l border-zinc-200 dark:border-white/10 pt-2">
              {skillCategories.map((cat, i) => (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                   <div className={`flex items-center gap-3 mb-6 ${cat.color}`}>
                      <cat.icon size={20} />
                      <h4 className="font-syne text-lg font-bold uppercase tracking-wide text-zinc-900 dark:text-white">{cat.title}</h4>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, j) => (
                        <span 
                          key={skill}
                          className="px-3 py-1.5 border border-zinc-200 dark:border-white/5 rounded text-xs font-mono text-zinc-500 dark:text-gray-400 bg-zinc-100 dark:bg-white/[0.02] hover:bg-zinc-200 dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/20 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                   </div>
                </motion.div>
              ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
};