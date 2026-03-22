import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  details: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  color: 'green' | 'gold'
}

export interface Stat {
  value: string
  label: string
  icon: LucideIcon
}

export interface ContactInfo {
  icon: LucideIcon
  title: string
  lines: string[]
}

export interface FormData {
  nom: string
  prenom: string
  telephone: string
  service: string
  date: string
  motif: string
}

export type NavItem = {
  label: string
  href: string
}
