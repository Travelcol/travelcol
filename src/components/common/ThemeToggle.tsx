import { Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui/button'

interface ThemeToggleProps {
  className?: string
  variant?: 'icon' | 'full'
}

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const theme = useUIStore(s => s.theme)
  const toggleTheme = useUIStore(s => s.toggleTheme)

  if (variant === 'full') {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${className ?? ''}`}
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      </button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`h-8 w-8 ${className ?? ''}`}
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
