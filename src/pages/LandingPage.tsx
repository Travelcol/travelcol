import { useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail, MapPin, Briefcase, GraduationCap, Award, Code2,
  ChevronDown, CheckCircle2, ExternalLink, ArrowUpRight,
  Terminal, Menu, X,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const cvData = {
  name: 'Juan Arevalo',
  role: 'Ingeniero de Software',
  location: 'Colombia',
  email: 'juansearevalo00@gmail.com',
  github: 'https://github.com/juansearevalo',
  linkedin: 'https://linkedin.com/in/juansearevalo',
  about:
    'Ingeniero de Software con experiencia en desarrollo de aplicaciones web y soluciones financieras. Persona organizada y responsable con buenas habilidades de trabajo en equipo. Apasionado por el desarrollo de software y siempre buscando aprender y aportar soluciones de calidad.',
  stats: [
    { label: 'Años de experiencia', value: '4+' },
    { label: 'Certificaciones', value: '5' },
    { label: 'Tecnologías', value: '12+' },
  ],
  experience: [
    {
      title: 'Ingeniero de Desarrollo',
      company: 'SERLEFIN',
      period: 'Dic 2021 – Presente',
      description:
        'Parametrización de soluciones financieras y desarrollo en equipo con metodologías ágiles.',
      technologies: ['Metodologías Ágiles', 'Backend', 'Finanzas'],
    },
    {
      title: 'Practicante – Analista',
      company: 'Bureau Veritas',
      period: 'Ene 2021 – Jun 2021',
      description: 'Apoyo en instalación, configuración y soporte técnico de software.',
      technologies: ['Soporte Técnico', 'Software'],
    },
  ],
  education: [
    { degree: 'Ingeniero en Desarrollo de Software', institution: 'Uninpahu', year: '2023' },
    { degree: 'Tecnólogo en Cómputo', institution: 'Uninpahu', year: '2021' },
  ],
  certifications: [
    { name: 'CISSP', year: '2024' },
    { name: 'Git + GitHub', year: '2024' },
    { name: 'JavaScript Essentials', year: '2024' },
    { name: 'PL-900 Power Platform', year: '2024' },
    { name: 'Node.js Experto', year: '2024' },
  ],
  skills: {
    Frameworks: ['React', 'Next.js', 'Material UI', 'Tailwind CSS'],
    Backend: ['Node.js', 'SQL Server'],
    Frontend: ['HTML5', 'CSS3', 'TypeScript'],
    Herramientas: ['Git', 'GitHub', 'Vite'],
  },
}

const NAV_LINKS = [
  { label: 'Sobre mí', id: 'about' },
  { label: 'Experiencia', id: 'experience' },
  { label: 'Formación', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contacto', id: 'contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Secret: Alt+↑ navigates directly to login without exposing credentials
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && e.altKey) navigate('/login')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Sticky Nav ─────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm font-bold text-foreground/70 hover:text-foreground transition-colors tracking-wider"
          >
            JA
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate('/login')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full transition-all"
          >
            <Terminal className="w-3 h-3" />
            Dashboard
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 text-sm text-primary"
            >
              <Terminal className="w-3.5 h-3.5" />
              Dashboard
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-violet-500/10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16"
        >
          {/* Avatar */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-violet-400 p-[3px]">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent">
                    {cvData.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-background flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full" />
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Disponible para proyectos
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">{cvData.name}</h1>
          <p className="text-xl md:text-2xl text-primary/90 font-medium mb-4">{cvData.role}</p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-10">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {cvData.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {cvData.email}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-10 py-6 border-y border-border/50">
            {cvData.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={cvData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={cvData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-card/80 transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-card/80 transition-all hover:scale-105"
            >
              Contactar
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-90 transition-opacity"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </button>
      </section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading icon={<span>👤</span>} title="Sobre Mí" />
            <div className="bg-card rounded-2xl border border-border p-8">
              <p className="text-base text-muted-foreground leading-relaxed">{cvData.about}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading icon={<Briefcase className="w-5 h-5 text-primary" />} title="Experiencia Laboral" />
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-8 border-l border-border space-y-8">
            {cvData.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[2.35rem] top-5 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 gap-1">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-primary/80 text-sm font-medium mb-3">{exp.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education & Certifications ─────────────────────────────── */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading icon={<GraduationCap className="w-5 h-5 text-primary" />} title="Formación" />
            <div className="space-y-4">
              {cvData.education.map((edu, i) => (
                <div
                  key={i}
                  className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {edu.institution} · {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionHeading icon={<Award className="w-5 h-5 text-primary" />} title="Certificaciones" />
            <div className="space-y-3">
              {cvData.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-sm font-medium">{cert.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading icon={<Code2 className="w-5 h-5 text-primary" />} title="Stack Tecnológico" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(cvData.skills).map(([category, skills], i) => (
              <motion.div
                key={category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden text-center p-10 bg-card rounded-2xl border border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">¿Trabajamos juntos?</h2>
                <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                  Estoy disponible para proyectos freelance, colaboraciones o posiciones de tiempo completo.
                </p>
                <a
                  href={`mailto:${cvData.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  <Mail className="w-4 h-4" />
                  {cvData.email}
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {cvData.name} · {cvData.role}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={cvData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-foreground transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={cvData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-foreground transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${cvData.email}`}
              aria-label="Email"
              className="hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
      <span className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
        {icon}
      </span>
      {title}
    </h2>
  )
}
