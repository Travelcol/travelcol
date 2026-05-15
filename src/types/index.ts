export type ProjectStatus = 'active' | 'paused' | 'completed'

export interface Project {
  id?: number
  title: string
  description: string
  link: string
  status: ProjectStatus
  tags: number[]
  color?: string
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
  notes?: string
}

export interface Service {
  id?: number
  name: string
  provider: string
  link: string
  description: string
  tags: number[]
  color?: string
  isFavorite?: boolean
}

export interface Tag {
  id?: number
  name: string
  color: string
  createdAt: string
}

export interface Relation {
  id?: number
  projectId: number
  serviceId: number
  createdAt: string
}

export interface User {
  id?: number
  username: string
  passwordHash: string
  salt: string
  createdAt: string
}

export interface ActivityLog {
  id?: number
  type: 'project' | 'service' | 'tag' | 'relation'
  action: 'created' | 'updated' | 'deleted'
  entityId: number
  entityName: string
  timestamp: string
}

export interface NodePosition {
  id?: number
  entityType: 'project' | 'service'
  entityId: number
  x: number
  y: number
}

export interface AppSettings {
  id?: number
  theme: 'dark' | 'light'
  sidebarCollapsed: boolean
}

export const PROVIDERS = [
  'Vercel',
  'Railway',
  'Resend',
  'AWS',
  'Supabase',
  'GitHub',
  'Cloudflare',
  'PlanetScale',
  'Neon',
  'Turso',
  'Stripe',
  'Twilio',
  'SendGrid',
  'Fly.io',
  'Render',
  'DigitalOcean',
  'Netlify',
  'Firebase',
  'MongoDB Atlas',
  'Cloudinary',
  'Other',
] as const

export type ProviderName = (typeof PROVIDERS)[number]

export const PROJECT_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#64748b',
] as const

export const TAG_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#64748b',
  '#a855f7',
  '#14b8a6',
] as const
