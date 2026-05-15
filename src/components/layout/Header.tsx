import { useAuthStore } from '@/store/authStore'
import { User } from 'lucide-react'

interface HeaderProps {
  title: string
  actions?: React.ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  const username = useAuthStore((s) => s.username)

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6 bg-background/50 backdrop-blur-sm flex-shrink-0">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        {actions}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="hidden sm:inline">{username}</span>
        </div>
      </div>
    </header>
  )
}
