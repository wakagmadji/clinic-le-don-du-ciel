import React, { useEffect, useState } from 'react'
import { Search, CheckCircle2, XCircle, Clock, Trash2, Phone } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { RendezVous, Statut } from '../../lib/supabase'

const STATUTS: { value: Statut | 'tous'; label: string }[] = [
  { value:'tous',       label:'Tous'       },
  { value:'en_attente', label:'En attente' },
  { value:'confirme',   label:'Confirmés'  },
  { value:'annule',     label:'Annulés'    },
]

const BADGE: Record<string, { bg:string; color:string; icon:React.ReactNode; label:string }> = {
  en_attente: { bg:'rgba(250,199,117,0.15)', color:'#FAC775', icon:<Clock       size={12}/>, label:'En attente' },
  confirme:   { bg:'rgba(93,202,165,0.15)',  color:'#5DCAA5', icon:<CheckCircle2 size={12}/>, label:'Confirmé'   },
  annule:     { bg:'rgba(240,153,123,0.15)', color:'#F0997B', icon:<XCircle      size={12}/>, label:'Annulé'     },
}

const AdminRdv: React.FC = () => {
  const [rdvs, setRdvs]       = useState<RendezVous[]>([])
  const [filter, setFilter]   = useState<Statut | 'tous'>('tous')
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('rendez_vous').select('*').order('created_at', { ascending: false })
    setRdvs(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatut = async (id: string, statut: Statut) => {
    await supabase.from('rendez_vous').update({ statut }).eq('id', id)
    setRdvs(prev => prev.map(r => r.id === id ? { ...r, statut } : r))
  }

  const deleteRdv = async (id: string) => {
    if (!confirm('Supprimer ce rendez-vous ?')) return
    await supabase.from('rendez_vous').delete().eq('id', id)
    setRdvs(prev => prev.filter(r => r.id !== id))
  }

  const filtered = rdvs.filter(r => {
    const matchStatut = filter === 'tous' || r.statut === filter
    const q = search.toLowerCase()
    const matchSearch = !q || `${r.nom} ${r.prenom} ${r.service} ${r.telephone}`.toLowerCase().includes(q)
    return matchStatut && matchSearch
  })

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:600, color:'#fff', marginBottom:4 }}>Rendez-vous</h1>
        <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)' }}>{rdvs.length} rendez-vous au total</p>
      </div>

      {/* FILTERS */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
        <div style={{ position:'relative', flex:1, minWidth:200 }}>
          <Search size={15} color="rgba(255,255,255,0.3)" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
          <input
            placeholder="Rechercher un patient…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width:'100%', padding:'10px 12px 10px 36px',
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:10, color:'#fff', fontFamily:'inherit', fontSize:'0.88rem', outline:'none',
            }}
          />
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {STATUTS.map(s => (
            <button key={s.value} onClick={() => setFilter(s.value)} style={{
              padding:'9px 16px', borderRadius:999, fontSize:'0.8rem', fontWeight: filter===s.value ? 500 : 400,
              background: filter===s.value ? '#2D6147' : 'rgba(255,255,255,0.05)',
              color: filter===s.value ? '#fff' : 'rgba(255,255,255,0.5)',
              border:'1px solid', borderColor: filter===s.value ? '#4A8C68' : 'rgba(255,255,255,0.08)',
              cursor:'pointer', transition:'all 0.15s',
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      {loading ? <Loader/> : filtered.length === 0
        ? <Empty/>
        : (
        <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  {['Patient','Téléphone','Service','Date','Statut','Actions'].map(h => (
                    <th key={h} style={{ padding:'13px 18px', textAlign:'left', fontSize:'0.7rem', color:'rgba(255,255,255,0.35)', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const b = BADGE[r.statut]
                  return (
                    <tr key={r.id} style={{ borderBottom: i < filtered.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition:'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background='transparent')}
                    >
                      <td style={{ padding:'13px 18px', color:'#fff', whiteSpace:'nowrap', fontWeight:500 }}>{r.prenom} {r.nom}</td>
                      <td style={{ padding:'13px 18px', whiteSpace:'nowrap' }}>
                        <a href={`tel:${r.telephone}`} style={{ display:'flex', alignItems:'center', gap:5, color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>
                          <Phone size={13}/> {r.telephone}
                        </a>
                      </td>
                      <td style={{ padding:'13px 18px', color:'rgba(255,255,255,0.55)', whiteSpace:'nowrap' }}>{r.service}</td>
                      <td style={{ padding:'13px 18px', color:'rgba(255,255,255,0.45)', whiteSpace:'nowrap' }}>{r.date ?? '—'}</td>
                      <td style={{ padding:'13px 18px' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:999, fontSize:'0.74rem', fontWeight:500, background:b.bg, color:b.color }}>
                          {b.icon} {b.label}
                        </span>
                      </td>
                      <td style={{ padding:'13px 18px' }}>
                        <div style={{ display:'flex', gap:6 }}>
                          {r.statut !== 'confirme' && (
                            <button onClick={() => updateStatut(r.id, 'confirme')} title="Confirmer" style={{ ...btnSm, background:'rgba(93,202,165,0.15)', color:'#5DCAA5' }}>
                              <CheckCircle2 size={14}/>
                            </button>
                          )}
                          {r.statut !== 'annule' && (
                            <button onClick={() => updateStatut(r.id, 'annule')} title="Annuler" style={{ ...btnSm, background:'rgba(240,153,123,0.15)', color:'#F0997B' }}>
                              <XCircle size={14}/>
                            </button>
                          )}
                          <button onClick={() => deleteRdv(r.id)} title="Supprimer" style={{ ...btnSm, background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.3)' }}>
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}

const btnSm: React.CSSProperties = {
  display:'flex', alignItems:'center', justifyContent:'center',
  width:30, height:30, borderRadius:8, border:'none', cursor:'pointer', transition:'opacity 0.15s',
}
const Loader = () => <div style={{ display:'flex', justifyContent:'center', padding:40 }}><div style={{ width:32, height:32, borderRadius:'50%', border:'3px solid #2D6147', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
const Empty  = () => <p style={{ padding:'40px 0', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'0.88rem' }}>Aucun rendez-vous trouvé.</p>

export default AdminRdv
