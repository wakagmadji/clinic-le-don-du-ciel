import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { MembreEquipe } from '../lib/supabase'

const Team: React.FC = () => {
  const [membres, setMembres] = useState<MembreEquipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('equipe').select('*').order('ordre')
      setMembres(data ?? [])
      setLoading(false)
    }
    load()

    // Temps réel : mise à jour automatique dès qu'un admin modifie
    const channel = supabase
      .channel('equipe-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'equipe' }, load)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <section id="equipe" style={{ padding:'96px 5vw', background:'var(--white)' }}>
      <style>{`.team-card:hover { transform:translateY(-5px)!important; box-shadow:var(--shadow-md)!important; }`}</style>

      <div style={{ maxWidth:600, marginBottom:52 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>
          <span style={{ display:'block', width:24, height:1, background:'var(--gold)' }}/>
          Nos professionnels
        </span>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:600, lineHeight:1.2, color:'var(--text-dark)', marginBottom:12 }}>
          Une équipe à votre service
        </h2>
        <p style={{ fontSize:'1rem', color:'var(--text-soft)', lineHeight:1.7 }}>
          Des médecins, biologistes et pharmaciens dévoués, formés et passionnés par leur métier.
        </p>
      </div>

      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:24 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', overflow:'hidden', background:'var(--white)' }}>
              <div style={{ height:160, background:'var(--cream)', animation:'pulse 1.5s infinite' }}/>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ height:16, background:'var(--cream)', borderRadius:6, marginBottom:8, animation:'pulse 1.5s infinite' }}/>
                <div style={{ height:12, background:'var(--cream)', borderRadius:6, width:'60%', margin:'0 auto', animation:'pulse 1.5s infinite' }}/>
              </div>
            </div>
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:24 }}>
          {membres.map(member => (
            <div key={member.id} className="team-card" style={{
              border:'1px solid var(--border)', borderRadius:'var(--radius-lg)',
              overflow:'hidden', textAlign:'center',
              transition:'transform 0.2s, box-shadow 0.2s', background:'var(--white)',
            }}>
              <div style={{
                height:160, display:'flex', alignItems:'center', justifyContent:'center',
                background: member.couleur === 'green' ? 'var(--green-pale)' : 'var(--gold-pale)',
              }}>
                <span style={{
                  width:76, height:76, borderRadius:'50%',
                  background: member.couleur === 'green' ? 'var(--green)' : 'var(--gold)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'var(--font-serif)', fontSize:'1.5rem', fontWeight:600,
                  color:'#fff', letterSpacing:'0.05em',
                }}>
                  {member.initiales}
                </span>
              </div>
              <div style={{ padding:'18px 16px' }}>
                <p style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', fontWeight:600, color:'var(--text-dark)' }}>
                  {member.nom}
                </p>
                <p style={{ fontSize:'0.78rem', color:'var(--gold)', marginTop:5, fontWeight:500, letterSpacing:'0.04em' }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Team
