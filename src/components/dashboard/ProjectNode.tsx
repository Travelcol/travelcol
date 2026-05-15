import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { ExternalLink } from 'lucide-react'
import type { Node } from '@xyflow/react'
import type { Project, Tag } from '@/types'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'

export type ProjectNodeData = {
  project: Project
  tags: Tag[]
}

export type ProjectNodeType = Node<ProjectNodeData, 'project'>

export const ProjectNode = memo(({ data }: NodeProps<ProjectNodeType>) => {
  const { project, tags } = data
  const projectTags = tags.filter((t) => project.tags.includes(t.id!)).slice(0, 2)

  return (
    <div
      className="rounded-lg border bg-card shadow-md min-w-[200px] max-w-[240px] overflow-hidden"
      style={{ borderColor: project.color ? `${project.color}50` : undefined }}
    >
      {project.color && <div className="h-0.5 w-full" style={{ backgroundColor: project.color }} />}

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="h-6 w-6 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: project.color ?? '#6366f1' }}
          >
            {project.title[0]?.toUpperCase()}
          </div>
          <span className="text-xs font-semibold text-foreground truncate">{project.title}</span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </a>
          )}
        </div>

        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{project.description}</p>
        )}

        <div className="flex items-center justify-between gap-1 flex-wrap">
          <StatusBadge status={project.status} />
          <div className="flex gap-1">
            {projectTags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-primary !border-background" />
    </div>
  )
})
ProjectNode.displayName = 'ProjectNode'
