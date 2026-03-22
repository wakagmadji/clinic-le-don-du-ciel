import React, { useEffect, useState } from 'react'
import { CalendarCheck, Clock, CheckCircle2, XCircle, Users, Stethoscope, TrendingUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { RendezVous } from '../../lib/supabase'

interface Stats {
  total: number
  enAttente: number
  confirmes: number
  annules: number
  equipe: number
  services: number
}

const Card: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string; sub?: string }> =
  ({ icon, label, value, color, sub }) => (
  <div style={{
    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
    borderRadius:14, padding:'22px 24px',
    display:'flex', flexDirection:'column', gap:12,
  }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
      <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.45)', fontWeight:400, letterSpacing:'0.04em', textTransform:'uppercase' }}>{label}</span>
      <span style={{ width:36, height:36, borderRadius:10, background: color + '22', display:'flex', alignItems:'center', justifyContent:'center' }}>{icon}</span>
    </div>
    <div>
      <p style={{ fontSize:'2rem', fontWeight:600, color:'#fff', lineHeight:1, fontFamily:'Cormorant Garamond, serif' }}>{value}</p>
      {sub && <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', marginTop:4 }}>{sub}</p>}
    </div>
  </div>
)

const Badge: React.FC<{ statut: string }> = ({ statut }) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    en_attente: { bg:'rgba(250,199,117,0.15)', color:'#FAC775', label:'En attente' },
    confirme:   { bg:'rgba(93,202,165,0.15)',  color:'#5DCAA5', label:'Confirmé'   },
    annule:     { bg:'rgba(240,153,123,0.15)', color:'#F0997B', label:'Annulé'     },
  }
  const s = map[statut] ?? map.en_attente
  return (
    <span style={{ padding:'3px 10px', borderRadius:999, fontSize:'0.73rem', fontWeight:500, background:s.bg, color:s.color }}>
      {s.label}
    </span>
  )
}

const Dashboard: React.FC = () => {
  const [stats, setStats]   = useState<Stats>({ total:0, enAttente:0, confirmes:0, annules:0, equipe:0, services:0 })
  const [recent, setRecent] = useState<RendezVous[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [rdvRes, equipeRes, servicesRes] = await Promise.all([
        supabase.from('rendez_vous').select('*').order('created_at', { ascending: false }),
        supabase.from('equipe').select('id'),
        supabase.from('services').select('id'),
      ])
      const rdv = rdvRes.data ?? []
      setStats({
        total:     rdv.length,
        enAttente: rdv.filter(r => r.statut === 'en_attente').length,
        confirmes: rdv.filter(r => r.statut === 'confirme').length,
        annules:   rdv.filter(r => r.statut === 'annule').length,
        equipe:    equipeRes.data?.length ?? 0,
        services:  servicesRes.data?.length ?? 0,
      })
      setRecent(rdv.slice(0, 6))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <Loader />

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
      <div>
        <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#fff', marginBottom:4 }}>Tableau de bord</h1>
        <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>Vue d'ensemble de la clinique</p>
      </div>

      {/* STAT CARDS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16 }}>
        <Card icon={<CalendarCheck size={18} color="#4A8C68"/>} label="Total RDV"    value={stats.total}     color="#4A8C68" />
        <Card icon={<Clock         size={18} color="#FAC775"/>} label="En attente"   value={stats.enAttente} color="#FAC775" sub="À traiter" />
        <Card icon={<CheckCircle2  size={18} color="#5DCAA5"/>} label="Confirmés"    value={stats.confirmes} color="#5DCAA5" />
        <Card icon={<XCircle       size={18} color="#F0997B"/>} label="Annulés"      value={stats.annules}   color="#F0997B" />
        <Card icon={<Users         size={18} color="#AFA9EC"/>} label="Équipe"       value={stats.equipe}    color="#AFA9EC" sub="membres" />
        <Card icon={<Stethoscope   size={18} color="#85B7EB"/>} label="Services"     value={stats.services}  color="#85B7EB" sub="actifs" />
      </div>

      {/* RECENT RDV */}
      <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:8 }}>
          <TrendingUp size={16} color="#4A8C68"/>
          <h2 style={{ fontSize:'0.95rem', fontWeight:500, color:'#fff' }}>Derniers rendez-vous</h2>
        </div>
        {recent.length === 0
          ? <p style={{ padding:'32px 22px', color:'rgba(255,255,255,0.3)', fontSize:'0.88rem' }}>Aucun rendez-vous pour le moment.</p>
          : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                  {['Patient','Service','Date','Statut'].map(h => (
                    <th key={h} style={{ padding:'12px 22px', textAlign:'left', fontSize:'0.72rem', fontWeight:500, color:'rgba(255,255,255,0.35)', letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < recent.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding:'13px 22px', color:'#fff', whiteSpace:'nowrap' }}>{r.prenom} {r.nom}</td>
                    <td style={{ padding:'13px 22px', color:'rgba(255,255,255,0.55)', whiteSpace:'nowrap' }}>{r.service}</td>
                    <td style={{ padding:'13px 22px', color:'rgba(255,255,255,0.55)', whiteSpace:'nowrap' }}>{r.date ?? '—'}</td>
                    <td style={{ padding:'13px 22px' }}><Badge statut={r.statut}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const Loader = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:300 }}>
    <div style={{ width:36, height:36, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
)

export default Dashboard
