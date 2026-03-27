import React from 'react'
import { ArrowRight, Stethoscope, FlaskConical, Pill, ChevronDown } from 'lucide-react'
import { STATS } from '../data'

const CARDS = [
  { icon: Stethoscope,  label: 'Médecine Générale',      sub: 'Consultations & suivis médicaux'   },
  { icon: FlaskConical, label: "Laboratoire d'analyses",  sub: 'Résultats rapides et fiables'       },
  { icon: Pill,         label: 'Pharmacie interne',       sub: 'Médicaments disponibles sur place'  },
]

const Hero: React.FC = () => (
  <section id="accueil" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', paddingTop:68, position:'relative' }}>
    <style>{`
      @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
      @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
      @keyframes bounce  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
      .hero-card:hover { background:rgba(255,255,255,0.16)!important; transform:translateX(5px)!important; }
      @media(min-width:861px){
        #hero-inner { flex-direction:row!important; }
        #hero-left  { width:50%!important; }
        #hero-right { width:50%!important; min-height:100vh!important; }
        #scroll-hint{ display:flex!important; }
      }
    `}</style>

    <div id="hero-inner" style={{ display:'flex', flexDirection:'column', flex:1 }}>

      {/* LEFT */}
      <div id="hero-left" style={{
        background:'var(--gold-pale)',
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'56px 6vw', position:'relative', overflow:'hidden',
      }}>
        <span style={{ position:'absolute', top:32, left:24, fontSize:'5rem', color:'var(--gold-light)', opacity:0.4, lineHeight:1, pointerEvents:'none' }}>✦</span>

        <span style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--green)', marginBottom:16, animation:'fadeUp 0.6s ease both' }}>
          <span style={{ display:'block', width:28, height:1, background:'var(--green)' }}/>
          Clinique médicale — N'Djaména, Tchad
        </span>

        <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,8vw,3.2rem)', fontWeight:600, lineHeight:1.15, color:'var(--text-dark)', marginBottom:16, animation:'fadeUp 0.6s 0.1s ease both' }}>
          Des soins portés<br/>par la <em style={{ color:'var(--green)', fontStyle:'italic' }}>grâce du ciel</em>
        </h1>

        <p style={{ fontSize:'clamp(0.9rem,3vw,1rem)', color:'var(--text-soft)', lineHeight:1.7, maxWidth:430, marginBottom:28, animation:'fadeUp 0.6s 0.2s ease both' }}>
          La Clinique Le Don du Ciel vous accueille avec expertise, humanité et bienveillance. Votre santé est notre mission sacrée.
        </p>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.6s 0.3s ease both' }}>
          <a href="#rdv" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--green)', color:'#fff', padding:'13px 26px', borderRadius:'var(--radius-full)', fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s' }}
            onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--green-light)'; t.style.transform='translateY(-2px)' }}
            onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='var(--green)'; t.style.transform='none' }}>
            Prendre rendez-vous <ArrowRight size={15}/>
          </a>
          <a href="#services" style={{ display:'inline-flex', alignItems:'center', border:'1.5px solid var(--gold)', color:'var(--gold)', padding:'12px 24px', borderRadius:'var(--radius-full)', fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s' }}
            onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--gold-pale)'; t.style.transform='translateY(-2px)' }}
            onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='transparent'; t.style.transform='none' }}>
            Nos services
          </a>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px 24px', marginTop:36, paddingTop:28, borderTop:'1px solid var(--border)', animation:'fadeUp 0.6s 0.4s ease both' }}>
          {STATS.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} style={{ display:'flex', flexDirection:'column', gap:2 }}>
                <Icon size={14} color="var(--gold)" style={{ marginBottom:3 }}/>
                <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.7rem', fontWeight:600, color:'var(--green)', lineHeight:1 }}>{s.value}</span>
                <span style={{ fontSize:'0.7rem', color:'var(--text-soft)' }}>{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div id="hero-right" style={{ background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', padding:'56px 6vw', position:'relative', overflow:'hidden', minHeight:400 }}>
        <span style={{ position:'absolute', top:-80, right:-80, width:300, height:300, borderRadius:'50%', border:'50px solid rgba(255,255,255,0.04)', pointerEvents:'none' }}/>
        <span style={{ position:'absolute', bottom:-60, left:-60, width:220, height:220, borderRadius:'50%', border:'35px solid rgba(255,255,255,0.04)', pointerEvents:'none' }}/>

        <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:360 }}>
          <p style={{ fontSize:'0.74rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:6 }}>Bienvenue à la</p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.6rem,6vw,2.6rem)', fontWeight:600, color:'var(--gold-light)', lineHeight:1.15, marginBottom:28 }}>
            Clinique<br/>Le Don du Ciel
          </h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {CARDS.map(({ icon: Icon, label, sub }, i) => (
              <div key={label} className="hero-card" style={{ display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.09)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:'var(--radius-lg)', padding:'16px 18px', transition:'background 0.2s, transform 0.2s', animation:`slideIn 0.5s ${i*0.12}s ease both` }}>
                <span style={{ width:40, height:40, borderRadius:'var(--radius-md)', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={18} color="#fff" strokeWidth={1.8}/>
                </span>
                <div>
                  <p style={{ fontSize:'0.9rem', fontWeight:500, color:'#fff' }}>{label}</p>
                  <p style={{ fontSize:'0.74rem', color:'rgba(255,255,255,0.55)', marginTop:2 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Scroll hint — desktop only */}
    <a id="scroll-hint" href="#services" aria-label="Défiler" style={{ display:'none', position:'absolute', bottom:24, left:'50%', width:36, height:36, borderRadius:'50%', background:'rgba(200,151,58,0.18)', color:'var(--gold)', alignItems:'center', justifyContent:'center', animation:'bounce 2s infinite', zIndex:10, transition:'background 0.2s' }}
      onMouseEnter={e=>(e.currentTarget.style.background='rgba(200,151,58,0.35)')}
      onMouseLeave={e=>(e.currentTarget.style.background='rgba(200,151,58,0.18)')}>
      <ChevronDown size={20}/>
    </a>
  </section>
)

export default Hero
