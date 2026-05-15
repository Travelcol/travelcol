import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppRoutes } from '@/routes'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

export default function App() {
  const initAuth = useAuthStore(s => s.init)
  const initTheme = useUIStore(s => s.initTheme)

  useEffect(() => {
    initTheme()
    initAuth()
  }, [initTheme, initAuth])

  return (
    <ErrorBoundary label="App">
      <BrowserRouter>
        <TooltipProvider delayDuration={300}>
          <AppRoutes />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              },
            }}
            richColors
          />
        </TooltipProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
