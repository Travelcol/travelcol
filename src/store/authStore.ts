import { create } from 'zustand'

interface AuthState {
  username: string | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const AUTH_KEY = 'manager_auth'

function readSession(): { username: string } | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    return JSON.parse(raw) as { username: string }
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return null
  }
}

const initialSession = readSession()

export const useAuthStore = create<AuthState>(() => ({
  username: initialSession?.username ?? null,
  isAuthenticated: initialSession !== null,

  login: (username: string) => {
    const session = { username, loggedInAt: new Date().toISOString() }
    localStorage.setItem(AUTH_KEY, JSON.stringify(session))
    useAuthStore.setState({ username, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY)
    useAuthStore.setState({ username: null, isAuthenticated: false })
  },
}))
