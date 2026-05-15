import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { useUIStore } from '@/store/uiStore'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const mobileSidebarOpen = useUIStore(s => s.mobileSidebarOpen)
  const closeMobileSidebar = useUIStore(s => s.closeMobileSidebar)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">{children}</main>
    </div>
  )
}
