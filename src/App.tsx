import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppRoutes } from '@/routes'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ErrorBoundary label="App">
    <BrowserRouter>
      <TooltipProvider delayDuration={300}>
        <AppRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(240 10% 7%)',
              border: '1px solid hsl(240 5% 13%)',
              color: 'hsl(0 0% 98%)',
            },
          }}
          richColors
        />
      </TooltipProvider>
    </BrowserRouter>
    </ErrorBoundary>
  )
}
