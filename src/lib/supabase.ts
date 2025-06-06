
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://djwlryrqjbsiswzvmjnr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqd2xyeXJxamJzaXN3enZtam5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDIxMTQsImV4cCI6MjA2NDgxODExNH0.McP7jF00jgs_Bq8FEvuFj22n-XHviMGt47mKqZQf70M'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          artist_name: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          full_name: string
          artist_name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          artist_name?: string | null
        }
      }
      campaigns: {
        Row: {
          id: string
          created_at: string
          artist_id: string
          title: string
          description: string
          target_amount: number
          currency: 'toman' | 'euro'
          deadline: string
          project_type: 'album' | 'single' | 'ep' | 'music_video'
          cover_image_url: string | null
          status: 'pending' | 'active' | 'completed' | 'cancelled'
          current_amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          artist_id: string
          title: string
          description: string
          target_amount: number
          currency: 'toman' | 'euro'
          deadline: string
          project_type: 'album' | 'single' | 'ep' | 'music_video'
          cover_image_url?: string | null
          status?: 'pending' | 'active' | 'completed' | 'cancelled'
          current_amount?: number
        }
        Update: {
          id?: string
          created_at?: string
          artist_id?: string
          title?: string
          description?: string
          target_amount?: number
          currency?: 'toman' | 'euro'
          deadline?: string
          project_type?: 'album' | 'single' | 'ep' | 'music_video'
          cover_image_url?: string | null
          status?: 'pending' | 'active' | 'completed' | 'cancelled'
          current_amount?: number
        }
      }
    }
  }
}
