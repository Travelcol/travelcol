import { Menu, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

interface HeaderProps {
  title: string
  actions?: React.ReactNode
}

export function Header({ title, actions }: HeaderProps) {
  const email = useAuthStore((s) => s.email)
  const openMobileSidebar = useUIStore(s => s.openMobileSidebar)

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 sm:px-6 bg-background/50 backdrop-blur-sm flex-shrink-0 gap-2">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={openMobileSidebar}
          className="md:hidden flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {actions}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="hidden sm:inline truncate max-w-[140px]">{email}</span>
        </div>
      </div>
    </header>
  )
}
