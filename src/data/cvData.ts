import type { CVData } from '../types/cv.types';

/**
 * Datos del CV de Juan Arevalo
 * Este archivo contiene toda la información personal, educación, experiencia, etc.
 * Puedes editar estos datos fácilmente para actualizar tu CV
 */

export const cvData: CVData = {
  personal: {
    fullName: 'Juan Arevalo',
    profession: 'Ingeniero de Software',
    description: 'Soy una persona organizada y responsable, con buenas habilidades de trabajo en equipo. Me apasiona el desarrollo de software y siempre busco aprender y aportar soluciones de calidad. Busco un puesto que me permita crecer como desarrollador y asumir nuevos retos.',
  },

  education: [
    {
      id: 'edu-1',
      degree: 'Ingeniero en Desarrollo',
      institution: 'Fundación Universitaria para el Desarrollo Humano - Uninpahu',
      period: '2023',
      description: '',
    },
    {
      id: 'edu-2',
      degree: 'Tecnólogo en Cómputo y Desarrollo',
      institution: 'Fundación Universitaria para el Desarrollo Humano - Uninpahu',
      period: '2021',
      description: '',
    },
    // Puedes agregar más educación aquí
    
  ],

certifications: [
  {
    id: 'cert-1',
    name: 'Certified Information Systems Security Professional (CISSP)',
    issuer: 'CISSP',
    year: '2024',
  },
  {
    id: 'cert-2',
    name: 'GIT + GitHub: Todo un sistema de control de versiones de cero',
    issuer: 'Plataforma Online',
    year: '2024',
  },
  {
    id: 'cert-3',
    name: 'JavaScript Essentials 1',
    issuer: 'Cisco',
    year: '2024',
  },
  {
    id: 'cert-4',
    name: 'PL-900: Microsoft Power Platform Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
  },
  {
    id: 'cert-5',
    name: 'Node: De cero a experto',
    issuer: 'Plataforma Online',
    year: '2024',
  },
  {
    id: 'cert-6',
    name: 'Scrum Foundation Professional Certification (SFPC)',
    issuer: 'CertiProf',
    year: '2023',
  },
],

experience: [
  {
    id: 'exp-1',
    company: 'SERLEFIN',
    role: 'Ingeniero de Desarrollo',
    period: 'Dic 2021 - Presente',
    description:
      'Parametrización de soluciones financieras y desarrollo en equipo utilizando metodologías ágiles. Participación activa en la implementación de mejoras y mantenimiento de software empresarial.',
    technologies: ['Metodologías Ágiles', 'Desarrollo Backend', 'Finanzas'],
  },
  {
    id: 'exp-2',
    company: 'Bureau Veritas',
    role: 'Practicante - Analista de Sistemas',
    period: 'Ene 2021 - Jun 2021',
    description:
      'Apoyo en el alistamiento de equipos y la instalación de soluciones de software. Colaboración en tareas técnicas y soporte al área de sistemas.',
    technologies: ['Soporte Técnico', 'Instalación de Software', 'Análisis de Sistemas'],
  },
],


  contact: {
    email: 'juansearevalo00@gmail.com',
    linkedin: 'https://www.linkedin.com/in/juan-sebastian-arevalo-mancera-4a2605224',
    github: 'https://github.com/Travelcol',
    phone: '+57 300 227 3524',
  },

  skills: [
    // Frontend
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'JavaScript', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'HTML5', category: 'frontend' },
    { name: 'CSS3', category: 'frontend' },
    { name: 'Material UI', category: 'frontend' },
    
    // Backend
    { name: '.NET', category: 'backend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'C#', category: 'backend' },
    
    // Database
    { name: 'SQL Server', category: 'database' },
    { name: 'MongoDB', category: 'database' },
    
    // Tools
    { name: 'Git', category: 'tools' },
    { name: 'VS Code', category: 'tools' },
    { name: 'Docker', category: 'tools' },
  ],
};
