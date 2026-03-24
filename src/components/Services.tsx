import React, { useEffect, useState } from 'react'
import { CheckCircle2, ChevronDown, Stethoscope, FlaskConical, Pill, Heart, Thermometer, Activity } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Service } from '../lib/supabase'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope, FlaskConical, Pill, Heart, Thermometer, Activity,
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading]   = useState(true)
  const [active, setActive]     = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('services').select('*').order('ordre')
      setServices(data ?? [])
      setLoading(false)
    }
    load()

    // Temps réel : mise à jour automatique dès qu'un admin modifie
    const channel = supabase
      .channel('services-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, load)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <section id="services" style={{ padding:'96px 5vw', background:'var(--white)' }}>
      <style>{`
        .srv-card:hover { box-shadow:var(--shadow-md)!important; transform:translateY(-3px)!important; }
        .srv-card:hover .srv-bar { opacity:1!important; }
        .srv-card:hover .srv-icon-wrap { background:var(--green)!important; }
        .srv-card:hover .srv-icon-wrap svg { color:#fff!important; stroke:#fff!important; }
        .srv-active { border-color:var(--green)!important; box-shadow:var(--shadow-md)!important; }
        .srv-active .srv-bar { opacity:1!important; }
        .srv-active .srv-icon-wrap { background:var(--green)!important; }
        .srv-active .srv-icon-wrap svg { color:#fff!important; stroke:#fff!important; }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>

      <div style={{ maxWidth:600, marginBottom:52 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>
          <span style={{ display:'block', width:24, height:1, background:'var(--gold)' }}/>
          Ce que nous proposons
        </span>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:600, lineHeight:1.2, color:'var(--text-dark)', marginBottom:12 }}>
          Nos services médicaux
        </h2>
        <p style={{ fontSize:'1rem', color:'var(--text-soft)', lineHeight:1.7 }}>
          Des services complémentaires pour prendre en charge votre santé de manière globale, avec professionnalisme et bienveillance.
        </p>
      </div>

      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'28px 24px', background:'var(--cream)' }}>
              <div style={{ width:54, height:54, background:'var(--border)', borderRadius:'var(--radius-md)', marginBottom:18, animation:'pulse 1.5s infinite' }}/>
              <div style={{ height:18, background:'var(--border)', borderRadius:6, marginBottom:10, width:'70%', animation:'pulse 1.5s infinite' }}/>
              <div style={{ height:13, background:'var(--border)', borderRadius:6, marginBottom:6, animation:'pulse 1.5s infinite' }}/>
              <div style={{ height:13, background:'var(--border)', borderRadius:6, width:'80%', animation:'pulse 1.5s infinite' }}/>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          {services.map(svc => {
            const Icon = ICON_MAP[svc.icone] ?? Stethoscope
            const isOpen = active === svc.id
            return (
              <div
                key={svc.id}
                className={`srv-card${isOpen ? ' srv-active' : ''}`}
                onClick={() => setActive(isOpen ? null : svc.id)}
                style={{
                  border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
                  padding:'28px 24px', background:'var(--cream)',
                  cursor:'pointer', position:'relative', overflow:'hidden',
                  transition:'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                }}
              >
                <span className="srv-bar" style={{
                  position:'absolute', top:0, left:0, right:0, height:3,
                  background:'linear-gradient(90deg,var(--green),var(--gold))',
                  opacity: isOpen ? 1 : 0, transition:'opacity 0.2s',
                }}/>
                <div className="srv-icon-wrap" style={{
                  width:54, height:54, background:'var(--green-pale)',
                  borderRadius:'var(--radius-md)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:18, transition:'background 0.2s',
                }}>
                  <Icon size={24} color="var(--green)" strokeWidth={1.8}/>
                </div>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.2rem', fontWeight:600, color:'var(--text-dark)', marginBottom:10 }}>
                  {svc.titre}
                </h3>
                <p style={{ fontSize:'0.88rem', color:'var(--text-soft)', lineHeight:1.65 }}>
                  {svc.description}
                </p>
                <div style={{
                  maxHeight: isOpen ? 300 : 0, overflow:'hidden',
                  opacity: isOpen ? 1 : 0,
                  transition:'max-height 0.35s ease, opacity 0.35s ease',
                }}>
                  <ul style={{ display:'flex', flexDirection:'column', gap:9, marginTop:20, paddingTop:20, borderTop:'1px solid var(--border)' }}>
                    {svc.details.map(d => (
                      <li key={d} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.85rem', color:'var(--text-mid)' }}>
                        <CheckCircle2 size={14} color="var(--green)" strokeWidth={2}/> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <span style={{ display:'inline-flex', alignItems:'center', gap:4, marginTop:16, fontSize:'0.78rem', fontWeight:500, color:'var(--green)' }}>
                  {isOpen ? 'Réduire' : 'En savoir plus'}
                  <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.3s' }}/>
                </span>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Services
