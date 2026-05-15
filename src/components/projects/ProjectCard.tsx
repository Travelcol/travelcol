import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Edit, Trash2, MoreHorizontal, FileText } from 'lucide-react'
import type { Project, Tag } from '@/types'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ProjectCardProps {
  project: Project
  tags: Tag[]
  onEdit: (project: Project) => void
  onDelete: (id: number) => void
  onToggleFavorite: (id: number) => void
  onViewDetail: (project: Project) => void
}

export function ProjectCard({ project, tags, onEdit, onDelete, onToggleFavorite, onViewDetail }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const projectTags = tags.filter((t) => project.tags.includes(t.id!))

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-lg border border-border bg-card hover:border-border/80 hover:bg-card/80 transition-all duration-200 overflow-hidden"
    >
      {/* Color bar */}
      {project.color && (
        <div className="h-0.5 w-full" style={{ backgroundColor: project.color }} />
      )}

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
              style={{ backgroundColor: project.color ?? '#6366f1' }}
            >
              {project.title[0]?.toUpperCase()}
            </div>
            <h3 className="font-medium text-foreground text-sm truncate">{project.title}</h3>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onToggleFavorite(project.id!)}
              className={`p-1 rounded transition-colors ${
                project.isFavorite ? 'text-yellow-400' : 'text-muted-foreground opacity-0 group-hover:opacity-100'
              } hover:text-yellow-400`}
            >
              <Star className="h-3.5 w-3.5" fill={project.isFavorite ? 'currentColor' : 'none'} />
            </button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
              {showMenu && (
                <div
                  className="absolute right-0 top-8 z-10 w-40 rounded-md border border-border bg-popover shadow-lg py-1"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <button
                    onClick={() => { onViewDetail(project); setShowMenu(false) }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" /> Ver detalle
                  </button>
                  <button
                    onClick={() => { onEdit(project); setShowMenu(false) }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" /> Editar
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará permanentemente "{project.title}" y todas sus relaciones.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(project.id!)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
          {project.description || 'Sin descripción'}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {projectTags.slice(0, 3).map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
          {projectTags.length > 3 && (
            <span className="text-xs text-muted-foreground">+{projectTags.length - 3}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
        <StatusBadge status={project.status} />
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
