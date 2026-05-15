import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { useDataStore } from './dataStore'

interface AuthState {
  email: string | null
  isAuthenticated: boolean
  loading: boolean
  init: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  isAuthenticated: false,
  loading: true,

  async init() {
    const { data: { session } } = await supabase.auth.getSession()
    set({
      email: session?.user.email ?? null,
      isAuthenticated: !!session,
      loading: false,
    })
    if (session) await useDataStore.getState().init()

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        email: session?.user.email ?? null,
        isAuthenticated: !!session,
      })
      if (!session) useDataStore.getState().reset()
    })
  },

  async login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const { data: { user } } = await supabase.auth.getUser()
    set({ email: user?.email ?? null, isAuthenticated: true })
    await useDataStore.getState().init()
  },

  async logout() {
    await supabase.auth.signOut()
    useDataStore.getState().reset()
    set({ email: null, isAuthenticated: false })
  },
}))
