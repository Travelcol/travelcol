import { create } from 'zustand'

const STORAGE_KEY = 'manager-theme'

function applyTheme(t: 'dark' | 'light') {
  if (t === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function loadTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {}
  return 'dark'
}

interface UIState {
  sidebarCollapsed: boolean
  theme: 'dark' | 'light'
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  setTheme: (t: 'dark' | 'light') => void
  toggleTheme: () => void
  initTheme: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  theme: 'dark',

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

  setTheme: (t) => {
    applyTheme(t)
    try { localStorage.setItem(STORAGE_KEY, t) } catch {}
    set({ theme: t })
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },

  initTheme: () => {
    const t = loadTheme()
    applyTheme(t)
    set({ theme: t })
  },
}))
