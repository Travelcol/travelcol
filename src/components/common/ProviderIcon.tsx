import {
  Cloud,
  Package,
  Mail,
  Database,
  GitBranch,
  Shield,
  Globe,
  Zap,
  Server,
  CreditCard,
  MessageSquare,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const PROVIDER_MAP: Record<string, { icon: LucideIcon; color: string }> = {
  Vercel: { icon: Globe, color: '#ffffff' },
  Railway: { icon: Package, color: '#7c3aed' },
  Resend: { icon: Mail, color: '#000000' },
  AWS: { icon: Cloud, color: '#ff9900' },
  Supabase: { icon: Database, color: '#3ecf8e' },
  GitHub: { icon: GitBranch, color: '#ffffff' },
  Cloudflare: { icon: Shield, color: '#f38020' },
  PlanetScale: { icon: Database, color: '#000000' },
  Neon: { icon: Database, color: '#00e599' },
  Turso: { icon: Database, color: '#4ff8d2' },
  Stripe: { icon: CreditCard, color: '#635bff' },
  Twilio: { icon: MessageSquare, color: '#f22f46' },
  SendGrid: { icon: Mail, color: '#1a82e2' },
  'Fly.io': { icon: Zap, color: '#7c3aed' },
  Render: { icon: Server, color: '#46e3b7' },
  DigitalOcean: { icon: Cloud, color: '#0080ff' },
  Netlify: { icon: Globe, color: '#00c7b7' },
  Firebase: { icon: Zap, color: '#ffca28' },
  'MongoDB Atlas': { icon: Database, color: '#00ed64' },
  Cloudinary: { icon: Cloud, color: '#3448c5' },
  Other: { icon: Server, color: '#64748b' },
}

interface ProviderIconProps {
  provider: string
  size?: number
  className?: string
}

export function ProviderIcon({ provider, size = 16, className }: ProviderIconProps) {
  const cfg = PROVIDER_MAP[provider] ?? PROVIDER_MAP['Other']
  const IconComp = cfg.icon
  return (
    <span
      className={className}
      style={{ color: cfg.color === '#000000' || cfg.color === '#ffffff' ? undefined : cfg.color }}
    >
      <IconComp size={size} />
    </span>
  )
}

export function getProviderColor(provider: string): string {
  return PROVIDER_MAP[provider]?.color ?? '#64748b'
}
