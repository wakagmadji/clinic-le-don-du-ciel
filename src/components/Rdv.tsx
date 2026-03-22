import React, { useState } from 'react'
import { Phone, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const INFO = [
  { icon: Phone,        title: 'Par téléphone',       text: '+235 XX XX XX XX\nLun – Sam, 7h00 – 20h00'     },
  { icon: Clock,        title: "Horaires d'ouverture", text: 'Lun – Ven : 7h00 – 20h00\nSam : 8h00 – 18h00' },
  { icon: MapPin,       title: 'Localisation',          text: "N'Djaména, Tchad\nQuartier [à compléter]"      },
  { icon: AlertCircle,  title: 'Urgences',              text: "Service d'urgences disponible 7j/7"            },
]

const SERVICE_OPTIONS = ['Médecine Générale', "Laboratoire d'analyses", 'Pharmacie']

interface FormData {
  nom: string; prenom: string; telephone: string
  service: string; date: string; motif: string
}
const EMPTY: FormData = { nom:'', prenom:'', telephone:'', service:'', date:'', motif:'' }

const Rdv: React.FC = () => {
  const [form, setForm]       = useState<FormData>(EMPTY)
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')

    const { error: err } = await supabase.from('rendez_vous').insert({
      nom:       form.nom,
      prenom:    form.prenom,
      telephone: form.telephone,
      service:   form.service,
      date:      form.date || null,
      motif:     form.motif || null,
      statut:    'en_attente',
    })

    if (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      console.error(err)
    } else {
      setSent(true)
      setForm(EMPTY)
      setTimeout(() => setSent(false), 5000)
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width:'100%', background:'rgba(255,255,255,0.08)',
    border:'1px solid rgba(255,255,255,0.2)', borderRadius:10,
    padding:'11px 14px', fontFamily:'var(--font-sans)', fontSize:'0.9rem',
    color:'#fff', outline:'none', transition:'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    display:'block', fontSize:'0.72rem', fontWeight:500,
    color:'rgba(255,255,255,0.65)', marginBottom:6,
    letterSpacing:'0.05em', textTransform:'uppercase',
  }

  return (
    <section id="rdv" style={{ padding:'96px 5vw', background:'var(--green)' }}>
      <style>{`
        .rdv-input:focus { border-color:var(--gold-light)!important; }
        .rdv-input::placeholder { color:rgba(255,255,255,0.3); }
        @media(max-width:860px){ #rdv-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:600px){ #rdv-row { grid-template-columns:1fr!important; } }
      `}</style>

      <div style={{ maxWidth:600, marginBottom:52 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold-light)', marginBottom:12 }}>
          <span style={{ display:'block', width:24, height:1, background:'var(--gold-light)' }}/>
          Consultation
        </span>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:600, lineHeight:1.2, color:'#fff', marginBottom:12 }}>
          Prendre un rendez-vous
        </h2>
        <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.65)', lineHeight:1.7 }}>
          Remplissez le formulaire et notre équipe vous contactera rapidement pour confirmer votre consultation.
        </p>
      </div>

      <div id="rdv-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>
        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Erreur */}
          {error && (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(226,75,74,0.2)', border:'1px solid rgba(226,75,74,0.3)', borderRadius:10, padding:'11px 14px', fontSize:'0.85rem', color:'#f09595' }}>
              <AlertCircle size={15}/> {error}
            </div>
          )}

          <div id="rdv-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input className="rdv-input" required value={form.nom} onChange={set('nom')} placeholder="Votre nom" style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Prénom</label>
              <input className="rdv-input" required value={form.prenom} onChange={set('prenom')} placeholder="Votre prénom" style={inputStyle}/>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Téléphone</label>
            <input className="rdv-input" required type="tel" value={form.telephone} onChange={set('telephone')} placeholder="+235 XX XX XX XX" style={inputStyle}/>
          </div>

          <div>
            <label style={labelStyle}>Service souhaité</label>
            <select className="rdv-input" required value={form.service} onChange={set('service')} style={{ ...inputStyle, appearance:'none' as const }}>
              <option value="">Choisir un service</option>
              {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date souhaitée</label>
            <input className="rdv-input" type="date" value={form.date} onChange={set('date')} style={{ ...inputStyle, colorScheme:'dark' }}/>
          </div>

          <div>
            <label style={labelStyle}>Motif (optionnel)</label>
            <textarea className="rdv-input" rows={3} value={form.motif} onChange={set('motif')} placeholder="Décrivez brièvement votre situation…" style={{ ...inputStyle, resize:'vertical' }}/>
          </div>

          <button type="submit" disabled={loading || sent} style={{
            background: sent ? '#1e4a33' : 'var(--gold)',
            color: sent ? '#fff' : 'var(--text-dark)',
            border:'none', padding:'14px 32px', borderRadius:'var(--radius-full)',
            fontSize:'0.9rem', fontWeight:500, transition:'background 0.3s',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            cursor: loading || sent ? 'not-allowed' : 'pointer',
            fontFamily:'var(--font-sans)',
          }}>
            {sent    ? <><CheckCircle2 size={16}/> Rendez-vous envoyé !</>
            : loading ? 'Envoi en cours…'
            :           'Confirmer le rendez-vous →'}
          </button>
        </form>

        {/* INFO */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {INFO.map(({ icon: Icon, title, text }) => (
            <div key={title} style={{
              background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:'var(--radius-lg)', padding:'20px 22px',
              display:'flex', gap:16, alignItems:'flex-start',
            }}>
              <span style={{
                width:40, height:40, borderRadius:'var(--radius-md)',
                background:'rgba(255,255,255,0.12)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <Icon size={18} color="var(--gold-light)" strokeWidth={1.8}/>
              </span>
              <div>
                <p style={{ fontWeight:500, color:'#fff', fontSize:'0.93rem', marginBottom:4 }}>{title}</p>
                {text.split('\n').map(line => (
                  <p key={line} style={{ fontSize:'0.83rem', color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rdv
