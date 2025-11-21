
import { Project, CareerItem, ThoughtItem, NavItem, EducationItem, SkillCategory } from './types';

export const NAV_ITEMS: NavItem[] = [
  { name: "Builds", id: "projects" },
  { name: "Experience", id: "career" },
];

export const PROJECTS: Project[] = [
  {
    title: "FRAMEWORK",
    description: "Talent Architecture Engine. Architected a React/TypeScript Chrome extension integrating Google Gemini 2.0 Flash and Anthropic Claude 3 Haiku. Automates organizational intelligence, generating company tech stacks and org charts in 30 seconds.",
    tags: ["React", "TypeScript", "Gemini API", "Claude API", "Chrome Extension"],
    year: "2024",
    images: [
      "/images/projects/framework-1.png",
      "/images/projects/framework-2.png",
      "/images/projects/framework-3.png",
      "/images/projects/framework-4.png"
    ]
  },
  {
    title: "PRISM",
    description: "Candidate Evaluation Engine. Developed an AI-powered system utilizing Anthropic Claude API to assess technical fit and visa sponsorship likelihood with 85-95% accuracy, saving 15-20 hours of manual review weekly.",
    tags: ["AI Engineering", "Anthropic API", "Algorithm Design", "Prompt Engineering"],
    year: "2024",
    images: [
      "/images/projects/prism-1.png",
      "/images/projects/prism-2.png",
      "/images/projects/prism-3.png",
      "/images/projects/prism-4.png"
    ]
  }
];

export const CAREER: CareerItem[] = [
  {
    role: "Research Associate / Technical Sourcer",
    company: "StartupTAP",
    location: "Remote",
    period: "2021 - Present",
    achievements: [
      "Manage 30+ searches annually across Product, Engineering, and Executive roles for VC-backed startups.",
      "Build pipelines of 50-100+ qualified candidates per search using advanced Boolean and GitHub sourcing.",
      "Leverage AI tools (ChatGPT, Claude, Perplexity) for market intelligence and sourcing optimization.",
      "Partner with hiring managers to refine technical requirements and search strategies."
    ],
    techStack: ["LinkedIn Recruiter", "Gem", "GitHub", "Claude", "Lever", "Greenhouse"]
  },
  {
    role: "Claims Examiner",
    company: "Desert Valley Hospital",
    location: "Victorville, CA",
    period: "Feb 2021 - 2021",
    achievements: [
      "Managed detailed claims processing with high accuracy in a fast-paced healthcare environment.",
      "Ensured compliance with rigorous medical billing standards and regulations."
    ],
    techStack: ["Healthtech Systems", "Data Analysis", "Compliance"]
  },
  {
    role: "Congressional Intern",
    company: "United States Congress",
    location: "Washington, D.C.",
    period: "2016",
    achievements: [
      "Assisted legislative staff with policy research and constituent communication.",
      "Gained deep insight into legislative processes and public administration."
    ],
    techStack: ["Policy Research", "Communication", "Public Admin"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    school: "University of California, Riverside",
    degree: "Bachelor of Arts in Political Science",
    year: "2021"
  },
  {
    school: "Victor Valley College",
    degree: "Associate of Arts in History",
    year: "2019"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Technical Sourcing",
    items: ["Boolean Search", "Talent Mapping", "Competitive Intelligence"]
  },
  {
    category: "AI & Development",
    items: ["Anthropic Claude API", "Google Gemini API", "Chrome Extensions", "Prompt Engineering"]
  },
  {
    category: "Tools & ATS",
    items: ["LinkedIn Recruiter", "Gem", "Hiretual", "Apollo", "Lever", "Greenhouse", "Rippling"]
  }
];

export const THOUGHTS: ThoughtItem[] = [
  {
    title: "The Death of the Scrollbar",
    date: "Oct 12, 2024",
    preview: "Why modern interfaces are moving towards gestural navigation and what it means for accessibility."
  },
  {
    title: "Invisible Animation",
    date: "Aug 05, 2024",
    preview: "Animation should be felt, not seen. A deep dive into timing functions and perception."
  },
  {
    title: "Code as a Creative Medium",
    date: "Mar 15, 2024",
    preview: "Breaking free from utilitarian programming to explore digital expressionism."
  }
];
