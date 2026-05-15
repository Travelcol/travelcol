import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Tags, Edit, Trash2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useDataStore } from '@/store/dataStore'
import type { Tag } from '@/types'
import { AppLayout } from '@/layouts/AppLayout'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ColorPicker } from '@/components/common/ColorPicker'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  color: z.string().min(1, 'El color es requerido'),
})

type FormData = z.infer<typeof schema>

function TagForm({ tag, onSubmit, onCancel }: { tag?: Tag; onSubmit: (d: FormData) => Promise<void>; onCancel: () => void }) {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: tag?.name ?? '', color: tag?.color ?? '#ef4444' },
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" {...register('name')} placeholder="Ej: producción" autoFocus />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Color *</Label>
        <Controller name="color" control={control} render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />} />
        {errors.color && <p className="text-xs text-destructive">{errors.color.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : tag ? 'Actualizar' : 'Crear'}</Button>
      </div>
    </form>
  )
}

export function TagsPage() {
  const tags = useDataStore(s => s.tags)
  const { addTag, updateTag, deleteTag, logActivity } = useDataStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  function openCreate() { setEditingTag(null); setDialogOpen(true) }
  function openEdit(tag: Tag) { setEditingTag(tag); setDialogOpen(true) }

  async function handleSubmit(data: FormData) {
    try {
      if (editingTag?.id) {
        await updateTag(editingTag.id, data)
        await logActivity('tag', 'updated', editingTag.id, data.name)
        toast.success('Tag actualizado')
      } else {
        const id = await addTag(data)
        await logActivity('tag', 'created', id, data.name)
        toast.success('Tag creado')
      }
      setDialogOpen(false)
    } catch { toast.error('Error al guardar tag') }
  }

  async function handleDelete(id: number) {
    try {
      const tag = tags.find(t => t.id === id)
      await deleteTag(id)
      if (tag) await logActivity('tag', 'deleted', id, tag.name)
      toast.success('Tag eliminado')
    } catch { toast.error('Error al eliminar tag') }
  }

  return (
    <AppLayout>
      <Header title="Tags" actions={<Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Nuevo tag</Button>} />

      <div className="flex-1 overflow-auto p-6">
        {tags.length === 0 ? (
          <EmptyState icon={Tags} title="No hay tags" description="Crea tags para organizar tus proyectos y servicios." action={<Button size="sm" onClick={openCreate}><Plus className="h-4 w-4" /> Crear tag</Button>} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {tags.map(tag => (
                <motion.div key={tag.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-border/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full flex-shrink-0" style={{ backgroundColor: tag.color }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{tag.name}</p>
                      <p className="text-xs font-mono text-muted-foreground">{tag.color}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(tag)}><Edit className="h-3.5 w-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar tag?</AlertDialogTitle>
                          <AlertDialogDescription>Se eliminará el tag "{tag.name}" de todos los proyectos y servicios.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(tag.id!)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>{editingTag ? 'Editar tag' : 'Nuevo tag'}</DialogTitle></DialogHeader>
          <TagForm tag={editingTag ?? undefined} onSubmit={handleSubmit} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
