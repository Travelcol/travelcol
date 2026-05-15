import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDataStore } from '@/store/dataStore'
import type { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TagBadge } from '@/components/common/TagBadge'
import { ColorPicker } from '@/components/common/ColorPicker'

const schema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string(),
  link: z.string(),
  status: z.union([z.literal('active'), z.literal('paused'), z.literal('completed')]),
  color: z.string().optional(),
  notes: z.string(),
})

type FormData = z.infer<typeof schema>

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
  selectedTagIds: number[]
  onTagsChange: (ids: number[]) => void
}

export function ProjectForm({ project, onSubmit, onCancel, selectedTagIds, onTagsChange }: ProjectFormProps) {
  const tags = useDataStore(s => s.tags)

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project?.title ?? '',
      description: project?.description ?? '',
      link: project?.link ?? '',
      status: project?.status ?? 'active',
      color: project?.color ?? '#6366f1',
      notes: project?.notes ?? '',
    },
  })

  async function onValid(data: FormData) {
    await onSubmit({ title: data.title, description: data.description, link: data.link, status: data.status, color: data.color, notes: data.notes, tags: selectedTagIds, isFavorite: project?.isFavorite ?? false })
  }

  function toggleTag(tagId: number) {
    onTagsChange(selectedTagIds.includes(tagId) ? selectedTagIds.filter(id => id !== tagId) : [...selectedTagIds, tagId])
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Título *</Label>
        <Input id="title" {...register('title')} placeholder="Nombre del proyecto" autoFocus />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" {...register('description')} placeholder="Descripción breve..." rows={2} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="link">Link principal</Label>
        <Input id="link" {...register('link')} placeholder="https://..." />
      </div>
      <div className="space-y-1.5">
        <Label>Estado</Label>
        <Controller name="status" control={control} render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="paused">Pausado</SelectItem>
              <SelectItem value="completed">Terminado</SelectItem>
            </SelectContent>
          </Select>
        )} />
      </div>
      <div className="space-y-1.5">
        <Label>Color</Label>
        <Controller name="color" control={control} render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />} />
      </div>
      {tags.length > 0 && (
        <div className="space-y-1.5">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <button key={tag.id} type="button" onClick={() => toggleTag(tag.id!)} className="transition-opacity" style={{ opacity: selectedTagIds.includes(tag.id!) ? 1 : 0.4 }}>
                <TagBadge tag={tag} />
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="notes">Notas</Label>
        <Textarea id="notes" {...register('notes')} placeholder="Notas rápidas..." rows={2} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : project ? 'Actualizar' : 'Crear'}</Button>
      </div>
    </form>
  )
}
