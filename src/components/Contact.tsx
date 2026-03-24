import React from 'react'
import { CONTACT_INFO } from '../data'

const Contact: React.FC = () => (
  <section id="contact" style={{ padding:'96px 5vw', background:'var(--cream)' }}>
    <style>{`
      @media(max-width:860px){ #contact-grid{ grid-template-columns:1fr!important; } }
      .contact-item:hover .ci-icon { background:var(--green)!important; }
      .contact-item:hover .ci-icon svg { color:#fff!important; stroke:#fff!important; }
    `}</style>

    <div style={{ maxWidth:600, marginBottom:52 }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>
        <span style={{ display:'block', width:24, height:1, background:'var(--gold)' }}/>
        Nous joindre
      </span>
      <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:600, lineHeight:1.2, color:'var(--text-dark)', marginBottom:12 }}>
        Contact & localisation
      </h2>
      <p style={{ fontSize:'1rem', color:'var(--text-soft)', lineHeight:1.7 }}>
        Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question.
      </p>
    </div>

    <div id="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:56, alignItems:'start' }}>
      {/* Info items */}
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {CONTACT_INFO.map(({ icon: Icon, title, lines }) => (
          <div key={title} className="contact-item" style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
            <span className="ci-icon" style={{
              width:46, height:46, background:'var(--green-pale)',
              borderRadius:'var(--radius-md)',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0, transition:'background 0.2s',
            }}>
              <Icon size={19} color="var(--green)" strokeWidth={1.8}/>
            </span>
            <div>
              <p style={{ fontWeight:500, fontSize:'0.9rem', color:'var(--text-dark)', marginBottom:4 }}>{title}</p>
              {lines.map(line => (
                <p key={line} style={{ fontSize:'0.85rem', color:'var(--text-soft)', lineHeight:1.6 }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div style={{
        borderRadius:'var(--radius-lg)', height:280,
        background:'var(--green-pale)',
        display:'flex', alignItems:'center', justifyContent:'center',
        flexDirection:'column', gap:12,
        border:'1px solid var(--border)',
      }}>
        <span style={{ fontSize:'3rem' }}>🗺️</span>
        <p style={{ fontSize:'0.9rem', color:'var(--text-mid)', fontWeight:500 }}>Carte de localisation</p>
        <p style={{ fontSize:'0.75rem', color:'var(--text-soft)' }}>Intégrez ici Google Maps ou OpenStreetMap</p>
      </div>
    </div>
  </section>
)

export default Contact
