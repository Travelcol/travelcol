export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          user_id: string
          title: string
          description: string
          link: string
          status: 'active' | 'paused' | 'completed'
          tags: number[]
          color: string | null
          created_at: string
          updated_at: string
          is_favorite: boolean
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      services: {
        Row: {
          id: number
          user_id: string
          name: string
          provider: string
          link: string
          description: string
          tags: number[]
          color: string | null
          is_favorite: boolean
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      tags: {
        Row: {
          id: number
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['tags']['Insert']>
      }
      relations: {
        Row: {
          id: number
          user_id: string
          project_id: number
          service_id: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['relations']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['relations']['Insert']>
      }
      activity_logs: {
        Row: {
          id: number
          user_id: string
          type: 'project' | 'service' | 'tag' | 'relation'
          action: 'created' | 'updated' | 'deleted'
          entity_id: number
          entity_name: string
          timestamp: string
        }
        Insert: Omit<Database['public']['Tables']['activity_logs']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['activity_logs']['Insert']>
      }
      node_positions: {
        Row: {
          id: number
          user_id: string
          entity_type: 'project' | 'service'
          entity_id: number
          x: number
          y: number
        }
        Insert: Omit<Database['public']['Tables']['node_positions']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['node_positions']['Insert']>
      }
      app_settings: {
        Row: {
          id: number
          user_id: string
          theme: 'dark' | 'light'
          sidebar_collapsed: boolean
        }
        Insert: Omit<Database['public']['Tables']['app_settings']['Row'], 'id' | 'user_id'>
        Update: Partial<Database['public']['Tables']['app_settings']['Insert']>
      }
    }
  }
}
