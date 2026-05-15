import Dexie, { type Table } from 'dexie'
import type {
  User,
  Project,
  Service,
  Tag,
  Relation,
  ActivityLog,
  NodePosition,
  AppSettings,
} from '../types'

class AppDatabase extends Dexie {
  users!: Table<User>
  projects!: Table<Project>
  services!: Table<Service>
  tags!: Table<Tag>
  relations!: Table<Relation>
  activityLogs!: Table<ActivityLog>
  nodePositions!: Table<NodePosition>
  settings!: Table<AppSettings>

  constructor() {
    super('ManagerDB')
    this.version(1).stores({
      users: '++id, username',
      projects: '++id, status, createdAt, isFavorite',
      services: '++id, provider, isFavorite',
      tags: '++id, name',
      relations: '++id, projectId, serviceId',
      activityLogs: '++id, timestamp, type',
      nodePositions: '++id, [entityType+entityId]',
      settings: '++id',
    })
  }
}

export const db = new AppDatabase()

export async function logActivity(
  type: ActivityLog['type'],
  action: ActivityLog['action'],
  entityId: number,
  entityName: string,
) {
  await db.activityLogs.add({
    type,
    action,
    entityId,
    entityName,
    timestamp: new Date().toISOString(),
  })
}

export async function getNodePosition(
  entityType: 'project' | 'service',
  entityId: number,
): Promise<{ x: number; y: number } | null> {
  const pos = await db.nodePositions.where({ entityType, entityId }).first()
  return pos ? { x: pos.x, y: pos.y } : null
}

export async function saveNodePosition(
  entityType: 'project' | 'service',
  entityId: number,
  x: number,
  y: number,
) {
  const existing = await db.nodePositions.where({ entityType, entityId }).first()
  if (existing?.id != null) {
    await db.nodePositions.update(existing.id, { x, y })
  } else {
    await db.nodePositions.add({ entityType, entityId, x, y })
  }
}
