import { useLiveQuery } from 'dexie-react-hooks'
import { ExternalLink, Edit, Star, FileText } from 'lucide-react'
import { db } from '@/database/db'
import type { Project, Tag } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'
import { ProviderIcon } from '@/components/common/ProviderIcon'
import { Separator } from '@/components/ui/separator'

interface ProjectDetailModalProps {
  project: Project
  tags: Tag[]
  onClose: () => void
  onEdit: (project: Project) => void
}

export function ProjectDetailModal({ project, tags, onClose, onEdit }: ProjectDetailModalProps) {
  const relations = useLiveQuery(() => db.relations.where('projectId').equals(project.id!).toArray()) ?? []
  const allServices = useLiveQuery(() => db.services.toArray()) ?? []
  const projectTags = tags.filter((t) => project.tags.includes(t.id!))
  const linkedServices = allServices.filter((s) => relations.some((r) => r.serviceId === s.id))

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className="h-7 w-7 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: project.color ?? '#6366f1' }}
            >
              {project.title[0]?.toUpperCase()}
            </div>
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status + favorite */}
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            {project.isFavorite && (
              <span className="flex items-center gap-1 text-xs text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-current" /> Favorito
              </span>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground">{project.description}</p>
          )}

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {project.link}
            </a>
          )}

          {/* Tags */}
          {projectTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {projectTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}

          <Separator />

          {/* Linked services */}
          <div>
            <h4 className="text-sm font-medium mb-2.5 flex items-center gap-1.5">
              Servicios relacionados
              <span className="text-xs font-normal text-muted-foreground">({linkedServices.length})</span>
            </h4>
            {linkedServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {linkedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-2.5 rounded-md border border-border bg-muted/30 px-3 py-2"
                  >
                    <ProviderIcon provider={service.provider} size={14} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{service.name}</p>
                      <p className="text-[10px] text-muted-foreground">{service.provider}</p>
                    </div>
                    {service.link && (
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Sin servicios relacionados</p>
            )}
          </div>

          {/* Notes */}
          {project.notes && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Notas
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap rounded-md bg-muted/30 p-3">
                  {project.notes}
                </p>
              </div>
            </>
          )}

          {/* Dates */}
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>Creado: {new Date(project.createdAt).toLocaleDateString('es')}</p>
            <p>Actualizado: {new Date(project.updatedAt).toLocaleDateString('es')}</p>
          </div>

          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
              <Edit className="h-3.5 w-3.5" /> Editar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
