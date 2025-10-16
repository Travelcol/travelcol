/**
 * Tipos TypeScript para los datos del CV
 */

export interface PersonalInfo {
  fullName: string;
  profession: string;
  description: string;
  photo?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  phone?: string;
  website?: string;
}

export interface TechSkill {
  name: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
}

export interface CVData {
  personal: PersonalInfo;
  education: Education[];
  certifications: Certification[];
  experience: Experience[];
  contact: ContactInfo;
  skills: TechSkill[];
}
