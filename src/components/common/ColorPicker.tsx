import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

const COLORS = [
  '#7f1d1d',
  '#991b1b',
  '#b91c1c',
  '#dc2626',
  '#ef4444',
  '#f87171',
  '#c2410c',
  '#ea580c',
  '#f97316',
  '#fb923c',
  '#92400e',
  '#b45309',
  '#d97706',
  '#f59e0b',
  '#fbbf24',
  '#fde047',
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
