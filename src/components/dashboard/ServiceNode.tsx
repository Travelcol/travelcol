import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { ExternalLink } from 'lucide-react'
import type { Node } from '@xyflow/react'
import type { Service, Tag } from '@/types'
import { ProviderIcon } from '@/components/common/ProviderIcon'
import { TagBadge } from '@/components/common/TagBadge'

export type ServiceNodeData = {
  service: Service
  tags: Tag[]
}

export type ServiceNodeType = Node<ServiceNodeData, 'service'>

export const ServiceNode = memo(({ data }: NodeProps<ServiceNodeType>) => {
  const { service, tags } = data
  const serviceTags = tags.filter((t) => service.tags.includes(t.id!)).slice(0, 2)

  return (
    <div className="rounded-lg border border-border bg-card shadow-md min-w-[180px] max-w-[220px] overflow-hidden">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-muted flex-shrink-0">
            <ProviderIcon provider={service.provider} size={13} />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-foreground truncate block">{service.name}</span>
            <span className="text-[10px] text-muted-foreground">{service.provider}</span>
          </div>
          {service.link && (
            <a
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </a>
          )}
        </div>

        {serviceTags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {serviceTags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Left} className="!bg-primary !border-background" />
    </div>
  )
})
ServiceNode.displayName = 'ServiceNode'
