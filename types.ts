
export type SectionType = 'projects' | 'career' | 'thoughts' | null;

export interface NavItem {
  name: string;
  id: SectionType;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  images?: string[]; // Array of image URLs or CSS gradients
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ThoughtItem {
  title: string;
  date: string;
  preview: string;
}
