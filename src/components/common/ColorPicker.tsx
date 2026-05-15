import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

const COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#64748b',
  '#a855f7',
  '#14b8a6',
]

interface ColorPickerProps {
  value?: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className="relative h-7 w-7 rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
          style={{ backgroundColor: color }}
          aria-label={color}
        >
          {value === color && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-white drop-shadow" />
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
