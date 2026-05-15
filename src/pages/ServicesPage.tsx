import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Search, Server } from 'lucide-react'
import { toast } from 'sonner'
import { useDataStore } from '@/store/dataStore'
import type { Service } from '@/types'
import { PROVIDERS } from '@/types'
import { AppLayout } from '@/layouts/AppLayout'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ServiceCard } from '@/components/services/ServiceCard'
import { ServiceForm } from '@/components/services/ServiceForm'
import { EmptyState } from '@/components/common/EmptyState'
import { TagBadge } from '@/components/common/TagBadge'

export function ServicesPage() {
  const services = useDataStore(s => s.services)
  const tags = useDataStore(s => s.tags)
  const { addService, updateService, deleteService, logActivity } = useDataStore()

  const [search, setSearch] = useState('')
  const [providerFilter, setProviderFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

  const filtered = services.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
    const matchProvider = providerFilter === 'all' || s.provider === providerFilter
    const matchTag = tagFilter === null || s.tags.includes(tagFilter)
    return matchSearch && matchProvider && matchTag
  })

  function openCreate() { setEditingService(null); setSelectedTagIds([]); setDialogOpen(true) }
  function openEdit(service: Service) { setEditingService(service); setSelectedTagIds(service.tags); setDialogOpen(true) }

  async function handleSubmit(data: Omit<Service, 'id'>) {
    try {
      if (editingService?.id) {
        await updateService(editingService.id, data)
        await logActivity('service', 'updated', editingService.id, data.name)
        toast.success('Servicio actualizado')
      } else {
        const id = await addService(data)
        await logActivity('service', 'created', id, data.name)
        toast.success('Servicio creado')
      }
      setDialogOpen(false)
    } catch { toast.error('Error al guardar servicio') }
  }

  async function handleDelete(id: number) {
    try {
      const service = services.find(s => s.id === id)
      await deleteService(id)
      if (service) await logActivity('service', 'deleted', id, service.name)
      toast.success('Servicio eliminado')
    } catch { toast.error('Error al eliminar servicio') }
  }

  async function handleToggleFavorite(id: number) {
    const service = services.find(s => s.id === id)
    if (!service) return
    await updateService(id, { isFavorite: !service.isFavorite })
  }

  const usedProviders = [...new Set(services.map(s => s.provider))]

  return (
    <AppLayout>
      <Header title="Servicios" actions={<Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Nuevo</Button>} />

      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar servicios..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {usedProviders.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              {PROVIDERS.filter(p => !usedProviders.includes(p)).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            <button onClick={() => setTagFilter(null)} className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${tagFilter === null ? 'bg-primary/20 border-primary/50 text-primary' : 'border-border text-muted-foreground hover:border-border/80'}`}>Todos</button>
            {tags.map(tag => (
              <button key={tag.id} onClick={() => setTagFilter(tagFilter === tag.id ? null : tag.id!)} className={`transition-opacity ${tagFilter === tag.id ? '' : 'opacity-60 hover:opacity-100'}`}>
                <TagBadge tag={tag} />
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon={Server} title="No hay servicios" description={services.length === 0 ? 'Agrega tu primer servicio externo.' : 'No se encontraron servicios con los filtros actuales.'} action={services.length === 0 ? <Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Agregar servicio</Button> : undefined} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map(service => (
                <ServiceCard key={service.id} service={service} tags={tags} onEdit={openEdit} onDelete={handleDelete} onToggleFavorite={handleToggleFavorite} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editar servicio' : 'Nuevo servicio'}</DialogTitle>
          </DialogHeader>
          <ServiceForm service={editingService ?? undefined} onSubmit={handleSubmit} onCancel={() => setDialogOpen(false)} selectedTagIds={selectedTagIds} onTagsChange={setSelectedTagIds} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
