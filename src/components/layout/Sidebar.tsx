import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Server,
  Tags,
  Settings,
  LogOut,
  Boxes,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'
import { ThemeToggle } from '@/components/common/ThemeToggle'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Proyectos' },
  { to: '/services', icon: Server, label: 'Servicios' },
  { to: '/tags', icon: Tags, label: 'Tags' },
  { to: '/settings', icon: Settings, label: 'Configuración' },
]

export function Sidebar() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const mobileSidebarOpen = useUIStore(s => s.mobileSidebarOpen)
  const closeMobileSidebar = useUIStore(s => s.closeMobileSidebar)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleNavClick() {
    closeMobileSidebar()
  }

  return (
    <aside
      className={cn(
        // Base — mobile: fixed drawer, desktop: static in flex flow
        'fixed inset-y-0 left-0 z-50 flex flex-col h-screen w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out',
        'md:relative md:w-60 md:translate-x-0 md:z-auto md:flex',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/20 flex-shrink-0">
            <Boxes className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">Manager</span>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={closeMobileSidebar}
          className="md:hidden p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Cerrar menú"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 h-9 px-3 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-primary/15 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-0.5 flex-shrink-0">
        <div className="flex items-center gap-2.5 h-9 px-3">
          <ThemeToggle variant="full" className="w-full" />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 h-9 w-full px-3 rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
