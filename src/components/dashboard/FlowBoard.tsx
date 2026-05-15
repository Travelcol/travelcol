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
  type NodeDragHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useLiveQuery } from 'dexie-react-hooks'
import { toast } from 'sonner'
import { db, saveNodePosition } from '@/database/db'
import { ProjectNode } from './ProjectNode'
import { ServiceNode } from './ServiceNode'
import type { ProjectNodeType } from './ProjectNode'
import type { ServiceNodeType } from './ServiceNode'

type FlowNode = ProjectNodeType | ServiceNodeType

const nodeTypes = {
  project: ProjectNode,
  service: ServiceNode,
}

const EMPTY: never[] = []

export function FlowBoard() {
  const projects = useLiveQuery(() => db.projects.toArray()) ?? EMPTY
  const services = useLiveQuery(() => db.services.toArray()) ?? EMPTY
  const relations = useLiveQuery(() => db.relations.toArray()) ?? EMPTY
  const tags = useLiveQuery(() => db.tags.toArray()) ?? EMPTY
  const positions = useLiveQuery(() => db.nodePositions.toArray()) ?? EMPTY

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const getPosition = useCallback(
    (type: 'project' | 'service', id: number, fallbackIndex: number) => {
      const saved = positions.find((p) => p.entityType === type && p.entityId === id)
      if (saved) return { x: saved.x, y: saved.y }
      return type === 'project'
        ? { x: 60, y: 60 + fallbackIndex * 200 }
        : { x: 520, y: 60 + fallbackIndex * 160 }
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
    () =>
      relations.map((r) => ({
        id: `rel-${r.id}`,
        source: `project-${r.projectId}`,
        target: `service-${r.serviceId}`,
        style: { stroke: 'hsl(263 70% 60% / 0.5)', strokeWidth: 2 },
        animated: false,
      })),
    [relations],
  )

  useEffect(() => {
    setNodes(computedNodes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedNodes])

  useEffect(() => {
    setEdges(computedEdges)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedEdges])

  // Save position only when the user explicitly finishes dragging a node.
  const handleNodeDragStop: NodeDragHandler = useCallback((_event, node) => {
    const [type, idStr] = node.id.split('-') as ['project' | 'service', string]
    const entityId = parseInt(idStr)
    if (!isNaN(entityId)) {
      saveNodePosition(type, entityId, node.position.x, node.position.y).catch(console.error)
    }
  }, [])

  const handleEdgesChange = useCallback(
    async (changes: EdgeChange<Edge>[]) => {
      for (const change of changes) {
        if (change.type === 'remove') {
          const relId = parseInt(change.id.replace('rel-', ''))
          if (!isNaN(relId)) {
            await db.relations.delete(relId)
            toast.success('Relación eliminada')
          }
        }
      }
      onEdgesChange(changes)
    },
    [onEdgesChange],
  )

  const onConnect = useCallback(
    async (connection: Connection) => {
      const { source, target } = connection
      if (!source || !target) return

      const projectId = parseInt(source.replace('project-', ''))
      const serviceId = parseInt(target.replace('service-', ''))

      if (isNaN(projectId) || isNaN(serviceId)) return

      const existing = await db.relations.where({ projectId, serviceId }).first()
      if (existing) {
        toast.error('Esta relación ya existe')
        return
      }

      const id = await db.relations.add({ projectId, serviceId, createdAt: new Date().toISOString() })
      toast.success('Relación creada')
      const newEdge = {
        id: `rel-${id as number}`,
        source: connection.source!,
        target: connection.target!,
        style: { stroke: 'hsl(263 70% 60% / 0.5)', strokeWidth: 2 },
      }
      setEdges((eds) => [...eds, newEdge])
    },
    [setEdges],
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={handleEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        deleteKeyCode="Delete"
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="hsl(240 5% 15%)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'project') {
              const data = node.data as { project: { color?: string } }
              return data.project.color ?? '#6366f1'
            }
            return '#334155'
          }}
          maskColor="hsl(240 10% 3.9% / 0.8)"
        />
      </ReactFlow>
    </div>
  )
}