import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  label?: string
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(`[ErrorBoundary:${this.props.label ?? 'root'}]`, error, info.componentStack)
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-3 p-6 text-center">
          <p className="text-sm font-semibold text-destructive">Error en {this.props.label ?? 'componente'}</p>
          <pre className="text-xs text-muted-foreground bg-muted rounded p-3 max-w-xl overflow-auto text-left whitespace-pre-wrap">
            {error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
