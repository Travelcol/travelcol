import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Search, FolderKanban } from 'lucide-react'
import { toast } from 'sonner'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, logActivity } from '@/database/db'
import type { Project } from '@/types'
import { AppLayout } from '@/layouts/AppLayout'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectForm } from '@/components/projects/ProjectForm'
import { EmptyState } from '@/components/common/EmptyState'
import { TagBadge } from '@/components/common/TagBadge'
import { ProjectDetailModal } from './ProjectDetailModal'

export function ProjectsPage() {
  const projects = useLiveQuery(() => db.projects.orderBy('createdAt').reverse().toArray()) ?? []
  const tags = useLiveQuery(() => db.tags.toArray()) ?? []

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [tagFilter, setTagFilter] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [detailProject, setDetailProject] = useState<Project | null>(null)

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    const matchTag = tagFilter === null || p.tags.includes(tagFilter)
    return matchSearch && matchStatus && matchTag
  })

  function openCreate() {
    setEditingProject(null)
    setSelectedTagIds([])
    setDialogOpen(true)
  }

  function openEdit(project: Project) {
    setEditingProject(project)
    setSelectedTagIds(project.tags)
    setDialogOpen(true)
  }

  async function handleSubmit(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    if (editingProject?.id) {
      await db.projects.update(editingProject.id, {
        ...data,
        updatedAt: new Date().toISOString(),
      })
      await logActivity('project', 'updated', editingProject.id, data.title)
      toast.success('Proyecto actualizado')
    } else {
      const now = new Date().toISOString()
      const id = await db.projects.add({ ...data, createdAt: now, updatedAt: now })
      await logActivity('project', 'created', id as number, data.title)
      toast.success('Proyecto creado')
    }
    setDialogOpen(false)
  }

  async function handleDelete(id: number) {
    const project = projects.find((p) => p.id === id)
    await db.projects.delete(id)
    await db.relations.where('projectId').equals(id).delete()
    await db.nodePositions.where({ entityType: 'project', entityId: id }).delete()
    if (project) await logActivity('project', 'deleted', id, project.title)
    toast.success('Proyecto eliminado')
  }

  async function handleToggleFavorite(id: number) {
    const project = projects.find((p) => p.id === id)
    if (!project) return
    await db.projects.update(id, { isFavorite: !project.isFavorite, updatedAt: new Date().toISOString() })
  }

  return (
    <AppLayout>
      <Header
        title="Proyectos"
        actions={
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo
          </Button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="paused">Pausados</SelectItem>
              <SelectItem value="completed">Terminados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            <button
              onClick={() => setTagFilter(null)}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${
                tagFilter === null
                  ? 'bg-primary/20 border-primary/50 text-primary'
                  : 'border-border text-muted-foreground hover:border-border/80'
              }`}
            >
              Todos
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setTagFilter(tagFilter === tag.id ? null : tag.id!)}
                className={`transition-opacity ${tagFilter === tag.id ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <TagBadge tag={tag} />
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No hay proyectos"
            description={
              projects.length === 0
                ? 'Crea tu primer proyecto para comenzar.'
                : 'No se encontraron proyectos con los filtros actuales.'
            }
            action={
              projects.length === 0 ? (
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-4 w-4" /> Crear proyecto
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tags={tags}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                  onViewDetail={setDetailProject}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Editar proyecto' : 'Nuevo proyecto'}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => setDialogOpen(false)}
            selectedTagIds={selectedTagIds}
            onTagsChange={setSelectedTagIds}
          />
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      {detailProject && (
        <ProjectDetailModal
          project={detailProject}
          tags={tags}
          onClose={() => setDetailProject(null)}
          onEdit={(p) => {
            setDetailProject(null)
            openEdit(p)
          }}
        />
      )}
    </AppLayout>
  )
}
