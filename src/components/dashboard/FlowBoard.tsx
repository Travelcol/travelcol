import { useCallback, useMemo, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Connection,
  type EdgeChange,
  type Edge,
  type OnNodeDrag,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { toast } from 'sonner'
import { useDataStore } from '@/store/dataStore'
import { useUIStore } from '@/store/uiStore'
import { ProjectNode } from './ProjectNode'
import { ServiceNode } from './ServiceNode'
import type { ProjectNodeType } from './ProjectNode'
import type { ServiceNodeType } from './ServiceNode'

type FlowNode = ProjectNodeType | ServiceNodeType

const nodeTypes = { project: ProjectNode, service: ServiceNode }
const EMPTY: never[] = []

export function FlowBoard() {
  const theme = useUIStore(s => s.theme)
  const isDark = theme === 'dark'

  const projects = useDataStore(s => s.projects)
  const services = useDataStore(s => s.services)
  const relations = useDataStore(s => s.relations)
  const tags = useDataStore(s => s.tags)
  const positions = useDataStore(s => s.positions)
  const { addRelation, deleteRelation, saveNodePosition } = useDataStore()

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const getPosition = useCallback(
    (type: 'project' | 'service', id: number, fallbackIndex: number) => {
      const saved = positions.find(p => p.entityType === type && p.entityId === id)
      if (saved) return { x: saved.x, y: saved.y }
      return type === 'project' ? { x: 60, y: 60 + fallbackIndex * 200 } : { x: 520, y: 60 + fallbackIndex * 160 }
    },
    [positions],
  )

  const computedNodes = useMemo<FlowNode[]>(() => {
    const projectNodes: ProjectNodeType[] = projects.map((project, i) => ({
      id: `project-${project.id}`,
      type: 'project' as const,
      position: getPosition('project', project.id!, i),
      data: { project, tags },
    }))
    const serviceNodes: ServiceNodeType[] = services.map((service, i) => ({
      id: `service-${service.id}`,
      type: 'service' as const,
      position: getPosition('service', service.id!, i),
      data: { service, tags },
    }))
    return [...projectNodes, ...serviceNodes]
  }, [projects, services, tags, getPosition])

  const computedEdges = useMemo(
    () => relations.map(r => ({
      id: `rel-${r.id}`,
      source: `project-${r.projectId}`,
      target: `service-${r.serviceId}`,
      style: { stroke: 'hsl(0 84% 57% / 0.5)', strokeWidth: 2 },
      animated: false,
    })),
    [relations],
  )

  useEffect(() => { setNodes(computedNodes) }, [computedNodes]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setEdges(computedEdges) }, [computedEdges]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNodeDragStop: OnNodeDrag<FlowNode> = useCallback((_event, node) => {
    const [type, idStr] = node.id.split('-') as ['project' | 'service', string]
    const entityId = parseInt(idStr)
    if (!isNaN(entityId)) {
      saveNodePosition(type, entityId, node.position.x, node.position.y).catch(console.error)
    }
  }, [saveNodePosition])

  const handleEdgesChange = useCallback(
    async (changes: EdgeChange<Edge>[]) => {
      for (const change of changes) {
        if (change.type === 'remove') {
          const relId = parseInt(change.id.replace('rel-', ''))
          if (!isNaN(relId)) {
            await deleteRelation(relId)
            toast.success('Relación eliminada')
          }
        }
      }
      onEdgesChange(changes)
    },
    [onEdgesChange, deleteRelation],
  )

  const onConnect = useCallback(
    async (connection: Connection) => {
      const { source, target } = connection
      if (!source || !target) return
      const projectId = parseInt(source.replace('project-', ''))
      const serviceId = parseInt(target.replace('service-', ''))
      if (isNaN(projectId) || isNaN(serviceId)) return

      const existing = relations.find(r => r.projectId === projectId && r.serviceId === serviceId)
      if (existing) { toast.error('Esta relación ya existe'); return }

      try {
        const id = await addRelation(projectId, serviceId)
        toast.success('Relación creada')
        setEdges(eds => [...eds, {
          id: `rel-${id}`,
          source: connection.source!,
          target: connection.target!,
          style: { stroke: 'hsl(0 84% 57% / 0.5)', strokeWidth: 2 },
        }])
      } catch { toast.error('Error al crear relación') }
    },
    [relations, addRelation, setEdges],
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={handleEdgesChange}
        onNodeDragStop={handleNodeDragStop} onConnect={onConnect}
        nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3} maxZoom={2} deleteKeyCode="Delete"
        colorMode={isDark ? 'dark' : 'light'} proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color={isDark ? 'hsl(0 5% 12%)' : 'hsl(0 10% 88%)'} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={node => {
            if (node.type === 'project') {
              const data = node.data as { project: { color?: string } }
              return data.project.color ?? '#ef4444'
            }
            return '#334155'
          }}
          maskColor={isDark ? 'hsl(0 0% 4% / 0.8)' : 'hsl(0 0% 98% / 0.8)'}
        />
      </ReactFlow>
    </div>
  )
}

export { EMPTY }
