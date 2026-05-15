import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { Project, Service, Tag, Relation, NodePosition, ActivityLog } from '@/types'

// ─── Mappers ────────────────────────────────────────────────

const mapProject = (r: Record<string, unknown>): Project => ({
  id: r.id as number,
  title: r.title as string,
  description: (r.description ?? '') as string,
  link: (r.link ?? '') as string,
  status: r.status as Project['status'],
  tags: (r.tags ?? []) as number[],
  color: r.color as string | undefined,
  createdAt: r.created_at as string,
  updatedAt: r.updated_at as string,
  isFavorite: (r.is_favorite ?? false) as boolean,
  notes: r.notes as string | undefined,
})

const mapService = (r: Record<string, unknown>): Service => ({
  id: r.id as number,
  name: r.name as string,
  provider: r.provider as string,
  link: (r.link ?? '') as string,
  description: (r.description ?? '') as string,
  tags: (r.tags ?? []) as number[],
  color: r.color as string | undefined,
  isFavorite: (r.is_favorite ?? false) as boolean,
})

const mapTag = (r: Record<string, unknown>): Tag => ({
  id: r.id as number,
  name: r.name as string,
  color: r.color as string,
  createdAt: r.created_at as string,
})

const mapRelation = (r: Record<string, unknown>): Relation => ({
  id: r.id as number,
  projectId: r.project_id as number,
  serviceId: r.service_id as number,
  createdAt: r.created_at as string,
})

const mapPosition = (r: Record<string, unknown>): NodePosition => ({
  id: r.id as number,
  entityType: r.entity_type as 'project' | 'service',
  entityId: r.entity_id as number,
  x: r.x as number,
  y: r.y as number,
})

function raise(e: unknown): never { throw e }

// ─── Types ──────────────────────────────────────────────────

interface DataState {
  projects: Project[]
  services: Service[]
  tags: Tag[]
  relations: Relation[]
  positions: NodePosition[]
  activityCount: number
  loading: boolean
  initialized: boolean
  userId: string | null

  init: () => Promise<void>
  reset: () => void

  addProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<number>
  updateProject: (id: number, data: Partial<Omit<Project, 'id'>>) => Promise<void>
  deleteProject: (id: number) => Promise<void>

  addService: (data: Omit<Service, 'id'>) => Promise<number>
  updateService: (id: number, data: Partial<Omit<Service, 'id'>>) => Promise<void>
  deleteService: (id: number) => Promise<void>

  addTag: (data: { name: string; color: string }) => Promise<number>
  updateTag: (id: number, data: { name?: string; color?: string }) => Promise<void>
  deleteTag: (id: number) => Promise<void>

  addRelation: (projectId: number, serviceId: number) => Promise<number>
  deleteRelation: (id: number) => Promise<void>

  saveNodePosition: (entityType: 'project' | 'service', entityId: number, x: number, y: number) => Promise<void>

  logActivity: (type: ActivityLog['type'], action: ActivityLog['action'], entityId: number, entityName: string) => Promise<void>

  exportData: () => { projects: Project[]; services: Service[]; tags: Tag[]; relations: Relation[]; nodePositions: NodePosition[] }
  importData: (raw: { projects?: unknown[]; services?: unknown[]; tags?: unknown[]; relations?: unknown[]; nodePositions?: unknown[] }) => Promise<void>
  clearData: () => Promise<void>
}

// ─── Store ──────────────────────────────────────────────────

export const useDataStore = create<DataState>((set, get) => ({
  projects: [],
  services: [],
  tags: [],
  relations: [],
  positions: [],
  activityCount: 0,
  loading: false,
  initialized: false,
  userId: null,

  async init() {
    set({ loading: true })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { set({ loading: false }); return }

    const [pRes, sRes, tRes, rRes, posRes, logRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('services').select('*'),
      supabase.from('tags').select('*').order('name'),
      supabase.from('relations').select('*'),
      supabase.from('node_positions').select('*'),
      supabase.from('activity_logs').select('id', { count: 'exact', head: true }),
    ])
    if (pRes.error) raise(pRes.error)
    if (sRes.error) raise(sRes.error)
    if (tRes.error) raise(tRes.error)
    if (rRes.error) raise(rRes.error)
    if (posRes.error) raise(posRes.error)

    set({
      projects: (pRes.data ?? []).map(r => mapProject(r as Record<string, unknown>)),
      services: (sRes.data ?? []).map(r => mapService(r as Record<string, unknown>)),
      tags: (tRes.data ?? []).map(r => mapTag(r as Record<string, unknown>)),
      relations: (rRes.data ?? []).map(r => mapRelation(r as Record<string, unknown>)),
      positions: (posRes.data ?? []).map(r => mapPosition(r as Record<string, unknown>)),
      activityCount: logRes.count ?? 0,
      loading: false,
      initialized: true,
      userId: user.id,
    })
  },

  reset() {
    set({ projects: [], services: [], tags: [], relations: [], positions: [], activityCount: 0, initialized: false, userId: null })
  },

  // ── Projects ──────────────────────────────────────────────

  async addProject(data) {
    const userId = get().userId!
    const now = new Date().toISOString()
    const { data: row, error } = await supabase.from('projects').insert({
      user_id: userId, title: data.title, description: data.description,
      link: data.link, status: data.status, tags: data.tags,
      color: data.color ?? null, created_at: now, updated_at: now,
      is_favorite: data.isFavorite ?? false, notes: data.notes ?? null,
    }).select().single()
    if (error) raise(error)
    const project = mapProject(row as Record<string, unknown>)
    set(s => ({ projects: [project, ...s.projects] }))
    return project.id!
  },

  async updateProject(id, data) {
    const patch: Record<string, unknown> = { updated_at: data.updatedAt ?? new Date().toISOString() }
    if ('title' in data) patch.title = data.title
    if ('description' in data) patch.description = data.description
    if ('link' in data) patch.link = data.link
    if ('status' in data) patch.status = data.status
    if ('tags' in data) patch.tags = data.tags
    if ('color' in data) patch.color = data.color
    if ('isFavorite' in data) patch.is_favorite = data.isFavorite
    if ('notes' in data) patch.notes = data.notes
    const { error } = await supabase.from('projects').update(patch).eq('id', id)
    if (error) raise(error)
    set(s => ({ projects: s.projects.map(p => p.id === id ? { ...p, ...data, updatedAt: patch.updated_at as string } : p) }))
  },

  async deleteProject(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) raise(error)
    await supabase.from('node_positions').delete().eq('entity_type', 'project').eq('entity_id', id)
    set(s => ({
      projects: s.projects.filter(p => p.id !== id),
      relations: s.relations.filter(r => r.projectId !== id),
      positions: s.positions.filter(p => !(p.entityType === 'project' && p.entityId === id)),
    }))
  },

  // ── Services ──────────────────────────────────────────────

  async addService(data) {
    const userId = get().userId!
    const { data: row, error } = await supabase.from('services').insert({
      user_id: userId, name: data.name, provider: data.provider, link: data.link,
      description: data.description, tags: data.tags, color: data.color ?? null,
      is_favorite: data.isFavorite ?? false,
    }).select().single()
    if (error) raise(error)
    const service = mapService(row as Record<string, unknown>)
    set(s => ({ services: [...s.services, service] }))
    return service.id!
  },

  async updateService(id, data) {
    const patch: Record<string, unknown> = {}
    if ('name' in data) patch.name = data.name
    if ('provider' in data) patch.provider = data.provider
    if ('link' in data) patch.link = data.link
    if ('description' in data) patch.description = data.description
    if ('tags' in data) patch.tags = data.tags
    if ('color' in data) patch.color = data.color
    if ('isFavorite' in data) patch.is_favorite = data.isFavorite
    const { error } = await supabase.from('services').update(patch).eq('id', id)
    if (error) raise(error)
    set(s => ({ services: s.services.map(sv => sv.id === id ? { ...sv, ...data } : sv) }))
  },

  async deleteService(id) {
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (error) raise(error)
    await supabase.from('node_positions').delete().eq('entity_type', 'service').eq('entity_id', id)
    set(s => ({
      services: s.services.filter(sv => sv.id !== id),
      relations: s.relations.filter(r => r.serviceId !== id),
      positions: s.positions.filter(p => !(p.entityType === 'service' && p.entityId === id)),
    }))
  },

  // ── Tags ──────────────────────────────────────────────────

  async addTag(data) {
    const userId = get().userId!
    const { data: row, error } = await supabase.from('tags').insert({
      user_id: userId, name: data.name, color: data.color,
      created_at: new Date().toISOString(),
    }).select().single()
    if (error) raise(error)
    const tag = mapTag(row as Record<string, unknown>)
    set(s => ({ tags: [...s.tags, tag].sort((a, b) => a.name.localeCompare(b.name)) }))
    return tag.id!
  },

  async updateTag(id, data) {
    const { error } = await supabase.from('tags').update(data).eq('id', id)
    if (error) raise(error)
    set(s => ({ tags: s.tags.map(t => t.id === id ? { ...t, ...data } : t) }))
  },

  async deleteTag(id) {
    const { error } = await supabase.from('tags').delete().eq('id', id)
    if (error) raise(error)
    const { projects, services } = get()
    await Promise.all([
      ...projects.filter(p => p.tags.includes(id)).map(p =>
        supabase.from('projects').update({ tags: p.tags.filter(t => t !== id), updated_at: new Date().toISOString() }).eq('id', p.id!)
      ),
      ...services.filter(s => s.tags.includes(id)).map(s =>
        supabase.from('services').update({ tags: s.tags.filter(t => t !== id) }).eq('id', s.id!)
      ),
    ])
    set(s => ({
      tags: s.tags.filter(t => t.id !== id),
      projects: s.projects.map(p => ({ ...p, tags: p.tags.filter(t => t !== id) })),
      services: s.services.map(sv => ({ ...sv, tags: sv.tags.filter(t => t !== id) })),
    }))
  },

  // ── Relations ─────────────────────────────────────────────

  async addRelation(projectId, serviceId) {
    const userId = get().userId!
    const { data: row, error } = await supabase.from('relations').insert({
      user_id: userId, project_id: projectId, service_id: serviceId,
      created_at: new Date().toISOString(),
    }).select().single()
    if (error) raise(error)
    const relation = mapRelation(row as Record<string, unknown>)
    set(s => ({ relations: [...s.relations, relation] }))
    return relation.id!
  },

  async deleteRelation(id) {
    const { error } = await supabase.from('relations').delete().eq('id', id)
    if (error) raise(error)
    set(s => ({ relations: s.relations.filter(r => r.id !== id) }))
  },

  // ── Node Positions ────────────────────────────────────────

  async saveNodePosition(entityType, entityId, x, y) {
    const userId = get().userId!
    const existing = get().positions.find(p => p.entityType === entityType && p.entityId === entityId)
    if (existing?.id) {
      const { error } = await supabase.from('node_positions').update({ x, y }).eq('id', existing.id)
      if (error) raise(error)
      set(s => ({ positions: s.positions.map(p => p.id === existing.id ? { ...p, x, y } : p) }))
    } else {
      const { data: row, error } = await supabase.from('node_positions').insert({
        user_id: userId, entity_type: entityType, entity_id: entityId, x, y,
      }).select().single()
      if (error) raise(error)
      set(s => ({ positions: [...s.positions, mapPosition(row as Record<string, unknown>)] }))
    }
  },

  // ── Activity ──────────────────────────────────────────────

  async logActivity(type, action, entityId, entityName) {
    const userId = get().userId!
    await supabase.from('activity_logs').insert({
      user_id: userId, type, action,
      entity_id: entityId, entity_name: entityName,
      timestamp: new Date().toISOString(),
    })
    set(s => ({ activityCount: s.activityCount + 1 }))
  },

  // ── Data management ───────────────────────────────────────

  exportData() {
    const { projects, services, tags, relations, positions } = get()
    return { projects, services, tags, relations, nodePositions: positions }
  },

  async importData(raw) {
    const userId = get().userId!
    // Delete in FK-safe order
    await Promise.all([
      supabase.from('node_positions').delete().eq('user_id', userId),
      supabase.from('relations').delete().eq('user_id', userId),
    ])
    await Promise.all([
      supabase.from('projects').delete().eq('user_id', userId),
      supabase.from('services').delete().eq('user_id', userId),
    ])
    await supabase.from('tags').delete().eq('user_id', userId)

    const tagIdMap: Record<number, number> = {}
    const projectIdMap: Record<number, number> = {}
    const serviceIdMap: Record<number, number> = {}

    type RawTag = { id?: number; name: string; color: string; createdAt?: string; created_at?: string }
    for (const t of (raw.tags ?? []) as RawTag[]) {
      const { data: row } = await supabase.from('tags').insert({
        user_id: userId, name: t.name, color: t.color,
        created_at: t.createdAt ?? t.created_at ?? new Date().toISOString(),
      }).select('id').single()
      if (row && t.id != null) tagIdMap[t.id] = (row as { id: number }).id
    }

    type RawProject = Project & { created_at?: string; updated_at?: string; is_favorite?: boolean }
    for (const p of (raw.projects ?? []) as RawProject[]) {
      const { data: row } = await supabase.from('projects').insert({
        user_id: userId, title: p.title, description: p.description ?? '',
        link: p.link ?? '', status: p.status ?? 'active',
        tags: (p.tags ?? []).map((tid: number) => tagIdMap[tid] ?? tid),
        color: p.color ?? null,
        created_at: p.createdAt ?? p.created_at ?? new Date().toISOString(),
        updated_at: p.updatedAt ?? p.updated_at ?? new Date().toISOString(),
        is_favorite: p.isFavorite ?? p.is_favorite ?? false,
        notes: p.notes ?? null,
      }).select('id').single()
      if (row && p.id != null) projectIdMap[p.id] = (row as { id: number }).id
    }

    type RawService = Service & { is_favorite?: boolean }
    for (const s of (raw.services ?? []) as RawService[]) {
      const { data: row } = await supabase.from('services').insert({
        user_id: userId, name: s.name, provider: s.provider, link: s.link ?? '',
        description: s.description ?? '',
        tags: (s.tags ?? []).map((tid: number) => tagIdMap[tid] ?? tid),
        color: s.color ?? null,
        is_favorite: s.isFavorite ?? s.is_favorite ?? false,
      }).select('id').single()
      if (row && s.id != null) serviceIdMap[s.id] = (row as { id: number }).id
    }

    type RawRelation = { id?: number; projectId?: number; serviceId?: number; project_id?: number; service_id?: number; createdAt?: string; created_at?: string }
    for (const r of (raw.relations ?? []) as RawRelation[]) {
      const oldProjectId = r.projectId ?? r.project_id
      const oldServiceId = r.serviceId ?? r.service_id
      const newProjectId = oldProjectId != null ? projectIdMap[oldProjectId] : undefined
      const newServiceId = oldServiceId != null ? serviceIdMap[oldServiceId] : undefined
      if (newProjectId && newServiceId) {
        await supabase.from('relations').insert({
          user_id: userId, project_id: newProjectId, service_id: newServiceId,
          created_at: r.createdAt ?? r.created_at ?? new Date().toISOString(),
        })
      }
    }

    await get().init()
  },

  async clearData() {
    const userId = get().userId!
    await Promise.all([
      supabase.from('node_positions').delete().eq('user_id', userId),
      supabase.from('relations').delete().eq('user_id', userId),
      supabase.from('activity_logs').delete().eq('user_id', userId),
    ])
    await Promise.all([
      supabase.from('projects').delete().eq('user_id', userId),
      supabase.from('services').delete().eq('user_id', userId),
    ])
    await supabase.from('tags').delete().eq('user_id', userId)
    set({ projects: [], services: [], tags: [], relations: [], positions: [], activityCount: 0 })
  },
}))

export const logActivity = (...args: Parameters<DataState['logActivity']>) =>
  useDataStore.getState().logActivity(...args)
