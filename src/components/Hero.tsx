import React from 'react'
import { ArrowRight, Stethoscope, FlaskConical, Pill, ChevronDown } from 'lucide-react'
import { STATS } from '../data'

const CARDS = [
  { icon: Stethoscope, label: 'Médecine Générale',      sub: 'Consultations & suivis médicaux'    },
  { icon: FlaskConical, label: "Laboratoire d'analyses", sub: 'Résultats rapides et fiables'        },
  { icon: Pill,         label: 'Pharmacie interne',      sub: 'Médicaments disponibles sur place'   },
]

const Hero: React.FC = () => (
  <section id="accueil" style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', paddingTop:68, position:'relative' }}>
    <style>{`
      @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
      @keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
      @keyframes bounce  {
        0%,100%{transform:translateX(-50%) translateY(0)}
        50%    {transform:translateX(-50%) translateY(7px)}
      }
      .hero-card:hover { background:rgba(255,255,255,0.16)!important; transform:translateX(5px)!important; }
      .hero-stat:hover .stat-num { color:var(--gold)!important; }
      @media(max-width:860px){
        #hero-grid  { grid-template-columns:1fr!important; }
        #hero-right { min-height:320px!important; padding:48px 5vw!important; }
        #scroll-hint{ display:none!important; }
        #hero-stats { grid-template-columns:1fr 1fr!important; }
      }
    `}</style>

    {/* LEFT */}
    <div id="hero-grid" style={{
      background:'var(--gold-pale)', display:'flex', flexDirection:'column',
      justifyContent:'center', padding:'72px 6vw', position:'relative', overflow:'hidden',
    }}>
      {/* decorative glyph */}
      <span style={{
        position:'absolute', top:44, left:32, fontSize:'7rem', color:'var(--gold-light)',
        opacity:0.4, lineHeight:1, pointerEvents:'none', userSelect:'none',
      }}>✦</span>

      <span style={{
        display:'inline-flex', alignItems:'center', gap:10,
        fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.1em',
        textTransform:'uppercase', color:'var(--green)', marginBottom:20,
        animation:'fadeUp 0.6s ease both',
      }}>
        <span style={{ display:'block', width:28, height:1, background:'var(--green)' }}/>
        Clinique médicale — N'Djaména, Tchad
      </span>

      <h1 style={{
        fontFamily:'var(--font-serif)', fontSize:'clamp(2.2rem,3.5vw,3.2rem)',
        fontWeight:600, lineHeight:1.15, color:'var(--text-dark)', marginBottom:18,
        animation:'fadeUp 0.6s 0.1s ease both',
      }}>
        Des soins portés<br/>
        par la <em style={{ color:'var(--green)', fontStyle:'italic' }}>grâce du ciel</em>
      </h1>

      <p style={{
        fontSize:'1rem', color:'var(--text-soft)', lineHeight:1.75,
        maxWidth:430, marginBottom:32,
        animation:'fadeUp 0.6s 0.2s ease both',
      }}>
        La Clinique Le Don du Ciel vous accueille avec expertise, humanité et
        bienveillance. Votre santé est notre mission sacrée.
      </p>

      <div style={{ display:'flex', gap:12, flexWrap:'wrap', animation:'fadeUp 0.6s 0.3s ease both' }}>
        <a href="#rdv" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'var(--green)', color:'#fff',
          padding:'13px 26px', borderRadius:'var(--radius-full)',
          fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--green-light)'; t.style.transform='translateY(-2px)' }}
        onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='var(--green)'; t.style.transform='none' }}
        >
          Prendre rendez-vous <ArrowRight size={15}/>
        </a>
        <a href="#services" style={{
          display:'inline-flex', alignItems:'center',
          border:'1.5px solid var(--gold)', color:'var(--gold)',
          padding:'12px 24px', borderRadius:'var(--radius-full)',
          fontSize:'0.9rem', fontWeight:500, transition:'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e=>{ const t=e.currentTarget; t.style.background='var(--gold-pale)'; t.style.transform='translateY(-2px)' }}
        onMouseLeave={e=>{ const t=e.currentTarget; t.style.background='transparent'; t.style.transform='none' }}
        >
          Nos services
        </a>
      </div>

      {/* Stats */}
      <div id="hero-stats" style={{
        display:'grid', gridTemplateColumns:'repeat(2,auto)', gap:'14px 30px',
        marginTop:44, paddingTop:32, borderTop:'1px solid var(--border)',
        animation:'fadeUp 0.6s 0.4s ease both',
      }}>
        {STATS.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="hero-stat" style={{ display:'flex', flexDirection:'column', gap:3 }}>
              <Icon size={15} color="var(--gold)" style={{ marginBottom:4 }}/>
              <span className="stat-num" style={{
                fontFamily:'var(--font-serif)', fontSize:'1.9rem',
                fontWeight:600, color:'var(--green)', lineHeight:1,
                transition:'color 0.2s',
              }}>{s.value}</span>
              <span style={{ fontSize:'0.72rem', color:'var(--text-soft)' }}>{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>

    {/* RIGHT */}
    <div id="hero-right" style={{
      background:'var(--green)', display:'flex', alignItems:'center',
      justifyContent:'center', padding:'60px 5vw', position:'relative', overflow:'hidden',
    }}>
      {/* rings */}
      <span style={{ position:'absolute', top:-100, right:-100, width:360, height:360, borderRadius:'50%', border:'60px solid rgba(255,255,255,0.04)', pointerEvents:'none' }}/>
      <span style={{ position:'absolute', bottom:-80, left:-80, width:260, height:260, borderRadius:'50%', border:'40px solid rgba(255,255,255,0.04)', pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:360 }}>
        <p style={{ fontSize:'0.76rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:8 }}>
          Bienvenue à la
        </p>
        <h2 style={{
          fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,3vw,2.6rem)',
          fontWeight:600, color:'var(--gold-light)', lineHeight:1.15, marginBottom:36,
        }}>
          Clinique<br/>Le Don du Ciel
        </h2>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {CARDS.map(({ icon: Icon, label, sub }, i) => (
            <div key={label} className="hero-card" style={{
              display:'flex', alignItems:'center', gap:16,
              background:'rgba(255,255,255,0.09)',
              border:'1px solid rgba(255,255,255,0.14)',
              borderRadius:'var(--radius-lg)', padding:'18px 20px',
              transition:'background 0.2s, transform 0.2s',
              animation:`slideIn 0.5s ${i*0.12}s ease both`,
            }}>
              <span style={{
                width:44, height:44, borderRadius:'var(--radius-md)',
                background:'rgba(255,255,255,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              }}>
                <Icon size={20} color="#fff" strokeWidth={1.8}/>
              </span>
              <div>
                <p style={{ fontSize:'0.95rem', fontWeight:500, color:'#fff' }}>{label}</p>
                <p style={{ fontSize:'0.76rem', color:'rgba(255,255,255,0.55)', marginTop:2 }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Scroll hint */}
    <a id="scroll-hint" href="#services" aria-label="Défiler" style={{
      position:'absolute', bottom:24, left:'50%',
      width:36, height:36, borderRadius:'50%',
      background:'rgba(200,151,58,0.18)', color:'var(--gold)',
      display:'flex', alignItems:'center', justifyContent:'center',
      animation:'bounce 2s infinite', zIndex:10,
      transition:'background 0.2s',
    }}
    onMouseEnter={e=>(e.currentTarget.style.background='rgba(200,151,58,0.35)')}
    onMouseLeave={e=>(e.currentTarget.style.background='rgba(200,151,58,0.18)')}
    >
      <ChevronDown size={20}/>
    </a>
  </section>
)

export default Hero
