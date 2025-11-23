import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  stats: { label: string; value: string }[];
  color: string;
  link?: string;
  type: 'extension' | 'web' | 'tool';
  screenshot?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  impact: string[];
  logo: string; // Placeholder URL or icon component name
}

export interface EasterEggState {
  blueprintMode: boolean;
  gamingSpecsParams: boolean;
  rejectedDesigns: boolean;
}

export interface ContextProps {
  children: ReactNode;
}
