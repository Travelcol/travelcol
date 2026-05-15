import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import type { Service, Tag } from '@/types'
import { TagBadge } from '@/components/common/TagBadge'
import { ProviderIcon } from '@/components/common/ProviderIcon'
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

interface ServiceCardProps {
  service: Service
  tags: Tag[]
  onEdit: (service: Service) => void
  onDelete: (id: number) => void
  onToggleFavorite: (id: number) => void
}

export function ServiceCard({ service, tags, onEdit, onDelete, onToggleFavorite }: ServiceCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const serviceTags = tags.filter((t) => service.tags.includes(t.id!))

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-lg border border-border bg-card hover:border-border/80 transition-all duration-200 overflow-hidden"
    >
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted flex-shrink-0">
              <ProviderIcon provider={service.provider} size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-foreground text-sm truncate">{service.name}</h3>
              <p className="text-xs text-muted-foreground">{service.provider}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onToggleFavorite(service.id!)}
              className={`p-1 rounded transition-colors ${
                service.isFavorite ? 'text-yellow-400' : 'text-muted-foreground opacity-0 group-hover:opacity-100'
              } hover:text-yellow-400`}
            >
              <Star className="h-3.5 w-3.5" fill={service.isFavorite ? 'currentColor' : 'none'} />
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
                  className="absolute right-0 top-8 z-10 w-36 rounded-md border border-border bg-popover shadow-lg py-1"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <button
                    onClick={() => { onEdit(service); setShowMenu(false) }}
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
                        <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará permanentemente "{service.name}" y todas sus relaciones.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(service.id!)}
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
          {service.description || 'Sin descripción'}
        </p>

        <div className="flex flex-wrap gap-1">
          {serviceTags.slice(0, 3).map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
          {serviceTags.length > 3 && (
            <span className="text-xs text-muted-foreground">+{serviceTags.length - 3}</span>
          )}
        </div>
      </div>

      {service.link && (
        <div className="flex items-center justify-end border-t border-border px-4 py-2.5">
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Abrir
          </a>
        </div>
      )}
    </motion.div>
  )
}
