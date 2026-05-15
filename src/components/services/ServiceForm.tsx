import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDataStore } from '@/store/dataStore'
import type { Service } from '@/types'
import { PROVIDERS } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TagBadge } from '@/components/common/TagBadge'
import { ColorPicker } from '@/components/common/ColorPicker'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  provider: z.string().min(1, 'El proveedor es requerido'),
  link: z.string(),
  description: z.string(),
  color: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ServiceFormProps {
  service?: Service
  onSubmit: (data: Omit<Service, 'id'>) => Promise<void>
  onCancel: () => void
  selectedTagIds: number[]
  onTagsChange: (ids: number[]) => void
}

export function ServiceForm({ service, onSubmit, onCancel, selectedTagIds, onTagsChange }: ServiceFormProps) {
  const tags = useDataStore(s => s.tags)

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: service?.name ?? '',
      provider: service?.provider ?? 'Vercel',
      link: service?.link ?? '',
      description: service?.description ?? '',
      color: service?.color ?? '#6366f1',
    },
  })

  async function onValid(data: FormData) {
    await onSubmit({ name: data.name, provider: data.provider, link: data.link, description: data.description, color: data.color, tags: selectedTagIds, isFavorite: service?.isFavorite ?? false })
  }

  function toggleTag(tagId: number) {
    onTagsChange(selectedTagIds.includes(tagId) ? selectedTagIds.filter(id => id !== tagId) : [...selectedTagIds, tagId])
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" {...register('name')} placeholder="Ej: Vercel Production" autoFocus />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label>Proveedor *</Label>
        <Controller name="provider" control={control} render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {PROVIDERS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        )} />
        {errors.provider && <p className="text-xs text-destructive">{errors.provider.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="link">Link</Label>
        <Input id="link" {...register('link')} placeholder="https://..." />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" {...register('description')} placeholder="Descripción breve..." rows={2} />
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
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : service ? 'Actualizar' : 'Crear'}</Button>
      </div>
    </form>
  )
}
