import { ReactFlowProvider } from '@xyflow/react'
import { AppLayout } from '@/layouts/AppLayout'
import { Header } from '@/components/layout/Header'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { FlowBoard } from '@/components/dashboard/FlowBoard'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Info } from 'lucide-react'

export function DashboardPage() {
  return (
    <AppLayout>
      <Header
        title="Dashboard"
        actions={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-md px-2 py-1">
            <Info className="h-3 w-3" />
            <span className="hidden sm:inline">Arrastra los nodos · Conecta con líneas · Elimina con Delete</span>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Stats */}
        <div className="px-6 pt-4 pb-3 flex-shrink-0">
          <StatsCards />
        </div>

        {/* Flow Board */}
        <div className="flex-1 min-h-0 mx-6 mb-4 rounded-lg border border-border overflow-hidden">
          <ErrorBoundary label="FlowBoard">
            <ReactFlowProvider>
              <FlowBoard />
            </ReactFlowProvider>
          </ErrorBoundary>
        </div>
      </div>
    </AppLayout>
  )
}
