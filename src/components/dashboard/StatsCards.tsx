import { FolderKanban, Server, Tags, GitBranch, Star, Activity } from 'lucide-react'
import { useDataStore } from '@/store/dataStore'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function StatCard({ icon: Icon, label, value, sub, color }: { icon: typeof FolderKanban; label: string; value: number | string; sub?: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
          </div>
          <div className="rounded-lg p-2.5" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const projects = useDataStore(s => s.projects)
  const services = useDataStore(s => s.services)
  const tags = useDataStore(s => s.tags)
  const relations = useDataStore(s => s.relations)
  const initialized = useDataStore(s => s.initialized)

  if (!initialized) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)}
      </div>
    )
  }

  const activeProjects = projects.filter(p => p.status === 'active').length
  const favoriteProjects = projects.filter(p => p.isFavorite).length
  const recentActivity = relations.filter(r => Date.now() - new Date(r.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000).length

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatCard icon={FolderKanban} label="Proyectos" value={projects.length} sub={`${activeProjects} activos`} color="#6366f1" />
      <StatCard icon={Server} label="Servicios" value={services.length} sub="Externos" color="#8b5cf6" />
      <StatCard icon={Tags} label="Tags" value={tags.length} sub="Categorías" color="#06b6d4" />
      <StatCard icon={GitBranch} label="Relaciones" value={relations.length} sub="Conexiones" color="#22c55e" />
      <StatCard icon={Star} label="Favoritos" value={favoriteProjects} sub="Proyectos" color="#eab308" />
      <StatCard icon={Activity} label="Recientes" value={recentActivity} sub="Esta semana" color="#ec4899" />
    </div>
  )
}
