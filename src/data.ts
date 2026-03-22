import {
  Stethoscope, FlaskConical, Pill,
  Clock, Award, Users,
  Phone, MapPin, Mail, Calendar,
} from 'lucide-react'
import type { Service, TeamMember, Stat, ContactInfo, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil',  href: '#accueil'  },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about'    },
  { label: 'Équipe',   href: '#equipe'   },
  { label: 'Contact',  href: '#contact'  },
]

export const SERVICES: Service[] = [
  {
    id: 'medecine',
    icon: Stethoscope,
    title: 'Médecine Générale',
    description: 'Consultations, bilans de santé, suivi des maladies chroniques et prévention pour toute la famille.',
    details: [
      'Consultations médicales',
      'Bilans de santé complets',
      'Suivi des maladies chroniques',
      'Médecine préventive',
      'Certificats médicaux',
    ],
  },
  {
    id: 'laboratoire',
    icon: FlaskConical,
    title: "Laboratoire d'analyses",
    description: 'Analyses biologiques complètes avec résultats rapides, interprétés par nos biologistes qualifiés.',
    details: [
      'Analyses sanguines',
      'Examens urinaires',
      'Microbiologie & parasitologie',
      'Tests de grossesse',
      'Résultats express',
    ],
  },
  {
    id: 'pharmacie',
    icon: Pill,
    title: 'Pharmacie interne',
    description: "Pharmacie sur place pour un accès immédiat à vos médicaments dès la fin de la consultation.",
    details: [
      'Médicaments sur ordonnance',
      'Conseil pharmaceutique',
      'Produits de parapharmacie',
      'Disponibilité immédiate',
      'Tarifs accessibles',
    ],
  },
]

export const STATS: Stat[] = [
  { value: '15+',  label: "Années d'expérience",  icon: Award       },
  { value: '3',    label: 'Services spécialisés',  icon: Stethoscope },
  { value: '98%',  label: 'Patients satisfaits',   icon: Users       },
  { value: '7j/7', label: 'À votre service',        icon: Clock       },
]

export const TEAM: TeamMember[] = [
  { id: '1', name: 'Dr. Mahamat Idriss', role: 'Médecin Directeur',         initials: 'MI', color: 'green' },
  { id: '2', name: 'Dr. Fatime Alio',    role: 'Médecine Générale',          initials: 'FA', color: 'gold'  },
  { id: '3', name: 'Dr. Saleh Oumar',    role: 'Biologiste – Laboratoire',   initials: 'SO', color: 'green' },
  { id: '4', name: 'Mme. Amina Hassan',  role: 'Pharmacienne en chef',       initials: 'AH', color: 'gold'  },
]

export const CONTACT_INFO: ContactInfo[] = [
  { icon: MapPin,   title: 'Adresse',   lines: ["N'Djaména, République du Tchad", 'Quartier [à compléter]']     },
  { icon: Phone,    title: 'Téléphone', lines: ['+235 XX XX XX XX', '+235 XX XX XX XX (urgences)']              },
  { icon: Mail,     title: 'Email',     lines: ['contact@ledondduciel.td']                                       },
  { icon: Calendar, title: 'Horaires',  lines: ['Lun – Ven : 7h00 – 20h00', 'Samedi : 8h00 – 18h00']           },
]

export const SERVICE_OPTIONS = [
  'Médecine Générale',
  "Laboratoire d'analyses",
  'Pharmacie',
] as const
