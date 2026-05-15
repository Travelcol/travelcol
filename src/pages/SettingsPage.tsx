import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/database/db'
import { hashPassword, verifyPassword } from '@/utils/crypto'
import { generateSalt } from '@/utils/crypto'
import { useAuthStore } from '@/store/authStore'
import { AppLayout } from '@/layouts/AppLayout'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Download, Upload, Database, KeyRound, LogOut } from 'lucide-react'
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

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Contraseña actual requerida'),
    newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma la contraseña'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export function SettingsPage() {
  const navigate = useNavigate()
  const username = useAuthStore((s) => s.username)
  const logout = useAuthStore((s) => s.logout)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const stats = useLiveQuery(async () => ({
    projects: await db.projects.count(),
    services: await db.services.count(),
    tags: await db.tags.count(),
    relations: await db.relations.count(),
    logs: await db.activityLogs.count(),
  }))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) })

  async function onPasswordSubmit(data: PasswordFormData) {
    if (!username) return
    const user = await db.users.where('username').equals(username).first()
    if (!user) return

    const valid = await verifyPassword(data.currentPassword, user.passwordHash, user.salt)
    if (!valid) {
      toast.error('Contraseña actual incorrecta')
      return
    }

    const salt = generateSalt()
    const passwordHash = await hashPassword(data.newPassword, salt)
    await db.users.update(user.id!, { passwordHash, salt })
    toast.success('Contraseña actualizada')
    reset()
  }

  async function handleExport() {
    setIsExporting(true)
    try {
      const data = {
        projects: await db.projects.toArray(),
        services: await db.services.toArray(),
        tags: await db.tags.toArray(),
        relations: await db.relations.toArray(),
        nodePositions: await db.nodePositions.toArray(),
        exportedAt: new Date().toISOString(),
        version: '1.0',
      }
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `manager-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Datos exportados correctamente')
    } catch {
      toast.error('Error al exportar')
    } finally {
      setIsExporting(false)
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setIsImporting(true)
    try {
      const text = await file.text()
      const data = JSON.parse(text) as {
        projects?: unknown[]
        services?: unknown[]
        tags?: unknown[]
        relations?: unknown[]
        nodePositions?: unknown[]
      }

      await db.transaction('rw', [db.projects, db.services, db.tags, db.relations, db.nodePositions], async () => {
        if (data.tags) { await db.tags.clear(); await db.tags.bulkAdd(data.tags as Parameters<typeof db.tags.bulkAdd>[0]) }
        if (data.projects) { await db.projects.clear(); await db.projects.bulkAdd(data.projects as Parameters<typeof db.projects.bulkAdd>[0]) }
        if (data.services) { await db.services.clear(); await db.services.bulkAdd(data.services as Parameters<typeof db.services.bulkAdd>[0]) }
        if (data.relations) { await db.relations.clear(); await db.relations.bulkAdd(data.relations as Parameters<typeof db.relations.bulkAdd>[0]) }
        if (data.nodePositions) { await db.nodePositions.clear(); await db.nodePositions.bulkAdd(data.nodePositions as Parameters<typeof db.nodePositions.bulkAdd>[0]) }
      })

      toast.success('Datos importados correctamente')
    } catch {
      toast.error('Error al importar: archivo inválido')
    } finally {
      setIsImporting(false)
      e.target.value = ''
    }
  }

  async function handleClearData() {
    await db.transaction('rw', [db.projects, db.services, db.tags, db.relations, db.nodePositions, db.activityLogs], async () => {
      await Promise.all([
        db.projects.clear(),
        db.services.clear(),
        db.tags.clear(),
        db.relations.clear(),
        db.nodePositions.clear(),
        db.activityLogs.clear(),
      ])
    })
    toast.success('Todos los datos eliminados')
  }

  return (
    <AppLayout>
      <Header title="Configuración" />

      <div className="flex-1 overflow-auto p-6 max-w-2xl">
        <div className="space-y-6">

          {/* DB Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-4 w-4" /> Estado de la base de datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats ? (
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: 'Proyectos', value: stats.projects },
                    { label: 'Servicios', value: stats.services },
                    { label: 'Tags', value: stats.tags },
                    { label: 'Relaciones', value: stats.relations },
                    { label: 'Actividad', value: stats.logs },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-md bg-muted/40 p-3">
                      <p className="text-lg font-bold text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Cargando...</p>
              )}
            </CardContent>
          </Card>

          {/* Export/Import */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Download className="h-4 w-4" /> Backup de datos
              </CardTitle>
              <CardDescription>Exporta o importa todos tus datos en formato JSON.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleExport} disabled={isExporting} variant="outline" className="w-full">
                <Download className="h-4 w-4" />
                {isExporting ? 'Exportando...' : 'Exportar datos (JSON)'}
              </Button>
              <div className="relative">
                <Button variant="outline" className="w-full" disabled={isImporting} asChild>
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    {isImporting ? 'Importando...' : 'Importar datos (JSON)'}
                    <input type="file" accept=".json" className="sr-only" onChange={handleImport} />
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="h-4 w-4" /> Cambiar contraseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-3">
                <div className="space-y-1.5">
                  <Label>Contraseña actual</Label>
                  <Input {...register('currentPassword')} type="password" placeholder="••••••••" />
                  {errors.currentPassword && (
                    <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Nueva contraseña</Label>
                  <Input {...register('newPassword')} type="password" placeholder="••••••••" />
                  {errors.newPassword && <p className="text-xs text-destructive">{errors.newPassword.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Confirmar contraseña</Label>
                  <Input {...register('confirmPassword')} type="password" placeholder="••••••••" />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting} size="sm">
                  {isSubmitting ? 'Guardando...' : 'Actualizar contraseña'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Separator />

          {/* Danger zone */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-destructive">Zona de peligro</h3>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                  <Database className="h-4 w-4" /> Borrar todos los datos
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Borrar todos los datos?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Se eliminarán permanentemente todos los proyectos, servicios, tags y relaciones. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearData}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Borrar todo
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              variant="outline"
              size="sm"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={() => { logout(); navigate('/login') }}
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
