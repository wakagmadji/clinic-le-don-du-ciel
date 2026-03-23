/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js'

const url = (import.meta as any).env.VITE_SUPABASE_URL as string
const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  throw new Error('⚠️  Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env')
}

export const supabase = createClient(url, key)

// ── Types base de données ──────────────────────────────────────
export type Statut = 'en_attente' | 'confirme' | 'annule'

export interface RendezVous {
  id: string
  nom: string
  prenom: string
  telephone: string
  service: string
  date: string | null
  motif: string | null
  statut: Statut
  created_at: string
}

export interface MembreEquipe {
  id: string
  nom: string
  role: string
  initiales: string
  couleur: 'green' | 'gold'
  ordre: number
  created_at: string
}

export interface Service {
  id: string
  titre: string
  description: string
  details: string[]
  icone: string
  ordre: number
  created_at: string
}
